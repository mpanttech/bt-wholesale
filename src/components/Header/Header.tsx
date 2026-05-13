import { HeaderContent } from '@/types/content';
import styles from './Header.module.css';

interface Props {
  content: HeaderContent;
}

export default function Header({ content }: Props) {
  return (
    <header className={styles.root}>
      <div className={styles.utility}>
        <div className={styles.container}>
          {content.utilityLinks.map((link) => (
            <a key={link.label} href={link.href} className={styles.utilityLink}>
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <nav className={styles.primary}>
        <div className={styles.container}>
          <a href="/" className={styles.logo} aria-label={content.logoAlt}>
            <svg width="140" height="36" viewBox="0 0 140 36" fill="none" aria-hidden="true">
              <rect width="36" height="36" rx="4" fill="#fff" fillOpacity=".15" />
              <text x="6" y="25" fontSize="18" fontWeight="700" fill="#fff">BT</text>
              <text x="44" y="23" fontSize="13" fontWeight="600" fill="#fff">Wholesale</text>
            </svg>
          </a>

          <ul className={styles.navList}>
            {content.navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={styles.navLink}>{link.label}</a>
              </li>
            ))}
          </ul>

          <div className={styles.authGroup}>
            {content.authLinks.map((link) => (
              <a key={link.label} href={link.href} className={styles.authLink}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
