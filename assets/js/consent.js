/* Cookie consent banner + GA4 consent mode */
(function () {
  'use strict';
  var KEY = 'aicco_consent';
  var state = null;
  try { state = localStorage.getItem(KEY); } catch (e) { /* storage unavailable */ }

  function apply(s) {
    if (window.gtag) {
      gtag('consent', 'update', {
        'ad_storage': s,
        'analytics_storage': s,
        'ad_user_data': s,
        'ad_personalization': s
      });
    }
  }

  function privacyPath() {
    return location.pathname.indexOf('/products/') !== -1 ? '../privacy-policy.html' : 'privacy-policy.html';
  }

  function showBanner() {
    var s = document.createElement('style');
    s.textContent = '#consent-banner{position:fixed;left:0;right:0;bottom:0;z-index:999;background:#0b1018;border-top:1px solid rgba(255,255,255,.12);padding:14px 20px;box-shadow:0 -12px 40px rgba(0,0,0,.4)}'
      + '.cb-inner{max-width:1180px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}'
      + '.cb-text{color:#cdd7e4;font-size:.88rem;margin:0;line-height:1.5}'
      + '.cb-text a{color:#ffb000;font-weight:700}'
      + '.cb-actions{display:flex;gap:10px}'
      + '.cb-actions button{border:none;border-radius:999px;padding:9px 18px;font-weight:800;cursor:pointer;font-size:.85rem}'
      + '#cb-accept{background:linear-gradient(135deg,#ffb000,#ff8c00);color:#111827}'
      + '#cb-decline{background:rgba(255,255,255,.08);color:#e5edf8;border:1px solid rgba(255,255,255,.2)}';
    document.head.appendChild(s);

    var b = document.createElement('div');
    b.id = 'consent-banner';
    b.innerHTML = '<div class="cb-inner">'
      + '<p class="cb-text">We use cookies to measure site traffic and improve your experience. Read our <a href="' + privacyPath() + '" target="_blank" rel="noopener">privacy policy</a>.</p>'
      + '<div class="cb-actions"><button type="button" id="cb-accept">Accept all</button><button type="button" id="cb-decline">Decline</button></div>'
      + '</div>';
    document.body.appendChild(b);

    document.getElementById('cb-accept').addEventListener('click', function () {
      state = 'granted';
      try { localStorage.setItem(KEY, state); } catch (e) { /* ignore */ }
      apply('granted');
      if (b.parentNode) b.parentNode.removeChild(b);
    });
    document.getElementById('cb-decline').addEventListener('click', function () {
      state = 'denied';
      try { localStorage.setItem(KEY, state); } catch (e) { /* ignore */ }
      apply('denied');
      if (b.parentNode) b.parentNode.removeChild(b);
    });
  }

  if (state === 'granted') {
    apply('granted');
  } else if (state === 'denied') {
    apply('denied');
  } else {
    showBanner(); /* default is denied (set in gtag snippet); banner asks user */
  }
})();
