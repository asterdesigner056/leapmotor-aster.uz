/* =====================================================================
   ГЛАВНЫЙ ФАЙЛ НАСТРОЕК САЙТА
   Здесь меняются: цены, комплектации, характеристики, филиалы, ссылки,
   адрес приёма заявок и пути к фотографиям.
   Изменения сразу видны на сайте. Перед публикацией выполните
   node tools/build.js, чтобы обновить HTML для поисковиков.
   Ставьте запятые как в примерах: ошибка в этом файле ломает сайт.
   ===================================================================== */
(function (root) {
  'use strict';

  root.SITE_CONFIG = {

    /* ---------- ОБЩЕЕ ---------- */
    // Адрес сайта без "/" на конце. Нужен для canonical, sitemap и разметки.
    siteUrl: 'https://leapmotor-aster.uz',
    siteName: 'Leapmotor ASTER',

    // Дата актуальности цен. Показывается под прайсом.
    pricesDate: '04.11.2026',

    /* ---------- GOOGLE TAG MANAGER ----------
       Номер контейнера. Тег ставится сразу после <head> на всех страницах при node tools/build.js.
       Пустая строка отключает тег. */
    gtmId: 'GTM-WLQV9JXN',

    /* ---------- ЗАЯВКИ (CRM OKTELL) ---------- */
    lead: {
      url: 'https://oktell.aster.uz:8443/aster/website-lead',
      marka: 'leapmotor',                 // поле "marka" в заявке
      website: 'leapmotor-aster.uz',      // поле "website" в заявке
      // Начало телефона в заявке. В вашем примере: " 998 (97) 521 32 32".
      // Если CRM ждёт плюс, поставьте '+998'.
      phonePrefix: ' 998',
      timeoutMs: 15000                    // сколько ждать ответ сервера, мс
    },

    /* ---------- ФИЛИАЛЫ ----------
       city: значение поля "city" в заявке. Для Самарканда проверьте
       написание с вашей CRM (samarkand или samarqand).
       phone: впишите номер, например '+998 90 123 45 67', и на сайте
       появится кнопка звонка. Пустая строка скрывает её. */
    branches: [
      {
        id: 'samarkand',
        city: 'samarkand',
        phone: '',
        name: { ru: 'Самарканд', uz: 'Samarqand' },
        address: {
          ru: 'Город Самарканд, массив Чопон Ота, 50A',
          uz: 'Samarqand shahri, Choʻpon Ota massivi, 50A'
        },
        // Части адреса для разметки Schema.org (для поисковиков)
        locality: { ru: 'Самарканд', uz: 'Samarqand' },
        region: { ru: 'Самаркандская область', uz: 'Samarqand viloyati' },
        street: { ru: 'массив Чопон Ота, 50A', uz: 'Choʻpon Ota massivi, 50A' },
        instagram: 'https://www.instagram.com/leapmotor_samarkand_aster/',
        telegram: 'https://t.me/leapmotorsamarkand_Aster',
        googleMaps: 'https://maps.app.goo.gl/nRRkBz8R6tc4XGNL7',
        yandexMaps: 'https://yandex.uz/maps/-/CXrgnD~d'
      },
      {
        id: 'qarshi',
        city: 'qarshi',
        phone: '',
        name: { ru: 'Карши', uz: 'Qarshi' },
        address: {
          ru: 'Кашкадарьинская обл., Каршинский р., МФЙ Богобод, посёлок Тукмагит, дом 326',
          uz: 'Qashqadaryo viloyati, Qarshi tumani, Bogʻobod MFY, Toʻqmagʻit qoʻrgʻoni, 326-uy'
        },
        locality: { ru: 'Каршинский район', uz: 'Qarshi tumani' },
        region: { ru: 'Кашкадарьинская область', uz: 'Qashqadaryo viloyati' },
        street: { ru: 'МФЙ Богобод, посёлок Тукмагит, дом 326', uz: 'Bogʻobod MFY, Toʻqmagʻit qoʻrgʻoni, 326-uy' },
        instagram: 'https://www.instagram.com/leapmotor_qarshi_aster/',
        telegram: 'https://t.me/leapmotor_qarshi_aster',
        googleMaps: 'https://maps.app.goo.gl/mjrGtFbTyQn56i8cA',
        yandexMaps: 'https://yandex.uz/maps/-/CXRGJNPM'
      }
    ],

    /* ---------- МОДЕЛИ И ЦЕНЫ ----------
       id: латиницей, совпадает с папкой фото assets/img/models/<id>/
           и с классом кадрирования .ph-<id> в css/style.css.
       photos: сколько фото в галерее. Файлы называются 01.webp, 02.webp...
           Главное фото каждой модели: hero.webp.
           Добавили фото: положите файл в папку и увеличьте число.
       badge: короткая отметка у модели. Пустая строка скрывает её.
       trims: комплектации. price: цена в сумах только цифрами.
           price: null показывает "Цена по запросу".
           Чтобы убрать комплектацию, удалите её строку.
       specs: характеристики, по паре "подпись и значение" на двух языках.
       features: дополнительный список. Пустой [] скрывает его. */
    models: [
      {
        id: 'a10',
        name: 'A10',
        bodyType: { ru: 'Компактный кроссовер', uz: 'Ixcham krossover' },
        photos: 10,
        badge: { ru: 'Открыт предзаказ', uz: 'Oldindan buyurtma ochiq' },
        tagline: {
          ru: ['Компактный кроссовер', 'с запасом хода до 505 км.'],
          uz: ['Ixcham krossover,', '505 km gacha masofa.']
        },
        trims: [
          { name: '505 Joyful', price: 260000000 }
        ],
        specs: [
          { label: { ru: 'Запас хода, CLTC', uz: 'Masofa, CLTC' }, value: { ru: 'до 505 км', uz: '505 km gacha' } },
          { label: { ru: 'Зарядка 30–80%', uz: 'Quvvatlash 30–80%' }, value: { ru: '16 минут', uz: '16 daqiqa' } },
          { label: { ru: 'Мощность', uz: 'Quvvat' }, value: { ru: '121 л.с.', uz: '121 o.k.' } },
          { label: { ru: 'Батарея', uz: 'Batareya' }, value: { ru: '53 кВт·ч', uz: '53 kVt·soat' } },
          { label: { ru: 'Длина', uz: 'Uzunlik' }, value: { ru: '4,27 м', uz: '4,27 m' } },
          { label: { ru: 'Колёсная база', uz: 'Gʻildirak bazasi' }, value: { ru: '2,6 м', uz: '2,6 m' } }
        ],
        features: []
      },
      {
        id: 'b10',
        name: 'B10',
        bodyType: { ru: 'Кроссовер', uz: 'Krossover' },
        photos: 9,
        badge: { ru: '', uz: '' },
        tagline: {
          ru: ['Для тех,', 'кто молод душой.'],
          uz: ['Qalbi yosh', 'insonlar uchun.']
        },
        trims: [
          { name: '510 Comfort', price: 275000000 },
          { name: '510 Enjoyable', price: 305000000 }
        ],
        specs: [
          { label: { ru: 'Запас хода, CLTC', uz: 'Masofa, CLTC' }, value: { ru: 'до 600 км', uz: '600 km gacha' } },
          { label: { ru: 'Зарядка 30–80%', uz: 'Quvvatlash 30–80%' }, value: { ru: 'около 19 минут', uz: 'taxminan 19 daqiqa' } },
          { label: { ru: 'Салон', uz: 'Salon' }, value: { ru: '5 мест', uz: '5 oʻrin' } }
        ],
        features: []
      },
      {
        id: 'c01',
        name: 'C01',
        bodyType: { ru: 'Седан', uz: 'Sedan' },
        photos: 8,
        badge: { ru: '', uz: '' },
        tagline: {
          ru: ['Технологичный', 'седан класса люкс.'],
          uz: ['Yuqori texnologiyali', 'hashamatli sedan.']
        },
        trims: [
          { name: '216 Premium', price: 305000000 },
          { name: '216 Premium FP', price: 325000000 },
          { name: '625 Premium FP', price: 325000000 },
          { name: '316 Premium FP', price: 336700000 }
        ],
        specs: [
          { label: { ru: 'Кузов', uz: 'Kuzov' }, value: { ru: 'седан', uz: 'sedan' } },
          { label: { ru: 'Помощь водителю', uz: 'Haydovchiga yordam' }, value: { ru: 'адаптивный круиз-контроль на всех скоростях', uz: 'barcha tezliklarda adaptiv kruiz-nazorat' } }
        ],
        features: []
      },
      {
        id: 'c10',
        name: 'C10',
        bodyType: { ru: 'Семейный кроссовер', uz: 'Oilaviy krossover' },
        photos: 9,
        badge: { ru: '', uz: '' },
        tagline: {
          ru: ['Идеальный дом', 'для молодой семьи.'],
          uz: ['Yosh oila uchun', 'ideal makon.']
        },
        trims: [
          { name: '210 Enjoyable FP', price: 310000000 },
          { name: '530 Comfort', price: 315000000 },
          { name: '605 Enjoyable FP', price: 325000000 },
          { name: '290 Smart', price: null },
          { name: '660 Smart', price: null }
        ],
        specs: [
          { label: { ru: 'На электротяге, CLTC', uz: 'Elektr quvvatida, CLTC' }, value: { ru: 'до 290 км', uz: '290 km gacha' } },
          { label: { ru: 'Общий запас, CLTC', uz: 'Umumiy masofa, CLTC' }, value: { ru: 'до 1300 км', uz: '1300 km gacha' } },
          { label: { ru: 'Зарядка 30–80%', uz: 'Quvvatlash 30–80%' }, value: { ru: 'около 16 минут', uz: 'taxminan 16 daqiqa' } },
          { label: { ru: 'Салон', uz: 'Salon' }, value: { ru: '5 мест', uz: '5 oʻrin' } },
          { label: { ru: 'Помощь водителю', uz: 'Haydovchiga yordam' }, value: { ru: 'городской навигационный ассистент', uz: 'shahar navigatsiya yordamchisi' } }
        ],
        features: []
      },
      {
        id: 'c11',
        name: 'C11',
        bodyType: { ru: 'Кроссовер', uz: 'Krossover' },
        photos: 8,
        badge: { ru: '', uz: '' },
        tagline: {
          ru: ['Умный кроссовер', 'с большим запасом хода.'],
          uz: ['Aqlli krossover,', 'uzoq masofa uchun.']
        },
        trims: [
          { name: '640 Smart + Fragrance', price: 335000000 },
          { name: '300 LiDar + Fragrance', price: 340000000 },
          { name: '640 LiDar Smart + Fragrance', price: 355000000 },
          { name: '640 LiDar + Fragrance', price: 355000000 },
          { name: '300 LiDar Supreme + Fragrance', price: 370000000 }
        ],
        specs: [
          { label: { ru: 'На электротяге, CLTC', uz: 'Elektr quvvatida, CLTC' }, value: { ru: 'до 640 км', uz: '640 km gacha' } },
          { label: { ru: 'Общий запас, CLTC', uz: 'Umumiy masofa, CLTC' }, value: { ru: 'до 1220 км', uz: '1220 km gacha' } },
          { label: { ru: 'Зарядка 30–80%', uz: 'Quvvatlash 30–80%' }, value: { ru: 'около 16 минут', uz: 'taxminan 16 daqiqa' } },
          { label: { ru: 'Салон', uz: 'Salon' }, value: { ru: '5 мест', uz: '5 oʻrin' } },
          { label: { ru: 'Помощь водителю', uz: 'Haydovchiga yordam' }, value: { ru: 'LiDAR и чип Qualcomm 8650', uz: 'LiDAR va Qualcomm 8650 chipi' } }
        ],
        features: [
          { ru: 'Центральный экран 17,3 дюйма', uz: '17,3 dyuymli markaziy ekran' },
          { ru: 'Распознавание лица для профилей', uz: 'Profillar uchun yuzni tanish' },
          { ru: 'Беспроводная зарядка телефона 50 Вт', uz: '50 Vt simsiz telefon quvvatlash' },
          { ru: 'Подогрев, вентиляция и массаж передних сидений', uz: 'Old oʻrindiqlarni isitish, shamollatish va massaj' },
          { ru: 'Панорамная крыша', uz: 'Panoramali tom' },
          { ru: 'Подвеска с переменным демпфированием', uz: 'Oʻzgaruvchan dempferli osma' }
        ]
      },
      {
        id: 'c16',
        name: 'C16',
        bodyType: { ru: '6-местный кроссовер', uz: '6 oʻrinli krossover' },
        photos: 9,
        badge: { ru: '', uz: '' },
        tagline: {
          ru: ['Комфортный и умный', '6-местный кроссовер.'],
          uz: ['Qulay va aqlli', '6 oʻrinli krossover.']
        },
        trims: [
          { name: '200 Premium 6', price: 350000000 },
          { name: '580 Premium 6', price: 355000000 },
          { name: '200 Premium 6 FP', price: 360000000 },
          { name: '580 Premium 6 FP', price: 375000000 },
          { name: '280 LiDar Supreme 6 FP', price: 405000000 }
        ],
        specs: [
          { label: { ru: 'На электротяге, CLTC', uz: 'Elektr quvvatida, CLTC' }, value: { ru: 'до 280 км', uz: '280 km gacha' } },
          { label: { ru: 'Общий запас, CLTC', uz: 'Umumiy masofa, CLTC' }, value: { ru: 'до 1230 км', uz: '1230 km gacha' } },
          { label: { ru: 'Зарядка 30–80%', uz: 'Quvvatlash 30–80%' }, value: { ru: 'около 16 минут', uz: 'taxminan 16 daqiqa' } },
          { label: { ru: 'Салон', uz: 'Salon' }, value: { ru: '6 мест', uz: '6 oʻrin' } },
          { label: { ru: 'Помощь водителю', uz: 'Haydovchiga yordam' }, value: { ru: 'LiDAR и чип Qualcomm 8650', uz: 'LiDAR va Qualcomm 8650 chipi' } }
        ],
        features: []
      },
      {
        id: 'd19',
        name: 'D19',
        bodyType: { ru: '7-местный кроссовер', uz: '7 oʻrinli krossover' },
        photos: 10,
        badge: { ru: 'Открыт предзаказ', uz: 'Oldindan buyurtma ochiq' },
        tagline: {
          ru: ['Просторный кроссовер', 'для большой семьи.'],
          uz: ['Katta oila uchun', 'keng krossover.']
        },
        trims: [
          { name: '500 Premium 6', price: 625000000 },
          { name: '720 Premium 6', price: 650000000 }
        ],
        specs: [
          { label: { ru: 'На электротяге, CLTC', uz: 'Elektr quvvatida, CLTC' }, value: { ru: 'до 500 км', uz: '500 km gacha' } },
          { label: { ru: 'Общий запас, CLTC', uz: 'Umumiy masofa, CLTC' }, value: { ru: 'до 1180 км', uz: '1180 km gacha' } },
          { label: { ru: 'Салон', uz: 'Salon' }, value: { ru: '7 мест', uz: '7 oʻrin' } },
          { label: { ru: 'Безопасность', uz: 'Xavfsizlik' }, value: { ru: 'экстренное удержание в полосе', uz: 'favqulodda chiziqda ushlash' } }
        ],
        features: []
      }
    ]
  };
})(typeof window !== 'undefined' ? window : globalThis);
