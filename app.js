const ARS_DAGER = 260;
const G_DEFAULT = 136000; // 1. mai 2026
const STORAGE_KEY = 'newdeal-state-v1';
const DEFAULT_FRAVAR_VERSION = 2;
const EASTER_DECOR_SEQUENCE = ['🐰','🥚','🐥','🌷','🥚','🐥','🌼','🥚'];

const MONTHS_K = ['Jan','Feb','Mar','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Des'];
const ARB_DAGER_2026 = [21,20,22,19,18,22,23,21,22,22,21,20];
const ARB_DAGER_2027 = [20,20,20,22,19,22,22,22,22,21,22,21];
const T_DAG = 7.5;

let modell = 'fp';
let activeTab = 'tabell';
let chart = null;

const fravær2026 = Array.from({length:12},(_,i)=>({
  ferie: i===6?20:i===11?5:0,
  syk: 0,
  uten: 0
}));

const fravær2027 = Array.from({length:12},(_,i)=>({
  ferie: i===6?20:i===11?5:0,
  syk: 0,
  uten: 0
}));

function seedDefaultFravar(fravær){
  for(let i=0;i<12;i++){
    fravær[i].ferie = i===6?20:i===11?5:0;
    fravær[i].syk = 0;
    fravær[i].uten = 0;
  }
}

function isFravarEmpty(fravær){
  return fravær.every(f=>((+f.ferie||0)+(+f.syk||0)+(+f.uten||0))===0);
}

function getArbDager(year){
  return year===2027 ? ARB_DAGER_2027 : ARB_DAGER_2026;
}

function getFravarData(year){
  return year===2027 ? fravær2027 : fravær2026;
}

function clampFravarMonth(monthIndex, year=2026){
  const fravær = getFravarData(year);
  const arbDager = getArbDager(year);
  const f = fravær[monthIndex];
  if(!f) return;
  const maxDays = arbDager[monthIndex] || 0;

  f.ferie = Math.max(0, +f.ferie || 0);
  f.syk = Math.max(0, +f.syk || 0);
  f.uten = Math.max(0, +f.uten || 0);

  const sum = f.ferie + f.syk + f.uten;
  if(sum <= maxDays) return;

  let overflow = sum - maxDays;
  const keys = ['uten','syk','ferie'];
  keys.forEach((key)=>{
    if(overflow <= 0) return;
    const trekk = Math.min(f[key], overflow);
    f[key] -= trekk;
    overflow -= trekk;
  });
}

function setFravarDag(monthIndex, key, rawValue, year=2026){
  const fravær = getFravarData(year);
  const arbDager = getArbDager(year);
  const f = fravær[monthIndex];
  if(!f || !['ferie','syk','uten'].includes(key)) return;

  const maxDays = arbDager[monthIndex] || 0;
  const value = Math.max(0, +rawValue || 0);
  const otherSum =
    (key === 'ferie' ? 0 : f.ferie) +
    (key === 'syk' ? 0 : f.syk) +
    (key === 'uten' ? 0 : f.uten);
  const maxForField = Math.max(0, maxDays - otherSum);

  f[key] = Math.min(value, maxForField);
  updateUI();
}

function resetFravarKolonne(key, year=2026){
  const fravær = getFravarData(year);
  if(!['ferie','syk','uten'].includes(key)) return;
  for(let i=0;i<fravær.length;i++){
    fravær[i][key]=0;
  }
  updateUI();
}

function saveState(){
  try{
    const ids = [
      'timepris','fastlonn','tillegg','stillingsprosent','provisjonssats',
      'feriedager-igjen','feriepenger','g-belop','ny-prosentsats',
      'tilvalg-m3','tilvalg-p2','tilvalg-p4'
    ];
    const values = {};
    ids.forEach(id=>{
      const el=document.getElementById(id);
      if(!el) return;
      values[id]=el.type==='checkbox'?el.checked:el.value;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      defaultFravarVersion: DEFAULT_FRAVAR_VERSION,
      modell,
      activeTab,
      easterTheme: document.body.classList.contains('easter-theme'),
      values,
      fravær2026,
      fravær2027
    }));
  }catch(_e){}
}

