/**
 * JKS CorpTax – Main JavaScript
 * File: js/main.js
 * Description: Tab switching, mobile nav, smooth scroll, header scroll effect
 */

/* ── TAB SWITCHING ── */
function showTab(id, btnEl) {
  // Hide all panels and deactivate all buttons
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  // Activate selected panel and button
  const panel = document.getElementById('tab-' + id);
  if (panel) panel.classList.add('active');
  if (btnEl) btnEl.classList.add('active');
}

/* ── MOBILE NAV TOGGLE ── */
function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  if (nav) nav.classList.toggle('open');
}

/* ── SMOOTH SCROLL ── */
document.addEventListener('DOMContentLoaded', function () {

  // Smooth scroll for all internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile nav if open
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav) mobileNav.classList.remove('open');
      }
    });
  });

  /* ── STICKY HEADER SCROLL SHADOW ── */
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 4px 20px rgba(13,27,62,.14)';
      } else {
        header.style.boxShadow = '0 2px 8px rgba(13,27,62,.08)';
      }
    });
  }

  /* ── CONTACT FORM SUBMIT ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name    = document.getElementById('f-name')?.value.trim();
      const phone   = document.getElementById('f-phone')?.value.trim();
      const email   = document.getElementById('f-email')?.value.trim();
      const service = document.getElementById('f-service')?.value;
      const message = document.getElementById('f-message')?.value.trim();

      if (!name || !phone) {
        alert('Please fill in your Name and Phone Number.');
        return;
      }

      // Build WhatsApp message and open in new tab
      const text = encodeURIComponent(
        `Hello JKS CorpTax,\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email || 'N/A'}\nService Required: ${service || 'N/A'}\n\nMessage: ${message || 'I would like to schedule a consultation.'}`
      );
      window.open(`https://wa.me/918905727571?text=${text}`, '_blank');
    });
  }

  /* ── SCROLL-IN ANIMATION (Intersection Observer) ── */
  const animItems = document.querySelectorAll(
    '.service-card, .sector-card, .testimonial-card, .why-feature, .journey-step, .process-step, .finance-card, .incentive-item'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animItems.forEach(function (el) {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity .4s ease, transform .4s ease';
      observer.observe(el);
    });
  }

});
