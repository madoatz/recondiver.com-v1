(() => {
  const coarse = () => window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const closeSiblings = (item) => { const parent = item.parentElement; if (parent) parent.querySelectorAll(':scope > li.is-subnav-open').forEach((node) => { if (node !== item) node.classList.remove('is-subnav-open'); }); };
  document.querySelectorAll('.topnav, .slidemenu').forEach((root) => root.querySelectorAll('li').forEach((item) => {
    const submenu = Array.from(item.children).find((node) => node.matches && node.matches('ul.subnav') && node.querySelector('a'));
    const link = Array.from(item.children).find((node) => node.matches && node.matches('a'));
    if (!submenu || !link || item.classList.contains('has-subnav')) return;
    item.classList.add('has-subnav');
    const toggle = (open) => { const next = open ?? !item.classList.contains('is-subnav-open'); if (next) closeSiblings(item); item.classList.toggle('is-subnav-open', next); };
    link.addEventListener('click', (event) => { if (coarse() && !item.classList.contains('is-subnav-open')) { event.preventDefault(); toggle(true); } });
    item.addEventListener('pointerenter', () => { if (!coarse()) toggle(true); });
    item.addEventListener('pointerleave', () => { if (!coarse()) toggle(false); });
  }));
  document.querySelectorAll('details.nav-dropdown').forEach((details) => { details.addEventListener('pointerenter', () => { if (!coarse()) details.open = true; }); details.addEventListener('pointerleave', () => { if (!coarse()) details.open = false; }); });
  document.addEventListener('click', (event) => { if (!event.target.closest('.topnav, .slidemenu')) document.querySelectorAll('.is-subnav-open').forEach((item) => item.classList.remove('is-subnav-open')); });
})();
