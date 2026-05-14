import { ApplyContent } from '@/types/become-a-customer-content';
import styles from './ApplySection.module.css';

interface Props {
  content: ApplyContent;
}

export default function ApplySection({ content }: Props) {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.textCol}>
            <h2 className={styles.heading}>{content.heading}</h2>
            <p className={styles.description}>{content.description}</p>
            <ul className={styles.list}>
              {content.requirements.map((req, i) => (
                <li key={i} className={styles.listItem}>
                  <span className={styles.checkIcon} aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.ctaCol}>
            <div className={styles.ctaCard}>
              <h3 className={styles.ctaCardHeading}>Ready to get started?</h3>
              <p className={styles.ctaCardText}>
                Complete the online form to begin your journey as a BT Wholesale customer. Our team will be in touch to guide you through the process.
              </p>
              <a href={content.cta.href} className={styles.ctaButton} target="_blank" rel="noopener noreferrer">
                {content.cta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
