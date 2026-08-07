// Beams — Three.js animated light beam background via @react-three/fiber.
// Adapted from React Bits open source: reactbits.dev/backgrounds/beams
// Renders N beams as a GLSL shader over a full-canvas quad.
// The beam quad bypasses the MVP matrix so it always fills the canvas exactly.
// Props match the React Bits API: beamWidth, beamHeight, beamNumber, lightColor, speed, rotation (degrees).

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import './Beams.css'

// ─── Vertex shader — bypasses camera, quad fills NDC space directly ───
const vertexShader = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // Position the 2×2 plane directly in clip space — no camera needed
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

// ─── Fragment shader — animated beam strips with vertical falloff ───
const fragmentShader = /* glsl */`
  precision mediump float;

  uniform float uTime;
  uniform float uBeamWidth;
  uniform float uBeamHeight;
  uniform int   uBeamNumber;
  uniform vec3  uLightColor;
  uniform float uSpeed;
  uniform float uRotationRad;

  varying vec2 vUv;

  void main() {
    // Rotate UV around canvas center
    vec2 centered = vUv - 0.5;
    float s = sin(uRotationRad);
    float c = cos(uRotationRad);
    vec2 rot = vec2(
      c * centered.x - s * centered.y,
      s * centered.x + c * centered.y
    );

    float col = 0.0;
    float n   = float(uBeamNumber);
    float t   = uTime * uSpeed * 0.12;
    // Per-beam half-width in the rotated UV space
    float hw  = (uBeamWidth / n) * 0.5;

    for (int i = 0; i < 64; i++) {
      if (i >= uBeamNumber) break;
      // Each beam wraps across the -0.5..0.5 range
      float center = mod(float(i) / n + t, 1.0) - 0.5;
      float dist   = abs(rot.x - center);
      // Also check wrapped distance so beams loop cleanly
      dist = min(dist, 1.0 - dist);
      float beam = smoothstep(hw, 0.0, dist);

      // Vertical bell curve: bright in the middle, fades at top/bottom
      float vFade = pow(max(0.0, cos((rot.y) * 3.14159265)), 1.5);
      col += beam * vFade;
    }

    // uBeamHeight scales overall brightness (larger = brighter)
    float alpha = col * uBeamHeight * 0.067;
    gl_FragColor = vec4(uLightColor, clamp(alpha, 0.0, 1.0));
  }
`

// ─── BeamQuad — single fullscreen mesh with the beam shader ───
function BeamQuad({ beamWidth, beamHeight, beamNumber, lightColor, speed, rotationRad }) {
  const matRef = useRef()

  // Uniforms allocated once; values updated each frame via ref
  const uniforms = useMemo(() => ({
    uTime:        { value: 0 },
    uBeamWidth:   { value: beamWidth },
    uBeamHeight:  { value: beamHeight },
    uBeamNumber:  { value: beamNumber },
    uLightColor:  { value: new THREE.Color(lightColor) },
    uSpeed:       { value: speed },
    uRotationRad: { value: rotationRad },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [])

  useFrame(({ clock }) => {
    if (!matRef.current) return
    matRef.current.uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    // frustumCulled={false}: the mesh is in clip space, not world space,
    // so Three.js's frustum check would incorrectly cull it.
    <mesh frustumCulled={false}>
      {/* 2×2 plane sits exactly in NDC: corners at (±1, ±1) */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        // Additive blending: beams add luminosity on top of the dark frame
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

// ─── Beams — exported component ───
export default function Beams({
  beamWidth   = 2,
  beamHeight  = 15,
  beamNumber  = 10,
  lightColor  = '#ffffff',
  speed       = 1,
  rotation    = 0,
  className   = '',
}) {
  const rotationRad = (rotation * Math.PI) / 180

  return (
    <div className={`beams${className ? ` ${className}` : ''}`}>
      <Canvas
        // Perspective camera is irrelevant — vertex shader bypasses it.
        // We still need a camera node to satisfy R3F's render loop.
        camera={{ position: [0, 0, 1], near: 0.1, far: 10 }}
        gl={{ alpha: true, antialias: false }}
        // Cap at 1.5× DPR — beams don't need retina sharpness
        dpr={[1, 1.5]}
      >
        <BeamQuad
          beamWidth={beamWidth}
          beamHeight={beamHeight}
          beamNumber={beamNumber}
          lightColor={lightColor}
          speed={speed}
          rotationRad={rotationRad}
        />
      </Canvas>
    </div>
  )
}
