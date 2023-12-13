import{W as k,ai as T,ah as r,a1 as w,Z as V,bz as j}from"./Commands.f21feee1.js";import{c as z}from"./colors.f6cbcb11.js";function D(s,f){const o=u=>s&&!s.contains(u.target)&&!u.defaultPrevented&&f();return document.addEventListener("click",o,!0),{destroy(){document.removeEventListener("click",o,!0)}}}const I=600,H=50;function F(s,f,o){const u=j(s),e=[];for(const[p,n]of Object.entries(f)){const l=w(p),a=o[l],i=k(l);if(!(a==null||a.length===0))for(const c of n){const m=r.span(c);for(const h of a){const P=h.path.slice(i.length),S=T(c,P);if(S==null)continue;const E=r.value(S),v=r.path(S);if(m==null||v==null)continue;const t={value:E,info:h,specificPath:r.path(S)},R=t.info.type==="keyword",x=h.type==="concept_score",N=h.type==="semantic_similarity",L=h.type==="metadata"&&!V(h.dtype),d=h.type==="leaf_span";let y=!1;if(x||N?E>.5?y=!0:y=!1:y=!0,!y)continue;const g=u.slice(m.start,m.end).join("");e.push({span:c,isKeywordSearch:R,isConceptSearch:x,isSemanticSearch:N,isLeafSpan:d,hasNonNumericMetadata:L,namedValue:t,path:v,text:g})}}}return e}function G(s,f,o){const u=[],e=new Set;for(const p of s){let n=!1;const l=[];for(const t of p.paths)e.has(t)||(l.push(t),e.add(t));const a=[],i=[];let c=-1/0;for(const[t,R]of Object.entries(p.originalSpans)){const x=f[t],N=k(t);if(!(x==null||x.length===0))for(const L of R)for(const d of x){const y=d.path.slice(N.length),g=T(L,y);if(g==null)continue;const _=r.value(g),B=r.span(g);if(_==null&&B==null)continue;if(d.dtype.type==="float32"){const C=r.value(g);C!=null&&(c=Math.max(c,C))}const O=w(r.path(L)),M=!l.includes(O),b={value:_,info:d,specificPath:r.path(g)};M||a.push(b),i.push(b),d.type==="concept_score"||d.type==="semantic_similarity"?_>.5&&(n=!0):n=!0}}const m=i.some(t=>t.info.type==="label"),h=i.some(t=>t.info.type==="leaf_span"),P=i.some(t=>t.info.type==="keyword"),S=i.some(t=>t.info.type==="metadata"&&!V(t.info.dtype)),E=p.paths.some(t=>o.has(t)),v=E&&l.length>0&&Array.from(o).some(t=>l.includes(t));u.push({backgroundColor:z(c),isBlackBolded:P||S||h,isHighlightBolded:m,isHighlighted:n,snippetScore:c,namedValues:a,paths:p.paths,text:p.text,originalSpans:p.originalSpans,isHovered:E,isFirstHover:v})}return u}function K(s,f){var p;let o=!1,u=!1,e=[];for(let n=0;n<s.length;n++){const l=s[n],a=n-1>=0?s[n-1]:null,i=n+1<s.length?s[n+1]:null,c=(p=e.at(-1))==null?void 0:p.isEllipsis;if(!l.isHighlighted){if(c||a!=null&&a.isHighlighted||i!=null&&i.isHighlighted)continue;o=!0,e.push({isEllipsis:!0});continue}u=!0,a!=null&&!a.isHighlighted&&(!c&&a.text.length>H&&(e.push({isEllipsis:!0}),o=!0),e.push({renderSpan:a,snippetText:a.text.slice(-H)})),e.push({renderSpan:l,snippetText:l.text}),i!=null&&!i.isHighlighted&&(e.push({renderSpan:i,snippetText:i.text.slice(0,H)}),!c&&i.text.length>H&&(e.push({isEllipsis:!0}),o=!0))}return u||(e=[],o=!1,e.push({renderSpan:s[0],snippetText:s[0].text.slice(0,I)}),((s[1]||null)!=null||s[0].text.length>I)&&(e.push({isEllipsis:!0}),o=!0)),f&&(e=s.map(n=>({renderSpan:n,snippetText:n.text}))),{snippetSpans:e,textIsOverBudget:o}}export{I as S,G as a,K as b,D as c,F as g};