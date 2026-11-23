
// ===== Interface (banco, draw e grade vêm de src/bank.part.js) =====
const $=id=>document.getElementById(id);
const KEY='simulado4b:tentativa:v1';
const THEME_KEY='simulado4b:tema';
const shortLabels={p:'Português',g:'Gerais',e:'Específicos'};
const store={
 get(k){try{return JSON.parse(localStorage.getItem(k))}catch{return null}},
 set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}
};
let S=null;
let ticker=null;

function el(tag,text,className){
 const n=document.createElement(tag);
 if(text!==undefined&&text!==null) n.textContent=text;
 if(className) n.className=className;
 return n;
}
function link(title,key){
 const a=el('a',title);a.href=sources[key];a.target='_blank';a.rel='noopener noreferrer';return a;
}
const save=()=>store.set(KEY,S);
const cur=()=>S.questions[S.cursor];
const answered=q=>Object.hasOwn(S.answers,q.id);
const locked=q=>S.submitted||(S.mode==='estudo'&&answered(q));
const outcome=q=>!answered(q)?'blank':S.answers[q.id]===q.correct?'right':'wrong';
const isMarked=q=>S.marked.includes(q.id);
const fmtTime=ms=>{const s=Math.max(0,Math.floor(ms/1000));return [s/3600,s/60%60,s%60].map(v=>String(Math.floor(v)).padStart(2,'0')).join(':')};

// ---------- telas ----------
function show(screen){
 for(const id of ['start','exam','result']) $(id).hidden=id!==screen;
 document.body.classList.toggle('exam-on',screen==='exam');
 $('timer').hidden=!S||screen==='start';
 closeSide();
 window.scrollTo({top:0});
}
function startTicker(){
 clearInterval(ticker);
 const upd=()=>{if(S) $('timer').textContent=fmtTime((S.finishedAt||Date.now())-S.startedAt)};
 upd();
 if(!S.finishedAt) ticker=setInterval(upd,1000);
}

// ---------- início ----------
function refreshStart(){
 const saved=store.get(KEY);
 const btn=$('resume');
 if(saved?.questions?.length){
  const n=Object.keys(saved.answers||{}).length;
  btn.textContent=saved.submitted?'Ver último resultado':'Continuar tentativa · '+n+'/'+saved.questions.length+' respondidas';
  btn.hidden=false;
 } else btn.hidden=true;
}
function begin(){
 const saved=store.get(KEY);
 if(saved&&!saved.submitted&&Object.keys(saved.answers||{}).length&&
    !confirm('Há uma tentativa em andamento. Descartá-la e gerar outro simulado?')) return;
 const mode=document.querySelector('input[name=mode]:checked').value;
 S={questions:draw(saved?.questions?.map(q=>q.id)||[]),answers:{},marked:[],cursor:0,submitted:false,mode,startedAt:Date.now(),finishedAt:null,filter:'all'};
 save();
 openExam(0);
}
function resume(){
 S=store.get(KEY);
 if(!S) return refreshStart();
 S.marked??=[];S.filter??='all';
 startTicker();
 if(S.submitted) openResult(); else openExam(S.cursor||0);
}

