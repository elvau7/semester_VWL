/* ============================================================
 *  KONFIGURATION — hier anpassen
 * ============================================================
 *
 *  APP_PASSWORD: Passwort für den Login
 *  STORAGE_KEY:  Eindeutiger Schlüssel für diese App-Instanz.
 *                Wenn du mehrere Kopien dieser App verwendest,
 *                jeden eine andere Zahl am Ende geben:
 *                z.B. "lernapp_auth_v2", "lernapp_auth_v3"
 *
 * ============================================================ */
const APP_PASSWORD = "Graz_2026"; /* <-- HIER ÄNDERN */
const STORAGE_KEY  = "lernapp_auth_v44"; /* <-- HIER EBENFALLS ÄNDERN */

/* ============================================================
 *  SCREEN-MANAGEMENT
 * ============================================================ */
const SCREENS = ['screen-login', 'screen-subject', 'screen-main', 'screen-karten', 'screen-luecken', 'screen-theory-list', 'screen-theory', 'screen-mc'];

function showScreen(id) {
  SCREENS.forEach(s => {
    const el = document.getElementById(s);
    if (el) el.classList.toggle('hidden', s !== id);
  });
  if (typeof renderMathInElement !== 'undefined') {
    const el = document.getElementById(id);
    if (el) renderMathInElement(el, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false}
      ],
      throwOnError: false
    });
  }
}

/* ============================================================
 *  LOGIN
 * ============================================================ */
function isAuthenticated() {
  return sessionStorage.getItem(STORAGE_KEY) === '1' || localStorage.getItem(STORAGE_KEY) === '1';
}

function tryLogin() {
  const val = document.getElementById('login-input').value;
  const inp = document.getElementById('login-input');
  const msg = document.getElementById('login-errmsg');
  if (val === APP_PASSWORD) {
    if (document.getElementById('login-remember').checked) {
      localStorage.setItem(STORAGE_KEY, '1');
    } else {
      sessionStorage.setItem(STORAGE_KEY, '1');
    }
    msg.textContent = '';
    buildSubjectScreen();
    showScreen('screen-subject');
  } else {
    inp.classList.remove('login-error');
    void inp.offsetWidth;
    inp.classList.add('login-error');
    msg.textContent = 'Falsches Passwort \u2013 bitte nochmal versuchen.';
    inp.value = '';
    inp.focus();
  }
}

/* ============================================================
 *  FÄCHERAUSWAHL
 * ============================================================ */
let activeSubject = null;

function buildSubjectScreen() {
  const grid = document.getElementById('subject-grid');
  grid.innerHTML = '';
  SUBJECTS.forEach(subj => {
    const btn = document.createElement('button');
    btn.className = 'main-card';
    btn.innerHTML =
      '<span class="main-card-icon">' + subj.icon + '</span>' +
      '<span class="main-card-title">' + subj.name + '</span>' +
      '<span class="main-card-sub">' + (subj.description || '') + '</span>';
    btn.addEventListener('click', () => {
      activeSubject = subj;
      document.getElementById('main-subject-title').textContent = subj.icon + ' ' + subj.name;
      showScreen('screen-main');
    });
    grid.appendChild(btn);
  });
}

document.getElementById('login-btn').addEventListener('click', tryLogin);
document.getElementById('login-input').addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });
document.getElementById('login-eye').addEventListener('click', () => {
  const inp = document.getElementById('login-input');
  inp.type = inp.type === 'password' ? 'text' : 'password';
});

/* ============================================================
 *  KARTEIKARTEN (kk_)
 * ============================================================ */
let kk_cards = [], kk_idx = 0, kk_flipped = false, kk_mode = 'normal';
let kk_queue = [], kk_known = 0, kk_repeat = 0;

function kk_shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function kk_setContent(el, plain, html) {
  const h = (typeof html === 'string') ? html.trim() : '';
  if (h) { el.innerHTML = h; } else { el.textContent = plain || ''; }
}

