function x(){}const ot=t=>t;function Mt(t,e){for(const n in e)t[n]=e[n];return t}function ct(t){return t()}function et(){return Object.create(null)}function v(t){t.forEach(ct)}function z(t){return typeof t=="function"}function te(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let B;function ee(t,e){return B||(B=document.createElement("a")),B.href=e,t===B.href}function St(t){return Object.keys(t).length===0}function lt(t,...e){if(t==null)return x;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function ne(t){let e;return lt(t,n=>e=n)(),e}function ie(t,e,n){t.$$.on_destroy.push(lt(e,n))}function se(t,e,n,i){if(t){const s=at(t,e,n,i);return t[0](s)}}function at(t,e,n,i){return t[1]&&i?Mt(n.ctx.slice(),t[1](i(e))):n.ctx}function re(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const c=[],r=Math.max(e.dirty.length,s.length);for(let o=0;o<r;o+=1)c[o]=e.dirty[o]|s[o];return c}return e.dirty|s}return e.dirty}function oe(t,e,n,i,s,c){if(s){const r=at(e,n,i,c);t.p(r,s)}}function ce(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function le(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function ae(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function ue(t){const e={};for(const n in t)e[n]=!0;return e}function fe(t){return t??""}function de(t,e,n){return t.set(n),e}function _e(t){return t&&z(t.destroy)?t.destroy:x}const ut=typeof window<"u";let ft=ut?()=>window.performance.now():()=>Date.now(),Z=ut?t=>requestAnimationFrame(t):x;const S=new Set;function dt(t){S.forEach(e=>{e.c(t)||(S.delete(e),e.f())}),S.size!==0&&Z(dt)}function _t(t){let e;return S.size===0&&Z(dt),{promise:new Promise(n=>{S.add(e={c:t,f:n})}),abort(){S.delete(e)}}}const he=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;let U=!1;function Ct(){U=!0}function jt(){U=!1}function Dt(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function Pt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let a=0;a<e.length;a++){const f=e[a];f.claim_order!==void 0&&l.push(f)}e=l}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let l=0;l<e.length;l++){const a=e[l].claim_order,f=(s>0&&e[n[s]].claim_order<=a?s+1:Dt(1,s,h=>e[n[h]].claim_order,a))-1;i[l]=n[f]+1;const d=f+1;n[d]=l,s=Math.max(d,s)}const c=[],r=[];let o=e.length-1;for(let l=n[s]+1;l!=0;l=i[l-1]){for(c.push(e[l-1]);o>=l;o--)r.push(e[o]);o--}for(;o>=0;o--)r.push(e[o]);c.reverse(),r.sort((l,a)=>l.claim_order-a.claim_order);for(let l=0,a=0;l<r.length;l++){for(;a<c.length&&r[l].claim_order>=c[a].claim_order;)a++;const f=a<c.length?c[a]:null;t.insertBefore(r[l],f)}}function ht(t,e){t.appendChild(e)}function mt(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Lt(t){const e=J("style");return Ht(mt(t),e),e.sheet}function Ht(t,e){return ht(t.head||t,e),e.sheet}function Ot(t,e){if(U){for(Pt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function zt(t,e,n){t.insertBefore(e,n||null)}function Rt(t,e,n){U&&!n?Ot(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function j(t){t.parentNode&&t.parentNode.removeChild(t)}function me(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function J(t){return document.createElement(t)}function pt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function tt(t){return document.createTextNode(t)}function pe(){return tt(" ")}function ye(){return tt("")}function nt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function ge(t){return function(e){return e.preventDefault(),t.call(this,e)}}function be(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function yt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}const qt=["width","height"];function we(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set&&qt.indexOf(i)===-1?t[i]=e[i]:yt(t,i,e[i])}function $e(t,e){for(const n in e)yt(t,n,e[n])}function xe(t){return t===""?null:+t}function Bt(t){return Array.from(t.childNodes)}function gt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function bt(t,e,n,i,s=!1){gt(t);const c=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const o=t[r];if(e(o)){const l=n(o);return l===void 0?t.splice(r,1):t[r]=l,s||(t.claim_info.last_index=r),o}}for(let r=t.claim_info.last_index-1;r>=0;r--){const o=t[r];if(e(o)){const l=n(o);return l===void 0?t.splice(r,1):t[r]=l,s?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,o}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function wt(t,e,n,i){return bt(t,s=>s.nodeName===e,s=>{const c=[];for(let r=0;r<s.attributes.length;r++){const o=s.attributes[r];n[o.name]||c.push(o.name)}c.forEach(r=>s.removeAttribute(r))},()=>i(e))}function ve(t,e,n){return wt(t,e,n,J)}function Ee(t,e,n){return wt(t,e,n,pt)}function Wt(t,e){return bt(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>tt(e),!0)}function ke(t){return Wt(t," ")}function it(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return t.length}function Te(t,e){const n=it(t,"HTML_TAG_START",0),i=it(t,"HTML_TAG_END",n);if(n===i)return new st(void 0,e);gt(t);const s=t.splice(n,i-n+1);j(s[0]),j(s[s.length-1]);const c=s.slice(1,s.length-1);for(const r of c)r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new st(c,e)}function Ne(t,e){e=""+e,t.data!==e&&(t.data=e)}function Ae(t,e){t.value=e??""}function Me(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}let W;function Ft(){if(W===void 0){W=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{W=!0}}return W}function Se(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=J("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const s=Ft();let c;return s?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",c=nt(window,"message",r=>{r.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{c=nt(i.contentWindow,"resize",e),e()}),ht(t,i),()=>{(s||c&&i.contentWindow)&&c(),j(i)}}function Ce(t,e,n){t.classList[n?"add":"remove"](e)}function $t(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,i,e),s}function je(t,e){const n=[];let i=0;for(const s of e.childNodes)if(s.nodeType===8){const c=s.textContent.trim();c===`HEAD_${t}_END`?(i-=1,n.push(s)):c===`HEAD_${t}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}class Gt{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=pt(n.nodeName):this.e=J(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)zt(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(j)}}class st extends Gt{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)Rt(this.t,this.n[n],e)}}function De(t,e){return new t(e)}const G=new Map;let I=0;function It(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Ut(t,e){const n={stylesheet:Lt(e),rules:{}};return G.set(t,n),n}function V(t,e,n,i,s,c,r,o=0){const l=16.666/i;let a=`{
`;for(let p=0;p<=1;p+=l){const g=e+(n-e)*c(p);a+=p*100+`%{${r(g,1-g)}}
`}const f=a+`100% {${r(n,1-n)}}
}`,d=`__svelte_${It(f)}_${o}`,h=mt(t),{stylesheet:u,rules:_}=G.get(h)||Ut(h,t);_[d]||(_[d]=!0,u.insertRule(`@keyframes ${d} ${f}`,u.cssRules.length));const y=t.style.animation||"";return t.style.animation=`${y?`${y}, `:""}${d} ${i}ms linear ${s}ms 1 both`,I+=1,d}function xt(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?c=>c.indexOf(e)<0:c=>c.indexOf("__svelte")===-1),s=n.length-i.length;s&&(t.style.animation=i.join(", "),I-=s,I||Jt())}function Jt(){Z(()=>{I||(G.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&j(e)}),G.clear())})}let H;function P(t){H=t}function E(){if(!H)throw new Error("Function called outside component initialization");return H}function Pe(t){E().$$.before_update.push(t)}function Le(t){E().$$.on_mount.push(t)}function He(t){E().$$.after_update.push(t)}function Oe(t){E().$$.on_destroy.push(t)}function ze(){const t=E();return(e,n,{cancelable:i=!1}={})=>{const s=t.$$.callbacks[e];if(s){const c=$t(e,n,{cancelable:i});return s.slice().forEach(r=>{r.call(t,c)}),!c.defaultPrevented}return!0}}function Re(t,e){return E().$$.context.set(t,e),e}function qe(t){return E().$$.context.get(t)}function Be(t){return E().$$.context.has(t)}function We(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const M=[],rt=[];let C=[];const X=[],vt=Promise.resolve();let Y=!1;function Et(){Y||(Y=!0,vt.then(kt))}function Fe(){return Et(),vt}function O(t){C.push(t)}function Ge(t){X.push(t)}const Q=new Set;let A=0;function kt(){if(A!==0)return;const t=H;do{try{for(;A<M.length;){const e=M[A];A++,P(e),Kt(e.$$)}}catch(e){throw M.length=0,A=0,e}for(P(null),M.length=0,A=0;rt.length;)rt.pop()();for(let e=0;e<C.length;e+=1){const n=C[e];Q.has(n)||(Q.add(n),n())}C.length=0}while(M.length);for(;X.length;)X.pop()();Y=!1,Q.clear(),P(t)}function Kt(t){if(t.fragment!==null){t.update(),v(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(O)}}function Qt(t){const e=[],n=[];C.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),C=e}let D;function Tt(){return D||(D=Promise.resolve(),D.then(()=>{D=null})),D}function L(t,e,n){t.dispatchEvent($t(`${e?"intro":"outro"}${n}`))}const F=new Set;let $;function Ie(){$={r:0,c:[],p:$}}function Ue(){$.r||v($.c),$=$.p}function Nt(t,e){t&&t.i&&(F.delete(t),t.i(e))}function Vt(t,e,n,i){if(t&&t.o){if(F.has(t))return;F.add(t),$.c.push(()=>{F.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const At={duration:0};function Je(t,e,n){const i={direction:"out"};let s=e(t,n,i),c=!0,r;const o=$;o.r+=1;function l(){const{delay:a=0,duration:f=300,easing:d=ot,tick:h=x,css:u}=s||At;u&&(r=V(t,1,0,f,a,d,u));const _=ft()+a,y=_+f;O(()=>L(t,!1,"start")),_t(p=>{if(c){if(p>=y)return h(0,1),L(t,!1,"end"),--o.r||v(o.c),!1;if(p>=_){const g=d((p-_)/f);h(1-g,g)}}return c})}return z(s)?Tt().then(()=>{s=s(i),l()}):l(),{end(a){a&&s.tick&&s.tick(1,0),c&&(r&&xt(t,r),c=!1)}}}function Ke(t,e,n,i){const s={direction:"both"};let c=e(t,n,s),r=i?0:1,o=null,l=null,a=null;function f(){a&&xt(t,a)}function d(u,_){const y=u.b-r;return _*=Math.abs(y),{a:r,b:u.b,d:y,duration:_,start:u.start,end:u.start+_,group:u.group}}function h(u){const{delay:_=0,duration:y=300,easing:p=ot,tick:g=x,css:k}=c||At,N={start:ft()+_,b:u};u||(N.group=$,$.r+=1),o||l?l=N:(k&&(f(),a=V(t,r,u,y,_,p,k)),u&&g(0,1),o=d(N,y),O(()=>L(t,u,"start")),_t(T=>{if(l&&T>l.start&&(o=d(l,y),l=null,L(t,o.b,"start"),k&&(f(),a=V(t,r,o.b,o.duration,0,p,c.css))),o){if(T>=o.end)g(r=o.b,1-r),L(t,o.b,"end"),l||(o.b?f():--o.group.r||v(o.group.c)),o=null;else if(T>=o.start){const R=T-o.start;r=o.a+o.d*p(R/o.duration),g(r,1-r)}}return!!(o||l)}))}return{run(u){z(c)?Tt().then(()=>{c=c(s),h(u)}):h(u)},end(){f(),o=l=null}}}function Qe(t,e){t.d(1),e.delete(t.key)}function Ve(t,e){Vt(t,1,1,()=>{e.delete(t.key)})}function Xe(t,e,n,i,s,c,r,o,l,a,f,d){let h=t.length,u=c.length,_=h;const y={};for(;_--;)y[t[_].key]=_;const p=[],g=new Map,k=new Map,N=[];for(_=u;_--;){const m=d(s,c,_),b=n(m);let w=r.get(b);w?i&&N.push(()=>w.p(m,e)):(w=a(b,m),w.c()),g.set(b,p[_]=w),b in y&&k.set(b,Math.abs(_-y[b]))}const T=new Set,R=new Set;function K(m){Nt(m,1),m.m(o,f),r.set(m.key,m),f=m.first,u--}for(;h&&u;){const m=p[u-1],b=t[h-1],w=m.key,q=b.key;m===b?(f=m.first,h--,u--):g.has(q)?!r.has(w)||T.has(w)?K(m):R.has(q)?h--:k.get(w)>k.get(q)?(R.add(w),K(m)):(T.add(q),h--):(l(b,r),h--)}for(;h--;){const m=t[h];g.has(m.key)||l(m,r)}for(;u;)K(p[u-1]);return v(N),p}function Ye(t,e){const n={},i={},s={$$scope:1};let c=t.length;for(;c--;){const r=t[c],o=e[c];if(o){for(const l in r)l in o||(i[l]=1);for(const l in o)s[l]||(n[l]=o[l],s[l]=1);t[c]=o}else for(const l in r)s[l]=1}for(const r in i)r in n||(n[r]=void 0);return n}function Ze(t){return typeof t=="object"&&t!==null?t:{}}function tn(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function en(t){t&&t.c()}function nn(t,e){t&&t.l(e)}function Xt(t,e,n,i){const{fragment:s,after_update:c}=t.$$;s&&s.m(e,n),i||O(()=>{const r=t.$$.on_mount.map(ct).filter(z);t.$$.on_destroy?t.$$.on_destroy.push(...r):v(r),t.$$.on_mount=[]}),c.forEach(O)}function Yt(t,e){const n=t.$$;n.fragment!==null&&(Qt(n.after_update),v(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Zt(t,e){t.$$.dirty[0]===-1&&(M.push(t),Et(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function sn(t,e,n,i,s,c,r,o=[-1]){const l=H;P(t);const a=t.$$={fragment:null,ctx:[],props:c,update:x,not_equal:s,bound:et(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:et(),dirty:o,skip_bound:!1,root:e.target||l.$$.root};r&&r(a.root);let f=!1;if(a.ctx=n?n(t,e.props||{},(d,h,...u)=>{const _=u.length?u[0]:h;return a.ctx&&s(a.ctx[d],a.ctx[d]=_)&&(!a.skip_bound&&a.bound[d]&&a.bound[d](_),f&&Zt(t,d)),h}):[],a.update(),f=!0,v(a.before_update),a.fragment=i?i(a.ctx):!1,e.target){if(e.hydrate){Ct();const d=Bt(e.target);a.fragment&&a.fragment.l(d),d.forEach(j)}else a.fragment&&a.fragment.c();e.intro&&Nt(t.$$.fragment),Xt(t,e.target,e.anchor,e.customElement),jt(),kt()}P(l)}class rn{$destroy(){Yt(this,1),this.$destroy=x}$on(e,n){if(!z(n))return x;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!St(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{$e as $,Xt as A,Yt as B,se as C,Mt as D,we as E,Ce as F,nt as G,oe as H,ce as I,re as J,Ye as K,v as L,ae as M,ze as N,ie as O,Re as P,le as Q,We as R,rn as S,Oe as T,tn as U,Ge as V,Ze as W,Xe as X,Ve as Y,pt as Z,Ee as _,pe as a,Ot as a0,x as a1,me as a2,O as a3,Ke as a4,ee as a5,fe as a6,_e as a7,z as a8,de as a9,je as aa,lt as ab,he as ac,Je as ad,be as ae,ne as af,ue as ag,Se as ah,qe as ai,Pe as aj,ge as ak,Ae as al,Be as am,xe as an,Qe as ao,ot as ap,st as aq,Te as ar,Rt as b,ke as c,Vt as d,ye as e,Ue as f,Nt as g,j as h,sn as i,He as j,J as k,ve as l,Bt as m,yt as n,Le as o,Me as p,tt as q,Wt as r,te as s,Fe as t,Ne as u,Ie as v,rt as w,De as x,en as y,nn as z};