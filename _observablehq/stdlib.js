var T=Object.defineProperty;var i=(t,e)=>T(t,"name",{value:e,configurable:!0});var f,m,d,D=Object.defineProperty,u=i((t,e)=>D(t,"name",{value:e,configurable:!0}),"o$3");const h=new Map;function P(t,e){const r=new URL(t,location).href;if(e==null)h.delete(r);else{const{path:n,mimeType:a,lastModified:o}=e,s=new b(new URL(n,location).href,t.split("/").pop(),a,o);h.set(r,s)}}i(P,"y"),u(P,"registerFile");function v(t,e=location){if(new.target!==void 0)throw new TypeError("FileAttachment is not a constructor");const r=h.get(new URL(t,e).href);if(!r)throw new Error(`File not found: ${t}`);return r}i(v,"p$1"),u(v,"FileAttachment");async function c(t){const e=await fetch(await t.url());if(!e.ok)throw new Error(`Unable to load file: ${t.name}`);return e}i(c,"i$5"),u(c,"remote_fetch");const O=(f=class{constructor(e,r="application/octet-stream",n){Object.defineProperties(this,{name:{value:`${e}`,enumerable:!0},mimeType:{value:`${r}`,enumerable:!0},lastModified:{value:+n,enumerable:!0}})}async blob(){return(await c(this)).blob()}async arrayBuffer(){return(await c(this)).arrayBuffer()}async text(e){return e===void 0?(await c(this)).text():new TextDecoder(e).decode(await this.arrayBuffer())}async json(){return(await c(this)).json()}async stream(){return(await c(this)).body}async dsv({delimiter:e=",",array:r=!1,typed:n=!1}={}){const[a,o]=await Promise.all([this.text(),import("../_npm/d3-dsv@3.0.1/_esm.js")]),s=o.dsvFormat(e);return(r?s.parseRows:s.parse)(a,n&&o.autoType)}async csv(e){return this.dsv({...e,delimiter:","})}async tsv(e){return this.dsv({...e,delimiter:"	"})}async image(e){const r=await this.url();return new Promise((n,a)=>{const o=new Image;new URL(r,document.baseURI).origin!==new URL(location).origin&&(o.crossOrigin="anonymous"),Object.assign(o,e),o.onload=()=>n(o),o.onerror=()=>a(new Error(`Unable to load file: ${this.name}`)),o.src=r})}async arrow(){const[e,r]=await Promise.all([import("../_npm/apache-arrow@15.0.2/_esm.js"),c(this)]);return e.tableFromIPC(r)}async parquet(){const[e,r,n]=await Promise.all([import("../_npm/apache-arrow@15.0.2/_esm.js"),import("../_npm/parquet-wasm@0.6.1/_esm.js").then(async a=>(await a.default(import.meta.resolve("../_npm/parquet-wasm@0.6.1/esm/parquet_wasm_bg.wasm")),a)),this.arrayBuffer()]);return e.tableFromIPC(r.readParquet(new Uint8Array(n)).intoIPCStream())}async sqlite(){const[{SQLiteDatabaseClient:e},r]=await Promise.all([import("./stdlib/sqlite.js"),this.arrayBuffer()]);return e.open(r)}async zip(){const[{ZipArchive:e},r]=await Promise.all([import("./stdlib/zip.js"),this.arrayBuffer()]);return e.from(r)}async xml(e="application/xml"){return new DOMParser().parseFromString(await this.text(),e)}async html(){return this.xml("text/html")}async xlsx(){const[{Workbook:e},r]=await Promise.all([import("./stdlib/xlsx.js"),this.arrayBuffer()]);return e.load(r)}},i(f,"m"),f);u(O,"AbstractFile");let j=O;const x=(m=class extends j{constructor(e,r,n,a){super(r,n,a),Object.defineProperty(this,"href",{value:e})}async url(){return this.href}},i(m,"w"),m);u(x,"FileAttachmentImpl");let b=x;Object.defineProperty(b,"name",{value:"FileAttachment"}),v.prototype=b.prototype;var _=Object.defineProperty,S=i((t,e)=>_(t,"name",{value:e,configurable:!0}),"r$2");async function*l(t){let e,r,n=!1;const a=t(o=>(r=o,e?(e(o),e=null):n=!0,o));if(a!=null&&typeof a!="function")throw new Error(typeof a.then=="function"?"async initializers are not supported":"initializer returned something, but not a dispose function");try{for(;;)yield n?(n=!1,r):new Promise(o=>e=o)}finally{a?.()}}i(l,"u"),S(l,"observe");var G=Object.defineProperty,F=i((t,e)=>G(t,"name",{value:e,configurable:!0}),"o$2");function A(){return l(t=>{let e;const r=matchMedia("(prefers-color-scheme: dark)"),n=F(()=>{const a=getComputedStyle(document.body).getPropertyValue("color-scheme")==="dark";e!==a&&t(e=a)},"changed");return n(),r.addEventListener("change",n),()=>r.removeEventListener("change",n)})}i(A,"m"),F(A,"dark");var N=Object.defineProperty,y=i((t,e)=>N(t,"name",{value:e,configurable:!0}),"e$2");function E(t){return l(e=>{const r=L(t);let n=w(t);const a=y(()=>e(w(t)),"inputted");return t.addEventListener(r,a),n!==void 0&&e(n),()=>t.removeEventListener(r,a)})}i(E,"o$1"),y(E,"input");function w(t){switch(t.type){case"range":case"number":return t.valueAsNumber;case"date":return t.valueAsDate;case"checkbox":return t.checked;case"file":return t.multiple?t.files:t.files[0];case"select-multiple":return Array.from(t.selectedOptions,e=>e.value);default:return t.value}}i(w,"a"),y(w,"valueof");function L(t){switch(t.type){case"button":case"submit":case"checkbox":return"click";case"file":return"change";default:return"input"}}i(L,"f$2"),y(L,"eventof");var Q=Object.defineProperty,V=i((t,e)=>Q(t,"name",{value:e,configurable:!0}),"e$1");async function*k(){for(;;)yield Date.now()}i(k,"i$3"),V(k,"now");var W=Object.defineProperty,Z=i((t,e)=>W(t,"name",{value:e,configurable:!0}),"r$1");async function*R(t){let e;const r=[],n=t(a=>(r.push(a),e&&(e(r.shift()),e=null),a));if(n!=null&&typeof n!="function")throw new Error(typeof n.then=="function"?"async initializers are not supported":"initializer returned something, but not a dispose function");try{for(;;)yield r.length?r.shift():new Promise(a=>e=a)}finally{n?.()}}i(R,"l$1"),Z(R,"queue");var H=Object.defineProperty,J=i((t,e)=>H(t,"name",{value:e,configurable:!0}),"i$2");function z(t,e){return l(r=>{let n;const a=new ResizeObserver(([o])=>{const s=o.contentRect.width;s!==n&&r(n=s)});return a.observe(t,e),()=>a.disconnect()})}i(z,"d$1"),J(z,"width");var K=Object.freeze({__proto__:null,dark:A,input:E,now:k,observe:l,queue:R,width:z}),X=Object.defineProperty,Y=i((t,e)=>X(t,"name",{value:e,configurable:!0}),"r");function U(t){let e;return Object.defineProperty(l(r=>{e=r,t!==void 0&&e(t)}),"value",{get:()=>t,set:r=>void e(t=r)})}i(U,"f$1"),Y(U,"Mutable");var ee=Object.defineProperty,q=i((t,e)=>ee(t,"name",{value:e,configurable:!0}),"l");function B(t,e){const r=document.createElement("div");r.style.position="relative",t.length!==1&&(r.style.height="100%");let n=0,a=0;const o=new ResizeObserver(async([s])=>{const{width:g,height:I}=s.contentRect,$=++n,p=g>0?await t(g,I):null;if(!(a>$)){for(a=$;r.lastChild;)r.lastChild.remove();p!=null&&(t.length!==1&&C(p)&&(p.style.position="absolute"),r.append(p))}});return o.observe(r),e?.then(()=>o.disconnect()),r}i(B,"p"),q(B,"resize");function C(t){return typeof t=="object"&&t.nodeType===1}i(C,"f"),q(C,"isElement");var te=Object.defineProperty,re=i((t,e)=>te(t,"name",{value:e,configurable:!0}),"o");const M=(d=class{},i(d,"e"),d);re(M,"Library");let ne=M;const ae=void 0;export{j as AbstractFile,v as FileAttachment,ae as FileAttachments,K as Generators,ne as Library,U as Mutable,P as registerFile,B as resize};
