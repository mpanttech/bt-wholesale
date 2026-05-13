import type { Metadata } from 'next';
import helpContent from '@/content/help-content.json';
import siteContent from '@/content/site-content.json';
import { HelpSiteContent } from '@/types/help-content';
import { SiteContent } from '@/types/content';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/PageHero/PageHero';
import SupportCategories from '@/components/SupportCategories/SupportCategories';
import ContactCards from '@/components/ContactCards/ContactCards';
import PortalAccess from '@/components/PortalAccess/PortalAccess';

const help = helpContent as HelpSiteContent;
const site = siteContent as SiteContent;

export const metadata: Metadata = {
  title: help.meta.title,
  description: help.meta.description,
};

export default function HelpAndSupportPage() {
  return (
    <>
      <Header content={site.header} />
      <main>
        <PageHero content={help.pageHero} />
        <SupportCategories content={help.categories} />
        <ContactCards content={help.contact} />
        <PortalAccess content={help.portals} />
      </main>
      <Footer content={site.footer} />
    </>
  );
}
