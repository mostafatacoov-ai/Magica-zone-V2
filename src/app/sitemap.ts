import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://magica-group.com';
    const languages = ['en', 'ar'];
    const routes = ['', '/activities', '/camp', '/courses', '/food', '/bazar', '/about', '/contact', '/inquiry'];

    const urls: MetadataRoute.Sitemap = [];

    languages.forEach((lang) => {
        routes.forEach((route) => {
            urls.push({
                url: `${baseUrl}/${lang}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === '' ? 1.0 : 0.8,
            });
        });
    });

    return urls;
}