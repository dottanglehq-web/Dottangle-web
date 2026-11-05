import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { serviceCategories } from '../src/data/servicesCatalog.js';
// Use the packages' ESM entries for Vite 5's SSR loader on current Node versions.
const esmEntry = path => fileURLToPath(new URL(`../node_modules/${path}`, import.meta.url));
const vite = await createServer({
  configFile: false,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
  optimizeDeps: { noDiscovery: true, include: [] },
  resolve: { alias: [
    { find: /^react-router-dom$/, replacement: esmEntry('react-router-dom/dist/index.mjs') },
    { find: /^react-router$/, replacement: esmEntry('react-router/dist/development/index.mjs') },
    { find: /^react-router\/dom$/, replacement: esmEntry('react-router/dist/development/dom-export.mjs') }
  ] },
  ssr: { noExternal: ['react-router-dom', 'react-router', 'lucide-react'] }
});
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
try {
  const { renderServices } = await vite.ssrLoadModule('/src/pages/renderServices.jsx');
  const { serviceMetadata, serviceOrigin } = await vite.ssrLoadModule('/src/data/serviceMetadata.js');
  const template = await readFile('dist/index.html', 'utf8');
  const paths = [];
  for (const category of [null, ...serviceCategories]) {
    const metadata = serviceMetadata(category);
    const path = category ? `/services/${category.id}` : '/services';
    const html = template.replace(/<title>.*?<\/title>/s, `<title>${escape(metadata.title)}</title>`)
      .replace(/<meta name="description"\s+content="[^"]*">/, `<meta name="description" content="${escape(metadata.description)}">`)
      .replace(/<meta property="og:title"\s+content="[^"]*">/, `<meta property="og:title" content="${escape(metadata.title)}">`)
      .replace(/<meta property="og:description"\s+content="[^"]*">/, `<meta property="og:description" content="${escape(metadata.description)}">`)
      .replace('</head>', `<link rel="canonical" href="${metadata.url}"><meta property="og:url" content="${metadata.url}"><script type="application/ld+json" data-prerender-schema>${JSON.stringify(metadata.schema).replaceAll('<', '\\u003c')}</script></head>`)
      .replace('<div id="root"></div>', `<div id="root">${renderServices(path)}</div>`);
    await mkdir(`dist${path}`, { recursive: true });
    await writeFile(`dist${path}/index.html`, html);
    paths.push(path);
  }
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/', '/work', '/process', '/pricing', '/contact', ...paths].map(path => `<url><loc>${serviceOrigin}${path}</loc></url>`).join('')}</urlset>`);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${serviceOrigin}/sitemap.xml\n`);
  console.log(`Prerendered ${paths.length} service pages with metadata, structured data, and sitemap.`);
} finally { await vite.close(); }