// ---------- prova ----------
function openExam(index){
 show('exam');
 startTicker();
 go(index,false);
}
function go(index,focus=true){
 S.cursor=Math.max(0,Math.min(S.questions.length-1,index));
 save();
 render();
 closeSide();
 if(focus){$('qnum').focus({preventScroll:true});window.scrollTo({top:0,behavior:'smooth'})}
}
function matches(i){
 const q=S.questions[i];
 switch(S.filter){
  case 'marked':return isMarked(q);
  case 'blank':return !answered(q);
  case 'wrong':return outcome(q)!=='right'&&locked(q);
  default:return true;
 }
}
function neighbor(dir){
 for(let i=S.cursor+dir;i>=0&&i<S.questions.length;i+=dir) if(matches(i)) return i;
 return -1;
}
function step(dir){
 const i=neighbor(dir);
 if(i>-1) go(i);
 else if(dir>0&&!S.submitted) submit();
}
function choose(index){
 const q=cur();
 if(locked(q)||!q.options[index]) return;
 S.answers[q.id]=q.options[index];
 save();
 render();
 const input=$('choices').querySelectorAll('input')[index];
 input?.focus({preventScroll:true});
}
function toggleMark(){
 const q=cur();
 S.marked=isMarked(q)?S.marked.filter(id=>id!==q.id):[...S.marked,q.id];
 save();
 render();
}
function renderQuestion(q){
 const box=$('question');
 box.replaceChildren();
 const cut=q.question.indexOf('\n\n');
 if(cut<0){box.append(el('p',q.question,'q-text'));return}
 box.append(el('p',q.question.slice(0,cut),'q-text'));
 const rest=q.question.slice(cut+2);
 if(/Python|JavaScript/.test(q.topic)){
  const pre=el('pre',undefined,'code');pre.append(el('code',rest));box.append(pre);
 } else box.append(el('p',rest,'q-text q-cases'));
}
function render(){
 const q=cur();
 const response=S.answers[q.id];
 const lock=locked(q);
 $('chip').textContent=shortLabels[q.block];
 $('chip').className='chip '+q.block;
 $('topic').textContent=q.topic;
 $('qnum').textContent='Questão '+(S.cursor+1)+' de '+S.questions.length;
 renderQuestion(q);
 const mark=$('mark');
 mark.setAttribute('aria-pressed',String(isMarked(q)));
 mark.textContent=isMarked(q)?'⚑ Marcada':'⚑ Marcar p/ revisar';
 mark.hidden=S.submitted;

 $('choices').replaceChildren(...q.options.map((option,i)=>{
  const label=el('label',undefined,'choice');
  const input=el('input');
  input.type='radio';input.name='opt';input.value=String(i);
  input.checked=response===option;input.disabled=lock;
  input.addEventListener('change',()=>choose(i));
  const txt=el('span',option,'txt');
  if(lock){
   label.classList.add('locked');
   if(option===q.correct){label.classList.add('good');txt.append(el('span','Correta','tag ok'))}
   else if(option===response) label.classList.add('bad');
   if(option===response) txt.append(el('span','Sua resposta','tag you'));
  }
  label.append(input,el('span','ABCD'[i],'letter'),txt);
  return label;
 }));

 const fb=$('feedback');
 fb.hidden=!lock;
 if(lock){
  const o=outcome(q);
  fb.className='feedback '+o;
  fb.replaceChildren(el('strong',{right:'✓ Acertou',wrong:'✗ Errou',blank:'○ Em branco'}[o]),el('p',q.explanation),el('p',q.origin,'muted small'));
  if(q.source) fb.append(link(q.origin.startsWith('Adaptada')?'Caderno da prova de origem':'Consultar fonte',q.source));
 }

 const prev=neighbor(-1),next=neighbor(1);
 $('back').disabled=$('m-back').disabled=prev<0;
 const nextLabel=next>-1?'Próxima →':S.submitted?'Fim':'Revisar e entregar';
 $('next').textContent=nextLabel;
 $('next').disabled=$('m-next').disabled=next<0&&S.submitted;
 renderSide();
}
function renderSide(){
 const total=S.questions.length;
 const count=Object.keys(S.answers).length;
 $('meter-fill').style.width=(count/total*100)+'%';
 $('progress-text').textContent=count+' de '+total+' respondidas'+(S.marked.length?' · '+S.marked.length+' marcadas':'')+(S.submitted?' · revisão':'');
 $('m-card').textContent='▦ '+count+'/'+total;
 $('m-card').setAttribute('aria-label','Abrir cartão-resposta, '+count+' de '+total+' respondidas');
 $('submit').hidden=S.submitted;
 $('show-result').hidden=!S.submitted;

 const filters=[['all','Todas'],['blank','Em branco'],['marked','Marcadas']];
 if(S.submitted||S.mode==='estudo') filters.push(['wrong',S.submitted?'Erradas e brancas':'Erradas']);
 $('filters').replaceChildren(...filters.map(([key,text])=>{
  const b=el('button',text);b.type='button';
  b.setAttribute('aria-pressed',String(S.filter===key));
  b.addEventListener('click',()=>{S.filter=key;save();render()});
  return b;
 }));

 const groups=['p','g','e'].map(block=>{
  const wrap=el('div',undefined,'navgroup '+block);
  wrap.append(el('h3',shortLabels[block]));
  const grid=el('div',undefined,'grid');
  S.questions.forEach((q,i)=>{
   if(q.block!==block) return;
   const b=el('button',i+1);b.type='button';
   const o=outcome(q),rev=locked(q);
   if(rev) b.classList.add(o==='blank'?'blank-r':o);
   else if(answered(q)) b.classList.add('done');
   if(isMarked(q)) b.classList.add('marked');
   if(i===S.cursor){b.classList.add('current');b.setAttribute('aria-current','true')}
   if(!matches(i)) b.classList.add('dim');
   const state=rev?{right:'correta',wrong:'incorreta',blank:'em branco'}[o]:answered(q)?'respondida':'em branco';
   b.setAttribute('aria-label','Questão '+(i+1)+', '+state+(isMarked(q)?', marcada':''));
   b.addEventListener('click',()=>go(i));
   grid.append(b);
  });
  wrap.append(grid);
  return wrap;
 });
 $('navigator').replaceChildren(...groups);

 const legend=S.submitted||S.mode==='estudo'
  ?[['var(--ok-soft)','Certa'],['var(--bad-soft)','Errada'],['var(--warn-soft)','Em branco'],['var(--warn)','Marcada']]
  :[['var(--brand-soft)','Respondida'],['var(--surface)','Em branco'],['var(--warn)','Marcada']];
 $('legend').replaceChildren(...legend.map(([c,t])=>{const s=el('span');const i=el('i');i.style.background=c;s.append(i,t);return s}));
}
function openSide(){$('side').classList.add('open');$('backdrop').hidden=false;$('close-side').focus()}
function closeSide(){$('side').classList.remove('open');$('backdrop').hidden=true}