function loadState(){
  try{
    const raw=localStorage.getItem(STORAGE_KEY);
    if(!raw) return;
    const state=JSON.parse(raw);
    if(state?.values){
      Object.entries(state.values).forEach(([id,val])=>{
        const el=document.getElementById(id);
        if(!el) return;
        if(el.type==='checkbox') el.checked=!!val;
        else el.value=val;
      });
    }
    const saved2026 = Array.isArray(state?.fravær2026)
      ? state.fravær2026
      : Array.isArray(state?.fravær) ? state.fravær : null;
    if(saved2026){
      saved2026.slice(0,12).forEach((v,i)=>{
        if(!v) return;
        fravær2026[i].ferie=+v.ferie||0;
        fravær2026[i].syk=+v.syk||0;
        fravær2026[i].uten=+v.uten||0;
        clampFravarMonth(i, 2026);
      });
    }
    if(Array.isArray(state?.fravær2027)){
      state.fravær2027.slice(0,12).forEach((v,i)=>{
        if(!v) return;
        fravær2027[i].ferie=+v.ferie||0;
        fravær2027[i].syk=+v.syk||0;
        fravær2027[i].uten=+v.uten||0;
        clampFravarMonth(i, 2027);
      });
    }

    // One-time migration: if old stored fravær is completely empty, seed new defaults.
    if((state?.defaultFravarVersion||0) < DEFAULT_FRAVAR_VERSION){
      if(isFravarEmpty(fravær2026)) seedDefaultFravar(fravær2026);
      if(isFravarEmpty(fravær2027)) seedDefaultFravar(fravær2027);
    }

    if(state?.easterTheme===true) toggleEasterTheme(true);
    else if(state?.easterTheme===false) toggleEasterTheme(false);
    else toggleEasterTheme(true);

    if(state?.modell==='fp' || state?.modell==='fl') modell=state.modell;
    if(['tabell','fravar','fravar2027','ar2027','graf'].includes(state?.activeTab)) activeTab=state.activeTab;
  }catch(_e){}
}

function clearStoredState(){
  try{
    localStorage.removeItem(STORAGE_KEY);
  }catch(_e){}
  location.reload();
}

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

function setModell(m, keepValues=false){
  modell=m;
  document.getElementById('btn-fp').classList.toggle('active',m==='fp');
  document.getElementById('btn-fl').classList.toggle('active',m==='fl');
  document.getElementById('fp-params').style.display=m==='fp'?'flex':'none';
  document.getElementById('modell-note').textContent=m==='fp'
    ?'Mai ★: juni 2026 er spesiell pga. 1 mnd garantilønn på forskudd (+ provisjon og feriepenger).'
    :'Mai ★: juni 2026 er spesiell pga. 1 mnd garantilønn på forskudd (+ feriepenger).';
  if(!keepValues){
    if(m==='fl'){document.getElementById('fastlonn').value=90000;document.getElementById('feriepenger').value=114000;}
    else{document.getElementById('fastlonn').value=65000;document.getElementById('feriepenger').value=115000;}
  }
  updateUI();
}

function setTab(t){
  activeTab=t;
  ['tabell','fravar','fravar2027','ar2027','graf'].forEach(id=>{
    document.getElementById('content-'+id).style.display=t===id?'block':'none';
    document.getElementById('tab-'+id).classList.toggle('active',t===id);
  });

  const is2027 = t==='ar2027' || t==='fravar2027';
  const kpi2026 = document.getElementById('kpi-grid-2026');
  if(kpi2026) kpi2026.style.display=is2027?'none':'grid';

  const yearNote = document.getElementById('year-selection-note');
  if(yearNote) yearNote.textContent=is2027?'Valgt år: 2027':'Valgt år: 2026';

  ['tab-tabell','tab-fravar','tab-graf'].forEach(id=>{
    document.getElementById(id)?.classList.toggle('year-active', !is2027);
  });
  ['tab-ar2027','tab-fravar2027'].forEach(id=>{
    document.getElementById(id)?.classList.toggle('year-active', is2027);
  });

  if(t==='graf') setTimeout(renderChart,50);
  saveState();
}

