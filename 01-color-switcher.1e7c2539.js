const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]");e.addEventListener("click",(function(){d||(n(),d=setInterval(n,1e3),e.disabled=!0,t.disabled=!1)})),t.addEventListener("click",(function(){d&&(clearInterval(d),d=null,e.disabled=!1,t.disabled=!0)}));let d=null;function n(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}t.disabled=!0;
//# sourceMappingURL=01-color-switcher.1e7c2539.js.map
