// src/data/projects.js
// Single source of truth for all metro map content.
// Structure: 3 lines, 10 stations total.
// Each station has a goal (the achievement) and substops (things that radiated FROM achieving it).

export const LINES = [
  {
    id: 'leader',
    colorHex: '#1B5C38',
    colorVar: 'var(--color-green)',
    label: 'Community Organizing',
    background: 'var(--color-cream)',
    stations: [
      {
        id: 'march-for-science',
        name: 'March for Science',
        goal: 'Organize a large, safe protest',
        achievement: '5,000 attendees',
        substops: [
          'Recruited and coordinated 7-person comms team',
          'Served as secretary — weekly briefings kept all volunteers informed',
          'Templated internal communications for consistency at scale',
          'Established external communication strategy',
          'Wrote press releases',
        ],
      },
      {
        id: 'recycle-hawaii',
        name: 'Recycle Hawaii',
        goal: 'Stabilize and lead Recycle Hawaii through a period of organizational fragility',
        achievement: 'Hired executive director, sustained organizational presence',
        substops: [
          'Became president when the organization was at risk',
          'Recruited and onboarded an executive director',
          'Coordinated the board to support her early initiatives',
          'Maintained active relationships with partner organizations across the island',
          'Worked directly with the state Department of Solid Waste',
          'Kept the org present and engaged through the transition',
        ],
      },
      {
        id: 'blue-mask-group',
        name: 'Blue Mask Group',
        goal: 'Get protective equipment to people when institutional supply chains had failed.',
        achievement: 'Delivered 1000 masks.',
        substops: [
          'Blue wrap is used in hospitals to sanitize tools, then discarded',
          'The material is designed to filter small particles - exactly what masks needed',
          'This reusable material is higher quality, with lower waste',
          'We recruited volunteers - moms, seamstresses, and drivers - to create a production line',
          'Coordinated last-mile distribution at scale',
          'Delivered under conditions of genuine urgency',
        ],
      },
      {
        id: 'ayso',
        name: 'AYSO',
        goal: 'Stop having to ask personal contacts to volunteer',
        achievement: '300 families — 60 teams, 120 coaches, 25 referees, 18-person board',
        substops: [
          'Designed 4-tier volunteer structure: team, coach, coordinator, board',
          'Created a talent funnel — structure made specific asks possible',
          'Built 9 new coordinator roles that distributed board-level ownership',
          'Grew referee program to 25 and rising',
          'Led communications team of 8 with email templates, handouts, and event scripts',
          'Gave coaches worksheets and scripts for consistent in-person implementation',
          'Tracked metrics and iterated on structure each season',
          'Distributed ownership model — structure became self-sustaining',
        ],
      },
      {
        id: 'olympia-planning',
        name: 'Olympia Planning Commission',
        goal: 'Ensure community development decisions reflect long-term civic values',
        achievement: 'Serving as appointed commissioner, ongoing',
        substops: [
          'Appointed commissioner',
          'Active ongoing participation',
        ],
      },
    ],
  },
  {
    id: 'builder',
    colorHex: '#1D4F91',
    colorVar: 'var(--color-blue)',
    label: 'Coding & Product',
    background: 'var(--color-cream)',
    stations: [
      {
        id: 'pemdas',
        name: 'PEMDAS',
        goal: 'Build an engaging math game - with AR and location!',
        achievement: 'Built and Tested for Google Play',
        substops: [
          'Write a proposal including research, features, MVP, tech stack, communication policy, and team timelines',
          'Lead weekly scrums with team updates',
          'Provide code review at key milestones',
          'Led concept, back-end logic, UX, testing, and QA',
          'Built in Unity and C++ — enabling full AR gameplay',
          'Hand designed all 2D assets',
          'Supported frontend design and extended math curricula',
        ],
      },
      {
        id: 'abq',
        name: 'ABQ',
        goal: 'Help readers become active, not passive, consumers of news.',
        achievement: '14 users — unmarketed, organic',
        substops: [
          'Identified pain points in media literacy',
          'Relevance: Tuned an AI prompt to take in any article',
          'Attention: Three questions only - focusing on high yield lenses',
          'Habit: Through repetition, designed to teach recognition over time',
          'Web app completed on AI accelerated timeline',
          'Chrome Extension approved within 2 weeks later',
          'Mobile app in Google Play submission'
        ],
      },
      {
        id: 'crosswords',
        name: 'Crosswords',
        goal: 'Extend the word puzzle format into something spatially and cognitively harder.',
        achievement: 'Approved on Google Play, Testing on Apple',
        substops: [
          'Develop UX for a 5-way Wordle',
          'Tune play logic to suit new complexity',
          'Develop marketing strategy and build automations',
          'Now preparing for public launch...',
        ],
      },
    ],
  },
  {
    id: 'operator',
    colorHex: '#BF8C00',
    colorVar: 'var(--color-yellow)',
    label: 'Operations & Property',
    background: 'var(--color-cream-deep)',
    stations: [
      {
        id: 'property-management',
        name: 'Property Management',
        goal: 'Keep multiple units in good order',
        achievement: '5 units — 6+ year avg tenancy',
        substops: [
          'List properties and market through social media',
          'Coordinate fair screening and background checks',
          'Draft leases that protect all parties',
          'Ticket and provide timely maintenance support',
          'Track and audit business financials',
        ],
      },
      {
        id: 'designer',
        name: 'Designer',
        goal: 'Manage renovation projects that deliver real homes, not just repaired ones',
        achievement: '$40–60K kitchens (market rate: $100K+) —\n$75K full house: 2 kitchens, 4 bathrooms',
        substops: [
          'Identify functional flow issues and design to solve them',
          'Generate proposals grounded in space and design principles',
          'Source bids and negotiate materials and labor costs',
          'Build project timelines and coordinate contractors',
          'Troubleshoot issues in real time to prevent overages',
          'Walk key milestones to verify quality at each stage',
        ],
      }
    ],
  },
]
