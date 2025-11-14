/* app.js - lightweight interactions for the Women's Hostel site */

/* Mobile nav toggle */
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');

  navToggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
    if (!expanded) {
      primaryNav.style.display = 'block';
    } else {
      primaryNav.style.display = 'none';
    }
  });

  // Close nav on link click (mobile)
  primaryNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth < 700) {
        primaryNav.style.display = 'none';
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* Form submit: simulate send (no backend). You can replace action to Formspree later. */
  const form = document.getElementById('enquiryForm');
  const status = document.getElementById('formStatus');
  const callBtn = document.getElementById('callBtn');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email) {
      status.textContent = 'Please fill required fields (name and email).';
      status.style.color = 'crimson';
      return;
    }

    // Basic email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      status.style.color = 'crimson';
      return;
    }

    // Simulate sending
    const prevText = status.textContent;
    status.style.color = 'var(--muted)';
    status.textContent = 'Sending...';

    setTimeout(() => {
      // success
      status.style.color = getComputedStyle(document.documentElement).getPropertyValue('--success').trim() || '#0f9d58';
      status.textContent = 'Thanks! Your enquiry has been received. We will contact you soon.';
      form.reset();
      // If you want to really send, replace with actual form action (Formspree) or AJAX to your backend.
    }, 1000);
  });

  /* Call button: open phone dialer */
  callBtn.addEventListener('click', function () {
    window.location.href = 'tel:+916728749019';
  });

  /* Map lazy load - load iframe only when user clicks button */
  const loadMapBtn = document.getElementById('loadMapBtn');
  const mapFrame = document.getElementById('mapFrame');

  loadMapBtn.addEventListener('click', function () {
    if (mapFrame.getAttribute('aria-hidden') === 'false') return;
    // Replace src with your real Google Maps embed link if available
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '250';
    iframe.style.border = '0';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.src = 'https://www.google.com/maps?q=Tharamani,+Chennai&output=embed';
    iframe.title = 'Rajesh Women\'s Hostel Location';
    mapFrame.appendChild(iframe);
    mapFrame.setAttribute('aria-hidden', 'false');
    // hide the placeholder
    document.getElementById('mapPlaceholder').style.display = 'none';
  });

  /* Accessibility: enable keyboard toggle for navToggle */
  navToggle.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  });

  /* Ensure map placeholder button focus visible */
  const mapBtn = document.querySelector('.map-load-btn');
  if (mapBtn) {
    mapBtn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        this.click();
      }
    });
  }
});