function kk_setFlipped(v) {
  kk_flipped = v;
  document.getElementById('kk-card').classList.toggle('is-flipped', v);
}

function kk_renderCard(c) {
  kk_setContent(document.getElementById('kk-question'), c.question, c.question_html);
  kk_setContent(document.getElementById('kk-answer'), c.answer, c.answer_html);
  const lbl = c.category ? 'Kategorie: ' + c.category : '';
  document.getElementById('kk-categoryFront').textContent = lbl;
  document.getElementById('kk-categoryBack').textContent = lbl;
  const hasTheory = !!(activeSubject && (activeSubject.theory || []).find(t => t.id === c.id));
  document.getElementById('kk-theoryBtn').hidden = !hasTheory;
}

/* ============================================================
 *  THEORIE — Navigation, aufgerufen von KK, LT, MC und Theorie-Liste
 * ============================================================ */
const theoryState = { list: [], index: 0, returnScreen: '' };

function showTheory(id, returnScreen) {
  const allTheory = (activeSubject && activeSubject.theory) || [];
  if (!allTheory.length) return;
  const idx = allTheory.findIndex(t => t.id === id);
  theoryState.list = allTheory;
  theoryState.index = idx >= 0 ? idx : 0;
  theoryState.returnScreen = returnScreen;
  _renderTheory();
}

function _renderTheory() {
  const t = theoryState.list[theoryState.index];
  if (!t) return;
  document.getElementById('theory-title').textContent = t.title;
  document.getElementById('theory-content').innerHTML = t.html;
  document.getElementById('theory-back').onclick = () => showScreen(theoryState.returnScreen);

  const prevBtn = document.getElementById('theory-prev');
  const nextBtn = document.getElementById('theory-next');
  const posEl   = document.getElementById('theory-nav-pos');
  prevBtn.disabled = theoryState.index === 0;
  nextBtn.disabled = theoryState.index === theoryState.list.length - 1;
  posEl.textContent = (theoryState.index + 1) + ' / ' + theoryState.list.length;

  // Scroll body back to top on each entry
  const body = document.getElementById('theory-body');
  if (body) body.scrollTop = 0;

  showScreen('screen-theory');
}

function theory_prev() {
  if (theoryState.index > 0) { theoryState.index--; _renderTheory(); }
}
function theory_next() {
  if (theoryState.index < theoryState.list.length - 1) { theoryState.index++; _renderTheory(); }
}

function kk_showTheory() { showTheory(kk_cards[kk_idx].id, 'screen-karten'); }
function lt_showTheory() { showTheory(ltS.visible[ltS.index].id, 'screen-luecken'); }

function kk_updateUI() {
  const s = kk_mode === 'study';
  document.getElementById('kk-prevBtn').hidden = s;
  document.getElementById('kk-nextBtn').hidden = s;
  document.getElementById('kk-againBtn').hidden = !s;
  document.getElementById('kk-knownBtn').hidden = !s;
  document.getElementById('kk-studyStats').hidden = !s;
  document.getElementById('kk-restartStudyBtn').hidden = !s;
  document.getElementById('kk-normalModeBtn').classList.toggle('active', !s);
  document.getElementById('kk-studyModeBtn').classList.toggle('active', s);
}