// ---------- entrega e resultado ----------
function submit(){
 const blank=S.questions.filter(q=>!answered(q)).length;
 const marked=S.marked.length;
 const warn=[blank&&blank+' em branco',marked&&marked+' marcada(s) para revisar'].filter(Boolean).join(' e ');
 if(!confirm(warn?'Há '+warn+'. Entregar mesmo assim?':'Entregar o simulado?')) return;
 S.submitted=true;S.finishedAt=Date.now();S.filter='all';
 save();
 startTicker();
 openResult();
}
function openResult(){
 show('result');
 const sc=grade(S.questions,S.answers);
 const blank=S.questions.filter(q=>!answered(q)).length;
 const wrong=S.questions.length-blank-sc.hits;
 const area=$('result');
 area.replaceChildren();

 const top=el('div',undefined,'res-top');
 const ring=el('div',undefined,'score '+(sc.pass?'pass':'fail'));
 ring.style.setProperty('--v',sc.points);
 const inner=el('div');inner.append(el('b',sc.points.toLocaleString('pt-BR')),el('span','de 100 pontos','muted small'));
 ring.append(inner);
 const info=el('div');
 const h=el('h2','Resultado do simulado');h.tabIndex=-1;
 const stats=el('div',undefined,'stats');
 for(const [v,t] of [[sc.hits,'acertos'],[wrong,'erros'],[blank,'em branco'],[fmtTime(S.finishedAt-S.startedAt),'tempo']]){
  const d=el('div');d.append(el('b',v),el('span',t,'muted small'));stats.append(d);
 }
 info.append(h,el('p',sc.pass?'Atingiu os critérios mínimos da objetiva.':'Ficou abaixo dos critérios mínimos da objetiva.','verdict '+(sc.pass?'pass':'fail')),stats);
 top.append(ring,info);

 const bars=el('div',undefined,'bars');
 for(const b of ['p','g','e']){
  const row=el('div',undefined,'bar-row '+b);
  const bar=el('div',undefined,'bar');const fill=el('div');fill.style.width=(sc.totals[b]/quotas[b]*100)+'%';bar.append(fill);
  row.append(el('span',shortLabels[b]),bar,el('b',sc.totals[b]+'/'+quotas[b]));
  bars.append(row);
 }

 const byTopic=new Map();
 for(const q of S.questions){
  if(outcome(q)==='right') continue;
  byTopic.set(q.topic,(byTopic.get(q.topic)||0)+1);
 }
 const sec=el('div',undefined,'res-section');
 sec.append(el('h3','Onde você mais perdeu pontos'));
 if(byTopic.size){
  const ul=el('ul',undefined,'topics');
  for(const [t,n] of [...byTopic].sort((a,b)=>b[1]-a[1]).slice(0,8)){
   const li=el('li');li.append(el('span',t),el('b',n+(n>1?' questões':' questão')));ul.append(li);
  }
  sec.append(ul);
 } else sec.append(el('p','Nenhum erro. Gabaritou!','muted'));

 const actions=el('div',undefined,'actions');
 const mk=(text,cls,fn)=>{const b=el('button',text,'btn '+cls);b.type='button';b.addEventListener('click',fn);return b};
 const firstMiss=S.questions.findIndex(q=>outcome(q)!=='right');
 if(firstMiss>-1) actions.append(mk('Revisar erros e brancos','primary',()=>{S.filter='wrong';openExam(firstMiss)}));
 actions.append(mk('Revisar todas','',()=>{S.filter='all';openExam(0)}),mk('Novo simulado','ghost',()=>{show('start');refreshStart()}));

 area.append(top,bars,sec,actions);
 h.focus({preventScroll:true});
}

