export interface ActivityItem {
  id: string;
  title: string;
  role: string;
  organization?: string;
  period?: string;
  badgeColor: 'pink' | 'tiffany' | 'green' | 'orange';
  description: string;
  coverImage: string;
  images: string[];
  logo?: string;
  tags?: string[];
}
