import { PortalsContent } from '@/types/help-content';
import styles from './PortalAccess.module.css';

const portalIcons: Record<string, React.ReactNode> = {
  portal: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="4" y="10" width="40" height="30" rx="4" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M4 18h40" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="10" cy="14" r="2" fill="currentColor"/>
      <circle cx="16" cy="14" r="2" fill="currentColor"/>
      <circle cx="22" cy="14" r="2" fill="currentColor"/>
      <path d="M12 26h10M12 32h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  hub: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="24" cy="8" r="4" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="40" cy="34" r="4" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="8" cy="34" r="4" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M24 18v-4M29 27l9 4M19 27l-9 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
};

interface Props {
  content: PortalsContent;
}

export default function PortalAccess({ content }: Props) {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{content.heading}</h2>
        <div className={styles.grid}>
          {content.items.map((portal) => (
            <div key={portal.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.iconWrap}>
                  {portalIcons[portal.icon] ?? portalIcons.portal}
                </div>
                <div className={styles.cardMeta}>
                  <h3 className={styles.cardHeading}>{portal.heading}</h3>
                  <p className={styles.cardDescription}>{portal.description}</p>
                </div>
              </div>

              <div className={styles.authRow}>
                <a href={portal.loginLink.href} className={styles.loginBtn}>
                  {portal.loginLink.label}
                </a>
                <a href={portal.registerLink.href} className={styles.registerBtn}>
                  {portal.registerLink.label}
                </a>
                <a href={portal.helpLink.href} className={styles.helpLink}>
                  {portal.helpLink.label}
                </a>
              </div>

              {portal.dashboardLinks.length > 0 && (
                <div className={styles.dashboardLinks}>
                  <p className={styles.dashboardLabel}>Quick links</p>
                  <ul className={styles.linkList}>
                    {portal.dashboardLinks.map((link) => (
                      <li key={link.label}>
                        <a href={link.href} className={styles.dashLink}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M5 10l3-3-3-3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
