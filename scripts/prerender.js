/**
 * Post-build prerender script for SEO.
 * Serves dist/ locally, captures rendered HTML with Puppeteer,
 * and writes it back to dist/index.html so crawlers see full content.
 */
import { launch } from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST = resolve(__dirname, '..', 'dist');
const PORT = 4173;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

function serve(dir, port) {
  return new Promise((res) => {
    const server = createServer((req, resp) => {
      const urlPath = req.url.split('?')[0];
      let filePath = join(dir, urlPath === '/' ? 'index.html' : urlPath);
      try {
        const data = readFileSync(filePath);
        const ext = extname(filePath);
        resp.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        resp.end(data);
      } catch {
        // SPA fallback
        const html = readFileSync(join(dir, 'index.html'));
        resp.writeHead(200, { 'Content-Type': 'text/html' });
        resp.end(html);
      }
    });
    server.listen(port, () => res(server));
  });
}

async function prerender() {
  console.log('[prerender] Starting static server on port', PORT);
  const server = await serve(DIST, PORT);

  console.log('[prerender] Launching Puppeteer...');
  const browser = await launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  // Desktop viewport for reasonable ScrollTrigger calculations
  await page.setViewport({ width: 1280, height: 800 });

  console.log('[prerender] Navigating to http://localhost:' + PORT + '/');
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for React to render content inside #root
  await page.waitForSelector('#root > *', { timeout: 15000 });

  // Strip GSAP/Lenis inline styles that are viewport-dependent
  // to prevent hydration flicker
  await page.evaluate(() => {
    document.querySelectorAll('[style*="translate"]').forEach((el) => {
      el.removeAttribute('style');
    });
    document.querySelectorAll('[style*="position: fixed"]').forEach((el) => {
      el.removeAttribute('style');
    });
    const lenisWrapper = document.querySelector('.lenis');
    if (lenisWrapper) lenisWrapper.removeAttribute('style');
  });

  const html = await page.content();

  await browser.close();
  server.close();

  const indexPath = join(DIST, 'index.html');
  writeFileSync(indexPath, html, 'utf-8');
  console.log('[prerender] Wrote prerendered HTML to', indexPath);
  console.log('[prerender] Done!');
}

prerender().catch((err) => {
  console.error('[prerender] Error:', err);
  process.exit(1);
});
