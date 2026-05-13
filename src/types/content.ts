export interface Link {
  label: string;
  href: string;
}

export interface MetaContent {
  title: string;
  description: string;
}

export interface HeaderContent {
  utilityLinks: Link[];
  navLinks: Link[];
  authLinks: Link[];
  logoAlt: string;
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  body: string;
  cta: Link;
}

export interface ProductCard {
  id: string;
  heading: string;
  description: string;
  links: Link[];
  icon: string;
  highlight?: boolean;
}

export interface ProductCardsContent {
  sectionTitle: string;
  cards: ProductCard[];
}

export interface SupportAction extends Link {
  variant: 'primary' | 'secondary';
}

export interface SupportContent {
  heading: string;
  body: string;
  actions: SupportAction[];
}

export interface TestimonialContent {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface WhyCard {
  id: string;
  heading: string;
  description: string;
  icon: string;
}

export interface WhySectionContent {
  heading: string;
  cards: WhyCard[];
}

export interface SocialLink {
  platform: string;
  href: string;
}

export interface FooterContent {
  partnerBlurb: string;
  partnerCta: Link;
  legalLinks: Link[];
  socialLinks: SocialLink[];
  copyright: string;
}

export interface SiteContent {
  meta: MetaContent;
  header: HeaderContent;
  hero: HeroContent;
  productCards: ProductCardsContent;
  support: SupportContent;
  testimonial: TestimonialContent;
  whySection: WhySectionContent;
  footer: FooterContent;
}
