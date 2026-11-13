/* Выполняется до отрисовки: включает анимации появления
   и возвращает на русскую версию того, кто раньше сам выбрал русский язык.
   Если основной скрипт не загрузился, контент всё равно будет виден. */
(function () {
  'use strict';
  var html = document.documentElement;

  /* Только для главной: прямые ссылки на страницы открываются как есть */
  if (html.lang === 'uz' && html.getAttribute('data-page') === 'home') {
    var saved = null;
    try { saved = localStorage.getItem('site_lang'); } catch (e) { /* хранилище недоступно */ }
    if (saved === 'ru') {
      var target = location.protocol === 'file:' ? 'ru/index.html' : 'ru/';
      location.replace(target + location.search + location.hash);
      return;
    }
  }

  html.classList.add('js');
  window.addEventListener('load', function () {
    setTimeout(function () { if (!window.__siteReady) html.classList.remove('js'); }, 1500);
  });
})();
