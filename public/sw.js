if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>a(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-5f5b08d6"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/1024x1024.png",revision:"6ad603dd83c784f4b34e2a9f0412ceeb"},{url:"/128x128.png",revision:"5b4693b045189be4d91f01fcd8b9412a"},{url:"/16px.png",revision:"9cc3bfb3d9bccbefbd0984c8a3945b09"},{url:"/192x192.png",revision:"cacd0944cd0a3f4d0669339340a1e81b"},{url:"/32px.png",revision:"f82adfc383be057a2ddbe7da059306cd"},{url:"/384x384.png",revision:"a6c6daca3e0215ca5b87f7ccf7605168"},{url:"/48x48.png",revision:"db71a1091118542120d9948e781bebdb"},{url:"/512x512.png",revision:"8330e07c52334954853c58e143436c31"},{url:"/72x72.png",revision:"16384b31d6e8fa6a9a92086cfbeeeb46"},{url:"/96x96.png",revision:"7d4bab46a00e70b9ff0156699237a6fc"},{url:"/_next/static/0TnF21UwJEFQ4GOyBVVx0/_buildManifest.js",revision:"3143a1765de3d6e7a06da1b2dc7d02fc"},{url:"/_next/static/0TnF21UwJEFQ4GOyBVVx0/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/0TnF21UwJEFQ4GOyBVVx0/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/113-48d6177fa3992227.js",revision:"48d6177fa3992227"},{url:"/_next/static/chunks/121-2472d6108d0c6630.js",revision:"2472d6108d0c6630"},{url:"/_next/static/chunks/400-ae69f9c1072b185f.js",revision:"ae69f9c1072b185f"},{url:"/_next/static/chunks/619-a0794f5230ac2fca.js",revision:"a0794f5230ac2fca"},{url:"/_next/static/chunks/668-7d165557535c45dd.js",revision:"7d165557535c45dd"},{url:"/_next/static/chunks/671-ab1fefd22a1b2a23.js",revision:"ab1fefd22a1b2a23"},{url:"/_next/static/chunks/797-8710e6210e551226.js",revision:"8710e6210e551226"},{url:"/_next/static/chunks/858-4376f0a62d86ace5.js",revision:"4376f0a62d86ace5"},{url:"/_next/static/chunks/899-595dde08fbc44119.js",revision:"595dde08fbc44119"},{url:"/_next/static/chunks/943-a093627d5eb29679.js",revision:"a093627d5eb29679"},{url:"/_next/static/chunks/990-35e695d119a436ef.js",revision:"35e695d119a436ef"},{url:"/_next/static/chunks/fc83e031-8955bec3fd17440a.js",revision:"8955bec3fd17440a"},{url:"/_next/static/chunks/main-f116544eb167334b.js",revision:"f116544eb167334b"},{url:"/_next/static/chunks/pages/%5B...canciones%5D-5ddda14590650340.js",revision:"5ddda14590650340"},{url:"/_next/static/chunks/pages/%5Bperfil%5D-2320e5afc8e9ff65.js",revision:"2320e5afc8e9ff65"},{url:"/_next/static/chunks/pages/_app-a3e7a426358e1821.js",revision:"a3e7a426358e1821"},{url:"/_next/static/chunks/pages/_error-49f0f5318dc60976.js",revision:"49f0f5318dc60976"},{url:"/_next/static/chunks/pages/admin-32f71c8b6697b43f.js",revision:"32f71c8b6697b43f"},{url:"/_next/static/chunks/pages/app-75df8a4c50693a3b.js",revision:"75df8a4c50693a3b"},{url:"/_next/static/chunks/pages/buscar-61a228de41983f05.js",revision:"61a228de41983f05"},{url:"/_next/static/chunks/pages/cuenta-40206f991ca2bbb3.js",revision:"40206f991ca2bbb3"},{url:"/_next/static/chunks/pages/docs/fonts-72d6b10ebcb9f7be.js",revision:"72d6b10ebcb9f7be"},{url:"/_next/static/chunks/pages/editor-e2e529c9de056d1c.js",revision:"e2e529c9de056d1c"},{url:"/_next/static/chunks/pages/estudio-ed98b9bb3f6f261b.js",revision:"ed98b9bb3f6f261b"},{url:"/_next/static/chunks/pages/index-f11866ed50522333.js",revision:"f11866ed50522333"},{url:"/_next/static/chunks/pages/test/preview-f77935f0b0db06af.js",revision:"f77935f0b0db06af"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-5752944655d749a0.js",revision:"5752944655d749a0"},{url:"/_next/static/css/ef25f0b166cd9e4f.css",revision:"ef25f0b166cd9e4f"},{url:"/_next/static/media/manrope-cyrillic-ext-variable-wghtOnly-normal.b077bb8a.woff2",revision:"b077bb8a"},{url:"/_next/static/media/manrope-cyrillic-variable-wghtOnly-normal.dc1e6ea5.woff2",revision:"dc1e6ea5"},{url:"/_next/static/media/manrope-greek-variable-wghtOnly-normal.7c99c835.woff2",revision:"7c99c835"},{url:"/_next/static/media/manrope-latin-ext-variable-wghtOnly-normal.d4794b04.woff2",revision:"d4794b04"},{url:"/_next/static/media/manrope-latin-variable-wghtOnly-normal.f34385da.woff2",revision:"f34385da"},{url:"/_next/static/media/manrope-vietnamese-variable-wghtOnly-normal.0cbacf85.woff2",revision:"0cbacf85"},{url:"/_next/static/media/metropolis-all-700-normal.7331f03d.woff",revision:"7331f03d"},{url:"/_next/static/media/metropolis-all-700-normal.f6c09cc3.woff2",revision:"f6c09cc3"},{url:"/canva-colors.png",revision:"67b61faac08c6003a5b4946439d33a51"},{url:"/cursor.png",revision:"41bfcd27130150212adb34567e0556b7"},{url:"/cursor.svg",revision:"6e1ddd31350e44cb6a37bf649cbc4f41"},{url:"/favicon.ico",revision:"56af529096e19e75c4b5b2d6131b16c6"},{url:"/manifest.json",revision:"1d0c3e7da0c1149a7dbb97918a1e88e0"},{url:"/pointer.svg",revision:"1de3137e8f46c52707fa93eb316ae18d"},{url:"/robots.txt",revision:"84252717a1671a1f916730f58d9a165c"},{url:"/search.svg",revision:"26d6e89fafad49ca4a122ffb68bc9aec"},{url:"/sitemap-0.xml",revision:"c85dc3bbc15339b314c8f5ca95c5e135"},{url:"/sitemap.xml",revision:"52d712dd7e0672e7c7f1cf8a04992c6b"},{url:"/undraw_page_not_found.svg",revision:"eec4b0f3b80e520e6c62c763e4bbbb81"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));