// import { ICON_COLOR } from '@/app/lib/shared';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
//
// export const viewport: Viewport = {
//   themeColor: ICON_COLOR,
// };

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Tilda 3',
  description: 'Loyalty card app',
  applicationName: 'Tilda 4',
  appleWebApp: true,
  authors: [{ name: 'Lukas Bicus', url: 'https://github.com/LukasBicus' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-48x48.png"
          sizes="48x48"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50`}
      >
        {children}
      </body>
    </html>
  );
}
