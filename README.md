# Сайт Leapmotor ASTER (Самарканд и Карши)

Чистые HTML, CSS и JS. Страницы: главная, 7 моделей (`/models/c10/`), контакты (`/contacts/`). Узбекская версия лежит в `/uz/` с теми же адресами.

## Первый запуск
1. Откройте папку в VS Code и скачайте фото и шрифты:
   дважды нажмите на файл `download-photos.cmd` или выполните `powershell -ExecutionPolicy Bypass -File tools\download-assets.ps1`
   Если установлен Node 18+, можно так: `node tools/download-assets.js`
2. Откройте `index.html` через расширение Live Server.

## Что где менять
| Что | Файл |
| --- | --- |
| Цены, комплектации, характеристики, филиалы, телефоны, адрес CRM | `js/config.js` |
| Тексты, переводы, заголовки для поиска | `js/i18n.js` |
| Цвета, отступы, кадрирование фото | `css/style.css` |
| Структура блоков | `js/render.js` |
| Фото: `hero.webp`, `01.webp`, `02.webp`... | `assets/img/models/<модель>/` |

## Перед публикацией
Выполните `node tools/build.js`. Команда обновит все страницы, `sitemap.xml` и `robots.txt`.
Файлы `index.html` создаются автоматически, вручную их не правят.
На хостинг загружайте всё, кроме `tools/` и `README.md`.

## После публикации
Добавьте сайт и `sitemap.xml` в Google Search Console и Яндекс Вебмастер, заведите карточки филиалов в Google Business и Яндекс Бизнес.
