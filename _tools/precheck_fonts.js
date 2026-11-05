// Real network check of Google Fonts (used in CI where fonts.googleapis.com is reachable).
// Usage: SITE_URL=http://localhost:8080/ node _tools/precheck_fonts.js
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const res = {};
  for (const [tag, opt] of [['pc', { viewport: { width: 1440, height: 900 } }], ['sp', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }]]) {
    const p = await b.newPage(opt);
    const fontReq = [];
    p.on('response', (r) => { if (/fonts\.(googleapis|gstatic)\.com/.test(r.url())) fontReq.push(r.status()); });
    await p.goto(process.env.SITE_URL || 'http://localhost:8080/', { waitUntil: 'networkidle' });
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); } });
    res[tag] = await p.evaluate(async () => {
      await document.fonts.ready;
      const loaded = [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/"/g, ''));
      return {
        loadedFamilies: [...new Set(loaded)],
        cinzel: document.fonts.check('700 16px "Cinzel"', 'THE'),
        notoSerifJP: document.fonts.check('700 16px "Noto Serif JP"', '物語'),
        notoSansJP: document.fonts.check('400 16px "Noto Sans JP"', '開発'),
        navOneLine: [...document.querySelectorAll('.site-nav__list a')].every((a) => getComputedStyle(a).display === 'none' || a.getBoundingClientRect().height < 40),
        overflowX: document.documentElement.scrollWidth > innerWidth,
      };
    });
    res[tag].fontResponses = fontReq;
    await p.close();
  }
  console.log(JSON.stringify(res, null, 1));
  const ok = Object.values(res).every((r) => r.loadedFamilies.length >= 3 && r.cinzel && r.notoSerifJP && r.notoSansJP && !r.overflowX && r.fontResponses.every((s) => s < 400));
  console.log('RESULT', ok ? 'PASS' : 'FAIL');
  process.exit(ok ? 0 : 1);
})();
