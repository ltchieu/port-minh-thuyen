export interface SocialLink {
  platform: string;
  handle: string;
  url: string;
  icon: string;
}

export interface ContactData {
  heading: string;
  noteTitle: string;
  noteBody: string;
  email: string;
  worldwideEmail?: string;
  phone?: string;
  location: string;
  socials: SocialLink[];
}
