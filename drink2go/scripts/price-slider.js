var t=document.querySelector(".slider__bar"),i=document.querySelectorAll(".slider__input"),l=document.querySelector(".slider__input--min"),u=document.querySelector(".slider__input--max"),a=()=>{noUiSlider.create(t,{start:[0,900],step:1,connect:!0,range:{min:[0],max:[1040]},format:{to:function(e){return parseFloat(e)},from:function(e){return parseFloat(e)}}})},c=()=>{t.noUiSlider.on("update",()=>{let e=t.noUiSlider.get();l.value=Math.round(e[0]),u.value=Math.round(e[1])})},r,d=(e,n)=>{r=[null,null],r[e]=n,t.noUiSlider.set(r)};i.forEach((e,n)=>{e.addEventListener("change",o=>{d(n,o.currentTarget.value)})});var s=()=>{a(),c()};s();