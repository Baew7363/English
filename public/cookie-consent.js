/**
 * Oxford 3000 - Google AdSense & GDPR Compliant Cookie Consent Manager
 */
(function () {
  const CONSENT_KEY = 'oxford_cookie_consent';

  function getStoredConsent() {
    try {
      const data = localStorage.getItem(CONSENT_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(preferences) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(preferences));
      // Backwards compatibility with previous key
      localStorage.setItem('cookie-consent-ack', '1');
    } catch (e) {}
    hideBanner();
    hideModal();
  }

  function hideBanner() {
    const banner = document.getElementById('cookie-notice');
    if (banner) banner.classList.add('hidden');
  }

  function showBanner() {
    const banner = document.getElementById('cookie-notice');
    if (banner) banner.classList.remove('hidden');
  }

  function hideModal() {
    const modal = document.getElementById('cookie-modal-backdrop');
    if (modal) modal.classList.add('hidden');
  }

  function showModal() {
    const modal = document.getElementById('cookie-modal-backdrop');
    if (modal) {
      const current = getStoredConsent() || { necessary: true, advertising: true };
      const adsCheckbox = document.getElementById('cookie-opt-advertising');
      if (adsCheckbox) adsCheckbox.checked = current.advertising !== false;
      modal.classList.remove('hidden');
    }
  }

  window.acceptAllCookies = function () {
    saveConsent({ necessary: true, advertising: true, timestamp: Date.now() });
  };

  window.rejectOptionalCookies = function () {
    saveConsent({ necessary: true, advertising: false, timestamp: Date.now() });
  };

  window.saveCustomCookiePreferences = function () {
    const adsCheckbox = document.getElementById('cookie-opt-advertising');
    const advertisingEnabled = adsCheckbox ? adsCheckbox.checked : false;
    saveConsent({ necessary: true, advertising: advertisingEnabled, timestamp: Date.now() });
  };

  window.openCookieModal = function () {
    showModal();
  };

  window.closeCookieModal = function () {
    hideModal();
  };

  // Check consent status on load
  document.addEventListener('DOMContentLoaded', function () {
    const consent = getStoredConsent();
    if (!consent) {
      // Delay slightly for smooth UX
      setTimeout(showBanner, 600);
    }
  });
})();
