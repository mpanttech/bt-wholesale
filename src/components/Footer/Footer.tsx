import { FooterContent } from '@/types/content';
import styles from './Footer.module.css';

interface Props {
  content: FooterContent;
}

const socialIcons: Record<string, React.ReactNode> = {
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452H17.21v-5.569c0-1.328-.026-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.667H9.985V9h3.12v1.561h.044c.434-.823 1.494-1.69 3.076-1.69 3.29 0 3.898 2.165 3.898 4.981v6.6zM5.337 7.433a1.81 1.81 0 110-3.62 1.81 1.81 0 010 3.62zm1.557 13.019H3.779V9h3.115v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  ),
};

export default function Footer({ content }: Props) {
  return (
    <footer className={styles.root}>
      <div className={styles.partnerBanner}>
        <div className={styles.container}>
          <p className={styles.partnerBlurb}>{content.partnerBlurb}</p>
          <a href={content.partnerCta.href} className={styles.partnerCta}>
            {content.partnerCta.label}
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.container}>
          <p className={styles.copyright}>{content.copyright}</p>

          <nav aria-label="Footer legal links">
            <ul className={styles.legalList}>
              {content.legalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={styles.legalLink}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.socialGroup}>
            {content.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.href}
                className={styles.socialLink}
                aria-label={link.platform}
              >
                {socialIcons[link.platform]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
