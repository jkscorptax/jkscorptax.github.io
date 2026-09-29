/**
 * JKS CorpTax – WhatsApp Chat Widget
 * File: js/whatsapp.js
 * Description: Floating WhatsApp "Chat with Us" button + popup panel
 *
 * Configuration:
 *   WA_CONFIG.phone   — WhatsApp number in international format (no + or spaces)
 *   WA_CONFIG.message — Pre-filled greeting message
 *   WA_CONFIG.name    — Display name in the popup header
 *   WA_CONFIG.hours   — Business hours text shown in popup
 */

const WA_CONFIG = {
  phone:   '918905727571',          // +91-89057 27571
  phone2:  '919409123357',          // +91-94091 23357 (backup)
  name:    'JKS CorpTax',
  title:   'Tax & Compliance Experts',
  hours:   'Mon – Sat: 10:00 AM – 7:00 PM',
  message: 'Hello JKS CorpTax! I would like to enquire about your services. Please get in touch with me.',
};

/* ── BUILD WIDGET HTML ── */
function buildWhatsAppWidget() {
  const now    = new Date();
  const hour   = now.getHours();
  const isOpen = hour >= 10 && hour < 19; // Mon–Sat 10am–7pm
  const status = isOpen ? '🟢 Online now' : '🔴 We\'ll reply soon';

  const widget = document.createElement('div');
  widget.className = 'wa-widget';
  widget.id        = 'waWidget';
  widget.innerHTML = `
    <!-- Chat Popup Panel -->
    <div class="wa-popup" id="waPopup" role="dialog" aria-label="WhatsApp Chat" aria-modal="true">
      <!-- Header -->
      <div class="wa-popup-header">
        <div class="wa-popup-avatar">💬</div>
        <div class="wa-popup-info">
          <h4>${WA_CONFIG.name}</h4>
          <p>${status}</p>
        </div>
        <button class="wa-popup-close" onclick="closeWaPopup()" aria-label="Close chat">&times;</button>
      </div>

      <!-- Chat bubble body -->
      <div class="wa-popup-body">
        <div class="wa-bubble">
          👋 Hi there! Welcome to <strong>JKS CorpTax</strong>.<br><br>
          Need help with <em>GST, Income Tax, Export, Incentives, or Compliance?</em><br><br>
          Click below to start a WhatsApp chat with our experts — we usually reply within minutes!
          <div class="wa-bubble-time">${getTime(now)} &nbsp; ✓✓</div>
        </div>
      </div>

      <!-- CTA Footer -->
      <div class="wa-popup-footer">
        <a
          class="wa-send-btn"
          href="https://wa.me/${WA_CONFIG.phone}?text=${encodeURIComponent(WA_CONFIG.message)}"
          target="_blank"
          rel="noopener noreferrer"
          onclick="trackWaClick()"
          aria-label="Open WhatsApp chat"
        >
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.473 2.027 7.775L0 32l8.468-2.01A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.844 22.288c-.328.92-1.921 1.755-2.635 1.818-.67.059-1.303.295-4.387-1.006-3.693-1.549-6.065-5.339-6.247-5.587-.182-.248-1.488-2.014-1.488-3.838 0-1.825.942-2.72 1.276-3.09.334-.37.729-.462 1.002-.462.248 0 .497.003.715.013.229.011.537-.087.84.645.328.775 1.113 2.672 1.21 2.866.097.194.162.42.032.678-.13.258-.194.42-.388.646-.194.226-.41.505-.583.678-.194.194-.396.404-.17.793.226.389.1.582 1.72 2.27.948.949 1.947 1.478 2.604 1.756.388.162.648.135.886-.08.237-.215 1.018-1.188 1.289-1.596.271-.408.543-.341.916-.205.373.136 2.37 1.119 2.778 1.322.408.203.68.304.779.474.097.17.097.98-.23 1.905z"/>
          </svg>
          Chat with Us on WhatsApp
        </a>
        <p style="font-size:.68rem;color:#888;text-align:center;margin-top:.5rem;">${WA_CONFIG.hours}</p>
      </div>
    </div>

    <!-- Tooltip label -->
    <div class="wa-label">Chat with Us</div>

    <!-- FAB Button -->
    <button class="wa-btn" id="waBtn" onclick="toggleWaPopup()" aria-label="Open WhatsApp chat" aria-expanded="false">
      <span class="wa-pulse"></span>
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.473 2.027 7.775L0 32l8.468-2.01A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.844 22.288c-.328.92-1.921 1.755-2.635 1.818-.67.059-1.303.295-4.387-1.006-3.693-1.549-6.065-5.339-6.247-5.587-.182-.248-1.488-2.014-1.488-3.838 0-1.825.942-2.72 1.276-3.09.334-.37.729-.462 1.002-.462.248 0 .497.003.715.013.229.011.537-.087.84.645.328.775 1.113 2.672 1.21 2.866.097.194.162.42.032.678-.13.258-.194.42-.388.646-.194.226-.41.505-.583.678-.194.194-.396.404-.17.793.226.389.1.582 1.72 2.27.948.949 1.947 1.478 2.604 1.756.388.162.648.135.886-.08.237-.215 1.018-1.188 1.289-1.596.271-.408.543-.341.916-.205.373.136 2.37 1.119 2.778 1.322.408.203.68.304.779.474.097.17.097.98-.23 1.905z"/>
      </svg>
    </button>
  `;

  document.body.appendChild(widget);
}

/* ── TOGGLE / CLOSE ── */
function toggleWaPopup() {
  const popup = document.getElementById('waPopup');
  const btn   = document.getElementById('waBtn');
  if (!popup) return;
  const isOpen = popup.classList.toggle('open');
  if (btn) btn.setAttribute('aria-expanded', String(isOpen));
  // Stop pulse animation while open
  const pulse = btn?.querySelector('.wa-pulse');
  if (pulse) pulse.style.animationPlayState = isOpen ? 'paused' : 'running';
}

function closeWaPopup() {
  const popup = document.getElementById('waPopup');
  const btn   = document.getElementById('waBtn');
  if (popup) popup.classList.remove('open');
  if (btn)   btn.setAttribute('aria-expanded', 'false');
  const pulse = btn?.querySelector('.wa-pulse');
  if (pulse)  pulse.style.animationPlayState = 'running';
}

/* ── CLOSE ON OUTSIDE CLICK ── */
document.addEventListener('click', function (e) {
  const widget = document.getElementById('waWidget');
  if (widget && !widget.contains(e.target)) {
    closeWaPopup();
  }
});

/* ── CLOSE ON ESC ── */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeWaPopup();
});

/* ── ANALYTICS HOOK (replace with real GA/GTM call if needed) ── */
function trackWaClick() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'wa_chat_click', { event_category: 'engagement', event_label: 'WhatsApp Widget' });
  }
  console.log('[JKS CorpTax] WhatsApp chat opened.');
}

/* ── HELPER: FORMAT CURRENT TIME ── */
function getTime(date) {
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

/* ── INIT ── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', buildWhatsAppWidget);
} else {
  buildWhatsAppWidget();
}