function getParams(){
  const timepris=+document.getElementById('timepris').value||0;
  const fastlonn=+document.getElementById('fastlonn').value||0;
  const tillegg=+document.getElementById('tillegg').value||0;
  const gBelop=+document.getElementById('g-belop').value||G_DEFAULT;
  const seksG=gBelop*6;
  const stilling=modell==='fp'?(+document.getElementById('stillingsprosent').value||0.8):1.0;
  const provSats=modell==='fp'?(+document.getElementById('provisjonssats').value||0):0;
  const feriepenger=+document.getElementById('feriepenger').value||0;
  const feriedagerIgjen=+document.getElementById('feriedager-igjen').value||0;
  const nyPct=+document.getElementById('ny-prosentsats').value||0.46;
  // Tilvalg
  const tilvalgM3=document.getElementById('tilvalg-m3')?.checked||false;
  const tilvalgP2=document.getElementById('tilvalg-p2')?.checked||false;
  const tilvalgP4=document.getElementById('tilvalg-p4')?.checked||false;
  const tilvalgJustering=(tilvalgM3?-0.03:0)+(tilvalgP2?0.02:0)+(tilvalgP4?0.04:0);
  const effektivSats=nyPct+tilvalgJustering;
  const effEl=document.getElementById('effektiv-sats');
  if(effEl) effEl.textContent=Math.round(effektivSats*100)+'%';
  const fastlonnActual=fastlonn*stilling;
  const innslagspunkt=fastlonnActual*1.5;
  const ferietrekkBasis=modell==='fp'?fastlonnActual:fastlonn;
  const ferietrekkDag=ferietrekkBasis*12/260;
  const ferietrekkGml=Math.max(0, ferietrekkDag*(25-feriedagerIgjen));
  const ferieJusteringNy=(feriedagerIgjen-25)*ferietrekkDag;
  const garantiGulvFaktor=tilvalgP4?0:tilvalgP2?0.5:1;
  const garantilonn=seksG/12*stilling*garantiGulvFaktor;
  const garantiForskudd=seksG/12*stilling;
  const garantiTrekkDag=seksG/ARS_DAGER*stilling*garantiGulvFaktor;
  const sykKompDag=garantiTrekkDag;
  const spesialMnd=4;
  return{timepris,fastlonn,tillegg,stilling,provSats,feriepenger,nyPct:effektivSats,
    fastlonnActual,innslagspunkt,ferietrekkDag,ferietrekkGml,ferieJusteringNy,
    sykKompDag,garantilonn,garantiForskudd,garantiTrekkDag,garantiGulvFaktor,spesialMnd};
}

function beregnAar(p, {feriepengerOverride, is2027=false, fravarData=fravær2026, arbDager=ARB_DAGER_2026} = {}){
  const fp = feriepengerOverride !== undefined ? feriepengerOverride : p.feriepenger;
  return Array.from({length:12},(_,i)=>{
    const arb=arbDager[i];
    const f=fravarData[i];
    const hasSpesial = !is2027 && i===p.spesialMnd;
    const timer=arb*T_DAG*p.stilling;
    const faktTimer=Math.max(0,timer-(f.ferie+f.syk+f.uten)*T_DAG);
    const omsetning=faktTimer*p.timepris;
    const prov=modell==='fp'?Math.max(0,omsetning-p.innslagspunkt)*p.provSats*0.7825:0;
    // Tillegg bortfaller fra og med mai 2026 (opptjent mai = utbetalt juni).
    const tilleggMnd=(is2027||i>=4)?0:p.tillegg;

    let gml, maiOvergang;
    if(modell==='fp'){
      if(hasSpesial){
        gml=p.fastlonn+tilleggMnd+prov+p.feriepenger-25*p.ferietrekkDag;
        maiOvergang=prov+p.feriepenger-p.ferietrekkGml+p.garantiForskudd;
      } else {
        gml=p.fastlonn+tilleggMnd+prov+(is2027&&i===p.spesialMnd?fp-25*p.ferietrekkDag:0);
        maiOvergang=null;
      }
    } else {
      if(hasSpesial){
        gml=p.fastlonn+tilleggMnd+p.feriepenger-25*p.ferietrekkDag;
        maiOvergang=p.feriepenger-p.ferietrekkGml+p.garantiForskudd;
      } else {
        gml=p.fastlonn+tilleggMnd+(is2027&&i===p.spesialMnd?fp-25*p.ferietrekkDag:0);
        maiOvergang=null;
      }
    }

    const nyBase=omsetning*p.nyPct+f.syk*p.sykKompDag;
    const feriedager=Math.min(arb,Math.max(0,f.ferie));
    const garantiEtterFri=Math.max(
      0,
      p.garantilonn-feriedager*p.garantiTrekkDag
    );
    const garantiAndel=Math.max(0,garantiEtterFri-nyBase);
    let nyMedGulv=nyBase<garantiEtterFri?garantiEtterFri:nyBase;
    if(f.syk>0 && f.uten>0){
      nyMedGulv=Math.min(nyMedGulv,p.garantilonn);
    }
    const ferieJustering=hasSpesial?p.ferieJusteringNy:0;
    const ny=hasSpesial
      ?(maiOvergang+ferieJustering)
      :((is2027&&i===p.spesialMnd)?nyMedGulv+fp:nyMedGulv);
    const fase=is2027?'ny':i<p.spesialMnd?'gml':i===p.spesialMnd?'overgang':'ny';

    return{arb,faktTimer,omsetning,gml,ny,diff:ny-gml,erSpesial:hasSpesial,garantiAndel,fase};
  });
}

