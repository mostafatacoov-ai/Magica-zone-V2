import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://magica-group.com';
  const lastModified = new Date();

  const routes = [
    '',
    '/courses',
    '/camp',
    '/activities',
    '/supplies',
    '/uniform',
    '/bazar',
    '/food',
    '/media',
    '/about',
    '/contact',
    '/inquiry',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate localized entries for English and Arabic
  routes.forEach((route) => {
    // English
    sitemapEntries.push({
      url: `${baseUrl}/en${route}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: route === '' ? 1.0 : 0.8,
    });

    // Arabic
    sitemapEntries.push({
      url: `${baseUrl}/ar${route}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: route === '' ? 1.0 : 0.8,
    });
  });

  return sitemapEntries;
}