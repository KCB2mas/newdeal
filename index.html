<!DOCTYPE html>
<html lang="no">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Lønnssammenligning 2026–2027</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#f5f5f3;color:#1a1a18;padding:16px;font-size:14px}
h1{font-size:20px;font-weight:500;margin-bottom:4px}
.sub{font-size:13px;color:#666;margin-bottom:16px}
.layout{display:grid;grid-template-columns:270px 1fr;gap:16px;align-items:start}
.lbl{font-size:12px;color:#666;margin-bottom:4px;display:block}
.card{background:#fff;border:0.5px solid #e0e0da;border-radius:12px;padding:14px;margin-bottom:12px}
.section-hdr{font-size:11px;font-weight:500;color:#888;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px}
.model-btn{flex:1;padding:7px 10px;border-radius:8px;border:0.5px solid #ddd;background:transparent;cursor:pointer;font-size:12px;color:#666}
.model-btn.active{background:#f0f0ec;color:#1a1a18;font-weight:500;border-color:#bbb}
.inp{width:100%;padding:5px 8px;border-radius:8px;border:0.5px solid #ccc;background:#fff;color:#1a1a18;font-size:13px}
.inp-ro{width:100%;padding:5px 8px;border-radius:8px;border:0.5px solid #eee;background:#f5f5f3;color:#666;font-size:13px;cursor:default}
.note{font-size:11px;color:#888;font-style:italic;margin-top:8px}
.kpi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:12px}
.kpi-card{background:#f0f0ec;border-radius:8px;padding:12px}
.kpi-lbl{font-size:11px;color:#666;margin-bottom:2px}
.kpi-val{font-size:20px;font-weight:500}
.tab-bar{display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap}
.tab-btn{padding:6px 14px;border-radius:8px;border:0.5px solid #ddd;background:transparent;cursor:pointer;font-size:13px;color:#666}
.tab-btn.active{background:#f0f0ec;color:#1a1a18;font-weight:500}
.tbl{width:100%;border-collapse:collapse;font-size:12px}
.tbl th{text-align:right;padding:8px 10px;font-weight:500;font-size:11px;color:#888;border-bottom:0.5px solid #eee;white-space:nowrap}
.tbl th:first-child{text-align:left}
.tbl td{padding:7px 10px;text-align:right;border-bottom:0.5px solid #eee;font-variant-numeric:tabular-nums;white-space:nowrap}
.tbl td:first-child{text-align:left;font-weight:500}
.tbl tr.total-row td{font-weight:500;background:#f0f0ec}
.tbl tr.special-row td{background:#eef4fc}
.fravær-inp{width:52px;text-align:center;padding:4px 6px;border-radius:6px;border:0.5px solid #ccc;background:#fff;font-size:12px}
.green{color:#1a7a3d}.red{color:#b91c1c}.blue{color:#185fa5}
.breakeven-box{margin-top:12px;padding:10px;border-radius:8px;background:#f0f0ec;border:0.5px solid #ddd}
.info-box{padding:10px 12px;border-radius:8px;background:#eef4fc;border:0.5px solid #c5d9ef;font-size:12px;color:#185fa5;margin-bottom:12px}
.params-toggle{display:none;width:100%;padding:10px;border-radius:8px;border:0.5px solid #ddd;background:#f0f0ec;cursor:pointer;font-size:13px;font-weight:500;color:#1a1a18;margin-bottom:8px;text-align:left}
@media(max-width:700px){
  body{padding:12px}
  .layout{grid-template-columns:1fr}
  .kpi-grid{grid-template-columns:1fr 1fr}
  .kpi-grid .kpi-card:last-child{grid-column:1/-1}
  .kpi-val{font-size:17px}
  .params-toggle{display:block}
  .params-panel{display:none}
  .params-panel.open{display:block}
  .tab-btn{font-size:12px;padding:5px 10px}
  .tbl th,.tbl td{padding:6px 7px;font-size:11px}
  .fravær-inp{width:44px;font-size:11px}
  h1{font-size:17px}
}
</style>
</head>
<body>
<h1>Lønnssammenligning 2026–2027</h1>
<p class="sub">Sammenlign gammel og ny lønnsmodell. 2027-feriepenger beregnes automatisk som 12% av 2026-lønn.</p>

<div class="layout">
<div>
  <button class="params-toggle" onclick="this.textContent=this.textContent.includes('▼')?'▲ Skjul parametere':'▼ Vis parametere';this.nextElementSibling.classList.toggle('open')">▼ Vis parametere</button>
  <div class="params-panel">
  <div class="card">
    <div class="section-hdr">Nåværende modell</div>
    <div style="display:flex;gap:6px">
      <button class="model-btn active" onclick="setModell('fp')" id="btn-fp">Fastlønn + provisjon</button>
      <button class="model-btn" onclick="setModell('fl')" id="btn-fl">Ren fastlønn</button>
    </div>
    <div class="note" id="modell-note">Mai: feriepenger utbetales i tillegg til vanlig lønn</div>
  </div>

  <div class="card">
    <div class="section-hdr">Parametere</div>
    <div style="display:flex;flex-direction:column;gap:10px">
      <div><span class="lbl">Timepris (kr)</span><input class="inp" type="number" id="timepris" value="1450" onchange="updateUI()"></div>
      <div><span class="lbl">Fastlønn/mnd (kr)</span><input class="inp" type="number" id="fastlonn" value="65000" onchange="updateUI()"></div>
      <div><span class="lbl">Tillegg/mnd (kr) <span style="font-weight:400;color:#aaa">jan–apr 2026</span></span><input class="inp" type="number" id="tillegg" value="0" onchange="updateUI()"></div>
      <div id="fp-params" style="display:flex;flex-direction:column;gap:10px">
        <div>
          <span class="lbl">Stillingsprosent: <strong id="stilling-val">100%</strong></span>
          <input type="range" id="stillingsprosent" min="0.5" max="1.0" step="0.05" value="1.0" oninput="document.getElementById('stilling-val').textContent=Math.round(this.value*100)+'%';updateUI()">
        </div>
        <div>
          <span class="lbl">Innslagspunkt <span style="font-weight:400;color:#aaa">= fastlønn × stilling × 1,5</span></span>
          <div class="inp-ro" id="innslagspunkt-vis">–</div>
        </div>
        <div>
          <span class="lbl">Provisjonssats: <strong id="prov-val">35%</strong></span>
          <input type="range" id="provisjonssats" min="0.2" max="0.5" step="0.01" value="0.35" oninput="document.getElementById('prov-val').textContent=Math.round(this.value*100)+'%';updateUI()">
        </div>
      </div>
      <div style="border-top:0.5px solid #eee;padding-top:10px;display:flex;flex-direction:column;gap:10px">
        <div><span class="lbl">Feriedager igjen 1. juni</span><input class="inp" type="number" id="feriedager-igjen" value="25" onchange="updateUI()"></div>
        <div><span class="lbl">Feriepenger fra 2025 (kr)</span><input class="inp" type="number" id="feriepenger" value="115000" onchange="updateUI()"></div>
        <div><span class="lbl">Min. månedlig garantilønn ny modell (kr)</span><input class="inp" type="number" id="mingaranti" value="66700" onchange="updateUI()"></div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="section-hdr">Ny modell</div>
    <div>
      <span class="lbl">Prosentsats: <strong id="ny-pct-val">46%</strong></span>
      <input type="range" id="ny-prosentsats" min="0.38" max="0.60" step="0.01" value="0.46" oninput="document.getElementById('ny-pct-val').textContent=Math.round(this.value*100)+'%';updateUI()">
    </div>
    <div class="breakeven-box">
      <div style="font-size:11px;color:#666">Breakeven-sats (2026)</div>
      <div id="breakeven" style="font-size:22px;font-weight:500;color:#185fa5">–</div>
      <div style="font-size:11px;color:#666;margin-bottom:10px">gir samme årslønn som gammel modell</div>
      <div style="border-top:0.5px solid #ddd;padding-top:10px">
      <div style="font-size:11px;color:#666">Breakeven-sats (2027)</div>
      <div id="breakeven27" style="font-size:22px;font-weight:500;color:#185fa5">–</div>
      <div style="font-size:11px;color:#666">gir samme årslønn som gammel modell</div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="section-hdr">Beregnet 2027-feriepenger</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <div>
        <span class="lbl">Basert på overgangsåret 2026</span>
        <div class="inp-ro" id="fp27-gml">–</div>
      </div>
      <div style="font-size:11px;color:#888;font-style:italic">12% av faktisk 2026-lønn ekskl. feriepenger</div>
    </div>
  </div>
  </div><!-- /params-panel -->
</div><!-- /left col -->

<div><!-- right col -->
  <div class="kpi-grid">
    <div class="kpi-card"><div class="kpi-lbl">Gammel modell</div><div class="kpi-val" id="kpi-gml">–</div><div style="font-size:11px;color:#666" id="kpi-gml-lbl">2026 inkl. feriepenger</div></div>
    <div class="kpi-card"><div class="kpi-lbl" id="kpi-ny-lbl">Ny modell (46%)</div><div class="kpi-val blue" id="kpi-ny">–</div><div style="font-size:11px;color:#666" id="kpi-ny-sub">2026 inkl. feriepenger</div></div>
    <div class="kpi-card"><div class="kpi-lbl">Differanse</div><div class="kpi-val" id="kpi-diff">–</div><div style="font-size:11px;color:#666" id="kpi-diff-lbl">–</div><div id="kpi-diff-tillegg" style="font-size:11px;margin-top:3px;display:none"></div></div>
  </div>

  <div class="tab-bar">
    <button class="tab-btn active" onclick="setTab('tabell')" id="tab-tabell">2026 månedlig</button>
    <button class="tab-btn" onclick="setTab('fravar')" id="tab-fravar">Ferie & fravær</button>
    <button class="tab-btn" onclick="setTab('ar2027')" id="tab-ar2027">2027 helår</button>
    <button class="tab-btn" onclick="setTab('graf')" id="tab-graf">Graf</button>
  </div>

  <!-- 2026 tabell -->
  <div class="card" id="content-tabell">
    <div style="font-size:12px;color:#888;margin-bottom:10px;padding-bottom:10px;border-bottom:0.5px solid #eee;">
      Tabellen viser <strong style="color:#1a1a18;font-weight:500">opptjeningsmåned</strong> — lønn utbetales den 20. påfølgende måned.
      <span id="juni-note-2026"> Mai ★ er spesialmåned i 2026: feriepenger + grunnlønn utbetales samlet 20. juni.</span>
    </div>
    <div style="overflow-x:auto">
    <table class="tbl">
      <thead><tr>
        <th style="text-align:left;width:80px">Opptjent</th>
        <th>Arbdager</th>
        <th>Fakturert (t)</th>
        <th>Omsetning</th>
        <th>Gammel modell</th>
        <th id="th-ny">Ny modell (46%)</th>
        <th>Hvorav garantilønn</th>
        <th>Differanse</th>
      </tr></thead>
      <tbody id="tbl-body"></tbody>
    </table>
    </div>
    <div style="font-size:11px;color:#888;margin-top:10px;padding-top:8px;border-top:0.5px solid #eee;">
      * Tillegg inngår i gammel modell jan–apr. Fra og med mai 2026 bortfaller tillegget.
      Hadde tillegget ikke blitt fjernet, ville årslønn gammel modell vært <span id="gml-med-tillegg" style="font-weight:500;color:#1a1a18">–</span> høyere (8 × tillegg).
    </div>
  </div>
  <div class="card" id="content-fravar" style="display:none">
    <div style="overflow-x:auto">
    <table class="tbl">
      <thead><tr>
        <th style="text-align:left;width:80px">Måned</th>
        <th>Feriedager</th>
        <th>Sykedager</th>
        <th>Dager u/fakturering</th>
        <th>Fakturert (t)</th>
        <th>Omsetning</th>
      </tr></thead>
      <tbody id="fravar-body"></tbody>
    </table>
    </div>
  </div>

  <!-- 2027 -->
  <div id="content-ar2027" style="display:none">
    <div class="info-box" id="info-2027">Feriepenger beregnes automatisk fra 2026-tallene dine.</div>
    <div class="kpi-grid" style="margin-bottom:12px">
      <div class="kpi-card"><div class="kpi-lbl">Gammel modell 2027</div><div class="kpi-val" id="kpi27-gml">–</div><div style="font-size:11px;color:#666">inkl. 2027-feriepenger</div></div>
      <div class="kpi-card"><div class="kpi-lbl" id="kpi27-ny-lbl">Ny modell 2027</div><div class="kpi-val blue" id="kpi27-ny">–</div><div style="font-size:11px;color:#666">inkl. 2027-feriepenger</div></div>
      <div class="kpi-card"><div class="kpi-lbl">Differanse 2027</div><div class="kpi-val" id="kpi27-diff">–</div><div style="font-size:11px;color:#666" id="kpi27-diff-lbl">–</div></div>
    </div>
    <div class="card">
      <div style="font-size:12px;color:#888;margin-bottom:10px;padding-bottom:10px;border-bottom:0.5px solid #eee;">
        Tabellen viser <strong style="color:#1a1a18;font-weight:500">opptjeningsmåned</strong> — lønn utbetales den 20. påfølgende måned.
        Feriepenger beregnet som 12% av 2026-lønn. Ingen spesialmåned i 2027.
      </div>
      <div style="overflow-x:auto">
      <table class="tbl">
        <thead><tr>
          <th style="text-align:left;width:80px">Opptjent</th>
          <th>Arbdager</th>
          <th>Fakturert (t)</th>
          <th>Omsetning</th>
          <th>Gammel modell</th>
          <th id="th27-ny">Ny modell (46%)</th>
          <th>Hvorav garantilønn</th>
          <th>Differanse</th>
        </tr></thead>
        <tbody id="tbl-body-2027"></tbody>
      </table>
      </div>
    </div>
  </div>

  <!-- Graf -->
  <div class="card" id="content-graf" style="display:none">
    <div style="position:relative;height:280px"><canvas id="lonn-chart"></canvas></div>
    <div style="display:flex;gap:20px;margin-top:10px;font-size:12px;color:#888">
      <span style="display:flex;align-items:center;gap:5px"><span style="width:10px;height:10px;border-radius:2px;background:#73726c;display:inline-block"></span>Gammel modell</span>
      <span style="display:flex;align-items:center;gap:5px"><span style="width:10px;height:10px;border-radius:2px;background:#185fa5;display:inline-block"></span>Ny modell</span>
    </div>
  </div>
</div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
<script>
const MONTHS_K = ['Jan','Feb','Mar','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Des'];
const ARB_DAGER = [21,20,22,19,18,22,23,21,22,22,21,20];
const T_DAG = 7.5;

let modell = 'fp';
let activeTab = 'tabell';
let chart = null;

const fravær = Array.from({length:12},(_,i)=>({
  ferie: i===6?20:i===11?5:0,
  syk: 0,
  uten: 0
}));

function kr(v){
  if(isNaN(v)||v===null) return '–';
  const s=Math.abs(Math.round(v)).toLocaleString('nb-NO');
  return (v<0?'− ':'')+s+' kr';
}
function krShort(v){
  const a=Math.abs(v);
  if(a>=1000000) return (v/1000000).toFixed(1)+' M';
  if(a>=1000) return Math.round(v/1000)+'k';
  return Math.round(v).toString();
}

function setModell(m){
  modell=m;
  document.getElementById('btn-fp').classList.toggle('active',m==='fp');
  document.getElementById('btn-fl').classList.toggle('active',m==='fl');
  document.getElementById('fp-params').style.display=m==='fp'?'flex':'none';
  document.getElementById('modell-note').textContent=m==='fp'
    ?'Mai ★: feriepenger + garantilønn + provisjon utbetales 20. juni'
    :'Mai ★: feriepenger + garantilønn utbetales 20. juni';
  if(m==='fl'){document.getElementById('fastlonn').value=90000;document.getElementById('feriepenger').value=114000;}
  else{document.getElementById('fastlonn').value=65000;document.getElementById('feriepenger').value=115000;}
  updateUI();
}

function setTab(t){
  activeTab=t;
  ['tabell','fravar','ar2027','graf'].forEach(id=>{
    document.getElementById('content-'+id).style.display=t===id?'block':'none';
    document.getElementById('tab-'+id).classList.toggle('active',t===id);
  });
  if(t==='graf') setTimeout(renderChart,50);
}

function getParams(){
  const timepris=+document.getElementById('timepris').value||0;
  const fastlonn=+document.getElementById('fastlonn').value||0;
  const tillegg=+document.getElementById('tillegg').value||0;
  const stilling=modell==='fp'?(+document.getElementById('stillingsprosent').value||0.8):1.0;
  const provSats=modell==='fp'?(+document.getElementById('provisjonssats').value||0):0;
  const feriepenger=+document.getElementById('feriepenger').value||0;
  const feriedagerIgjen=+document.getElementById('feriedager-igjen').value||0;
  const nyPct=+document.getElementById('ny-prosentsats').value||0.46;
  const fastlonnActual=fastlonn*stilling;
  const innslagspunkt=fastlonnActual*1.5;
  // Ferietrekkdagsats: fp bruker fastlonn×stilling, fl bruker fastlonn direkte (stilling=1 i regnearket)
  const ferietrekkBasis=modell==='fp'?fastlonnActual:fastlonn;
  const ferietrekkDag=ferietrekkBasis*12/260;
  // Gammel modell mai: trekk kun for avviklede dager (under 25)
  const ferietrekkGml=Math.max(0, ferietrekkDag*(25-feriedagerIgjen));
  // Ny modell mai: (feriedagerIgjen - 25) × dagsats → negativ=trekk, positiv=komp
  const ferieJusteringNy=(feriedagerIgjen-25)*ferietrekkDag;
  // Garantilønn fra input (ny modell) — også brukt i gammel modell som fallback
  const minGarantiMnd=+document.getElementById('mingaranti').value||66700;
  const garantilonn=800000/12;  // alltid uten stilling — regnearket B17=800000/12
  const seksgG=130160*6;
  const sykAarsbasis=Math.min(minGarantiMnd*12, seksgG);
  const sykKompDag=modell==='fp'?sykAarsbasis/260:fastlonn/30;
  const spesialMnd=4;  // mai opptjent for begge modeller
  return{timepris,fastlonn,tillegg,stilling,provSats,feriepenger,nyPct,
    fastlonnActual,innslagspunkt,ferietrekkDag,ferietrekkGml,ferieJusteringNy,sykKompDag,garantilonn,minGarantiMnd,spesialMnd};
}

function beregnAar(p, feriepengerOverride, is2027=false){
  const fp = feriepengerOverride !== undefined ? feriepengerOverride : p.feriepenger;
  return Array.from({length:12},(_,i)=>{
    const arb=ARB_DAGER[i];
    const f=fravær[i];
    const timer=arb*T_DAG*p.stilling;
    const faktTimer=Math.max(0,timer-(f.ferie+f.syk+f.uten)*T_DAG);
    const omsetning=faktTimer*p.timepris;
    const prov=modell==='fp'?Math.max(0,omsetning-p.innslagspunkt)*p.provSats*0.7825:0;

    // Tillegg: bortfaller fra juni 2026 (i>=5), og er 0 hele 2027
    const tilleggMnd = (is2027 || i>=5) ? 0 : p.tillegg;

    let gml, maiOvergang;
    if(modell==='fp'){
      if(i===p.spesialMnd){
        // Gammel modell mai: fastlønn + tillegg + provisjon + feriepenger - 25 dagers trekk
        gml = p.fastlonn + tilleggMnd + prov + p.feriepenger - 25*p.ferietrekkDag;
        // Overgang (vises i ny-kolonnen for mai): provisjon(gml) + feriepenger - ferietrekk(avviklet) + garantilønn
        maiOvergang = prov + p.feriepenger - p.ferietrekkGml + p.garantilonn;
      } else {
        gml = p.fastlonn + tilleggMnd + prov;
        maiOvergang = null;
      }
    } else {
      if(i===p.spesialMnd){
        // Gammel modell mai (ren fastlønn): fastlønn + feriepenger - 25 dagers trekk
        gml = p.fastlonn + tilleggMnd + p.feriepenger - 25*p.ferietrekkDag;
        // Overgang: ingen provisjon, feriepenger - ferietrekk(avviklet) + garantilønn
        maiOvergang = p.feriepenger - p.ferietrekkGml + p.garantilonn;
      } else {
        gml = p.fastlonn + tilleggMnd;
        maiOvergang = null;
      }
    }

    const nyBase=omsetning*p.nyPct+f.syk*p.sykKompDag;
    const ikkeBetalingsdager=Math.min(arb, f.ferie+f.syk);
    const proratertGaranti=p.minGarantiMnd*(arb-ikkeBetalingsdager)/arb;
    const garantiAndel=Math.max(0, proratertGaranti-nyBase);
    const nyMedGulv=nyBase < proratertGaranti ? proratertGaranti : nyBase;
    const ferieJustering=(!is2027 && i===p.spesialMnd)?p.ferieJusteringNy:0;
    // Mai: ny-kolonnen viser overgangsverdi, ikke provisjonsmodellen
    const ny = (i===p.spesialMnd && !is2027)
      ? (maiOvergang + ferieJustering)
      : (i===p.spesialMnd ? nyMedGulv+fp+ferieJustering : nyMedGulv);

    const fase = i < p.spesialMnd ? 'gml' : i === p.spesialMnd ? 'overgang' : 'ny';

    return{arb,faktTimer,omsetning,gml,ny,diff:ny-gml,erSpesial:i===p.spesialMnd,garantiAndel,fase};
  });
}

function updateUI(){
  const p=getParams();

  // Innslagspunkt display
  document.getElementById('innslagspunkt-vis').textContent=Math.round(p.innslagspunkt).toLocaleString('nb-NO')+' kr';

  // Update spesialmåned-note
  const spesialNavn = modell==='fp' ? 'Mai' : 'Juni';
  const spesialUtbetalt = modell==='fp' ? 'juni' : 'juli';
  const juniNote = document.getElementById('juni-note-2026');
  if(juniNote) juniNote.textContent = ` ${spesialNavn} ★ er spesialmåned i 2026: feriepenger utbetales 20. ${spesialUtbetalt} — kun dette året.`;

  // 2026
  const rows26=beregnAar(p);
  const gmlTotal26=rows26.reduce((s,r)=>s+r.gml,0);
  const nyTotal26=rows26.reduce((s,r)=>s+r.ny,0);
  const omsetningTotal26=rows26.reduce((s,r)=>s+r.omsetning,0);
  const diff26=nyTotal26-gmlTotal26;

  // Overgangssum 2026 — dette er grunnlaget for 2027-feriepenger
  const sumJanAprGml26  = rows26.filter(r=>r.fase==='gml').reduce((s,r)=>s+r.gml,0);
  const sumMaiOvergang26= rows26.find(r=>r.fase==='overgang')?.ny||0;
  const sumJunDesNy26   = rows26.filter(r=>r.fase==='ny').reduce((s,r)=>s+r.ny,0);
  const overgangsSum    = sumJanAprGml26 + sumMaiOvergang26 + sumJunDesNy26;
  const diffOvergang    = overgangsSum - gmlTotal26;

  // 2027 feriepenger = 12% av overgangsårslønn ekskl. feriepengeutbetalingen i 2026
  const fp27 = (overgangsSum - p.feriepenger) * 0.12;

  // 2027 beregnes med én feriepengeverdi — alle er på ny modell
  const rows27=beregnAar(p, fp27, true);
  const nyTotal27=rows27.reduce((s,r)=>s+r.ny,0);
  const gmlTotal27=rows27.reduce((s,r)=>s+r.gml,0);
  const diff27=nyTotal27-gmlTotal27;

  const pctLbl=Math.round(p.nyPct*100)+'%';

  // Breakeven 2026
  let breakeven='–';
  if(omsetningTotal26>0){
    const sykTotal=fravær.reduce((s,f)=>s+f.syk,0);
    const be=(gmlTotal26-p.feriepenger-sykTotal*p.sykKompDag)/omsetningTotal26;
    breakeven=(Math.round(be*1000)/10).toFixed(1)+'%';
  }

  // Breakeven 2027
  const omsetningTotal27=rows27.reduce((s,r)=>s+r.omsetning,0);
  let breakeven27='–';
  if(omsetningTotal27>0){
    const sykTotal=fravær.reduce((s,f)=>s+f.syk,0);
    const be27=(gmlTotal27-fp27-sykTotal*p.sykKompDag)/omsetningTotal27;
    breakeven27=(Math.round(be27*1000)/10).toFixed(1)+'%';
  }

  // Update KPIs 2026
  document.getElementById('kpi-gml').textContent=kr(gmlTotal26);
  const tilleggEl=document.getElementById('gml-med-tillegg');
  if(tilleggEl && p.tillegg>0) tilleggEl.textContent=kr(8*p.tillegg);
  else if(tilleggEl) tilleggEl.textContent='–';
  document.getElementById('breakeven').textContent=breakeven;

  // Update KPIs 2027
  document.getElementById('kpi27-gml').textContent=kr(gmlTotal27);
  document.getElementById('kpi27-ny').textContent=kr(nyTotal27);
  document.getElementById('kpi27-ny-lbl').textContent=`Ny modell (${pctLbl}) 2027`;
  document.getElementById('th27-ny').textContent=`Ny modell (${pctLbl})`;
  document.getElementById('kpi27-diff').textContent=(diff27>=0?'+ ':'')+kr(Math.abs(diff27));
  document.getElementById('kpi27-diff').className='kpi-val '+(diff27>=0?'green':'red');
  document.getElementById('kpi27-diff-lbl').textContent=diff27>=0?'Ny modell er bedre ↑':'Gammel modell er bedre ↓';
  document.getElementById('breakeven27').textContent=breakeven27;

  // 2027 feriepenger display — kun én verdi siden alle bytter
  document.getElementById('fp27-gml').textContent=kr(fp27);
  document.getElementById('info-2027').textContent=
    `Feriepenger 2027: ${kr(fp27)} (12% av faktisk overgangsårslønn ekskl. feriepenger)`;

  // 2026 tabell — jan-apr: kun gml, mai: overgang, jun-des: kun ny

  // Oppdater KPI med overgangssum
  document.getElementById('kpi-ny').textContent=kr(overgangsSum);
  document.getElementById('kpi-ny-lbl').textContent=`Ny modell (${pctLbl})`;
  document.getElementById('th-ny').textContent=`Ny modell (${pctLbl})`;
  document.getElementById('kpi-diff').textContent=(diffOvergang>=0?'+ ':'')+kr(Math.abs(diffOvergang));
  document.getElementById('kpi-diff').className='kpi-val '+(diffOvergang>=0?'green':'red');
  document.getElementById('kpi-diff-lbl').textContent=diffOvergang>=0?'Ny modell er bedre ↑':'Gammel modell er bedre ↓';
  // Differanse inkl. bortfalt tillegg (8 mnd)
  const diffInklTillegg = overgangsSum - (gmlTotal26 + 8*p.tillegg);
  const diffTilleggEl = document.getElementById('kpi-diff-tillegg');
  if(diffTilleggEl){
    if(p.tillegg>0){
      diffTilleggEl.textContent=`(${diffInklTillegg>=0?'+ ':''}${kr(Math.abs(diffInklTillegg))} inkl. tillegg)`;
      diffTilleggEl.style.color=diffInklTillegg>=0?'#1a7a3d':'#b91c1c';
      diffTilleggEl.style.display='block';
    } else {
      diffTilleggEl.style.display='none';
    }
  }

  let html='';
  rows26.forEach((r,i)=>{
    const cls=r.erSpesial?' class="special-row"':'';
    let nyTekst, garTekst, diffTekst;
    if(r.fase==='gml'){
      // Jan-apr: ny modell ikke aktuelt
      nyTekst=`<span style="color:#bbb">–</span>`;
      garTekst=`<span style="color:#bbb">–</span>`;
      diffTekst=`<span style="color:#bbb">–</span>`;
    } else if(r.fase==='overgang'){
      // Mai: gml-kolonnen viser gammel modell, ny-kolonnen viser overgangsverdi (r.ny)
      nyTekst=`<span class="blue">${kr(r.ny)}</span>`;
      const maiDiff=r.ny-r.gml;
      garTekst=`<span style="color:#bbb">–</span>`;
      diffTekst=`<span class="${maiDiff>=0?'green':'red'}">${maiDiff>=0?'+':''} ${kr(Math.abs(maiDiff))}</span>`;
    } else {
      // Jun-des: ny modell
      nyTekst=`<span class="blue">${kr(r.ny)}</span>`;
      const gar=r.garantiAndel>0?`<span style="color:#185fa5">${kr(r.garantiAndel)}</span>`:`<span style="color:#bbb">–</span>`;
      garTekst=gar;
      diffTekst=`<span class="${r.diff>=0?'green':'red'}">${r.diff>=0?'+':''} ${kr(Math.abs(r.diff))}</span>`;
    }
    html+=`<tr${cls}>
      <td>${MONTHS_K[i]}${r.erSpesial?' ★':''}</td><td>${r.arb}</td><td>${r.faktTimer.toFixed(1)}</td>
      <td>${kr(r.omsetning)}</td><td>${kr(r.gml)}</td>
      <td>${nyTekst}</td>
      <td>${garTekst}</td>
      <td>${diffTekst}</td>
    </tr>`;
  });
  const garTotal26=rows26.filter(r=>r.fase==='ny').reduce((s,r)=>s+r.garantiAndel,0);
  html+=`<tr class="total-row"><td>Totalt</td><td>–</td><td>–</td>
    <td>${kr(omsetningTotal26)}</td><td>${kr(gmlTotal26)}</td>
    <td class="blue">${kr(overgangsSum)}</td>
    <td class="blue">${garTotal26>0?kr(garTotal26):'–'}</td>
    <td class="${diffOvergang>=0?'green':'red'}">${diffOvergang>=0?'+':''} ${kr(Math.abs(diffOvergang))}</td>
  </tr>`;
  document.getElementById('tbl-body').innerHTML=html;

  // 2027 tabell — én modell, alle er på ny modell
  let html27='';
  rows27.forEach((r,i)=>{
    const cls=r.erSpesial?' class="special-row"':'';
    const garTekst=r.garantiAndel>0?`<span style="color:#185fa5">${kr(r.garantiAndel)}</span>`:`<span style="color:#bbb">–</span>`;
    html27+=`<tr${cls}>
      <td>${MONTHS_K[i]}${r.erSpesial?' ★':''}</td><td>${r.arb}</td><td>${r.faktTimer.toFixed(1)}</td>
      <td>${kr(r.omsetning)}</td><td>${kr(r.gml)}</td>
      <td class="blue">${kr(r.ny)}</td>
      <td>${garTekst}</td>
      <td class="${r.diff>=0?'green':'red'}">${r.diff>=0?'+':''} ${kr(Math.abs(r.diff))}</td>
    </tr>`;
  });
  const garTotal27=rows27.reduce((s,r)=>s+r.garantiAndel,0);
  html27+=`<tr class="total-row"><td>Totalt</td><td>–</td><td>–</td>
    <td>${kr(omsetningTotal27)}</td><td>${kr(gmlTotal27)}</td>
    <td class="blue">${kr(nyTotal27)}</td>
    <td class="blue">${garTotal27>0?kr(garTotal27):'–'}</td>
    <td class="${diff27>=0?'green':'red'}">${diff27>=0?'+':''} ${kr(Math.abs(diff27))}</td>
  </tr>`;
  document.getElementById('tbl-body-2027').innerHTML=html27;

  // Fravær tabell
  let fhtml='';
  rows26.forEach((r,i)=>{
    const f=fravær[i];
    fhtml+=`<tr>
      <td>${MONTHS_K[i]}</td>
      <td style="text-align:center"><input class="fravær-inp" type="number" min="0" max="30" value="${f.ferie}" onchange="fravær[${i}].ferie=+this.value;updateUI()"></td>
      <td style="text-align:center"><input class="fravær-inp" type="number" min="0" max="30" value="${f.syk}" onchange="fravær[${i}].syk=+this.value;updateUI()"></td>
      <td style="text-align:center"><input class="fravær-inp" type="number" min="0" max="30" value="${f.uten}" onchange="fravær[${i}].uten=+this.value;updateUI()"></td>
      <td>${r.faktTimer.toFixed(1)}</td><td>${kr(r.omsetning)}</td>
    </tr>`;
  });
  document.getElementById('fravar-body').innerHTML=fhtml;

  if(activeTab==='graf') renderChart(rows26);
}

function renderChart(rows){
  if(!rows) rows=beregnAar(getParams());
  if(chart) chart.destroy();
  chart=new Chart(document.getElementById('lonn-chart'),{
    type:'bar',
    data:{labels:MONTHS_K,datasets:[
      {label:'Gammel',data:rows.map(r=>Math.round(r.gml)),backgroundColor:'#73726c',borderRadius:4},
      {label:'Ny',data:rows.map(r=>Math.round(r.ny)),backgroundColor:'#185fa5',borderRadius:4}
    ]},
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>' '+kr(ctx.raw)}}},
      scales:{
        x:{grid:{color:'rgba(0,0,0,0.06)'},ticks:{font:{size:11},autoSkip:false},border:{color:'transparent'}},
        y:{grid:{color:'rgba(0,0,0,0.06)'},ticks:{font:{size:11},callback:v=>krShort(v)},border:{color:'transparent'}}
      }
    }
  });
}

updateUI();
</script>
</body>
</html>