function kk_render() {
  kk_updateUI();
  if (!kk_cards.length) {
    document.getElementById('kk-question').textContent = 'Keine Karten';
    document.getElementById('kk-status').textContent = '0 / 0 Karten';
    return;
  }
  if (kk_mode === 'study') {
    if (kk_queue.length === 0) {
      document.getElementById('kk-question').textContent = 'Lernrunde abgeschlossen';
      document.getElementById('kk-answer').textContent = 'Sehr gut. Du kannst neu starten oder Normal-Modus w\u00e4hlen.';
      document.getElementById('kk-status').textContent = 'Lernmodus: fertig';
      document.getElementById('kk-studyStats').textContent = 'Gewusst: ' + kk_known + ' | Wiederholen: ' + kk_repeat;
      ['kk-prevBtn','kk-nextBtn','kk-flipBtn','kk-shuffleBtn','kk-againBtn','kk-knownBtn'].forEach(id => {
        document.getElementById(id).disabled = true;
      });
      document.getElementById('kk-restartStudyBtn').disabled = false;
      return;
    }
    kk_idx = kk_queue[0];
    kk_renderCard(kk_cards[kk_idx]);
    document.getElementById('kk-status').textContent = 'Lernmodus: ' + kk_queue.length + ' Karten offen';
    document.getElementById('kk-studyStats').textContent = 'Gewusst: ' + kk_known + ' | Wiederholen: ' + kk_repeat;
    ['kk-prevBtn','kk-nextBtn','kk-shuffleBtn'].forEach(id => { document.getElementById(id).disabled = true; });
    ['kk-flipBtn','kk-againBtn','kk-knownBtn','kk-restartStudyBtn'].forEach(id => { document.getElementById(id).disabled = false; });
    return;
  }
  if (kk_idx < 0) kk_idx = 0;
  if (kk_idx >= kk_cards.length) kk_idx = kk_cards.length - 1;
  kk_renderCard(kk_cards[kk_idx]);
  document.getElementById('kk-status').textContent = (kk_idx + 1) + ' / ' + kk_cards.length + ' Karten';
  document.getElementById('kk-prevBtn').disabled = kk_idx === 0;
  document.getElementById('kk-nextBtn').disabled = kk_idx === kk_cards.length - 1;
  document.getElementById('kk-flipBtn').disabled = false;
  document.getElementById('kk-shuffleBtn').disabled = false;
}

function kk_init() {
  kk_cards = (activeSubject ? activeSubject.kk : []).slice();
  kk_idx = 0; kk_mode = 'normal'; kk_queue = []; kk_known = 0; kk_repeat = 0;
  kk_setFlipped(false); kk_render();
}

function kk_toggleFlip() { kk_flipped = !kk_flipped; document.getElementById('kk-card').classList.toggle('is-flipped', kk_flipped); }
function kk_nextCard() { if (kk_mode !== 'normal' || !kk_cards.length || kk_idx >= kk_cards.length - 1) return; kk_idx++; kk_setFlipped(false); kk_render(); }
function kk_prevCard() { if (kk_mode !== 'normal' || !kk_cards.length || kk_idx <= 0) return; kk_idx--; kk_setFlipped(false); kk_render(); }
function kk_shuffleCards() { if (kk_mode !== 'normal' || !kk_cards.length) return; kk_shuffle(kk_cards); kk_idx = 0; kk_setFlipped(false); kk_render(); }
function kk_switchMode(m) {
  kk_mode = m;
  if (m === 'study') {
    kk_queue = Array.from({length: kk_cards.length}, (_, i) => i);
    kk_shuffle(kk_queue); kk_known = 0; kk_repeat = 0; kk_idx = kk_queue[0] ?? 0;
  }
  kk_setFlipped(false); kk_render();
}
function kk_restartStudy() {
  kk_mode = 'study';
  kk_queue = Array.from({length: kk_cards.length}, (_, i) => i);
  kk_shuffle(kk_queue); kk_known = 0; kk_repeat = 0; kk_idx = kk_queue[0] ?? 0;
  kk_setFlipped(false); kk_render();
}
function kk_markAsKnown() { if (kk_mode !== 'study' || !kk_queue.length) return; kk_queue.shift(); kk_known++; kk_setFlipped(false); kk_render(); }
function kk_markAsAgain() { if (kk_mode !== 'study' || !kk_queue.length) return; const ci = kk_queue.shift(); kk_queue.push(ci); kk_repeat++; kk_setFlipped(false); kk_render(); }

