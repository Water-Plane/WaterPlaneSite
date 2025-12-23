import { MetadataRoute } from 'next';
import { CASE_STUDIES } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://waterplane.in';

    const routes = [
        '',
        '/about',
        '/services',
        '/dives',
        '/work',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 1,
    }));

    const caseStudies = CASE_STUDIES.map((project) => ({
        url: `${baseUrl}/work/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [...routes, ...caseStudies];
}
