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

export interface ScopePhase {
  category: string;
  tasks: string[];
}

export interface ExternalLinkItem {
  label: string;
  url: string;
  platform: 'facebook' | 'drive' | 'web';
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface VideoClipItem {
  id?: string;
  title: string;
  subtitle?: string;
  videoUrl: string;
  localVideoUrl?: string;
  driveUrl?: string;
  embedUrl?: string;
  viewsBadge?: string;
  channelName?: string;
  channelHandle?: string;
  platform?: 'google-drive' | 'facebook' | 'tiktok';
  image?: string;
  duration?: string;
  stats?: {
    likes?: string;
    comments?: string;
    shares?: string;
    views?: string;
  };
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  client: string;
  agency?: string;
  role?: string;
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
  scopeOfWork?: ScopePhase[];
  externalLinks?: ExternalLinkItem[];
  metrics?: ProjectMetric[];
  videoClips?: VideoClipItem[];
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

