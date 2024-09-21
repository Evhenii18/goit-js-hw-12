import{S as y,i as a}from"./assets/vendor-BrddEoy-.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const b="45969466-58730abf31a7490a9e4f6988e",L="https://pixabay.com/api/";function O(n,r=1,o=40){const i=`${L}?key=${b}&q=${n}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${o}`;return fetch(i).then(e=>{if(!e.ok)throw new Error("Failed to fetch images");return e.json()}).catch(e=>{throw console.error("Error:",e),e})}let l=null;function $(n,r){const o=n.map(({webformatURL:i,largeImageURL:e,tags:t,likes:s,views:m,comments:h,downloads:g})=>`
    <li class="gallery-item">
			<a href="${e}" >
				<img class="gallery-img" src="${i}" alt="${t}" loading="lazy" />
				<div class="info">
					<p><b>Likes</b> ${s}</p>
					<p><b>Views</b> ${m}</p>
					<p><b>Comments</b> ${h}</p>
					<p><b>Downloads</b> ${g}</p>
				</div>
			</a>
		</li>
  `).join("");r.innerHTML=o,l?l.refresh():l=new y(".gallery a")}function w(n){n.innerHTML=""}const d=document.querySelector("#search-form"),c=document.querySelector(".gallery"),p=document.querySelector(".loader");let u=1,f="";d.addEventListener("submit",I);function I(n){n.preventDefault();const r=n.target.elements.searchQuery.value.trim();if(r===""){a.warning({timeout:1e4,close:!0,position:"topRight",transitionIn:"fadeIn",transitionOut:"fadeOut",displayMode:2,message:"Please enter a search query!"});return}f=r,u=1,w(c),S(),O(f,u).then(o=>{if(o.hits.length===0){a.error({timeout:1e4,close:!0,position:"topRight",transitionIn:"fadeIn",transitionOut:"fadeOut",displayMode:2,message:"Sorry, there are no images matching your search query. Please, try again!"});return}$(o.hits,c)}).catch(o=>{a.error({timeout:1e4,close:!0,position:"topRight",transitionIn:"fadeIn",transitionOut:"fadeOut",displayMode:2,message:"Something went wrong. Please try again later."}),console.error("Error fetching images:",o)}).finally(()=>{P(),q()})}function S(){p.style.display="block"}function P(){p.style.display="none"}function q(){d.elements.searchQuery.value=""}
//# sourceMappingURL=index.js.map