/* Tastaturkürzel für Karteikarten und Multiple Choice */
document.addEventListener('keydown', (e) => {
  const active = SCREENS.find(s => { const el = document.getElementById(s); return el && !el.classList.contains('hidden'); });
  if (active === 'screen-karten') {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); kk_toggleFlip(); return; }
    if (kk_mode === 'study') {
      if (e.key === '1') kk_markAsAgain();
      else if (e.key === '2') kk_markAsKnown();
    } else {
      if (e.key === 'ArrowRight') kk_nextCard();
      else if (e.key === 'ArrowLeft') kk_prevCard();
    }
  } else if (active === 'screen-mc') {
    const nextBtn = document.getElementById('mc-btn-next');
    const answered = nextBtn && !nextBtn.classList.contains('hidden');
    if ((e.key === 'ArrowRight' || e.key === 'Enter') && answered) { e.preventDefault(); mc_next(); return; }
    if (!answered) {
      const idx = parseInt(e.key, 10);
      if (idx >= 1 && idx <= 4) {
        const btns = document.getElementById('mc-options').querySelectorAll('.mc-option');
        if (btns[idx - 1]) { e.preventDefault(); btns[idx - 1].click(); }
      }
    }
  }
});

/* ============================================================
 *  LÜCKENTEXT (lt_)
 * ============================================================ */
const lt_stopWords = new Set(['der','die','das','ein','eine','einer','eines','einem','einen','und','oder','aber','mit','von','im','in','am','an','auf','als','auch','bei','durch','für','ist','sind','war','werden','wird','wurden','zu','zum','zur','des','dem','den','dass','wie','was','welche','welcher','welches','wo','wozu','nur','zwischen','nach','vor','unter','über','ohne','aus','gegen','pro','per','z','b','bsp','kann','man']);
const lt_TOKEN_REGEX = /[A-Za-zÄÖÜäöüßα-ωΑ-Ω][A-Za-zÄÖÜäöüßα-ωΑ-Ω0-9+\/-]{2,}/gu;
const ltS = { all: [], visible: [], index: 0 };

function lt_esc(v) { return String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function lt_norm(v) { return String(v).toLowerCase().replace(/ß/g,'ss').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z0-9äöüÄÖÜα-ωΑ-Ω+\/-]+/g,''); }
function lt_extractKW(text) { const s = new Set(); const m = String(text).match(lt_TOKEN_REGEX) || []; for (const w of m) { const k = lt_norm(w); if (k.length >= 3 && !lt_stopWords.has(k)) s.add(k); } return s; }
function lt_splitLines(ans) { return String(ans).split(/\r?\n/).map(l => l.trim()).filter(Boolean).map(l => l.replace(/^[-*\u2022]\s*/, '').replace(/^\d+[.)]\s*/, '')); }
function lt_candidates(line, qkw) {
  lt_TOKEN_REGEX.lastIndex = 0; const out = []; let m;
  while ((m = lt_TOKEN_REGEX.exec(line)) !== null) {
    const w = m[0]; const k = lt_norm(w);
    if (k.length < 3 || lt_stopWords.has(k)) continue;
    const sc = w.length + (/\d/.test(w) ? 2.5 : 0) + (/[A-ZÄÖÜΑ-Ω]/u.test(w[0]) ? 0.8 : 0) + (qkw.has(k) ? 3.2 : 0);
    out.push({word:w, start:m.index, end:m.index+w.length, score:sc});
  }
  return out;
}
function lt_pickBlanks(cands, max) {
  const chosen = []; const sorted = cands.slice().sort((a,b) => b.score - a.score || a.start - b.start);
  for (const it of sorted) { if (chosen.length >= max) break; if (!chosen.some(x => !(it.end <= x.start || it.start >= x.end))) chosen.push(it); }
  return chosen.sort((a,b) => a.start - b.start);
}
function lt_gapWidget(word) {
  const hint = lt_esc((word[0]||'').toUpperCase() + '\u2026');
  const sz = Math.min(24, Math.max(8, word.length + 1));
  return '<span class="lt-gap-wrap"><input class="lt-gap" type="text" size="' + sz + '" data-answer="' + lt_esc(word) + '" autocomplete="off"/><span class="lt-hint">' + hint + '</span></span>';
}
function lt_lineHtml(line, qkw) {
  if (/\{\{.+?\}\}/.test(line)) {
    let html = '', blanks = 0;
    const parts = line.split(/(\{\{.+?\}\})/);
    for (const p of parts) { const m = p.match(/^\{\{(.+?)\}\}$/); if (m) { html += lt_gapWidget(m[1]); blanks++; } else { html += lt_esc(p); } }
    return {html, blanks};
  }
  const cands = lt_candidates(line, qkw);
  if (!cands.length) return {html: lt_esc(line), blanks: 0};
  const max = line.length > 95 ? 2 : 1;
  const blanks = lt_pickBlanks(cands, max);
  if (!blanks.length) return {html: lt_esc(line), blanks: 0};
  let c = 0, html = '';
  for (const g of blanks) { html += lt_esc(line.slice(c, g.start)); html += lt_gapWidget(g.word); c = g.end; }
  html += lt_esc(line.slice(c));
  return {html, blanks: blanks.length};
}
function lt_inputs() { return Array.from(document.getElementById('lt-clozeText').querySelectorAll('input.lt-gap')); }
function lt_clearFB() { const fb = document.getElementById('lt-feedback'); fb.textContent = ''; fb.className = 'lt-feedback'; }

