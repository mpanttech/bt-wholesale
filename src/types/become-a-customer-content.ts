import { PageHeroContent } from './help-content';

export interface BecomeCustomerMeta {
  title: string;
  description: string;
}

export interface BenefitItem {
  id: string;
  icon: string;
  heading: string;
  description: string;
}

export interface BenefitsContent {
  heading: string;
  items: BenefitItem[];
}

export interface ProductItem {
  id: string;
  icon: string;
  label: string;
  description: string;
}

export interface ProductsContent {
  heading: string;
  description: string;
  items: ProductItem[];
}

export interface WhyItem {
  id: string;
  icon: string;
  heading: string;
  description: string;
}

export interface WhyContent {
  heading: string;
  items: WhyItem[];
}

export interface ApplyContent {
  heading: string;
  description: string;
  requirements: string[];
  cta: { label: string; href: string };
}

export interface BecomeCustomerContent {
  meta: BecomeCustomerMeta;
  pageHero: PageHeroContent;
  benefits: BenefitsContent;
  products: ProductsContent;
  whyBT: WhyContent;
  apply: ApplyContent;
}
