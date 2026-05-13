import { ProductCardsContent } from '@/types/content';
import styles from './ProductCards.module.css';

const icons: Record<string, React.ReactNode> = {
  connectivity: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.5" />
      <path d="M24 4C24 4 14 14 14 24s10 20 10 20" stroke="currentColor" strokeWidth="2.5" />
      <path d="M24 4C24 4 34 14 34 24s-10 20-10 20" stroke="currentColor" strokeWidth="2.5" />
      <line x1="4" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  ),
  voice: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M10 8h8l4 10-5 3a22 22 0 0010 10l3-5 10 4v8c0 2-2 4-4 3C16 37 11 16 10 12c-1-2 0-4 0-4z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M36 34H14a10 10 0 010-20 10 10 0 0119.6 4A8 8 0 1136 34z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="14" y="4" width="20" height="40" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="38" r="2" fill="currentColor" />
      <line x1="18" y1="10" x2="30" y2="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
};

interface Props {
  content: ProductCardsContent;
}

export default function ProductCards({ content }: Props) {
  return (
    <section className={styles.root} id="products">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{content.sectionTitle}</h2>
        <div className={styles.grid}>
          {content.cards.map((card) => (
            <article
              key={card.id}
              className={`${styles.card} ${card.highlight ? styles.highlight : ''}`}
            >
              <div className={styles.iconWrap}>
                {icons[card.icon] ?? icons.connectivity}
              </div>
              <h3 className={styles.cardHeading}>{card.heading}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
              <ul className={styles.linkList}>
                {card.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={styles.link}>
                      <span>{link.label}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
