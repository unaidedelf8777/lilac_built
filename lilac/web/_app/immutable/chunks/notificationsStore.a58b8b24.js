import{ap as h,P as x,am as C,ai as N}from"./index.6d58eddb.js";import{w as b}from"./index.fcc110a5.js";function w(a){const n=a-1;return n*n*n+1}function T(a,{delay:n=0,duration:e=400,easing:r=h}={}){const o=+getComputedStyle(a).opacity;return{delay:n,duration:e,easing:r,css:t=>`opacity: ${t*o}`}}function O(a,{delay:n=0,duration:e=400,easing:r=w,axis:o="y"}={}){const t=getComputedStyle(a),u=+t.opacity,d=o==="y"?"height":"width",f=parseFloat(t[d]),s=o==="y"?["top","bottom"]:["left","right"],c=s.map(i=>`${i[0].toUpperCase()}${i.slice(1)}`),l=parseFloat(t[`padding${c[0]}`]),$=parseFloat(t[`padding${c[1]}`]),_=parseFloat(t[`margin${c[0]}`]),g=parseFloat(t[`margin${c[1]}`]),m=parseFloat(t[`border${c[0]}Width`]),y=parseFloat(t[`border${c[1]}Width`]);return{delay:n,duration:e,easing:r,css:i=>`overflow: hidden;opacity: ${Math.min(i*20,1)*u};${d}: ${i*f}px;padding-${s[0]}: ${i*l}px;padding-${s[1]}: ${i*$}px;margin-${s[0]}: ${i*_}px;margin-${s[1]}: ${i*g}px;border-${s[0]}-width: ${i*m}px;border-${s[1]}-width: ${i*y}px;`}}const p="NOTIFICATIONS_CONTEXT";function I(){const{subscribe:a,set:n,update:e}=b({notifications:[]});return{subscribe:a,set:n,update:e,reset(){n({notifications:[]})},addNotification(r){e(o=>(o.notifications.push(r),o))},removeNotification(r){e(o=>(o.notifications=o.notifications.filter(t=>t!==r),o))}}}function S(a){x(p,a)}function E(){if(!C(p))throw new Error("NotificationContext not found");return N(p)}export{S as a,I as c,T as f,E as g,O as s};