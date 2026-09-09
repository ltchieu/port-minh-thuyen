export interface StaffMember {
  name?: string;
  role: string;
  image: string;
  description?: string;
}

export interface StartupItem {
  id: string;
  name: string;
  tagline: string;
  role: string;
  period: string;
  coverImage: string;
  moodboardImages: string[];
  badgeColor: 'pink' | 'tiffany' | 'green' | 'orange';
  description: string;
  highlights: string[];
  websiteUrl?: string;
  members?: StaffMember[];
  conceptImages?: string[];
  postImages?: string[];
  resultImages?: string[];
  resultHighlightText?: string;
  resultFeaturedImage?: string;
}
