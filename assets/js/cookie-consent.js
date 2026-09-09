(function () {
  const key = "cookieConsent";
  const hasConsent = localStorage.getItem(key);
  if (hasConsent) return;

  const banner = document.createElement("div");
  banner.id = "cookie-consent";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-live", "polite");
  banner.setAttribute("aria-label", "Cookie-Hinweis");
  banner.innerHTML = `
    <div class="cc-inner">
      <p>
        Diese Website verwendet Cookies für grundlegende Funktionen und anonyme Statistik. 
        Mit deinem Einverständnis verbessern wir dein Nutzungserlebnis.
      </p>
      <div class="cc-actions">
        <button class="button primary" id="cc-accept">Einverstanden</button>
        <button class="button" id="cc-decline">Ablehnen</button>
        <a href="/faq.html" class="button" id="cc-more">Mehr erfahren</a>
      </div>
    </div>`;

  const style = document.createElement("style");
  style.innerHTML = `
    #cookie-consent { position: fixed; left: 0; right: 0; bottom: 0; z-index: 9999; 
      background: rgba(36,41,67,0.95); color: #fff; padding: 1em; box-shadow: 0 -4px 12px rgba(0,0,0,0.3); }
    #cookie-consent .cc-inner { max-width: 65em; margin: 0 auto; display: flex; align-items: center; gap: 1em; }
    #cookie-consent p { margin: 0; flex: 1; }
    #cookie-consent .cc-actions { display: flex; gap: 0.5em; flex-wrap: wrap; }
    #cookie-consent .button { border: 0; cursor: pointer; }
  `;

  document.addEventListener("DOMContentLoaded", function () {
    document.body.appendChild(style);
    document.body.appendChild(banner);

    document.getElementById("cc-accept").addEventListener("click", function () {
      localStorage.setItem(key, "accepted");
      banner.remove();
    });
    document.getElementById("cc-decline").addEventListener("click", function () {
      localStorage.setItem(key, "declined");
      banner.remove();
    });
  });
})();
