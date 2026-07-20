
(() => {
  const fmtTime = (ts) => {
    if (!ts) return '-';
    try {
      return new Date(ts).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
    } catch {
      return '-';
    }
  };

  const getState = () => {
    try {
      return JSON.parse(localStorage.getItem('ytSuiteStateV3') || '{}');
    } catch {
      return {};
    }
  };

  const updateDashboard = () => {
    const state = getState();

    const projectTitle = state.selectedIdea?.title || state.customScriptTitle || state.topic || 'Belum ada project';
    const projectSub = state.selectedIdea?.angle || state.customScriptBrief || 'Pilih kategori dan ide untuk mulai mengisi dashboard.';
    const category = state.category ? `${state.category.main} • ${state.category.sub}` : '-';
    const topic = state.topic || '-';

    const scriptReady = !!(state.scriptData?.content && String(state.scriptData.content).trim());
    const voReady = !!(state.voiceover?.content || state.voiceover?.audioUrl);
    const thumbReady = Array.isArray(state.thumbnails) && state.thumbnails.length > 0;
    const seoReady = !!state.seo;
    const readyCount = [scriptReady, voReady, thumbReady, seoReady].filter(Boolean).length;

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    setText('dashboard-project-title', projectTitle);
    setText('dashboard-project-sub', projectSub);
    setText('dashboard-tools-ready', String(readyCount));
    setText('dashboard-last-save', fmtTime(state.lastUpdated));
    setText('dashboard-category', category);
    setText('dashboard-topic', topic);

    const elRecent = document.getElementById('dashboard-recent');
    if (elRecent) {
      elRecent.innerHTML = `
        <div class="rounded-2xl p-4 border border-gray-200 dark:border-[#3a3a3a] bg-white/60 dark:bg-[#1a1a1a]">
          <div class="flex items-center justify-between gap-2">
            <div class="font-bold text-sm truncate">${projectTitle}</div>
            <span class="text-[10px] px-2 py-1 rounded-full ${scriptReady ? 'bg-emerald-500/10 text-emerald-500' : 'bg-yellow-500/10 text-yellow-500'}">${scriptReady ? 'Script siap' : 'Draft'}</span>
          </div>
          <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">${projectSub}</div>
          <div class="mt-3 flex flex-wrap gap-2 text-[11px]">
            <span class="px-2 py-1 rounded-full bg-gray-100 dark:bg-[#222]">Category: ${category}</span>
            <span class="px-2 py-1 rounded-full bg-gray-100 dark:bg-[#222]">Topic: ${topic}</span>
            <span class="px-2 py-1 rounded-full bg-gray-100 dark:bg-[#222]">Saved: ${fmtTime(state.lastUpdated)}</span>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          ${[
            ['Script', scriptReady],
            ['Voice', voReady],
            ['Thumbnail', thumbReady],
            ['SEO', seoReady]
          ].map(([label, ok]) => `
            <div class="flex items-center justify-between rounded-2xl px-3 py-2 bg-gray-100 dark:bg-[#1a1a1a] text-sm">
              <span>${label}</span>
              <span class="font-bold ${ok ? 'text-emerald-500' : 'text-gray-400'}">${ok ? 'Done' : 'Pending'}</span>
            </div>
          `).join('')}
        </div>
      `;
    }
  };

  const bindDashButtons = () => {
    document.querySelectorAll('.dash-jump').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        const navBtn = document.querySelector(`.nav-item[data-target="${target}"]`);
        if (navBtn) navBtn.click();
      });
    });

    const search = document.getElementById('tool-search');
    if (search) {
      search.addEventListener('input', () => {
        const q = search.value.toLowerCase().trim();
        document.querySelectorAll('.dash-jump').forEach((btn) => {
          const text = btn.innerText.toLowerCase();
          btn.style.display = !q || text.includes(q) ? '' : 'none';
        });
      });
    }
  };

  const hookStateUpdates = () => {
    const patch = (fnName) => {
      const original = window[fnName];
      if (typeof original !== 'function') return;
      window[fnName] = function(...args) {
        const result = original.apply(this, args);
        updateDashboard();
        return result;
      };
    };

    patch('saveState');
    patch('renderAllFromState');
    patch('loadState');
  };

  document.addEventListener('DOMContentLoaded', () => {
    bindDashButtons();
    updateDashboard();
    hookStateUpdates();
    if (window.lucide?.createIcons) window.lucide.createIcons();
    setInterval(updateDashboard, 1200);
  });

  window.ToolHubDashboard = { updateDashboard };
})();