function lt_render() {
  const {visible, index} = ltS;
  if (!visible.length) {
    document.getElementById('lt-questionText').textContent = 'Keine Karten.';
    document.getElementById('lt-clozeText').innerHTML = '';
    document.getElementById('lt-indexLabel').textContent = 'Karte 0 von 0';
    document.getElementById('lt-blankLabel').textContent = 'L\u00fccken: 0';
    document.getElementById('lt-prevBtn').disabled = true;
    document.getElementById('lt-nextBtn').disabled = true;
    document.getElementById('lt-theoryBtn').hidden = true;
    lt_clearFB(); return;
  }
  const card = visible[index];
  const qkw = lt_extractKW(card.question);
  const lines = lt_splitLines(card.answer);
  let total = 0; const rendered = [];
  for (const line of lines) { const r = lt_lineHtml(line, qkw); total += r.blanks; rendered.push('<p class="line">' + r.html + '</p>'); }
  if (total === 0 && lines.length) { rendered.length = 0; rendered.push('<p class="line">' + lt_esc(lines.join(' ')) + '</p>'); }
  document.getElementById('lt-questionText').textContent = card.question;
  document.getElementById('lt-clozeText').innerHTML = rendered.join('');
  document.getElementById('lt-categoryPill').textContent = card.category || 'Allgemein';
  document.getElementById('lt-idLabel').textContent = 'ID: ' + card.id;
  document.getElementById('lt-indexLabel').textContent = 'Karte ' + (index + 1) + ' von ' + visible.length;
  document.getElementById('lt-blankLabel').textContent = 'L\u00fccken: ' + total;
  document.getElementById('lt-prevBtn').disabled = index <= 0;
  document.getElementById('lt-nextBtn').disabled = index >= visible.length - 1;
  lt_clearFB();
  const fi = lt_inputs()[0]; if (fi) fi.focus();
  const hasTheory = !!(activeSubject && (activeSubject.theory || []).find(t => t.id === card.id));
  document.getElementById('lt-theoryBtn').hidden = !hasTheory;
}

function lt_applyFilter() {
  const sel = document.getElementById('lt-categorySelect').value;
  ltS.visible = sel === '__all__' ? ltS.all.slice() : ltS.all.filter(c => c.category === sel);
  ltS.index = 0; lt_render();
}

function lt_fillCats() {
  const cats = Array.from(new Set(ltS.all.map(x => x.category))).filter(Boolean).sort((a,b) => a.localeCompare(b,'de'));
  let opts = '<option value="__all__">Alle Kategorien</option>';
  for (const c of cats) opts += '<option value="' + lt_esc(c) + '">' + lt_esc(c) + '</option>';
  document.getElementById('lt-categorySelect').innerHTML = opts;
}

