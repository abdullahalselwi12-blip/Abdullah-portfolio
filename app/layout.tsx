require('./globals.css');
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
  metadataBase: new URL("https://abdullah-portfolio-puce-theta.vercel.app"),

  title: {
    default: "Abdullah Dia'a Hassan Sief Al-Selwi | Cybersecurity Engineer",
    template: "%s | Abdullah Al-Selwi",
  },

  description:
    "Official portfolio of Abdullah Dia'a Hassan Sief Al-Selwi, Computer Science student and Cybersecurity Engineer specializing in penetration testing, network security, AI, IoT security, and full-stack development.",

  keywords: [
    "Abdullah Al-Selwi",
    "Abdullah Dia'a Hassan Sief Al-Selwi",
    "عبدالله الصلوي",
    "عبدالله ضياء حسن سيف الصلوي",
    "Cybersecurity Engineer",
    "Ethical Hacker",
    "Penetration Tester",
    "Network Security",
    "Computer Science",
    "Full Stack Developer",
    "Artificial Intelligence",
    "IoT Security",
    "Next.js",
    "Supabase",
    "Portfolio",
    "Yemen",
    "Sana'a University"
  ],

  authors: [
    {
      name: "Abdullah Dia'a Hassan Sief Al-Selwi",
      url: "https://abdullah-portfolio-puce-theta.vercel.app",
    },
  ],

  creator: "Abdullah Dia'a Hassan Sief Al-Selwi",

  publisher: "Abdullah Dia'a Hassan Sief Al-Selwi",

  alternates: {
    canonical: "https://abdullah-portfolio-puce-theta.vercel.app",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abdullah-portfolio-puce-theta.vercel.app",
    siteName: "Abdullah Portfolio",
    title: "Abdullah Dia'a Hassan Sief Al-Selwi",
    description:
      "Cybersecurity Engineer | Computer Science Student | Full Stack Developer",
    images: [
      {
        url: "/photo_2026-07-24_23-19-26.jpg",
        width: 1200,
        height: 630,
        alt: "Abdullah Dia'a Hassan Sief Al-Selwi",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Abdullah Dia'a Hassan Sief Al-Selwi",
    description:
      "Cybersecurity Engineer | Computer Science Student",
    images: ["/photo_2026-07-24_23-19-26.jpg"],
  },

  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },

  category: "Technology",
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