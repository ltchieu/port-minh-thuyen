export interface AboutEducation {
  institution: string;
  degree: string;
}

export interface AboutStat {
  label: string;
  value: string;
  color: 'pink' | 'tiffany' | 'green' | 'orange';
}

export interface AboutSkillCategory {
  category: string;
  items: string[];
  color: 'pink' | 'tiffany' | 'green' | 'orange';
}

export interface AboutPolaroidImage {
  url: string;
  caption: string;
  rotation: string;
}

export interface AboutCertificate {
  title: string;
  issuer?: string;
  image: string;
}

export interface AboutLanguage {
  language: string;
  skills: string;
  badges?: string[];
}

export interface AboutData {
  heading: string;
  subheading: string;
  handwrittenQuote: string;
  bioParagraphs: string[];
  name?: string;
  position?: string;
  email?: string;
  phone?: string;
  domains?: string[];
  processSteps?: string[];
  hardSkillsList?: {
    category: string;
    items: string[];
    color: 'pink' | 'tiffany' | 'green' | 'orange';
  }[];
  softSkills?: string[];
  languages?: AboutLanguage[];
  education: AboutEducation[];
  certificates?: AboutCertificate[];
  hardSoftSkills: string[];
  softwareSkills: string[];
  stats: AboutStat[];
  skills: AboutSkillCategory[];
  polaroidImages: AboutPolaroidImage[];
}
