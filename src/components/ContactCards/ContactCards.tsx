import { ContactContent } from '@/types/help-content';
import styles from './ContactCards.module.css';

const icons: Record<string, React.ReactNode> = {
  email: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="6" y="12" width="36" height="26" rx="3" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M6 16l18 13L42 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  callback: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M10 10h8l4 10-5 3a22 22 0 0010 10l3-5 10 4v8c0 2-2 4-4 3C16 39 11 18 10 14c-1-2 0-4 0-4z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M32 8c4 0 8 4 8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M32 14a2 2 0 012 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M38 6l4 4-4 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M10 10h8l4 10-5 3a22 22 0 0010 10l3-5 10 4v8c0 2-2 4-4 3C16 39 11 18 10 14c-1-2 0-4 0-4z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
    </svg>
  ),
};

interface Props {
  content: ContactContent;
}

export default function ContactCards({ content }: Props) {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>{content.heading}</h2>
          <a href={content.viewAllCta.href} className={styles.viewAll}>
            {content.viewAllCta.label}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <div className={styles.grid}>
          {content.cards.map((card) => (
            <div key={card.id} className={styles.card}>
              <div className={styles.iconWrap}>
                {icons[card.icon] ?? icons.phone}
              </div>
              <div className={styles.body}>
                <h3 className={styles.cardHeading}>{card.heading}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>
              <a href={card.cta.href} className={styles.cta}>
                {card.cta.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
