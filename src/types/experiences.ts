export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  description: string;
  badgeColor?: 'pink' | 'tiffany' | 'green' | 'orange';
  period?: string;
  location?: string;
  highlights?: string[];
  skills?: string[];
  logo?: string;
  link?: string;
}
