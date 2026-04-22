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

function toSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildRichSections(topic, focus) {
  return [
    {
      heading: `Why ${topic} matters in 2026`,
      paragraphs: [
        `${topic} directly impacts how quickly visitors trust your brand and decide whether to contact your team. Many websites lose opportunities because they speak in broad claims instead of answering decision-stage questions. Strong execution starts with intent mapping, clear messaging, and page structure that makes next steps obvious. Search engines also favor pages that explain a topic from multiple useful angles, which means depth is not optional anymore. When your page combines technical quality, practical examples, and specific outcomes, both rankings and conversion rates usually improve together rather than competing with each other.`,
        `For service businesses, this topic often determines whether traffic turns into qualified leads or low-fit inquiries. A good page clarifies who the offer is for, what process is used, how long work takes, and what results are realistic. Instead of keyword stuffing, use plain language that matches what buyers actually ask in calls and emails. This approach improves readability, keeps bounce rates lower, and gives search engines stronger contextual signals. The best-performing pages feel like expert guidance, not sales-heavy copy, and that balance is what improves both user trust and long-term SEO stability.`,
      ],
    },
    {
      heading: `A practical monthly execution framework`,
      paragraphs: [
        `Use a four-week cycle to keep momentum without overcomplicating operations. Week one: audit top pages for intent alignment, content clarity, and crawl/index signals. Week two: rewrite headlines, service intros, FAQs, and call-to-action blocks using customer language and problem-first framing. Week three: improve performance by reducing render-blocking scripts, compressing assets, and tightening layout behavior across mobile devices. Week four: publish one long-form blog and connect it internally to service pages and case studies. This recurring cycle gives your site consistent freshness while improving technical quality and business relevance at the same time.`,
        `The framework works best when documentation stays lean. Keep one sheet for target queries, one brief for each URL, and one changelog for edits. This makes performance reviews easier because you can connect metric movement to specific updates. If rankings rise but leads do not, improve conversion blocks. If leads rise but impressions stall, expand topical coverage. Treat each page as a product you iterate, not a static asset you publish once. Teams that review and improve pages every month usually outperform teams that rely on occasional redesign projects with no follow-up optimization process.`,
      ],
    },
    {
      heading: `Common implementation mistakes`,
      paragraphs: [
        `A major mistake is publishing thin content that repeats similar points without adding useful detail. Another issue is weak internal linking, where blogs, service pages, and proof pages remain disconnected. This limits crawl efficiency and prevents authority flow toward high-value URLs. A third mistake is vague call-to-action language that creates friction at the decision moment. Replace broad phrases with clear next actions that match page intent, such as requesting an audit, booking a consultation, or reviewing a relevant case study. Every section on the page should help visitors move forward with confidence.`,
        `Technical hygiene also matters more than many teams expect. Broken links, inconsistent canonicals, duplicate variants, and poor mobile rendering can block otherwise strong content from indexing well. Regularly test core templates and route behavior after deployments, especially on multilingual sites. If Google crawls pages but does not index them, improve uniqueness, strengthen internal relevance, and reduce low-value duplicates. Search performance is not only about adding keywords; it is about delivering a clean, understandable site architecture where each URL has a clear role in the user journey and in topical coverage.`,
      ],
    },
    {
      heading: `${focus}: turning traffic into qualified pipeline`,
      paragraphs: [
        `${focus} should be treated as a growth system, not a one-off checklist. Your content strategy, UX decisions, and development standards need to support the same business objective. Start by defining what a qualified lead means for your team, then shape each page around that definition. Include credibility signals, implementation detail, and expectation-setting language. This reduces low-intent inquiries and improves sales conversations. It also improves behavioral metrics that often correlate with stronger organic performance over time, especially on competitive service terms where trust and clarity are major ranking differentiators.`,
        `A useful benchmark is whether a visitor can answer three questions in under sixty seconds: what you do, why your approach is credible, and what step to take next. If the answer is unclear, redesign the page flow and rewrite key blocks before publishing more content. Scaling without clarity usually creates noise, not growth. The best SEO outcomes happen when every page is built to be helpful first, technically sound second, and strategically connected third. That sequence keeps your site both crawl-friendly and conversion-ready as traffic increases month by month.`,
      ],
    },
    {
      heading: `Long-term growth playbook`,
      paragraphs: [
        `Long-term gains come from consistency and controlled iteration. Keep publishing useful, specific content while maintaining technical standards across templates and route patterns. Refresh high-value pages quarterly with updated examples, expanded FAQs, and stronger internal links. Monitor Search Console for indexing gaps, canonical conflicts, and query shifts, then adjust content priorities accordingly. When multiple pages target similar intent, consolidate instead of competing against yourself. This makes signals cleaner for search engines and simpler for users. A disciplined update rhythm builds compounding visibility and better lead quality over time.`,
        `If you need a practical next step this week, pick one service page and one related blog article. Improve both for clarity, depth, and internal linking, then measure impressions, click-through rate, engagement, and lead actions over thirty days. Small improvements repeated consistently produce larger results than occasional large redesigns. Teams that treat SEO as operational work, not campaign work, usually see steadier growth and fewer indexing surprises. Keep your process simple, evidence-based, and user-focused, and you will build durable performance that supports both search visibility and business outcomes.`,
      ],
    },
  ];
}

