export default function sitemap() {
    const baseUrl = 'https://www.mopizz.it';
    const today = '2026-05-27';
    return [
        { url: baseUrl, lastModified: today, changeFrequency: 'weekly', priority: 1 },
        { url: `${baseUrl}/asporto`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/consegne`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/fidelity`, lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/eventi`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/privacy`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
    ];
}
