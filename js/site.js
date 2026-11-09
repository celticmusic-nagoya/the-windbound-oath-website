/* THE WINDBOUND OATH — Official Website (vanilla JS, no dependencies) */
(() => {
  'use strict';

  /* ---------- deferred images ----------
     Native loading="lazy" starts fetching 1250–2500px ahead, which pulled ~6MB of
     below-the-fold images into the first load. Images marked data-defer get their
     src/srcset only when they come within 300px of the viewport. Width/height
     attributes reserve the space, so no layout shift. */
  const deferred = Array.from(document.querySelectorAll('img[data-defer]'));
  const reveal = (img) => {
    if (img.dataset.sizes) img.sizes = img.dataset.sizes; // sizes only together with srcset (HTML validity)
    if (img.dataset.srcset) img.srcset = img.dataset.srcset;
    img.src = img.dataset.src;
    img.removeAttribute('data-defer');
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } });
    }, { rootMargin: '300px 0px' });
    deferred.forEach((img) => io.observe(img));
  } else {
    deferred.forEach(reveal);
  }

  /* ---------- mobile navigation ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const setNav = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setNav(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setNav(false); toggle.focus(); }
  });

  /* ---------- news (data/news.json) ---------- */
  const list = document.querySelector('.news-list');
  const fmt = (d) => d.replace(/-/g, '.');
  const renderNews = (items) => {
    list.replaceChildren();
    if (!items.length) {
      const li = document.createElement('li');
      li.className = 'news-list__empty';
      li.textContent = '現在お知らせはありません。';
      list.append(li);
      return;
    }
    items
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
      .forEach((n) => {
        const li = document.createElement('li');
        const art = document.createElement('article');
        art.className = 'news-item';
        const time = document.createElement('time');
        time.className = 'news-item__date';
        time.dateTime = n.date;
        time.textContent = fmt(n.date);
        const cat = document.createElement('span');
        cat.className = 'news-item__cat';
        cat.textContent = n.category;
        const title = document.createElement('p');
        title.className = 'news-item__title';
        title.textContent = n.title;
        art.append(time, cat, title);
        li.append(art);
        list.append(li);
      });
  };
  fetch(list.dataset.newsSrc)
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    // Only director-approved items are shown. Anything else (e.g. "draft") stays in the file but is not published.
    .then((d) => renderNews((d.items || []).filter((n) => n.status === 'published')))
    .catch(() => {
      list.replaceChildren();
      const li = document.createElement('li');
      li.className = 'news-list__empty';
      li.textContent = 'ニュースを読み込めませんでした。';
      list.append(li);
    });

  /* ---------- gallery lightbox ---------- */
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  const box = document.querySelector('.lightbox');
  const img = box.querySelector('.lightbox__img');
  const cap = box.querySelector('.lightbox__cap');
  let index = 0;
  let opener = null;

  const show = (i) => {
    index = (i + items.length) % items.length;
    const it = items[index];
    img.width = Number(it.dataset.w);
    img.height = Number(it.dataset.h);
    img.src = it.dataset.full;
    img.alt = it.querySelector('img').alt;
    cap.textContent = it.dataset.caption + `　(${index + 1} / ${items.length})`;
  };
  const open = (i, el) => {
    opener = el;
    show(i);
    box.showModal();
    box.querySelector('.lightbox__close').focus();
  };
  items.forEach((el, i) => el.addEventListener('click', () => open(i, el)));
  box.querySelector('.lightbox__prev').addEventListener('click', () => show(index - 1));
  box.querySelector('.lightbox__next').addEventListener('click', () => show(index + 1));
  box.querySelector('.lightbox__close').addEventListener('click', () => box.close());
  box.addEventListener('click', (e) => { if (e.target === box) box.close(); });
  box.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
  });
  const PLACEHOLDER = img.getAttribute('src');
  box.addEventListener('close', () => { img.src = PLACEHOLDER; if (opener) opener.focus(); });
})();


/* MORWEN-3V: accessible direction switcher + mobile swipe */
(() => {
  const SWIPE_THRESHOLD = 48;
  document.querySelectorAll('.morwen-views').forEach((section) => {
    const buttons = Array.from(section.querySelectorAll('[data-morwen-view]'));
    const image = section.querySelector('.morwen-views__image');
    if (!image || !buttons.length) return;

    let active = Math.max(0, buttons.findIndex((button) => button.getAttribute('aria-pressed') === 'true'));
    let touchStart = null;

    const show = (index) => {
      active = (index + buttons.length) % buttons.length;
      const button = buttons[active];
      image.src = button.dataset.morwenView;
      image.alt = 'モルウェン公式設定画・' + button.dataset.morwenLabel;
      buttons.forEach((item, i) => item.setAttribute('aria-pressed', String(i === active)));
    };

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => show(index));
      button.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        const next = (active + (event.key === 'ArrowLeft' ? -1 : 1) + buttons.length) % buttons.length;
        show(next);
        buttons[next].focus();
      });
    });

    image.addEventListener('dragstart', (event) => event.preventDefault());
    image.addEventListener('touchstart', (event) => {
      if (event.touches.length !== 1) { touchStart = null; return; }
      const touch = event.touches[0];
      touchStart = { x: touch.clientX, y: touch.clientY };
    }, { passive: true });
    image.addEventListener('touchend', (event) => {
      if (!touchStart || event.changedTouches.length !== 1) { touchStart = null; return; }
      const touch = event.changedTouches[0];
      const dx = touch.clientX - touchStart.x;
      const dy = touch.clientY - touchStart.y;
      touchStart = null;
      if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy) * 1.3) return;
      show(active + (dx < 0 ? 1 : -1));
    }, { passive: true });
    image.addEventListener('touchcancel', () => { touchStart = null; });
  });
})();
