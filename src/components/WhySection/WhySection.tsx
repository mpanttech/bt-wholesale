import { WhySectionContent } from '@/types/content';
import styles from './WhySection.module.css';

const icons: Record<string, React.ReactNode> = {
  lightbulb: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 6a14 14 0 019.9 23.9L32 34H16l-1.9-4.1A14 14 0 0124 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M18 34v2a6 6 0 0012 0v-2" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="24" y1="6" x2="24" y2="2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="6" y1="24" x2="2" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="42" y1="24" x2="46" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="24" cy="24" rx="10" ry="20" stroke="currentColor" strokeWidth="2.5" />
      <line x1="4" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="2.5" />
      <line x1="10" y1="14" x2="38" y2="14" stroke="currentColor" strokeWidth="2.5" />
      <line x1="10" y1="34" x2="38" y2="34" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  ),
  innovation: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M8 40l10-10M40 8L30 18M24 24l-8-8 16-8-8 16z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  ),
};

interface Props {
  content: WhySectionContent;
}

export default function WhySection({ content }: Props) {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{content.heading}</h2>
        <div className={styles.grid}>
          {content.cards.map((card) => (
            <div key={card.id} className={styles.card}>
              <div className={styles.iconWrap}>
                {icons[card.icon] ?? icons.innovation}
              </div>
              <h3 className={styles.cardHeading}>{card.heading}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
