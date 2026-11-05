/* Выполняется до отрисовки: включает анимации появления.
   Если основной скрипт не загрузился, контент всё равно будет виден. */
(function () {
  'use strict';
  var html = document.documentElement;
  html.classList.add('js');
  window.addEventListener('load', function () {
    setTimeout(function () { if (!window.__siteReady) html.classList.remove('js'); }, 1500);
  });
})();
