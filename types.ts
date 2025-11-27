export enum VulnCategory {
  INFRASTRUCTURE = 'Infrastructure',
  FRONTEND = 'Frontend',
  SOCIAL = 'Social Engineering',
  SUPPLY_CHAIN = 'Supply Chain'
}

export interface Vulnerability {
  id: string;
  title: string;
  category: VulnCategory;
  shortDesc: string;
  fullDesc: string;
  realWorldCase: {
    name: string;
    loss: string;
    date: string;
    description: string;
  };
  impactStats: {
    name: string;
    value: number;
  }[]; // For chart
  severity: 'High' | 'Critical' | 'Medium';
  beginnerConcepts: {
    title: string;
    description: string;
  }[];
  similarCases: {
    name: string;
    date: string;
    loss: string;
  }[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}