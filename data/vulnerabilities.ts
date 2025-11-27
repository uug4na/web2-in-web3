import { VulnCategory, Vulnerability } from '../types';

export const VULNERABILITIES: Vulnerability[] = [
  {
    id: 'sig-replay',
    title: 'Signature Replay via Web2',
    category: VulnCategory.FRONTEND,
    severity: 'Critical',
    shortDesc: 'Injecting JS to capture signatures and replay them across protocols.',
    fullDesc: '', // Content removed as per user request to rely on simulation
    realWorldCase: {
      name: 'Cross-Context Replay',
      loss: 'Unlimited Approval',
      date: 'Demo Scenario',
      description: 'Wallets do not know which website requested the signature. A signature generated on "CoolGame.xyz" is mathematically valid on "DeFiProtocol.finance" if the message content matches.'
    },
    impactStats: [
      { name: 'Ease of Demo', value: 95 },
      { name: 'Stealth', value: 90 },
      { name: 'User Trust Impact', value: 100 },
      { name: 'Reproducibility', value: 85 }
    ],
    beginnerConcepts: [
      {
        title: "Digital Signature",
        description: "A mathematical stamp that proves YOU approved a message. Unlike a password, it can be copied and shown to others to prove you signed it."
      },
      {
        title: "Replay Attack",
        description: "Like recording someone's voice command to 'Open the Door' and playing it back later. The system hears the valid command, but doesn't know it's a recording."
      }
    ],
    similarCases: [
      { name: "Wintermute Hack", date: "Sept 2022", loss: "$160M" },
      { name: "Opyn Put Option", date: "Aug 2020", loss: "$370k" }
    ]
  },
  {
    id: 'xss-contract-hijack',
    title: 'XSS → Contract Hijack',
    category: VulnCategory.FRONTEND,
    severity: 'Critical',
    shortDesc: 'Hijacking the JS execution context to swap transaction parameters.',
    fullDesc: '', // Content removed as per user request to rely on simulation
    realWorldCase: {
      name: 'SushiSwap / Ledger Kit',
      loss: '$600k+',
      date: 'Dec 2023',
      description: 'Attackers compromised the Ledger Connect Kit library on NPM. This injected malicious JS into every dApp using the library, swapping transaction destinations globally for hours.'
    },
    impactStats: [
      { name: 'Visual Impact', value: 100 },
      { name: 'Execution Speed', value: 95 },
      { name: 'Fix Difficulty', value: 40 },
      { name: 'Scare Factor', value: 90 }
    ],
    beginnerConcepts: [
      {
        title: "XSS (Cross-Site Scripting)",
        description: "A vulnerability where hackers hide malicious commands inside a legitimate website's code, forcing your browser to obey them."
      },
      {
        title: "Blind Signing",
        description: "Approving a transaction without being able to read the raw data code—like signing a contract written in a language you don't speak."
      }
    ],
    similarCases: [
      { name: "BadgerDAO", date: "Dec 2021", loss: "$120M" },
      { name: "KyberSwap Frontend", date: "Sept 2022", loss: "$265k" }
    ]
  }
];