function updateUI(){
  for(let i=0;i<12;i++){
    clampFravarMonth(i, 2026);
    clampFravarMonth(i, 2027);
  }

  const p=getParams();
  const stillingEl=document.getElementById('stilling-val');
  if(stillingEl) stillingEl.textContent=Math.round((+document.getElementById('stillingsprosent').value||1)*100)+'%';
  const provEl=document.getElementById('prov-val');
  if(provEl) provEl.textContent=Math.round((+document.getElementById('provisjonssats').value||0)*100)+'%';
  const nyPctEl=document.getElementById('ny-pct-val');
  if(nyPctEl) nyPctEl.textContent=Math.round((+document.getElementById('ny-prosentsats').value||0.46)*100)+'%';

  document.getElementById('innslagspunkt-vis').textContent=Math.round(p.innslagspunkt).toLocaleString('nb-NO')+' kr';
  const mndGarantiEl=document.getElementById('mnd-garanti-vis');
  if(mndGarantiEl) mndGarantiEl.textContent=kr(p.garantilonn);
  const disclaimer85gEl=document.getElementById('disclaimer-85g');
  if(disclaimer85gEl){
    const gBelop=+document.getElementById('g-belop').value||G_DEFAULT;
    disclaimer85gEl.textContent=kr(gBelop*8.5);
  }

  const juniNote=document.getElementById('juni-note-2026');
  if(juniNote) juniNote.textContent=' Mai ★ er spesialmåned i 2026: utbetaling 20. juni er spesiell pga. 1 mnd garantilønn på forskudd (ikke en spesialmåned i 2027).';

  const rows26=beregnAar(p, {fravarData: fravær2026, arbDager: ARB_DAGER_2026});
  const gmlTotal26=rows26.reduce((s,r)=>s+r.gml,0);
  const omsetningTotal26=rows26.reduce((s,r)=>s+r.omsetning,0);

  const sumJanAprGml26=rows26.filter(r=>r.fase==='gml').reduce((s,r)=>s+r.gml,0);
  const sumMaiOvergang26=rows26.find(r=>r.fase==='overgang')?.ny||0;
  const sumJunDesNy26=rows26.filter(r=>r.fase==='ny').reduce((s,r)=>s+r.ny,0);
  const overgangsSum=sumJanAprGml26+sumMaiOvergang26+sumJunDesNy26;
  const diffOvergang=overgangsSum-gmlTotal26;

  // "Feriedager igjen 1. juni" gjelder kun 2026-visningen og skal ikke påvirke 2027.
  // Bruk derfor et nøytralt 2026-grunnlag uten denne justeringen ved beregning av 2027-feriepenger.
  const p2027Basis={...p, ferietrekkGml: 0, ferieJusteringNy: 0};
  const rows26For2027Basis=beregnAar(p2027Basis, {fravarData: fravær2026, arbDager: ARB_DAGER_2026});
  const sumJanAprGml26Basis=rows26For2027Basis.filter(r=>r.fase==='gml').reduce((s,r)=>s+r.gml,0);
  const sumMaiOvergang26Basis=rows26For2027Basis.find(r=>r.fase==='overgang')?.ny||0;
  const sumJunDesNy26Basis=rows26For2027Basis.filter(r=>r.fase==='ny').reduce((s,r)=>s+r.ny,0);
  const overgangsSum2027Basis=sumJanAprGml26Basis+sumMaiOvergang26Basis+sumJunDesNy26Basis;

  const fp27=(overgangsSum2027Basis-p.feriepenger)*0.12;
  const rows27=beregnAar(p, {
    feriepengerOverride: fp27,
    is2027: true,
    fravarData: fravær2027,
    arbDager: ARB_DAGER_2027
  });
  const nyTotal27=rows27.reduce((s,r)=>s+r.ny,0);
  const gmlTotal27=rows27.reduce((s,r)=>s+r.gml,0);
  const diff27=nyTotal27-gmlTotal27;

  const pctLbl=Math.round(p.nyPct*100)+'%';

  const omsetningTotal27=rows27.reduce((s,r)=>s+r.omsetning,0);

  document.getElementById('kpi-gml').textContent=kr(gmlTotal26);
  const gmlEksFpEl=document.getElementById('kpi-gml-eks-fp');
  if(gmlEksFpEl){
    const gmlEksFp=gmlTotal26-p.feriepenger;
    gmlEksFpEl.textContent=`Ekskl. feriepenger: ${kr(gmlEksFp)}`;
  }
  const tilleggEl=document.getElementById('gml-med-tillegg');
  if(tilleggEl&&p.tillegg>0) tilleggEl.textContent=kr(8*p.tillegg);
  else if(tilleggEl) tilleggEl.textContent='–';

  document.getElementById('kpi27-gml').textContent=kr(gmlTotal27);
  document.getElementById('kpi27-ny').textContent=kr(nyTotal27);
  document.getElementById('kpi27-ny-lbl').textContent=`Ny modell (${pctLbl}) 2027`;
  document.getElementById('th27-ny').textContent=`Ny modell (${pctLbl})`;
  document.getElementById('kpi27-diff').textContent=(diff27>=0?'+ ':'')+kr(Math.abs(diff27));
  document.getElementById('kpi27-diff').className='kpi-val '+(diff27>=0?'green':'red');
  document.getElementById('kpi27-diff-lbl').textContent=diff27>=0?'Ny modell er bedre ↑':'Gammel modell er bedre ↓';

  document.getElementById('fp27-gml').textContent=kr(fp27);
  document.getElementById('info-2027').textContent=
    `Feriepenger 2027: ${kr(fp27)} (12% av faktisk overgangsårslønn ekskl. feriepenger). Gammel modell i 2026 påvirker 2027 kun via dette beløpet.`;

  document.getElementById('kpi-ny').textContent=kr(overgangsSum);
  const nyEksFpEl=document.getElementById('kpi-ny-eks-fp');
  if(nyEksFpEl){
    const nyEksFp=overgangsSum-p.feriepenger;
    nyEksFpEl.textContent=`Ekskl. feriepenger: ${kr(nyEksFp)}`;
  }
  document.getElementById('kpi-ny-lbl').textContent=`Ny modell (${pctLbl})`;
  document.getElementById('th-ny').textContent=`Ny modell (${pctLbl})`;
  document.getElementById('kpi-diff').textContent=(diffOvergang>=0?'+ ':'')+kr(Math.abs(diffOvergang));
  document.getElementById('kpi-diff').className='kpi-val '+(diffOvergang>=0?'green':'red');
  document.getElementById('kpi-diff-lbl').textContent=diffOvergang>=0?'Ny modell er bedre ↑':'Gammel modell er bedre ↓';

  const diffForskuddEl=document.getElementById('kpi-diff-forskudd');
  if(diffForskuddEl){
    if(p.garantiForskudd>0){
      const diffUtenForskudd=diffOvergang-p.garantiForskudd;
      const retning=diffUtenForskudd>=0?'Ny modell er bedre':'Gammel modell er bedre';
      const diffForskuddSign=diffUtenForskudd>=0?'+ ':'− ';
      const diffForskuddColor=diffUtenForskudd>=0?'#1a7a3d':'#b91c1c';
      diffForskuddEl.innerHTML=`<span class="kpi-subdiff-lbl">Reell differanse uten forskudd</span><span class="kpi-subdiff-val" style="color:${diffForskuddColor}">${diffForskuddSign}${kr(Math.abs(diffUtenForskudd))}</span><span class="kpi-subdiff-note">${retning}</span>`;
      diffForskuddEl.style.display='block';
    } else {
      diffForskuddEl.style.display='none';
    }
  }

  let html='';
  rows26.forEach((r,i)=>{
    const cls=r.erSpesial?' class="special-row"':'';
    let nyTekst,garTekst,diffTekst;
    if(r.fase==='gml'){
      nyTekst=`<span style="color:#bbb">–</span>`;
      garTekst=`<span style="color:#bbb">–</span>`;
      diffTekst=`<span style="color:#bbb">–</span>`;
    } else if(r.fase==='overgang'){
      nyTekst=`<span class="blue">${kr(r.ny)}</span>`;
      const maiDiff=r.ny-r.gml;
      garTekst=`<span style="color:#bbb">–</span>`;
      diffTekst=`<span class="${maiDiff>=0?'green':'red'}">${maiDiff>=0?'+':''} ${kr(Math.abs(maiDiff))}</span>`;
    } else {
      nyTekst=`<span class="blue">${kr(r.ny)}</span>`;
      const gar=r.garantiAndel>0?`<span style="color:#185fa5">${kr(r.garantiAndel)}</span>`:`<span style="color:#bbb">–</span>`;
      garTekst=gar;
      diffTekst=`<span class="${r.diff>=0?'green':'red'}">${r.diff>=0?'+':''} ${kr(Math.abs(r.diff))}</span>`;
    }
    html+=`<tr${cls}>
      <td>${MONTHS_K[i]}${r.erSpesial?' ★':''}</td><td class="col-arb">${r.arb}</td><td class="col-fakt">${r.faktTimer.toFixed(1)}</td>
      <td>${kr(r.omsetning)}</td><td>${kr(r.gml)}</td>
      <td>${nyTekst}</td><td class="col-garanti">${garTekst}</td><td>${diffTekst}</td>
    </tr>`;
  });
  const garTotal26=rows26.filter(r=>r.fase==='ny').reduce((s,r)=>s+r.garantiAndel,0);
  html+=`<tr class="total-row"><td>Totalt</td><td class="col-arb">–</td><td class="col-fakt">–</td>
    <td>${kr(omsetningTotal26)}</td><td>${kr(gmlTotal26)}</td>
    <td class="blue">${kr(overgangsSum)}</td>
    <td class="blue col-garanti">${garTotal26>0?kr(garTotal26):'–'}</td>
    <td class="${diffOvergang>=0?'green':'red'}">${diffOvergang>=0?'+':''} ${kr(Math.abs(diffOvergang))}</td>
  </tr>`;
  document.getElementById('tbl-body').innerHTML=html;

  let html27='';
  rows27.forEach((r,i)=>{
    const cls=r.erSpesial?' class="special-row"':'';
    const garTekst=r.garantiAndel>0?`<span style="color:#185fa5">${kr(r.garantiAndel)}</span>`:`<span style="color:#bbb">–</span>`;
    html27+=`<tr${cls}>
      <td>${MONTHS_K[i]}${r.erSpesial?' ★':''}</td><td class="col-arb">${r.arb}</td><td class="col-fakt">${r.faktTimer.toFixed(1)}</td>
      <td>${kr(r.omsetning)}</td><td>${kr(r.gml)}</td>
      <td class="blue">${kr(r.ny)}</td><td class="col-garanti">${garTekst}</td>
      <td class="${r.diff>=0?'green':'red'}">${r.diff>=0?'+':''} ${kr(Math.abs(r.diff))}</td>
    </tr>`;
  });
  const garTotal27=rows27.reduce((s,r)=>s+r.garantiAndel,0);
  html27+=`<tr class="total-row"><td>Totalt</td><td class="col-arb">–</td><td class="col-fakt">–</td>
    <td>${kr(omsetningTotal27)}</td><td>${kr(gmlTotal27)}</td>
    <td class="blue">${kr(nyTotal27)}</td>
    <td class="blue col-garanti">${garTotal27>0?kr(garTotal27):'–'}</td>
    <td class="${diff27>=0?'green':'red'}">${diff27>=0?'+':''} ${kr(Math.abs(diff27))}</td>
  </tr>`;
  document.getElementById('tbl-body-2027').innerHTML=html27;

  let fhtml='';
  rows26.forEach((r,i)=>{
    const f=fravær2026[i];
    const maxFerie = Math.max(0, r.arb - f.syk - f.uten);
    const maxSyk = Math.max(0, r.arb - f.ferie - f.uten);
    const maxUten = Math.max(0, r.arb - f.ferie - f.syk);
    fhtml+=`<tr>
      <td>${MONTHS_K[i]}</td>
      <td style="text-align:center"><input class="fravær-inp" type="number" inputmode="numeric" pattern="[0-9]*" min="0" max="${maxFerie}" value="${f.ferie}" onchange="setFravarDag(${i},'ferie',this.value,2026)"></td>
      <td style="text-align:center"><input class="fravær-inp" type="number" inputmode="numeric" pattern="[0-9]*" min="0" max="${maxSyk}" value="${f.syk}" onchange="setFravarDag(${i},'syk',this.value,2026)"></td>
      <td style="text-align:center"><input class="fravær-inp" type="number" inputmode="numeric" pattern="[0-9]*" min="0" max="${maxUten}" value="${f.uten}" onchange="setFravarDag(${i},'uten',this.value,2026)"></td>
      <td>${r.faktTimer.toFixed(1)}</td><td>${kr(r.omsetning)}</td>
    </tr>`;
  });
  document.getElementById('fravar-body').innerHTML=fhtml;

  let fhtml27='';
  rows27.forEach((r,i)=>{
    const f=fravær2027[i];
    const maxFerie = Math.max(0, r.arb - f.syk - f.uten);
    const maxSyk = Math.max(0, r.arb - f.ferie - f.uten);
    const maxUten = Math.max(0, r.arb - f.ferie - f.syk);
    fhtml27+=`<tr>
      <td>${MONTHS_K[i]}</td>
      <td style="text-align:center"><input class="fravær-inp" type="number" inputmode="numeric" pattern="[0-9]*" min="0" max="${maxFerie}" value="${f.ferie}" onchange="setFravarDag(${i},'ferie',this.value,2027)"></td>
      <td style="text-align:center"><input class="fravær-inp" type="number" inputmode="numeric" pattern="[0-9]*" min="0" max="${maxSyk}" value="${f.syk}" onchange="setFravarDag(${i},'syk',this.value,2027)"></td>
      <td style="text-align:center"><input class="fravær-inp" type="number" inputmode="numeric" pattern="[0-9]*" min="0" max="${maxUten}" value="${f.uten}" onchange="setFravarDag(${i},'uten',this.value,2027)"></td>
      <td>${r.faktTimer.toFixed(1)}</td><td>${kr(r.omsetning)}</td>
    </tr>`;
  });
  const fravarBody2027=document.getElementById('fravar-body-2027');
  if(fravarBody2027) fravarBody2027.innerHTML=fhtml27;

  if(activeTab==='graf') renderChart(rows26);
  saveState();
}

