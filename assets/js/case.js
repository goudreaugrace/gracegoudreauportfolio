// Case-study section links + reading progress, stacked under the main nav.
(() => {
  const main = document.querySelector('main');
  const header = document.querySelector('.site-header');
  if (!main || !header) return;
  const heads = [...main.querySelectorAll('h2.label[id]')];
  if (heads.length < 3) return;
  const short = {
    'TL;DR': 'TL;DR', 'The stakes': 'Stakes', 'The scale of the work': 'Scale', 'The strategic bet': 'Strategy',
    'What research changed': 'Research', 'Key decisions': 'Decisions', 'The flow': 'Flow', 'Outcome': 'Outcome',
    'What made it work': 'Collaboration', 'What I took forward': 'Reflection', 'Outcome': 'Outcome', 'The experience model': 'Experience',
    'What we built first, and what waited': 'Priorities', 'What we had to work through': 'Challenges',
    'What testing showed': 'Testing', 'The authority model': 'Authority model', 'Prototype boundaries': 'Boundaries',
    'The reading path': 'Reading path', 'Design principles': 'Principles', 'Before and after': 'Before & after', 'The key insight': 'Insight'
  };
  const nav = document.createElement('nav');
  nav.className = 'jump';
  nav.setAttribute('aria-label', 'Sections on this page');
  const links = heads.map(h => {
    const a = document.createElement('a');
    const label = h.textContent.trim();
    a.href = '#' + h.id;
    a.textContent = h.dataset.short || short[label] || label;
    a.addEventListener('click', e => {
      e.preventDefault();
      const extra = header.classList.contains('show-jump') ? 0 : 26;
      const y = h.getBoundingClientRect().top + scrollY - header.offsetHeight - extra - 16;
      scrollTo({ top: y, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      history.replaceState(null, '', '#' + h.id);
    });
    nav.appendChild(a);
    return a;
  });
  const bar = document.createElement('div');
  bar.className = 'progress';
  bar.setAttribute('aria-hidden', 'true');
  bar.innerHTML = '<span></span>';
  header.append(nav, bar);
  const fill = bar.firstChild;
  const setPad = () => { document.documentElement.style.scrollPaddingTop = (header.offsetHeight + (header.classList.contains('show-jump') ? 0 : 44) + 16) + 'px'; };
  let current = -1;
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    fill.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    const line = header.offsetHeight + 24;
    let i = -1;
    heads.forEach((h, k) => { if (h.getBoundingClientRect().top <= line) i = k; });
    if (i !== current) {
      links.forEach((a, k) => { a.classList.toggle('on', k === i); if (k === i) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
      if (i >= 0 && nav.scrollWidth > nav.clientWidth) {
        const a = links[i];
        nav.scrollTo({ left: a.offsetLeft - nav.clientWidth / 2 + a.offsetWidth / 2, behavior: 'smooth' });
      }
      current = i;
    }
  };
  const headEl = main.querySelector('.cs-head');
  const reveal = () => {
    const past = headEl ? headEl.getBoundingClientRect().bottom < header.offsetHeight : scrollY > 200;
    header.classList.toggle('show-jump', past); setPad();
  };
  setPad(); update(); reveal();
  addEventListener('scroll', reveal, { passive: true });
  nav.addEventListener('focusin', () => header.classList.add('show-jump'));
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', () => { setPad(); update(); });
})();
