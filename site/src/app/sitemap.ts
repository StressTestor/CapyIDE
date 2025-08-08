import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://capyide.dev";
  const routes = [
    "",
    "/features",
    "/pricing",
    "/docs",
    "/blog",
    "/changelog",
    "/security",
    "/privacy",
    "/terms",
    "/contact",
    "/partners",
    "/responsible-disclosure",
  ];
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}


