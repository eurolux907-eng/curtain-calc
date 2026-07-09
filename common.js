/* ═══════════════════════════════════════════════════════════════
   ОБЩИЕ ЭЛЕМЕНТЫ САЙТА — рисуются на всех страницах из одного места

   Что отсюда берётся:
     • боковое меню (десктоп)          → <div id="site-menu"></div>
     • мобильная шапка + выдвижное меню → <div id="site-menu-mobile"></div>
     • плавающая кнопка «Помочь» и её модалка → <div id="site-help"></div>

   ───────────────────────────────────────────────────────────────
   КАК ДОБАВИТЬ НОВЫЙ ПУНКТ МЕНЮ
     1. Допишите строку в массив MENU ниже: { href: 'novosti.html', text: 'Новости' }
        Порядок пунктов в меню = порядок строк в массиве.
     2. Создайте сам файл novosti.html (пока файла нет — пункт даст 404).
     3. Продублируйте пункт в <noscript> в каждой из 8 страниц
        (это запасная навигация для отключённого JavaScript).

   ВАЖНО: ПОСЛЕ ЛЮБОЙ ПРАВКИ ЭТОГО ФАЙЛА поднимите номер версии
   в подключении во ВСЕХ 8 html-файлах, иначе у посетителей
   останется старая версия из кэша браузера:
       <script src="common.js?v=1"></script>   →   ?v=2, ?v=3 и так далее
   Файлы: index, o-hrame, raspisanie, svyatyni, treby, tainstva,
          voprosy-otvety, pomoshch.

   Страница voprosy-otvety.html намеренно отсутствует в меню
   (ждёт одобрения настоятеля) — на ней не подсвечивается ни один пункт.
═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── ПУНКТЫ МЕНЮ ── */
  var MENU = [
    { href: 'index.html',     text: 'Главная' },
    { href: 'o-hrame.html',   text: 'О храме' },
    { href: 'raspisanie.html', text: 'Расписание' },
    { href: 'svyatyni.html',  text: 'Святыни' },
    { href: 'treby.html',     text: 'Требы и пожертвования' },
    { href: 'tainstva.html',  text: 'Таинства' },
    { href: 'pomoshch.html',  text: 'Получить помощь' },
    { href: 'kak-nas-naiti.html', text: 'Как нас найти' }
  ];

  var LOGO_NAME  = 'Подворье Патриарха Московского и всея&nbsp;Руси,<br>храм Архангела Михаила';
  var LOGO_DATES = '1803–1809 гг.; 1862 г.';

  /* ── АКТИВНЫЙ ПУНКТ ──
     Главная активна на «/» и на «/index.html».
     Страницы вне меню (voprosy-otvety.html) не подсвечивают ничего. */
  function currentFile() {
    var path = window.location.pathname;
    var file = path.substring(path.lastIndexOf('/') + 1);
    return file === '' ? 'index.html' : file;
  }

  function isActive(item) {
    return item.href === currentFile();
  }

  /* ── СБОРКА РАЗМЕТКИ ── */
  function menuItems(linkClass) {
    var cls = linkClass ? ' class="' + linkClass + '"' : '';
    var html = '';
    for (var i = 0; i < MENU.length; i++) {
      var item = MENU[i];
      var li = isActive(item) ? '<li class="active">' : '<li>';
      html += '      ' + li + '<a href="' + item.href + '"' + cls + '>' + item.text + '</a></li>\n';
    }
    return html;
  }

  function sidebarHtml() {
    return '' +
      '<aside class="sidebar">\n' +
      '  <div class="logo-block">\n' +
      '    <div class="logo-cross">✝</div>\n' +
      '    <div class="logo-name">' + LOGO_NAME + '</div>\n' +
      '    <div class="logo-dates">' + LOGO_DATES + '</div>\n' +
      '  </div>\n' +
      '  <nav>\n' +
      '    <ul>\n' + menuItems('') +
      '    </ul>\n' +
      '  </nav>\n' +
      '  <div class="sidebar-orn">· · ✝ · ·</div>\n' +
      '</aside>\n';
  }

  function mobileMenuHtml() {
    return '' +
      '<header class="mob-header">\n' +
      '  <button class="burger-btn" id="burgerBtn" aria-label="Открыть меню">\n' +
      '    <span></span><span></span><span></span>\n' +
      '  </button>\n' +
      '  <div class="mob-logo-c">\n' +
      '    <div class="mob-logo-name">Храм Архангела Михаила</div>\n' +
      '  </div>\n' +
      '  <div class="mob-spacer"></div>\n' +
      '</header>\n' +
      '<div class="drawer-overlay" id="drawerOverlay"></div>\n' +
      '<nav class="mob-drawer" id="mobDrawer">\n' +
      '  <button class="drawer-close" id="drawerClose" aria-label="Закрыть меню">✕</button>\n' +
      '  <div class="drawer-logo">\n' +
      '    <div class="drawer-cross">✝</div>\n' +
      '    <div class="drawer-name">' + LOGO_NAME + '</div>\n' +
      '    <div class="drawer-dates">' + LOGO_DATES + '</div>\n' +
      '  </div>\n' +
      '  <div class="drawer-nav">\n' +
      '    <ul>\n' + menuItems('drawer-link') +
      '    </ul>\n' +
      '  </div>\n' +
      '  <div class="drawer-orn">· · ✝ · ·</div>\n' +
      '</nav>\n';
  }

  /* Плавающая кнопка и модалка «Помочь храму» — разметка перенесена как была */
  function helpHtml() {
    return '' +
      '<button type="button" class="float-btn" id="openDonate2">🕯 Помочь</button>\n' +
      '<div class="modal-overlay" id="donateModal" aria-hidden="true">\n' +
      '  <div class="modal-box" role="dialog" aria-label="Помочь храму">\n' +
      '\n' +
      '    <button class="modal-close" id="modalClose" aria-label="Закрыть окно">✕</button>\n' +
      '\n' +
      '    <h2 class="modal-title">Помочь храму</h2>\n' +
      '\n' +
      '    <div class="donate-form">\n' +
      '\n' +
      '      <label class="field">\n' +
      '        <span class="field-label">Ваше имя</span>\n' +
      '        <input type="text" class="field-input" placeholder="Например, Мария" autocomplete="name">\n' +
      '      </label>\n' +
      '\n' +
      '      <label class="field">\n' +
      '        <span class="field-label">Сумма пожертвования</span>\n' +
      '        <span class="field-money">\n' +
      '          <input type="number" class="field-input" placeholder="500" min="1" inputmode="numeric">\n' +
      '          <span class="field-rub">₽</span>\n' +
      '        </span>\n' +
      '      </label>\n' +
      '\n' +
      '      <label class="field">\n' +
      '        <span class="field-label">Email</span>\n' +
      '        <input type="email" class="field-input" placeholder="mail@example.com" autocomplete="email">\n' +
      '      </label>\n' +
      '\n' +
      '      <div class="field">\n' +
      '        <span class="field-label">Периодичность</span>\n' +
      '        <div class="toggle-group" role="radiogroup">\n' +
      '          <button type="button" class="toggle-btn active" data-period="once">Разово</button>\n' +
      '          <button type="button" class="toggle-btn" data-period="monthly">Ежемесячно</button>\n' +
      '        </div>\n' +
      '      </div>\n' +
      '\n' +
      '      <div class="field">\n' +
      '        <span class="field-label">Способ оплаты</span>\n' +
      '        <div class="pay-options">\n' +
      '          <button type="button" class="pay-option active" data-pay="card">\n' +
      '            <span class="pay-radio"></span>Картой онлайн\n' +
      '          </button>\n' +
      '          <button type="button" class="pay-option" data-pay="sbp">\n' +
      '            <span class="pay-radio"></span>СБП\n' +
      '          </button>\n' +
      '          <button type="button" class="pay-option" data-pay="other">\n' +
      '            <span class="pay-radio"></span>Другие способы\n' +
      '          </button>\n' +
      '        </div>\n' +
      '      </div>\n' +
      '\n' +
      '      <!-- СЮДА: подключение платёжной системы (эквайринг), реальная оплата добавляется отдельно -->\n' +
      '      <button type="button" class="btn-donate" id="donateSubmit">Пожертвовать</button>\n' +
      '\n' +
      '      <div class="donate-message" id="donateMessage" hidden>\n' +
      '        Спасибо! Скоро здесь появится онлайн-оплата.\n' +
      '      </div>\n' +
      '\n' +
      '    </div>\n' +
      '\n' +
      '  </div>\n' +
      '</div>\n';
  }

  /* Плейсхолдер заменяется разметкой целиком, а не оборачивается в div:
     иначе sticky-шапка и фиксированные блоки получили бы лишнего родителя. */
  function mount(id, html) {
    var ph = document.getElementById(id);
    if (!ph) return;
    ph.insertAdjacentHTML('beforebegin', html);
    ph.parentNode.removeChild(ph);
  }

  mount('site-menu', sidebarHtml());
  mount('site-menu-mobile', mobileMenuHtml());
  mount('site-help', helpHtml());

  /* ── БУРГЕР И ВЫДВИЖНОЕ МЕНЮ ── */
  (function () {
    var burger  = document.getElementById('burgerBtn');
    var drawer  = document.getElementById('mobDrawer');
    var overlay = document.getElementById('drawerOverlay');
    if (!burger || !drawer || !overlay) return;

    function openDrawer() {
      drawer.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    burger.addEventListener('click', openDrawer);
    overlay.addEventListener('click', closeDrawer);

    var closeBtn = document.getElementById('drawerClose');
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    Array.prototype.forEach.call(document.querySelectorAll('.drawer-link'), function (link) {
      link.addEventListener('click', closeDrawer);
    });
  })();

  /* ── МОДАЛКА «ПОМОЧЬ ХРАМУ» ── */
  (function () {
    var modal      = document.getElementById('donateModal');
    if (!modal) return;
    var modalClose = document.getElementById('modalClose');
    var openBtn1   = document.getElementById('openDonate1');  // большая кнопка в тексте главной
    var openBtn2   = document.getElementById('openDonate2');  // плавающая «Помочь»

    function openModal() {
      /* Открытым может быть что-то одно: убираем просмотр иконы */
      if (window.closeImageViewer) window.closeImageViewer();
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (openBtn1) openBtn1.addEventListener('click', openModal);
    if (openBtn2) openBtn2.addEventListener('click', openModal);
    if (modalClose) modalClose.addEventListener('click', closeModal);

    /* Страницы могут открыть это окно сами — например кнопка «Поддержать храм»
       на экране благодарности в pomoshch.html */
    window.openDonateModal = openModal;
    window.closeDonateModal = closeModal;

    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    Array.prototype.forEach.call(modal.querySelectorAll('.toggle-btn'), function (btn) {
      btn.addEventListener('click', function () {
        Array.prototype.forEach.call(modal.querySelectorAll('.toggle-btn'), function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
      });
    });

    Array.prototype.forEach.call(modal.querySelectorAll('.pay-option'), function (opt) {
      opt.addEventListener('click', function () {
        Array.prototype.forEach.call(modal.querySelectorAll('.pay-option'), function (o) {
          o.classList.remove('active');
        });
        opt.classList.add('active');
      });
    });

    var donateSubmit  = document.getElementById('donateSubmit');
    var donateMessage = document.getElementById('donateMessage');
    if (donateSubmit && donateMessage) {
      donateSubmit.addEventListener('click', function () {
        donateMessage.hidden = false;
      });
    }

    /* Плавающая кнопка прячется, пока видна большая «Помочь храму» (только на главной) */
    if (openBtn1 && openBtn2 && 'IntersectionObserver' in window) {
      var floatObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            openBtn2.classList.add('float-hidden');
          } else {
            openBtn2.classList.remove('float-hidden');
          }
        });
      }, { threshold: 0 });
      floatObserver.observe(openBtn1);
    }
  })();

  /* ── ПРОСМОТР ИКОНЫ КРУПНО (лайтбокс) ──
     Клик по картинке с классом zoomable открывает её на весь экран.
     Закрытие: крестик, тап по фону, Escape.

     Подсказку «Нажмите на образ…» (.zoom-hint) страницы содержат в разметке,
     но если на странице ещё нет ни одной картинки zoomable (стоят пунктирные
     заглушки под будущие фото) — подсказка убирается, чтобы не обманывать. */
  (function () {
    var style = document.createElement('style');
    style.textContent =
      '.zoomable { cursor: pointer; }' +
      '.zoom-hint { font-size: 15px; color: rgba(232,200,96,0.80); text-align: center;' +
      '  margin: -8px 0 24px; letter-spacing: 0.02em; }' +
      '.img-viewer { position: fixed; inset: 0; background: rgba(15,13,6,0.92);' +
      '  display: none; align-items: center; justify-content: center; z-index: 1100; padding: 28px; }' +
      '.img-viewer.open { display: flex; }' +
      '.img-viewer img { max-width: 100%; max-height: 100%; object-fit: contain;' +
      '  border: 1px solid rgba(196,149,42,0.45); border-radius: 4px; }' +
      '.img-viewer-close { position: absolute; top: 16px; right: 16px; width: 44px; height: 44px;' +
      '  background: rgba(196,149,42,0.18); border: 1.5px solid rgba(196,149,42,0.55);' +
      '  border-radius: 50%; color: #E8C860; font-size: 22px; line-height: 1; cursor: pointer;' +
      '  display: flex; align-items: center; justify-content: center; }' +
      '.img-viewer-close:hover { background: rgba(196,149,42,0.32); }' +
      '@media (max-width: 768px) {' +
      '  .img-viewer { padding: 16px; }' +
      '  .img-viewer-close { top: 10px; right: 10px; }' +
      '  .zoom-hint { font-size: 14px; }' +
      '}';
    document.head.appendChild(style);

    /* Подсказка нужна, только когда есть что открывать */
    if (!document.querySelector('.zoomable')) {
      Array.prototype.forEach.call(document.querySelectorAll('.zoom-hint'), function (h) {
        h.parentNode.removeChild(h);
      });
      return;
    }

    var viewer = document.createElement('div');
    viewer.className = 'img-viewer';
    viewer.id = 'imgViewer';
    viewer.setAttribute('aria-hidden', 'true');
    viewer.innerHTML =
      '<button type="button" class="img-viewer-close" id="imgViewerClose" aria-label="Закрыть просмотр">✕</button>' +
      '<img id="imgViewerPic" src="" alt="">';
    document.body.appendChild(viewer);

    var pic = document.getElementById('imgViewerPic');

    /* Вписываем образ в экран. Сканы икон невелики (бывает 247×300),
       поэтому мелкие увеличиваем, но не больше чем вдвое — иначе размывается. */
    function fitPicture() {
      var nw = pic.naturalWidth, nh = pic.naturalHeight;
      if (!nw || !nh) return;
      var pad = window.matchMedia('(max-width: 768px)').matches ? 32 : 56;
      var scale = Math.min((window.innerWidth - pad) / nw, (window.innerHeight - pad) / nh, 2);
      pic.style.width = Math.round(nw * scale) + 'px';
      pic.style.height = 'auto';
    }
    pic.addEventListener('load', fitPicture);
    window.addEventListener('resize', function () {
      if (viewer.classList.contains('open')) fitPicture();
    });

    function openViewer(img) {
      /* Открытым может быть что-то одно: убираем окно пожертвования */
      if (window.closeDonateModal) window.closeDonateModal();
      pic.style.width = '';
      pic.style.height = '';
      pic.src = img.currentSrc || img.src;
      pic.alt = img.alt || '';
      viewer.classList.add('open');
      viewer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (pic.complete) fitPicture();
    }
    function closeViewer() {
      if (!viewer.classList.contains('open')) return;
      viewer.classList.remove('open');
      viewer.setAttribute('aria-hidden', 'true');
      pic.src = '';
      document.body.style.overflow = '';
    }

    /* Делегирование: картинки могут появиться позже (замена заглушек) */
    document.addEventListener('click', function (e) {
      var img = e.target.closest ? e.target.closest('.zoomable') : null;
      if (!img || viewer.contains(img)) return;
      openViewer(img);
    });

    document.getElementById('imgViewerClose').addEventListener('click', closeViewer);
    viewer.addEventListener('click', function (e) {
      if (e.target === viewer) closeViewer();   /* тап по затемнённому фону */
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeViewer();
    });

    window.closeImageViewer = closeViewer;
  })();

  /* ── МОБИЛЬНЫЙ СТАНДАРТ ВСПЛЫВАЮЩИХ ФОРМ ──
     Действует на все модалки страницы, включая «Поставить свечу» на svyatyni.html.
     1) Высота модалки равна реальной видимой области (адресная строка, клавиатура).
     2) Поле, в которое тапнули, поднимается в зону над клавиатурой. */
  (function () {
    var root = document.documentElement;
    var vv = window.visualViewport;

    function isMobile() {
      return window.matchMedia('(max-width: 768px)').matches;
    }

    /* поле под фокусом остаётся видимым, когда клавиатура меняет видимую область */
    function keepFocusVisible() {
      var a = document.activeElement;
      if (!isMobile() || !a || !a.closest || !a.matches('input, textarea, select')) return;
      if (!a.closest('.modal-overlay.open')) return;
      a.scrollIntoView({ block: 'center' });
    }

    function syncViewport() {
      if (!vv) return;
      /* клавиатура ужимает visualViewport, адресная строка — обе величины */
      root.style.setProperty('--modal-h', Math.min(vv.height, window.innerHeight) + 'px');
      root.style.setProperty('--modal-top', vv.offsetTop + 'px');
    }

    syncViewport();
    if (vv) {
      vv.addEventListener('resize', function () { syncViewport(); keepFocusVisible(); });
      vv.addEventListener('scroll', syncViewport);
    }
    window.addEventListener('resize', syncViewport);
    window.addEventListener('orientationchange', syncViewport);

    /* модалку могли открыть после смены размеров экрана — пересчитываем при открытии */
    Array.prototype.forEach.call(document.querySelectorAll('.modal-overlay'), function (m) {
      new MutationObserver(syncViewport).observe(m, { attributes: true, attributeFilter: ['class'] });
    });

    document.addEventListener('focusin', function (e) {
      if (!isMobile() || !e.target.closest) return;
      var field = e.target.closest('input, textarea, select');
      if (!field || !field.closest('.modal-overlay.open')) return;
      /* ждём выезд клавиатуры, затем подводим поле к центру видимой части */
      setTimeout(function () {
        field.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }, 300);
    });
  })();
})();
