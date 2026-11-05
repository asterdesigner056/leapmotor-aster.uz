#!/usr/bin/env node
/* Скачивает фото и шрифты в папки сайта (нужен Node 18+). Запуск: node tools/download-assets.js
   Уже скачанные файлы пропускаются. Адреса лежат в tools/assets-manifest.json */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const BASE = process.env.ASSET_BASE || '';
const list = JSON.parse(fs.readFileSync(path.join(__dirname, 'assets-manifest.json'), 'utf8'));
(async () => {
  let ok = 0, skip = 0; const failed = [];
  for (const item of list) {
    const dest = path.join(ROOT, item.path);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) { skip++; continue; }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    try {
      const url = BASE ? BASE + '/' + item.path : item.url;
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
      ok++; console.log('OK  ' + item.path);
    } catch (e) { failed.push(item.path); console.log('ERR ' + item.path + ': ' + e.message); }
  }
  console.log(`Скачано: ${ok}, уже были: ${skip}, ошибок: ${failed.length}`);
  if (failed.length) process.exitCode = 1;
})();
