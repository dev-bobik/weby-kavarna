// Nav shrink on scroll
const nav = document.querySelector('nav');

// Parallax target
const barImg = document.querySelector('.bar-full');

window.addEventListener('scroll', () => {
  const sy = window.scrollY;

  // Nav shrink
  nav.classList.toggle('scrolled', sy > 60);

  // Parallax – bar image
  if (barImg) {
    const wrap = barImg.closest('.bar-full-wrap');
    const rect = wrap.getBoundingClientRect();
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    barImg.style.transform = `translateY(${(progress - 0.5) * -80}px)`;
  }
}, { passive: true });

// Fade-in on scroll with stagger for gallery
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

// Gallery items get stagger via inline delay
document.querySelectorAll('.gallery-item.fade-in').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
});

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
