import { PageHeroContent } from '@/types/help-content';
import styles from './PageHero.module.css';

interface Props {
  content: PageHeroContent;
}

export default function PageHero({ content }: Props) {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <a href={content.breadcrumbHref} className={styles.breadcrumbLink}>
            {content.breadcrumb}
          </a>
          <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
          <span className={styles.breadcrumbCurrent}>{content.heading}</span>
        </nav>
        <h1 className={styles.heading}>{content.heading}</h1>
        <p className={styles.description}>{content.description}</p>
      </div>
    </section>
  );
}
