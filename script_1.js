
    const DURATION_MAP = [
      { label: '30 detik', min: 0.5, type: 'Shorts/Reels' },
      { label: '1 menit', min: 1, type: 'Shorts/Reels' },
      { label: '2 menit', min: 2, type: 'Short-Form' },
      { label: '3 menit', min: 3, type: 'Short-Form' },
      { label: '5 menit', min: 5, type: 'Mid-Form' },
      { label: '8 menit', min: 8, type: 'Mid-Form' },
      { label: '10 menit', min: 10, type: 'Mid-Form' },
      { label: '15 menit', min: 15, type: 'Long-Form' },
      { label: '20 menit', min: 20, type: 'Long-Form' },
      { label: '30 menit', min: 30, type: 'Documentary' },
      { label: '45 menit', min: 45, type: 'Deep-Dive' },
      { label: '60 menit', min: 60, type: 'Masterclass' }
    ];

    const CATEGORIES_DATA = {
      "Teknologi": { icon:"🖥️", tone:"Informatif, analitis, futuristik", subs:["Gadget & Review","Artificial Intelligence","Software & Aplikasi","Cybersecurity & Hacking","Programming & Coding","Startup & Tech Business","Space Tech & Robotik","Internet & Media Sosial"]},
      "Gaming": { icon:"🎮", tone:"Energetik, santai, hype", subs:["Review Game","Tips & Trick Game","Esports & Turnamen","Game Lore & Cerita","Retro Gaming","Mobile Gaming","PC / Console Gaming","Game Indie"]},
      "Sejarah": { icon:"📜", tone:"Naratif, berwibawa, dramatis", subs:["Sejarah Dunia","Sejarah Indonesia","Perang & Militer","Peradaban Kuno","Tokoh Bersejarah","Misteri Sejarah","Revolusi & Politik","Artefak Kuno"]},
      "Bisnis & Finansial": { icon:"💰", tone:"Profesional, data-driven, motivatif", subs:["Investasi & Saham","Crypto & Blockchain","Cara Menghasilkan Uang","Kisah Sukses Pengusaha","Marketing & Branding","E-commerce & Dropship","Personal Finance","Startup Failure Story"]},
      "Sains & Edukasi": { icon:"🧠", tone:"Eksploratif, jelas, akademis ringan", subs:["Fisika & Alam Semesta","Biologi & Tubuh Manusia","Kimia & Eksperimen","Psikologi & Perilaku","Matematika & Logika","Geografi & Bumi","Lingkungan & Iklim","Medis & Kesehatan"]},
      "Hiburan & Pop Culture": { icon:"🎭", tone:"Casual, up-to-date, opini kuat", subs:["Drama & Gosip Selebriti","Review Film & Series","Musik & Industri","Anime & Manga","Meme & Internet Culture","Behind The Scene","Award & Penghargaan","Trending Topic"]},
      "Misteri & Paranormal": { icon:"🔮", tone:"Mencekam, misterius, bikin penasaran", subs:["Urban Legend","Kisah Horor Nyata","Fenomena Tak Terjelas","Alien & UFO","Haunted Places","Cryptid","Okultisme & Ritual","True Crime Mystery"]},
      "Personal & Motivasi": { icon:"👤", tone:"Hangat, jujur, inspiratif", subs:["Self Improvement","Produktivitas & Habit","Mental Health","Kisah Inspiratif","Pengalaman Pribadi","Relationship","Parenting","Minimalism"]},
      "Olahraga": { icon:"⚽", tone:"Hype, kompetitif, analitis", subs:["Sepak Bola","Basket & NBA","MMA & Combat Sports","Olahraga Ekstrem","Kisah Atlet","Olimpiade & Event","Analisis Pertandingan","Olahraga Tradisional"]},
      "Hiburan Ringan": { icon:"😂", tone:"Lucu, cepat, engaging", subs:["Fakta Unik & Aneh","Rangkuman & Kompilasi","Challenge & Eksperimen","Reaksi & Commentary","Parodi & Satire","Opini & Essay","Ranking & List","Myth Busting"]}
    };

    const CHECKLIST_ITEMS = [
      { id:'c1', label:'Ide konten & kategori sudah ditetapkan' },
      { id:'c2', label:'Script utama selesai ditulis dan di-review' },
      { id:'c3', label:'Voiceover siap untuk rekaman / TTS' },
      { id:'c4', label:'Thumbnail sudah didesain' },
      { id:'c5', label:'Judul final dan tags sudah disiapkan' },
      { id:'c6', label:'Deskripsi video sudah ditulis' },
      { id:'c7', label:'Subtitle / CC sudah direncanakan' },
      { id:'c8', label:'Pinned comment sudah dikonsep' },
      { id:'c9', label:'B-roll / aset visual sudah siap' },
      { id:'c10', label:'Upload checklist sudah selesai' }
    ];

    const STATE = {
      version: '4.0',
      theme: 'dark',
      audience: 'id',
      category: null,
      topic: '',
      selectedIdea: null,
      customScriptTitle: '',
      customScriptBrief: '',
      thumbnailBrief: '',
      thumbnailStyle: '',
      seoBrief: '',
      seoCountry: 'Indonesia',
      scriptSettings: {
        durationIndex: 6,
        age: 'Everyone',
        experience: 'Beginner',
        narrationStyle: 'Casual',
        hookStyle: 'Curiosity',
        ctaStyle: 'Medium',
        detailLevel: 'Normal',
        speakingSpeed: 'Normal',
        emotion: 'Excited'
      },
      scriptData: { content: '' },
      research: null,
      voiceover: { content:'', persona:'', params:{}, audioUrl:'', mimeType:'audio/mpeg' },
      thumbnails: [],
      seo: null,
      checklist: {}
    };

    const $ = (id) => document.getElementById(id);

    function toast(message, type='info') {
      const el = document.createElement('div');
      const styles = {
        success: 'bg-emerald-600 text-white',
        error: 'bg-red-600 text-white',
        info: 'bg-blue-600 text-white'
      };
      el.className = `px-4 py-3 rounded-2xl shadow-xl flex items-start gap-3 ${styles[type] || styles.info}`;
      el.innerHTML = `<i data-lucide="${type === 'success' ? 'check-circle-2' : type === 'error' ? 'alert-circle' : 'info'}" class="w-5 h-5 shrink-0 mt-0.5"></i><div class="text-sm font-medium leading-snug">${message}</div>`;
      $('toast-container').appendChild(el);
      lucide.createIcons();
      setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateX(20px)'; el.style.transition = 'all .25s ease'; setTimeout(() => el.remove(), 250); }, 2500);
    }

    function saveState() {
      localStorage.setItem('ytSuiteStateV3', JSON.stringify({ ...STATE, lastUpdated: new Date().toISOString() }));
    }

    function loadState() {
      const raw = localStorage.getItem('ytSuiteStateV3');
      if (!raw) return false;
      try {
        const parsed = JSON.parse(raw);
        if (parsed.version !== STATE.version) return false;
        Object.assign(STATE, parsed);
        return true;
      } catch {
        return false;
      }
    }

    function applyTheme() {
      document.documentElement.classList.toggle('dark', STATE.theme === 'dark');
      localStorage.setItem('ytSuiteTheme', STATE.theme);
    }

    function setTheme(theme) {
      STATE.theme = theme;
      applyTheme();
      saveState();
    }

    function updateAudienceUI() {
      const idBtn = $('toggle-id');
      const intBtn = $('toggle-intl');
      if (STATE.audience === 'id') {
        idBtn.className = 'px-4 py-1.5 rounded-full text-sm font-semibold shadow bg-white text-gray-900 dark:bg-yt-black dark:text-white';
        intBtn.className = 'px-4 py-1.5 rounded-full text-sm font-semibold text-gray-500 dark:text-gray-400';
      } else {
        intBtn.className = 'px-4 py-1.5 rounded-full text-sm font-semibold shadow bg-white text-gray-900 dark:bg-yt-black dark:text-white';
        idBtn.className = 'px-4 py-1.5 rounded-full text-sm font-semibold text-gray-500 dark:text-gray-400';
      }
    }

    function updateBadges() {
      const catBadge = $('badge-category');
      const ideaBadge = $('badge-idea');
      if (STATE.category) {
        catBadge.classList.remove('hidden');
        $('badge-category-text').textContent = STATE.category.sub;
      } else catBadge.classList.add('hidden');
      if (STATE.selectedIdea) {
        ideaBadge.classList.remove('hidden');
        $('badge-idea-text').textContent = STATE.selectedIdea.title;
      } else ideaBadge.classList.add('hidden');
    }

    function renderCategories(filter='') {
      const grid = $('category-grid');
      grid.innerHTML = '';
      const q = filter.trim().toLowerCase();

      Object.entries(CATEGORIES_DATA).forEach(([main, data]) => {
        const matchesMain = main.toLowerCase().includes(q);
        const matchesSubs = data.subs.filter(s => s.toLowerCase().includes(q));
        if (q && !matchesMain && matchesSubs.length === 0) return;

        const card = document.createElement('div');
        card.className = 'glass rounded-3xl overflow-hidden';
        card.innerHTML = `
          <button class="w-full p-4 md:p-5 flex items-center justify-between gap-3 text-left">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-2xl flex items-center justify-center bg-red-600/10 text-2xl">${data.icon}</div>
              <div>
                <div class="font-extrabold">${main}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">${data.tone}</div>
              </div>
            </div>
            <i data-lucide="chevron-down" class="w-4 h-4 text-gray-400"></i>
          </button>
          <div class="px-4 md:px-5 pb-4 grid gap-2 ${q ? '' : 'hidden'}">
            ${(q && !matchesMain ? matchesSubs : data.subs).map(sub => {
              const active = STATE.category && STATE.category.sub === sub;
              return `<button class="subcat-btn text-left rounded-2xl px-3 py-2.5 border ${active ? 'border-red-500 bg-red-500/10 font-semibold' : 'border-gray-200 dark:border-[#3a3a3a] hover:bg-gray-50 dark:hover:bg-[#2a2a2a]'}" data-main="${main}" data-sub="${sub}" data-tone="${data.tone}">${sub}</button>`;
            }).join('')}
          </div>
        `;
        grid.appendChild(card);
        card.querySelector('button').addEventListener('click', () => {
          const content = card.querySelector('div:last-child');
          content.classList.toggle('hidden');
          card.querySelector('svg').classList.toggle('rotate-180');
        });
      });

      document.querySelectorAll('.subcat-btn').forEach(btn => {
        btn.addEventListener('click', () => selectCategory(btn.dataset.main, btn.dataset.sub, btn.dataset.tone));
      });

      lucide.createIcons();
    }

    function selectCategory(main, sub, tone) {
      STATE.category = { main, sub, tone };
      updateBadges();
      updatePrereqState();
      saveState();
      toast(`Kategori dipilih: ${sub}`, 'success');
    }

    function renderIdeas(ideas) {
      const container = $('ideas-container');
      container.innerHTML = '';
      ideas.forEach(idea => {
        const isSel = STATE.selectedIdea && STATE.selectedIdea.title === idea.title;
        const card = document.createElement('div');
        card.className = `relative rounded-3xl p-5 border cursor-pointer transition-all ${isSel ? 'border-red-500 bg-red-500/10' : 'border-gray-200 dark:border-[#3a3a3a] hover:border-gray-400 dark:hover:border-gray-500 glass'}`;
        card.innerHTML = `
          <div class="flex items-start justify-between gap-3">
            <div>
              <div class="font-extrabold text-lg">${idea.title}</div>
              <div class="text-sm mt-2 text-gray-600 dark:text-gray-300"><b>Angle:</b> ${idea.angle}</div>
              <div class="text-sm mt-1 text-gray-600 dark:text-gray-300"><b>Hook:</b> ${idea.hook}</div>
              <div class="text-sm mt-1 text-gray-600 dark:text-gray-300"><b>Reason:</b> ${idea.reason}</div>
            </div>
            <span class="text-xs font-bold px-2 py-1 rounded-xl border ${idea.potential === 'High' ? 'border-green-500 text-green-500' : 'border-yellow-500 text-yellow-500'}">${idea.potential}</span>
          </div>
          ${isSel ? '<div class="absolute top-3 right-3 text-red-500"><i data-lucide="check-circle-2"></i></div>' : ''}
        `;
        card.addEventListener('click', () => {
          STATE.selectedIdea = idea;
          updateBadges();
          updatePrereqState();
          saveState();
          renderIdeas(ideas);
          toast('Ide dipilih. Lanjut ke script.', 'success');
        });
        container.appendChild(card);
      });
      lucide.createIcons();
    }

    function generateIdeas() {
      const topic = $('topic-input').value.trim();
      if (!topic) return toast('Masukkan topik dulu.', 'error');
      if (!STATE.category) $('idea-warning').classList.remove('hidden');

      $('ideas-results').classList.add('hidden');
      $('idea-skeleton').classList.remove('hidden');
      $('btn-generate-ideas').disabled = true;
      $('btn-generate-ideas').innerHTML = '<span class="spinner"></span> Generate';

      setTimeout(() => {
        const base = STATE.category ? STATE.category.sub : 'General';
        const ideas = [
          { title: `Kenapa ${topic} Bisa Meledak?`, hook: `Kamu mungkin nggak nyangka kalau ${topic} punya sisi yang jauh lebih besar dari kelihatannya.`, angle: `Membahas alasan kenapa ${topic} menarik untuk audiens ${base}.`, potential: 'High', reason: 'Punya rasa penasaran dan mudah diklik.' },
          { title: `3 Fakta Tentang ${topic} yang Jarang Dibahas`, hook: `Di balik ${topic}, ada beberapa fakta yang sering dilewatkan orang.`, angle: `Listicle cepat dengan data kuat.`, potential: 'High', reason: 'Format angka cenderung menarik CTR.' },
          { title: `Apa yang Sebenarnya Terjadi di Balik ${topic}?`, hook: `Kalau dilihat sekilas, ${topic} terlihat simpel. Tapi kenyataannya jauh lebih rumit.`, angle: `Narasi investigatif / eksploratif.`, potential: 'Medium', reason: 'Cocok untuk storytelling dan retention.' },
          { title: `Kesalahan Terbesar Saat Membahas ${topic}`, hook: `Banyak orang salah paham saat ngomongin ${topic}.`, angle: `Myth-busting dan koreksi miskonsepsi.`, potential: 'Medium', reason: 'Bagus untuk audience yang suka klarifikasi.' },
          { title: `Versi Singkat: ${topic} dalam 10 Menit`, hook: `Kalau kamu cuma punya waktu sebentar, ini ringkasan paling penting soal ${topic}.`, angle: `Edukasi cepat dan padat.`, potential: 'High', reason: 'Pencarian intent tinggi dan mudah dipahami.' }
        ];
        STATE.topic = topic;
        renderIdeas(ideas);
        $('ideas-results').classList.remove('hidden');
        $('idea-skeleton').classList.add('hidden');
        $('btn-generate-ideas').disabled = false;
        $('btn-generate-ideas').innerHTML = '<i data-lucide="sparkles" class="w-4 h-4"></i> Generate';
        saveState();
        lucide.createIcons();
      }, 500);
    }

    function updateDurationDisplay(idx) {
      const d = DURATION_MAP[idx];
      $('disp-duration').textContent = d.label.replace('detik','Detik').replace('menit','Menit');
      $('disp-type').textContent = d.type;
      $('disp-words').textContent = `~${Math.round(d.min * 140).toLocaleString()}`;
      const mm = Math.floor(d.min);
      const ss = Math.round((d.min % 1) * 60);
      $('disp-read').textContent = `${mm}m ${String(ss).padStart(2,'0')}s`;
      $('duration-label').textContent = d.label;
    }

    function scriptTextFromState() {
      const cfg = DURATION_MAP[STATE.scriptSettings.durationIndex];
      const words = Math.round(cfg.min * 140);
      const s = STATE.scriptSettings;
      const idea = STATE.selectedIdea || { title:'Topik', hook:'Hook belum tersedia', angle:'', reason:'' };
      const intro = STATE.audience === 'id' ? 'Bahasa Indonesia' : 'English';

      return `# ${idea.title}

**Target Audience:** ${intro}
**Category:** ${STATE.category ? `${STATE.category.main} - ${STATE.category.sub}` : '-'}
**Angle:** ${idea.angle}
**Duration Target:** ${cfg.label} (${cfg.type})
**Est. Word Count:** ~${words} kata

---

## HOOK
${idea.hook}

## INTRO
Pernah nggak kamu merasa kalau ${STATE.topic || idea.title} itu cuma kelihatannya sederhana, padahal di baliknya ada banyak hal penting yang jarang dibahas? Di video ini kita bakal bedah semuanya dengan gaya ${s.narrationStyle.toLowerCase()}.

## BODY
### BAB 1
Mulai dari konteks dasarnya dulu, supaya semua penonton, termasuk ${s.age.toLowerCase()}, bisa langsung paham tanpa bingung. Penjelasannya dibuat ${s.detailLevel.toLowerCase()} dengan pacing ${s.speakingSpeed.toLowerCase()}.

### BAB 2
Masuk ke inti masalah: kenapa topik ini menarik, apa yang sering disalahpahami, dan apa fakta paling penting yang wajib kamu tahu. Tone: ${s.emotion.toLowerCase()}.

### BAB 3
Sekarang kita lihat dampaknya. Bagian ini dibuat lebih naratif supaya retention tetap tinggi dan penonton mau lanjut nonton sampai akhir.

## PAYOFF
Jadi, inti paling penting dari pembahasan ini adalah: jangan cuma lihat permukaannya. Selalu lihat konteks, pola, dan detail yang sering dilewatkan.

## CTA
Kalau kamu suka format seperti ini, jangan lupa like, subscribe, dan komen topik berikutnya yang mau dibahas.`;

    }

    function updateScriptStats() {
      const text = $('script-output').value || '';
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      const chars = text.length;
      const duration = words / 140;
      $('stat-words').textContent = words.toLocaleString();
      $('stat-chars').textContent = chars.toLocaleString();
      $('stat-time').textContent = `${Math.floor(duration)}m ${Math.round((duration % 1) * 60)}s`;
      let score = 'Normal';
      if (words > 0) {
        const cpw = chars / words;
        score = cpw < 5.5 ? 'Easy' : cpw < 7 ? 'Conversational' : 'Technical';
      }
      $('stat-score').textContent = score;
      STATE.scriptData.content = text;
      saveState();
    }

    
    async function generateScript() {
      $('script-result').classList.add('hidden');
      $('script-skeleton').classList.remove('hidden');
      $('btn-generate-script').disabled = true;
      $('btn-generate-script').innerHTML = '<span class="spinner"></span> Menulis...';

      const title = $('script-title-input').value.trim() || STATE.selectedIdea?.title || STATE.topic || 'Custom Manual Script';
      const brief = $('script-brief-input').value.trim() || STATE.selectedIdea?.angle || 'Sudut pandang umum';
      const category = STATE.category ? `${STATE.category.main} - ${STATE.category.sub}` : 'General / Bebas';
      const cfg = DURATION_MAP[STATE.scriptSettings.durationIndex];
      const words = Math.round(cfg.min * 140);
      const s = STATE.scriptSettings;
      const language = STATE.audience === 'id' ? 'id' : 'en';
      const researchQuery = [STATE.topic, title, brief, STATE.category?.sub, STATE.category?.main].filter(Boolean).join(' ');

      let research = null;
      try {
        research = await fetchInternetResearch(researchQuery, language);
        STATE.research = research;
      } catch (err) {
        console.warn('Research fetch failed, using fallback.', err);
      }

      const facts = (research?.facts || []).slice(0, 5);
      const factBlock = facts.length
        ? facts.map((f, i) => `- Fakta ${i + 1}: ${f}`).join('\n')
        : '- Data internet belum tersedia, gunakan sudut pandang umum dan tambahkan riset manual.';

      const sourceBlock = (research?.sources || []).slice(0, 3).map((src, i) => `${i + 1}. ${src.title} — ${src.url}`).join('\n');

      const script = `# ${title}

**Target Audience:** ${STATE.audience === 'id' ? 'Bahasa Indonesia' : 'English'}
**Category:** ${category}
**Brief:** ${brief}
**Duration Target:** ${cfg.label} (${cfg.type})
**Est. Word Count:** ~${words} kata

---

## HOOK
${research?.hook || `Kamu mungkin belum sadar, tapi ${title} punya sisi yang sangat menarik.`}

## DATA INTERNET
${factBlock}

## INTRO
Pembahasan ini dibuat supaya penonton langsung paham dari awal, tanpa perlu konteks yang terlalu rumit.

## BODY
### BAB 1
Mulai dari penjelasan dasar yang gampang dicerna, lalu kaitkan dengan data yang paling relevan di atas.

### BAB 2
Masuk ke bagian inti, tambahkan contoh, data, atau cerita yang relevan. Gunakan gaya ${s.narrationStyle.toLowerCase()} dan tone ${s.emotion.toLowerCase()}.

### BAB 3
Tutup dengan insight paling penting dan transisi yang kuat ke akhir video.

## PAYOFF
Intinya, ${title} bukan cuma topik biasa. Ada detail penting yang sering dilewatkan.

## CTA
Kalau kamu suka format seperti ini, like, subscribe, dan tulis topik berikutnya di komentar.

## SOURCES
${sourceBlock || '- Sumber belum tersedia'}`;

      $('script-output').value = script;
      $('script-result').classList.remove('hidden');
      $('script-skeleton').classList.add('hidden');
      $('btn-generate-script').disabled = false;
      $('btn-generate-script').innerHTML = '<i data-lucide="pen-tool" class="w-5 h-5"></i> Tulis Script';
      updateScriptStats();
      STATE.customScriptTitle = $('script-title-input').value.trim();
      STATE.customScriptBrief = $('script-brief-input').value.trim();
      STATE.scriptData.content = script;
      markChecklist('c2', true);
      saveState();
      lucide.createIcons();
      toast(research ? 'Script dibuat dengan data internet.' : 'Script berhasil dibuat.', 'success');
    }

    function buildVoiceoverText(baseText, ssmlMode='light') {
      const paragraphs = baseText.split(/\n{2,}/).map(s => s.trim()).filter(Boolean);
      const pauses = { light: ' [pause 0.6s] ', medium: ' [pause 1s] ', heavy: ' [pause 1.5s] ' }[ssmlMode] || ' [pause 0.6s] ';
      return paragraphs.map(p => {
        if (p.startsWith('#')) return `<prosody rate="95%" volume="+1dB">${p.replace(/^#\s*/,'')}</prosody>`;
        if (p.startsWith('**')) return `<prosody rate="92%" emphasis="strong">${p.replace(/\*\*/g,'')}</prosody>`;
        return p.replace(/([.!?])\s+/g, `$1${pauses}`);
      }).join('\n\n');
    }

    
    async function generateVoiceover() {
      if (!STATE.scriptData.content && !$('vo-input').value.trim()) return toast('Buat script dulu atau isi teks manual.', 'error');

      const source = $('vo-source').value;
      const platform = $('vo-platform').value;
      const persona = $('vo-persona-input').value.trim() || 'Natural, engaging';
      const emotion = $('vo-emotion').value;
      const speed = $('vo-speed').value;
      const ssml = $('vo-ssml').value;

      const text = source === 'script' ? $('script-output').value : $('vo-input').value;
      const clean = text.trim() || $('vo-input').value.trim();
      if (!clean) return toast('Teks voiceover masih kosong.', 'error');

      $('vo-result').classList.remove('hidden');
      $('btn-download-vo').textContent = 'MP3';

      const params = {
        stability: platform === 'elevenlabs' ? (emotion === 'Serious' ? '68%' : emotion === 'Suspense' ? '42%' : emotion === 'Calm' ? '72%' : '55%') : 'N/A',
        similarity: platform === 'elevenlabs' ? '78%' : 'N/A',
        style: platform === 'elevenlabs' ? (speed === 'Fast' ? '18%' : speed === 'Slow' ? '10%' : '14%') : 'N/A',
        boost: platform === 'elevenlabs' ? 'On' : 'Off'
      };

      const tipsMap = {
        Excited: 'Naikkan intonasi di hook, lalu turunkan sedikit di bagian penjelasan.',
        Calm: 'Bicara santai, jeda lebih rapih, jangan terlalu meledak di hook.',
        Serious: 'Tekankan kata kunci, pakai tempo stabil, dan beri jeda tegas.',
        Suspense: 'Buka dengan rendah, lalu naikkan tensi sedikit demi sedikit.',
        Inspirational: 'Berikan aksen hangat dan optimistis di bagian payoff.'
      };

      const formatted = buildVoiceoverText(clean, ssml);
      $('vo-output').value = formatted;
      $('vo-persona-view').textContent = persona;
      $('vo-tips').textContent = tipsMap[emotion] || 'Gunakan intonasi natural dan konsisten.';
      $('vo-stability').textContent = params.stability;
      $('vo-similarity').textContent = params.similarity;
      $('vo-style').textContent = params.style;
      $('vo-boost').textContent = params.boost;

      STATE.voiceover = { content: formatted, persona, params, platform, emotion, speed, ssml, audioUrl: '', mimeType: 'audio/mpeg' };

      try {
        const res = await fetch('/api/voiceover', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: clean,
            persona,
            emotion,
            speed,
            platform,
            ssml,
            title: STATE.customScriptTitle || STATE.selectedIdea?.title || STATE.topic || 'voiceover'
          })
        });

        if (!res.ok) throw new Error(await res.text());
        const blob = await res.blob();
        const audioUrl = URL.createObjectURL(blob);
        STATE.voiceover.audioUrl = audioUrl;
        STATE.voiceover.mimeType = blob.type || 'audio/mpeg';
        toast('Voiceover MP3 siap diunduh.', 'success');
      } catch (err) {
        console.warn(err);
        STATE.voiceover.audioUrl = '';
        toast('Voiceover teks siap, MP3 butuh API key di Cloudflare.', 'error');
      }

      saveState();
      markChecklist('c3', true);
      if (STATE.voiceover.audioUrl) $('btn-download-vo').textContent = 'MP3';
    }

    function generateThumbnailIdeas() {
      const baseTitle = $('thumb-brief-input').value.trim() || STATE.selectedIdea?.title || $('script-title-input').value.trim() || STATE.topic || 'Ide Konten';
      const style = $('thumb-style-input').value.trim() || STATE.category?.tone || 'cinematic, high contrast, bold text';
      $('thumb-results').classList.add('hidden');
      $('thumb-skeleton').classList.remove('hidden');

      setTimeout(() => {
        const ideas = [
          { overlay: 'WOW!', prompt: `${baseTitle} dramatic composition, shocked face, bold contrast, cinematic lighting, ${style}`, angle: 'Close-up', light: 'Cinematic', lens: '50mm', palette: 'Red, black, white' },
          { overlay: 'RAHASIA', prompt: `${baseTitle} investigative thumbnail, split-screen, highlight important object, high contrast, ${style}`, angle: 'Medium shot', light: 'Neon', lens: '35mm', palette: 'Yellow, black, cyan' },
          { overlay: '3 FAKTA', prompt: `${baseTitle} listicle thumbnail, big number text, dynamic layout, modern YouTube style, ${style}`, angle: 'Wide', light: 'Bright', lens: '24mm', palette: 'Blue, white, red' }
        ];

        const htmlCards = ideas.map((t, i) => {
          const png = createThumbnailDataURL(t, baseTitle, style, i);
          return `
            <div class="glass rounded-3xl overflow-hidden border border-gray-200 dark:border-[#3a3a3a]">
              <div class="p-4 md:p-5 border-b dark:border-[#3a3a3a] border-gray-200 dark:bg-[#1a1a1a] bg-gray-100 flex items-center justify-between gap-3">
                <div class="font-extrabold">Konsep ${i+1}</div>
                <div class="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">${t.overlay}</div>
              </div>
              <div class="p-5 grid md:grid-cols-2 gap-4 text-sm">
                <div class="space-y-3">
                  <div><div class="text-xs text-gray-500 mb-1">Preview PNG</div><img src="${png}" alt="thumbnail preview" class="w-full rounded-2xl border border-gray-200 dark:border-[#3a3a3a]"></div>
                  <div class="flex gap-2 flex-wrap">
                    <button class="thumb-download px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold" data-png="${png}" data-name="thumbnail-${i+1}.png">Download PNG</button>
                    <button class="thumb-copy px-3 py-2 rounded-xl border dark:border-[#3a3a3a] border-gray-300 bg-white dark:bg-[#222] text-xs font-semibold" data-prompt="${t.prompt}">Copy Prompt</button>
                  </div>
                </div>
                <div class="space-y-3">
                  <div><div class="text-xs text-gray-500">AI Prompt</div><div class="rounded-2xl p-3 border dark:border-[#3a3a3a] border-gray-200 dark:bg-[#111] bg-gray-50 font-mono text-xs">${t.prompt}</div></div>
                  <div><div class="text-xs text-gray-500">Camera Angle</div><div class="font-semibold">${t.angle}</div></div>
                  <div><div class="text-xs text-gray-500">Lighting</div><div class="font-semibold">${t.light}</div></div>
                  <div><div class="text-xs text-gray-500">Lens</div><div class="font-semibold">${t.lens}</div></div>
                  <div><div class="text-xs text-gray-500">Color Palette</div><div class="font-semibold">${t.palette}</div></div>
                </div>
              </div>
            </div>
          `;
        }).join('');

        $('thumb-results').innerHTML = htmlCards;
        $('thumb-results').classList.remove('hidden');
        $('thumb-skeleton').classList.add('hidden');

        document.querySelectorAll('.thumb-download').forEach(btn => {
          btn.addEventListener('click', () => {
            const png = btn.dataset.png;
            const name = btn.dataset.name || 'thumbnail.png';
            const a = document.createElement('a');
            a.href = png;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            a.remove();
          });
        });

        document.querySelectorAll('.thumb-copy').forEach(btn => {
          btn.addEventListener('click', () => copyToClipboard(btn.dataset.prompt || ''));
        });

        STATE.thumbnailBrief = $('thumb-brief-input').value.trim();
        STATE.thumbnailStyle = $('thumb-style-input').value.trim();
        STATE.thumbnails = ideas;
        markChecklist('c4', true);
        saveState();
        lucide.createIcons();
      }, 500);
    }

    async function generateSEO() {
      const base = $('seo-brief-input').value.trim() || STATE.selectedIdea?.title || $('script-title-input').value.trim() || STATE.topic || 'Konten Ini';
      const country = $('seo-country-input').value || (STATE.audience === 'id' ? 'Indonesia' : 'Global');
      $('seo-results').classList.add('hidden');

      let research = null;
      try {
        research = await fetchInternetResearch([base, STATE.topic, STATE.category?.sub].filter(Boolean).join(' '), STATE.audience);
        STATE.research = research;
      } catch (err) {
        console.warn('SEO research failed', err);
      }

      setTimeout(() => {
        const kw = base.toLowerCase();
        const facts = (research?.facts || []).slice(0, 3);
        const titles = [
          `${base} | Penjelasan Lengkap dan Mudah Dipahami`,
          `Kenapa ${base}? Ini Jawaban yang Jarang Dibahas`,
          `Fakta Mengejutkan tentang ${base} yang Wajib Kamu Tahu`,
          `${base}: Versi Singkat, Padat, dan Jelas`,
          `Apa yang Sebenarnya Terjadi di Balik ${base}?`
        ];

        const data = {
          primary: research?.primaryKeyword || kw,
          secondary: research?.secondaryKeyword || `${kw} indonesia`,
          intent: STATE.category?.main === 'Bisnis & Finansial' ? 'Informational / Transactional' : 'Informational / Entertaining',
          ctr: research?.ctrScore || '8.5/10',
          country: country,
          upload: '19:00 - 21:00 local time',
          density: '1.0% - 1.5%',
          tags: `${kw}, ${kw} indonesia, ${kw} terbaru, ${base.toLowerCase()}, youtube ${kw.replace(/[^a-z0-9 ]/g,'').trim()}`,
          hashtags: `#${kw.replace(/\s+/g,'')} #youtube #viral`,
          desc: `Di video ini kita bahas ${base} secara singkat, jelas, dan mudah dipahami.\n\nPoint utama:\n${facts.length ? facts.map(f => `- ${f}`).join('\n') : '- Penjelasan inti\n- Fakta penting\n- Kesimpulan'}\n\nKalau suka konten seperti ini, jangan lupa like, subscribe, dan komen topik selanjutnya.\n\n#${kw.replace(/\s+/g,'')}`
        };
        $('seo-primary').textContent = data.primary;
        $('seo-secondary').textContent = data.secondary;
        $('seo-intent').textContent = data.intent;
        $('seo-ctr').textContent = data.ctr;
        $('seo-country').textContent = data.country;
        $('seo-upload').textContent = data.upload;
        $('seo-density').textContent = data.density;
        $('seo-tags').value = data.tags;
        $('seo-hashtags').textContent = data.hashtags;
        $('seo-desc').value = data.desc;
        $('seo-titles').innerHTML = titles.map(t => `<div class="rounded-2xl p-3 border dark:border-[#3a3a3a] border-gray-200 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] cursor-pointer">${t}</div>`).join('');
        $('seo-results').classList.remove('hidden');
        STATE.seoBrief = $('seo-brief-input').value.trim();
        STATE.seoCountry = country;
        STATE.seo = { ...data, titles };
        markChecklist('c5', true);
        markChecklist('c6', true);
        saveState();
        toast(research ? 'SEO dibuat dengan data internet.' : 'SEO berhasil dibuat.', 'success');
      }, 500);
    }

    function initChecklist() {
      const container = $('checklist-container');
      container.innerHTML = '';
      CHECKLIST_ITEMS.forEach(item => {
        const checked = !!STATE.checklist[item.id];
        const row = document.createElement('label');
        row.className = 'flex items-start gap-3 p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-[#2a2a2a] cursor-pointer';
        row.innerHTML = `
          <input type="checkbox" class="mt-1 w-4 h-4 accent-red-600" ${checked ? 'checked' : ''}>
          <span class="text-sm ${checked ? 'line-through opacity-50' : ''}">${item.label}</span>
        `;
        const input = row.querySelector('input');
        const span = row.querySelector('span');
        input.addEventListener('change', (e) => {
          STATE.checklist[item.id] = e.target.checked;
          span.classList.toggle('line-through', e.target.checked);
          span.classList.toggle('opacity-50', e.target.checked);
          updateChecklistProgress();
          saveState();
        });
        container.appendChild(row);
      });
      updateChecklistProgress();
    }

    function markChecklist(id, value) {
      STATE.checklist[id] = value;
      const idx = CHECKLIST_ITEMS.findIndex(x => x.id === id);
      const row = $('checklist-container').children[idx];
      if (row) {
        const input = row.querySelector('input');
        const span = row.querySelector('span');
        input.checked = value;
        span.classList.toggle('line-through', value);
        span.classList.toggle('opacity-50', value);
      }
      updateChecklistProgress();
    }

    function updateChecklistProgress() {
      const total = CHECKLIST_ITEMS.length;
      const checked = Object.values(STATE.checklist).filter(Boolean).length;
      const pct = total ? Math.round((checked / total) * 100) : 0;
      $('check-progress').textContent = pct + '%';
      const circ = 2 * Math.PI * 46;
      $('check-circle').style.strokeDashoffset = circ - (pct / 100) * circ;
    }

    function updatePrereqState() {
      // Semua section dibuat mandiri: form selalu aktif, warning hanya sebagai tips.
      ['script', 'vo', 'thumb', 'seo'].forEach(prefix => {
        document.getElementById(`${prefix}-warning`)?.classList.add('hidden');
        const form = document.getElementById(`${prefix}-form`);
        form?.classList.remove('opacity-50', 'pointer-events-none');
      });

      $('script-audience').textContent = STATE.audience === 'id' ? 'Indonesia' : 'International';
      $('script-idea').textContent = STATE.selectedIdea?.title || $('script-title-input')?.value || $('script-brief-input')?.value || 'Custom Manual Script';
    }

    function exportState(type='json') {
      const data = JSON.stringify({ ...STATE, lastUpdated: new Date().toISOString() }, null, 2);
      const txt = [
        `TITLE: ${STATE.selectedIdea?.title || 'Untitled'}`,
        `CATEGORY: ${STATE.category?.main || '-'} > ${STATE.category?.sub || '-'}`,
        '',
        'SCRIPT:',
        STATE.scriptData.content || '',
        '',
        'VOICEOVER:',
        STATE.voiceover.content || '',
        '',
        'SEO:',
        STATE.seo ? JSON.stringify(STATE.seo, null, 2) : ''
      ].join('\n');
      const md = `# ${STATE.selectedIdea?.title || 'Untitled'}\n\n## Category\n${STATE.category?.main || '-'} > ${STATE.category?.sub || '-'}\n\n## Script\n\n${STATE.scriptData.content || '-'}\n\n## Voiceover\n\n${STATE.voiceover.content || '-'}\n\n## SEO\n\n\`\`\`json\n${STATE.seo ? JSON.stringify(STATE.seo, null, 2) : '{}'}\n\`\`\`\n`;
      const blob = new Blob([type === 'json' ? data : type === 'md' ? md : txt], { type: type === 'json' ? 'application/json' : 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `YT_Project.${type === 'json' ? 'json' : type === 'md' ? 'md' : 'txt'}`;
      a.click();
      URL.revokeObjectURL(url);
    }

    function importState(file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result);
          Object.assign(STATE, parsed);
          applyTheme();
          renderAllFromState();
          saveState();
          toast('Project berhasil di-import.', 'success');
        } catch {
          toast('File JSON tidak valid.', 'error');
        }
      };
      reader.readAsText(file);
    }

    function renderAllFromState() {
      updateAudienceUI();
      renderCategories($('category-search').value || '');
      if (STATE.topic) $('topic-input').value = STATE.topic;
      if (STATE.selectedIdea) {
        renderIdeas([STATE.selectedIdea]);
        $('ideas-results').classList.remove('hidden');
      }
      $('script-title-input').value = STATE.customScriptTitle || '';
      $('script-brief-input').value = STATE.customScriptBrief || '';
      $('thumb-brief-input').value = STATE.thumbnailBrief || '';
      $('thumb-style-input').value = STATE.thumbnailStyle || '';
      $('seo-brief-input').value = STATE.seoBrief || '';
      $('seo-country-input').value = STATE.seoCountry || (STATE.audience === 'id' ? 'Indonesia' : 'Global');

      $('duration-slider').value = STATE.scriptSettings.durationIndex;
      updateDurationDisplay(STATE.scriptSettings.durationIndex);
      $('set-age').value = STATE.scriptSettings.age;
      $('set-exp').value = STATE.scriptSettings.experience;
      $('set-style').value = STATE.scriptSettings.narrationStyle;
      $('set-hook').value = STATE.scriptSettings.hookStyle;
      $('set-cta').value = STATE.scriptSettings.ctaStyle;
      $('set-detail').value = STATE.scriptSettings.detailLevel;
      $('set-speed').value = STATE.scriptSettings.speakingSpeed;
      $('set-emotion').value = STATE.scriptSettings.emotion;

      $('script-output').value = STATE.scriptData.content || '';
      if (STATE.scriptData.content) {
        $('script-result').classList.remove('hidden');
        updateScriptStats();
      }

      if (STATE.voiceover?.content) {
        $('vo-output').value = STATE.voiceover.content;
        $('vo-persona-view').textContent = STATE.voiceover.persona || '-';
        $('vo-tips').textContent = STATE.voiceover.audioUrl ? 'Voiceover MP3 siap diunduh.' : 'Sesi voiceover tersimpan.';
        $('vo-stability').textContent = STATE.voiceover.params?.stability || '—';
        $('vo-similarity').textContent = STATE.voiceover.params?.similarity || '—';
        $('vo-style').textContent = STATE.voiceover.params?.style || '—';
        $('vo-boost').textContent = STATE.voiceover.params?.boost || '—';
        $('btn-download-vo').textContent = STATE.voiceover.audioUrl ? 'MP3' : 'TXT';
        $('vo-result').classList.remove('hidden');
      }

      if (STATE.seo) {
        $('seo-primary').textContent = STATE.seo.primary || STATE.seo.primary_keyword || '-';
      }

      initChecklist();
      updateBadges();
      updatePrereqState();
    }

    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => toast('Disalin ke clipboard.', 'success')).catch(() => toast('Gagal menyalin.', 'error'));
    }
    async function fetchInternetResearch(query, lang = 'id') {
      const safeQuery = (query || '').trim();
      if (!safeQuery) throw new Error('Query kosong');

      const body = JSON.stringify({ query: safeQuery, lang });
      const resp = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
      });
      if (!resp.ok) throw new Error(await resp.text());
      return await resp.json();
    }

    function downloadBlob(blob, filename) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 99) {
      const words = String(text || '').split(/\s+/);
      let line = '';
      let lines = 0;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line.trim(), x, y);
          line = words[n] + ' ';
          y += lineHeight;
          lines++;
          if (lines >= maxLines - 1) break;
        } else {
          line = testLine;
        }
      }
      if (lines < maxLines) ctx.fillText(line.trim(), x, y);
    }

    function roundRect(ctx, x, y, w, h, r) {
      const radius = Math.min(r, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arcTo(x + w, y, x + w, y + h, radius);
      ctx.arcTo(x + w, y + h, x, y + h, radius);
      ctx.arcTo(x, y + h, x, y, radius);
      ctx.arcTo(x, y, x + w, y, radius);
      ctx.closePath();
      return ctx;
    }

    function createThumbnailDataURL(concept, title, style, idx) {
      const canvas = document.createElement('canvas');
      canvas.width = 1280;
      canvas.height = 720;
      const ctx = canvas.getContext('2d');

      const colors = [
        ['#111111', '#ef4444'],
        ['#1e3a8a', '#06b6d4'],
        ['#4c1d95', '#f59e0b']
      ];
      const [bg1, bg2] = colors[idx % colors.length];
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, bg1);
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = bg2 + 'cc';
      ctx.beginPath();
      ctx.arc(1040, 160, 180, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff22';
      ctx.beginPath();
      ctx.arc(220, 560, 220, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 78px Impact, Arial Black, sans-serif';
      ctx.textBaseline = 'top';
      ctx.fillText(concept.overlay || 'WOW!', 60, 60);

      ctx.font = '700 38px Inter, Arial, sans-serif';
      ctx.fillStyle = '#ffffffcc';
      wrapText(ctx, title, 60, 175, 790, 46, 4);

      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.strokeStyle = '#ffffff33';
      ctx.lineWidth = 2;
      roundRect(ctx, 900, 430, 320, 220, 28);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = '700 28px Inter, Arial, sans-serif';
      ctx.fillText('STYLE', 930, 455);
      ctx.font = '600 24px Inter, Arial, sans-serif';
      wrapText(ctx, style, 930, 500, 250, 30, 4);

      ctx.font = '600 22px Inter, Arial, sans-serif';
      ctx.fillStyle = '#ffffffdd';
      ctx.fillText(concept.angle || '', 60, 560);
      ctx.fillStyle = '#ffffff99';
      ctx.font = '500 18px Inter, Arial, sans-serif';
      ctx.fillText((concept.light || '') + ' • ' + (concept.lens || ''), 60, 605);

      ctx.fillStyle = '#ffffffee';
      ctx.font = '800 24px Inter, Arial, sans-serif';
      ctx.fillText('ToolHub ID', 60, 660);

      return canvas.toDataURL('image/png');
    }


    function setupListeners() {
      document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active'));
          btn.classList.add('active');
          document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
          $('section-' + btn.dataset.target).classList.add('active');
          $('main-scroll').scrollTop = 0;
          if (location.hash !== '#' + btn.dataset.target) history.replaceState(null, '', '#' + btn.dataset.target);
        });
      });

      $('mobile-menu-btn').addEventListener('click', () => {
        document.querySelector('aside').classList.toggle('hidden');
      });

      $('btn-theme').addEventListener('click', () => setTheme(STATE.theme === 'dark' ? 'light' : 'dark'));
      $('toggle-id').addEventListener('click', () => { STATE.audience = 'id'; updateAudienceUI(); saveState(); });
      $('toggle-intl').addEventListener('click', () => { STATE.audience = 'intl'; updateAudienceUI(); saveState(); });

      $('category-search').addEventListener('input', e => renderCategories(e.target.value));
      $('btn-generate-ideas').addEventListener('click', generateIdeas);
      $('btn-generate-script').addEventListener('click', generateScript);
      $('duration-slider').addEventListener('input', e => { STATE.scriptSettings.durationIndex = parseInt(e.target.value); updateDurationDisplay(STATE.scriptSettings.durationIndex); saveState(); });
      $('script-output').addEventListener('input', updateScriptStats);

      ['script-title-input','script-brief-input','thumb-brief-input','thumb-style-input','seo-brief-input','seo-country-input'].forEach(id => {
        $(id).addEventListener('input', () => {
          STATE.customScriptTitle = $('script-title-input').value.trim();
          STATE.customScriptBrief = $('script-brief-input').value.trim();
          STATE.thumbnailBrief = $('thumb-brief-input').value.trim();
          STATE.thumbnailStyle = $('thumb-style-input').value.trim();
          STATE.seoBrief = $('seo-brief-input').value.trim();
          STATE.seoCountry = $('seo-country-input').value;
          saveState();
        });
      });

      ['set-age','set-exp','set-style','set-hook','set-cta','set-detail','set-speed','set-emotion'].forEach(id => {
        $(id).addEventListener('change', e => {
          const map = {
            'set-age':'age','set-exp':'experience','set-style':'narrationStyle','set-hook':'hookStyle',
            'set-cta':'ctaStyle','set-detail':'detailLevel','set-speed':'speakingSpeed','set-emotion':'emotion'
          };
          STATE.scriptSettings[map[id]] = e.target.value;
          saveState();
        });
      });

      $('btn-vo-from-script').addEventListener('click', () => {
        $('vo-input').value = $('script-output').value || '';
        $('vo-source').value = 'script';
        toast('Script dipindahkan ke voiceover.', 'success');
      });
      $('btn-generate-vo').addEventListener('click', generateVoiceover);

      $('btn-generate-thumb').addEventListener('click', generateThumbnailIdeas);
      $('btn-generate-seo').addEventListener('click', generateSEO);

      document.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', () => {
          const target = $(btn.dataset.targetId);
          const text = target ? (target.value || target.innerText || '') : '';
          copyToClipboard(text);
        });
      });

      $('btn-download-script').addEventListener('click', () => {
        const blob = new Blob([$('script-output').value || ''], { type: 'text/plain' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'script.txt'; a.click();
      });
      $('btn-download-vo').addEventListener('click', async () => {
        if (STATE.voiceover?.audioUrl) {
          const res = await fetch(STATE.voiceover.audioUrl);
          const blob = await res.blob();
          downloadBlob(blob, 'voiceover.mp3');
          return;
        }
        const blob = new Blob([$('vo-output').value || ''], { type: 'text/plain' });
        downloadBlob(blob, 'voiceover.txt');
      });

      $('btn-save-modal').addEventListener('click', () => $('save-modal').classList.remove('hidden'));
      $('btn-close-modal').addEventListener('click', () => $('save-modal').classList.add('hidden'));
      $('btn-export-json').addEventListener('click', () => exportState('json'));
      $('btn-export-txt').addEventListener('click', () => exportState('txt'));
      $('btn-export-md').addEventListener('click', () => exportState('md'));
      $('btn-trigger-import').addEventListener('click', () => $('file-import').click());
      $('file-import').addEventListener('change', e => e.target.files[0] && importState(e.target.files[0]));

      $('btn-reset').addEventListener('click', () => {
        if (!confirm('Reset semua data sesi?')) return;
        localStorage.removeItem('ytSuiteStateV3');
        location.reload();
      });

      $('btn-restore').addEventListener('click', () => {
        $('restore-bar').classList.add('hidden');
        renderAllFromState();
        toast('Sesi dipulihkan.', 'success');
      });
      $('btn-discard').addEventListener('click', () => {
        localStorage.removeItem('ytSuiteStateV3');
        $('restore-bar').classList.add('hidden');
      });

      $('topic-input').addEventListener('keypress', e => { if (e.key === 'Enter') generateIdeas(); });

      document.addEventListener('keydown', e => {
        if (e.ctrlKey && e.key.toLowerCase() === 's') { e.preventDefault(); $('save-modal').classList.remove('hidden'); }
        if (e.ctrlKey && e.key === 'Enter') {
          e.preventDefault();
          const active = document.querySelector('.section-content.active');
          const btn = active?.querySelector('button[id^="btn-generate"]');
          if (btn) btn.click();
        }
      });
    }

    document.addEventListener('DOMContentLoaded', () => {
      const savedTheme = localStorage.getItem('ytSuiteTheme');
      if (savedTheme) STATE.theme = savedTheme;
      applyTheme();

      const restored = loadState();
      if (restored) $('restore-bar').classList.remove('hidden');

      initChecklist();
      renderCategories();
      updateAudienceUI();
      updateDurationDisplay(STATE.scriptSettings.durationIndex);
      updatePrereqState();
      setupListeners();
      renderAllFromState();

      // Seed script area if state has selected idea and script is empty? No auto-generate.
      if (STATE.selectedIdea) updateBadges();
      lucide.createIcons();
    });
  