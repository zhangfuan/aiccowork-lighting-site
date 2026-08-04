const menuToggle = document.querySelector('.menu-toggle');
menuToggle?.addEventListener('click', () => {
  document.body.classList.toggle('menu-open');
});
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('menu-open')));

const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.product-card');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    cards.forEach(card => {
      const categories = (card.dataset.category || '').split(/\s+/);
      const show = filter === 'all' || categories.includes(filter);
      card.style.display = show ? 'flex' : 'none';
    });
  });
});

const appSelect = document.querySelector('#finder-application');
const typeSelect = document.querySelector('#finder-type');
const needSelect = document.querySelector('#finder-need');
const result = document.querySelector('#finder-result');
const recommendations = {
  offroad: 'Recommended: 330W RGB smart off-road light, 330W vehicle light, or modular LED light bar. Ask for beam pattern, bracket and packaging options.',
  truck: 'Recommended: rectangular work lights, 220W vehicle light, round driving lights or multi-size LED bars for fleet and trailer applications.',
  motorcycle: 'Recommended: compact auxiliary LED lights, round driving lamps or anti-glare LED bars with waterproof housing and stable brackets.',
  machinery: 'Recommended: IP67/IP68 work lights with aluminum housing, flood beam, stainless bracket and aging-test report before shipment.',
  bmw: 'Recommended: BMW laser headlight assembly, triple color headlight or OLED tail light. Confirm model year and plug type before quote.'
};
function updateFinder(){
  if (!result || !appSelect) return;
  const extra = typeSelect?.value === 'assembly' ? ' Include vehicle year and OE fit requirement.' : needSelect?.value ? ` Buyer need: ${needSelect.value}.` : '';
  result.textContent = `${recommendations[appSelect.value]}${extra}`;
}
[appSelect,typeSelect,needSelect].forEach(el => el?.addEventListener('change', updateFinder));
updateFinder();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const backTop = document.querySelector('.back-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 600) backTop?.classList.add('show');
  else backTop?.classList.remove('show');
});
backTop?.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
