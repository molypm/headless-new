/* Ollie launcher: replaces the floating WhatsApp button. UI mirrors chatbot-mockup.html. Mockup behaviour; wire to the live chat widget in the build. */
(function(){
var WA='https://wa.me/60127888000?text='+encodeURIComponent("Hi Orangesoft, I'd like to know more about your website packages.");
var root=document.createElement('div');root.className='ol';
root.innerHTML=
'<div class="ol-tip" id="olTip" hidden><button type="button" class="ol-x" aria-label="Dismiss"><span class="mi">close</span></button><b>Ollie</b> Slow website? Send me your URL and I will check it in seconds.</div>'+
'<section class="ol-panel" id="olPanel" role="dialog" aria-label="Chat with Ollie" hidden>'+
 '<div class="ol-hd"><span class="ol-av">O<i></i></span><div class="ol-who"><b>Ollie</b><small>Orangesoft · AI sales assistant</small></div>'+
  '<div class="ol-hr"><button type="button" class="ol-lang" id="olLang" aria-haspopup="true" aria-expanded="false" aria-label="Reply language"><span class="mi">language</span><span id="olLangT">Auto</span><span class="mi ol-car">expand_more</span></button>'+
  '<button type="button" class="ol-callb" id="olCall" aria-label="Talk to Ollie"><span class="mi">call</span></button>'+
  '<button type="button" class="ol-cl" id="olClose" aria-label="Close chat"><span class="mi">close</span></button></div></div>'+
 '<div class="ol-strip" aria-label="Ollie replies in any language"><div><div class="ol-sc"><span><span>Hello</span><span>Selamat datang</span><span>你好</span><span>வணக்கம்</span><span>مرحبا</span><span>こんにちは</span><span>Bonjour</span><span>สวัสดี</span><span>Hola</span><span>안녕하세요</span><span>नमस्ते</span><span>Xin chào</span><span>Hallo</span><span>Привет</span><span>Olá</span><span>Kumusta</span><span>হ্যালো</span><span>Merhaba</span><span>Ciao</span><span>Jambo</span></span><span aria-hidden="true"><span>Hello</span><span>Selamat datang</span><span>你好</span><span>வணக்கம்</span><span>مرحبا</span><span>こんにちは</span><span>Bonjour</span><span>สวัสดี</span><span>Hola</span><span>안녕하세요</span><span>नमस्ते</span><span>Xin chào</span><span>Hallo</span><span>Привет</span><span>Olá</span><span>Kumusta</span><span>হ্যালো</span><span>Merhaba</span><span>Ciao</span><span>Jambo</span></span></div></div></div>'+
 '<div class="ol-msgs" id="olMsgs" aria-live="polite"><div class="ol-row"><span class="ol-mini">O</span><p class="ol-bub">Hi, I am Ollie from Orangesoft. Write to me in any language, the way you normally talk. I can check your website, answer pricing questions, or take a call.</p></div></div>'+
 '<div class="ol-chips" id="olChips"><a href="audit-page.html"><span class="mi">speed</span>Check my website</a><a href="chatbot-mockup.html"><span class="mi">call</span>Talk instead of typing</a><a href="pricing-page.html">What does it cost?</a><a href="'+WA+'" target="_blank" rel="noopener"><span class="mi">forward_to_inbox</span>Talk to sales</a></div>'+
 '<form class="ol-comp" id="olForm"><input id="olInp" type="text" placeholder="Type in any language or short form..." autocomplete="off" aria-label="Message"><button type="button" class="ol-mic" id="olMic" aria-label="Talk to Ollie"><span class="mi">mic</span></button><button type="submit" class="ol-snd" aria-label="Send"><span class="mi">arrow_upward</span></button></form>'+
 '<div class="ol-menu" id="olMenu" hidden><div class="ol-mh"><strong><span class="mi">language</span>Reply language</strong><button type="button" class="ol-cl" id="olMenuX" aria-label="Close"><span class="mi">close</span></button></div><div class="ol-mb">'+
  '<button type="button" class="ol-auto on" data-l="Auto"><span class="mi">auto_awesome</span><span><b>Auto-detect</b><small>Ollie follows the language you write, and switches when you do</small></span><i class="ol-chk"><span class="mi">check</span></i></button>'+
  '<label class="ol-search"><span class="mi">search</span><input id="olSearch" type="text" placeholder="Search any language" autocomplete="off" aria-label="Search language"></label>'+
  '<div class="ol-grid" id="olGrid"></div></div></div>'+
 '<div class="ol-call" id="olCallV" hidden><div class="ol-orbw"><div class="ol-orb b"></div><div class="ol-orb c"></div><div class="ol-orb"></div></div><h3>Ollie</h3><div class="st">Speak in any language</div><div class="ol-tm" id="olTime">00:00</div><div class="sp"></div><button type="button" class="ol-end" id="olEnd"><span class="mi">call_end</span>End call</button></div>'+
'</section>'+
'<button type="button" class="ol-fab" id="olFab" aria-expanded="false" aria-controls="olPanel"><span class="ol-av">O<i></i></span><span>Ask Ollie</span></button>';
root.innerHTML=root.innerHTML;
document.body.appendChild(root);
var $=function(i){return document.getElementById(i)};
var fab=$('olFab'),panel=$('olPanel'),tip=$('olTip'),menu=$('olMenu'),msgs=$('olMsgs'),dismissed=false,lang='Auto',timer=null,last='';
function open(o){panel.hidden=!o;fab.setAttribute('aria-expanded',o);root.classList.toggle('is-open',o);if(o)tip.hidden=true;else{menu.hidden=true;endCall();}}
function scrl(){msgs.scrollTop=msgs.scrollHeight;}
function msg(t,u){var d=document.createElement('div');d.className='ol-row'+(u?' u':'');d.innerHTML=(u?'':'<span class="ol-mini">O</span>')+'<p class="ol-bub"></p>';d.querySelector('p').textContent=t;msgs.appendChild(d);scrl();return d;}
function typ(){var d=document.createElement('div');d.className='ol-row';d.innerHTML='<span class="ol-mini">O</span><span class="ol-typ"><i></i><i></i><i></i></span>';msgs.appendChild(d);scrl();return d;}
function note(t){var d=document.createElement('div');d.className='ol-sys';d.innerHTML='<span class="mi">translate</span>';d.appendChild(document.createTextNode(t));msgs.appendChild(d);scrl();}
var LANGS=[['English','EN'],['Bahasa Melayu','BM'],['中文','中'],['தமிழ்','த'],['日本語','あ'],['한국어','한'],['ไทย','ก'],['Tiếng Việt','Vi'],['Bahasa Indonesia','ID'],['हिन्दी','हि'],['العربية','ع'],['Français','Fr'],['Español','Es'],['Deutsch','De'],['Русский','Ру'],['Português','Pt'],['Filipino','Fil'],['বাংলা','বা'],['Italiano','It'],['Türkçe','Tr']];
function grid(q){q=(q||'').toLowerCase().trim();var g=$('olGrid'),h='',n=0;LANGS.forEach(function(x){if(!q||x[0].toLowerCase().indexOf(q)>-1){n++;h+='<button type="button" data-l="'+x[0]+'" class="'+(x[0]===lang?'on':'')+'"><b>'+x[1]+'</b><span>'+x[0]+'</span></button>';}});
 if(q&&!n){var v=q.replace(/[<>&"]/g,'');h='<button type="button" class="ol-use" data-l="'+v+'"><span class="mi">add</span>Use “'+v+'”</button>';}
 else if(!q)h+='<div class="ol-more">…and many more. Search or just type.</div>';g.innerHTML=h;}
function setLang(l){lang=l;$('olLangT').textContent=l==='Auto'?'Auto':(l.length>9?l.slice(0,9)+'…':l);$('olLang').classList.toggle('set',l!=='Auto');menu.querySelector('.ol-auto').classList.toggle('on',l==='Auto');grid($('olSearch').value);}
function detect(t){if(/[一-鿿]/.test(t))return '中文';if(/[஀-௿]/.test(t))return 'தமிழ்';if(/[぀-ヿ]/.test(t))return '日本語';if(/[가-힯]/.test(t))return '한국어';if(/[฀-๿]/.test(t))return 'ไทย';if(/[؀-ۿ]/.test(t))return 'العربية';if(/[ऀ-ॿ]/.test(t))return 'हिन्दी';if(/[Ѐ-ӿ]/.test(t))return 'Русский';if(/\b(saya|boleh|berapa|harga|tak|nak|apa|laman|brp|tolong|terima kasih)\b/i.test(t))return 'Bahasa';return 'English';}
function say(l){return 'Ollie will reply in '+l+'. Switch anytime.';}
fab.addEventListener('click',function(){open(panel.hidden);});
$('olClose').addEventListener('click',function(){open(false);});
$('olLang').addEventListener('click',function(){menu.hidden=!menu.hidden;$('olLang').setAttribute('aria-expanded',!menu.hidden);if(!menu.hidden)setTimeout(function(){$('olSearch').focus();},50);});
menu.addEventListener('click',function(e){var b=e.target.closest('[data-l]');if(!b)return;var l=b.dataset.l;if(!l)return;setLang(l);$('olSearch').value='';grid();menu.hidden=true;$('olLang').setAttribute('aria-expanded',false);note(l==='Auto'?'Ollie replies in the language you write.':say(l));});
$('olMenuX').addEventListener('click',function(){menu.hidden=true;$('olLang').setAttribute('aria-expanded',false);});
$('olSearch').addEventListener('input',function(){grid(this.value);});
$('olSearch').addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();var b=$('olGrid').querySelector('button');if(b)b.click();}});
grid();
$('olForm').addEventListener('submit',function(e){e.preventDefault();var i=$('olInp'),v=i.value.trim();if(!v)return;i.value='';msg(v,true);var d=lang==='Auto'?detect(v):lang;if(lang==='Auto'&&d!==last){last=d;if(d!=='English')note('Detected '+d+'. '+say(d));}
 var ty=typ();setTimeout(function(){ty.remove();msg('Understood. In the live version I answer here, in '+d+'. For now, try one of the options below.');},900);});
function startCall(){$('olCallV').hidden=false;var s=0;$('olTime').textContent='00:00';clearInterval(timer);timer=setInterval(function(){s++;$('olTime').textContent=('0'+Math.floor(s/60)).slice(-2)+':'+('0'+s%60).slice(-2);},1000);}
function endCall(){clearInterval(timer);$('olCallV').hidden=true;}
$('olCall').addEventListener('click',startCall);$('olMic').addEventListener('click',startCall);$('olEnd').addEventListener('click',endCall);
tip.querySelector('.ol-x').addEventListener('click',function(){tip.hidden=true;dismissed=true;});
document.addEventListener('keydown',function(e){if(e.key==='Escape')open(false);});
var ty=document.getElementById('try-ollie');if(ty&&'IntersectionObserver' in window){new IntersectionObserver(function(en){root.classList.toggle('nudge',en[0].isIntersecting&&panel.hidden);},{threshold:.35}).observe(ty);}

/* Spotlight tour: dims the page and points at the Ollie button. */
var spotEl=null;
function spotOff(){if(!spotEl)return;spotEl.classList.remove('on');var e=spotEl;spotEl=null;setTimeout(function(){e.remove();},250);window.removeEventListener('resize',spotPlace);root.classList.remove('spot');}
function spotPlace(){if(!spotEl)return;var r=fab.getBoundingClientRect(),ring=spotEl.querySelector('.ols-ring'),box=spotEl.querySelector('.ols-box');
 ring.style.left=(r.left-8)+'px';ring.style.top=(r.top-8)+'px';ring.style.width=(r.width+16)+'px';ring.style.height=(r.height+16)+'px';
 box.style.right=Math.max(12,window.innerWidth-r.right)+'px';box.style.bottom=(window.innerHeight-r.top+64)+'px';}
function spotOn(){if(spotEl)return;open(false);tip.hidden=true;dismissed=true;
 spotEl=document.createElement('div');spotEl.className='ols';spotEl.setAttribute('role','dialog');spotEl.setAttribute('aria-label','Where Ollie lives');
 spotEl.innerHTML='<div class="ols-ring"></div><div class="ols-box"><strong>That is Ollie.</strong><p>Your visitors see the chat here, in the bottom-right corner of every page. It sits on top of your website and works on its own.</p><button type="button" class="ols-ok">Got it</button><svg viewBox="0 0 80 70" fill="none" stroke="#ed7330" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 6c24 2 46 14 54 44"/><path d="M50 40l14 14 8-18"/></svg></div>';
 document.body.appendChild(spotEl);root.classList.add('spot');spotPlace();requestAnimationFrame(function(){if(spotEl)spotEl.classList.add('on');});
 window.addEventListener('resize',spotPlace);spotEl.addEventListener('click',spotOff);}
document.addEventListener('click',function(e){var b=e.target.closest('[data-ollie-spot]');if(!b)return;e.preventDefault();spotOn();});
document.addEventListener('keydown',function(e){if(e.key==='Escape')spotOff();});
fab.addEventListener('click',spotOff);
window.Ollie={spot:spotOn,open:function(t){open(true);if(t){$('olInp').value=t;$('olForm').dispatchEvent(new Event('submit',{cancelable:true}));}else $('olInp').focus();}};
document.addEventListener('click',function(e){var b=e.target.closest('[data-ollie]');if(!b)return;e.preventDefault();window.Ollie.open(b.getAttribute('data-ollie'));});
setTimeout(function(){if(!dismissed&&panel.hidden)tip.hidden=false;},5000);
})();
