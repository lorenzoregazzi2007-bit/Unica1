// ── CANVAS PARTICLES ─────────────────────────────────────
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [], mouse = { x: -999, y: -999 };

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - .5) * .4;
    this.vy = (Math.random() - .5) * .4;
    this.r = Math.random() * 1.5 + .3;
    this.alpha = Math.random() * .5 + .1;
    const c = Math.random();
    this.color = c < .33 ? '79,158,255' : c < .66 ? '168,85,247' : '34,211,238';
  }
  update() {
    const dx = this.x - mouse.x, dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 120) { this.vx += dx / dist * .03; this.vy += dy / dist * .03; }
    this.vx *= .99; this.vy *= .99;
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

// Draw connections
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(79,158,255,${(1 - d / 100) * .08})`;
        ctx.lineWidth = .5;
        ctx.stroke();
      }
    }
  }
}

function animateCanvas() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateCanvas);
}
animateCanvas();

// ── LOADER ────────────────────────────────────────────────
const loader = document.getElementById('loader');
const fill = document.querySelector('.loader-fill');
const pct = document.getElementById('loaderPercent');
let progress = 0;

const loadInterval = setInterval(() => {
  progress += Math.random() * 4 + 1;
  if (progress >= 100) { progress = 100; clearInterval(loadInterval); setTimeout(hideLoader, 400); }
  fill.style.width = progress + '%';
  pct.textContent = Math.floor(progress) + '%';
}, 60);

function hideLoader() {
  loader.classList.add('hidden');
  document.getElementById('nav').classList.add('visible');
  animateHero();
}

// ── HERO ─────────────────────────────────────────────────
function animateHero() {
  // lines will auto-animate via CSS
}

document.getElementById('heroCta').addEventListener('click', () => {
  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

// ── SCROLL REVEAL ─────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObs.observe(el));

// ── COUNTER ANIMATION ─────────────────────────────────────
const statNums = document.querySelectorAll('.stat-num');
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = +e.target.dataset.target;
      let current = 0;
      const step = target / 50;
      const t = setInterval(() => {
        current = Math.min(current + step, target);
        e.target.textContent = Math.floor(current) + (e.target.dataset.target === '100' ? '%' : '+');
        if (current >= target) clearInterval(t);
      }, 30);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(n => counterObs.observe(n));

// ── TERMINAL TYPEWRITER ───────────────────────────────────
const termObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      typeTerminal();
      termObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

const termEl = document.getElementById('aiTerminal');
if (termEl) termObs.observe(termEl);

function typeTerminal() {
  const lines = document.querySelectorAll('.t-line');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transition = 'opacity .3s';
    }, i * 300);
  });
}

// ── PARALLAX ──────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const orbs = document.querySelectorAll('.orb');
  orbs.forEach((orb, i) => {
    const speed = (i + 1) * 0.15;
    orb.style.transform = `translateY(${scrollY * speed}px)`;
  });
});

// ── MOUSE TILT on PROJ CARDS ──────────────────────────────
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - .5;
    const y = (e.clientY - rect.top) / rect.height - .5;
    card.style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    card.style.transition = 'transform .1s';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform .5s ease';
  });
});

// ── WALL ITEMS glow ───────────────────────────────────────
document.querySelectorAll('.wall-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    const glow = item.dataset.glow;
    const map = { blue: '79,158,255', purple: '168,85,247', cyan: '34,211,238' };
    item.style.background = `rgba(${map[glow] || '79,158,255'},0.07)`;
  });
  item.addEventListener('mouseleave', () => {
    item.style.background = '';
  });
});

// ── SMOOTH SCROLL nav ─────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ── NAV ACTIVE ────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + e.target.id ? '#fff' : '';
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => navObs.observe(s));

// ── FINALE fade-in ────────────────────────────────────────
const finaleObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.body.style.setProperty('--finale-progress', '1');
    }
  });
}, { threshold: 0.3 });
const finale = document.getElementById('finale');
if (finale) finaleObs.observe(finale);
