const ARS_DAGER = 260;
const G_DEFAULT = 136000; // 1. mai 2026
const STORAGE_KEY = 'newdeal-state-v1';

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
      modell,
      activeTab,
      values,
      fravær
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
    if(Array.isArray(state?.fravær)){
      state.fravær.slice(0,12).forEach((v,i)=>{
        if(!v) return;
        fravær[i].ferie=+v.ferie||0;
        fravær[i].syk=+v.syk||0;
        fravær[i].uten=+v.uten||0;
      });
    }
    if(state?.modell==='fp' || state?.modell==='fl') modell=state.modell;
    if(['tabell','fravar','ar2027','graf'].includes(state?.activeTab)) activeTab=state.activeTab;
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
    ?'Mai ★: feriepenger + garantilønn + provisjon utbetales 20. juni'
    :'Mai ★: feriepenger + garantilønn utbetales 20. juni';
  if(!keepValues){
    if(m==='fl'){document.getElementById('fastlonn').value=90000;document.getElementById('feriepenger').value=114000;}
    else{document.getElementById('fastlonn').value=65000;document.getElementById('feriepenger').value=115000;}
  }
  updateUI();
}

function setTab(t){
  activeTab=t;
  ['tabell','fravar','ar2027','graf'].forEach(id=>{
    document.getElementById('content-'+id).style.display=t===id?'block':'none';
    document.getElementById('tab-'+id).classList.toggle('active',t===id);
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
  const garantiTrekkDag=seksG/ARS_DAGER*stilling*garantiGulvFaktor;
  const sykKompDag=garantiTrekkDag;
  const spesialMnd=4;
  return{timepris,fastlonn,tillegg,stilling,provSats,feriepenger,nyPct:effektivSats,
    fastlonnActual,innslagspunkt,ferietrekkDag,ferietrekkGml,ferieJusteringNy,
    sykKompDag,garantilonn,garantiTrekkDag,garantiGulvFaktor,spesialMnd};
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
    const tilleggMnd=(is2027||i>=5)?0:p.tillegg;

    let gml, maiOvergang;
    if(modell==='fp'){
      if(i===p.spesialMnd){
        gml=p.fastlonn+tilleggMnd+prov+p.feriepenger-25*p.ferietrekkDag;
        maiOvergang=prov+p.feriepenger-p.ferietrekkGml+p.garantilonn;
      } else {
        gml=p.fastlonn+tilleggMnd+prov;
        maiOvergang=null;
      }
    } else {
      if(i===p.spesialMnd){
        gml=p.fastlonn+tilleggMnd+p.feriepenger-25*p.ferietrekkDag;
        maiOvergang=p.feriepenger-p.ferietrekkGml+p.garantilonn;
      } else {
        gml=p.fastlonn+tilleggMnd;
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
    const ferieJustering=(!is2027&&i===p.spesialMnd)?p.ferieJusteringNy:0;
    const ny=(i===p.spesialMnd&&!is2027)
      ?(maiOvergang+ferieJustering)
      :(i===p.spesialMnd?nyMedGulv+fp+ferieJustering:nyMedGulv);
    const fase=i<p.spesialMnd?'gml':i===p.spesialMnd?'overgang':'ny';

    return{arb,faktTimer,omsetning,gml,ny,diff:ny-gml,erSpesial:i===p.spesialMnd,garantiAndel,fase};
  });
}

function updateUI(){
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

  const spesialNavn=modell==='fp'?'Mai':'Juni';
  const spesialUtbetalt=modell==='fp'?'juni':'juli';
  const juniNote=document.getElementById('juni-note-2026');
  if(juniNote) juniNote.textContent=` ${spesialNavn} ★ er spesialmåned i 2026: feriepenger utbetales 20. ${spesialUtbetalt} — kun dette året.`;

  const rows26=beregnAar(p);
  const gmlTotal26=rows26.reduce((s,r)=>s+r.gml,0);
  const omsetningTotal26=rows26.reduce((s,r)=>s+r.omsetning,0);

  const sumJanAprGml26=rows26.filter(r=>r.fase==='gml').reduce((s,r)=>s+r.gml,0);
  const sumMaiOvergang26=rows26.find(r=>r.fase==='overgang')?.ny||0;
  const sumJunDesNy26=rows26.filter(r=>r.fase==='ny').reduce((s,r)=>s+r.ny,0);
  const overgangsSum=sumJanAprGml26+sumMaiOvergang26+sumJunDesNy26;
  const diffOvergang=overgangsSum-gmlTotal26;

  const fp27=(overgangsSum-p.feriepenger)*0.12;
  const rows27=beregnAar(p,fp27,true);
  const nyTotal27=rows27.reduce((s,r)=>s+r.ny,0);
  const gmlTotal27=rows27.reduce((s,r)=>s+r.gml,0);
  const diff27=nyTotal27-gmlTotal27;

  const pctLbl=Math.round(p.nyPct*100)+'%';

  const omsetningTotal27=rows27.reduce((s,r)=>s+r.omsetning,0);

  document.getElementById('kpi-gml').textContent=kr(gmlTotal26);
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
    `Feriepenger 2027: ${kr(fp27)} (12% av faktisk overgangsårslønn ekskl. feriepenger)`;

  document.getElementById('kpi-ny').textContent=kr(overgangsSum);
  document.getElementById('kpi-ny-lbl').textContent=`Ny modell (${pctLbl})`;
  document.getElementById('th-ny').textContent=`Ny modell (${pctLbl})`;
  document.getElementById('kpi-diff').textContent=(diffOvergang>=0?'+ ':'')+kr(Math.abs(diffOvergang));
  document.getElementById('kpi-diff').className='kpi-val '+(diffOvergang>=0?'green':'red');
  document.getElementById('kpi-diff-lbl').textContent=diffOvergang>=0?'Ny modell er bedre ↑':'Gammel modell er bedre ↓';

  const diffInklTillegg=overgangsSum-(gmlTotal26+8*p.tillegg);
  const diffTilleggEl=document.getElementById('kpi-diff-tillegg');
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
    const f=fravær[i];
    fhtml+=`<tr>
      <td>${MONTHS_K[i]}</td>
      <td style="text-align:center"><input class="fravær-inp" type="number" min="0" max="30" value="${f.ferie}" oninput="fravær[${i}].ferie=+this.value;updateUI()"></td>
      <td style="text-align:center"><input class="fravær-inp" type="number" min="0" max="30" value="${f.syk}" oninput="fravær[${i}].syk=+this.value;updateUI()"></td>
      <td style="text-align:center"><input class="fravær-inp" type="number" min="0" max="30" value="${f.uten}" oninput="fravær[${i}].uten=+this.value;updateUI()"></td>
      <td>${r.faktTimer.toFixed(1)}</td><td>${kr(r.omsetning)}</td>
    </tr>`;
  });
  document.getElementById('fravar-body').innerHTML=fhtml;

  if(activeTab==='graf') renderChart(rows26);
  saveState();
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

const resetLink=document.getElementById('reset-values-link');
if(resetLink){
  resetLink.addEventListener('click', (e)=>{
    e.preventDefault();
    clearStoredState();
  });
}

loadState();
setModell(modell, true);
setTab(activeTab);
updateUI();
