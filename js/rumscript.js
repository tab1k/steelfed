"use strict";(()=>{var p={DEBUG_FLAG:"upassist_rum_debug",TRACKING_ENABLED:"upassist_rum_enable",TRACKING_DISABLED:"upassist_rum_disable",SESSION_COOKIE:"_upassist_session_id",CLIENT_COOKIE:"_upassist_client_id"};var P=e=>window&&window.location.search.indexOf(e)>-1,W=()=>{let e=P(p.TRACKING_ENABLED),t=P(p.TRACKING_DISABLED);if(e||t){if(!window.localStorage){s("Can't disable Upassist RUM. This browser does not support local storage.",void 0,!0);return}e&&(window.localStorage.removeItem(p.TRACKING_DISABLED),s("Upassist RUM has been enabled on this device.",void 0,!0)),t&&(window.localStorage.setItem(p.TRACKING_DISABLED,"true"),s("Upassist RUM has been disabled on this device.",void 0,!0))}},z=()=>{if(window.history.pushState&&!window.upassist._historyPatched){s("Single page app mode is set to 'history', patching History API");let e=window.history.pushState,t=()=>v("Pageview");window.history.pushState=function(){e.apply(this,arguments),t()},window.addEventListener("popstate",t),window.upassist._historyPatched=!0,s("Listening for History API changes")}},s=(e,t,n)=>{let r=c.debug||P(p.DEBUG_FLAG);if(!n&&!r)return;let i=`[Upassist RUM] ${e}`;t?console.log(i,t):console.log(i)};var c={ingestionHost:"https://rum.upassist.cloud/api",honorDNT:!1,filterLocalhost:!1,debug:!1,trackMode:"history",enabled:!0,autoTrackErrors:!0,autoTrackCoreWebVitals:!0},$=e=>(c={...c,...e},s("Updated configuration",c),c);var q=_e,Q=Ee,ye=Object.prototype.toString,C=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function _e(e,t){if(typeof e!="string")throw new TypeError("argument str must be a string");for(var n={},r=t||{},i=r.decode||be,a=0;a<e.length;){var o=e.indexOf("=",a);if(o===-1)break;var u=e.indexOf(";",a);if(u===-1)u=e.length;else if(u<o){a=e.lastIndexOf(";",o-1)+1;continue}var d=e.slice(a,o).trim();if(n[d]===void 0){var l=e.slice(o+1,u).trim();l.charCodeAt(0)===34&&(l=l.slice(1,-1)),n[d]=Ue(l,i)}a=u+1}return n}function Ee(e,t,n){var r=n||{},i=r.encode||Ce;if(typeof i!="function")throw new TypeError("option encode is invalid");if(!C.test(e))throw new TypeError("argument name is invalid");var a=i(t);if(a&&!C.test(a))throw new TypeError("argument val is invalid");var o=e+"="+a;if(r.maxAge!=null){var u=r.maxAge-0;if(isNaN(u)||!isFinite(u))throw new TypeError("option maxAge is invalid");o+="; Max-Age="+Math.floor(u)}if(r.domain){if(!C.test(r.domain))throw new TypeError("option domain is invalid");o+="; Domain="+r.domain}if(r.path){if(!C.test(r.path))throw new TypeError("option path is invalid");o+="; Path="+r.path}if(r.expires){var d=r.expires;if(!Se(d)||isNaN(d.valueOf()))throw new TypeError("option expires is invalid");o+="; Expires="+d.toUTCString()}if(r.httpOnly&&(o+="; HttpOnly"),r.secure&&(o+="; Secure"),r.partitioned&&(o+="; Partitioned"),r.priority){var l=typeof r.priority=="string"?r.priority.toLowerCase():r.priority;switch(l){case"low":o+="; Priority=Low";break;case"medium":o+="; Priority=Medium";break;case"high":o+="; Priority=High";break;default:throw new TypeError("option priority is invalid")}}if(r.sameSite){var M=typeof r.sameSite=="string"?r.sameSite.toLowerCase():r.sameSite;switch(M){case!0:o+="; SameSite=Strict";break;case"lax":o+="; SameSite=Lax";break;case"strict":o+="; SameSite=Strict";break;case"none":o+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return o}function be(e){return e.indexOf("%")!==-1?decodeURIComponent(e):e}function Ce(e){return encodeURIComponent(e)}function Se(e){return ye.call(e)==="[object Date]"||e instanceof Date}function Ue(e,t){try{return t(e)}catch{return e}}function Te(){let e=typeof global>"u"?void 0:global.TEST_HAS_DOCUMENT_COOKIE;return typeof e=="boolean"?e:typeof document=="object"&&typeof document.cookie=="string"}function Le(e){return typeof e=="string"?q(e):typeof e=="object"&&e!==null?e:{}}function R(e,t={}){let n=ke(e);if(!t.doNotParse)try{return JSON.parse(n)}catch{}return e}function ke(e){return e&&e[0]==="j"&&e[1]===":"?e.substr(2):e}var S=class{constructor(t,n={}){this.changeListeners=[],this.HAS_DOCUMENT_COOKIE=!1,this.update=()=>{if(!this.HAS_DOCUMENT_COOKIE)return;let i=this.cookies;this.cookies=q(document.cookie),this._checkChanges(i)};let r=typeof document>"u"?"":document.cookie;this.cookies=Le(t||r),this.defaultSetOptions=n,this.HAS_DOCUMENT_COOKIE=Te()}_emitChange(t){for(let n=0;n<this.changeListeners.length;++n)this.changeListeners[n](t)}_checkChanges(t){new Set(Object.keys(t).concat(Object.keys(this.cookies))).forEach(r=>{t[r]!==this.cookies[r]&&this._emitChange({name:r,value:R(this.cookies[r])})})}_startPolling(){this.pollingInterval=setInterval(this.update,300)}_stopPolling(){this.pollingInterval&&clearInterval(this.pollingInterval)}get(t,n={}){return n.doNotUpdate||this.update(),R(this.cookies[t],n)}getAll(t={}){t.doNotUpdate||this.update();let n={};for(let r in this.cookies)n[r]=R(this.cookies[r],t);return n}set(t,n,r){r?r=Object.assign(Object.assign({},this.defaultSetOptions),r):r=this.defaultSetOptions;let i=typeof n=="string"?n:JSON.stringify(n);this.cookies=Object.assign(Object.assign({},this.cookies),{[t]:i}),this.HAS_DOCUMENT_COOKIE&&(document.cookie=Q(t,i,r)),this._emitChange({name:t,value:n,options:r})}remove(t,n){let r=n=Object.assign(Object.assign(Object.assign({},this.defaultSetOptions),n),{expires:new Date(1970,1,1,0,0,1),maxAge:0});this.cookies=Object.assign({},this.cookies),delete this.cookies[t],this.HAS_DOCUMENT_COOKIE&&(document.cookie=Q(t,"",r)),this._emitChange({name:t,value:void 0,options:n})}addChangeListener(t){this.changeListeners.push(t),this.HAS_DOCUMENT_COOKIE&&this.changeListeners.length===1&&(typeof window=="object"&&"cookieStore"in window?window.cookieStore.addEventListener("change",this.update):this._startPolling())}removeChangeListener(t){let n=this.changeListeners.indexOf(t);n>=0&&this.changeListeners.splice(n,1),this.HAS_DOCUMENT_COOKIE&&this.changeListeners.length===0&&(typeof window=="object"&&"cookieStore"in window?window.cookieStore.removeEventListener("change",this.update):this._stopPolling())}};var f=[];for(U=0;U<256;++U)f.push((U+256).toString(16).slice(1));var U;function J(e,t=0){return(f[e[t+0]]+f[e[t+1]]+f[e[t+2]]+f[e[t+3]]+"-"+f[e[t+4]]+f[e[t+5]]+"-"+f[e[t+6]]+f[e[t+7]]+"-"+f[e[t+8]]+f[e[t+9]]+"-"+f[e[t+10]]+f[e[t+11]]+f[e[t+12]]+f[e[t+13]]+f[e[t+14]]+f[e[t+15]]).toLowerCase()}var T,Oe=new Uint8Array(16);function A(){if(!T&&(T=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!T))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return T(Oe)}var Ie=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),N={randomUUID:Ie};function xe(e,t,n){if(N.randomUUID&&!t&&!e)return N.randomUUID();e=e||{};var r=e.random||(e.rng||A)();if(r[6]=r[6]&15|64,r[8]=r[8]&63|128,t){n=n||0;for(var i=0;i<16;++i)t[n+i]=r[i];return t}return J(r)}var L=xe;var k=new S(null);function Z(e,t){return{client_key:c.clientKey,environment:c.environment,event_name:e,user_agent:Pe(),url:Me(),referrer:Fe(),language:Ae(),connection_type:De(),screen_width:Ke(),timezone:Ne(),session_id:Be(),client_id:Ge(),...Re(),...He(e),...t||{}}}var Me=()=>{let e=c.includeURLFragment?window.location.hash:"",t=[];if(c.includeURLQueryParams&&c.includeURLQueryParams.length>0){let r=new URLSearchParams(window.location.search);for(let i of c.includeURLQueryParams)if(r.has(i)){let a=r.get(i);a?t.push(`${i}=${a}`):t.push(`${i}`)}}let n="";return t&&t.length>0&&(n=`?${t.join("&")}`),window.location.protocol+"//"+window.location.hostname+window.location.pathname+n+e},Pe=()=>window.navigator.userAgent,y=e=>{let t=window.location.search.match(e);return t?t[2]:void 0},Re=()=>({utm_source:y(/[?&](ref|source|utm_source)=([^?&]+)/),utm_campaign:y(/[?&](utm_campaign)=([^?&]+)/),utm_medium:y(/[?&](utm_medium)=([^?&]+)/),utm_content:y(/[?&](utm_content)=([^?&]+)/),utm_term:y(/[?&](utm_term)=([^?&]+)/)}),Ae=()=>{let e=window.navigator;return e?e.userLanguage||e.language:void 0},Ne=()=>{try{return Intl.DateTimeFormat().resolvedOptions().timeZone}catch{return}},De=()=>navigator.connection&&"effectiveType"in navigator.connection?navigator.connection.effectiveType:void 0,Fe=()=>{let e=document.referrer;if(e){let t=new URL(e);return t.hostname.toLowerCase()===window.location.hostname.toLowerCase()?void 0:t.protocol+"//"+t.hostname+t.pathname}},Ke=()=>window?.innerWidth,je=e=>{try{if(e){let t=Math.ceil(e);return isNaN(t)||t<0?void 0:t}else return}catch{return}},Be=()=>{let e=k.get(p.SESSION_COOKIE);if(!e){s("Session id is not found, creating new one");let t=new Date;t.setMinutes(t.getMinutes()+30);let n=L();return k.set(p.SESSION_COOKIE,n,{expires:t}),n}return e},Ge=()=>{let e=k.get(p.CLIENT_COOKIE);if(!e){s("Client id is not found, creating new one");let t=L();return k.set(p.CLIENT_COOKIE,t),t}return e},He=e=>{let t={};if(e!=="Pageview"||window.upassist._initialPageLoadSent)return t;try{let n=window.performance||window.mozPerformance||window.msPerformance||window.webkitPerformance||{};if(n.getEntriesByType){let r=n.getEntriesByType("navigation")[0];r&&(t={page_load_dns:r.domainLookupEnd-r.domainLookupStart,page_load_connect:r.connectEnd-r.connectStart,page_load_ssl:r.secureConnectionStart?r.requestStart-r.secureConnectionStart:void 0,page_load_ttfb:r.responseStart-r.requestStart,page_load_download:r.responseEnd-r.responseStart,page_load_dom_content_loaded:r.domContentLoadedEventEnd-r.responseEnd,page_load_render:r.domComplete-r.domContentLoadedEventEnd,page_load_total:r.loadEventStart,page_load_transfer_size:r.transferSize})}}catch(n){s("Error while loading performance metrics",n)}for(let n of Object.keys(t))t[n]=je(t[n]);return window.upassist._initialPageLoadSent=!0,t};var X=async(e,t)=>{let n=Z(e,t),r=ze(n);r&&We(r)&&await Ve(r)},Ve=async e=>{let t=`${c.ingestionHost}/sites/events`,n=JSON.stringify(e);await fetch(t,{body:n,method:"POST",credentials:"omit",headers:{"Content-type":"application/json"},keepalive:!0})},We=e=>{if(!c.clientKey)return s("Bad configuration: missing clientKey",void 0,!0),!1;if(!e.event_name||!/^[a-zA-Z][a-zA-Z0-9\_\-\.]{0,63}$/.test(e.event_name)){s("Invalid event name.",void 0,!0);return}if(window.localStorage&&window.localStorage.getItem(p.TRACKING_DISABLED)||!c.enabled)return s("Skipping event collection, Upassist RUM has been manually disabled on this browser.",void 0,!0),!1;if(!c.debug){if(c.honorDNT&&"doNotTrack"in window.navigator&&window.navigator.doNotTrack==="1")return s("Honoring 'Do Not Track'",void 0,!0),!1;if(c.filterLocalhost&&/^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*\:)*?:?0*1$/.test(window.location.hostname))return s("Skipping event collection, localhost filter enabled",void 0,!0),!1;if(window.location.protocol==="file:")return s("Can't track from file URLs",void 0,!0),!1;if(window.document.visibilityState==="prerender")return s("Skipping event collection, document is pre-rendering",void 0,!0),!1;if(window.navigator.webdriver)return s("Skipping event collection, navigation is automated",void 0,!0),!1}if(e.event_name==="Pageview"){let t=window.upassist._previousPath,n=e.url;if(window.upassist._previousPath=n,t&&t===n){s("Skipping event collection, duplicate pageview detected");return}}return!0},ze=e=>{let t=e;if(c.beforeSend){let n;try{n=c.beforeSend({...e})}catch(r){console.error(r)}if(!n){s("beforeSend hook returned null or undefined, skipping event collection");return}n.client_key=e.client_key;for(let r of Object.keys(e))t[r]=n[r]}return t};function Y(e,t){let n=!1;return(...r)=>{n||(n=!0,setTimeout(()=>{e(...r),n=!1},t))}}var m,E,se,O;var ce=-1,b=function(e){addEventListener("pageshow",function(t){t.persisted&&(ce=t.timeStamp,e(t))},!0)},ue=function(){return window.performance&&performance.getEntriesByType&&performance.getEntriesByType("navigation")[0]},F=function(){var e=ue();return e&&e.activationStart||0},g=function(e,t){var n=ue(),r="navigate";return ce>=0?r="back-forward-cache":n&&(document.prerendering||F()>0?r="prerender":document.wasDiscarded?r="restore":n.type&&(r=n.type.replace(/_/g,"-"))),{name:e,value:t===void 0?-1:t,rating:"good",delta:0,entries:[],id:"v3-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12),navigationType:r}},x=function(e,t,n){try{if(PerformanceObserver.supportedEntryTypes.includes(e)){var r=new PerformanceObserver(function(i){Promise.resolve().then(function(){t(i.getEntries())})});return r.observe(Object.assign({type:e,buffered:!0},n||{})),r}}catch{}},h=function(e,t,n,r){var i,a;return function(o){t.value>=0&&(o||r)&&((a=t.value-(i||0))||i===void 0)&&(i=t.value,t.delta=a,t.rating=function(u,d){return u>d[1]?"poor":u>d[0]?"needs-improvement":"good"}(t.value,n),e(t))}},K=function(e){requestAnimationFrame(function(){return requestAnimationFrame(function(){return e()})})},j=function(e){var t=function(n){n.type!=="pagehide"&&document.visibilityState!=="hidden"||e(n)};addEventListener("visibilitychange",t,!0),addEventListener("pagehide",t,!0)},B=function(e){var t=!1;return function(n){t||(e(n),t=!0)}},w=-1,ee=function(){return document.visibilityState!=="hidden"||document.prerendering?1/0:0},I=function(e){document.visibilityState==="hidden"&&w>-1&&(w=e.type==="visibilitychange"?e.timeStamp:0,$e())},te=function(){addEventListener("visibilitychange",I,!0),addEventListener("prerenderingchange",I,!0)},$e=function(){removeEventListener("visibilitychange",I,!0),removeEventListener("prerenderingchange",I,!0)},G=function(){return w<0&&(w=ee(),te(),b(function(){setTimeout(function(){w=ee(),te()},0)})),{get firstHiddenTime(){return w}}},H=function(e){document.prerendering?addEventListener("prerenderingchange",function(){return e()},!0):e()},ne=[1800,3e3],Qe=function(e,t){t=t||{},H(function(){var n,r=G(),i=g("FCP"),a=x("paint",function(o){o.forEach(function(u){u.name==="first-contentful-paint"&&(a.disconnect(),u.startTime<r.firstHiddenTime&&(i.value=Math.max(u.startTime-F(),0),i.entries.push(u),n(!0)))})});a&&(n=h(e,i,ne,t.reportAllChanges),b(function(o){i=g("FCP"),n=h(e,i,ne,t.reportAllChanges),K(function(){i.value=performance.now()-o.timeStamp,n(!0)})}))})},re=[.1,.25],de=function(e,t){t=t||{},Qe(B(function(){var n,r=g("CLS",0),i=0,a=[],o=function(d){d.forEach(function(l){if(!l.hadRecentInput){var M=a[0],we=a[a.length-1];i&&l.startTime-we.startTime<1e3&&l.startTime-M.startTime<5e3?(i+=l.value,a.push(l)):(i=l.value,a=[l])}}),i>r.value&&(r.value=i,r.entries=a,n())},u=x("layout-shift",o);u&&(n=h(e,r,re,t.reportAllChanges),j(function(){o(u.takeRecords()),n(!0)}),b(function(){i=0,r=g("CLS",0),n=h(e,r,re,t.reportAllChanges),K(function(){return n()})}),setTimeout(n,0))}))},_={passive:!0,capture:!0},qe=new Date,ie=function(e,t){m||(m=t,E=e,se=new Date,fe(removeEventListener),le())},le=function(){if(E>=0&&E<se-qe){var e={entryType:"first-input",name:m.type,target:m.target,cancelable:m.cancelable,startTime:m.timeStamp,processingStart:m.timeStamp+E};O.forEach(function(t){t(e)}),O=[]}},Je=function(e){if(e.cancelable){var t=(e.timeStamp>1e12?new Date:performance.now())-e.timeStamp;e.type=="pointerdown"?function(n,r){var i=function(){ie(n,r),o()},a=function(){o()},o=function(){removeEventListener("pointerup",i,_),removeEventListener("pointercancel",a,_)};addEventListener("pointerup",i,_),addEventListener("pointercancel",a,_)}(t,e):ie(t,e)}},fe=function(e){["mousedown","keydown","touchstart","pointerdown"].forEach(function(t){return e(t,Je,_)})},oe=[100,300],pe=function(e,t){t=t||{},H(function(){var n,r=G(),i=g("FID"),a=function(d){d.startTime<r.firstHiddenTime&&(i.value=d.processingStart-d.startTime,i.entries.push(d),n(!0))},o=function(d){d.forEach(a)},u=x("first-input",o);n=h(e,i,oe,t.reportAllChanges),u&&j(B(function(){o(u.takeRecords()),u.disconnect()})),u&&b(function(){var d;i=g("FID"),n=h(e,i,oe,t.reportAllChanges),O=[],E=-1,m=null,fe(addEventListener),d=a,O.push(d),le()})})};var kt=1/0;var ae=[2500,4e3],D={},me=function(e,t){t=t||{},H(function(){var n,r=G(),i=g("LCP"),a=function(d){var l=d[d.length-1];l&&l.startTime<r.firstHiddenTime&&(i.value=Math.max(l.startTime-F(),0),i.entries=[l],n())},o=x("largest-contentful-paint",a);if(o){n=h(e,i,ae,t.reportAllChanges);var u=B(function(){D[i.id]||(a(o.takeRecords()),o.disconnect(),D[i.id]=!0,n(!0))});["keydown","click"].forEach(function(d){addEventListener(d,function(){return setTimeout(u,0)},!0)}),j(u),b(function(d){i=g("LCP"),n=h(e,i,ae,t.reportAllChanges),K(function(){i.value=performance.now()-d.timeStamp,D[i.id]=!0,n(!0)})})}})};function ge(){window?.upassist?._listeningForErrors||(window.addEventListener("error",V),window.upassist._listeningForErrors=!0,s("Listening for errors"))}function he(){if(window?.upassist?._listeningForCoreWebVitals)return;let e=(t,n)=>r=>{v(t,{[n]:r.value})};de(e("WebVital","web_vital_cls")),pe(e("WebVital","web_vital_fid")),me(e("WebVital","web_vital_lcp")),window.upassist._listeningForCoreWebVitals=!0,s("Listening for Core Web Vitals")}var Ze=(e,t,n={})=>{switch(e){case"config":if(!t)return s("Passed empty config params");Xe(t);break;case"track":v(t,n);break;case"captureError":V(t,n);break;default:s("Unknown command",e,!0);return}},V=Y((e,t={})=>{v("Error",{error_type:e.error?.name||"Error",message:e.error?.message||e.message,lineno:e.lineno,colno:e.colno,filename:e.filename,...t})},1e3),v=(e,t={})=>{let n=()=>X(e,t);document.readyState==="complete"?setTimeout(n,0):(s("Document not ready, adding event listener"),window.addEventListener("load",()=>{setTimeout(n,0)}))},Xe=e=>{let t={...c},n=$(e);c.trackMode&&["pageload","history"].indexOf(c.trackMode)>-1&&(c.trackMode==="history"&&z(),!t.clientKey&&n.clientKey&&(s("Triggering initial pageview"),v("Pageview"))),s(`Tracking mode: ${c.trackMode}`)};var ve=()=>{W();let e=window.upassist&&window.upassist.q||[];window.upassist=Ze,window.upassist.q=e;for(let t of e)window.upassist.apply(void 0,t);c.autoTrackErrors&&ge(),c.autoTrackCoreWebVitals&&he()};ve();})();
/*! Bundled license information:

universal-cookie/esm/index.mjs:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
