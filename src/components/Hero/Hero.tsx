import { HeroContent } from '@/types/content';
import styles from './Hero.module.css';

interface Props {
  content: HeroContent;
}

export default function Hero({ content }: Props) {
  return (
    <section className={styles.root}>
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.headline}>{content.headline}</h1>
          <p className={styles.subheadline}>{content.subheadline}</p>
          <p className={styles.body}>{content.body}</p>
          <a href={content.cta.href} className={styles.cta}>
            {content.cta.label}
          </a>
        </div>
        <div className={styles.visual} aria-hidden="true">
          <svg viewBox="0 0 400 300" fill="none" className={styles.illustration}>
            <circle cx="200" cy="150" r="120" stroke="rgba(255,255,255,.15)" strokeWidth="2" />
            <circle cx="200" cy="150" r="80" stroke="rgba(255,255,255,.2)" strokeWidth="2" />
            <circle cx="200" cy="150" r="40" fill="rgba(255,255,255,.1)" />
            <line x1="200" y1="30" x2="200" y2="270" stroke="rgba(255,255,255,.1)" strokeWidth="1" />
            <line x1="80" y1="150" x2="320" y2="150" stroke="rgba(255,255,255,.1)" strokeWidth="1" />
            <circle cx="200" cy="30" r="6" fill="#00A3E0" />
            <circle cx="320" cy="150" r="6" fill="#00A3E0" />
            <circle cx="200" cy="270" r="6" fill="#7B2DB5" />
            <circle cx="80" cy="150" r="6" fill="#7B2DB5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
