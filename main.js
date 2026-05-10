document.addEventListener('DOMContentLoaded', () => {
  
  // ── LOADER ────────────────────────────────────────────────
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
  
  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      loaderBar.style.width = '100%';
      
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
      }, 400);
    } else {
      loaderBar.style.width = progress + '%';
    }
  }, 50);

  // Stop scrolling while loading
  document.body.style.overflow = 'hidden';

  // ── NAV SCROLL STATE ──────────────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.add('scrolled'); // or remove depending on preference, actually let's keep it clean
      // Wait, let's toggle it properly
      if(window.scrollY > 50) {
         nav.classList.add('scrolled');
      } else {
         nav.classList.remove('scrolled');
      }
    }
  });

  // ── SCROLL REVEAL ─────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach(el => revealObs.observe(el));

  // ── SMOOTH SCROLL ─────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});
