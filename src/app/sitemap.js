export default function sitemap() {
    const baseUrl = 'https://www.mopizz.it';
    return [
        { url: baseUrl, lastModified: '2026-03-10', changeFrequency: 'weekly', priority: 1 },
        { url: `${baseUrl}/ordina`, lastModified: '2026-03-10', changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/gift-cards`, lastModified: '2026-03-10', changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/fidelity`, lastModified: '2026-03-10', changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/privacy`, lastModified: '2026-01-15', changeFrequency: 'yearly', priority: 0.3 },
    ];
}
