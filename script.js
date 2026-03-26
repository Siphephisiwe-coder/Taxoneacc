  // ========================
  // PAGE ROUTER
  // ========================
  const pages = ['home','about','services','testimonials','contact'];

  function showPage(name) {
    pages.forEach(p => {
      document.getElementById('page-' + p).classList.remove('active');
    });
    document.getElementById('page-' + name).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update active nav
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active-nav'));

    // Close mobile nav
    const header = document.getElementById('site-header');
    header.classList.remove('open');
    document.getElementById('navToggle').setAttribute('aria-expanded','false');

    // Trigger reveal animations
    setTimeout(initReveal, 100);
  }

  function showServicePage(serviceId) {
    showPage('services');
    setTimeout(() => {
      // activate correct sidebar link
      document.querySelectorAll('.service-link').forEach(l => l.classList.remove('active'));
      const link = document.querySelector(`.service-link[data-target="${serviceId}"]`);
      if (link) link.classList.add('active');
      // show correct detail
      document.querySelectorAll('.service-detail').forEach(d => d.classList.remove('active'));
      const detail = document.getElementById('svc-' + serviceId);
      if (detail) detail.classList.add('active');
    }, 150);
  }

  // ========================
  // HEADER SCROLL
  // ========================
  window.addEventListener('scroll', () => {
    const h = document.getElementById('site-header');
    h.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Mobile nav toggle
  document.getElementById('navToggle').addEventListener('click', function() {
    const header = document.getElementById('site-header');
    const isOpen = header.classList.toggle('open');
    this.setAttribute('aria-expanded', String(isOpen));
  });

  // ========================
  // SWIPER
  // ========================
  new Swiper('.hero-swiper', {
    loop: true,
    effect: 'fade',
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
  });

  // ========================
  // SERVICES SIDEBAR
  // ========================
  document.querySelectorAll('.service-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('data-target');
      document.querySelectorAll('.service-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      document.querySelectorAll('.service-detail').forEach(d => d.classList.remove('active'));
      const detail = document.getElementById('svc-' + target);
      if (detail) detail.classList.add('active');
    });
  });

  // ========================
  // FAQ ACCORDION
  // ========================
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('faq-question')) {
      const btn = e.target;
      const answer = btn.nextElementSibling;
      const faq = btn.closest('.faq');
      const faqs = btn.closest('.faqs');

      // Close others in same block
      faqs.querySelectorAll('.faq-answer').forEach(a => { a.style.maxHeight = null; });
      faqs.querySelectorAll('.faq-question').forEach(q => q.classList.remove('open'));

      if (!faq.classList.contains('open')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.classList.add('open');
      }

      faqs.querySelectorAll('.faq').forEach(f => f.classList.remove('open'));
      if (!answer.style.maxHeight || answer.style.maxHeight === '0px') {
        // already closed above
      } else {
        faq.classList.add('open');
      }
    }
  });

  // ========================
  // SCROLL REVEAL
  // ========================
  function initReveal() {
    const els = document.querySelectorAll('.page.active .reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => observer.observe(el));
  }

  initReveal();

  // ========================
  // CONTACT FORM
  // ========================
  function handleContactSubmit() {
    const name = document.getElementById('c-name').value.trim();
    const email = document.getElementById('c-email').value.trim();
    const service = document.getElementById('c-service').value;
    const phone = document.getElementById('c-phone').value.trim();
    const message = document.getElementById('c-message').value.trim();

    if (!name || !email) {
      showToast('Please fill in your name and email address.');
      return;
    }

    const subject = `Quote Request – ${service || 'General Inquiry'}`;
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`;
    window.location.href = `mailto:info@taxoneacc.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showToast('Opening your email client... ✓');
  }

  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

