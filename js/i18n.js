/* =====================================================================
   ТЕКСТЫ И ПЕРЕВОДЫ САЙТА
   ru: русская версия (адрес /), uz: узбекская версия (адрес /uz/).
   Меняйте только текст в кавычках, ключи слева не трогайте.
   В узбекском используйте буквы oʻ и gʻ со знаком ʻ (его можно копировать
   отсюда). Названия машин и цены лежат в js/config.js.
   ===================================================================== */
(function (root) {
  'use strict';

  root.SITE_I18N = {
    ru: {
      // --- Страницы: заголовки и описания для поиска. {m} модель, {p} цена, {tag} слоган ---
      titleModel: 'Leapmotor {m}: цена и комплектации в Самарканде и Карши | ASTER',
      descModel: 'Leapmotor {m} у официального дилера ASTER в Самарканде и Карши. Цена от {p} сум, комплектации, характеристики, фото и онлайн-бронь.',
      titleContacts: 'Контакты Leapmotor ASTER: адреса в Самарканде и Карши',
      descContacts: 'Адреса салонов Leapmotor ASTER в Самарканде и Карши, ссылки на карты, Telegram и Instagram. Ответы на частые вопросы и заявка онлайн.',
      // --- Новые блоки ---
      heroH1: 'Официальный дилер Leapmotor в Самарканде и Карши',
      navContacts: 'Контакты', navHome: 'Главная', crumbs: 'Навигация по сайту',
      more: 'Подробнее', pause: 'Остановить показ', play: 'Продолжить показ',
      rangeTitle: 'Модельный ряд', helpTitle: 'Поможем выбрать', helpText: 'Оставьте заявку, и менеджер подберёт модель и комплектацию.',
      subOverview: 'Обзор', subGallery: 'Фотографии', subTrims: 'Комплектации',
      specsTitle: 'Главное о модели', galleryTitle: 'Снаружи и внутри', trimsTitle: 'Комплектации и цены',
      nextModel: 'Следующая модель', requestModel: 'Заявка на Leapmotor {m}',
      contactsTitle: 'Контакты', contactsText: 'Два салона ASTER: приезжайте посмотреть автомобиль или напишите филиалу.',
      pricesNoteShort: 'Точную цену подтвердит менеджер. Цены актуальны на',
      // --- SEO: заголовок вкладки и описание в поиске ---
      metaTitle: 'Leapmotor в Самарканде и Карши: цены и комплектации | ASTER',
      metaDescription: 'Официальный дилер Leapmotor ASTER в Самарканде и Карши. A10, B10, C01, C10, C11, C16 и D19: цены, комплектации, бронь автомобиля онлайн.',
      ogLocale: 'ru_RU',
      skip: 'Перейти к содержимому',
      // --- Меню ---
      navModels: 'Модели', navFacts: 'Характеристики', navBranches: 'Филиалы', navFaq: 'Вопросы',
      menuOpen: 'Открыть меню', menuClose: 'Закрыть меню', mainNav: 'Основное меню', langSwitch: 'Язык сайта',
      homeLabel: 'Leapmotor ASTER, на главную',
      // --- Главный экран ---
      heroTitle1: 'Leapmotor', heroTitle2: 'в Самарканде и Карши.',
      heroText: 'Официальный дилер ASTER. Выберите модель и комплектацию, а менеджер ближайшего филиала свяжется с вами.',
      heroPick: 'Выберите модель', heroDetails: 'Подробнее:',
      // --- Общие кнопки и подписи ---
      book: 'Забронировать', getPrice: 'Получить прайс', consult: 'Получить консультацию',
      from: 'от', sum: 'сум', sumFrom: 'сум', onRequest: 'Цена по запросу',
      trimLegend: 'Комплектация', trimPrice: 'Цена выбранной комплектации', photo: 'фото', galleryOf: 'Фотографии',
      openPhoto: 'Открыть фото', moreOptions: 'Оснащение зависит от комплектации',
      modelNav: 'Модели Leapmotor', modelsTitle: 'Семь моделей Leapmotor',
      modelsText: 'Выберите комплектацию прямо в карточке: цена изменится сразу, а бронь сохранит ваш выбор.',
      specNote: 'Показатели по циклу CLTC зависят от комплектации. Точные данные подскажет менеджер.',
      specMissing: 'Полные характеристики подскажет менеджер филиала.',
      // --- Характеристики ---
      factsTitle: 'Что отличает модели',
      facts: [
        { value: 'До 640 км', text: 'на электротяге по CLTC у C11. У B10 до 600 км, у A10 до 505 км.', link: 'c11' },
        { value: 'До 1300 км', text: 'общего запаса по CLTC у C10. У C16 до 1230 км, у C11 до 1220 км.', link: 'c10' },
        { value: 'Около 16 минут', text: 'зарядка с 30 до 80% у A10, C10, C11 и C16.', link: 'c16' },
        { value: '5, 6 или 7 мест', text: 'от пятиместных C10 и C11 до шестиместного C16 и семиместного D19.', link: 'd19' }
      ],
      // --- Как забронировать ---
      stepsTitle: 'Как забронировать',
      steps: [
        { title: 'Оставьте заявку', text: 'Укажите имя, телефон, город и модель. Это занимает меньше минуты.' },
        { title: 'Дождитесь звонка', text: 'Менеджер филиала уточнит комплектацию, цену и наличие.' },
        { title: 'Приезжайте в салон', text: 'Посмотрите автомобиль и оформите покупку в Самарканде или Карши.' }
      ],
      // --- Филиалы ---
      branchesTitle: 'Два филиала ASTER',
      branchRequest: 'Оставить заявку в филиал', call: 'Позвонить',
      googleMaps: 'Google Карты', yandexMaps: 'Яндекс Карты',
      // --- Вопросы ---
      faqTitle: 'Частые вопросы',
      faq: [
        { q: 'Где купить Leapmotor в Самарканде и Карши?', a: 'В филиалах ASTER: Самарканд, массив Чопон Ота, 50A; Карши, МФЙ Богобод, посёлок Тукмагит, дом 326.' },
        { q: 'Какие модели Leapmotor можно заказать?', a: 'На сайте представлены A10, B10, C01, C10, C11, C16 и D19. Наличие конкретной комплектации уточняйте в филиале.' },
        { q: 'Сколько стоит Leapmotor?', a: 'Цены начинаются от 260 000 000 сум за A10. Цены всех комплектаций указаны на странице каждой модели, точную стоимость подтвердит менеджер.' },
        { q: 'Как забронировать автомобиль?', a: 'Нажмите «Забронировать» у нужной модели, заполните короткую форму и дождитесь звонка менеджера.' },
        { q: 'Как быстро заряжается Leapmotor?', a: 'На быстрой зарядке постоянным током A10, C10, C11 и C16 заряжаются с 30 до 80% примерно за 16 минут, B10 примерно за 19 минут.' }
      ],
      // --- Форма ---
      requestTitle: 'Оставьте заявку',
      requestText: 'Менеджер выбранного филиала свяжется с вами и ответит на вопросы о модели.',
      fName: 'Ваше имя', fPhone: 'Телефон', fCity: 'Город', fModel: 'Модель', fTrim: 'Комплектация', fComment: 'Комментарий',
      fOptional: 'необязательно', fAnyModel: 'Пока не выбрал', fAnyTrim: 'Подскажет менеджер',
      fNamePh: 'Например, Азиз', fCommentPh: 'Удобное время для звонка или ваш вопрос',
      fNote: 'Нажимая кнопку, вы соглашаетесь на обработку указанных данных для связи с вами.',
      fSending: 'Отправляем...',
      errName: 'Введите имя, минимум 2 буквы.', errPhone: 'Введите номер полностью: 9 цифр после +998.', errCity: 'Выберите город.',
      okTitle: 'Заявка отправлена', okText: 'Менеджер филиала свяжется с вами по указанному номеру.', okAgain: 'Отправить ещё одну заявку',
      failTitle: 'Заявка не отправлена', failText: 'Проверьте интернет и нажмите кнопку ещё раз или напишите филиалу в Telegram:',
      noscript: 'Для отправки формы включите JavaScript или напишите филиалу в Telegram.',
      dlgBook: 'Забронировать автомобиль', dlgPrice: 'Получить прайс', dlgConsult: 'Получить консультацию', close: 'Закрыть',
      prev: 'Предыдущее фото', next: 'Следующее фото',
      // --- Подвал ---
      footerText: 'Официальный дилер Leapmotor в Самарканде и Карши.',
      footerCopy: 'Все права защищены.'
    },

    uz: {
      titleModel: 'Leapmotor {m}: Samarqand va Qarshida narx va komplektatsiyalar | ASTER',
      descModel: 'ASTER rasmiy dilerida Leapmotor {m}, Samarqand va Qarshi. Narxi {p} soʻmdan, komplektatsiyalar, xususiyatlar, rasmlar va onlayn bron.',
      titleContacts: 'Leapmotor ASTER aloqa: Samarqand va Qarshidagi manzillar',
      descContacts: 'Samarqand va Qarshidagi Leapmotor ASTER salonlari manzillari, xaritalar, Telegram va Instagram. Koʻp beriladigan savollar va onlayn soʻrov.',
      heroH1: 'Samarqand va Qarshidagi Leapmotor rasmiy dileri',
      navContacts: 'Aloqa', navHome: 'Bosh sahifa', crumbs: 'Sayt boʻyicha navigatsiya',
      more: 'Batafsil', pause: 'Koʻrsatuvni toʻxtatish', play: 'Koʻrsatuvni davom ettirish',
      rangeTitle: 'Modellar qatori', helpTitle: 'Tanlashga yordam beramiz', helpText: 'Soʻrov qoldiring, menejer model va komplektatsiyani tanlab beradi.',
      subOverview: 'Umumiy', subGallery: 'Rasmlar', subTrims: 'Komplektatsiyalar',
      specsTitle: 'Model haqida asosiysi', galleryTitle: 'Tashqi va ichki koʻrinish', trimsTitle: 'Komplektatsiyalar va narxlar',
      nextModel: 'Keyingi model', requestModel: 'Leapmotor {m} uchun soʻrov',
      contactsTitle: 'Aloqa', contactsText: 'ASTERning ikki saloni: avtomobilni koʻrgani keling yoki filialga yozing.',
      pricesNoteShort: 'Aniq narxni menejer tasdiqlaydi. Narxlar dolzarb sanasi:',
      metaTitle: 'Leapmotor Samarqand va Qarshida: narxlar va komplektatsiyalar | ASTER',
      metaDescription: 'Samarqand va Qarshidagi Leapmotor ASTER rasmiy dileri. A10, B10, C01, C10, C11, C16 va D19: narxlar, komplektatsiyalar, onlayn bron.',
      ogLocale: 'uz_UZ',
      skip: 'Asosiy qismga oʻtish',
      navModels: 'Modellar', navFacts: 'Xususiyatlar', navBranches: 'Filiallar', navFaq: 'Savollar',
      menuOpen: 'Menyuni ochish', menuClose: 'Menyuni yopish', mainNav: 'Asosiy menyu', langSwitch: 'Sayt tili',
      homeLabel: 'Leapmotor ASTER, bosh sahifa',
      heroTitle1: 'Leapmotor', heroTitle2: 'Samarqand va Qarshida.',
      heroText: 'ASTER rasmiy dileri. Model va komplektatsiyani tanlang, eng yaqin filial menejeri siz bilan bogʻlanadi.',
      heroPick: 'Modelni tanlang', heroDetails: 'Batafsil:',
      book: 'Bron qilish', getPrice: 'Narxlar roʻyxatini olish', consult: 'Maslahat olish',
      from: '', sum: 'soʻm', sumFrom: 'soʻmdan', onRequest: 'Narxi soʻrov boʻyicha',
      trimLegend: 'Komplektatsiya', trimPrice: 'Tanlangan komplektatsiya narxi', photo: 'rasm', galleryOf: 'Rasmlar',
      openPhoto: 'Rasmni ochish', moreOptions: 'Jihozlar komplektatsiyaga bogʻliq',
      modelNav: 'Leapmotor modellari', modelsTitle: 'Leapmotorning yetti modeli',
      modelsText: 'Komplektatsiyani shu yerda tanlang: narx darhol oʻzgaradi, bron esa tanlovingizni saqlaydi.',
      specNote: 'CLTC sikli boʻyicha koʻrsatkichlar komplektatsiyaga bogʻliq. Aniq maʼlumotni menejer aytadi.',
      specMissing: 'Toʻliq xususiyatlarni filial menejeri aytadi.',
      factsTitle: 'Modellarning afzalliklari',
      facts: [
        { value: '640 km gacha', text: 'CLTC boʻyicha C11 elektr quvvatida. B10 600 km gacha, A10 505 km gacha.', link: 'c11' },
        { value: '1300 km gacha', text: 'CLTC boʻyicha C10 umumiy masofasi. C16 1230 km gacha, C11 1220 km gacha.', link: 'c10' },
        { value: 'Taxminan 16 daqiqa', text: 'A10, C10, C11 va C16 uchun 30 dan 80% gacha quvvatlash.', link: 'c16' },
        { value: '5, 6 yoki 7 oʻrin', text: 'Besh oʻrinli C10 va C11 dan olti oʻrinli C16 va yetti oʻrinli D19 gacha.', link: 'd19' }
      ],
      stepsTitle: 'Qanday bron qilish mumkin',
      steps: [
        { title: 'Soʻrov qoldiring', text: 'Ism, telefon, shahar va modelni kiriting. Bu bir daqiqadan kam vaqt oladi.' },
        { title: 'Qoʻngʻiroqni kuting', text: 'Filial menejeri komplektatsiya, narx va mavjudlikni aniqlashtiradi.' },
        { title: 'Salonga keling', text: 'Avtomobilni koʻring va xaridni Samarqand yoki Qarshida rasmiylashtiring.' }
      ],
      branchesTitle: 'ASTERning ikki filiali',
      branchRequest: 'Filialga soʻrov qoldirish', call: 'Qoʻngʻiroq qilish',
      googleMaps: 'Google Xaritalar', yandexMaps: 'Yandex Xaritalar',
      faqTitle: 'Koʻp beriladigan savollar',
      faq: [
        { q: 'Leapmotorni Samarqand va Qarshida qayerdan sotib olish mumkin?', a: 'ASTER filiallarida: Samarqand, Choʻpon Ota massivi, 50A; Qarshi, Bogʻobod MFY, Toʻqmagʻit qoʻrgʻoni, 326-uy.' },
        { q: 'Qaysi Leapmotor modellarini buyurtma qilish mumkin?', a: 'Saytda A10, B10, C01, C10, C11, C16 va D19 taqdim etilgan. Muayyan komplektatsiya mavjudligini filialdan soʻrang.' },
        { q: 'Leapmotor qancha turadi?', a: 'Narxlar A10 uchun 260 000 000 soʻmdan boshlanadi. Barcha komplektatsiyalar narxi har bir model sahifasida, aniq narxni menejer tasdiqlaydi.' },
        { q: 'Avtomobilni qanday bron qilish mumkin?', a: 'Kerakli model yonidagi «Bron qilish» tugmasini bosing, qisqa shaklni toʻldiring va menejer qoʻngʻiroqini kuting.' },
        { q: 'Leapmotor qanchalik tez quvvatlanadi?', a: 'Doimiy tokda tez quvvatlashda A10, C10, C11 va C16 30 dan 80% gacha taxminan 16 daqiqada, B10 taxminan 19 daqiqada quvvatlanadi.' }
      ],
      requestTitle: 'Soʻrov qoldiring',
      requestText: 'Tanlangan filial menejeri siz bilan bogʻlanadi va model haqidagi savollarga javob beradi.',
      fName: 'Ismingiz', fPhone: 'Telefon', fCity: 'Shahar', fModel: 'Model', fTrim: 'Komplektatsiya', fComment: 'Izoh',
      fOptional: 'ixtiyoriy', fAnyModel: 'Hali tanlamadim', fAnyTrim: 'Menejer maslahat beradi',
      fNamePh: 'Masalan, Aziz', fCommentPh: 'Qoʻngʻiroq uchun qulay vaqt yoki savolingiz',
      fNote: 'Tugmani bosish orqali siz bilan bogʻlanish uchun maʼlumotlarni qayta ishlashga rozilik bildirasiz.',
      fSending: 'Yuborilmoqda...',
      errName: 'Ismingizni kiriting, kamida 2 ta harf.', errPhone: 'Raqamni toʻliq kiriting: +998 dan keyin 9 ta raqam.', errCity: 'Shaharni tanlang.',
      okTitle: 'Soʻrov yuborildi', okText: 'Filial menejeri koʻrsatilgan raqam orqali siz bilan bogʻlanadi.', okAgain: 'Yana bir soʻrov yuborish',
      failTitle: 'Soʻrov yuborilmadi', failText: 'Internetni tekshirib, tugmani qayta bosing yoki filialga Telegram orqali yozing:',
      noscript: 'Shaklni yuborish uchun JavaScriptni yoqing yoki filialga Telegram orqali yozing.',
      dlgBook: 'Avtomobilni bron qilish', dlgPrice: 'Narxlar roʻyxatini olish', dlgConsult: 'Maslahat olish', close: 'Yopish',
      prev: 'Oldingi rasm', next: 'Keyingi rasm',
      footerText: 'Samarqand va Qarshidagi Leapmotor rasmiy dileri.',
      footerCopy: 'Barcha huquqlar himoyalangan.'
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
