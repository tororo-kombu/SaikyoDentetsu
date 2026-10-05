(() => {
  const BASE = ''; // サブディレクトリ配置時は '/site/' のように指定

  const menuItems = [
    ['電車', 'index.html#info'],
    ['バス', 'index.html#info'],
    ['路線図', 'routemap.html'],
    ['駅・施設案内', 'index.html#info'],
    ['お得なきっぷ', 'index.html#info'],
    ['ニュース・キャンペーン', 'index.html#news'],
    ['企業情報', 'company-overview.html'],
    ['お問い合わせ', '#footer'],
  ];

  const footerLinks = [
    ['運行情報', 'index.html#info'],
    ['ニュース', 'index.html#news'],
    ['企業情報', 'index.html#company'],
    ['沿革', 'history.html'],
    ['お問い合わせ', '#footer'],
    ['サイトマップ', '#footer'],
    ['プライバシーポリシー', '#footer'],
    ['ご利用にあたって', '#footer'],
  ];

  const logo = (extra = '') => `
    <a href="${BASE}index.html" class="logo">
      <img src="img/saikyo-logo.svg" alt="">
    </a>`;

  const headerHTML = `
    <header>
      ${logo()}
      <button class="burger" id="burger" aria-label="メニュー" aria-expanded="false" aria-controls="menu">
        <span></span><span></span>
      </button>
    </header>
    <nav id="menu" aria-label="メインメニュー">
      ${menuItems.map(([t, h]) => `<a href="${BASE}${h}">${t}</a>`).join('')}
    </nav>`;

  const footerHTML = `
    <footer id="footer">
      ${logo('style="color:inherit;opacity:.7"')}
      <div class="fl">
        ${footerLinks.map(([t, h]) => `<a href="${BASE}${h}">${t}</a>`).join('')}
      </div>
      <small>© AKANE RAILWAY Co., Ltd. This is a fictional company.</small>
    </footer>`;

  function init() {
    // 挿入（<div id="site-header"></div> / <div id="site-footer"></div> を置き換える）
    const h = document.getElementById('site-header');
    const f = document.getElementById('site-footer');
    if (h) h.outerHTML = headerHTML;
    if (f) f.outerHTML = footerHTML;

    // 開閉メニュー
    const burger = document.getElementById('burger');
    const menu = document.getElementById('menu');
    if (!burger || !menu) return;
    const close = () => {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    };
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

    // 現在ページのメニューを強調（任意）
    const here = location.pathname.split('/').pop() || 'index.html';
    menu.querySelectorAll('a').forEach(a => {
      if (a.getAttribute('href').replace(BASE, '') === here) a.classList.add('current');
    });
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();