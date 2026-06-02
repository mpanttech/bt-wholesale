import type { Metadata } from 'next';
import newsContent from '@/content/news-and-resources-content.json';
import siteContent from '@/content/site-content.json';
import { NewsAndResourcesContent } from '@/types/news-and-resources-content';
import { SiteContent } from '@/types/content';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/PageHero/PageHero';
import SupportCategories from '@/components/SupportCategories/SupportCategories';
import ContactCards from '@/components/ContactCards/ContactCards';
import PortalAccess from '@/components/PortalAccess/PortalAccess';

const news = newsContent as NewsAndResourcesContent;
const site = siteContent as SiteContent;

export const metadata: Metadata = {
  title: news.meta.title,
  description: news.meta.description,
};

export default function NewsAndResourcesPage() {
  return (
    <>
      <Header content={site.header} />
      <main>
        <PageHero content={news.pageHero} />
        <SupportCategories content={news.categories} />
        <ContactCards content={news.contact} />
        <PortalAccess content={news.portals} />
      </main>
      <Footer content={site.footer} />
    </>
  );
}
