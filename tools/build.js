#!/usr/bin/env node
/* =====================================================================
   СБОРКА HTML ДЛЯ ПОИСКОВИКОВ. Запуск из папки сайта: node tools/build.js
   Создаёт все страницы на двух языках, sitemap.xml и robots.txt
   из js/config.js, js/i18n.js и js/render.js. Запускайте перед публикацией.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const sandbox = {};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
for (const file of ['config.js', 'i18n.js', 'render.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', file), 'utf8'), sandbox, { filename: file });
}
const { SITE_CONFIG: cfg, SITE_I18N: i18n, SITE_RENDER: render } = sandbox;

const pages = [{ kind: 'home', dir: '' }, { kind: 'contacts', dir: 'contacts' }]
  .concat(cfg.models.map((m) => ({ kind: 'model', id: m.id, dir: 'models/' + m.id })));

const version = render.hash(cfg, i18n) + Date.now().toString(36);
for (const lang of ['ru', 'uz']) {
  for (const page of pages) {
    const dir = path.join(ROOT, lang === 'uz' ? 'uz' : '', page.dir);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), render.documentHtml(cfg, i18n, lang, page, version));
  }
}

const today = new Date().toISOString().slice(0, 10);
const urls = pages.map((p) => {
  const tail = p.dir ? p.dir + '/' : '';
  const ru = `${cfg.siteUrl}/${tail}`;
  const uz = `${cfg.siteUrl}/uz/${tail}`;
  const alt = `<xhtml:link rel="alternate" hreflang="ru" href="${ru}"/><xhtml:link rel="alternate" hreflang="uz" href="${uz}"/><xhtml:link rel="alternate" hreflang="x-default" href="${ru}"/>`;
  return `  <url><loc>${ru}</loc><lastmod>${today}</lastmod>${alt}</url>\n  <url><loc>${uz}</loc><lastmod>${today}</lastmod>${alt}</url>`;
}).join('\n');
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`);
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${cfg.siteUrl}/sitemap.xml\n`);
console.log(`Готово: ${pages.length * 2} страниц, sitemap.xml, robots.txt`);
