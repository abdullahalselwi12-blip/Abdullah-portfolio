import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const sections = ['', '#about', '#skills', '#experience', '#certificates', '#projects', '#gallery', '#resume', '#services', '#testimonials', '#blog', '#contact'];
  return sections.map((s) => ({
    url: `https://abdullah-alselwi.com/${s}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: s === '' ? 1 : 0.8,
  }));
}
