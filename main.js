(function(){
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,wide=matchMedia('(min-width:861px) and (min-height:601px)');
var S=[].slice.call(document.querySelectorAll('.slide')),N=[].slice.call(document.querySelectorAll('.nv')),
ct=document.getElementById('ct'),O=['oa','ob','oc'].map(function(i){return document.getElementById(i)}),cur=-1,anim=false,raf=0,root=document.documentElement;
function orbs(i){var f=function(a,b){return (a+b).toFixed(1)};
O[0].style.transform='translate('+f(i*3.1%46,-8)+'vw,'+f(Math.sin(i*1.3)*26,14)+'vh)';
O[1].style.transform='translate('+f(-Math.cos(i*1.1)*30,-6)+'vw,'+f(-Math.sin(i*1.9)*24,-10)+'vh)';
O[2].style.transform='translate('+f(Math.sin(i*2.3)*38,0)+'vw,'+f(Math.cos(i*.9)*26,0)+'vh)'}
function set(i){if(i===cur)return;cur=i;S.forEach(function(s,k){s.classList.toggle('on',k===i)});
var g=S[i].dataset.g;N.forEach(function(n){n.setAttribute('aria-current',n.dataset.g===g)});
ct.textContent=(i+1)+' / '+S.length;orbs(i)}
function measure(){var m=innerHeight/2,b=0;for(var i=0;i<S.length;i++){var r=S[i].getBoundingClientRect();if(r.top<=m&&r.bottom>m){b=i;break}}set(b)}
addEventListener('scroll',function(){cancelAnimationFrame(raf);raf=requestAnimationFrame(measure)},{passive:true});addEventListener('resize',measure);
/* super snappy: short quartic ease-out jump */
function jump(y){var s=pageYOffset,d=y-s,t0=null,dur=reduce?0:340;if(!d)return;anim=true;root.style.scrollSnapType='none';
(function step(t){if(t0===null)t0=t;var p=dur?Math.min((t-t0)/dur,1):1;scrollTo(0,s+d*(1-Math.pow(1-p,4)));
if(p<1)requestAnimationFrame(step);else{anim=false;root.style.scrollSnapType=''}})(performance.now())}
function go(i){i=Math.max(0,Math.min(S.length-1,i));jump(Math.round(S[i].getBoundingClientRect().top+pageYOffset))}
function goId(id){var e=document.getElementById(id);if(e)go(S.indexOf(e))}
[].forEach.call(document.querySelectorAll('[data-t]'),function(b){b.onclick=function(){goId(b.dataset.t)}});
[].forEach.call(document.querySelectorAll('[data-go]'),function(a){a.onclick=function(e){e.preventDefault();goId(a.dataset.go)}});
var lt=0,la=0;
addEventListener('wheel',function(e){if(e.ctrlKey||!wide.matches)return;if(Math.abs(e.deltaX)>Math.abs(e.deltaY))return;e.preventDefault();
var dy=e.deltaMode===1?e.deltaY*16:e.deltaY,a=Math.abs(dy);if(a<4)return;var n=performance.now(),fresh=n-lt>120||a>la*1.5+8;lt=n;la=a;
if(anim||!fresh)return;go(cur+(dy>0?1:-1))},{passive:false});
addEventListener('keydown',function(e){if(e.altKey||e.ctrlKey||e.metaKey||!wide.matches)return;var k=e.key,d=0,to=null;
if(k==='ArrowDown'||k==='PageDown')d=1;else if(k==='ArrowUp'||k==='PageUp')d=-1;else if(k===' '&&!/^(a|button)$/i.test(e.target.tagName))d=e.shiftKey?-1:1;
else if(k==='Home')to=0;else if(k==='End')to=S.length-1;else return;e.preventDefault();go(to!==null?to:cur+d)});
/* soft pointer light */
if(!reduce)addEventListener('pointermove',function(e){O[2].style.left=(e.clientX/innerWidth*60+10)+'vw';O[2].style.top=(e.clientY/innerHeight*50)+'vh'},{passive:true});
measure()})();
