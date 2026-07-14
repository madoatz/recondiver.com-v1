(() => {
  const coarse = () => window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const closeSiblings = (item) => {
    const parent = item.parentElement;
    if (!parent) return;
    parent.querySelectorAll(':scope > li.is-subnav-open').forEach((sibling) => {
      if (sibling !== item) {
        sibling.classList.remove('is-subnav-open');
        const button = sibling.querySelector(':scope > .nav-subnav-toggle');
        if (button) button.setAttribute('aria-expanded', 'false');
      }
    });
  };
  const setupLegacyMenu = (root) => {
    root.querySelectorAll('li').forEach((item) => {
      const submenu = Array.from(item.children).find((child) => child.matches && child.matches('ul.subnav') && child.querySelector('a'));
      const link = Array.from(item.children).find((child) => child.matches && child.matches('a'));
      if (!submenu || !link || item.classList.contains('has-subnav')) return;
      item.classList.add('has-subnav');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'nav-subnav-toggle';
      button.setAttribute('aria-label', 'เปิดเมนูย่อย');
      button.setAttribute('aria-expanded', 'false');
      link.insertAdjacentElement('afterend', button);
      const toggle = (open) => {
        const next = open ?? !item.classList.contains('is-subnav-open');
        if (next) closeSiblings(item);
        item.classList.toggle('is-subnav-open', next);
        button.setAttribute('aria-expanded', String(next));
      };
      button.addEventListener('click', (event) => { event.preventDefault(); event.stopPropagation(); toggle(); });
      link.addEventListener('click', (event) => {
        if (coarse() && !item.classList.contains('is-subnav-open')) { event.preventDefault(); toggle(true); }
      });
      item.addEventListener('pointerenter', () => { if (!coarse()) toggle(true); });
      item.addEventListener('pointerleave', () => { if (!coarse()) toggle(false); });
    });
  };
  document.querySelectorAll('.topnav, .slidemenu').forEach(setupLegacyMenu);
  document.querySelectorAll('details.nav-dropdown').forEach((details) => {
    details.addEventListener('pointerenter', () => { if (!coarse()) details.open = true; });
    details.addEventListener('pointerleave', () => { if (!coarse()) details.open = false; });
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.topnav, .slidemenu')) document.querySelectorAll('.is-subnav-open').forEach((item) => item.classList.remove('is-subnav-open'));
  });
})();
