import { Link } from './content';

export interface HelpMetaContent {
  title: string;
  description: string;
}

export interface PageHeroContent {
  breadcrumb: string;
  breadcrumbHref: string;
  heading: string;
  description: string;
}

export interface CategoryItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

export interface CategoriesContent {
  heading: string;
  items: CategoryItem[];
}

export interface ContactCard {
  id: string;
  heading: string;
  description: string;
  cta: Link;
  icon: string;
}

export interface ContactContent {
  heading: string;
  cards: ContactCard[];
  viewAllCta: Link;
}

export interface PortalItem {
  id: string;
  heading: string;
  description: string;
  icon: string;
  loginLink: Link;
  registerLink: Link;
  helpLink: Link;
  dashboardLinks: Link[];
}

export interface PortalsContent {
  heading: string;
  items: PortalItem[];
}

export interface HelpSiteContent {
  meta: HelpMetaContent;
  pageHero: PageHeroContent;
  categories: CategoriesContent;
  contact: ContactContent;
  portals: PortalsContent;
}
