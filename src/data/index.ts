import { PortfolioData } from '../types';
import { heroData } from './hero';
import { aboutData } from './about';
import { experiencesData } from './experiences';
import { projectsData } from './projects';
import { contactData } from './contact';

export * from './hero';
export * from './about';
export * from './experiences';
export * from './projects';
export * from './contact';

export const initialPortfolioData: PortfolioData = {
  hero: heroData,
  about: aboutData,
  experiences: experiencesData,
  projects: projectsData,
  contact: contactData,
};

