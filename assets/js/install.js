/* "Install our site" helper. Uses the native install prompt when the browser offers it, otherwise shows steps for the visitor's device.
   For the native prompt in the real build the site needs a web app manifest, icons and a service worker. */
(function(){
var deferred=null;
window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferred=e;});
window.addEventListener('appinstalled',function(){deferred=null;close();});
var ua=navigator.userAgent||'',plat=/iPad|iPhone|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1)?'ios':/Android/i.test(ua)?'android':'desktop';
var STEPS={
 ios:[['ios_share','Tap the Share button','At the bottom of Safari (or top right on iPad).'],['add_box','Choose “Add to Home Screen”','Scroll down the share sheet if you do not see it.'],['check_circle','Tap “Add”','The icon appears on your home screen. Open it from there.']],
 android:[['more_vert','Open the browser menu','The three dots at the top right of Chrome.'],['install_mobile','Tap “Install app” or “Add to Home screen”','Then confirm.'],['check_circle','Open it from your home screen','It opens full screen, like an app.']],
 desktop:[['install_desktop','Look for the install icon','At the right end of the address bar in Chrome or Edge.'],['download','Click “Install”','Safari on Mac: File, then Add to Dock.'],['check_circle','Open it like any app','It gets its own window and icon.']]};
var NAMES={ios:'iPhone / iPad',android:'Android',desktop:'Computer'};
var m=document.createElement('div');m.className='ins';m.hidden=true;m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');m.setAttribute('aria-label','Install our site');
m.innerHTML='<div class="ins-box"><button type="button" class="ins-x" aria-label="Close"><span class="mi">close</span></button><div class="ins-ic"><span class="mi">install_mobile</span></div><h3>Install our website</h3><p>Add it to your home screen and open it like an app. This is what your customers would do with your site.</p><div class="ins-tabs" role="tablist"></div><ol class="ins-steps"></ol><button type="button" class="ins-ok">Got it</button></div>';
document.body.appendChild(m);
var tabs=m.querySelector('.ins-tabs'),ol=m.querySelector('.ins-steps');
function render(p){tabs.innerHTML=Object.keys(NAMES).map(function(k){return '<button type="button" role="tab" data-p="'+k+'" aria-selected="'+(k===p)+'" class="'+(k===p?'on':'')+'">'+NAMES[k]+'</button>';}).join('');
 ol.innerHTML=STEPS[p].map(function(s,i){return '<li><span class="ins-n">'+(i+1)+'</span><span class="mi" aria-hidden="true">'+s[0]+'</span><span><b>'+s[1]+'</b><small>'+s[2]+'</small></span></li>';}).join('');}
tabs.addEventListener('click',function(e){var b=e.target.closest('[data-p]');if(b)render(b.dataset.p);});
function open(){render(plat);m.hidden=false;document.documentElement.style.overflow='hidden';m.querySelector('.ins-ok').focus();}
function close(){m.hidden=true;document.documentElement.style.overflow='';}
m.addEventListener('click',function(e){if(e.target===m||e.target.closest('.ins-x')||e.target.closest('.ins-ok'))close();});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!m.hidden)close();});
document.addEventListener('click',function(e){var b=e.target.closest('[data-install]');if(!b)return;e.preventDefault();
 if(deferred){var d=deferred;deferred=null;d.prompt();d.userChoice&&d.userChoice.then(function(){});}else open();});
if(window.matchMedia&&matchMedia('(display-mode: standalone)').matches){[].forEach.call(document.querySelectorAll('[data-install]'),function(b){b.style.display='none';});}
})();
