export default async function sitemap() {
  const baseUrl = "https://swagatamtech.com";

  // 1️⃣ Static pages
  const staticPages = [
    "",
    "/about",
    "/services",
    "/contact",
    "/blogs",
  ];

  // 2️⃣ Fetch ONLY published blogs
  const res = await fetch(
    `${baseUrl}/api/blogs?status=published`,
    { cache: "no-store" }
  );

  const data = await res.json();

  const blogPages = data.blogs.map((blog) => ({
    url: `${baseUrl}/blogs${blog.slug}`,
    lastModified: blog.updatedAt || blog.createdAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    // Static pages
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: page === "" ? 1 : 0.8,
    })),

    // Blog pages (AUTO)
    ...blogPages,
  ];
}
