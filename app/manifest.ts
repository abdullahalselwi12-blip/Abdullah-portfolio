import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Abdullah Dia'a Al-Selwi — Portfolio",
    short_name: 'Abdullah',
    description: 'Cybersecurity enthusiast, AI researcher, and full-stack developer.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0e1a',
    theme_color: '#0ea5e9',
    icons: [
      { src: '/icon.png', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
