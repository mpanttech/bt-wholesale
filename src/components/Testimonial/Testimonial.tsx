import { TestimonialContent } from '@/types/content';
import styles from './Testimonial.module.css';

interface Props {
  content: TestimonialContent;
}

export default function Testimonial({ content }: Props) {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <svg className={styles.quoteIcon} viewBox="0 0 64 48" fill="none" aria-hidden="true">
          <path d="M0 48V28C0 12 10 4 28 0l4 6C20 9 15 15 14 24h14v24H0zm34 0V28C34 12 44 4 62 0l4 6C54 9 49 15 48 24h14v24H34z" fill="currentColor" />
        </svg>
        <figure className={styles.figure}>
          <blockquote className={styles.quote}>{content.quote}</blockquote>
          <figcaption className={styles.attribution}>
            <span className={styles.author}>{content.author}</span>
            <span className={styles.role}>
              {content.role}, {content.company}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
