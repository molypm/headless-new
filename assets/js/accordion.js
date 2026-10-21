/* FAQ accordion: smooth open/close, one question open at a time per list. */
(function(){
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DUR=320,EASE='cubic-bezier(.4,0,.2,1)';
  var st=document.createElement('style');
  st.textContent='.qa summary::after,.qa[open] summary::after{content:"+" !important;display:inline-block;transition:transform .3s cubic-bezier(.4,0,.2,1);}'+
    '.qa[open] summary::after{transform:rotate(45deg);}.qa.is-closing summary::after{transform:none;}'+
    '.qa{transition:border-color .3s ease,box-shadow .3s ease;}.qa[open]{border-color:#f6c79b;box-shadow:0 10px 26px rgba(237,115,48,.08);}'+
    '.qa.is-closing{border-color:#e7e2dc;box-shadow:none;}'+
    '.qa summary{transition:color .2s ease;}.qa summary:hover{color:#b4530b;}';
  document.head.appendChild(st);

  function body(d){return d.querySelector('.qa-body')||d.querySelector('summary ~ *');}
  function run(el,from,to,done){
    if(reduce||!el.animate){done();return;}
    el.style.overflow='hidden';
    var a=el.animate([{height:from+'px',opacity:from?1:0},{height:to+'px',opacity:to?1:0}],{duration:DUR,easing:EASE});
    a.onfinish=a.oncancel=function(){el.style.overflow='';done();};
  }
  function openIt(d){
    var b=body(d);d.open=true;d.classList.remove('is-closing');
    if(!b)return;
    var h=b.offsetHeight;run(b,0,h,function(){});
  }
  function closeIt(d){
    var b=body(d);d.classList.add('is-closing');
    if(!b){d.open=false;d.classList.remove('is-closing');return;}
    var h=b.offsetHeight;
    run(b,h,0,function(){d.open=false;d.classList.remove('is-closing');});
  }
  document.addEventListener('click',function(e){
    var sum=e.target.closest&&e.target.closest('details.qa > summary');
    if(!sum)return;
    e.preventDefault();
    var d=sum.parentElement;
    if(d.classList.contains('is-closing'))return;
    if(d.open){closeIt(d);return;}
    var list=d.closest('.qa-list')||d.parentElement;
    list.querySelectorAll('details.qa[open]').forEach(function(o){if(o!==d)closeIt(o);});
    openIt(d);
  });
})();