function lt_check(show) {
  const inp = lt_inputs();
  const fb = document.getElementById('lt-feedback');
  if (!inp.length) { fb.textContent = 'Keine L\u00fccken vorhanden.'; fb.className = 'lt-feedback warn'; return; }
  if (show) {
    for (const i of inp) { i.value = i.dataset.answer || ''; i.classList.remove('wrong'); i.classList.add('correct'); }
    fb.textContent = 'L\u00f6sungen eingeblendet.'; fb.className = 'lt-feedback ok'; return;
  }
  let ok = 0;
  for (const i of inp) {
    const e = i.dataset.answer || ''; const t = i.value || '';
    const good = lt_norm(t) === lt_norm(e);
    i.classList.toggle('correct', good); i.classList.toggle('wrong', !good);
    if (good) ok++;
  }
  fb.textContent = ok + ' von ' + inp.length + ' L\u00fccken korrekt.';
  fb.className = 'lt-feedback ' + (ok === inp.length ? 'ok' : 'warn');
}

function lt_reset() { for (const i of lt_inputs()) { i.value = ''; i.classList.remove('correct','wrong'); } lt_clearFB(); }
function lt_shuffle() {
  for (let i = ltS.visible.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ltS.visible[i], ltS.visible[j]] = [ltS.visible[j], ltS.visible[i]];
  }
  ltS.index = 0; lt_render();
}

function lt_init() {
  ltS.all = (activeSubject ? activeSubject.lt : []).slice();
  lt_fillCats();
  lt_applyFilter();
  if (document.getElementById('lt-checkBtn')._ltBound) return; // Eventlistener nur einmal binden
  document.getElementById('lt-checkBtn')._ltBound = true;
  document.getElementById('lt-categorySelect').addEventListener('change', lt_applyFilter);
  document.getElementById('lt-checkBtn').addEventListener('click', () => lt_check(false));
  document.getElementById('lt-showBtn').addEventListener('click', () => lt_check(true));
  document.getElementById('lt-resetBtn').addEventListener('click', lt_reset);
  document.getElementById('lt-prevBtn').addEventListener('click', () => { if (ltS.index > 0) { ltS.index--; lt_render(); } });
  document.getElementById('lt-nextBtn').addEventListener('click', () => { if (ltS.index < ltS.visible.length - 1) { ltS.index++; lt_render(); } });
  document.getElementById('lt-shuffleBtn').addEventListener('click', lt_shuffle);
  document.getElementById('lt-theoryBtn').addEventListener('click', lt_showTheory);
  document.getElementById('lt-clozeText').addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const inp = lt_inputs(); const i = inp.indexOf(e.target); if (i === -1) return;
    e.preventDefault();
    if (i < inp.length - 1) inp[i + 1].focus(); else lt_check(false);
  });
}

/* ============================================================
 *  MULTIPLE CHOICE (mc_)
 * ============================================================ */
const mcS = { all: [], visible: [], index: 0, mode: 'normal', queue: [], correct: 0, wrong: 0 };

function mc_shuffle(arr) {
  if (!Array.isArray(arr)) { // called as mc_shuffle() from button — shuffle visible
    for (let i = mcS.visible.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mcS.visible[i], mcS.visible[j]] = [mcS.visible[j], mcS.visible[i]];
    }
    mcS.index = 0;
    if (mcS.mode === 'study') { mcS.queue = Array.from({length: mcS.visible.length}, (_, i) => i); mc_shuffleArr(mcS.queue); mcS.correct = 0; mcS.wrong = 0; }
    mc_render(); return;
  }
  for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }
}
function mc_shuffleArr(arr) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } }

function mc_currentCard() {
  if (mcS.mode === 'study') return mcS.visible[mcS.queue[0]];
  return mcS.visible[mcS.index];
}

