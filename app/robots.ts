import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/_next/",
        "/_vercel/",
        "/server-sitemap.xml",
      ],
    },
    sitemap: "https://abdullah-portfolio-puce-theta.vercel.app/sitemap.xml",
    host: "https://abdullah-portfolio-puce-theta.vercel.app",
  };
}