import{S as fe,i as ce,s as ue,k as M,a as Z,q as de,e as P,l as T,m as Y,h as k,c as x,r as he,n as R,F as b,p as X,b as F,a0 as A,G as be,v as z,d as v,f as K,g as p,u as _e,X as ve,Y as ke,a3 as we,a4 as te,y as O,z as q,A as B,B as U,O as Se,a1 as $e,a2 as ye}from"./index.6d58eddb.js";import{a1 as Ee,an as Ve,ah as N,R as Fe,ai as Pe,av as Ie,aE as Ne,V as Ae,au as Re,aA as De,d as Le,bw as Ce,aF as Me,bx as Te,by as Ye,a8 as ze}from"./Commands.f21feee1.js";import{C as Ke,a as Oe}from"./ChevronUp.d4050376.js";import{s as le}from"./notificationsStore.a58b8b24.js";function ne(r,e,l){const t=r.slice();return t[2]=e[l],t}function qe(r){let e,l;return e=new Ke({}),{c(){O(e.$$.fragment)},l(t){q(e.$$.fragment,t)},m(t,n){B(e,t,n),l=!0},i(t){l||(p(e.$$.fragment,t),l=!0)},o(t){v(e.$$.fragment,t),l=!1},d(t){U(e,t)}}}function Be(r){let e,l;return e=new Oe({}),{c(){O(e.$$.fragment)},l(t){q(e.$$.fragment,t)},m(t,n){B(e,t,n),l=!0},i(t){l||(p(e.$$.fragment,t),l=!0)},o(t){v(e.$$.fragment,t),l=!1},d(t){U(e,t)}}}function ae(r){var o;let e,l=(r[0].formattedValue||((o=r[0].children)!=null&&o.length?"":"n/a"))+"",t,n;return{c(){e=M("div"),t=de(l),this.h()},l(i){e=T(i,"DIV",{title:!0,class:!0});var s=Y(e);t=he(s,l),s.forEach(k),this.h()},h(){var i,s;R(e,"title",n=(i=r[0].value)==null?void 0:i.toString()),R(e,"class","truncated text-right svelte-1woyz4e"),b(e,"italic",!r[0].formattedValue&&!((s=r[0].children)!=null&&s.length))},m(i,s){F(i,e,s),A(e,t)},p(i,s){var a,f,c;s&1&&l!==(l=(i[0].formattedValue||((a=i[0].children)!=null&&a.length?"":"n/a"))+"")&&_e(t,l),s&1&&n!==(n=(f=i[0].value)==null?void 0:f.toString())&&R(e,"title",n),s&1&&b(e,"italic",!i[0].formattedValue&&!((c=i[0].children)!=null&&c.length))},d(i){i&&k(e)}}}function ie(r){let e,l=[],t=new Map,n,o,i=r[0].children;const s=a=>Ee(a[2].path);for(let a=0;a<i.length;a+=1){let f=ne(r,i,a),c=s(f);t.set(c,l[a]=re(c,f))}return{c(){e=M("div");for(let a=0;a<l.length;a+=1)l[a].c();this.h()},l(a){e=T(a,"DIV",{});var f=Y(e);for(let c=0;c<l.length;c+=1)l[c].l(f);f.forEach(k),this.h()},h(){b(e,"bg-blue-100",r[0].isSignal),b(e,"bg-emerald-100",r[0].isPreviewSignal)},m(a,f){F(a,e,f);for(let c=0;c<l.length;c+=1)l[c]&&l[c].m(e,null);o=!0},p(a,f){f&1&&(i=a[0].children,z(),l=ve(l,f,s,1,a,i,t,e,ke,re,null,ne),K()),(!o||f&1)&&b(e,"bg-blue-100",a[0].isSignal),(!o||f&1)&&b(e,"bg-emerald-100",a[0].isPreviewSignal)},i(a){if(!o){for(let f=0;f<i.length;f+=1)p(l[f]);a&&we(()=>{o&&(n||(n=te(e,le,{},!0)),n.run(1))}),o=!0}},o(a){for(let f=0;f<l.length;f+=1)v(l[f]);a&&(n||(n=te(e,le,{},!1)),n.run(0)),o=!1},d(a){a&&k(e);for(let f=0;f<l.length;f+=1)l[f].d();a&&n&&n.end()}}}function re(r,e){let l,t,n;return t=new ge({props:{node:e[2]}}),{key:r,first:null,c(){l=P(),O(t.$$.fragment),this.h()},l(o){l=P(),q(t.$$.fragment,o),this.h()},h(){this.first=l},m(o,i){F(o,l,i),B(t,o,i),n=!0},p(o,i){e=o;const s={};i&1&&(s.node=e[2]),t.$set(s)},i(o){n||(p(t.$$.fragment,o),n=!0)},o(o){v(t.$$.fragment,o),n=!1},d(o){o&&k(l),U(t,o)}}}function Ue(r){var j;let e,l,t,n,o,i,s=r[0].fieldName+"",a,f,c,d,g,S,y;const D=[Be,qe],w=[];function H(u,h){return u[0].expanded?0:1}t=H(r),n=w[t]=D[t](r);let m=(r[0].formattedValue||!((j=r[0].children)!=null&&j.length))&&ae(r),_=r[0].children&&r[0].expanded&&ie(r);return{c(){e=M("div"),l=M("button"),n.c(),o=Z(),i=M("div"),a=de(s),f=Z(),m&&m.c(),c=Z(),_&&_.c(),d=P(),this.h()},l(u){e=T(u,"DIV",{class:!0});var h=Y(e);l=T(h,"BUTTON",{class:!0});var $=Y(l);n.l($),$.forEach(k),o=x(h),i=T(h,"DIV",{class:!0});var E=Y(i);a=he(E,s),E.forEach(k),f=x(h),m&&m.l(h),h.forEach(k),c=x(u),_&&_.l(u),d=P(),this.h()},h(){var u;R(l,"class","p-1"),b(l,"invisible",!((u=r[0].children)!=null&&u.length)),R(i,"class","truncated font-mono font-medium text-neutral-500 svelte-1woyz4e"),X(i,"min-width","10ch"),R(e,"class","flex items-center gap-x-1 pr-2 text-xs"),b(e,"bg-blue-100",r[0].isSignal),b(e,"bg-emerald-100",r[0].isPreviewSignal),b(e,"bg-teal-100",r[0].isLabel),X(e,"padding-left",.25+(r[0].path.length-1)*.5+"rem"),X(e,"line-height","1.7rem")},m(u,h){F(u,e,h),A(e,l),w[t].m(l,null),A(e,o),A(e,i),A(i,a),A(e,f),m&&m.m(e,null),F(u,c,h),_&&_.m(u,h),F(u,d,h),g=!0,S||(y=be(l,"click",r[1]),S=!0)},p(u,[h]){var E,L;let $=t;t=H(u),t!==$&&(z(),v(w[$],1,1,()=>{w[$]=null}),K(),n=w[t],n||(n=w[t]=D[t](u),n.c()),p(n,1),n.m(l,null)),(!g||h&1)&&b(l,"invisible",!((E=u[0].children)!=null&&E.length)),(!g||h&1)&&s!==(s=u[0].fieldName+"")&&_e(a,s),u[0].formattedValue||!((L=u[0].children)!=null&&L.length)?m?m.p(u,h):(m=ae(u),m.c(),m.m(e,null)):m&&(m.d(1),m=null),(!g||h&1)&&b(e,"bg-blue-100",u[0].isSignal),(!g||h&1)&&b(e,"bg-emerald-100",u[0].isPreviewSignal),(!g||h&1)&&b(e,"bg-teal-100",u[0].isLabel),h&1&&X(e,"padding-left",.25+(u[0].path.length-1)*.5+"rem"),u[0].children&&u[0].expanded?_?(_.p(u,h),h&1&&p(_,1)):(_=ie(u),_.c(),p(_,1),_.m(d.parentNode,d)):_&&(z(),v(_,1,1,()=>{_=null}),K())},i(u){g||(p(n),p(_),g=!0)},o(u){v(n),v(_),g=!1},d(u){u&&k(e),w[t].d(),m&&m.d(),u&&k(c),_&&_.d(u),u&&k(d),S=!1,y()}}}function me(r){r.expanded=!0,r.children&&r.children.forEach(me)}function He(r,e,l){let{node:t}=e;const n=()=>{l(0,t.expanded=!t.expanded,t),t.isSignal&&t.expanded&&me(t),l(0,t)};return r.$$set=o=>{"node"in o&&l(0,t=o.node)},[t,n]}class ge extends fe{constructor(e){super(),ce(this,e,He,Ue,ue,{node:0})}}function se(r,e,l){const t=r.slice();return t[7]=e[l],t}function je(r){let e,l;return e=new Le({props:{lines:3,paragraph:!0,class:"w-full"}}),{c(){O(e.$$.fragment)},l(t){q(e.$$.fragment,t)},m(t,n){B(e,t,n),l=!0},p:$e,i(t){l||(p(e.$$.fragment,t),l=!0)},o(t){v(e.$$.fragment,t),l=!1},d(t){U(e,t)}}}function Ge(r){let e,l,t=r[0].children||[],n=[];for(let i=0;i<t.length;i+=1)n[i]=oe(se(r,t,i));const o=i=>v(n[i],1,1,()=>{n[i]=null});return{c(){for(let i=0;i<n.length;i+=1)n[i].c();e=P()},l(i){for(let s=0;s<n.length;s+=1)n[s].l(i);e=P()},m(i,s){for(let a=0;a<n.length;a+=1)n[a]&&n[a].m(i,s);F(i,e,s),l=!0},p(i,s){if(s&1){t=i[0].children||[];let a;for(a=0;a<t.length;a+=1){const f=se(i,t,a);n[a]?(n[a].p(f,s),p(n[a],1)):(n[a]=oe(f),n[a].c(),p(n[a],1),n[a].m(e.parentNode,e))}for(z(),a=t.length;a<n.length;a+=1)o(a);K()}},i(i){if(!l){for(let s=0;s<t.length;s+=1)p(n[s]);l=!0}},o(i){n=n.filter(Boolean);for(let s=0;s<n.length;s+=1)v(n[s]);l=!1},d(i){ye(n,i),i&&k(e)}}}function oe(r){let e,l;return e=new ge({props:{node:r[7]}}),{c(){O(e.$$.fragment)},l(t){q(e.$$.fragment,t)},m(t,n){B(e,t,n),l=!0},p(t,n){const o={};n&1&&(o.node=t[7]),e.$set(o)},i(t){l||(p(e.$$.fragment,t),l=!0)},o(t){v(e.$$.fragment,t),l=!1},d(t){U(e,t)}}}function We(r){let e,l,t,n;const o=[Ge,je],i=[];function s(a,f){return a[0]?0:1}return e=s(r),l=i[e]=o[e](r),{c(){l.c(),t=P()},l(a){l.l(a),t=P()},m(a,f){i[e].m(a,f),F(a,t,f),n=!0},p(a,[f]){let c=e;e=s(a),e===c?i[e].p(a,f):(z(),v(i[c],1,1,()=>{i[c]=null}),K(),l=i[e],l?l.p(a,f):(l=i[e]=o[e](a),l.c()),p(l,1),l.m(t.parentNode,t))},i(a){n||(p(l),n=!0)},o(a){v(l),n=!1},d(a){i[e].d(a),a&&k(t)}}}function Xe(r,e,l){let t,n,{row:o=void 0}=e,{selectRowsSchema:i=void 0}=e,{highlightedFields:s}=e;const a=Ve();Se(r,a,c=>l(5,n=c));function f(c){var u,h,$,E,L;const d=N.field(c),g=N.path(c);let S=N.value(c),y=N.span(c);if(((u=d==null?void 0:d.dtype)==null?void 0:u.type)==="string_span"&&(y=y||S,y!=null)){const V=[];for(let I=g.length-1;I>=0;I--){const J=g.slice(0,I),G=Fe(i.schema,J);let C=null;if(((h=G.map)==null?void 0:h.input_path)!=null?C=G.map.input_path:(($=G.dtype)==null?void 0:$.type)==="string"&&(C=J),C!=null){const Q=o!=null?Pe(o,C):null;if(Q){const W=N.value(Q);if(W){V.push(W.slice(y.start,y.end));break}}}}S=V}const D=((E=n.data)==null?void 0:E.some(V=>{var I;return V.name===((I=d==null?void 0:d.signal)==null?void 0:I.signal_name)}))||!1,w=d?Ie(d):!1,H=d?Ne(d):!1;let m;D||w&&(d==null?void 0:d.dtype)==null||((L=d==null?void 0:d.dtype)==null?void 0:L.type)==="embedding"||(d==null?void 0:d.repeated_field)!=null?m="":S==null?m=null:m=Ae(S);function _(V){const{[Ce]:I,[Me]:J,[Te]:G,[Ye]:C,[ze]:Q,...W}=V;return Object.values(W).filter(pe=>{var ee;return((ee=N.field(pe))==null?void 0:ee.label)==null})}const j=s.some(V=>Re(V.path,g));return{children:Array.isArray(c)?c.map(f):_(c).map(f),fieldName:g[g.length-1],field:d,path:g,expanded:j,isSignal:w,isLabel:H,isPreviewSignal:i!=null?De(i,g):!1,isEmbeddingSignal:D,value:S,formattedValue:m}}return r.$$set=c=>{"row"in c&&l(2,o=c.row),"selectRowsSchema"in c&&l(3,i=c.selectRowsSchema),"highlightedFields"in c&&l(4,s=c.highlightedFields)},r.$$.update=()=>{r.$$.dirty&4&&l(0,t=o!=null?f(o):null)},[t,a,o,i,s]}class et extends fe{constructor(e){super(),ce(this,e,Xe,We,ue,{row:2,selectRowsSchema:3,highlightedFields:4})}}export{et as I};