function mc_render() {
  const card = mc_currentCard();
  const statusEl = document.getElementById('mc-status');
  document.getElementById('mc-btn-normal').classList.toggle('active', mcS.mode === 'normal');
  document.getElementById('mc-btn-study').classList.toggle('active', mcS.mode === 'study');

  if (!mcS.visible.length) {
    document.getElementById('mc-question').textContent = 'Keine Multiple-Choice-Fragen vorhanden.';
    document.getElementById('mc-options').innerHTML = '';
    document.getElementById('mc-category').textContent = '';
    document.getElementById('mc-id').textContent = '';
    statusEl.textContent = '0 Fragen';
    document.getElementById('mc-btn-next').classList.add('hidden');
    document.getElementById('mc-btn-theory').classList.add('hidden');
    document.getElementById('mc-feedback').classList.add('hidden');
    return;
  }

  // Study mode: all done
  if (mcS.mode === 'study' && mcS.queue.length === 0) {
    document.getElementById('mc-question').textContent = 'Lernrunde abgeschlossen! \u2728';
    document.getElementById('mc-options').innerHTML =
      '<button class="lt-btn-primary" style="margin-top:8px" onclick="mc_switchMode(\'study\')">Nochmal</button>' +
      '<button class="lt-btn" style="margin-top:8px" onclick="mc_switchMode(\'normal\')">Normal-Modus</button>';
    document.getElementById('mc-category').textContent = '';
    document.getElementById('mc-id').textContent = '';
    statusEl.textContent = 'Fertig \u2014 \u2713 ' + mcS.correct + '  \u2717 ' + mcS.wrong;
    document.getElementById('mc-btn-next').classList.add('hidden');
    document.getElementById('mc-btn-theory').classList.add('hidden');
    document.getElementById('mc-feedback').classList.add('hidden');
    return;
  }

  // Normal mode: all done
  if (mcS.mode === 'normal' && mcS.index >= mcS.visible.length) {
    document.getElementById('mc-question').textContent = 'Alle Fragen beantwortet! \u2728';
    document.getElementById('mc-options').innerHTML =
      '<button class="lt-btn-primary" style="margin-top:8px" onclick="mc_switchMode(\'normal\')">Nochmal</button>';
    document.getElementById('mc-category').textContent = '';
    document.getElementById('mc-id').textContent = '';
    statusEl.textContent = '\u2713 ' + mcS.correct + '  \u2717 ' + mcS.wrong + ' von ' + mcS.visible.length;
    document.getElementById('mc-btn-next').classList.add('hidden');
    document.getElementById('mc-btn-theory').classList.add('hidden');
    document.getElementById('mc-feedback').classList.add('hidden');
    return;
  }

  // Render question
  document.getElementById('mc-category').textContent = card.category || '';
  document.getElementById('mc-id').textContent = 'ID: ' + card.id;
  document.getElementById('mc-question').textContent = card.question;

  if (mcS.mode === 'normal') {
    statusEl.textContent = 'Frage ' + (mcS.index + 1) + ' / ' + mcS.visible.length;
  } else {
    statusEl.textContent = 'Noch ' + mcS.queue.length + ' offen \u00b7 \u2713 ' + mcS.correct + ' \u00b7 \u2717 ' + mcS.wrong;
  }

  // Build option buttons — shuffle display order so correct answer isn't always #1
  const optWrap = document.getElementById('mc-options');
  optWrap.innerHTML = '';
  const displayOrder = (card.options || []).map((opt, i) => i);
  mc_shuffleArr(displayOrder);
  const shuffledCorrect = displayOrder.indexOf(card.correct); // position of correct in shuffled list
  displayOrder.forEach((srcIdx, displayIdx) => {
    const btn = document.createElement('button');
    btn.className = 'mc-option';
    btn.textContent = (displayIdx + 1) + '. ' + card.options[srcIdx];
    btn.onclick = () => mc_select(displayIdx, shuffledCorrect);
    optWrap.appendChild(btn);
  });

  // Theory button
  const hasTheory = !!(activeSubject && (activeSubject.theory || []).find(t => t.id === card.id));
  document.getElementById('mc-btn-theory').classList.toggle('hidden', !hasTheory);

  // Hide next + feedback
  document.getElementById('mc-btn-next').classList.add('hidden');
  document.getElementById('mc-feedback').classList.add('hidden');
}

