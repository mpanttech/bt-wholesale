import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BT Wholesale | Partner with the UK\'s Largest Network Provider',
  description: 'Join forces with BT Wholesale to unlock innovative, secure, and cost-effective technology solutions tailored to your needs.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
