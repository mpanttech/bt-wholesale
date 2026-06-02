import { CategoriesContent, ContactContent, PageHeroContent, PortalsContent } from './help-content';

export interface NewsResourcesMeta {
  title: string;
  description: string;
}

export interface NewsAndResourcesContent {
  meta: NewsResourcesMeta;
  pageHero: PageHeroContent;
  categories: CategoriesContent;
  contact: ContactContent;
  portals: PortalsContent;
}
