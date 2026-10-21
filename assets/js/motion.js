/* Orangesoft motion layer: shared, subtle, respects reduced motion.
   - scroll-reveal for cards and section headers (fades up once)
   - hover lift on cards, button and link feedback, focus ring, smooth anchor scroll */
(function(){
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var css=
  /* focus */
  ':focus-visible{outline:3px solid rgba(237,115,48,.45);outline-offset:3px;border-radius:6px;}'+
  /* buttons */
  '.btn,.header-cta,.gr-cta,.ask-go,.fc-btn,.fc-btn-ghost,.btn-secondary{transition:transform .22s cubic-bezier(.2,.7,.2,1),box-shadow .22s ease,background-color .22s ease,border-color .22s ease,color .22s ease;}'+
  '.btn:hover,.header-cta:hover,.gr-cta:hover,.ask-go:hover,.fc-btn:hover,.fc-btn-ghost:hover,.btn-secondary:hover{transform:translateY(-2px);}.btn:active,.header-cta:active,.gr-cta:active,.ask-go:active,.fc-btn:active{transform:translateY(0);box-shadow:none;}'+
  '.btn-primary:hover,.header-cta:hover,.gr-cta:hover,.ask-go:hover{background:#d9611f;box-shadow:0 12px 24px rgba(237,115,48,.30);}'+
  '.btn-outline:hover{border-color:#ed7330;color:#b4530b;box-shadow:0 8px 18px rgba(0,0,0,.06);}'+
  '.btn .arrow{transition:transform .22s cubic-bezier(.2,.7,.2,1);}.btn:hover .arrow{transform:translateX(3px);}'+
  /* links and small controls */
  '.ac-more,.lf-fix,.eco-link,.lz-fix,.rc-chip,.ex-tab,.dd-item,.m-links a,footer a,.nav-pill a{transition:color .2s ease,background-color .2s ease,border-color .2s ease,transform .2s ease,box-shadow .2s ease;}'+
  '.ac-more .mi,.lf-fix .mi,.eco-link .mi{transition:transform .2s ease;}.ac-more:hover .mi,.lf-fix:hover .mi,.eco-link:hover .mi{transform:translateX(3px);}'+
  '.rc-chip:hover{transform:translateY(-1px);box-shadow:0 6px 14px rgba(0,0,0,.06);}'+
  /* card hover lift */
  '.ao-lk,.ao-bc,.ao-vc,.lf-card,.pb-card,.tm,.ac,.ft-tile,.plan-mini,.fcard,.wb-card,.pl-card,.st-layer,.cred-tile,.gr-card{transition:transform .3s cubic-bezier(.2,.7,.2,1),box-shadow .3s ease,border-color .3s ease;}'+
  '.ao-lk:hover,.ao-bc:hover,.lf-card:hover,.pb-card:hover,.ft-tile:hover,.wb-card:hover,.pl-card:hover,.fcard:hover,.cred-tile:hover,.tm:hover{transform:translateY(-4px);box-shadow:0 16px 32px rgba(11,9,8,.08);}'+
  '.ao-bc:hover,.ao-lk:hover,.lf-card:hover{border-color:#f6c79b;}'+
  /* scroll reveal */
  'html.mo-js .mo-r{opacity:0;transform:translateY(20px);transition:opacity .65s ease,transform .65s cubic-bezier(.2,.7,.2,1);}'+
  'html.mo-js .mo-r.mo-in{opacity:1;transform:none;}'+
  'html{scroll-behavior:smooth;}';
  var reduceCss='@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{transition-duration:.01ms !important;animation-duration:.01ms !important;animation-iteration-count:1 !important;}html.mo-js .mo-r{opacity:1;transform:none;}}';
  var st=document.createElement('style');st.textContent=css+reduceCss;document.head.appendChild(st);
  if(reduce||!('IntersectionObserver' in window))return;

  var SEL='.section-header,.ao-lk,.ao-bc,.ao-fs,.ao-vc,.ao-band,.ao-end,.st-layer,.st-join,.lf-card,.lf-stat,.pb-card,.tm,.ac,.ft-tile,.plan-mini,.fcard,.wb-card,.pl-card,.gr-card,.cred-tile,.qa,.ft-act,.stat-col,.hx-term';
  function skip(el){return el.closest('.an,.pain-section,.eco-card,.au-scan,.m-menu,header,.nav-pill,.ex-panels');}
  function init(){
    document.documentElement.classList.add('mo-js');
    var els=[].slice.call(document.querySelectorAll(SEL)).filter(function(el){return !skip(el);});
    var vh=window.innerHeight;
    var targets=els.filter(function(el){return el.getBoundingClientRect().top>vh*0.92;});
    var groups=new Map();
    targets.forEach(function(el){
      var p=el.parentElement;var i=groups.get(p)||0;groups.set(p,i+1);
      el.style.transitionDelay=Math.min(i,5)*70+'ms';
      el.classList.add('mo-r');
    });
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(!e.isIntersecting)return;
        var el=e.target;io.unobserve(el);
        el.classList.add('mo-in');
        setTimeout(function(){el.classList.remove('mo-r','mo-in');el.style.transitionDelay='';},1200);
      });
    },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    targets.forEach(function(el){io.observe(el);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
