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
    default: "Abdullah Dia'a Hassan Sief Al-Selwi | Cybersecurity Engineer & Full Stack Developer",
    template: "%s | Abdullah Dia'a Al-Selwi",
  },

  description:
    "Official portfolio of Abdullah Dia'a Hassan Sief Al-Selwi, Computer Science student, Cybersecurity enthusiast, Full Stack Developer, AI researcher, and software engineer from Yemen. Explore projects, certifications, and technical experience.",

  keywords: [
    // Arabic Keywords
    "عبدالله ضياء",
    "عبدالله ضياء حسن سيف الصلوي",
    "عبدالله الصلوي",
    "الأمن السيبراني",
    "مهندس أمن سيبراني",
    "مبرمج",
    "جامعة صنعاء",
    "اختبار الاختراق",
    "أمن الشبكات",
    "مطور ويب",
    "باحث ذكاء اصطناعي",
    "اليمن",
    "صنعاء",
    
    // English Keywords - Name & Identity
    "Abdullah Dia'a Hassan Sief Al-Selwi",
    "Abdullah Dia'a",
    "Abdullah Al-Selwi",
    "Abdullah Hassan Al-Selwi",
    
    // Cybersecurity
    "Cybersecurity",
    "Cybersecurity Engineer",
    "Ethical Hacker",
    "Penetration Tester",
    "SOC Analyst",
    "Network Security",
    "Information Security",
    "Vulnerability Assessment",
    "Security Analyst",
    
    // Development
    "Python Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Full Stack Developer",
    "Software Engineer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    
    // AI & Research
    "AI Researcher",
    "Artificial Intelligence",
    "Machine Learning",
    "IoT Security",
    
    // Education & Location
    "Computer Science Student",
    "Sana'a University",
    "Yemen",
    "Sana'a",
    
    // Portfolio
    "Portfolio",
    "Developer Portfolio",
    "Cybersecurity Portfolio",
    "Tech Portfolio",
    "Personal Website",
    
    // Skills & Technologies
    "Kali Linux",
    "Nmap",
    "Burp Suite",
    "Wireshark",
    "TensorFlow",
    "Supabase",
    "Tailwind CSS",
    "Framer Motion",
    "Git",
    "GitHub",
    "Linux",
    "Cloud Computing"
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
    languages: {
      'en': 'https://abdullah-portfolio-puce-theta.vercel.app',
      'ar': 'https://abdullah-portfolio-puce-theta.vercel.app/ar',
    },
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
      noimageindex: false,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_YE"],
    url: "https://abdullah-portfolio-puce-theta.vercel.app",
    siteName: "Abdullah Dia'a Al-Selwi | Cybersecurity Portfolio",
    title: "Abdullah Dia'a Hassan Sief Al-Selwi | Cybersecurity Engineer & Full Stack Developer",
    description:
      "Official portfolio of Abdullah Dia'a Hassan Sief Al-Selwi, Computer Science student, Cybersecurity enthusiast, Full Stack Developer, AI researcher, and software engineer from Yemen.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abdullah Dia'a Hassan Sief Al-Selwi - Cybersecurity Engineer & Full Stack Developer",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Abdullah Dia'a Hassan Sief Al-Selwi | Cybersecurity Engineer",
    description:
      "Cybersecurity Engineer, Penetration Tester, and Full Stack Developer. Explore my portfolio of AI, security, and web projects.",
    images: ["/og-image.jpg"],
    site: "@AbdullahAlSelwi",
    creator: "@AbdullahAlSelwi",
  },

  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },

  category: "Technology",
  classification: "Portfolio",
  applicationName: "Abdullah Al-Selwi Portfolio",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: "Abdullah Dia'a Hassan Sief Al-Selwi",
  alternateName: ["Abdullah Al-Selwi", "عبدالله الصلوي", "عبدالله ضياء"],
  jobTitle: [
    "Cybersecurity Engineer",
    "Penetration Tester",
    "Full Stack Developer",
    "AI Researcher",
    "Computer Science Student",
  ],
  alumniOf: { 
    '@type': 'CollegeOrUniversity', 
    name: "Sana'a University",
    sameAs: "https://su.edu.ye",
  },
  knowsAbout: [
    "Cybersecurity",
    "Ethical Hacking",
    "Penetration Testing",
    "Artificial Intelligence",
    "IoT Security",
    "Full Stack Development",
    "Network Security",
    "Cloud Computing",
    "Python",
    "Next.js",
    "TypeScript",
    "React",
    "Kali Linux",
    "Nmap",
    "Burp Suite",
    "Wireshark",
    "TensorFlow",
    "Supabase",
    "Tailwind CSS",
  ],
  sameAs: [
    // ⚠️ تأكد من صحة هذه الروابط قبل النشر
    // إذا لم تكن تملك هذه الحسابات، قم بتغييرها أو حذفها
    "https://github.com/abdullahalselwi",
    "https://linkedin.com/in/abdullahalselwi",
    "https://twitter.com/AbdullahAlSelwi",
  ],
  image: "https://abdullah-portfolio-puce-theta.vercel.app/photo_2026-07-24_23-19-26.jpg",
  nationality: "Yemeni",
  address: {
    '@type': 'PostalAddress',
    addressLocality: "Sana'a",
    addressCountry: "Yemen",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="manifest" href="/manifest.json" />
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