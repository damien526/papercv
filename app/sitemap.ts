import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { TEMPLATES_META } from "@/lib/templates-meta";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "", priority: 1 },
    { path: "/builder", priority: 0.9 },
    { path: "/templates", priority: 0.8 },
    ...TEMPLATES_META.map((t) => ({ path: `/templates/${t.id}`, priority: 0.7 })),
    { path: "/free-resume-builder-no-sign-up", priority: 0.7 },
    { path: "/ats-friendly-resume", priority: 0.7 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];
  return pages.map((p) => ({
    url: `${SITE.url}${p.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
