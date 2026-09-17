import { HeroData } from './hero';
import { AboutData } from './about';
import { ExperienceItem } from './experiences';
import { ProjectItem } from './projects';
import { ContactData } from './contact';

export * from './hero';
export * from './about';
export * from './experiences';
export * from './projects';
export * from './contact';

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  contact: ContactData;
}

