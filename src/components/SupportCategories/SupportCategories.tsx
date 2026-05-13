import { CategoriesContent } from '@/types/help-content';
import styles from './SupportCategories.module.css';

const icons: Record<string, React.ReactNode> = {
  wifi: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M4 18C10.6 11.4 19.8 8 24 8s13.4 3.4 20 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M10 25c3.7-3.7 8.5-6 14-6s10.3 2.3 14 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M16 32c2.1-2.1 4.9-3.4 8-3.4s5.9 1.3 8 3.4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="24" cy="40" r="3" fill="currentColor"/>
    </svg>
  ),
  ethernet: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="8" y="16" width="32" height="20" rx="3" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M14 16V10M20 16V10M28 16V10M34 16V10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="24" cy="26" r="3" fill="currentColor"/>
      <path d="M24 29v7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M36 34H14a10 10 0 010-20 10 10 0 0119.6 4A8 8 0 1136 34z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
    </svg>
  ),
  document: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M12 6h16l8 8v28H12V6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M28 6v8h8" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M18 22h12M18 28h12M18 34h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  headset: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 10a14 14 0 00-14 14v6h6v-8H12v-1a12 12 0 0124 0v1h-4v8h6v-6a14 14 0 00-14-14z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      <rect x="8" y="28" width="6" height="10" rx="2" stroke="currentColor" strokeWidth="2.5"/>
      <rect x="34" y="28" width="6" height="10" rx="2" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M40 36c0 4-3.6 6-8 6h-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  pricing: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M26 6l16 16-18 20L8 26 26 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      <circle cx="32" cy="16" r="3" fill="currentColor"/>
      <path d="M18 28l4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  billing: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="8" y="10" width="32" height="28" rx="3" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M16 20h16M16 26h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M28 30l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  apps: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="6" y="6" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="2.5"/>
      <rect x="28" y="6" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="2.5"/>
      <rect x="6" y="28" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="2.5"/>
      <rect x="28" y="28" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="2.5"/>
    </svg>
  ),
  network: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="10" r="5" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="8" cy="38" r="5" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="40" cy="38" r="5" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M24 15v8M24 23l-11 10M24 23l11 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  regulatory: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 6l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M12 38h24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M16 42h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  contracts: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M12 6h24v36H12V6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M18 16h12M18 22h12M18 28h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M28 34l4 4 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  faq: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M20 20c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2-1.5 3.3-3 4v2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="24" cy="34" r="1.5" fill="currentColor"/>
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="14" y="4" width="20" height="40" rx="4" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="24" cy="38" r="2" fill="currentColor"/>
      <line x1="18" y1="10" x2="30" y2="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
};

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M7 13l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface Props {
  content: CategoriesContent;
}

export default function SupportCategories({ content }: Props) {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{content.heading}</h2>
        <ul className={styles.grid}>
          {content.items.map((item) => (
            <li key={item.id}>
              <a href={item.href} className={styles.card}>
                <span className={styles.iconWrap}>
                  {icons[item.icon] ?? icons.document}
                </span>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.arrow}><ArrowRight /></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