function buildBlog({ id, title, keywords, daysAgo, topic, focus }) {
  const createdAt = new Date(Date.now() - daysAgo * DAY_MS).toISOString();
  const updatedAt = new Date(Date.now() - Math.max(daysAgo - 3, 0) * DAY_MS).toISOString();
  const excerpt = `Practical guidance on ${topic} with an implementation-focused approach for service businesses that want faster growth and stronger SEO outcomes.`;

  return {
    _id: `static-${id}`,
    locale: "en",
    status: "published",
    author: "Swagatam Tech",
    title,
    slug: toSlug(title),
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

const BLOG_TOPICS = [
  { title: "Technical SEO for Service Websites: A Practical 90-Day Roadmap", keywords: "technical seo, service website seo, crawlability, indexing, core web vitals", topic: "technical SEO", focus: "crawl coverage and indexing consistency" },
  { title: "How to Build High-Converting Service Pages with Clear User Intent", keywords: "service page optimization, conversion copywriting, website leads, user intent", topic: "service page optimization", focus: "conversion-focused information architecture" },
  { title: "Next.js SEO Checklist: Metadata, Sitemaps, and International URLs", keywords: "next.js seo, sitemap nextjs, metadata, hreflang, international seo", topic: "Next.js SEO implementation", focus: "metadata quality and multilingual structure" },
  { title: "Internal Linking Strategy That Improves Crawl Depth and User Navigation", keywords: "internal linking, crawl depth, seo architecture, content clusters", topic: "internal linking architecture", focus: "discoverability and topical authority" },
  { title: "Core Web Vitals for Lead Generation Websites: What Actually Works", keywords: "core web vitals, website speed optimization, lead generation website", topic: "website performance optimization", focus: "real-world speed and conversion impact" },
  { title: "SEO Content Operations for Agencies: From Topic Planning to Refresh Cycles", keywords: "seo content operations, agency seo workflow, content refresh strategy", topic: "SEO content operations", focus: "repeatable publishing and refresh systems" },
  { title: "B2B Website Trust Signals That Increase Qualified Inquiries", keywords: "b2b website optimization, trust signals, conversion optimization", topic: "B2B website credibility", focus: "trust-led conversion design" },
  { title: "International SEO Basics for Localized Websites", keywords: "international seo, hreflang, canonical tags, multilingual website seo", topic: "international SEO", focus: "locale routing and canonical clarity" },
  { title: "How to Structure SEO-Friendly Service Pages for Better Rankings", keywords: "seo service pages, service page seo, on page seo", topic: "on-page SEO for service pages", focus: "relevance and conversion alignment" },
  { title: "Website Speed Optimization Checklist for Growing Businesses", keywords: "website speed optimization, fast website build, page speed", topic: "website speed optimization", focus: "performance-led lead generation" },
  { title: "SEO for Web Development Agencies: Positioning and Content Strategy", keywords: "seo for agencies, web development agency seo, agency marketing", topic: "agency SEO strategy", focus: "positioning for high-intent clients" },
  { title: "How to Write SEO Blog Content That Actually Generates Leads", keywords: "seo blog writing, blog content strategy, lead generation content", topic: "SEO blog content", focus: "traffic-to-lead conversion pathways" },
  { title: "Conversion-Focused UX Patterns for Service Business Websites", keywords: "ux for conversion, service website ux, conversion design", topic: "conversion-focused UX", focus: "decision-stage user experience" },
  { title: "A Practical Guide to Canonical Tags for Multi-Page Websites", keywords: "canonical tags, duplicate content seo, technical seo guide", topic: "canonical strategy", focus: "duplicate URL control and indexing quality" },
  { title: "How to Improve Crawl Budget on Medium-Sized Business Sites", keywords: "crawl budget optimization, google crawl, technical seo", topic: "crawl budget optimization", focus: "indexing efficiency and URL priority" },
  { title: "Local SEO for Multi-City Service Businesses", keywords: "local seo, multi city seo, geo targeted seo", topic: "local SEO", focus: "city page relevance and authority flow" },
  { title: "How to Build a Fast Website in 4 to 6 Weeks", keywords: "fast website build, quick website launch, rapid web development", topic: "fast website delivery", focus: "speed without sacrificing quality" },
  { title: "SEO-Friendly URL Structures for Content and Service Hubs", keywords: "seo url structure, content hub seo, site architecture", topic: "URL architecture", focus: "clean routing and relevance mapping" },
  { title: "Landing Page SEO: Balancing Performance and Conversion", keywords: "landing page seo, conversion landing page, fast landing page", topic: "landing page SEO", focus: "commercial intent capture" },
  { title: "How to Use Case Studies for Better SEO and Trust", keywords: "case study seo, social proof marketing, b2b content", topic: "case study content strategy", focus: "proof-driven organic growth" },
  { title: "SEO Metrics That Matter for Service Businesses", keywords: "seo metrics, lead generation metrics, organic growth", topic: "SEO measurement", focus: "business-aligned reporting" },
  { title: "How to Build Topic Clusters for Long-Term SEO Growth", keywords: "topic clusters, seo content clusters, semantic seo", topic: "topic cluster planning", focus: "topical authority development" },
  { title: "Technical SEO Audit Workflow for Small Teams", keywords: "technical seo audit, seo workflow, website audit", topic: "technical SEO auditing", focus: "high-impact issue prioritization" },
  { title: "Optimizing Blog Templates for Better Indexing", keywords: "blog template seo, blog indexing, structured content", topic: "blog template optimization", focus: "template-level SEO improvements" },
  { title: "Mobile-First SEO for Fast Growing Brands", keywords: "mobile first seo, mobile website optimization, core web vitals", topic: "mobile-first optimization", focus: "mobile performance and engagement" },
  { title: "How to Improve CTR from Search Without Rewriting Everything", keywords: "improve ctr seo, title tag optimization, meta description", topic: "search CTR optimization", focus: "snippet-level conversion improvements" },
  { title: "Content Refresh Strategy for Existing SEO Pages", keywords: "content refresh seo, update old content, ranking recovery", topic: "content refresh operations", focus: "sustained ranking performance" },
  { title: "SEO for Portfolio Pages: Turning Views into Leads", keywords: "portfolio seo, project page seo, service business leads", topic: "portfolio page optimization", focus: "proof-driven conversion pathways" },
  { title: "How to Build Strong Internal Links Across Services and Blogs", keywords: "internal links seo, service and blog linking, crawl depth", topic: "internal link strategy", focus: "authority flow and user navigation" },
  { title: "SEO Roadmap for New Websites in Competitive Niches", keywords: "new website seo roadmap, competitive seo strategy, launch seo", topic: "new site SEO planning", focus: "launch-stage visibility growth" },
  { title: "How to Reduce Soft 404s and Improve Index Quality", keywords: "soft 404 fix, indexing quality, technical seo issues", topic: "index quality management", focus: "eliminating low-value URL signals" },
  { title: "Website Redesign SEO Checklist to Protect Rankings", keywords: "website redesign seo, migration checklist, seo preservation", topic: "redesign SEO", focus: "risk reduction during redesign" },
  { title: "Fast Website Design Principles for Better Engagement", keywords: "fast website design, performance design, engagement ux", topic: "performance-first design", focus: "speed, clarity, and conversion alignment" },
  { title: "SEO-Friendly Copywriting Framework for Service Brands", keywords: "seo copywriting, service business copywriting, conversion copy", topic: "SEO copywriting", focus: "intent-match messaging and action clarity" },
  { title: "How to Improve Time on Page with Better Content Structure", keywords: "time on page seo, content structure, user engagement", topic: "content structure optimization", focus: "engagement metrics and readability" },
  { title: "Practical Schema Markup for Business Websites", keywords: "schema markup, structured data seo, rich results", topic: "structured data implementation", focus: "entity clarity and rich result readiness" },
];

const STATIC_BLOGS = BLOG_TOPICS.map((entry, index) =>
  buildBlog({
    id: index + 1,
    title: entry.title,
    keywords: entry.keywords,
    daysAgo: 220 - index * 4,
    topic: entry.topic,
    focus: entry.focus,
  })
);

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
