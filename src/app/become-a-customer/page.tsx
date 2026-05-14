import type { Metadata } from 'next';
import becomeContent from '@/content/become-a-customer-content.json';
import siteContent from '@/content/site-content.json';
import { BecomeCustomerContent } from '@/types/become-a-customer-content';
import { SiteContent } from '@/types/content';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/PageHero/PageHero';
import BenefitCards from '@/components/BenefitCards/BenefitCards';
import ProductAreas from '@/components/ProductAreas/ProductAreas';
import WhyBT from '@/components/WhyBT/WhyBT';
import ApplySection from '@/components/ApplySection/ApplySection';

const become = becomeContent as BecomeCustomerContent;
const site = siteContent as SiteContent;

export const metadata: Metadata = {
  title: become.meta.title,
  description: become.meta.description,
};

export default function BecomeACustomerPage() {
  return (
    <>
      <Header content={site.header} />
      <main>
        <PageHero content={become.pageHero} />
        <BenefitCards content={become.benefits} />
        <ProductAreas content={become.products} />
        <WhyBT content={become.whyBT} />
        <ApplySection content={become.apply} />
      </main>
      <Footer content={site.footer} />
    </>
  );
}
