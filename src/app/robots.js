export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/privacy'],
            },
        ],
        sitemap: 'https://www.mopizz.it/sitemap.xml',
        host: 'https://www.mopizz.it',
    };
}
