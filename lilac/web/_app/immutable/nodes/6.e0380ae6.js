import{S as X,i as Z,s as K,e as H,b as Q,v as U,d as k,f as Y,g as p,h as T,a1 as A,ab as ne,w as $,U as z,y as S,z as I,A as N,V as J,B as w,C as ve,D as W,k as V,l as q,m as F,E as ie,F as P,G,H as ke,I as Te,J as Ee,K as ue,L as oe,M as ae,Q as fe,R as B,a as j,c as L,a0 as E,q as O,r as R,n as M,u as ye,O as se,a2 as He}from"../chunks/index.6d58eddb.js";import{g as Me}from"../chunks/navigation.aea35273.js";import{bh as Se,bi as Ie,bj as Ne,I as le,bk as we,bl as $e,bm as je,a as Le,bn as Oe,aJ as Re,B as ze,al as De,d as Je,bo as Ke}from"../chunks/Commands.f21feee1.js";import{P as Ue}from"../chunks/Page.a0832e69.js";import{C as re}from"../chunks/ComboBox.fb0d815b.js";import{R as Ye,a as We}from"../chunks/RadioButtonGroup.b8f63d91.js";class Xe{static getLangsmithDatasets(){return Se(Ie,{method:"GET",url:"/api/v1/langsmith/datasets"})}}class Ze{static getTables(e){return Se(Ie,{method:"GET",url:"/api/v1/sqlite/tables",query:{db_file:e},errors:{422:"Validation Error"}})}}const Qe="huggingface",ce=l=>Ne({queryFn:()=>fetch(`https://datasets-server.huggingface.co/is-valid?dataset=${l}`).then(e=>e.status===200),queryKey:[Qe,"isValid",l]}),Ve=(l,e)=>Ne({queryFn:()=>fetch(`https://datasets-server.huggingface.co/splits?dataset=${l}&config=${e||""}`).then(t=>t.json()),queryKey:[Qe,"getSplits",l,e],select:t=>t.splits});function xe(l){let e,t,n;function r(a){l[14](a)}let s={invalid:l[1],invalidText:l[2],placeholder:"(optional)"};return l[0]!==void 0&&(s.value=l[0]),e=new le({props:s}),$.push(()=>z(e,"value",r)),{c(){S(e.$$.fragment)},l(a){I(e.$$.fragment,a)},m(a,o){N(e,a,o),n=!0},p(a,o){const i={};o&2&&(i.invalid=a[1]),o&4&&(i.invalidText=a[2]),!t&&o&1&&(t=!0,i.value=a[0],J(()=>t=!1)),e.$set(i)},i(a){n||(p(e.$$.fragment,a),n=!0)},o(a){k(e.$$.fragment,a),n=!1},d(a){w(e,a)}}}function et(l){let e,t;return e=new re({props:{value:l[0]||"",invalid:l[1],invalidText:l[2],warn:!l[3],warnText:"Dataset doesn't exist",placeholder:"(optional)",items:l[4]}}),e.$on("select",l[12]),e.$on("clear",l[13]),{c(){S(e.$$.fragment)},l(n){I(e.$$.fragment,n)},m(n,r){N(e,n,r),t=!0},p(n,r){const s={};r&1&&(s.value=n[0]||""),r&2&&(s.invalid=n[1]),r&4&&(s.invalidText=n[2]),r&8&&(s.warn=!n[3]),r&16&&(s.items=n[4]),e.$set(s)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){k(e.$$.fragment,n),t=!1},d(n){w(e,n)}}}function tt(l){let e,t,n,r;const s=[et,xe],a=[];function o(i,u){return i[4]&&i[3]?0:1}return e=o(l),t=a[e]=s[e](l),{c(){t.c(),n=H()},l(i){t.l(i),n=H()},m(i,u){a[e].m(i,u),Q(i,n,u),r=!0},p(i,[u]){let c=e;e=o(i),e===c?a[e].p(i,u):(U(),k(a[c],1,1,()=>{a[c]=null}),Y(),t=a[e],t?t.p(i,u):(t=a[e]=s[e](i),t.c()),p(t,1),t.m(n.parentNode,n))},i(i){r||(p(t),r=!0)},o(i){k(t),r=!1},d(i){a[e].d(i),i&&T(n)}}}function nt(l,e,t){let n,r,s,a,o,i,u,c=A,b=()=>(c(),c=ne(a,v=>t(10,u=v)),a),d,h=A,m=()=>(h(),h=ne(r,v=>t(11,d=v)),r);l.$$.on_destroy.push(()=>c()),l.$$.on_destroy.push(()=>h());let{value:f}=e,{invalid:_}=e,{invalidText:g}=e,{rootValue:y}=e;const x=v=>{var C;return t(0,f=(C=v.detail.selectedItem)==null?void 0:C.id)},ee=()=>t(0,f=void 0);function te(v){f=v,t(0,f)}return l.$$set=v=>{"value"in v&&t(0,f=v.value),"invalid"in v&&t(1,_=v.invalid),"invalidText"in v&&t(2,g=v.invalidText),"rootValue"in v&&t(7,y=v.rootValue)},l.$$.update=()=>{l.$$.dirty&128&&t(9,n=y.dataset_name),l.$$.dirty&512&&m(t(6,r=ce(n))),l.$$.dirty&2048&&t(3,s=d.data===!0),l.$$.dirty&520&&b(t(5,a=s?Ve(n):void 0)),l.$$.dirty&1024&&t(8,o=u!=null&&u.data?new Set(u.data.map(v=>v.config)):void 0),l.$$.dirty&256&&t(4,i=o?[...o].map(v=>({id:v,text:v})):void 0)},[f,_,g,s,i,a,r,y,o,n,u,d,x,ee,te]}class lt extends X{constructor(e){super(),Z(this,e,nt,tt,K,{value:0,invalid:1,invalidText:2,rootValue:7})}}function it(l){let e,t,n;function r(a){l[6](a)}let s={invalid:l[1],invalidText:l[2],warn:!l[3],warnText:"Dataset doesn't exist"};return l[0]!==void 0&&(s.value=l[0]),e=new le({props:s}),$.push(()=>z(e,"value",r)),{c(){S(e.$$.fragment)},l(a){I(e.$$.fragment,a)},m(a,o){N(e,a,o),n=!0},p(a,[o]){const i={};o&2&&(i.invalid=a[1]),o&4&&(i.invalidText=a[2]),o&8&&(i.warn=!a[3]),!t&&o&1&&(t=!0,i.value=a[0],J(()=>t=!1)),e.$set(i)},i(a){n||(p(e.$$.fragment,a),n=!0)},o(a){k(e.$$.fragment,a),n=!1},d(a){w(e,a)}}}function at(l,e,t){let n,r,s,a=A,o=()=>(a(),a=ne(n,d=>t(5,s=d)),n);l.$$.on_destroy.push(()=>a());let{value:i}=e,{invalid:u}=e,{invalidText:c}=e;function b(d){i=d,t(0,i)}return l.$$set=d=>{"value"in d&&t(0,i=d.value),"invalid"in d&&t(1,u=d.invalid),"invalidText"in d&&t(2,c=d.invalidText)},l.$$.update=()=>{l.$$.dirty&1&&o(t(4,n=ce(i))),l.$$.dirty&32&&t(3,r=s.data===!0)},[i,u,c,r,n,s,b]}class rt extends X{constructor(e){super(),Z(this,e,at,it,K,{value:0,invalid:1,invalidText:2})}}function st(l){let e,t,n;function r(a){l[14](a)}let s={invalid:l[1],invalidText:l[2],placeholder:"(optional)"};return l[0]!==void 0&&(s.value=l[0]),e=new le({props:s}),$.push(()=>z(e,"value",r)),{c(){S(e.$$.fragment)},l(a){I(e.$$.fragment,a)},m(a,o){N(e,a,o),n=!0},p(a,o){const i={};o&2&&(i.invalid=a[1]),o&4&&(i.invalidText=a[2]),!t&&o&1&&(t=!0,i.value=a[0],J(()=>t=!1)),e.$set(i)},i(a){n||(p(e.$$.fragment,a),n=!0)},o(a){k(e.$$.fragment,a),n=!1},d(a){w(e,a)}}}function ut(l){let e,t;return e=new re({props:{invalid:l[1],invalidText:l[2],warn:!l[3],warnText:"Dataset doesn't exist",placeholder:"(optional)",items:l[5]}}),e.$on("select",l[12]),e.$on("clear",l[13]),{c(){S(e.$$.fragment)},l(n){I(e.$$.fragment,n)},m(n,r){N(e,n,r),t=!0},p(n,r){const s={};r&2&&(s.invalid=n[1]),r&4&&(s.invalidText=n[2]),r&8&&(s.warn=!n[3]),r&32&&(s.items=n[5]),e.$set(s)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){k(e.$$.fragment,n),t=!1},d(n){w(e,n)}}}function ot(l){let e,t,n,r;const s=[ut,st],a=[];function o(i,u){return i[5]&&i[3]||i[4].isError?0:1}return e=o(l),t=a[e]=s[e](l),{c(){t.c(),n=H()},l(i){t.l(i),n=H()},m(i,u){a[e].m(i,u),Q(i,n,u),r=!0},p(i,[u]){let c=e;e=o(i),e===c?a[e].p(i,u):(U(),k(a[c],1,1,()=>{a[c]=null}),Y(),t=a[e],t?t.p(i,u):(t=a[e]=s[e](i),t.c()),p(t,1),t.m(n.parentNode,n))},i(i){r||(p(t),r=!0)},o(i){k(t),r=!1},d(i){a[e].d(i),i&&T(n)}}}function ft(l,e,t){let n,r,s,a,o,i,u,c=A,b=()=>(c(),c=ne(o,v=>t(11,u=v)),o),d,h=A,m=()=>(h(),h=ne(s,v=>t(4,d=v)),s);l.$$.on_destroy.push(()=>c()),l.$$.on_destroy.push(()=>h());let{value:f}=e,{invalid:_}=e,{invalidText:g}=e,{rootValue:y}=e;const x=v=>t(0,f=v.detail.selectedId.split("/")[1]),ee=()=>t(0,f=void 0);function te(v){f=v,t(0,f)}return l.$$set=v=>{"value"in v&&t(0,f=v.value),"invalid"in v&&t(1,_=v.invalid),"invalidText"in v&&t(2,g=v.invalidText),"rootValue"in v&&t(8,y=v.rootValue)},l.$$.update=()=>{var v;l.$$.dirty&256&&t(10,n=y.dataset_name),l.$$.dirty&256&&t(9,r=y.config_name),l.$$.dirty&1024&&m(t(7,s=ce(n))),l.$$.dirty&16&&t(3,a=d.data===!0),l.$$.dirty&1544&&b(t(6,o=a?Ve(n,r):void 0)),l.$$.dirty&2048&&t(5,i=(v=u==null?void 0:u.data)==null?void 0:v.map(C=>({id:`${C.config}/${C.split}`,text:`${C.config}/${C.split}`})))},[f,_,g,a,d,i,o,s,y,r,n,u,x,ee,te]}class ct extends X{constructor(e){super(),Z(this,e,ft,ot,K,{value:0,invalid:1,invalidText:2,rootValue:8})}}const dt="langsmith",_t=we(Xe.getLangsmithDatasets,dt,{});function mt(l){let e,t,n;function r(a){l[8](a)}let s={invalid:l[1],invalidText:l[2]};return l[0]!==void 0&&(s.value=l[0]),e=new le({props:s}),$.push(()=>z(e,"value",r)),{c(){S(e.$$.fragment)},l(a){I(e.$$.fragment,a)},m(a,o){N(e,a,o),n=!0},p(a,o){const i={};o&2&&(i.invalid=a[1]),o&4&&(i.invalidText=a[2]),!t&&o&1&&(t=!0,i.value=a[0],J(()=>t=!1)),e.$set(i)},i(a){n||(p(e.$$.fragment,a),n=!0)},o(a){k(e.$$.fragment,a),n=!1},d(a){w(e,a)}}}function gt(l){let e,t;return e=new re({props:{invalid:l[1],invalidText:l[2],warn:l[3].length===0,warnText:"No datasets found",items:l[3]}}),e.$on("select",l[6]),e.$on("clear",l[7]),{c(){S(e.$$.fragment)},l(n){I(e.$$.fragment,n)},m(n,r){N(e,n,r),t=!0},p(n,r){const s={};r&2&&(s.invalid=n[1]),r&4&&(s.invalidText=n[2]),r&8&&(s.warn=n[3].length===0),r&8&&(s.items=n[3]),e.$set(s)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){k(e.$$.fragment,n),t=!1},d(n){w(e,n)}}}function bt(l){let e,t,n,r;const s=[gt,mt],a=[];function o(i,u){return i[3]?0:1}return e=o(l),t=a[e]=s[e](l),{c(){t.c(),n=H()},l(i){t.l(i),n=H()},m(i,u){a[e].m(i,u),Q(i,n,u),r=!0},p(i,[u]){let c=e;e=o(i),e===c?a[e].p(i,u):(U(),k(a[c],1,1,()=>{a[c]=null}),Y(),t=a[e],t?t.p(i,u):(t=a[e]=s[e](i),t.c()),p(t,1),t.m(n.parentNode,n))},i(i){r||(p(t),r=!0)},o(i){k(t),r=!1},d(i){a[e].d(i),i&&T(n)}}}function ht(l,e,t){let n,r,s,a=A,o=()=>(a(),a=ne(n,m=>t(5,s=m)),n);l.$$.on_destroy.push(()=>a());let{value:i}=e,{invalid:u}=e,{invalidText:c}=e;const b=m=>t(0,i=m.detail.selectedId),d=()=>t(0,i=void 0);function h(m){i=m,t(0,i)}return l.$$set=m=>{"value"in m&&t(0,i=m.value),"invalid"in m&&t(1,u=m.invalid),"invalidText"in m&&t(2,c=m.invalidText)},l.$$.update=()=>{var m;l.$$.dirty&32&&t(3,r=(m=s.data)==null?void 0:m.map(f=>({id:f,text:f})))},o(t(4,n=_t())),[i,u,c,r,n,s,b,d,h]}class pt extends X{constructor(e){super(),Z(this,e,ht,bt,K,{value:0,invalid:1,invalidText:2})}}const vt="sqlite",kt=we(Ze.getTables,vt);function Tt(l){let e,t,n;function r(a){l[10](a)}let s={invalid:l[1],invalidText:l[2]};return l[0]!==void 0&&(s.value=l[0]),e=new le({props:s}),$.push(()=>z(e,"value",r)),{c(){S(e.$$.fragment)},l(a){I(e.$$.fragment,a)},m(a,o){N(e,a,o),n=!0},p(a,o){const i={};o&2&&(i.invalid=a[1]),o&4&&(i.invalidText=a[2]),!t&&o&1&&(t=!0,i.value=a[0],J(()=>t=!1)),e.$set(i)},i(a){n||(p(e.$$.fragment,a),n=!0)},o(a){k(e.$$.fragment,a),n=!1},d(a){w(e,a)}}}function Et(l){let e,t;return e=new re({props:{invalid:l[1],invalidText:l[4].length===0?`No tables found in ${l[3]}`:l[2],items:l[4]}}),e.$on("select",l[8]),e.$on("clear",l[9]),{c(){S(e.$$.fragment)},l(n){I(e.$$.fragment,n)},m(n,r){N(e,n,r),t=!0},p(n,r){const s={};r&2&&(s.invalid=n[1]),r&28&&(s.invalidText=n[4].length===0?`No tables found in ${n[3]}`:n[2]),r&16&&(s.items=n[4]),e.$set(s)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){k(e.$$.fragment,n),t=!1},d(n){w(e,n)}}}function yt(l){let e,t,n,r;const s=[Et,Tt],a=[];function o(i,u){return i[4]?0:1}return e=o(l),t=a[e]=s[e](l),{c(){t.c(),n=H()},l(i){t.l(i),n=H()},m(i,u){a[e].m(i,u),Q(i,n,u),r=!0},p(i,[u]){let c=e;e=o(i),e===c?a[e].p(i,u):(U(),k(a[c],1,1,()=>{a[c]=null}),Y(),t=a[e],t?t.p(i,u):(t=a[e]=s[e](i),t.c()),p(t,1),t.m(n.parentNode,n))},i(i){r||(p(t),r=!0)},o(i){k(t),r=!1},d(i){a[e].d(i),i&&T(n)}}}function St(l,e,t){let n,r,s,a,o=A,i=()=>(o(),o=ne(r,_=>t(7,a=_)),r);l.$$.on_destroy.push(()=>o());let{value:u}=e,{invalid:c}=e,{invalidText:b}=e,{rootValue:d}=e;const h=_=>t(0,u=_.detail.selectedId),m=()=>t(0,u=void 0);function f(_){u=_,t(0,u)}return l.$$set=_=>{"value"in _&&t(0,u=_.value),"invalid"in _&&t(1,c=_.invalid),"invalidText"in _&&t(2,b=_.invalidText),"rootValue"in _&&t(6,d=_.rootValue)},l.$$.update=()=>{var _;l.$$.dirty&64&&t(3,n=d.db_file),l.$$.dirty&8&&i(t(5,r=n!=null&&n!==""?kt(n):null)),l.$$.dirty&128&&t(4,s=(_=a==null?void 0:a.data)==null?void 0:_.map(g=>({id:g,text:g})))},[u,c,b,n,s,r,d,a,h,m,f]}class It extends X{constructor(e){super(),Z(this,e,St,yt,K,{value:0,invalid:1,invalidText:2,rootValue:6})}}function Nt(l){let e,t,n,r;const s=l[3].default,a=ve(s,l,l[2],null);let o=[l[1]],i={};for(let u=0;u<o.length;u+=1)i=W(i,o[u]);return{c(){e=V("form"),a&&a.c(),this.h()},l(u){e=q(u,"FORM",{});var c=F(e);a&&a.l(c),c.forEach(T),this.h()},h(){ie(e,i),P(e,"bx--form",!0)},m(u,c){Q(u,e,c),a&&a.m(e,null),l[10](e),t=!0,n||(r=[G(e,"click",l[4]),G(e,"keydown",l[5]),G(e,"mouseover",l[6]),G(e,"mouseenter",l[7]),G(e,"mouseleave",l[8]),G(e,"submit",l[9])],n=!0)},p(u,[c]){a&&a.p&&(!t||c&4)&&ke(a,s,u,u[2],t?Ee(s,u[2],c,null):Te(u[2]),null),ie(e,i=ue(o,[c&2&&u[1]])),P(e,"bx--form",!0)},i(u){t||(p(a,u),t=!0)},o(u){k(a,u),t=!1},d(u){u&&T(e),a&&a.d(u),l[10](null),n=!1,oe(r)}}}function wt(l,e,t){const n=["ref"];let r=ae(e,n),{$$slots:s={},$$scope:a}=e,{ref:o=null}=e;function i(f){B.call(this,l,f)}function u(f){B.call(this,l,f)}function c(f){B.call(this,l,f)}function b(f){B.call(this,l,f)}function d(f){B.call(this,l,f)}function h(f){B.call(this,l,f)}function m(f){$[f?"unshift":"push"](()=>{o=f,t(0,o)})}return l.$$set=f=>{e=W(W({},e),fe(f)),t(1,r=ae(e,n)),"ref"in f&&t(0,o=f.ref),"$$scope"in f&&t(2,a=f.$$scope)},[o,r,a,s,i,u,c,b,d,h,m]}class Dt extends X{constructor(e){super(),Z(this,e,wt,Nt,K,{ref:0})}}const Qt=Dt;function _e(l){let e,t,n;return{c(){e=V("legend"),t=O(l[4]),this.h()},l(r){e=q(r,"LEGEND",{id:!0});var s=F(e);t=R(s,l[4]),s.forEach(T),this.h()},h(){M(e,"id",n=l[5]||l[6]["aria-labelledby"]),P(e,"bx--label",!0)},m(r,s){Q(r,e,s),E(e,t)},p(r,s){s&16&&ye(t,r[4]),s&96&&n!==(n=r[5]||r[6]["aria-labelledby"])&&M(e,"id",n)},d(r){r&&T(e)}}}function me(l){let e,t;return{c(){e=V("div"),t=O(l[3]),this.h()},l(n){e=q(n,"DIV",{});var r=F(e);t=R(r,l[3]),r.forEach(T),this.h()},h(){P(e,"bx--form__requirement",!0)},m(n,r){Q(n,e,r),E(e,t)},p(n,r){r&8&&ye(t,n[3])},d(n){n&&T(e)}}}function Vt(l){let e,t,n,r,s,a,o,i,u=l[4]&&_e(l);const c=l[8].default,b=ve(c,l,l[7],null);let d=l[2]&&me(l),h=[{"data-invalid":r=l[1]||void 0},{"aria-labelledby":s=l[6]["aria-labelledby"]||l[5]},l[6]],m={};for(let f=0;f<h.length;f+=1)m=W(m,h[f]);return{c(){e=V("fieldset"),u&&u.c(),t=j(),b&&b.c(),n=j(),d&&d.c(),this.h()},l(f){e=q(f,"FIELDSET",{"data-invalid":!0,"aria-labelledby":!0});var _=F(e);u&&u.l(_),t=L(_),b&&b.l(_),n=L(_),d&&d.l(_),_.forEach(T),this.h()},h(){ie(e,m),P(e,"bx--fieldset",!0),P(e,"bx--fieldset--no-margin",l[0])},m(f,_){Q(f,e,_),u&&u.m(e,null),E(e,t),b&&b.m(e,null),E(e,n),d&&d.m(e,null),a=!0,o||(i=[G(e,"click",l[9]),G(e,"mouseover",l[10]),G(e,"mouseenter",l[11]),G(e,"mouseleave",l[12])],o=!0)},p(f,[_]){f[4]?u?u.p(f,_):(u=_e(f),u.c(),u.m(e,t)):u&&(u.d(1),u=null),b&&b.p&&(!a||_&128)&&ke(b,c,f,f[7],a?Ee(c,f[7],_,null):Te(f[7]),null),f[2]?d?d.p(f,_):(d=me(f),d.c(),d.m(e,null)):d&&(d.d(1),d=null),ie(e,m=ue(h,[(!a||_&2&&r!==(r=f[1]||void 0))&&{"data-invalid":r},(!a||_&96&&s!==(s=f[6]["aria-labelledby"]||f[5]))&&{"aria-labelledby":s},_&64&&f[6]])),P(e,"bx--fieldset",!0),P(e,"bx--fieldset--no-margin",f[0])},i(f){a||(p(b,f),a=!0)},o(f){k(b,f),a=!1},d(f){f&&T(e),u&&u.d(),b&&b.d(f),d&&d.d(),o=!1,oe(i)}}}function qt(l,e,t){const n=["noMargin","invalid","message","messageText","legendText","legendId"];let r=ae(e,n),{$$slots:s={},$$scope:a}=e,{noMargin:o=!1}=e,{invalid:i=!1}=e,{message:u=!1}=e,{messageText:c=""}=e,{legendText:b=""}=e,{legendId:d=""}=e;function h(g){B.call(this,l,g)}function m(g){B.call(this,l,g)}function f(g){B.call(this,l,g)}function _(g){B.call(this,l,g)}return l.$$set=g=>{e=W(W({},e),fe(g)),t(6,r=ae(e,n)),"noMargin"in g&&t(0,o=g.noMargin),"invalid"in g&&t(1,i=g.invalid),"message"in g&&t(2,u=g.message),"messageText"in g&&t(3,c=g.messageText),"legendText"in g&&t(4,b=g.legendText),"legendId"in g&&t(5,d=g.legendId),"$$scope"in g&&t(7,a=g.$$scope)},[o,i,u,c,b,d,r,a,s,h,m,f,_]}class Ft extends X{constructor(e){super(),Z(this,e,qt,Vt,K,{noMargin:0,invalid:1,message:2,messageText:3,legendText:4,legendId:5})}}const ge=Ft;function At(l){let e,t,n,r,s,a,o=[l[0]],i={};for(let u=0;u<o.length;u+=1)i=W(i,o[u]);return{c(){e=V("div"),t=V("div"),n=j(),r=V("span"),this.h()},l(u){e=q(u,"DIV",{});var c=F(e);t=q(c,"DIV",{}),F(t).forEach(T),n=L(c),r=q(c,"SPAN",{}),F(r).forEach(T),c.forEach(T),this.h()},h(){P(t,"bx--radio-button",!0),P(t,"bx--skeleton",!0),P(r,"bx--radio-button__label",!0),P(r,"bx--skeleton",!0),ie(e,i),P(e,"bx--radio-button-wrapper",!0)},m(u,c){Q(u,e,c),E(e,t),E(e,n),E(e,r),s||(a=[G(e,"click",l[1]),G(e,"mouseover",l[2]),G(e,"mouseenter",l[3]),G(e,"mouseleave",l[4])],s=!0)},p(u,[c]){ie(e,i=ue(o,[c&1&&u[0]])),P(e,"bx--radio-button-wrapper",!0)},i:A,o:A,d(u){u&&T(e),s=!1,oe(a)}}}function Ct(l,e,t){const n=[];let r=ae(e,n);function s(u){B.call(this,l,u)}function a(u){B.call(this,l,u)}function o(u){B.call(this,l,u)}function i(u){B.call(this,l,u)}return l.$$set=u=>{e=W(W({},e),fe(u)),t(0,r=ae(e,n))},[r,s,a,o,i]}class Pt extends X{constructor(e){super(),Z(this,e,Ct,At,K,{})}}const Gt=Pt;function Bt(l){const e=l.slice(),t=e[11].data;return e[25]=t,e}function be(l,e,t){const n=l.slice();return n[26]=e[t],n}function Ht(l){let e,t,n,r,s,a,o,i,u;return{c(){e=V("div"),t=V("span"),n=O("You do not have authorization to create a dataset."),r=j(),s=V("span"),a=O("For HuggingFace spaces, you can duplicate this space and remove authentication. See "),o=V("a"),i=O("Duplicating the HuggingFace demo"),u=O("."),this.h()},l(c){e=q(c,"DIV",{class:!0});var b=F(e);t=q(b,"SPAN",{class:!0});var d=F(t);n=R(d,"You do not have authorization to create a dataset."),d.forEach(T),r=L(b),s=q(b,"SPAN",{});var h=F(s);a=R(h,"For HuggingFace spaces, you can duplicate this space and remove authentication. See "),o=q(h,"A",{href:!0});var m=F(o);i=R(m,"Duplicating the HuggingFace demo"),m.forEach(T),u=R(h,"."),h.forEach(T),b.forEach(T),this.h()},h(){M(t,"class","mb-2"),M(o,"href","https://lilacml.com/huggingface/huggingface_spaces.html"),M(e,"class","mt-4 flex flex-col border border-neutral-100 bg-red-100 p-2")},m(c,b){Q(c,e,b),E(e,t),E(t,n),E(e,r),E(e,s),E(s,a),E(s,o),E(o,i),E(s,u)},p:A,i:A,o:A,d(c){c&&T(e)}}}function Mt(l){let e,t;return e=new Qt({props:{class:"py-8",$$slots:{default:[Wt]},$$scope:{ctx:l}}}),{c(){S(e.$$.fragment)},l(n){I(e.$$.fragment,n)},m(n,r){N(e,n,r),t=!0},p(n,r){const s={};r&536874239&&(s.$$scope={dirty:r,ctx:n}),e.$set(s)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){k(e.$$.fragment,n),t=!1},d(n){w(e,n)}}}function $t(l){let e,t,n,r,s,a,o,i,u,c;function b(f){l[18](f)}let d={labelText:"namespace",invalid:l[5]!=null,invalidText:l[5]};l[0]!==void 0&&(d.value=l[0]),t=new le({props:d}),$.push(()=>z(t,"value",b));function h(f){l[19](f)}let m={labelText:"name",invalid:l[6]!=null,invalidText:l[6]};return l[1]!==void 0&&(m.value=l[1]),i=new le({props:m}),$.push(()=>z(i,"value",h)),{c(){e=V("div"),S(t.$$.fragment),r=j(),s=V("span"),a=O("/"),o=j(),S(i.$$.fragment),this.h()},l(f){e=q(f,"DIV",{class:!0});var _=F(e);I(t.$$.fragment,_),r=L(_),s=q(_,"SPAN",{class:!0});var g=F(s);a=R(g,"/"),g.forEach(T),o=L(_),I(i.$$.fragment,_),_.forEach(T),this.h()},h(){M(s,"class","mx-4 mt-6 text-lg"),M(e,"class","flex flex-row content-start")},m(f,_){Q(f,e,_),N(t,e,null),E(e,r),E(e,s),E(s,a),E(e,o),N(i,e,null),c=!0},p(f,_){const g={};_&32&&(g.invalid=f[5]!=null),_&32&&(g.invalidText=f[5]),!n&&_&1&&(n=!0,g.value=f[0],J(()=>n=!1)),t.$set(g);const y={};_&64&&(y.invalid=f[6]!=null),_&64&&(y.invalidText=f[6]),!u&&_&2&&(u=!0,y.value=f[1],J(()=>u=!1)),i.$set(y)},i(f){c||(p(t.$$.fragment,f),p(i.$$.fragment,f),c=!0)},o(f){k(t.$$.fragment,f),k(i.$$.fragment,f),c=!1},d(f){f&&T(e),w(t),w(i)}}}function jt(l){let e,t;return e=new De({props:{kind:"error",title:"Error",subtitle:l[3].error.message,hideCloseButton:!0}}),{c(){S(e.$$.fragment)},l(n){I(e.$$.fragment,n)},m(n,r){N(e,n,r),t=!0},p(n,r){const s={};r&8&&(s.subtitle=n[3].error.message),e.$set(s)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){k(e.$$.fragment,n),t=!1},d(n){w(e,n)}}}function Lt(l){let e,t,n,r;function s(o){l[20](o)}let a={class:"source-radio-buttons",$$slots:{default:[Rt]},$$scope:{ctx:l}};return l[2]!==void 0&&(a.selected=l[2]),t=new Ye({props:a}),$.push(()=>z(t,"selected",s)),{c(){e=V("div"),S(t.$$.fragment)},l(o){e=q(o,"DIV",{});var i=F(e);I(t.$$.fragment,i),i.forEach(T)},m(o,i){Q(o,e,i),N(t,e,null),r=!0},p(o,i){const u={};i&536871936&&(u.$$scope={dirty:i,ctx:o}),!n&&i&4&&(n=!0,u.selected=o[2],J(()=>n=!1)),t.$set(u)},i(o){r||(p(t.$$.fragment,o),r=!0)},o(o){k(t.$$.fragment,o),r=!1},d(o){o&&T(e),w(t)}}}function Ot(l){let e,t;return e=new Gt({}),{c(){S(e.$$.fragment)},l(n){I(e.$$.fragment,n)},m(n,r){N(e,n,r),t=!0},p:A,i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){k(e.$$.fragment,n),t=!1},d(n){w(e,n)}}}function he(l){let e,t;return e=new We({props:{labelText:l[26],value:l[26]}}),{c(){S(e.$$.fragment)},l(n){I(e.$$.fragment,n)},m(n,r){N(e,n,r),t=!0},p(n,r){const s={};r&1024&&(s.labelText=n[26]),r&1024&&(s.value=n[26]),e.$set(s)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){k(e.$$.fragment,n),t=!1},d(n){w(e,n)}}}function Rt(l){let e,t,n=l[10],r=[];for(let a=0;a<n.length;a+=1)r[a]=he(be(l,n,a));const s=a=>k(r[a],1,1,()=>{r[a]=null});return{c(){for(let a=0;a<r.length;a+=1)r[a].c();e=H()},l(a){for(let o=0;o<r.length;o+=1)r[o].l(a);e=H()},m(a,o){for(let i=0;i<r.length;i+=1)r[i]&&r[i].m(a,o);Q(a,e,o),t=!0},p(a,o){if(o&1024){n=a[10];let i;for(i=0;i<n.length;i+=1){const u=be(a,n,i);r[i]?(r[i].p(u,o),p(r[i],1)):(r[i]=he(u),r[i].c(),p(r[i],1),r[i].m(e.parentNode,e))}for(U(),i=n.length;i<r.length;i+=1)s(i);Y()}},i(a){if(!t){for(let o=0;o<n.length;o+=1)p(r[o]);t=!0}},o(a){r=r.filter(Boolean);for(let o=0;o<r.length;o+=1)k(r[o]);t=!1},d(a){He(r,a),a&&T(e)}}}function zt(l){let e,t,n,r,s,a;return s=new Je({}),{c(){e=V("div"),t=V("h3"),n=O("Schema"),r=j(),S(s.$$.fragment),this.h()},l(o){e=q(o,"DIV",{class:!0});var i=F(e);t=q(i,"H3",{class:!0});var u=F(t);n=R(u,"Schema"),u.forEach(T),r=L(i),I(s.$$.fragment,i),i.forEach(T),this.h()},h(){M(t,"class","text-lg"),M(e,"class","mt-4")},m(o,i){Q(o,e,i),E(e,t),E(t,n),E(e,r),N(s,e,null),a=!0},p:A,i(o){a||(p(s.$$.fragment,o),a=!0)},o(o){k(s.$$.fragment,o),a=!1},d(o){o&&T(e),w(s)}}}function Jt(l){let e,t;return e=new De({props:{kind:"error",title:"Error",hideCloseButton:!0,subtitle:l[11].error.message}}),{c(){S(e.$$.fragment)},l(n){I(e.$$.fragment,n)},m(n,r){N(e,n,r),t=!0},p(n,r){const s={};r&2048&&(s.subtitle=n[11].error.message),e.$set(s)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){k(e.$$.fragment,n),t=!1},d(n){w(e,n)}}}function Kt(l){let e=l[2],t,n,r=pe(l);return{c(){r.c(),t=H()},l(s){r.l(s),t=H()},m(s,a){r.m(s,a),Q(s,t,a),n=!0},p(s,a){a&4&&K(e,e=s[2])?(U(),k(r,1,1,A),Y(),r=pe(s),r.c(),p(r,1),r.m(t.parentNode,t)):r.p(s,a)},i(s){n||(p(r),n=!0)},o(s){k(r),n=!1},d(s){s&&T(t),r.d(s)}}}function pe(l){let e,t,n,r;function s(i){l[21](i)}function a(i){l[22](i)}let o={schema:l[25],hiddenProperties:["/source_name"],customComponents:l[15][l[2]]||{}};return l[7]!==void 0&&(o.value=l[7]),l[4]!==void 0&&(o.validationErrors=l[4]),e=new Ke({props:o}),$.push(()=>z(e,"value",s)),$.push(()=>z(e,"validationErrors",a)),{c(){S(e.$$.fragment)},l(i){I(e.$$.fragment,i)},m(i,u){N(e,i,u),r=!0},p(i,u){const c={};u&2048&&(c.schema=i[25]),u&4&&(c.customComponents=i[15][i[2]]||{}),!t&&u&128&&(t=!0,c.value=i[7],J(()=>t=!1)),!n&&u&16&&(n=!0,c.validationErrors=i[4],J(()=>n=!1)),e.$set(c)},i(i){r||(p(e.$$.fragment,i),r=!0)},o(i){k(e.$$.fragment,i),r=!1},d(i){w(e,i)}}}function Ut(l){let e,t,n,r,s,a,o;const i=[Ot,Lt,jt],u=[];function c(f,_){return f[3].isFetching?0:f[10]!=null?1:f[3].isError?2:-1}~(e=c(l))&&(t=u[e]=i[e](l));const b=[Kt,Jt,zt],d=[];function h(f,_){return f[11].isSuccess?0:f[11].isError?1:f[11].isLoading?2:-1}function m(f,_){return _===0?Bt(f):f}return~(r=h(l))&&(s=d[r]=b[r](m(l,r))),{c(){t&&t.c(),n=j(),s&&s.c(),a=H()},l(f){t&&t.l(f),n=L(f),s&&s.l(f),a=H()},m(f,_){~e&&u[e].m(f,_),Q(f,n,_),~r&&d[r].m(f,_),Q(f,a,_),o=!0},p(f,_){let g=e;e=c(f),e===g?~e&&u[e].p(f,_):(t&&(U(),k(u[g],1,1,()=>{u[g]=null}),Y()),~e?(t=u[e],t?t.p(f,_):(t=u[e]=i[e](f),t.c()),p(t,1),t.m(n.parentNode,n)):t=null);let y=r;r=h(f),r===y?~r&&d[r].p(m(f,r),_):(s&&(U(),k(d[y],1,1,()=>{d[y]=null}),Y()),~r?(s=d[r],s?s.p(m(f,r),_):(s=d[r]=b[r](m(f,r)),s.c()),p(s,1),s.m(a.parentNode,a)):s=null)},i(f){o||(p(t),p(s),o=!0)},o(f){k(t),k(s),o=!1},d(f){~e&&u[e].d(f),f&&T(n),~r&&d[r].d(f),f&&T(a)}}}function Yt(l){let e;return{c(){e=O("Add")},l(t){e=R(t,"Add")},m(t,n){Q(t,e,n)},d(t){t&&T(e)}}}function Wt(l){var o;let e,t,n,r,s,a;return e=new ge({props:{legendText:"Name",$$slots:{default:[$t]},$$scope:{ctx:l}}}),n=new ge({props:{legendText:"Data Loader",$$slots:{default:[Ut]},$$scope:{ctx:l}}}),s=new ze({props:{disabled:((o=l[4])==null?void 0:o.length)>0||l[6]!=null||l[5]!=null,$$slots:{default:[Yt]},$$scope:{ctx:l}}}),s.$on("click",l[16]),{c(){S(e.$$.fragment),t=j(),S(n.$$.fragment),r=j(),S(s.$$.fragment)},l(i){I(e.$$.fragment,i),t=L(i),I(n.$$.fragment,i),r=L(i),I(s.$$.fragment,i)},m(i,u){N(e,i,u),Q(i,t,u),N(n,i,u),Q(i,r,u),N(s,i,u),a=!0},p(i,u){var h;const c={};u&536871011&&(c.$$scope={dirty:u,ctx:i}),e.$set(c);const b={};u&536874140&&(b.$$scope={dirty:u,ctx:i}),n.$set(b);const d={};u&112&&(d.disabled=((h=i[4])==null?void 0:h.length)>0||i[6]!=null||i[5]!=null),u&536870912&&(d.$$scope={dirty:u,ctx:i}),s.$set(d)},i(i){a||(p(e.$$.fragment,i),p(n.$$.fragment,i),p(s.$$.fragment,i),a=!0)},o(i){k(e.$$.fragment,i),k(n.$$.fragment,i),k(s.$$.fragment,i),a=!1},d(i){w(e,i),i&&T(t),w(n,i),i&&T(r),w(s,i)}}}function Xt(l){let e,t,n,r,s,a,o,i;const u=[Mt,Ht],c=[];function b(d,h){return d[9]?0:1}return a=b(l),o=c[a]=u[a](l),{c(){e=V("div"),t=V("div"),n=V("h2"),r=O("Add dataset"),s=j(),o.c(),this.h()},l(d){e=q(d,"DIV",{class:!0});var h=F(e);t=q(h,"DIV",{class:!0});var m=F(t);n=q(m,"H2",{});var f=F(n);r=R(f,"Add dataset"),f.forEach(T),s=L(m),o.l(m),m.forEach(T),h.forEach(T),this.h()},h(){M(t,"class","new-form mx-auto flex h-full max-w-xl flex-col"),M(e,"class","flex h-full w-full gap-y-4 overflow-y-scroll p-4")},m(d,h){Q(d,e,h),E(e,t),E(t,n),E(n,r),E(t,s),c[a].m(t,null),i=!0},p(d,h){let m=a;a=b(d),a===m?c[a].p(d,h):(U(),k(c[m],1,1,()=>{c[m]=null}),Y(),o=c[a],o?o.p(d,h):(o=c[a]=u[a](d),o.c()),p(o,1),o.m(t,null))},i(d){i||(p(o),i=!0)},o(d){k(o),i=!1},d(d){d&&T(e),c[a].d()}}}function Zt(l){let e,t;return e=new Ue({props:{$$slots:{default:[Xt]},$$scope:{ctx:l}}}),{c(){S(e.$$.fragment)},l(n){I(e.$$.fragment,n)},m(n,r){N(e,n,r),t=!0},p(n,[r]){const s={};r&536874751&&(s.$$scope={dirty:r,ctx:n}),e.$set(s)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){k(e.$$.fragment,n),t=!1},d(n){w(e,n)}}}function xt(l,e,t){let n,r,s,a,o,i,u,c=A,b=()=>(c(),c=ne(s,D=>t(11,u=D)),s);l.$$.on_destroy.push(()=>c());const d=["pandas","llama_index_docs","gmail"],h=$e();se(l,h,D=>t(3,i=D));const m=je();se(l,m,D=>t(23,a=D));const f=Le();se(l,f,D=>t(17,o=D));let _="local",g="",y="parquet",x=[],ee,te;const v={huggingface:{"/dataset_name":rt,"/split":ct,"/config_name":lt},langsmith:{"/dataset_name":pt},sqlite:{"/table":It}};let C={};function qe(){x.length||a.mutate([y,{namespace:_,dataset_name:g,config:C}],{onSuccess:D=>{Me(`/datasets/loading#${Re(_,g)}/${D.task_id}`)}})}function Fe(D){_=D,t(0,_)}function Ae(D){g=D,t(1,g)}function Ce(D){y=D,t(2,y)}function Pe(D){C=D,t(7,C),t(2,y)}function Ge(D){x=D,t(4,x)}return l.$$.update=()=>{var D,de;l.$$.dirty&8&&t(10,n=(D=i.data)==null?void 0:D.sources.filter(Be=>!d.includes(Be))),l.$$.dirty&131072&&t(9,r=(de=o.data)==null?void 0:de.access.create_dataset),l.$$.dirty&1&&(_==null||_==""?t(5,ee="Enter a namespace"):_.includes("/")?t(5,ee='Namespace cannot contain "/"'):t(5,ee=void 0)),l.$$.dirty&2&&(g==null||g==""?t(6,te="Enter a name"):g.includes("/")?t(6,te='Name cannot contain "/"'):t(6,te=void 0)),l.$$.dirty&4&&b(t(8,s=Oe(y))),l.$$.dirty&4&&t(7,C.source_name=y,C)},[_,g,y,i,x,ee,te,C,s,r,n,u,h,m,f,v,qe,o,Fe,Ae,Ce,Pe,Ge]}class sn extends X{constructor(e){super(),Z(this,e,xt,Zt,K,{})}}export{sn as component};