function renderChart(rows){
  if(!rows) rows=beregnAar(getParams(), {fravarData: fravær2026, arbDager: ARB_DAGER_2026});
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

function toggleEasterTheme(force){
  const on = typeof force==='boolean'
    ? force
    : !document.body.classList.contains('easter-theme');
  document.body.classList.toggle('easter-theme', on);

  const btn=document.getElementById('easter-theme-toggle');
  if(btn){
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-pressed', on?'true':'false');
    btn.textContent=on?'Påsketema: På':'Påsketema: Av';
  }
  const note=document.getElementById('easter-theme-note');
  if(note) note.textContent=on?'Påskefarger aktivert':'Aktiver påskefarger';
  if(on) renderEasterDecor();
  saveState();
}

function renderEasterDecor(){
  const decor=document.getElementById('easter-decor');
  if(!decor) return;
  const width=decor.clientWidth||window.innerWidth||0;
  const approxIconSlot=30; // icon + gap
  const iconCount=Math.max(14, Math.ceil(width/approxIconSlot)+2);
  const html=Array.from({length:iconCount},(_,i)=>{
    const icon=EASTER_DECOR_SEQUENCE[i%EASTER_DECOR_SEQUENCE.length];
    return `<span class="easter-icon">${icon}</span>`;
  }).join('');
  decor.innerHTML=html;
}

const resetLink=document.getElementById('reset-values-link');
if(resetLink){
  resetLink.addEventListener('click', (e)=>{
    e.preventDefault();
    clearStoredState();
  });
}

loadState();
if(localStorage.getItem(STORAGE_KEY)===null){
  toggleEasterTheme(true);
}
window.addEventListener('resize', renderEasterDecor);
renderEasterDecor();
setModell(modell, true);
setTab(activeTab);
updateUI();
