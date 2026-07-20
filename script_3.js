
(() => {
  const routeMap = {
    'dashboard': 'dashboard',
    'category': 'category',
    'ideation': 'ideation',
    'script': 'script',
    'voiceover': 'voiceover',
    'thumbnail': 'thumbnail',
    'seo': 'seo',
    'checklist': 'checklist'
  };

  function openRouteFromHash() {
    const key = (location.hash || '').replace('#', '').trim();
    const target = routeMap[key];
    if (!target) return;
    const navBtn = document.querySelector(`.nav-item[data-target="${target}"]`);
    if (navBtn) navBtn.click();
  }

  window.addEventListener('hashchange', openRouteFromHash);
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(openRouteFromHash, 50);
  });
})();
