/* =====================================================================
   ШАБЛОНЫ СТРАНИЦ: главная, 7 моделей, контакты (на двух языках).
   Работает и в браузере, и в tools/build.js, который сохраняет готовый HTML.
   Структура блоков правится здесь. Цены лежат в config.js, тексты в i18n.js.
   ===================================================================== */
(function (root) {
  'use strict';

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function money(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
  function fill(str, map) { return str.replace(/\{(\w+)\}/g, function (_, k) { return map[k]; }); }

  function priceText(price, t, withFrom) {
    if (price == null) return t.onRequest;
    return [withFrom && t.from ? t.from : '', money(price), withFrom ? t.sumFrom : t.sum].filter(Boolean).join(' ');
  }
  function prices(m) { return m.trims.map(function (x) { return x.price; }).filter(function (x) { return x != null; }); }
  function minPrice(m) { var l = prices(m); return l.length ? Math.min.apply(null, l) : null; }
  function maxPrice(m) { var l = prices(m); return l.length ? Math.max.apply(null, l) : null; }
  function defaultTrim(m) {
    for (var i = 0; i < m.trims.length; i++) if (m.trims[i].price != null) return i;
    return 0;
  }

  /* Пути к файлам фото */
  function heroPath(rootPath, id) { return rootPath + 'assets/img/models/' + id + '/hero.webp'; }
  function photoPath(rootPath, id, i) { return rootPath + 'assets/img/models/' + id + '/' + (i < 10 ? '0' : '') + i + '.webp'; }

  /* Хэш настроек: если config или i18n изменили без сборки, браузер пересоберёт страницу */
  function hash(cfg, i18n) {
    var s = JSON.stringify([cfg, i18n]), h = 5381;
    for (var i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
    return h.toString(36);
  }

  /* Адреса страниц. page: {kind:'home'|'contacts'|'model', id:'c10'} */
  function pagePath(page) {
    if (page.kind === 'model') return 'models/' + page.id + '/';
    if (page.kind === 'contacts') return 'contacts/';
    return '';
  }
  function rootFor(lang, page) {
    var depth = (lang === 'uz' ? 1 : 0) + (page.kind === 'model' ? 2 : (page.kind === 'home' ? 0 : 1));
    return new Array(depth + 1).join('../');
  }
  function linkFn(lang, page) {
    var r = rootFor(lang, page);
    return function (target, targetLang) {
      var l = targetLang || lang;
      return (r + (l === 'uz' ? 'uz/' : '') + pagePath(target)) || './';
    };
  }
  function absUrl(cfg, lang, page) { return cfg.siteUrl + '/' + (lang === 'uz' ? 'uz/' : '') + pagePath(page); }

  function hexMark() {
    return '<svg class="hexmark" viewBox="0 0 156 182" aria-hidden="true" focusable="false"><path d="M48.6 120.4v41c0 1.2-1 2-2 2-.4 0-.7-.1-1-.3L2 137.5a4 4 0 0 1-2-3.5V47.4a4 4 0 0 1 2-3.5l24.1-14.2c.4-.2.7-.3 1-.3 1.1 0 2 .9 2 2.1v75.2c0 .7.4 1.4 1 1.8l17.5 10.2c.6.4 1 1.1 1 1.8Z"/><path d="M155.5 47.4V134a4 4 0 0 1-2 3.5l-43.6 25.6c-1.3.8-3-.2-3-1.8v-40.9c0-.7.4-1.4 1-1.8l17.4-10.2c.6-.4 1-1 1-1.8V63.3c0-.7-.4-1.4-1-1.8L95.3 43.9c-1.3-.8-3 .2-3 1.8v127.8l-12.6 7.3c-.5.3-1 .5-1.5.6h-1c-.5-.1-1-.3-1.5-.6l-12.6-7.3V7.9L75.7.5c.6-.3 1.3-.5 2-.5s1.4.2 2 .5l73.7 43.3a4 4 0 0 1 2 3.6Z"/></svg>';
  }

  /* Иконки контактов */
  var ICONS = {
    pin: '<circle cx="12" cy="10" r="3"/><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"/>',
    route: '<path d="M3 11 21 3l-8 18-2-8-8-2Z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/>',
    telegram: '<path d="M21 4 3 11.2l6 2.2L11.3 20l3.3-4.2 4.6 3.4L21 4Z"/><path d="m9 13.4 8-5.6-5.2 7"/>',
    phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z"/>'
  };
  function icon(name) { return '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + ICONS[name] + '</svg>'; }

  function socIcons(b) {
    return '<div class="soc">' +
      '<a href="' + esc(b.instagram) + '" target="_blank" rel="noopener" aria-label="Instagram ' + esc(b.id) + '" title="Instagram">' + icon('instagram') + '</a>' +
      '<a href="' + esc(b.telegram) + '" target="_blank" rel="noopener" aria-label="Telegram ' + esc(b.id) + '" title="Telegram">' + icon('telegram') + '</a></div>';
  }

  /* ---------- ФОРМА ЗАЯВКИ ---------- */
  function form(prefix, cfg, t, lang, intent, modelId) {
    var modelOptions = cfg.models.map(function (m) {
      return '<option value="' + esc(m.id) + '"' + (m.id === modelId ? ' selected' : '') + '>' + esc(m.name) + '</option>';
    }).join('');
    var cityOptions = cfg.branches.map(function (b) {
      return '<label class="seg__item"><input type="radio" name="city" value="' + esc(b.city) + '" required><span>' + esc(b.name[lang]) + '</span></label>';
    }).join('');
    return '' +
      '<form class="lead" data-lead novalidate data-intent="' + esc(intent) + '">' +
        /* Скрытое поле-ловушка для ботов: человек его не видит */
        '<div class="lead__trap" aria-hidden="true"><label>Website<input type="text" name="company" tabindex="-1" autocomplete="off"></label></div>' +
        '<div class="field"><label for="' + prefix + 'name">' + esc(t.fName) + '</label>' +
          '<input id="' + prefix + 'name" name="fio" type="text" autocomplete="name" maxlength="80" required placeholder="' + esc(t.fNamePh) + '" aria-describedby="' + prefix + 'name-err">' +
          '<p class="field__err" id="' + prefix + 'name-err" data-err="fio" hidden></p></div>' +
        '<div class="field"><label for="' + prefix + 'phone">' + esc(t.fPhone) + '</label>' +
          '<input id="' + prefix + 'phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required placeholder="+998 (__) ___ __ __" aria-describedby="' + prefix + 'phone-err">' +
          '<p class="field__err" id="' + prefix + 'phone-err" data-err="phone" hidden></p></div>' +
        '<fieldset class="field field--wide"><legend>' + esc(t.fCity) + '</legend><div class="seg">' + cityOptions + '</div>' +
          '<p class="field__err" data-err="city" hidden></p></fieldset>' +
        '<div class="field"><label for="' + prefix + 'model">' + esc(t.fModel) + '</label>' +
          '<select id="' + prefix + 'model" name="model"><option value="">' + esc(t.fAnyModel) + '</option>' + modelOptions + '</select></div>' +
        '<div class="field"><label for="' + prefix + 'trim">' + esc(t.fTrim) + '</label>' +
          '<select id="' + prefix + 'trim" name="trim" disabled><option value="">' + esc(t.fAnyTrim) + '</option></select></div>' +
        '<div class="field field--wide"><label for="' + prefix + 'comment">' + esc(t.fComment) + ' <small>' + esc(t.fOptional) + '</small></label>' +
          '<textarea id="' + prefix + 'comment" name="comment" rows="2" maxlength="500" placeholder="' + esc(t.fCommentPh) + '"></textarea></div>' +
        '<div class="field--wide lead__foot"><button class="btn btn--primary" type="submit" data-submit>' + esc(intent === 'book' ? t.book : t.consult) + '</button>' +
          '<p class="lead__note">' + esc(t.fNote) + '</p></div>' +
        '<div class="lead__fail field--wide" data-fail role="alert" hidden><strong>' + esc(t.failTitle) + '</strong><p>' + esc(t.failText) + ' ' +
          cfg.branches.map(function (b) { return '<a href="' + esc(b.telegram) + '" target="_blank" rel="noopener">' + esc(b.name[lang]) + '</a>'; }).join(', ') +
        '</p></div>' +
        '<noscript><p class="lead__fail field--wide">' + esc(t.noscript) + '</p></noscript>' +
      '</form>' +
      '<div class="lead-ok" data-ok tabindex="-1" role="status" hidden>' + hexMark() + '<h3>' + esc(t.okTitle) + '</h3><p>' + esc(t.okText) + '</p>' +
        '<button class="btn btn--line" type="button" data-again>' + esc(t.okAgain) + '</button></div>';
  }

  /* Блок заявки: шаги слева, форма справа */
  function requestSection(cfg, t, lang, modelId, title, intent) {
    var steps = t.steps.map(function (s) { return '<li><h3>' + esc(s.title) + '</h3><p>' + esc(s.text) + '</p></li>'; }).join('');
    return '<section class="request" id="request" aria-labelledby="request-title" data-request><div class="wrap request__in">' +
      '<div class="request__side"><h2 id="request-title">' + esc(title) + '</h2><p class="lede">' + esc(t.requestText) + '</p><ol class="steps">' + steps + '</ol></div>' +
      '<div class="request__form" data-form-box>' + form('s-', cfg, t, lang, intent, modelId) + '</div></div></section>';
  }

  /* ---------- ШАПКА И МЕНЮ ---------- */
  function header(cfg, t, lang, page, go, rootPath) {
    /* "Модели" прокручивает к разделу моделей на главной */
    var modelsHref = page.kind === 'home' ? '#models' : go({ kind: 'home' }) + '#models';
    var contactsHref = go({ kind: 'contacts' });
    var current = page.kind === 'contacts' ? ' aria-current="page"' : '';
    return '<header class="top' + (page.kind === 'home' || page.kind === 'model' ? ' top--over' : '') + '" data-top><div class="top__in wrap">' +
      '<a class="top__logo" href="' + go({ kind: 'home' }) + '" aria-label="' + esc(t.homeLabel) + '"><img src="' + rootPath + 'assets/img/logo-brand-dealer.svg" alt="" width="2540" height="228"></a>' +
      '<nav class="top__nav" aria-label="' + esc(t.mainNav) + '"><ul>' +
        '<li><a class="top__link" href="' + modelsHref + '">' + esc(t.navModels) + '</a></li>' +
        '<li><a class="top__link" href="' + contactsHref + '"' + current + '>' + esc(t.navContacts) + '</a></li>' +
      '</ul></nav>' +
      '<div class="top__side">' +
        '<ul class="lang" aria-label="' + esc(t.langSwitch) + '">' +
          '<li><a href="' + go(page, 'ru') + '" hreflang="ru" lang="ru"' + (lang === 'ru' ? ' aria-current="true"' : '') + '>RU</a></li>' +
          '<li><a href="' + go(page, 'uz') + '" hreflang="uz" lang="uz"' + (lang === 'uz' ? ' aria-current="true"' : '') + '>UZ</a></li></ul>' +
        '<button class="btn btn--primary btn--small top__cta" type="button" data-book="book"' + (page.id ? ' data-model="' + esc(page.id) + '"' : '') + '>' + esc(t.book) + '</button>' +
        '<button class="burger" type="button" aria-controls="mega" aria-expanded="false" aria-label="' + esc(t.menuOpen) + '" data-burger data-open="' + esc(t.menuOpen) + '" data-close="' + esc(t.menuClose) + '"><span></span><span></span></button>' +
      '</div></div>' +
      '<div class="mega" id="mega" data-mega><div class="wrap mega__in">' +
        '<ul class="mega__links"><li><a href="' + modelsHref + '">' + esc(t.navModels) + '</a></li><li><a href="' + contactsHref + '">' + esc(t.navContacts) + '</a></li></ul>' +
      '</div></div></header>';
  }

  function footer(cfg, t, lang, go, rootPath) {
    var models = cfg.models.map(function (m) { return '<li><a href="' + go({ kind: 'model', id: m.id }) + '">Leapmotor ' + esc(m.name) + '</a></li>'; }).join('');
    var branches = cfg.branches.map(function (b) {
      return '<li><b>' + esc(b.name[lang]) + '</b>' +
        '<a class="foot__addr" href="' + esc(b.yandexMaps) + '" target="_blank" rel="noopener">' + icon('pin') + '<span>' + esc(b.address[lang]) + '</span></a>' +
        socIcons(b) + '</li>';
    }).join('');
    return '<footer class="foot"><div class="wrap foot__in">' +
      '<div class="foot__brand"><img src="' + rootPath + 'assets/img/logo-brand-dealer.svg" alt="Leapmotor ASTER" width="2540" height="228" loading="lazy"><p>' + esc(t.footerText) + '</p></div>' +
      '<nav aria-label="' + esc(t.navModels) + '"><h2>' + esc(t.navModels) + '</h2><ul class="foot__models">' + models + '</ul></nav>' +
      '<div><h2>' + esc(t.navBranches) + '</h2><ul class="foot__branches">' + branches + '</ul></div>' +
      '<small>© ' + new Date().getFullYear() + ' ' + esc(cfg.siteName) + '. ' + esc(t.footerCopy) + '</small>' +
      '</div></footer>';
  }

  function dialogs(cfg, t, lang) {
    return '<dialog class="dlg" id="book-dialog" aria-labelledby="dlg-title" data-book-dialog data-title-book="' + esc(t.dlgBook) + '" data-title-price="' + esc(t.dlgPrice) + '" data-title-consult="' + esc(t.dlgConsult) + '" data-label-book="' + esc(t.book) + '" data-label-price="' + esc(t.getPrice) + '" data-label-consult="' + esc(t.consult) + '">' +
      '<div class="dlg__head"><h2 id="dlg-title"></h2><button class="dlg__x" type="button" data-dialog-close aria-label="' + esc(t.close) + '">×</button></div>' +
      '<div data-form-box>' + form('d-', cfg, t, lang, 'book') + '</div></dialog>' +
      '<dialog class="lb" data-lb aria-label="' + esc(t.galleryOf) + '">' +
      '<button class="lb__x" type="button" data-dialog-close aria-label="' + esc(t.close) + '">×</button>' +
      '<button class="lb__nav lb__nav--prev" type="button" data-lb-prev aria-label="' + esc(t.prev) + '">‹</button>' +
      '<figure><img data-lb-img alt=""><figcaption data-lb-cap></figcaption></figure>' +
      '<button class="lb__nav lb__nav--next" type="button" data-lb-next aria-label="' + esc(t.next) + '">›</button></dialog>';
  }

  /* ---------- ГЛАВНАЯ ---------- */
  function homeMain(cfg, t, lang, go, rootPath) {
    var first = cfg.models[0];
    var picks = cfg.models.map(function (m, i) {
      return '<li><button type="button" class="pick' + (i === 0 ? ' is-on' : '') + '" data-slide="' + esc(m.id) + '" aria-pressed="' + (i === 0) + '"><b>' + esc(m.name) + '</b><i class="pick__bar"></i></button></li>';
    }).join('');

    /* Витрина: одинаковые карточки, последняя открывает заявку на консультацию */
    var tiles = cfg.models.map(function (m) {
      var href = go({ kind: 'model', id: m.id });
      return '<li class="card" data-reveal><a class="card__img" href="' + href + '" tabindex="-1" aria-hidden="true"><img class="ph-' + esc(m.id) + '" src="' + esc(heroPath(rootPath, m.id)) + '" alt="" width="1920" height="1440" loading="lazy" decoding="async"></a>' +
        '<div class="card__body"><h3><a href="' + href + '">Leapmotor ' + esc(m.name) + '</a></h3><p class="card__type">' + esc(m.bodyType[lang]) + '</p>' +
        '<p class="card__price">' + esc(priceText(minPrice(m), t, true)) + '</p>' +
        '<div class="card__cta"><a class="btn btn--line btn--small" href="' + href + '" aria-label="' + esc(t.more + ': Leapmotor ' + m.name) + '">' + esc(t.more) + '</a>' +
        '<button class="btn btn--primary btn--small" type="button" data-book="book" data-model="' + esc(m.id) + '">' + esc(t.book) + '</button></div></div></li>';
    }).join('') +
    '<li class="card card--all" data-reveal><button type="button" data-book="consult"><strong>' + esc(t.helpTitle) + '</strong><span>' + esc(t.helpText) + '</span></button></li>';

    var facts = t.facts.map(function (f) {
      return '<li><a class="fact" href="' + go({ kind: 'model', id: f.link }) + '"><strong>' + esc(f.value) + '</strong><span>' + esc(f.text) + '</span></a></li>';
    }).join('');

    return '' +
      '<section class="show" aria-labelledby="show-title" data-show>' +
        '<div class="show__stage" data-stage><img class="ph-' + esc(first.id) + '" src="' + esc(heroPath(rootPath, first.id)) + '" alt="' + esc('Leapmotor ' + first.name + ', ' + first.bodyType[lang]) + '" width="1920" height="1440" fetchpriority="high" decoding="async"></div>' +
        '<div class="show__top wrap">' +
          '<h1 id="show-title">' + esc(t.heroH1) + '</h1>' +
          '<p class="show__name" data-s-name>' + esc(first.name) + '</p>' +
          '<p class="show__tag" data-s-tag>' + esc(first.tagline[lang].join(' ')) + '</p>' +
        '</div>' +
        '<div class="show__bottom wrap">' +
          '<p class="show__price" data-s-price>' + esc(priceText(minPrice(first), t, true)) + '</p>' +
          '<div class="show__cta"><a class="btn btn--primary" href="' + go({ kind: 'model', id: first.id }) + '" data-s-link>' + esc(t.more) + '</a>' +
          '<button class="btn btn--line" type="button" data-book="book" data-model="' + esc(first.id) + '" data-s-book>' + esc(t.book) + '</button></div>' +
          '<div class="show__picks"><ul class="picks" aria-label="' + esc(t.navModels) + '">' + picks + '</ul>' +
          '<button class="show__pause" type="button" data-pause aria-pressed="false" aria-label="' + esc(t.pause) + '" data-l-pause="' + esc(t.pause) + '" data-l-play="' + esc(t.play) + '"></button></div>' +
        '</div>' +
      '</section>' +

      '<section class="range" id="models" aria-labelledby="range-title"><div class="wrap"><h2 id="range-title">' + esc(t.rangeTitle) + '</h2><ul class="cards">' + tiles + '</ul></div></section>' +

      '<section class="facts" aria-labelledby="facts-title"><div class="wrap"><h2 id="facts-title">' + esc(t.factsTitle) + '</h2><ul class="facts__list">' + facts + '</ul></div></section>' +

      branchesSection(cfg, t, lang, 'h2') +
      requestSection(cfg, t, lang, '', t.requestTitle, 'consult');
  }

  function branchesSection(cfg, t, lang) {
    var cards = cfg.branches.map(function (b) {
      var phone = b.phone ? '<a class="branch__row" href="tel:' + esc(b.phone.replace(/[^\d+]/g, '')) + '">' + icon('phone') + '<span>' + esc(b.phone) + '</span></a>' : '';
      return '<article class="branch" id="branch-' + esc(b.id) + '"><h3>' + esc(b.name[lang]) + '</h3>' +
        '<address class="branch__row">' + icon('pin') + '<span>' + esc(b.address[lang]) + '</span></address>' + phone +
        socIcons(b) +
        '<div class="branch__maps">' +
          '<a class="btn btn--line btn--small" href="' + esc(b.yandexMaps) + '" target="_blank" rel="noopener">' + icon('route') + 'Yandex Maps</a>' +
          '<a class="btn btn--line btn--small" href="' + esc(b.googleMaps) + '" target="_blank" rel="noopener">' + icon('route') + 'Google Maps</a>' +
        '</div>' +
        '<button class="btn btn--primary btn--small branch__req" type="button" data-book="consult" data-city="' + esc(b.city) + '">' + esc(t.branchRequest) + '</button></article>';
    }).join('');
    return '<section class="branches" aria-labelledby="branches-title"><div class="wrap"><h2 id="branches-title">' + esc(t.branchesTitle) + '</h2><div class="branches__grid">' + cards + '</div></div></section>';
  }

  /* ---------- СТРАНИЦА МОДЕЛИ ---------- */
  function modelMain(cfg, t, lang, go, rootPath, m) {
    var idx = cfg.models.indexOf(m);
    var next = cfg.models[(idx + 1) % cfg.models.length];
    var sel = defaultTrim(m);

    var specs = m.specs.map(function (s) {
      return '<div class="kpi"><dd>' + esc(s.value[lang]) + '</dd><dt>' + esc(s.label[lang]) + '</dt></div>';
    }).join('');

    var trims = m.trims.map(function (x, i) {
      var inputId = 'trim-' + i;
      return '<div class="trim"><input type="radio" id="' + inputId + '" name="trim" value="' + esc(x.name) + '" data-price="' + esc(priceText(x.price, t, false)) + '"' + (i === sel ? ' checked' : '') + '>' +
        '<label for="' + inputId + '"><span>' + esc(x.name) + '</span><span class="trim__price">' + esc(priceText(x.price, t, false)) + '</span></label></div>';
    }).join('');

    var gallery = '';
    for (var i = 1; i <= m.photos; i++) {
      var alt = 'Leapmotor ' + m.name + ', ' + t.photo + ' ' + i;
      gallery += '<li><button type="button" class="thumb" data-lightbox="' + esc(m.id) + '" data-index="' + i + '" aria-label="' + esc(t.openPhoto + ': ' + alt) + '">' +
        '<img src="' + esc(photoPath(rootPath, m.id, i)) + '" alt="' + esc(alt) + '" width="800" height="500" loading="lazy" decoding="async"></button></li>';
    }

    var features = (m.features && m.features.length) ?
      '<div class="feat"><h3>' + esc(t.moreOptions) + '</h3><ul>' + m.features.map(function (f) { return '<li>' + esc(f[lang]) + '</li>'; }).join('') + '</ul></div>' : '';
    var badge = m.badge && m.badge[lang] ? '<p class="badge">' + esc(m.badge[lang]) + '</p>' : '';

    return '' +
      '<section class="mhero" aria-labelledby="m-title">' +
        '<div class="mhero__stage"><img class="ph-' + esc(m.id) + '" src="' + esc(heroPath(rootPath, m.id)) + '" alt="' + esc('Leapmotor ' + m.name + ', ' + m.bodyType[lang]) + '" width="1920" height="1440" fetchpriority="high" decoding="async"></div>' +
        '<div class="mhero__top wrap">' +
          '<nav aria-label="' + esc(t.crumbs) + '"><ol class="crumbs"><li><a href="' + go({ kind: 'home' }) + '">' + esc(t.navHome) + '</a></li><li aria-current="page">' + esc(m.name) + '</li></ol></nav>' +
          badge +
          '<h1 id="m-title"><span>Leapmotor</span> ' + esc(m.name) + '</h1>' +
          '<p class="mhero__tag"><strong>' + esc(m.tagline[lang][0]) + '</strong> ' + esc(m.tagline[lang][1]) + '</p>' +
        '</div>' +
        '<div class="mhero__bottom wrap">' +
          '<p class="mhero__price">' + esc(priceText(minPrice(m), t, true)) + '</p>' +
          '<div class="show__cta"><button class="btn btn--primary" type="button" data-book="book" data-model="' + esc(m.id) + '">' + esc(t.book) + '</button>' +
          '<a class="btn btn--line" href="#trims">' + esc(t.subTrims) + '</a></div>' +
        '</div>' +
      '</section>' +

      '<nav class="subnav" aria-label="' + esc(t.modelNav) + '"><div class="wrap subnav__in"><b>' + esc(m.name) + '</b><ul>' +
        '<li><a href="#overview" data-spy="overview">' + esc(t.subOverview) + '</a></li><li><a href="#gallery" data-spy="gallery">' + esc(t.subGallery) + '</a></li><li><a href="#trims" data-spy="trims">' + esc(t.subTrims) + '</a></li>' +
      '</ul></div></nav>' +

      '<section class="overview" id="overview" data-spy-target="overview" aria-labelledby="ov-title"><div class="wrap">' +
        '<h2 id="ov-title">' + esc(t.specsTitle) + '</h2><dl class="kpis">' + specs + '</dl>' + features +
        '<p class="note">' + esc(t.specNote) + '</p></div></section>' +

      '<section class="gallery" id="gallery" data-spy-target="gallery" aria-labelledby="gal-title"><div class="wrap"><h2 id="gal-title">' + esc(t.galleryTitle) + '</h2></div><div class="rail" data-rail><ul class="rail__track" data-rail-track tabindex="0" aria-label="' + esc(t.galleryOf + ' Leapmotor ' + m.name) + '">' + gallery + '</ul>' +
        '<button class="rail__btn rail__btn--prev" type="button" data-rail-prev aria-label="' + esc(t.prev) + '">‹</button><button class="rail__btn rail__btn--next" type="button" data-rail-next aria-label="' + esc(t.next) + '">›</button></div></section>' +

      '<section class="trims-sec" id="trims" data-spy-target="trims" aria-labelledby="tr-title"><div class="wrap trims-sec__in">' +
        '<div class="trims-sec__list"><h2 id="tr-title">' + esc(t.trimsTitle) + '</h2><fieldset class="trims" data-buy-scope><legend class="sr">' + esc(t.trimLegend) + '</legend>' + trims + '</fieldset></div>' +
        '<aside class="summary" data-buy="' + esc(m.id) + '"><p class="summary__model">Leapmotor ' + esc(m.name) + '</p><p class="summary__trim" data-trim-out>' + esc(m.trims[sel].name) + '</p>' +
          '<output class="summary__price" data-price-out>' + esc(priceText(m.trims[sel].price, t, false)) + '</output>' +
          '<button class="btn btn--primary" type="button" data-book="book" data-model="' + esc(m.id) + '">' + esc(t.book) + '</button>' +
          '<button class="btn btn--line" type="button" data-book="consult" data-model="' + esc(m.id) + '">' + esc(t.consult) + '</button>' +
          '<p class="note">' + esc(t.pricesNoteShort) + ' ' + esc(cfg.pricesDate) + '.</p></aside>' +
      '</div></section>' +

      requestSection(cfg, t, lang, m.id, fill(t.requestModel, { m: m.name }), 'book') +

      '<a class="next ph-link" href="' + go({ kind: 'model', id: next.id }) + '"><img class="ph-' + esc(next.id) + '" src="' + esc(heroPath(rootPath, next.id)) + '" alt="" width="1920" height="1440" loading="lazy" decoding="async">' +
        '<span class="next__txt wrap"><span>' + esc(t.nextModel) + '</span><strong>Leapmotor ' + esc(next.name) + '</strong></span></a>';
  }

  /* ---------- КОНТАКТЫ ---------- */
  function contactsMain(cfg, t, lang) {
    var faq = t.faq.map(function (f) { return '<details class="qa"><summary>' + esc(f.q) + '</summary><p>' + esc(f.a) + '</p></details>'; }).join('');
    return '<section class="page-head"><div class="wrap"><h1>' + esc(t.contactsTitle) + '</h1><p class="lede">' + esc(t.contactsText) + '</p></div></section>' +
      branchesSection(cfg, t, lang) +
      '<section class="faq" aria-labelledby="faq-title"><div class="wrap faq__in"><h2 id="faq-title">' + esc(t.faqTitle) + '</h2><div>' + faq + '</div></div></section>' +
      requestSection(cfg, t, lang, '', t.requestTitle, 'consult');
  }

  /* ---------- ВСЯ СТРАНИЦА ---------- */
  function body(cfg, i18n, lang, page) {
    var t = i18n[lang];
    var rootPath = rootFor(lang, page);
    var go = linkFn(lang, page);
    var main;
    if (page.kind === 'model') main = modelMain(cfg, t, lang, go, rootPath, cfg.models.filter(function (m) { return m.id === page.id; })[0]);
    else if (page.kind === 'contacts') main = contactsMain(cfg, t, lang);
    else main = homeMain(cfg, t, lang, go, rootPath);

    var bar = '';
    if (page.kind === 'model') {
      var m = cfg.models.filter(function (x) { return x.id === page.id; })[0];
      bar = '<div class="mobilebar" data-mobilebar><span>' + esc(priceText(minPrice(m), t, true)) + '</span><button class="btn btn--primary btn--small" type="button" data-book="book" data-model="' + esc(m.id) + '">' + esc(t.book) + '</button></div>';
    }
    return '<a class="skip" href="#main">' + esc(t.skip) + '</a>' +
      header(cfg, t, lang, page, go, rootPath) +
      '<main id="main">' + main + '</main>' +
      footer(cfg, t, lang, go, rootPath) + bar + dialogs(cfg, t, lang);
  }

  /* ---------- SEO: ЗАГОЛОВКИ И РАЗМЕТКА ---------- */
  function seo(cfg, i18n, lang, page) {
    var t = i18n[lang];
    if (page.kind === 'model') {
      var m = cfg.models.filter(function (x) { return x.id === page.id; })[0];
      var map = { m: m.name, tag: m.tagline[lang].join(' '), p: money(minPrice(m)).replace(/ /g, ' ') };
      return { title: fill(t.titleModel, map), desc: fill(t.descModel, map), image: cfg.siteUrl + '/assets/img/models/' + m.id + '/hero.webp' };
    }
    var cover = cfg.siteUrl + '/assets/img/og-cover.jpg';
    if (page.kind === 'contacts') return { title: t.titleContacts, desc: t.descContacts, image: cover };
    return { title: t.metaTitle, desc: t.metaDescription, image: cover };
  }

  function dealerNodes(cfg, lang, contactsUrl) {
    return cfg.branches.map(function (b) {
      var d = {
        '@type': 'AutoDealer', '@id': cfg.siteUrl + '/#' + b.id,
        name: 'Leapmotor ASTER ' + b.name[lang], url: contactsUrl + '#branch-' + b.id,
        image: cfg.siteUrl + '/assets/img/og-cover.jpg', brand: { '@type': 'Brand', name: 'Leapmotor' },
        address: { '@type': 'PostalAddress', streetAddress: b.street[lang], addressLocality: b.locality[lang], addressRegion: b.region[lang], addressCountry: 'UZ' },
        hasMap: b.googleMaps, sameAs: [b.instagram, b.telegram], areaServed: b.name[lang]
      };
      if (b.phone) d.telephone = b.phone;
      return d;
    });
  }

  function carNode(cfg, lang, m) {
    var url = absUrl(cfg, lang, { kind: 'model', id: m.id });
    var car = {
      '@type': 'Car', name: 'Leapmotor ' + m.name, brand: { '@type': 'Brand', name: 'Leapmotor' }, model: m.name,
      image: cfg.siteUrl + '/assets/img/models/' + m.id + '/hero.webp', url: url, description: m.tagline[lang].join(' ')
    };
    if (minPrice(m) != null) {
      car.offers = { '@type': 'AggregateOffer', priceCurrency: 'UZS', lowPrice: minPrice(m), highPrice: maxPrice(m), offerCount: prices(m).length, availability: 'https://schema.org/InStoreOnly', url: url };
    }
    return car;
  }

  function schema(cfg, i18n, lang, page) {
    var t = i18n[lang];
    var homeUrl = absUrl(cfg, lang, { kind: 'home' });
    var contactsUrl = absUrl(cfg, lang, { kind: 'contacts' });
    var graph = [{ '@type': 'WebSite', '@id': homeUrl + '#website', url: homeUrl, name: cfg.siteName, inLanguage: lang }];
    if (page.kind === 'home') {
      graph = graph.concat(dealerNodes(cfg, lang, contactsUrl));
      graph.push({ '@type': 'ItemList', itemListElement: cfg.models.map(function (m, i) { return { '@type': 'ListItem', position: i + 1, url: absUrl(cfg, lang, { kind: 'model', id: m.id }), name: 'Leapmotor ' + m.name }; }) });
    }
    if (page.kind === 'contacts') {
      graph = graph.concat(dealerNodes(cfg, lang, contactsUrl));
      graph.push({ '@type': 'FAQPage', mainEntity: t.faq.map(function (f) { return { '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }; }) });
    }
    if (page.kind === 'model') {
      var m = cfg.models.filter(function (x) { return x.id === page.id; })[0];
      graph.push(carNode(cfg, lang, m));
    }
    if (page.kind !== 'home') {
      var label = page.kind === 'model' ? 'Leapmotor ' + page.id.toUpperCase() : t.navContacts;
      graph.push({ '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: t.navHome, item: homeUrl },
        { '@type': 'ListItem', position: 2, name: label, item: absUrl(cfg, lang, page) }
      ] });
    }
    return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  }

  function pageId(page) { return page.kind === 'model' ? 'model:' + page.id : page.kind; }

  /* Готовый HTML-документ (используется в tools/build.js) */
  function documentHtml(cfg, i18n, lang, page, buildVersion) {
    var t = i18n[lang];
    var rootPath = rootFor(lang, page);
    var s = seo(cfg, i18n, lang, page);
    var url = absUrl(cfg, lang, page);
    var ru = absUrl(cfg, 'ru', page), uz = absUrl(cfg, 'uz', page);
    var v = '?v=' + buildVersion;
    var heroId = page.kind === 'model' ? page.id : cfg.models[0].id;
    var preload = (page.kind === 'home' || page.kind === 'model') ?
      '<link rel="preload" href="' + rootPath + 'assets/img/models/' + heroId + '/hero.webp" as="image" fetchpriority="high">\n' : '';
    return '<!doctype html>\n' +
      '<!-- ЭТОТ ФАЙЛ СОЗДАН АВТОМАТИЧЕСКИ. Цены: js/config.js, тексты: js/i18n.js, структура: js/render.js. Затем: node tools/build.js -->\n' +
      '<html lang="' + lang + '" data-page="' + pageId(page) + '" data-hash="' + hash(cfg, i18n) + '">\n<head>\n' +
      '<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      '<title>' + esc(s.title) + '</title>\n<meta name="description" content="' + esc(s.desc) + '">\n' +
      '<meta name="robots" content="index, follow, max-image-preview:large">\n<meta name="theme-color" content="#000000">\n' +
      '<link rel="canonical" href="' + url + '">\n' +
      '<link rel="alternate" hreflang="ru" href="' + ru + '">\n<link rel="alternate" hreflang="uz" href="' + uz + '">\n<link rel="alternate" hreflang="x-default" href="' + ru + '">\n' +
      '<meta property="og:type" content="website">\n<meta property="og:site_name" content="' + esc(cfg.siteName) + '">\n<meta property="og:locale" content="' + t.ogLocale + '">\n' +
      '<meta property="og:title" content="' + esc(s.title) + '">\n<meta property="og:description" content="' + esc(s.desc) + '">\n<meta property="og:url" content="' + url + '">\n' +
      '<meta property="og:image" content="' + s.image + '">\n<meta name="twitter:card" content="summary_large_image">\n' +
      '<link rel="icon" href="' + rootPath + 'assets/img/favicon.svg" type="image/svg+xml">\n<link rel="icon" href="' + rootPath + 'assets/img/favicon-32.png" sizes="32x32" type="image/png">\n<link rel="apple-touch-icon" href="' + rootPath + 'assets/img/apple-touch-icon.png">\n<link rel="manifest" href="' + rootPath + 'site.webmanifest">\n' +
      preload +
      '<link rel="stylesheet" href="' + rootPath + 'css/style.css' + v + '">\n' +
      '<script src="' + rootPath + 'js/boot.js' + v + '"></script>\n' +
      '<script src="' + rootPath + 'js/config.js' + v + '" defer></script>\n<script src="' + rootPath + 'js/i18n.js' + v + '" defer></script>\n<script src="' + rootPath + 'js/render.js' + v + '" defer></script>\n<script src="' + rootPath + 'js/main.js' + v + '" defer></script>\n' +
      '<script type="application/ld+json">' + schema(cfg, i18n, lang, page) + '</script>\n' +
      '</head>\n<body>\n<div id="app">\n' + body(cfg, i18n, lang, page) + '\n</div>\n</body>\n</html>\n';
  }

  root.SITE_RENDER = {
    body: body, documentHtml: documentHtml, hash: hash, heroPath: heroPath, photoPath: photoPath,
    rootFor: rootFor, priceText: priceText, minPrice: minPrice, esc: esc
  };
})(typeof window !== 'undefined' ? window : globalThis);
