export interface ImpactLevel {
  value: number;
  label: string;
  text: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string | null; 
  bio: string;
  tags?: string[];
  socials?: {
    linkedin?: string;
    instagram?: string;
  };
}

export interface MissionItem {
  iconKey: string; // We store a string key, not the component
  title: string;
  description: string;
}

export interface NetworkPartner {
  name: string;
  logo?: string;
  url?: string;
}

export interface Trainer {
  id: string;
  name: string;
  sport: 'Judo' | 'Gymnastik' | 'Athletik';
  role: string;
  image: string | null; // URL or null if no image
  bio: string;
  tags: string[];
}