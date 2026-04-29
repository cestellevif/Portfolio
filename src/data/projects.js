// src/data/projects.js
// Single source of truth for all metro map content.
// Structure: 3 lines, 10 stations total.
// Each station has a goal (the achievement) and substops (things that radiated FROM achieving it).

export const LINES = [
  {
    id: 'red',
    colorHex: '#E3000F',
    colorVar: 'var(--color-red)',
    label: 'Community Organizing',
    background: 'var(--color-cream)',
    stations: [
      {
        id: 'march-for-science',
        goal: 'Get a large turnout for the March for Science.',
        substops: [
          'Established communications team',
          'Templated internal communications',
          'Wrote press release',
        ],
      },
      {
        id: 'recycle-hawaii',
        goal: 'Establish Recycle Hawaii as an educational advocacy organization in Hilo.',
        substops: [
          'Hired executive director',
          'Supported her initial phase',
          'Interacted with press and media',
        ],
      },
      {
        id: 'blue-mask-group',
        goal: 'Get protective equipment to people when institutional supply chains had failed.',
        substops: [
          'Sourced reusable materials — higher quality, lower waste',
          'Stood up production operation',
          'Coordinated last-mile distribution at scale',
          'Delivered under conditions of genuine urgency',
        ],
      },
      {
        id: 'ayso',
        goal: 'Triple volunteer participation and eliminate burnout without adding staff.',
        substops: [
          'Redesigned coordination architecture',
          'Built role ladders',
          'Created warm handoffs',
          'Distributed ownership model — structure became self-sustaining',
        ],
      },
      {
        id: 'olympia-planning',
        goal: 'Ensure community development decisions reflect long-term civic values.',
        substops: [
          'Appointed commissioner',
          'Active ongoing participation',
        ],
      },
    ],
  },
  {
    id: 'blue',
    colorHex: '#003DA5',
    colorVar: 'var(--color-blue)',
    label: 'Coding & Product',
    background: 'var(--color-cream)',
    stations: [
      {
        id: 'pemdas',
        goal: 'Make math engaging for kids through creativity, customization, and play.',
        substops: [
          'AR game teaching order of operations',
          'Customizable pets as motivation — infinite combinations',
          'Led concept, back-end logic, UX, testing, and QA',
          'Reached production — targeting Google Play',
        ],
      },
      {
        id: 'abq',
        goal: 'Help readers become active, not passive, consumers of news.',
        substops: [
          'Chrome extension: Words, Proof, Missing question categories',
          'Web app shipped',
          'Mobile app in Google Play submission',
          'Mozilla Democracy x AI Incubator grant applicant',
        ],
      },
      {
        id: 'comprehend',
        goal: 'Give users a structured lens for analyzing any article.',
        substops: [
          'Five lenses: Grounding, Language & Framing, Agency & Actors, Claims & Support, Implications & Assumptions',
          'Companion product to ABQ',
          'In progress',
        ],
      },
      {
        id: 'crosswords',
        goal: 'Extend the word puzzle format into something spatially and cognitively harder.',
        substops: [
          'Five intersecting words guessed simultaneously',
          'Spatial reasoning layered onto vocabulary challenge',
          'Google Play approved',
          'Preparing for public launch',
        ],
      },
    ],
  },
  {
    id: 'yellow',
    colorHex: '#FFD700',
    colorVar: 'var(--color-yellow)',
    label: 'Operations & Property',
    background: 'var(--color-cream-deep)',
    stations: [
      {
        id: 'property-management',
        goal: 'Deliver well-managed properties and completed renovations on time.',
        substops: [
          'Execute renovation projects on time',
          'Make cost-saving decisions that deliver real value',
          'Systems instinct applied to physical infrastructure',
        ],
      },
    ],
  },
]
