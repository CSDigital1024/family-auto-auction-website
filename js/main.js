document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  const nav = document.getElementById('nav');
  toggle?.addEventListener('click', () => { toggle.classList.toggle('active'); menu.classList.toggle('open'); document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : ''; });
  document.querySelectorAll('.nav__links a, .nav__cta').forEach(l => l.addEventListener('click', () => { toggle?.classList.remove('active'); menu?.classList.remove('open'); document.body.style.overflow = ''; }));
  window.addEventListener('scroll', () => nav?.classList.toggle('scrolled', window.scrollY > 20), { passive: true });
  const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }), { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  const cObs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { const el = e.target, target = parseFloat(el.dataset.count), dec = target % 1 !== 0, dur = 2000, start = performance.now(); function tick(now) { const p = Math.min((now - start) / dur, 1), eased = 1 - Math.pow(1 - p, 4), cur = eased * target; el.textContent = dec ? cur.toFixed(1) : Math.floor(cur).toLocaleString(); if (p < 1) requestAnimationFrame(tick); else el.textContent = dec ? target.toFixed(1) : target.toLocaleString(); } requestAnimationFrame(tick); cObs.unobserve(el); } }), { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => cObs.observe(el));
  document.querySelectorAll('.faq__question').forEach(btn => btn.addEventListener('click', () => { const f = btn.parentElement, open = f.classList.contains('open'); document.querySelectorAll('.faq.open').forEach(x => x.classList.remove('open')); if (!open) f.classList.add('open'); }));
});
