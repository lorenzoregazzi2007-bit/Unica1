document.addEventListener('DOMContentLoaded', () => {
  
  // ── LOADER ────────────────────────────────────────────────
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
  const loaderFill = document.getElementById('loaderFill');
  
  let progress = 0;
  
  // Failsafe: se si blocca sblocchiamo comunque dopo 3 secondi
  const failsafe = setTimeout(() => {
    hideLoader();
  }, 3000);

  const loadInterval = setInterval(() => {
    progress += Math.random() * 12 + 3; // Random steps
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      clearTimeout(failsafe);
      
      if(loaderBar) loaderBar.style.height = '100%';
      if(loaderFill) loaderFill.style.width = '100%';
      
      setTimeout(hideLoader, 600);
    } else {
      if(loaderBar) loaderBar.style.height = progress + '%';
      if(loaderFill) loaderFill.style.width = progress + '%';
    }
  }, 60);

  function hideLoader() {
    if(!loader) return;
    loader.classList.add('hidden');
    document.body.style.overflow = ''; // Re-enable scrolling
    setTimeout(() => {
      loader.remove(); // Completamente rimosso dal DOM per evitare blocchi
    }, 1000);
  }
  
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