// ---------- tema ----------
function applyTheme(t){
 if(t) document.documentElement.dataset.theme=t; else delete document.documentElement.dataset.theme;
}
$('theme').addEventListener('click',()=>{
 const dark=document.documentElement.dataset.theme?document.documentElement.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
 const next=dark?'light':'dark';
 applyTheme(next);store.set(THEME_KEY,next);
});
applyTheme(store.get(THEME_KEY));

// ---------- eventos ----------
$('begin').addEventListener('click',begin);
$('resume').addEventListener('click',resume);
$('restart').addEventListener('click',()=>{show('start');refreshStart()});
$('back').addEventListener('click',()=>step(-1));
$('next').addEventListener('click',()=>step(1));
$('m-back').addEventListener('click',()=>step(-1));
$('m-next').addEventListener('click',()=>step(1));
$('m-card').addEventListener('click',openSide);
$('close-side').addEventListener('click',closeSide);
$('backdrop').addEventListener('click',closeSide);
$('mark').addEventListener('click',toggleMark);
$('submit').addEventListener('click',submit);
$('show-result').addEventListener('click',openResult);
document.addEventListener('keydown',e=>{
 if($('exam').hidden||e.ctrlKey||e.metaKey||e.altKey) return;
 if(e.key==='Escape') return closeSide();
 const k=e.key.toLowerCase();
 const onRadio=e.target.matches?.('input[type=radio]');
 const pick={a:0,b:1,c:2,d:3,1:0,2:1,3:2,4:3}[k];
 if(pick!==undefined){e.preventDefault();choose(pick)}
 else if(k==='m'&&!S.submitted){e.preventDefault();toggleMark()}
 else if(!onRadio&&(k==='arrowright'||k==='arrowleft')){e.preventDefault();step(k==='arrowright'?1:-1)}
});

$('bank-info').textContent=bank.length.toLocaleString('pt-BR')+' questões no banco · Funciona offline · Progresso salvo neste navegador';
for(const [title,key] of [['Edital 001/2026 e aditivos','edital'],['Regimento Interno de Quatro Barras','regimento'],['Consulpam · Analista de Licitações e Contratos','analista'],['Consulpam · Técnico de Compras','compras'],['Lei 14.133/2021','lei'],['Lei 4.320/1964','fin'],['Manual de Redação Oficial do Paraná','redacao'],['Lei de Responsabilidade Fiscal','lrf'],['Técnica legislativa · Lei Complementar 95/1998','tecnica'],['Constituição Federal','cf']]){
 const li=el('li');li.append(link(title,key));$('links').append(li);
}
refreshStart();
</script>
</body>
</html>
