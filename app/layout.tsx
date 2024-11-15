import { AppStateProvider } from '@/app/ui/app-state';
import { ErrorDialogProvider } from '@/app/ui/error-dialog-context';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

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
  title: 'Tilda',
  description: 'Loyalty card app',
  applicationName: 'Tilda',
  appleWebApp: {
    capable: true,
    title: 'Tilda',
    statusBarStyle: 'black',
  },
  authors: [{ name: 'Lukas Bicus', url: 'https://github.com/LukasBicus' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-screen">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 h-full max-h-screen`}
      >
        <AppStateProvider>
          <ErrorDialogProvider>{children}</ErrorDialogProvider>
        </AppStateProvider>
      </body>
    </html>
  );
}
