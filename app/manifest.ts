import { PRIMARY_COLOR } from '@/app/lib/shared';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The loyalty app application',
    short_name: 'Tilda',
    description: 'A loyalty card app',
    start_url: '/',
    display: 'standalone',
    theme_color: PRIMARY_COLOR,
    background_color: PRIMARY_COLOR,
    orientation: 'portrait',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
