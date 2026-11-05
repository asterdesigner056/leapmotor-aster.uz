/* =====================================================================
   ПОВЕДЕНИЕ САЙТА: меню, показ моделей, цены, галерея, формы и заявки.
   Настройки здесь не хранятся, они лежат в js/config.js.
   ===================================================================== */
(function () {
  'use strict';

  var cfg = window.SITE_CONFIG;
  var i18n = window.SITE_I18N;
  var R = window.SITE_RENDER;
  var html = document.documentElement;
  var lang = html.lang === 'uz' ? 'uz' : 'ru';
  var t = i18n[lang];
  var rawPage = html.getAttribute('data-page') || 'home';
  var page = rawPage.indexOf('model:') === 0 ? { kind: 'model', id: rawPage.slice(6) } : { kind: rawPage };
  var rootPath = R.rootFor(lang, page);
  var PLACEHOLDER = rootPath + 'assets/img/placeholder.svg';
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Если config или i18n изменили, а build.js не запускали, обновляем страницу на лету */
  if (html.getAttribute('data-hash') !== R.hash(cfg, i18n)) {
    document.getElementById('app').innerHTML = R.body(cfg, i18n, lang, page);
  }

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function modelById(id) { return cfg.models.filter(function (m) { return m.id === id; })[0]; }

  /* Открытие файла двойным кликом, без сервера: ссылкам на папки нужен index.html */
  if (location.protocol === 'file:') {
    $$('a[href]').forEach(function (a) {
      var h = a.getAttribute('href');
      if (/^(https?:|tel:|#)/.test(h)) return;
      var parts = h.split('#');
      a.setAttribute('href', (parts[0] === './' ? '' : parts[0]) + 'index.html' + (parts[1] ? '#' + parts[1] : ''));
    });
  }

  /* ---------- ЗАГЛУШКА ДЛЯ ФОТО, КОТОРЫХ ЕЩЁ НЕТ В ПАПКЕ ---------- */
  function fixImage(img) {
    if (img.getAttribute('src') === PLACEHOLDER || !img.getAttribute('src')) return;
    img.setAttribute('src', PLACEHOLDER);
    img.classList.add('is-placeholder');
  }
  document.addEventListener('error', function (e) {
    if (e.target && e.target.tagName === 'IMG') fixImage(e.target);
  }, true);
  $$('img').forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) fixImage(img);
  });

  /* ---------- ШАПКА: ПРОЗРАЧНАЯ НАД ФОТО, ЧЁРНАЯ ПРИ ПРОКРУТКЕ ---------- */
  var top = $('[data-top]');
  function onScroll() { top.classList.toggle('is-solid', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- МЕНЮ НА ТЕЛЕФОНЕ ---------- */
  var mega = $('[data-mega]');
  var burger = $('[data-burger]');
  function setMenu(open) {
    mega.classList.toggle('is-open', open);
    top.classList.toggle('has-menu', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', burger.getAttribute(open ? 'data-close' : 'data-open'));
    html.classList.toggle('has-menu', open);
  }
  burger.addEventListener('click', function () { setMenu(!mega.classList.contains('is-open')); });
  mega.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mega.classList.contains('is-open')) { setMenu(false); burger.focus(); }
  });

  /* ---------- ПОЯВЛЕНИЕ БЛОКОВ И ПОДСВЕТКА РАЗДЕЛА ---------- */
  if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); revealObs.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    $$('[data-reveal]').forEach(function (el) { revealObs.observe(el); });

    var spyLinks = $$('[data-spy]');
    if (spyLinks.length) {
      var spyObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var id = en.target.getAttribute('data-spy-target');
          spyLinks.forEach(function (a) { a.classList.toggle('is-on', a.getAttribute('data-spy') === id); });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      $$('[data-spy-target]').forEach(function (el) { spyObs.observe(el); });
    }

    var bar = $('[data-mobilebar]');
    var req = $('[data-request]');
    if (bar && req) {
      new IntersectionObserver(function (entries) {
        bar.classList.toggle('is-hidden', entries.some(function (en) { return en.isIntersecting; }));
      }).observe(req);
    }
  } else {
    $$('[data-reveal]').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- ГЛАВНАЯ: ПОКАЗ МОДЕЛЕЙ ----------
     Смена каждые SLIDE_MS миллисекунд. Пауза при наведении, фокусе и по кнопке. */
  var SLIDE_MS = 7000;
  var show = $('[data-show]');
  if (show) {
    var stage = $('[data-stage]', show);
    var ids = cfg.models.map(function (m) { return m.id; });
    var current = ids[0];
    var userPaused = reduceMotion;
    var hoverPaused = false;
    var timer = null;
    var pauseBtn = $('[data-pause]', show);

    var setSlide = function (id) {
      var m = modelById(id);
      if (!m || id === current) return;
      current = id;
      $$('[data-slide]', show).forEach(function (b) {
        var on = b.getAttribute('data-slide') === id;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', String(on));
      });
      $('[data-s-book]', show).setAttribute('data-model', id);
      var img = new Image();
      img.alt = 'Leapmotor ' + m.name + ', ' + m.bodyType[lang];
      img.className = 'ph-' + id + ' is-entering';
      img.width = 1920; img.height = 1440;
      var apply = function () {
        if (current !== id) return;
        $$('img', stage).forEach(function (old) {
          old.classList.add('is-leaving');
          setTimeout(function () { if (old.parentNode) old.parentNode.removeChild(old); }, 1100);
        });
        stage.appendChild(img);
        requestAnimationFrame(function () { requestAnimationFrame(function () { img.classList.remove('is-entering'); }); });
        var copy = [$('[data-s-name]', show), $('[data-s-tag]', show), $('[data-s-price]', show)];
        copy.forEach(function (el) { el.classList.remove('is-swap'); void el.offsetWidth; el.classList.add('is-swap'); });
        copy[0].textContent = m.name;
        copy[1].textContent = m.tagline[lang].join(' ');
        copy[2].textContent = R.priceText(R.minPrice(m), t, true);
        $('[data-s-link]', show).setAttribute('href', (location.protocol === 'file:' ? (rootPath + (lang === 'uz' ? 'uz/' : '') + 'models/' + id + '/index.html') : (rootPath + (lang === 'uz' ? 'uz/' : '') + 'models/' + id + '/')));
      };
      img.addEventListener('load', apply, { once: true });
      img.addEventListener('error', function () { img.src = PLACEHOLDER; }, { once: true });
      img.src = R.heroPath(rootPath, id);
    };
    var schedule = function () {
      clearTimeout(timer);
      show.classList.toggle('is-paused', userPaused || hoverPaused);
      if (userPaused || hoverPaused) return;
      timer = setTimeout(function () {
        setSlide(ids[(ids.indexOf(current) + 1) % ids.length]);
        schedule();
      }, SLIDE_MS);
    };
    show.addEventListener('click', function (e) {
      var b = e.target.closest('[data-slide]');
      if (b) { setSlide(b.getAttribute('data-slide')); schedule(); }
    });
    pauseBtn.addEventListener('click', function () {
      userPaused = !userPaused;
      pauseBtn.setAttribute('aria-pressed', String(userPaused));
      pauseBtn.setAttribute('aria-label', pauseBtn.getAttribute(userPaused ? 'data-l-play' : 'data-l-pause'));
      schedule();
    });
    var bottom = $('.show__bottom', show);
    ['mouseenter', 'focusin'].forEach(function (ev) { bottom.addEventListener(ev, function () { hoverPaused = true; schedule(); }); });
    ['mouseleave', 'focusout'].forEach(function (ev) { bottom.addEventListener(ev, function () { hoverPaused = false; schedule(); }); });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) clearTimeout(timer); else schedule();
    });
    if (reduceMotion) pauseBtn.setAttribute('aria-pressed', 'true');
    schedule();
  }

  /* ---------- СТРАНИЦА МОДЕЛИ: ВЫБОР КОМПЛЕКТАЦИИ ---------- */
  var summary = $('[data-buy]');
  var scope = $('[data-buy-scope]');
  if (summary && scope) {
    var out = $('[data-price-out]', summary);
    var trimOut = $('[data-trim-out]', summary);
    var sync = function () {
      var checked = $('input[type="radio"]:checked', scope);
      if (!checked) return;
      out.textContent = checked.getAttribute('data-price');
      trimOut.textContent = checked.value;
      $$('[data-book]', summary).forEach(function (b) { b.setAttribute('data-trim', checked.value); });
    };
    scope.addEventListener('change', function () {
      sync();
      out.classList.remove('is-swap');
      void out.offsetWidth;
      out.classList.add('is-swap');
    });
    sync();
  }

  /* ---------- ГАЛЕРЕЯ В ОДИН РЯД: КНОПКИ ПРОКРУТКИ ---------- */
  var rail = $('[data-rail]');
  if (rail) {
    var railTrack = $('[data-rail-track]', rail);
    var railPrev = $('[data-rail-prev]', rail);
    var railNext = $('[data-rail-next]', rail);
    var railSync = function () {
      var max = railTrack.scrollWidth - railTrack.clientWidth;
      railPrev.disabled = railTrack.scrollLeft <= 2;
      railNext.disabled = railTrack.scrollLeft >= max - 2;
    };
    var railMove = function (dir) {
      var step = railTrack.clientWidth * 0.8;
      railTrack.scrollBy({ left: dir * step, behavior: reduceMotion ? 'auto' : 'smooth' });
    };
    railPrev.addEventListener('click', function () { railMove(-1); });
    railNext.addEventListener('click', function () { railMove(1); });
    railTrack.addEventListener('scroll', railSync, { passive: true });
    window.addEventListener('resize', railSync);
    railSync();
  }

  /* ---------- ГАЛЕРЕЯ НА ВЕСЬ ЭКРАН ---------- */
  var lb = $('[data-lb]');
  var lbImg = $('[data-lb-img]');
  var lbCap = $('[data-lb-cap]');
  var lbState = { id: '', i: 1, count: 1 };
  function lbShow() {
    var alt = 'Leapmotor ' + modelById(lbState.id).name + ', ' + t.photo + ' ' + lbState.i;
    lbImg.classList.remove('is-placeholder');
    lbImg.src = R.photoPath(rootPath, lbState.id, lbState.i);
    lbImg.alt = alt;
    lbCap.textContent = lbState.i + ' / ' + lbState.count;
  }
  function lbStep(d) {
    lbState.i = ((lbState.i - 1 + d + lbState.count) % lbState.count) + 1;
    lbShow();
  }
  function openDialog(d) {
    if (d.open) return;
    setMenu(false);
    d.showModal();
    html.classList.add('has-dialog');
  }
  $$('dialog').forEach(function (d) {
    d.addEventListener('close', function () {
      if (!$('dialog[open]')) html.classList.remove('has-dialog');
    });
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
  });
  lb.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') lbStep(-1);
    if (e.key === 'ArrowRight') lbStep(1);
  });
  var touchX = null;
  lb.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 50) lbStep(dx < 0 ? 1 : -1);
  }, { passive: true });

  /* События для Google Tag Manager. Имя и телефон клиента сюда не передаются */
  function track(name, params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: name }, params || {}));
  }

  /* ---------- ФОРМЫ ---------- */
  var dlg = $('[data-book-dialog]');
  var LABELS = { book: 'book', price: 'price', consult: 'consult' };

  /* Метки рекламы читаем из адреса и храним на время визита */
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  function readUtm() {
    var saved = {};
    try { saved = JSON.parse(sessionStorage.getItem('lead_utm') || '{}') || {}; } catch (e) { saved = {}; }
    var params = new URLSearchParams(location.search);
    var hasNew = UTM_KEYS.some(function (k) { return params.has(k); });
    var res = {};
    UTM_KEYS.forEach(function (k) {
      var v = hasNew ? params.get(k) : saved[k];
      res[k] = v ? String(v).slice(0, 200) : '';
    });
    try { sessionStorage.setItem('lead_utm', JSON.stringify(res)); } catch (e) { /* хранилище недоступно */ }
    return res;
  }
  var utm = readUtm();

  /* Маска телефона: хранит 9 цифр после +998 */
  function fmtPhone(d) {
    var out = '+998';
    if (d.length) out += ' (' + d.slice(0, 2);
    if (d.length >= 2) out += ')';
    if (d.length > 2) out += ' ' + d.slice(2, 5);
    if (d.length > 5) out += ' ' + d.slice(5, 7);
    if (d.length > 7) out += ' ' + d.slice(7, 9);
    return out;
  }
  function phoneDigits(input) { return input.dataset.digits || ''; }
  function bindPhone(input) {
    input.addEventListener('focus', function () {
      if (!input.value) { input.value = '+998 '; input.dataset.digits = ''; }
    });
    input.addEventListener('blur', function () {
      if (!phoneDigits(input)) input.value = '';
    });
    input.addEventListener('input', function (e) {
      var prev = phoneDigits(input);
      var val = input.value;
      var d;
      if (val.indexOf('+998') === 0) {
        d = val.slice(4).replace(/\D/g, '');
      } else {
        var raw = val.replace(/\D/g, '');
        if (e.inputType && e.inputType.indexOf('delete') === 0) d = prev;
        else d = (raw.indexOf('998') === 0 && raw.length > 9) ? raw.slice(3) : raw;
      }
      /* Backspace по скобке или пробелу удаляет предыдущую цифру */
      if (e.inputType === 'deleteContentBackward' && d === prev) d = prev.slice(0, -1);
      d = d.slice(0, 9);
      input.dataset.digits = d;
      input.value = fmtPhone(d);
    });
  }
  function phoneForLead(d) {
    return cfg.lead.phonePrefix + ' (' + d.slice(0, 2) + ') ' + d.slice(2, 5) + ' ' + d.slice(5, 7) + ' ' + d.slice(7, 9);
  }

  function fillTrims(form, modelId, trimName) {
    var select = form.elements.trim;
    var m = modelById(modelId);
    var first = select.options[0];
    select.innerHTML = '';
    select.appendChild(first);
    if (m) {
      m.trims.forEach(function (x) {
        var o = document.createElement('option');
        o.value = x.name;
        o.textContent = x.name;
        select.appendChild(o);
      });
    }
    select.disabled = !m;
    select.value = trimName && m && m.trims.some(function (x) { return x.name === trimName; }) ? trimName : '';
  }

  function setError(form, key, text) {
    var box = $('[data-err="' + key + '"]', form);
    if (!box) return;
    box.textContent = text || '';
    box.hidden = !text;
    var field = form.elements[key];
    if (field && field.setAttribute) field.setAttribute('aria-invalid', text ? 'true' : 'false');
  }

  function validate(form) {
    var ok = true;
    var firstBad = null;
    var nameBad = form.elements.fio.value.replace(/[^\p{L}]/gu, '').length < 2;
    setError(form, 'fio', nameBad ? t.errName : '');
    if (nameBad) { ok = false; firstBad = form.elements.fio; }
    var phoneBad = phoneDigits(form.elements.phone).length !== 9;
    setError(form, 'phone', phoneBad ? t.errPhone : '');
    if (phoneBad) { ok = false; firstBad = firstBad || form.elements.phone; }
    var cityBad = !form.elements.city.value;
    setError(form, 'city', cityBad ? t.errCity : '');
    if (cityBad) { ok = false; firstBad = firstBad || $('input[name="city"]', form); }
    if (firstBad) firstBad.focus();
    return ok;
  }

  /* Комментарий для менеджера всегда на русском, чтобы единообразно читался в CRM */
  var INTENT_RU = { book: 'Бронирование', price: 'Запрос прайса', consult: 'Консультация' };
  function buildPayload(form) {
    var m = modelById(form.elements.model.value);
    var trim = form.elements.trim.value;
    var user = form.elements.comment.value.trim();
    var parts = ['Заявка: ' + (INTENT_RU[form.getAttribute('data-intent')] || INTENT_RU.consult)];
    if (trim) parts.push('Комплектация: ' + trim);
    if (user) parts.push('Комментарий: ' + user);
    /* Порядок и имена полей как в запросе, который принимает CRM */
    return {
      fio: form.elements.fio.value.trim(),
      phone: phoneForLead(phoneDigits(form.elements.phone)),
      comment: parts.join('. '),
      marka: cfg.lead.marka,
      model: m ? m.name : '',
      website: cfg.lead.website,
      city: form.elements.city.value,
      language: lang.toUpperCase(),
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      utm_content: utm.utm_content,
      utm_term: utm.utm_term
    };
  }

  function sendLead(payload) {
    var ctrl = new AbortController();
    var timer = setTimeout(function () { ctrl.abort(); }, cfg.lead.timeoutMs);
    return fetch(cfg.lead.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl.signal
    }).then(function (res) {
      clearTimeout(timer);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res;
    }, function (err) {
      clearTimeout(timer);
      throw err;
    });
  }

  function setIntent(form, intent) {
    var key = LABELS[intent] || 'consult';
    form.setAttribute('data-intent', key);
    $('[data-submit]', form).textContent = dlg.getAttribute('data-label-' + key);
  }

  function resetView(box) {
    var form = $('form', box);
    form.hidden = false;
    $('[data-ok]', box).hidden = true;
    $('[data-fail]', form).hidden = true;
  }

  $$('[data-lead]').forEach(function (form) {
    var box = form.closest('[data-form-box]');
    bindPhone(form.elements.phone);
    fillTrims(form, form.elements.model.value, '');
    form.elements.model.addEventListener('change', function () { fillTrims(form, form.elements.model.value, ''); });
    form.elements.fio.addEventListener('input', function () { setError(form, 'fio', ''); });
    form.elements.phone.addEventListener('input', function () { setError(form, 'phone', ''); });
    form.addEventListener('change', function (e) { if (e.target.name === 'city') setError(form, 'city', ''); });

    var sending = false;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (sending) return;
      var failBox = $('[data-fail]', form);
      failBox.hidden = true;

      /* Бот заполнил ловушку: показываем успех и ничего не отправляем */
      if (form.elements.company.value) { form.hidden = true; $('[data-ok]', box).hidden = false; return; }
      if (!validate(form)) return;

      var button = $('[data-submit]', form);
      var label = button.textContent;
      sending = true;
      button.disabled = true;
      button.textContent = t.fSending;

      var lead = buildPayload(form);
      var leadInfo = { lead_model: lead.model, lead_city: lead.city, lead_language: lead.language, lead_type: form.getAttribute('data-intent') };

      sendLead(lead).then(function () {
        var keepModel = form.closest('[data-book-dialog]') ? '' : form.elements.model.value;
        form.reset();
        form.elements.phone.dataset.digits = '';
        form.elements.model.value = keepModel;
        fillTrims(form, keepModel, '');
        form.hidden = true;
        var ok = $('[data-ok]', box);
        ok.hidden = false;
        ok.focus({ preventScroll: true });
        ok.scrollIntoView({ block: 'nearest' });
        track('lead_submit', leadInfo);
      }).catch(function () {
        /* Введённые данные остаются в форме, можно повторить */
        failBox.hidden = false;
        failBox.scrollIntoView({ block: 'nearest' });
      }).then(function () {
        sending = false;
        button.disabled = false;
        button.textContent = label;
      });
    });

    $('[data-again]', box).addEventListener('click', function () {
      resetView(box);
      form.elements.fio.focus();
    });
  });

  function openBooking(btn) {
    var box = $('[data-form-box]', dlg);
    var form = $('form', box);
    var intent = btn.getAttribute('data-book') || 'book';
    var model = btn.getAttribute('data-model') || '';
    var trim = btn.getAttribute('data-trim') || '';
    var city = btn.getAttribute('data-city') || '';
    resetView(box);
    setIntent(form, intent);
    $('#dlg-title').textContent = dlg.getAttribute('data-title-' + (LABELS[intent] || 'consult'));
    form.elements.model.value = model;
    fillTrims(form, model, trim);
    if (city) {
      var radio = $('input[name="city"][value="' + city + '"]', form);
      if (radio) radio.checked = true;
    }
    openDialog(dlg);
    track('book_open', { lead_model: model ? modelById(model).name : '', lead_type: LABELS[intent] || 'consult' });
    form.elements.fio.focus();
  }

  /* ---------- ОБЩИЙ ОБРАБОТЧИК КЛИКОВ ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('button, a');
    if (!el) return;
    if (el.hasAttribute('data-book')) return openBooking(el);
    if (el.hasAttribute('data-dialog-close')) return el.closest('dialog').close();
    if (el.hasAttribute('data-lb-prev')) return lbStep(-1);
    if (el.hasAttribute('data-lb-next')) return lbStep(1);
    if (el.hasAttribute('data-lightbox')) {
      var id = el.getAttribute('data-lightbox');
      lbState = { id: id, i: parseInt(el.getAttribute('data-index'), 10) || 1, count: modelById(id).photos };
      lbShow();
      openDialog(lb);
    }
  });

  window.__siteReady = true;
})();
