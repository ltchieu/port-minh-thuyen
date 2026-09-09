export interface ProjectCollage {
  id?: string;
  title: string;
  badge?: string;
  description?: string;
  images: string[];
}

export interface PdfLink {
  label: string;
  url: string;
  logo?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  logo?: string;
  logos?: string[];
  coverImage: string;
  galleryImages: string[];
  collages?: ProjectCollage[];
  badgeColor: 'pink' | 'tiffany' | 'green' | 'orange';
  summary: string;
  challenge?: string;
  concept?: string;
  results?: string[];
  tags: string[];
  featured?: boolean;
  projectType?: 'personal' | 'business';
  pdfUrl?: string;
  pdfLinks?: PdfLink[];
  grade?: string;
  folderNote?: string;
  finalExecution?: string;
  rationale?: string;
  keyInsights?: string;
  showName?: string;
  imageCaptions?: Record<string, string>;
}
