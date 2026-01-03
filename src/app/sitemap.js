export default async function sitemap() {
  const baseUrl = "https://swagatamtech.com";

  // Static routes (App Router auto-detect karta hai)
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/contact",
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
