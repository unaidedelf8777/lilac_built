import{S as ke,i as we,s as Ee,y as O,z as L,A,g as $,d as v,B as U,O as te,a as q,c as F,b as H,h,k as w,l as E,m as y,n as C,a0 as _,v as x,f as ee,w as ye,U as Ce,q as B,r as M,F as Z,G as ie,u as se,V as Ie,e as re,a1 as ae,a7 as Te,a8 as Be,L as De,ab as Me,ad as Oe}from"../chunks/index.6d58eddb.js";import{g as fe}from"../chunks/navigation.aea35273.js";import{P as Le}from"../chunks/Page.a0832e69.js";import{z as Ae,f as Ne,a as Ue,A as He,D as Ve,E as qe,M as Fe,F as ze,G as Ge,H as je,I as Je,J as Ke,d as Se,c as Re,l as Qe,K as We,h as Pe,L as _e,N as Xe}from"../chunks/Commands.f21feee1.js";import{T as Ye}from"../chunks/TextArea.b1aacf82.js";import{T as Ze,V as xe,a as et,I as he,S as tt,C as nt}from"../chunks/ConceptView.85d12124.js";import{M as lt}from"../chunks/ToastNotification.0ea457ce.js";import{S as st}from"../chunks/Settings.5397201f.js";import{f as at}from"../chunks/notificationsStore.a58b8b24.js";function ot(a){let e,n,t,l,o,i,r,s,u,m,p,f,c,d,b,k,R,G,J,V,W,j,D,T,S,g,N,z,P;function K(I){a[19](I)}let X={invalid:a[5]!=a[7]};return a[5]!==void 0&&(X.value=a[5]),V=new Je({props:X}),ye.push(()=>Ce(V,"value",K)),S=new Ze({}),{c(){e=w("div"),n=w("section"),t=w("section"),l=w("div"),o=B("Delete this concept"),i=q(),r=w("div"),s=w("p"),u=B("This action cannot be undone."),m=q(),p=w("p"),f=B(`This will permanently delete the
                    `),c=w("span"),d=B(a[7]),b=B(` dataset and all its files. Please
                    type
                    `),k=w("span"),R=B(a[7]),G=B(" to confirm."),J=q(),O(V.$$.fragment),j=q(),D=w("button"),T=B(`I understand, delete this concept
                  `),O(S.$$.fragment),this.h()},l(I){e=E(I,"DIV",{class:!0});var Q=y(e);n=E(Q,"SECTION",{class:!0});var ne=y(n);t=E(ne,"SECTION",{class:!0});var Y=y(t);l=E(Y,"DIV",{class:!0});var ue=y(l);o=M(ue,"Delete this concept"),ue.forEach(h),i=F(Y),r=E(Y,"DIV",{class:!0});var oe=y(r);s=E(oe,"P",{class:!0});var pe=y(s);u=M(pe,"This action cannot be undone."),pe.forEach(h),m=F(oe),p=E(oe,"P",{});var le=y(p);f=M(le,`This will permanently delete the
                    `),c=E(le,"SPAN",{class:!0});var de=y(c);d=M(de,a[7]),de.forEach(h),b=M(le,` dataset and all its files. Please
                    type
                    `),k=E(le,"SPAN",{class:!0});var me=y(k);R=M(me,a[7]),me.forEach(h),G=M(le," to confirm."),le.forEach(h),oe.forEach(h),J=F(Y),L(V.$$.fragment,Y),j=F(Y),D=E(Y,"BUTTON",{class:!0});var ce=y(D);T=M(ce,`I understand, delete this concept
                  `),L(S.$$.fragment,ce),ce.forEach(h),Y.forEach(h),ne.forEach(h),Q.forEach(h),this.h()},h(){C(l,"class","text-lg text-gray-700"),C(s,"class","mb-2"),C(c,"class","font-bold"),C(k,"class","font-bold"),C(r,"class","mb-4 text-sm text-gray-500"),C(D,"class","mt-2 flex cursor-pointer flex-row justify-between p-4 text-left outline-red-400 hover:bg-gray-200"),D.disabled=g=a[5]!=a[7],Z(D,"cursor-not-allowed",a[5]!=a[7]),Z(D,"outline",a[5]==a[7]),Z(D,"opacity-50",a[5]!=a[7]),C(t,"class","flex flex-col gap-y-1"),C(n,"class","flex flex-col gap-y-1"),C(e,"class","flex flex-col gap-y-6")},m(I,Q){H(I,e,Q),_(e,n),_(n,t),_(t,l),_(l,o),_(t,i),_(t,r),_(r,s),_(s,u),_(r,m),_(r,p),_(p,f),_(p,c),_(c,d),_(p,b),_(p,k),_(k,R),_(p,G),_(t,J),A(V,t,null),_(t,j),_(t,D),_(D,T),A(S,D,null),N=!0,z||(P=ie(D,"click",a[20]),z=!0)},p(I,Q){(!N||Q&128)&&se(d,I[7]),(!N||Q&128)&&se(R,I[7]);const ne={};Q&160&&(ne.invalid=I[5]!=I[7]),!W&&Q&32&&(W=!0,ne.value=I[5],Ie(()=>W=!1)),V.$set(ne),(!N||Q&160&&g!==(g=I[5]!=I[7]))&&(D.disabled=g),(!N||Q&160)&&Z(D,"cursor-not-allowed",I[5]!=I[7]),(!N||Q&160)&&Z(D,"outline",I[5]==I[7]),(!N||Q&160)&&Z(D,"opacity-50",I[5]!=I[7])},i(I){N||($(V.$$.fragment,I),$(S.$$.fragment,I),N=!0)},o(I){v(V.$$.fragment,I),v(S.$$.fragment,I),N=!1},d(I){I&&h(e),U(V),U(S),z=!1,P()}}}function rt(a){let e,n,t,l;const o=[ct,it],i=[];function r(s,u){return s[3].isFetching?0:1}return e=r(a),n=i[e]=o[e](a),{c(){n.c(),t=re()},l(s){n.l(s),t=re()},m(s,u){i[e].m(s,u),H(s,t,u),l=!0},p(s,u){let m=e;e=r(s),e===m?i[e].p(s,u):(x(),v(i[m],1,1,()=>{i[m]=null}),ee(),n=i[e],n?n.p(s,u):(n=i[e]=o[e](s),n.c()),$(n,1),n.m(t.parentNode,t))},i(s){l||($(n),l=!0)},o(s){v(n),l=!1},d(s){i[e].d(s),s&&h(t)}}}function it(a){let e,n,t,l,o,i,r,s,u,m,p,f,c,d,b,k,R,G,J,V;i=new Ye({props:{value:a[6].description||void 0,cols:50,placeholder:"Enter a description...",rows:3,class:"mb-2"}}),i.$on("input",a[13]),c=new Ke({props:{labelText:"Publicly visible",checked:a[6].is_public}}),c.$on("check",a[18]);const W=[ut,ft],j=[];function D(T,S){return T[6].is_public?0:1}return b=D(a),k=j[b]=W[b](a),{c(){e=w("div"),n=w("section"),t=w("div"),l=B("Description"),o=q(),O(i.$$.fragment),r=q(),s=w("section"),u=w("div"),m=B("Visibility"),p=q(),f=w("div"),O(c.$$.fragment),d=q(),k.c(),R=q(),G=w("div"),J=B(`Setting the concept to publicly visible will allow any user with access to this
                  Lilac instance to view this concept.`),this.h()},l(T){e=E(T,"DIV",{class:!0});var S=y(e);n=E(S,"SECTION",{class:!0});var g=y(n);t=E(g,"DIV",{class:!0});var N=y(t);l=M(N,"Description"),N.forEach(h),o=F(g),L(i.$$.fragment,g),g.forEach(h),r=F(S),s=E(S,"SECTION",{class:!0});var z=y(s);u=E(z,"DIV",{class:!0});var P=y(u);m=M(P,"Visibility"),P.forEach(h),p=F(z),f=E(z,"DIV",{class:!0});var K=y(f);L(c.$$.fragment,K),d=F(K),k.l(K),K.forEach(h),R=F(z),G=E(z,"DIV",{class:!0});var X=y(G);J=M(X,`Setting the concept to publicly visible will allow any user with access to this
                  Lilac instance to view this concept.`),X.forEach(h),z.forEach(h),S.forEach(h),this.h()},h(){C(t,"class","text-base"),C(n,"class","flex flex-col gap-y-1"),C(u,"class","text-base"),C(f,"class","flex flex-row items-center"),C(G,"class","text-xs font-light"),C(s,"class","flex flex-col gap-y-1"),C(e,"class","flex flex-col gap-y-6")},m(T,S){H(T,e,S),_(e,n),_(n,t),_(t,l),_(n,o),A(i,n,null),_(e,r),_(e,s),_(s,u),_(u,m),_(s,p),_(s,f),A(c,f,null),_(f,d),j[b].m(f,null),_(s,R),_(s,G),_(G,J),V=!0},p(T,S){const g={};S&64&&(g.value=T[6].description||void 0),i.$set(g);const N={};S&64&&(N.checked=T[6].is_public),c.$set(N);let z=b;b=D(T),b!==z&&(x(),v(j[z],1,1,()=>{j[z]=null}),ee(),k=j[b],k||(k=j[b]=W[b](T),k.c()),$(k,1),k.m(f,null))},i(T){V||($(i.$$.fragment,T),$(c.$$.fragment,T),$(k),V=!0)},o(T){v(i.$$.fragment,T),v(c.$$.fragment,T),v(k),V=!1},d(T){T&&h(e),U(i),U(c),j[b].d()}}}function ct(a){let e,n;return e=new Se({}),{c(){O(e.$$.fragment)},l(t){L(e.$$.fragment,t)},m(t,l){A(e,t,l),n=!0},p:ae,i(t){n||($(e.$$.fragment,t),n=!0)},o(t){v(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function ft(a){let e,n;return e=new xe({}),{c(){O(e.$$.fragment)},l(t){L(e.$$.fragment,t)},m(t,l){A(e,t,l),n=!0},i(t){n||($(e.$$.fragment,t),n=!0)},o(t){v(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function ut(a){let e,n;return e=new et({}),{c(){O(e.$$.fragment)},l(t){L(e.$$.fragment,t)},m(t,l){A(e,t,l),n=!0},i(t){n||($(e.$$.fragment,t),n=!0)},o(t){v(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function pt(a){let e,n,t,l,o,i,r,s;t=new je({props:{items:[{title:"General",value:"general"},{title:"Administration",value:"administration"}],item:a[4]}}),t.$on("select",a[17]);const u=[rt,ot],m=[];function p(f,c){return f[4]==="general"?0:f[4]==="administration"?1:-1}return~(i=p(a))&&(r=m[i]=u[i](a)),{c(){e=w("div"),n=w("div"),O(t.$$.fragment),l=q(),o=w("div"),r&&r.c(),this.h()},l(f){e=E(f,"DIV",{class:!0});var c=y(e);n=E(c,"DIV",{class:!0});var d=y(n);L(t.$$.fragment,d),d.forEach(h),l=F(c),o=E(c,"DIV",{class:!0});var b=y(o);r&&r.l(b),b.forEach(h),c.forEach(h),this.h()},h(){C(n,"class","-ml-4 mr-4 w-96 grow-0 p-1"),C(o,"class","flex w-full flex-col gap-y-6 rounded border border-gray-300 bg-white p-4"),C(e,"class","flex flex-row")},m(f,c){H(f,e,c),_(e,n),A(t,n,null),_(e,l),_(e,o),~i&&m[i].m(o,null),s=!0},p(f,c){const d={};c&16&&(d.item=f[4]),t.$set(d);let b=i;i=p(f),i===b?~i&&m[i].p(f,c):(r&&(x(),v(m[b],1,1,()=>{m[b]=null}),ee()),~i?(r=m[i],r?r.p(f,c):(r=m[i]=u[i](f),r.c()),$(r,1),r.m(o,null)):r=null)},i(f){s||($(t.$$.fragment,f),$(r),s=!0)},o(f){v(t.$$.fragment,f),v(r),s=!1},d(f){f&&h(e),U(t),~i&&m[i].d()}}}function dt(a){let e,n,t,l,o,i;return e=new Fe({props:{label:a[2],title:"Concept settings"}}),t=new ze({props:{hasForm:!0,$$slots:{default:[pt]},$$scope:{ctx:a}}}),o=new Ge({props:{danger:a[4]==="administration",primaryButtonText:"Save",secondaryButtonText:"Cancel",primaryButtonDisabled:a[4]==="administration"}}),o.$on("click:button--secondary",close),{c(){O(e.$$.fragment),n=q(),O(t.$$.fragment),l=q(),O(o.$$.fragment)},l(r){L(e.$$.fragment,r),n=F(r),L(t.$$.fragment,r),l=F(r),L(o.$$.fragment,r)},m(r,s){A(e,r,s),H(r,n,s),A(t,r,s),H(r,l,s),A(o,r,s),i=!0},p(r,s){const u={};s&4&&(u.label=r[2]),e.$set(u);const m={};s&8389118&&(m.$$scope={dirty:s,ctx:r}),t.$set(m);const p={};s&16&&(p.danger=r[4]==="administration"),s&16&&(p.primaryButtonDisabled=r[4]==="administration"),o.$set(p)},i(r){i||($(e.$$.fragment,r),$(t.$$.fragment,r),$(o.$$.fragment,r),i=!0)},o(r){v(e.$$.fragment,r),v(t.$$.fragment,r),v(o.$$.fragment,r),i=!1},d(r){U(e,r),r&&h(n),U(t,r),r&&h(l),U(o,r)}}}function mt(a){let e,n;return e=new Ae({props:{open:a[0],$$slots:{default:[dt]},$$scope:{ctx:a}}}),e.$on("submit",a[12]),e.$on("close",a[21]),{c(){O(e.$$.fragment)},l(t){L(e.$$.fragment,t)},m(t,l){A(e,t,l),n=!0},p(t,[l]){const o={};l&1&&(o.open=t[0]),l&8389118&&(o.$$scope={dirty:l,ctx:t}),e.$set(o)},i(t){n||($(e.$$.fragment,t),n=!0)},o(t){v(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function _t(a,e,n){let t,l,o,i,r,s,u,{namespace:m}=e,{conceptName:p}=e;const f=Ne();te(a,f,g=>n(3,s=g));const c=Ue();te(a,c,g=>n(16,r=g));let{open:d=!1}=e,b="general";const k=He();te(a,k,g=>n(22,i=g));function R(){n(0,d=!1),l!=null&&i.mutate([m,p,l])}function G(g){const N=g.target.value;n(6,l={...l,description:N})}let J="";const V=Ve();te(a,V,g=>n(8,u=g));const W=g=>n(4,b=g.detail),j=g=>n(6,l={...l,is_public:g.detail});function D(g){J=g,n(5,J)}const T=()=>u.mutate([m,p],{onSuccess:()=>fe("/")}),S=()=>n(0,d=!1);return a.$$set=g=>{"namespace"in g&&n(1,m=g.namespace),"conceptName"in g&&n(2,p=g.conceptName),"open"in g&&n(0,d=g.open)},a.$$.update=()=>{var g;a.$$.dirty&14&&n(15,t=(g=s.data)==null?void 0:g.find(N=>N.namespace===m&&N.name===p)),a.$$.dirty&32768&&n(6,l=(t==null?void 0:t.metadata)||{}),a.$$.dirty&65542&&n(7,o=qe(m,p,r.data))},[d,m,p,s,b,J,l,o,u,f,c,k,R,G,V,t,r,W,j,D,T,S]}class ht extends ke{constructor(e){super(),we(this,e,_t,mt,Ee,{namespace:1,conceptName:2,open:0})}}function ge(a){let e,n,t,l;const o=[bt,$t,gt],i=[];function r(s,u){var m,p,f;return(m=s[10])!=null&&m.isLoading?0:(p=s[10])!=null&&p.isError?1:(f=s[10])!=null&&f.isSuccess?2:-1}return~(e=r(a))&&(n=i[e]=o[e](a)),{c(){n&&n.c(),t=re()},l(s){n&&n.l(s),t=re()},m(s,u){~e&&i[e].m(s,u),H(s,t,u),l=!0},p(s,u){let m=e;e=r(s),e===m?~e&&i[e].p(s,u):(n&&(x(),v(i[m],1,1,()=>{i[m]=null}),ee()),~e?(n=i[e],n?n.p(s,u):(n=i[e]=o[e](s),n.c()),$(n,1),n.m(t.parentNode,t)):n=null)},i(s){l||($(n),l=!0)},o(s){v(n),l=!1},d(s){~e&&i[e].d(s),s&&h(t)}}}function gt(a){let e,n;return e=new nt({props:{concept:a[10].data}}),{c(){O(e.$$.fragment)},l(t){L(e.$$.fragment,t)},m(t,l){A(e,t,l),n=!0},p(t,l){const o={};l&1024&&(o.concept=t[10].data),e.$set(o)},i(t){n||($(e.$$.fragment,t),n=!0)},o(t){v(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function $t(a){let e,n=a[10].error+"",t;return{c(){e=w("p"),t=B(n)},l(l){e=E(l,"P",{});var o=y(e);t=M(o,n),o.forEach(h)},m(l,o){H(l,e,o),_(e,t)},p(l,o){o&1024&&n!==(n=l[10].error+"")&&se(t,n)},i:ae,o:ae,d(l){l&&h(e)}}}function bt(a){let e,n;return e=new Se({}),{c(){O(e.$$.fragment)},l(t){L(e.$$.fragment,t)},m(t,l){A(e,t,l),n=!0},p:ae,i(t){n||($(e.$$.fragment,t),n=!0)},o(t){v(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function $e(a){let e,n;return e=new lt({props:{danger:!0,open:!0,modalHeading:"Delete concept",primaryButtonText:"Delete",primaryButtonIcon:a[9].isLoading?he:void 0,secondaryButtonText:"Cancel",$$slots:{default:[vt]},$$scope:{ctx:a}}}),e.$on("click:button--secondary",a[20]),e.$on("close",a[21]),e.$on("submit",a[22]),{c(){O(e.$$.fragment)},l(t){L(e.$$.fragment,t)},m(t,l){A(e,t,l),n=!0},p(t,l){const o={};l&512&&(o.primaryButtonIcon=t[9].isLoading?he:void 0),l&16777224&&(o.$$scope={dirty:l,ctx:t}),e.$set(o)},i(t){n||($(e.$$.fragment,t),n=!0)},o(t){v(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function vt(a){let e,n,t,l=a[3].namespace+"",o,i,r=a[3].name+"",s,u,m,p,f;return{c(){e=w("p"),n=B("Confirm deleting "),t=w("code"),o=B(l),i=B("/"),s=B(r),u=B(" ?"),m=q(),p=w("p"),f=B("This is a permanent action and cannot be undone."),this.h()},l(c){e=E(c,"P",{class:!0});var d=y(e);n=M(d,"Confirm deleting "),t=E(d,"CODE",{});var b=y(t);o=M(b,l),i=M(b,"/"),s=M(b,r),b.forEach(h),u=M(d," ?"),d.forEach(h),m=F(c),p=E(c,"P",{class:!0});var k=y(p);f=M(k,"This is a permanent action and cannot be undone."),k.forEach(h),this.h()},h(){C(e,"class","!text-lg"),C(p,"class","mt-2")},m(c,d){H(c,e,d),_(e,n),_(e,t),_(t,o),_(t,i),_(t,s),_(e,u),H(c,m,d),H(c,p,d),_(p,f)},p(c,d){d&8&&l!==(l=c[3].namespace+"")&&se(o,l),d&8&&r!==(r=c[3].name+"")&&se(s,r)},d(c){c&&h(e),c&&h(m),c&&h(p)}}}function kt(a){let e,n,t,l,o,i,r,s=a[0]!=null&&a[1]!=null&&ge(a),u=a[3]&&$e(a);function m(f){a[23](f)}let p={namespace:a[0],conceptName:a[1]};return a[4]!==void 0&&(p.open=a[4]),o=new ht({props:p}),ye.push(()=>Ce(o,"open",m)),{c(){e=w("div"),n=w("div"),s&&s.c(),t=q(),u&&u.c(),l=q(),O(o.$$.fragment),this.h()},l(f){e=E(f,"DIV",{class:!0});var c=y(e);n=E(c,"DIV",{class:!0});var d=y(n);s&&s.l(d),d.forEach(h),c.forEach(h),t=F(f),u&&u.l(f),l=F(f),L(o.$$.fragment,f),this.h()},h(){C(n,"class","lilac-page flex w-full"),C(e,"class","flex h-full w-full overflow-x-hidden overflow-y-scroll")},m(f,c){H(f,e,c),_(e,n),s&&s.m(n,null),H(f,t,c),u&&u.m(f,c),H(f,l,c),A(o,f,c),r=!0},p(f,c){f[0]!=null&&f[1]!=null?s?(s.p(f,c),c&3&&$(s,1)):(s=ge(f),s.c(),$(s,1),s.m(n,null)):s&&(x(),v(s,1,1,()=>{s=null}),ee()),f[3]?u?(u.p(f,c),c&8&&$(u,1)):(u=$e(f),u.c(),$(u,1),u.m(l.parentNode,l)):u&&(x(),v(u,1,1,()=>{u=null}),ee());const d={};c&1&&(d.namespace=f[0]),c&2&&(d.conceptName=f[1]),!i&&c&16&&(i=!0,d.open=f[4],Ie(()=>i=!1)),o.$set(d)},i(f){r||($(s),$(u),$(o.$$.fragment,f),r=!0)},o(f){v(s),v(u),v(o.$$.fragment,f),r=!1},d(f){f&&h(e),s&&s.d(),f&&h(t),u&&u.d(f),f&&h(l),U(o,f)}}}function wt(a){let e,n=_e(a[0],a[1])+"",t,l,o;return{c(){e=w("a"),t=B(n),this.h()},l(i){e=E(i,"A",{class:!0,href:!0});var r=y(e);t=M(r,n),r.forEach(h),this.h()},h(){C(e,"class","font-semibold text-black"),C(e,"href",a[6])},m(i,r){H(i,e,r),_(e,t),l||(o=ie(e,"click",a[19]),l=!0)},p(i,r){r&3&&n!==(n=_e(i[0],i[1])+"")&&se(t,n),r&64&&C(e,"href",i[6])},d(i){i&&h(e),l=!1,o()}}}function Et(a){let e,n,t;return n=new We({props:{type:"green",$$slots:{default:[wt]},$$scope:{ctx:a}}}),{c(){e=w("div"),O(n.$$.fragment),this.h()},l(l){e=E(l,"DIV",{slot:!0});var o=y(e);L(n.$$.fragment,o),o.forEach(h),this.h()},h(){C(e,"slot","header-subtext")},m(l,o){H(l,e,o),A(n,e,null),t=!0},p(l,o){const i={};o&16777283&&(i.$$scope={dirty:o,ctx:l}),n.$set(i)},i(l){t||($(n.$$.fragment,l),t=!0)},o(l){v(n.$$.fragment,l),t=!1},d(l){l&&h(e),U(n)}}}function be(a){let e,n,t,l,o,i,r,s=a[5]&&ve();return l=new tt({}),{c(){e=w("div"),s&&s.c(),n=q(),t=w("button"),O(l.$$.fragment),this.h()},l(u){e=E(u,"DIV",{class:!0});var m=y(e);s&&s.l(m),n=F(m),t=E(m,"BUTTON",{class:!0});var p=y(t);L(l.$$.fragment,p),p.forEach(h),m.forEach(h),this.h()},h(){C(t,"class","p-3"),C(e,"class","relative flex flex-row justify-items-center")},m(u,m){H(u,e,m),s&&s.m(e,null),_(e,n),_(e,t),A(l,t,null),o=!0,i||(r=[Te(Pe.call(null,t,{text:"Copy the URL"})),ie(t,"click",a[17])],i=!0)},p(u,m){u[5]?s?m&32&&$(s,1):(s=ve(),s.c(),$(s,1),s.m(e,n)):s&&(x(),v(s,1,1,()=>{s=null}),ee())},i(u){o||($(s),$(l.$$.fragment,u),o=!0)},o(u){v(s),v(l.$$.fragment,u),o=!1},d(u){u&&h(e),s&&s.d(),U(l),i=!1,De(r)}}}function ve(a){let e,n,t,l;return{c(){e=w("div"),n=B("Copied!"),this.h()},l(o){e=E(o,"DIV",{class:!0});var i=y(e);n=M(i,"Copied!"),i.forEach(h),this.h()},h(){C(e,"class","absolute right-12 z-50 mt-2 rounded border border-neutral-300 bg-neutral-50 px-4 py-1 text-xs")},m(o,i){H(o,e,i),_(e,n),l=!0},i(o){l||(t&&t.end(1),l=!0)},o(o){t=Oe(e,at,{}),l=!1},d(o){o&&h(e),o&&t&&t.end()}}}function yt(a){var f;let e,n,t,l,o,i,r,s,u,m,p=((f=a[2])==null?void 0:f.metadata.is_public)&&be(a);return o=new st({props:{size:16}}),{c(){e=w("div"),p&&p.c(),n=q(),t=w("div"),l=w("button"),O(o.$$.fragment),this.h()},l(c){e=E(c,"DIV",{slot:!0,class:!0});var d=y(e);p&&p.l(d),n=F(d),t=E(d,"DIV",{});var b=y(t);l=E(b,"BUTTON",{title:!0,class:!0});var k=y(l);L(o.$$.fragment,k),k.forEach(h),b.forEach(h),d.forEach(h),this.h()},h(){C(l,"title","Concept settings"),l.disabled=i=!a[7],C(l,"class","p-3"),Z(t,"opacity-40",!a[7]),C(e,"slot","header-right"),C(e,"class","flex flex-row")},m(c,d){H(c,e,d),p&&p.m(e,null),_(e,n),_(e,t),_(t,l),A(o,l,null),s=!0,u||(m=[ie(l,"click",a[18]),Te(r=Pe.call(null,t,{text:a[7]?"Edit concept settings":"User does not have access to edit this concept."}))],u=!0)},p(c,d){var b;(b=c[2])!=null&&b.metadata.is_public?p?(p.p(c,d),d&4&&$(p,1)):(p=be(c),p.c(),$(p,1),p.m(e,n)):p&&(x(),v(p,1,1,()=>{p=null}),ee()),(!s||d&128&&i!==(i=!c[7]))&&(l.disabled=i),r&&Be(r.update)&&d&128&&r.update.call(null,{text:c[7]?"Edit concept settings":"User does not have access to edit this concept."}),(!s||d&128)&&Z(t,"opacity-40",!c[7])},i(c){s||($(p),$(o.$$.fragment,c),s=!0)},o(c){v(p),v(o.$$.fragment,c),s=!1},d(c){c&&h(e),p&&p.d(),U(o),u=!1,De(m)}}}function Ct(a){let e,n;return e=new Le({props:{$$slots:{"header-right":[yt],"header-subtext":[Et],default:[kt]},$$scope:{ctx:a}}}),{c(){O(e.$$.fragment)},l(t){L(e.$$.fragment,t)},m(t,l){A(e,t,l),n=!0},p(t,[l]){const o={};l&16779007&&(o.$$scope={dirty:l,ctx:t}),e.$set(o)},i(t){n||($(e.$$.fragment,t),n=!0)},o(t){v(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function It(a,e,n){let t,l,o,i,r,s,u,m,p=ae,f=()=>(p(),p=Me(t,P=>n(10,m=P)),t);a.$$.on_destroy.push(()=>p());let c,d;const b=Re();te(a,b,P=>n(16,u=P));let k=null;const R=Ne();te(a,R,P=>n(15,s=P));const G=Ve();te(a,G,P=>n(9,r=P));function J(){if(k==null)return;const{namespace:P,name:K}=k;r.mutate([P,K],{onSuccess:()=>{n(3,k=null),fe("/")}})}let V=!1,W=!1;const j=()=>navigator.clipboard.writeText(location.href).then(()=>{n(5,W=!0),setTimeout(()=>n(5,W=!1),2e3)},()=>{throw Error("Error copying link to clipboard.")}),D=()=>n(4,V=!0),T=()=>fe(i),S=()=>n(3,k=null),g=()=>n(3,k=null),N=()=>J();function z(P){V=P,n(4,V)}return a.$$.update=()=>{var P;if(a.$$.dirty&65539&&u.page==="concepts"&&u.identifier!=null){const[K,X]=u.identifier.split("/");(c!=K||d!=X)&&(n(0,c=K),n(1,d=X))}a.$$.dirty&3&&f(n(8,t=c&&d?Xe(c,d):void 0)),a.$$.dirty&32771&&n(2,l=(P=s.data)==null?void 0:P.find(K=>K.namespace===c&&K.name===d)),a.$$.dirty&4&&n(7,o=l==null?void 0:l.acls.write),a.$$.dirty&3&&n(6,i=Qe(c,d))},[c,d,l,k,V,W,i,o,t,r,m,b,R,G,J,s,u,j,D,T,S,g,N,z]}class Lt extends ke{constructor(e){super(),we(this,e,It,Ct,Ee,{})}}export{Lt as component};