// Spectrum Global Venture - Main JS

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
      } else {
        navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
      }
    });
  }

  // Fade-up animation on scroll
  const fadeElements = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => observer.observe(el));

  // Contact / Quote form handling (client-side demo + Formspree ready)
  const forms = document.querySelectorAll('form[data-form]');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // For demo / static hosting without backend, prevent default and show success
      // In production, remove this and use Formspree / Netlify Forms / your backend
      const useDemo = form.dataset.demo === 'true';
      if (useDemo) {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
        
        setTimeout(() => {
          btn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Message Sent!';
          btn.classList.remove('btn-primary');
          btn.classList.add('btn-success');
          form.reset();
          
          // Show success alert
          const alert = document.createElement('div');
          alert.className = 'alert alert-success mt-3';
          alert.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Thank you! We have received your request and will get back to you shortly.';
          form.appendChild(alert);
          
          setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = originalText;
            btn.classList.remove('btn-success');
            btn.classList.add('btn-primary');
            alert.remove();
          }, 5000);
        }, 1500);
      }
    });
  });

  // Active nav link highlighter based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else if (!href.includes('#')) {
      link.classList.remove('active');
    }
  });
});