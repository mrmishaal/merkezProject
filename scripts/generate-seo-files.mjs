import { promises as fs } from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const photosDir = path.join(rootDir, 'src', 'assets', 'photos');
const siteUrl = 'https://merkezelburhanschool.edu.et';

function toSlug(value) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'category'
  );
}

async function getGalleryCategorySlugs() {
  const entries = await fs.readdir(photosDir, { withFileTypes: true });
  const folderNames = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  const used = new Set();
  const slugs = [];

  for (const folderName of folderNames.sort((a, b) => a.localeCompare(b))) {
    let slug = toSlug(folderName);
    let suffix = 2;
    while (used.has(slug)) {
      slug = `${toSlug(folderName)}-${suffix}`;
      suffix += 1;
    }
    used.add(slug);
    slugs.push(slug);
  }

  return slugs;
}

function buildSitemapXml(paths) {
  const now = new Date().toISOString();
  const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];

  for (const urlPath of paths) {
    lines.push('  <url>');
    lines.push(`    <loc>${siteUrl}${urlPath}</loc>`);
    lines.push(`    <lastmod>${now}</lastmod>`);
    lines.push('    <changefreq>weekly</changefreq>');
    lines.push(urlPath === '/' ? '    <priority>1.0</priority>' : '    <priority>0.8</priority>');
    lines.push('  </url>');
  }

  lines.push('</urlset>');
  return `${lines.join('\n')}\n`;
}

function buildRobotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
}

async function main() {
  const staticPaths = ['/', '/about', '/events', '/news', '/gallery', '/contact', '/downloads'];
  const categorySlugs = await getGalleryCategorySlugs();
  const categoryPaths = categorySlugs.map((slug) => `/gallery/${slug}`);
  const allPaths = [...new Set([...staticPaths, ...categoryPaths])];

  await fs.mkdir(publicDir, { recursive: true });
  await fs.writeFile(path.join(publicDir, 'sitemap.xml'), buildSitemapXml(allPaths), 'utf8');
  await fs.writeFile(path.join(publicDir, 'robots.txt'), buildRobotsTxt(), 'utf8');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

