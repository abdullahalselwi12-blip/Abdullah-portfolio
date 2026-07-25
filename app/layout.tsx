import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cairo } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { LanguageProvider } from '@/components/providers/language-provider';
import { AuthProvider } from '@/components/providers/auth-provider';
import { LoadingScreen } from '@/components/loading-screen';
import { CustomCursor } from '@/components/custom-cursor';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});
const cairo = Cairo({ subsets: ['arabic', 'latin'], variable: '--font-arabic', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: "Abdullah Dia'a Al-Selwi — Cybersecurity & Full Stack Developer",
    template: "%s — Abdullah Al-Selwi",
  },
  description:
    'Computer Science student, cybersecurity enthusiast, AI researcher, and full-stack developer. Explore projects, skills, certificates, and articles by Abdullah Dia\u2019a Hassan Sief Al-Selwi.',
  keywords: [
    'Abdullah Al-Selwi',
    'Cybersecurity',
    'Full Stack Developer',
    'Computer Science',
    'Sana\u2019a University',
    'AI Researcher',
    'Python Developer',
    'Portfolio',
  ],
  authors: [{ name: "Abdullah Dia'a Hassan Sief Al-Selwi" }],
  openGraph: {
    title: "Abdullah Dia'a Al-Selwi — Portfolio",
    description:
      'Cybersecurity enthusiast, AI researcher, and full-stack developer. Computer Science student at Sana\u2019a University.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_YE',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Abdullah Dia'a Al-Selwi — Portfolio",
    description:
      'Cybersecurity enthusiast, AI researcher, and full-stack developer.',
  },
  robots: { index: true, follow: true },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: "Abdullah Dia'a Hassan Sief Al-Selwi",
  jobTitle: ['Cybersecurity Enthusiast', 'Full Stack Developer', 'AI Researcher', 'Computer Science Student'],
  alumniOf: { '@type': 'CollegeOrUniversity', name: "Sana'a University" },
  knowsAbout: [
    'Cybersecurity',
    'Artificial Intelligence',
    'IoT Security',
    'Full Stack Development',
    'Networking',
    'Cloud Computing',
    'Python',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${cairo.variable} font-sans antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <LoadingScreen />
              <CustomCursor />
              {children}
              <Toaster position="top-center" richColors />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
