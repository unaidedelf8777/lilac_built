import{P as At,am as Ot,ai as zt,S as Xe,i as Qe,s as We,k as d,q as A,a as C,y as K,l as p,m as h,r as O,h as i,c as F,z as M,n as f,b as T,a0 as u,A as L,u as he,g as x,d as S,B as U,O as Ye,N as Tt,al as Re,G as Be,an as Fe,v as Ee,f as Ie,L as Gt,a2 as Kt,p as qe,a1 as P,ab as Nt,F as bt,R as Mt,w as Lt,U as Ut,V as Bt}from"../chunks/index.6d58eddb.js";import{E as $t,D as jt}from"../chunks/DatasetFieldEmbeddingSelector.5b207ebd.js";import{P as Ht}from"../chunks/Page.a0832e69.js";import{w as Jt}from"../chunks/index.fcc110a5.js";import{bh as wt,bi as kt,z as Xt,M as Qt,F as Wt,G as Yt,bk as Rt,d as Pe,c as Zt,aR as es,I as ts,aT as ss,aU as ls,b9 as as}from"../chunks/Commands.f21feee1.js";import{T as rs}from"../chunks/TextArea.b1aacf82.js";import{c as Ce}from"../chunks/colors.f6cbcb11.js";import{S as ns}from"../chunks/Search.5f4df38b.js";class qt{static retrieval(e){return wt(kt,{method:"POST",url:"/api/v1/rag/retrieval",body:e,mediaType:"application/json",errors:{422:"Validation Error"}})}static generate(e){return wt(kt,{method:"POST",url:"/api/v1/rag/generate",body:e,mediaType:"application/json",errors:{422:"Validation Error"}})}}const je="RAG_VIEW_CONTEXT",Ct="{query_str}",He="{context_str}";function Je(){return{datasetNamespace:null,datasetName:null,path:null,embedding:null,query:null,promptTemplate:`Context information is below.
---------------------
${He}
---------------------
Given the context information and not prior knowledge, answer the query.
Query: ${Ct}
Answer: `,topK:10,windowSizeChunks:1}}function is(){const n=Je(),{subscribe:e,set:l,update:t}=Jt(JSON.parse(JSON.stringify(n)));return{subscribe:e,set:l,update:t,reset:()=>{l(JSON.parse(JSON.stringify(n)))},setDatasetPathEmbedding:(a,o,r)=>{t(c=>(a==null?(c.datasetNamespace=null,c.datasetName=null):(c.datasetNamespace=a.namespace,c.datasetName=a.name),c.path=o,c.embedding=r,c))},setQuestion:a=>{t(o=>(o.query=a,o))}}}function os(n){At(je,n)}function Ft(){if(!Ot(je))throw new Error("RagViewContext not found");return zt(je)}function us(n){let e,l;return e=new rs({props:{value:n[0]||void 0,placeholder:"Enter a prompt template...",rows:12,class:"mb-2 w-full"}}),e.$on("input",n[4]),{c(){K(e.$$.fragment)},l(t){M(e.$$.fragment,t)},m(t,s){L(e,t,s),l=!0},p(t,s){const a={};s&1&&(a.value=t[0]||void 0),e.$set(a)},i(t){l||(x(e.$$.fragment,t),l=!0)},o(t){S(e.$$.fragment,t),l=!1},d(t){U(e,t)}}}function cs(n){let e,l,t,s,a,o;return e=new Qt({props:{title:"Edit prompt template"}}),t=new Wt({props:{hasForm:!0,$$slots:{default:[us]},$$scope:{ctx:n}}}),a=new Yt({props:{primaryButtonText:"Save",secondaryButtonText:"Close",primaryButtonDisabled:!1}}),a.$on("click:button--secondary",n[10]),{c(){K(e.$$.fragment),l=C(),K(t.$$.fragment),s=C(),K(a.$$.fragment)},l(r){M(e.$$.fragment,r),l=F(r),M(t.$$.fragment,r),s=F(r),M(a.$$.fragment,r)},m(r,c){L(e,r,c),T(r,l,c),L(t,r,c),T(r,s,c),L(a,r,c),o=!0},p(r,c){const g={};c&16385&&(g.$$scope={dirty:c,ctx:r}),t.$set(g)},i(r){o||(x(e.$$.fragment,r),x(t.$$.fragment,r),x(a.$$.fragment,r),o=!0)},o(r){S(e.$$.fragment,r),S(t.$$.fragment,r),S(a.$$.fragment,r),o=!1},d(r){U(e,r),r&&i(l),U(t,r),r&&i(s),U(a,r)}}}function fs(n){let e,l,t,s,a,o;return a=new Xt({props:{open:n[1],$$slots:{default:[cs]},$$scope:{ctx:n}}}),a.$on("submit",n[5]),a.$on("close",n[11]),{c(){e=d("div"),l=d("div"),t=A(n[2]),s=C(),K(a.$$.fragment),this.h()},l(r){e=p(r,"DIV",{class:!0});var c=h(e);l=p(c,"DIV",{class:!0});var g=h(l);t=O(g,n[2]),g.forEach(i),c.forEach(i),s=F(r),M(a.$$.fragment,r),this.h()},h(){f(l,"class","h-96 w-full overflow-y-scroll whitespace-break-spaces font-mono leading-6"),f(e,"class","flex h-full w-full flex-col overflow-y-scroll")},m(r,c){T(r,e,c),u(e,l),u(l,t),T(r,s,c),L(a,r,c),o=!0},p(r,[c]){(!o||c&4)&&he(t,r[2]);const g={};c&2&&(g.open=r[1]),c&16387&&(g.$$scope={dirty:c,ctx:r}),a.$set(g)},i(r){o||(x(a.$$.fragment,r),o=!0)},o(r){S(a.$$.fragment,r),o=!1},d(r){r&&i(e),r&&i(s),U(a,r)}}}function ds(n,e,l){let t,s,a,{questionInputText:o}=e,{retrievalResults:r}=e;const c=Ft();Ye(n,c,m=>l(9,a=m));const g=Tt();let D=!1,y="";function N(m,B){return y.replace(Ct,m).replace(He,B)}function k(m){l(0,y=m.target.value)}function _(){l(1,D=!1)}const b=()=>{close(),l(1,D=!1)},I=()=>l(1,D=!1);return n.$$set=m=>{"questionInputText"in m&&l(6,o=m.questionInputText),"retrievalResults"in m&&l(7,r=m.retrievalResults)},n.$$.update=()=>{n.$$.dirty&512&&a.promptTemplate!=null&&l(0,y=a.promptTemplate),n.$$.dirty&128&&l(8,t=r==null?He:r.map(m=>m.text).join(`
`)),n.$$.dirty&320&&l(2,s=N(o,t)),n.$$.dirty&641&&r!=null&&a.query!=null&&g("promptTemplate",y)},[y,D,s,c,k,_,o,r,t,a,b,I]}class ps extends Xe{constructor(e){super(),Qe(this,e,ds,fs,We,{questionInputText:6,retrievalResults:7})}}const Pt="rag",hs=Rt(qt.retrieval,Pt),ms=Rt(qt.generate,Pt);function Et(n,e,l){const t=n.slice();t[9]=e[l];const s=t[9].match_spans[0];t[10]=s;const a=t[9].text.slice(0,t[10].start);t[11]=a;const o=t[9].text.slice(t[10].end);t[12]=o;const r=t[9].text.slice(t[10].start,t[10].end);return t[13]=r,t}function It(n){let e,l;return e=new Pe({props:{lines:n[1].topK}}),{c(){K(e.$$.fragment)},l(t){M(e.$$.fragment,t)},m(t,s){L(e,t,s),l=!0},p(t,s){const a={};s&2&&(a.lines=t[1].topK),e.$set(a)},i(t){l||(x(e.$$.fragment,t),l=!0)},o(t){S(e.$$.fragment,t),l=!1},d(t){U(e,t)}}}function Vt(n){let e,l=n[0].data,t=[];for(let s=0;s<l.length;s+=1)t[s]=yt(Et(n,l,s));return{c(){e=d("div");for(let s=0;s<t.length;s+=1)t[s].c();this.h()},l(s){e=p(s,"DIV",{class:!0});var a=h(e);for(let o=0;o<t.length;o+=1)t[o].l(a);a.forEach(i),this.h()},h(){f(e,"class","flex h-96 flex-col overflow-y-scroll")},m(s,a){T(s,e,a);for(let o=0;o<t.length;o+=1)t[o]&&t[o].m(e,null)},p(s,a){if(a&1){l=s[0].data;let o;for(o=0;o<l.length;o+=1){const r=Et(s,l,o);t[o]?t[o].p(r,a):(t[o]=yt(r),t[o].c(),t[o].m(e,null))}for(;o<t.length;o+=1)t[o].d(1);t.length=l.length}},d(s){s&&i(e),Kt(t,s)}}}function xt(n){let e,l=n[11]+"",t;return{c(){e=d("span"),t=A(l),this.h()},l(s){e=p(s,"SPAN",{class:!0});var a=h(e);t=O(a,l),a.forEach(i),this.h()},h(){f(e,"class","whitespace-break-spaces")},m(s,a){T(s,e,a),u(e,t)},p(s,a){a&1&&l!==(l=s[11]+"")&&he(t,l)},d(s){s&&i(e)}}}function Dt(n){let e,l=n[12]+"",t;return{c(){e=d("span"),t=A(l),this.h()},l(s){e=p(s,"SPAN",{class:!0});var a=h(e);t=O(a,l),a.forEach(i),this.h()},h(){f(e,"class","whitespace-break-spaces")},m(s,a){T(s,e,a),u(e,t)},p(s,a){a&1&&l!==(l=s[12]+"")&&he(t,l)},d(s){s&&i(e)}}}function yt(n){let e,l,t,s=n[9].score.toFixed(2)+"",a,o,r,c,g,D=n[13]+"",y,N,k,_=n[11]!=""&&xt(n),b=n[12]!=""&&Dt(n);return{c(){e=d("div"),l=d("div"),t=d("span"),a=A(s),o=C(),r=d("div"),_&&_.c(),c=C(),g=d("span"),y=A(D),N=C(),b&&b.c(),k=C(),this.h()},l(I){e=p(I,"DIV",{class:!0});var m=h(e);l=p(m,"DIV",{class:!0});var B=h(l);t=p(B,"SPAN",{class:!0});var J=h(t);a=O(J,s),J.forEach(i),B.forEach(i),o=F(m),r=p(m,"DIV",{class:!0});var $=h(r);_&&_.l($),c=F($),g=p($,"SPAN",{class:!0});var E=h(g);y=O(E,D),E.forEach(i),N=F($),b&&b.l($),$.forEach(i),k=F(m),m.forEach(i),this.h()},h(){f(t,"class","px-0.5"),qe(t,"background-color",Ce(n[9].score)),f(l,"class","w-16"),f(g,"class","whitespace-break-spaces"),qe(g,"background-color",Ce(n[9].score)),f(r,"class","grow"),f(e,"class","flex flex-row gap-x-2 border-b border-b-neutral-200 py-2 text-sm")},m(I,m){T(I,e,m),u(e,l),u(l,t),u(t,a),u(e,o),u(e,r),_&&_.m(r,null),u(r,c),u(r,g),u(g,y),u(r,N),b&&b.m(r,null),u(e,k)},p(I,m){m&1&&s!==(s=I[9].score.toFixed(2)+"")&&he(a,s),m&1&&qe(t,"background-color",Ce(I[9].score)),I[11]!=""?_?_.p(I,m):(_=xt(I),_.c(),_.m(r,c)):_&&(_.d(1),_=null),m&1&&D!==(D=I[13]+"")&&he(y,D),m&1&&qe(g,"background-color",Ce(I[9].score)),I[12]!=""?b?b.p(I,m):(b=Dt(I),b.c(),b.m(r,null)):b&&(b.d(1),b=null)},d(I){I&&i(e),_&&_.d(),b&&b.d()}}}function _s(n){var z,ne;let e,l,t,s,a,o,r,c,g,D,y,N,k,_,b,I,m,B,J,$=((z=n[0])==null?void 0:z.isFetching)&&It(n),E=((ne=n[0])==null?void 0:ne.data)!=null&&Vt(n);return{c(){e=d("div"),l=d("div"),t=d("div"),s=d("span"),a=A("Chunk window"),o=C(),r=d("input"),c=C(),g=d("div"),D=d("span"),y=A("Top K"),N=C(),k=d("input"),_=C(),b=d("div"),$&&$.c(),I=C(),E&&E.c(),this.h()},l(w){e=p(w,"DIV",{class:!0});var q=h(e);l=p(q,"DIV",{class:!0});var j=h(l);t=p(j,"DIV",{});var H=h(t);s=p(H,"SPAN",{class:!0});var te=h(s);a=O(te,"Chunk window"),te.forEach(i),o=F(H),r=p(H,"INPUT",{type:!0,class:!0,min:!0,max:!0}),H.forEach(i),c=F(j),g=p(j,"DIV",{});var V=h(g);D=p(V,"SPAN",{class:!0});var X=h(D);y=O(X,"Top K"),X.forEach(i),N=F(V),k=p(V,"INPUT",{type:!0,class:!0}),V.forEach(i),j.forEach(i),q.forEach(i),_=F(w),b=p(w,"DIV",{class:!0});var Q=h(b);$&&$.l(Q),I=F(Q),E&&E.l(Q),Q.forEach(i),this.h()},h(){f(s,"class","mr-2"),f(r,"type","number"),f(r,"class","w-16 px-2"),f(r,"min","0"),f(r,"max","10"),f(D,"class","mr-2"),f(k,"type","number"),f(k,"class","w-16 px-2"),f(l,"class","flex h-4 flex-row gap-x-4 font-normal"),f(e,"class","mb-4 flex w-full flex-row justify-between"),f(b,"class","mb-8 h-full")},m(w,q){T(w,e,q),u(e,l),u(l,t),u(t,s),u(s,a),u(t,o),u(t,r),Re(r,n[1].windowSizeChunks),u(l,c),u(l,g),u(g,D),u(D,y),u(g,N),u(g,k),Re(k,n[1].topK),T(w,_,q),T(w,b,q),$&&$.m(b,null),u(b,I),E&&E.m(b,null),m=!0,B||(J=[Be(r,"input",n[6]),Be(k,"input",n[7])],B=!0)},p(w,[q]){var j,H;q&2&&Fe(r.value)!==w[1].windowSizeChunks&&Re(r,w[1].windowSizeChunks),q&2&&Fe(k.value)!==w[1].topK&&Re(k,w[1].topK),(j=w[0])!=null&&j.isFetching?$?($.p(w,q),q&1&&x($,1)):($=It(w),$.c(),x($,1),$.m(b,I)):$&&(Ee(),S($,1,1,()=>{$=null}),Ie()),((H=w[0])==null?void 0:H.data)!=null?E?E.p(w,q):(E=Vt(w),E.c(),E.m(b,null)):E&&(E.d(1),E=null)},i(w){m||(x($),m=!0)},o(w){S($),m=!1},d(w){w&&i(e),w&&i(_),w&&i(b),$&&$.d(),E&&E.d(),B=!1,Gt(J)}}}function vs(n,e,l){let t,s,a=P,o=()=>(a(),a=Nt(t,_=>l(0,s=_)),t),r;n.$$.on_destroy.push(()=>a());let{retrievalResults:c=void 0}=e;const g=Ft();Ye(n,g,_=>l(1,r=_));let{isFetching:D=!1}=e;const y=Tt();function N(){r.windowSizeChunks=Fe(this.value),g.set(r)}function k(){r.topK=Fe(this.value),g.set(r)}return n.$$set=_=>{"retrievalResults"in _&&l(4,c=_.retrievalResults),"isFetching"in _&&l(5,D=_.isFetching)},n.$$.update=()=>{n.$$.dirty&2&&o(l(2,t=r.datasetNamespace!=null&&r.datasetName!=null&&r.embedding!=null&&r.query!=null&&r.path!=null&&r.topK!=null&&r.windowSizeChunks!=null?hs({dataset_namespace:r.datasetNamespace,dataset_name:r.datasetName,embedding:r.embedding,query:r.query,path:r.path,chunk_window:r.windowSizeChunks,top_k:r.topK}):null)),n.$$.dirty&1&&l(5,D=(s==null?void 0:s.isFetching)??!1),n.$$.dirty&1&&l(4,c=s==null?void 0:s.data),n.$$.dirty&1&&(s==null?void 0:s.data)!=null&&!(s!=null&&s.isStale)&&y("results",s==null?void 0:s.data)},[s,r,t,g,c,D,N,k]}class gs extends Xe{constructor(e){super(),Qe(this,e,vs,_s,We,{retrievalResults:4,isFetching:5})}}function bs(n){let e,l;return{c(){e=d("div"),l=A("Press enter to answer the question."),this.h()},l(t){e=p(t,"DIV",{class:!0});var s=h(e);l=O(s,"Press enter to answer the question."),s.forEach(i),this.h()},h(){f(e,"class","whitespace-break-spaces font-light italic leading-5")},m(t,s){T(t,e,s),u(e,l)},p:P,i:P,o:P,d(t){t&&i(e)}}}function $s(n){let e,l,t;return l=new as({props:{source:n[11]}}),{c(){e=d("div"),K(l.$$.fragment),this.h()},l(s){e=p(s,"DIV",{class:!0});var a=h(e);M(l.$$.fragment,a),a.forEach(i),this.h()},h(){f(e,"class","markdown whitespace-break-spaces leading-5 svelte-dmtvg5")},m(s,a){T(s,e,a),L(l,e,null),t=!0},p(s,a){const o={};a&2048&&(o.source=s[11]),l.$set(o)},i(s){t||(x(l.$$.fragment,s),t=!0)},o(s){S(l.$$.fragment,s),t=!1},d(s){s&&i(e),U(l)}}}function ws(n){let e,l;return e=new Pe({}),{c(){K(e.$$.fragment)},l(t){M(e.$$.fragment,t)},m(t,s){L(e,t,s),l=!0},p:P,i(t){l||(x(e.$$.fragment,t),l=!0)},o(t){S(e.$$.fragment,t),l=!1},d(t){U(e,t)}}}function ks(n){let e,l;return{c(){e=d("div"),l=A("None"),this.h()},l(t){e=p(t,"DIV",{class:!0});var s=h(e);l=O(s,"None"),s.forEach(i),this.h()},h(){f(e,"class","text-right italic")},m(t,s){T(t,e,s),u(e,l)},p:P,i:P,o:P,d(t){t&&i(e)}}}function Es(n){let e,l=n[12].toLocaleString()+"",t;return{c(){e=d("div"),t=A(l),this.h()},l(s){e=p(s,"DIV",{class:!0});var a=h(e);t=O(a,l),a.forEach(i),this.h()},h(){f(e,"class","text-right")},m(s,a){T(s,e,a),u(e,t)},p(s,a){a&4096&&l!==(l=s[12].toLocaleString()+"")&&he(t,l)},i:P,o:P,d(s){s&&i(e)}}}function Is(n){let e,l,t;return l=new Pe({}),{c(){e=d("div"),K(l.$$.fragment),this.h()},l(s){e=p(s,"DIV",{class:!0});var a=h(e);M(l.$$.fragment,a),a.forEach(i),this.h()},h(){f(e,"class","w-8")},m(s,a){T(s,e,a),L(l,e,null),t=!0},p:P,i(s){t||(x(l.$$.fragment,s),t=!0)},o(s){S(l.$$.fragment,s),t=!1},d(s){s&&i(e),U(l)}}}function Vs(n){let e,l;return{c(){e=d("div"),l=A("None"),this.h()},l(t){e=p(t,"DIV",{class:!0});var s=h(e);l=O(s,"None"),s.forEach(i),this.h()},h(){f(e,"class","text-right italic")},m(t,s){T(t,e,s),u(e,l)},p:P,i:P,o:P,d(t){t&&i(e)}}}function xs(n){let e,l=n[13].toLocaleString()+"",t;return{c(){e=d("div"),t=A(l),this.h()},l(s){e=p(s,"DIV",{class:!0});var a=h(e);t=O(a,l),a.forEach(i),this.h()},h(){f(e,"class","text-right")},m(s,a){T(s,e,a),u(e,t)},p(s,a){a&8192&&l!==(l=s[13].toLocaleString()+"")&&he(t,l)},i:P,o:P,d(s){s&&i(e)}}}function Ds(n){let e,l,t;return l=new Pe({}),{c(){e=d("div"),K(l.$$.fragment),this.h()},l(s){e=p(s,"DIV",{class:!0});var a=h(e);M(l.$$.fragment,a),a.forEach(i),this.h()},h(){f(e,"class","w-8")},m(s,a){T(s,e,a),L(l,e,null),t=!0},p:P,i(s){t||(x(l.$$.fragment,s),t=!0)},o(s){S(l.$$.fragment,s),t=!1},d(s){s&&i(e),U(l)}}}function ys(n){let e,l,t;return{c(){e=d("div"),l=d("div"),t=A("Retrieval"),this.h()},l(s){e=p(s,"DIV",{slot:!0,class:!0});var a=h(e);l=p(a,"DIV",{class:!0});var o=h(l);t=O(o,"Retrieval"),o.forEach(i),a.forEach(i),this.h()},h(){f(l,"class","font-medium"),f(e,"slot","above"),f(e,"class","flex flex-row gap-x-12")},m(s,a){T(s,e,a),u(e,l),u(l,t)},p:P,d(s){s&&i(e)}}}function Ss(n){let e,l,t,s;function a(r){n[19](r)}let o={};return n[10]!==void 0&&(o.isFetching=n[10]),l=new gs({props:o}),Lt.push(()=>Ut(l,"isFetching",a)),l.$on("results",n[20]),{c(){e=d("div"),K(l.$$.fragment),this.h()},l(r){e=p(r,"DIV",{slot:!0});var c=h(e);M(l.$$.fragment,c),c.forEach(i),this.h()},h(){f(e,"slot","below")},m(r,c){T(r,e,c),L(l,e,null),s=!0},p(r,c){const g={};!t&&c&1024&&(t=!0,g.isFetching=r[10],Bt(()=>t=!1)),l.$set(g)},i(r){s||(x(l.$$.fragment,r),s=!0)},o(r){S(l.$$.fragment,r),s=!1},d(r){r&&i(e),U(l)}}}function Ts(n){let e,l,t;return{c(){e=d("div"),l=d("div"),t=A("Generation"),this.h()},l(s){e=p(s,"DIV",{slot:!0,class:!0});var a=h(e);l=p(a,"DIV",{class:!0});var o=h(l);t=O(o,"Generation"),o.forEach(i),a.forEach(i),this.h()},h(){f(l,"class","font-medium"),f(e,"slot","above"),f(e,"class","flex flex-row gap-x-12")},m(s,a){T(s,e,a),u(e,l),u(l,t)},p:P,d(s){s&&i(e)}}}function Ns(n){let e,l,t;return l=new ps({props:{questionInputText:n[0],retrievalResults:n[1]}}),l.$on("promptTemplate",n[22]),{c(){e=d("div"),K(l.$$.fragment),this.h()},l(s){e=p(s,"DIV",{slot:!0});var a=h(e);M(l.$$.fragment,a),a.forEach(i),this.h()},h(){f(e,"slot","below")},m(s,a){T(s,e,a),L(l,e,null),t=!0},p(s,a){const o={};a&1&&(o.questionInputText=s[0]),a&2&&(o.retrievalResults=s[1]),l.$set(o)},i(s){t||(x(l.$$.fragment,s),t=!0)},o(s){S(l.$$.fragment,s),t=!1},d(s){s&&i(e),U(l)}}}function Rs(n){let e,l,t,s,a,o,r,c,g,D,y,N,k,_,b,I,m,B,J,$,E,z,ne,w,q,j,H,te,V,X,Q,pe,me,ie,le,_e,Ae,Oe,W,Y,ze,ae,ve,Ge,Ke,Z,ee,Me,oe,re,Le,ue,ge,Ue,Ze;_=new ns({props:{size:16}}),m=new ts({props:{value:n[0],size:"xl",disabled:n[5].datasetName==null,placeholder:n[5].datasetName!=null?"Enter a question":"Choose a dataset"}}),m.$on("input",n[15]),m.$on("change",n[16]);const et=[ws,$s,bs],ce=[];function tt(v,R){var G;return(G=v[4])!=null&&G.isFetching||v[10]?0:v[11]!=null?1:2}E=tt(n),z=ce[E]=et[E](n);const st=[Is,Es,ks],fe=[];function lt(v,R){var G;return(G=v[4])!=null&&G.isFetching||v[10]?0:v[12]!=null?1:2}W=lt(n),Y=fe[W]=st[W](n);const at=[Ds,xs,Vs],de=[];function rt(v,R){var G;return(G=v[4])!=null&&G.isFetching||v[10]?0:v[13]!=null?1:2}return Z=rt(n),ee=de[Z]=at[Z](n),re=new $t({props:{expanded:!0,$$slots:{below:[Ss],above:[ys]},$$scope:{ctx:n}}}),re.$on("results",n[21]),ue=new $t({props:{$$slots:{below:[Ns],above:[Ts]},$$scope:{ctx:n}}}),{c(){e=d("div"),l=d("div"),t=d("div"),s=d("div"),a=d("div"),o=d("div"),r=d("div"),c=d("div"),g=A("Question"),D=C(),y=d("div"),N=d("div"),k=d("button"),K(_.$$.fragment),I=C(),K(m.$$.fragment),B=C(),J=d("div"),$=d("div"),z.c(),ne=C(),w=d("div"),q=d("div"),j=d("div"),H=d("div"),te=d("div"),V=d("div"),X=d("div"),Q=A("Editor"),pe=C(),me=d("div"),ie=d("div"),le=d("div"),_e=d("div"),Ae=A("Input tokens"),Oe=C(),Y.c(),ze=C(),ae=d("div"),ve=d("div"),Ge=A("Output tokens"),Ke=C(),ee.c(),Me=C(),oe=d("div"),K(re.$$.fragment),Le=C(),K(ue.$$.fragment),this.h()},l(v){e=p(v,"DIV",{class:!0});var R=h(e);l=p(R,"DIV",{class:!0});var G=h(l);t=p(G,"DIV",{class:!0});var se=h(t);s=p(se,"DIV",{class:!0});var be=h(s);a=p(be,"DIV",{class:!0});var $e=h(a);o=p($e,"DIV",{class:!0});var we=h(o);r=p(we,"DIV",{});var ke=h(r);c=p(ke,"DIV",{class:!0});var nt=h(c);g=O(nt,"Question"),nt.forEach(i),ke.forEach(i),we.forEach(i),$e.forEach(i),be.forEach(i),D=F(se),y=p(se,"DIV",{class:!0});var it=h(y);N=p(it,"DIV",{class:!0});var Ve=h(N);k=p(Ve,"BUTTON",{class:!0});var ot=h(k);M(_.$$.fragment,ot),ot.forEach(i),I=F(Ve),M(m.$$.fragment,Ve),Ve.forEach(i),it.forEach(i),B=F(se),J=p(se,"DIV",{class:!0});var ut=h(J);$=p(ut,"DIV",{});var ct=h($);z.l(ct),ct.forEach(i),ut.forEach(i),se.forEach(i),ne=F(G),w=p(G,"DIV",{class:!0});var xe=h(w);q=p(xe,"DIV",{});var De=h(q);j=p(De,"DIV",{class:!0});var ft=h(j);H=p(ft,"DIV",{class:!0});var dt=h(H);te=p(dt,"DIV",{class:!0});var pt=h(te);V=p(pt,"DIV",{});var ht=h(V);X=p(ht,"DIV",{class:!0});var mt=h(X);Q=O(mt,"Editor"),mt.forEach(i),ht.forEach(i),pt.forEach(i),dt.forEach(i),ft.forEach(i),pe=F(De),me=p(De,"DIV",{class:!0});var _t=h(me);ie=p(_t,"DIV",{class:!0});var ye=h(ie);le=p(ye,"DIV",{class:!0});var Se=h(le);_e=p(Se,"DIV",{class:!0});var vt=h(_e);Ae=O(vt,"Input tokens"),vt.forEach(i),Oe=F(Se),Y.l(Se),Se.forEach(i),ze=F(ye),ae=p(ye,"DIV",{class:!0});var Te=h(ae);ve=p(Te,"DIV",{class:!0});var gt=h(ve);Ge=O(gt,"Output tokens"),gt.forEach(i),Ke=F(Te),ee.l(Te),Te.forEach(i),ye.forEach(i),_t.forEach(i),De.forEach(i),Me=F(xe),oe=p(xe,"DIV",{class:!0});var Ne=h(oe);M(re.$$.fragment,Ne),Le=F(Ne),M(ue.$$.fragment,Ne),Ne.forEach(i),xe.forEach(i),G.forEach(i),R.forEach(i),this.h()},h(){f(c,"class","px-6 py-3"),f(o,"class","bg-neutral-100 text-xs uppercase text-gray-700"),f(a,"class","w-full text-left text-sm text-gray-500 rtl:text-right"),f(s,"class","relative overflow-x-auto rounded-t-xl"),f(k,"class","z-10 -mr-10 mb-2"),k.disabled=b=n[5].datasetName==null,bt(k,"opacity-10",n[5].datasetName==null),f(N,"class","question-input flex w-full flex-row items-end"),f(y,"class","mx-6 mt-2 flex flex-col gap-y-4"),f(J,"class","mx-6 mb-4 mt-4 flex flex-col gap-y-4"),f(t,"class","flex h-fit w-1/2 flex-col gap-y-4 rounded-xl border border-gray-300"),f(X,"class","px-6 py-3"),f(te,"class","bg-gray-100 text-xs uppercase text-gray-700"),f(H,"class","w-full text-left text-sm text-gray-500 rtl:text-right"),f(j,"class","relative overflow-x-auto rounded-t-xl"),f(_e,"class","w-48 px-6 text-gray-900 backdrop:whitespace-nowrap"),f(le,"class","flex flex-row bg-white"),f(ve,"class","w-48 whitespace-nowrap px-6 text-gray-900"),f(ae,"class","flex flex-row bg-white"),f(ie,"class","mt-4 flex flex-col gap-y-2 text-left text-sm text-gray-500 rtl:text-right"),f(me,"class","relative w-full overflow-x-auto rounded-xl"),f(oe,"class","mx-4 mb-4 flex flex-col gap-y-4"),f(w,"class","flex w-1/2 flex-col gap-y-4 rounded-xl border border-gray-300"),f(l,"class","mx-4 mb-8 mt-8 flex flex-row gap-x-8 px-4"),f(e,"class","flex-grow overflow-y-scroll")},m(v,R){T(v,e,R),u(e,l),u(l,t),u(t,s),u(s,a),u(a,o),u(o,r),u(r,c),u(c,g),u(t,D),u(t,y),u(y,N),u(N,k),L(_,k,null),u(N,I),L(m,N,null),u(t,B),u(t,J),u(J,$),ce[E].m($,null),u(l,ne),u(l,w),u(w,q),u(q,j),u(j,H),u(H,te),u(te,V),u(V,X),u(X,Q),u(q,pe),u(q,me),u(me,ie),u(ie,le),u(le,_e),u(_e,Ae),u(le,Oe),fe[W].m(le,null),u(ie,ze),u(ie,ae),u(ae,ve),u(ve,Ge),u(ae,Ke),de[Z].m(ae,null),u(w,Me),u(w,oe),L(re,oe,null),u(oe,Le),L(ue,oe,null),ge=!0,Ue||(Ze=Be(k,"click",n[18]),Ue=!0)},p(v,R){(!ge||R&32&&b!==(b=v[5].datasetName==null))&&(k.disabled=b),(!ge||R&32)&&bt(k,"opacity-10",v[5].datasetName==null);const G={};R&1&&(G.value=v[0]),R&32&&(G.disabled=v[5].datasetName==null),R&32&&(G.placeholder=v[5].datasetName!=null?"Enter a question":"Choose a dataset"),m.$set(G);let se=E;E=tt(v),E===se?ce[E].p(v,R):(Ee(),S(ce[se],1,1,()=>{ce[se]=null}),Ie(),z=ce[E],z?z.p(v,R):(z=ce[E]=et[E](v),z.c()),x(z,1),z.m($,null));let be=W;W=lt(v),W===be?fe[W].p(v,R):(Ee(),S(fe[be],1,1,()=>{fe[be]=null}),Ie(),Y=fe[W],Y?Y.p(v,R):(Y=fe[W]=st[W](v),Y.c()),x(Y,1),Y.m(le,null));let $e=Z;Z=rt(v),Z===$e?de[Z].p(v,R):(Ee(),S(de[$e],1,1,()=>{de[$e]=null}),Ie(),ee=de[Z],ee?ee.p(v,R):(ee=de[Z]=at[Z](v),ee.c()),x(ee,1),ee.m(ae,null));const we={};R&16778242&&(we.$$scope={dirty:R,ctx:v}),re.$set(we);const ke={};R&16777223&&(ke.$$scope={dirty:R,ctx:v}),ue.$set(ke)},i(v){ge||(x(_.$$.fragment,v),x(m.$$.fragment,v),x(z),x(Y),x(ee),x(re.$$.fragment,v),x(ue.$$.fragment,v),ge=!0)},o(v){S(_.$$.fragment,v),S(m.$$.fragment,v),S(z),S(Y),S(ee),S(re.$$.fragment,v),S(ue.$$.fragment,v),ge=!1},d(v){v&&i(e),U(_),U(m),ce[E].d(),fe[W].d(),de[Z].d(),U(re),U(ue),Ue=!1,Ze()}}}function qs(n){let e,l;return{c(){e=d("div"),l=A("Retrieval Augmented Generation (RAG)"),this.h()},l(t){e=p(t,"DIV",{slot:!0,class:!0});var s=h(e);l=O(s,"Retrieval Augmented Generation (RAG)"),s.forEach(i),this.h()},h(){f(e,"slot","header-subtext"),f(e,"class","text-lg")},m(t,s){T(t,e,s),u(e,l)},p:P,d(t){t&&i(e)}}}function St(n){let e,l;return e=new jt({props:{inputSize:"sm",dataset:n[7],path:n[8],embedding:n[9]}}),e.$on("change",n[17]),{c(){K(e.$$.fragment)},l(t){M(e.$$.fragment,t)},m(t,s){L(e,t,s),l=!0},p(t,s){const a={};s&128&&(a.dataset=t[7]),s&256&&(a.path=t[8]),s&512&&(a.embedding=t[9]),e.$set(a)},i(t){l||(x(e.$$.fragment,t),l=!0)},o(t){S(e.$$.fragment,t),l=!1},d(t){U(e,t)}}}function Cs(n){let e,l,t=n[6]&&St(n);return{c(){e=d("div"),t&&t.c(),this.h()},l(s){e=p(s,"DIV",{slot:!0,class:!0});var a=h(e);t&&t.l(a),a.forEach(i),this.h()},h(){f(e,"slot","header-right"),f(e,"class","dataset-selector py-2 svelte-dmtvg5")},m(s,a){T(s,e,a),t&&t.m(e,null),l=!0},p(s,a){s[6]?t?(t.p(s,a),a&64&&x(t,1)):(t=St(s),t.c(),x(t,1),t.m(e,null)):t&&(Ee(),S(t,1,1,()=>{t=null}),Ie())},i(s){l||(x(t),l=!0)},o(s){S(t),l=!1},d(s){s&&i(e),t&&t.d()}}}function Fs(n){let e,l;return e=new Ht({props:{hideTasks:!0,$$slots:{"header-right":[Cs],"header-subtext":[qs],default:[Rs]},$$scope:{ctx:n}}}),{c(){K(e.$$.fragment)},l(t){M(e.$$.fragment,t)},m(t,s){L(e,t,s),l=!0},p(t,[s]){const a={};s&16793591&&(a.$$scope={dirty:s,ctx:t}),e.$set(a)},i(t){l||(x(e.$$.fragment,t),l=!0)},o(t){S(e.$$.fragment,t),l=!1},d(t){U(e,t)}}}const Ps="";function As(n,e,l){let t,s,a=P,o=()=>(a(),a=Nt(t,V=>l(4,s=V)),t),r;n.$$.on_destroy.push(()=>a());const c=is();Ye(n,c,V=>l(5,r=V)),os(c);const g=Zt();let D=!1;es("rag",Ps,c,g,V=>ls(V,Je()),V=>ss(V,Je()),()=>{l(6,D=!0)});let y,N,k,_="",b,I=!1,m,B=null,J=null,$=null;function E(V){l(11,B=null),l(1,b=void 0),l(0,_=`${V.detail}`)}function z(){c.setQuestion(_)}const ne=V=>{const{dataset:X,path:Q,embedding:pe}=V.detail;(X!=y||Q!=N||pe!=k)&&(l(7,y=X),l(8,N=Q),l(9,k=pe),c.setDatasetPathEmbedding(X,Q,pe))},w=()=>z();function q(V){I=V,l(10,I)}const j=V=>l(1,b=V.detail);function H(V){Mt.call(this,n,V)}const te=V=>{l(2,m=V.detail)};return n.$$.update=()=>{n.$$.dirty&32&&(r.datasetNamespace!=null&&r.datasetName!=null&&l(7,y={namespace:r.datasetNamespace,name:r.datasetName}),r.path!=null&&l(8,N=r.path),r.embedding!=null&&l(9,k=r.embedding)),n.$$.dirty&32&&r.query!=null&&l(0,_=r.query),n.$$.dirty&7&&o(l(3,t=_!=null&&m!=null&&b!=null?ms({query:_,prompt_template:m,retrieval_results:b}):null)),n.$$.dirty&24&&t!=null&&(s==null?void 0:s.data)!=null&&!s.isFetching&&!s.isStale&&(l(11,B=s.data.result),l(12,J=s.data.num_input_tokens),l(13,$=s.data.num_output_tokens))},[_,b,m,t,s,r,D,y,N,k,I,B,J,$,c,E,z,ne,w,q,j,H,te]}class js extends Xe{constructor(e){super(),Qe(this,e,As,Fs,We,{})}}export{js as component};
