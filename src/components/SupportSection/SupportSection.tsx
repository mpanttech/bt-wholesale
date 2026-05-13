import { SupportContent } from '@/types/content';
import styles from './SupportSection.module.css';

interface Props {
  content: SupportContent;
}

export default function SupportSection({ content }: Props) {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div className={styles.text}>
          <h2 className={styles.heading}>{content.heading}</h2>
          <p className={styles.body}>{content.body}</p>
        </div>
        <div className={styles.actions}>
          {content.actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className={`${styles.btn} ${action.variant === 'primary' ? styles.primary : styles.secondary}`}
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