function mc_select(chosenIdx, correctIdx) {
  const card = mc_currentCard();
  if (!card) return;
  const optBtns = document.getElementById('mc-options').querySelectorAll('.mc-option');
  if (!optBtns.length || optBtns[0].disabled) return; // already answered

  optBtns.forEach(b => { b.disabled = true; });

  const isRight = chosenIdx === correctIdx;

  optBtns[correctIdx].classList.add('mc-correct');
  if (!isRight) optBtns[chosenIdx].classList.add('mc-wrong');

  const fb = document.getElementById('mc-feedback');
  if (isRight) {
    fb.textContent = '\u2713 Richtig!';
    fb.className = 'lt-feedback ok';
    mcS.correct++;
  } else {
    fb.textContent = '\u2717 Falsch \u2014 richtig w\u00e4re: ' + optBtns[correctIdx].textContent.replace(/^\d+\.\s*/, '');
    fb.className = 'lt-feedback warn';
    mcS.wrong++;
    if (mcS.mode === 'study') {
      const qi = mcS.queue.shift();
      mcS.queue.push(qi);
    }
  }
  if (isRight && mcS.mode === 'study') mcS.queue.shift();
  fb.classList.remove('hidden');
  document.getElementById('mc-btn-next').classList.remove('hidden');
}

function mc_next() {
  if (mcS.mode === 'normal') mcS.index++;
  mc_render();
}

function mc_switchMode(m) {
  mcS.mode = m;
  mcS.index = 0;
  mcS.correct = 0;
  mcS.wrong = 0;
  if (m === 'study') {
    mcS.queue = Array.from({length: mcS.visible.length}, (_, i) => i);
    mc_shuffleArr(mcS.queue);
  }
  mc_render();
}

function mc_showTheory() {
  const card = mc_currentCard();
  if (card) showTheory(card.id, 'screen-mc');
}

function mc_init() {
  mcS.all = ((activeSubject && activeSubject.mc) || []).slice();
  mcS.visible = mcS.all.slice();
  mcS.index = 0; mcS.mode = 'normal'; mcS.queue = []; mcS.correct = 0; mcS.wrong = 0;
  mc_render();
}

/* ============================================================
 *  THEORIE-ÜBERSICHT (tl_)
 * ============================================================ */
function tl_init() {
  const list = document.getElementById('tl-list');
  const entries = ((activeSubject && activeSubject.theory) || []).filter(t => !t.hidden);
  if (!entries.length) {
    list.innerHTML = '<p class="tl-empty">Keine Theorie-Einträge vorhanden.</p>';
    return;
  }
  list.innerHTML = '';
  entries.forEach(t => {
    const kk = (activeSubject.kk || []).find(c => c.id === t.id);
    const lt = (activeSubject.lt || []).find(c => c.id === t.id);
    const cat = (kk && kk.category) || (lt && lt.category) || '';
    const item = document.createElement('button');
    item.className = 'tl-item';
    item.innerHTML =
      '<span class="tl-item-info">' +
        '<span class="tl-item-title">' + lt_esc(t.title) + '</span>' +
        (cat ? '<span class="tl-item-meta">' + lt_esc(cat) + '</span>' : '') +
      '</span>' +
      '<span class="tl-item-arrow">›</span>';
    item.addEventListener('click', () => showTheory(t.id, 'screen-theory-list'));
    list.appendChild(item);
  });
}

/* ============================================================
 *  INIT
 * ============================================================ */
if (isAuthenticated()) {
  buildSubjectScreen();
  showScreen('screen-subject');
} else {
  showScreen('screen-login');
  document.getElementById('login-input').focus();
}
