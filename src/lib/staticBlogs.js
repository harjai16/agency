const DAY_MS = 24 * 60 * 60 * 1000;

function toHtml(sections) {
  return sections
    .map(
      (section) => `
<h2>${section.heading}</h2>
${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("\n")}
`
    )
    .join("\n");
}

function buildRichSections(topic, focus) {
  return [
    {
      heading: `Why ${topic} matters for modern businesses`,
      paragraphs: [
        `${topic} is no longer a nice-to-have project that teams postpone until traffic grows. It is a core growth lever because visitors compare your website speed, clarity, and trust signals against the best experience they had this week, not against direct competitors alone. When design, messaging, and performance align with business goals, the website becomes a reliable channel for qualified leads and better sales conversations. Most companies lose opportunities because pages are built feature-first instead of intent-first. Start with user intent, map page outcomes, and create content blocks that answer decision questions quickly and confidently.`,
        `A practical way to improve outcomes is to connect every page to one measurable action. If a service page exists to generate consultation requests, then structure the content around credibility, relevance, and momentum: prove domain expertise, show process transparency, and provide a low-friction next step. Teams that win consistently avoid overloading pages with vague statements and instead use specific examples, before-and-after outcomes, and clear scope language. This helps users self-qualify, reduces unnecessary calls, and improves lead quality. It also helps search engines understand topical depth because the page naturally covers related terms in meaningful context.`,
      ],
    },
    {
      heading: `A framework you can use this month`,
      paragraphs: [
        `Begin with a weekly content and performance review cycle. In week one, identify your highest-intent pages and audit each page against four checkpoints: search intent alignment, message clarity, technical performance, and conversion friction. In week two, rewrite headlines, intros, and call-to-action blocks so they match buyer language instead of internal language. In week three, improve page speed by compressing media, reducing blocking scripts, and tightening layout shifts. In week four, publish a long-form insight piece and interlink it with service pages, case studies, and contact pathways. This sequence creates compounding gains because content and technical signals improve together.`,
        `Do not treat SEO, UX, and development as separate tracks. They work best as one system. Search visibility brings visitors, UX helps visitors evaluate quickly, and development quality ensures interactions stay smooth under real-world conditions. If one layer is weak, the full funnel underperforms. Teams that align these layers usually see stronger engagement metrics, more qualified inquiries, and better close rates over a quarter. Keep documentation simple: one planning doc for target keywords, one page brief for each URL, and one change log for implemented updates. This keeps the team accountable and makes iteration faster.`,
      ],
    },
    {
      heading: `Common mistakes and how to avoid them`,
      paragraphs: [
        `The most common mistake is publishing thin pages that repeat generic claims. Search engines and users both detect this quickly. Replace weak statements with practical specifics: what you do, for whom, with what process, and what timelines are realistic. Another frequent issue is broken internal linking. Important pages remain disconnected, so authority and crawl attention do not flow where needed. Build deliberate internal pathways from blog articles to service pages, from service pages to case studies, and from case studies to conversion pages. This not only supports discovery but also helps users move forward without guessing where to click next.`,
        `Teams also underestimate maintenance. A page that ranked six months ago may lose relevance if competitors update content more frequently or if your own offerings evolve. Create a refresh schedule based on business value: refresh top commercial pages every month, update cornerstone blog guides every quarter, and retire obsolete content when it no longer supports positioning. Use analytics and Search Console signals to choose priorities instead of relying on instinct alone. Consistent updates communicate freshness and reliability, which helps both crawling and ranking stability.`,
      ],
    },
    {
      heading: `${focus} and long-term growth`,
      paragraphs: [
        `Long-term growth comes from repeatable execution, not one-time optimization bursts. Treat your site as an operational asset that your team improves every sprint. Build reusable content components, establish a review checklist before publishing, and align marketing with development planning so technical debt does not slow campaign goals. Over time, this approach creates a stronger content moat and better user trust. It also gives search engines clearer signals because your information architecture remains stable while content depth improves. Businesses that follow this model usually outperform competitors that rely on sporadic redesign cycles.`,
        `If you need a next action, pick one key page and one supporting article this week. Upgrade both using the same language model, intent mapping, and internal linking structure. Then measure changes in impressions, clicks, engagement, and lead actions over the next 30 days. The result is rarely dramatic overnight, but it is consistently positive when execution quality is high. Keep the loop simple: plan, publish, measure, refine. That process is what turns website traffic into predictable revenue outcomes.`,
      ],
    },
  ];
}

function buildBlog({
  id,
  title,
  slug,
  excerpt,
  keywords,
  daysAgo,
  topic,
  focus,
}) {
  const createdAt = new Date(Date.now() - daysAgo * DAY_MS).toISOString();
  const updatedAt = new Date(Date.now() - Math.max(daysAgo - 2, 0) * DAY_MS).toISOString();

  return {
    _id: `static-${id}`,
    locale: "en",
    status: "published",
    author: "Swagatam Tech",
    title,
    slug,
    excerpt,
    keywords,
    metaTitle: title,
    metaDescription: excerpt,
    featuredImage: "/logo.jpeg",
    createdAt,
    updatedAt,
    content: toHtml(buildRichSections(topic, focus)),
    source: "static",
  };
}

