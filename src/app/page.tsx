import siteContent from '@/content/site-content.json';
import { SiteContent } from '@/types/content';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import ProductCards from '@/components/ProductCards/ProductCards';
import SupportSection from '@/components/SupportSection/SupportSection';
import Testimonial from '@/components/Testimonial/Testimonial';
import WhySection from '@/components/WhySection/WhySection';
import Footer from '@/components/Footer/Footer';

const content = siteContent as SiteContent;

export default function Page() {
  return (
    <>
      <Header content={content.header} />
      <main>
        <Hero content={content.hero} />
        <ProductCards content={content.productCards} />
        <SupportSection content={content.support} />
        <Testimonial content={content.testimonial} />
        <WhySection content={content.whySection} />
      </main>
      <Footer content={content.footer} />
    </>
  );
}
