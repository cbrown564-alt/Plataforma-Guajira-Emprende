import type { MetadataRoute } from "next"
import { opportunities } from "@/data/opportunities"
import { programs } from "@/data/programs"
import { SITE_URL } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/join`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/onboarding`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  const opportunityRoutes: MetadataRoute.Sitemap = opportunities.map((o) => ({
    url: `${SITE_URL}/opportunity/${o.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }))

  const programRoutes: MetadataRoute.Sitemap = programs.map((p) => ({
    url: `${SITE_URL}/program/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [...staticRoutes, ...opportunityRoutes, ...programRoutes]
}