const STATIC_BLOGS = [
  buildBlog({
    id: 1,
    title: "Technical SEO for Service Websites: A Practical 90-Day Roadmap",
    slug: "technical-seo-service-websites-90-day-roadmap",
    excerpt: "A practical, step-by-step plan to improve crawlability, indexing, and qualified lead flow for service business websites.",
    keywords: "technical seo, service website seo, crawlability, indexing, core web vitals",
    daysAgo: 60,
    topic: "technical SEO",
    focus: "crawl coverage and indexing consistency",
  }),
  buildBlog({
    id: 2,
    title: "How to Build High-Converting Service Pages with Clear User Intent",
    slug: "high-converting-service-pages-user-intent",
    excerpt: "Learn how to structure service pages so users understand value fast and move toward contact or consultation actions.",
    keywords: "service page optimization, conversion copywriting, website leads, user intent",
    daysAgo: 52,
    topic: "service page optimization",
    focus: "conversion-focused information architecture",
  }),
  buildBlog({
    id: 3,
    title: "Next.js SEO Checklist: Metadata, Sitemaps, and International URLs",
    slug: "nextjs-seo-checklist-metadata-sitemaps-international-urls",
    excerpt: "A detailed checklist for Next.js teams to implement scalable metadata, multilingual canonicals, and reliable sitemap coverage.",
    keywords: "next.js seo, sitemap nextjs, metadata, hreflang, international seo",
    daysAgo: 45,
    topic: "Next.js SEO implementation",
    focus: "metadata quality and multilingual structure",
  }),
  buildBlog({
    id: 4,
    title: "Internal Linking Strategy That Improves Crawl Depth and User Navigation",
    slug: "internal-linking-strategy-crawl-depth-user-navigation",
    excerpt: "Use a practical internal linking model to improve page discovery, content authority flow, and navigation clarity.",
    keywords: "internal linking, crawl depth, seo architecture, content clusters",
    daysAgo: 38,
    topic: "internal linking architecture",
    focus: "discoverability and topical authority",
  }),
  buildBlog({
    id: 5,
    title: "Core Web Vitals for Lead Generation Websites: What Actually Moves the Needle",
    slug: "core-web-vitals-lead-generation-websites",
    excerpt: "Focus on the performance improvements that matter most for user trust, rankings, and lead generation outcomes.",
    keywords: "core web vitals, website speed optimization, lead generation website",
    daysAgo: 30,
    topic: "website performance optimization",
    focus: "real-world speed and conversion impact",
  }),
  buildBlog({
    id: 6,
    title: "SEO Content Operations for Agencies: From Topic Planning to Refresh Cycles",
    slug: "seo-content-operations-topic-planning-refresh-cycles",
    excerpt: "Create a repeatable SEO content workflow that helps agencies publish useful pages and keep rankings stable over time.",
    keywords: "seo content operations, agency seo workflow, content refresh strategy",
    daysAgo: 24,
    topic: "SEO content operations",
    focus: "repeatable publishing and refresh systems",
  }),
  buildBlog({
    id: 7,
    title: "B2B Website Trust Signals: On-Page Elements That Improve Qualified Inquiries",
    slug: "b2b-website-trust-signals-qualified-inquiries",
    excerpt: "Understand which trust signals reduce friction, increase credibility, and support stronger B2B inbound conversions.",
    keywords: "b2b website optimization, trust signals, conversion optimization",
    daysAgo: 16,
    topic: "B2B website credibility optimization",
    focus: "trust-led conversion design",
  }),
  buildBlog({
    id: 8,
    title: "International SEO for Localized Websites: Canonical, Hreflang, and Routing Basics",
    slug: "international-seo-canonical-hreflang-routing-basics",
    excerpt: "A no-fluff guide to canonical handling, hreflang implementation, and locale routing for multilingual SEO success.",
    keywords: "international seo, hreflang, canonical tags, multilingual website seo",
    daysAgo: 10,
    topic: "international SEO",
    focus: "locale routing and canonical clarity",
  }),
];

export function getStaticBlogs(locale = "en") {
  if (!locale || locale === "en") {
    return STATIC_BLOGS;
  }
  return [];
}

export function getStaticBlogBySlug(slug, locale = "en") {
  return getStaticBlogs(locale).find((blog) => blog.slug === slug) || null;
}

export function getAllStaticBlogSlugs() {
  return STATIC_BLOGS.map((blog) => blog.slug);
}

export function mergeBlogsBySlug(dynamicBlogs = [], locale = "en") {
  const staticBlogs = getStaticBlogs(locale);
  const bySlug = new Map();

  for (const blog of staticBlogs) {
    bySlug.set(blog.slug, blog);
  }
  for (const blog of dynamicBlogs) {
    if (blog?.slug) {
      bySlug.set(blog.slug, blog);
    }
  }

  return [...bySlug.values()].sort((a, b) => {
    const aTime = new Date(a.updatedAt || a.createdAt || 0).getTime();
    const bTime = new Date(b.updatedAt || b.createdAt || 0).getTime();
    return bTime - aTime;
  });
}
