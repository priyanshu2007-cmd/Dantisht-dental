document.addEventListener('DOMContentLoaded',()=>{
  // Before/After sliders
  document.querySelectorAll('.ba-card').forEach(card=>{
    const slider=card.querySelector('.ba-slider'),after=card.querySelector('.ba-after'),handle=card.querySelector('.ba-handle');
    if(!slider||!after||!handle)return;
    let active=false;
    const move=e=>{if(!active)return;const r=slider.getBoundingClientRect();let x=(e.type.includes('touch')?e.touches[0].clientX:e.clientX)-r.left;x=Math.max(0,Math.min(x,r.width));const p=(x/r.width)*100;handle.style.left=p+'%';after.style.clipPath=`polygon(${p}% 0,100% 0,100% 100%,${p}% 100%)`};
    slider.addEventListener('mousedown',e=>{active=true;move(e)});
    window.addEventListener('mouseup',()=>active=false);
    window.addEventListener('mousemove',move);
    slider.addEventListener('touchstart',e=>{active=true;move(e)},{passive:true});
    window.addEventListener('touchend',()=>active=false);
    window.addEventListener('touchmove',move,{passive:true});
  });

  // Testimonials carousel
  const carousel=document.querySelector('.testimonials-carousel');
  if(!carousel)return;
  let dragging=false,startX,scrollL,autoInt;
  const startAuto=()=>{if(window.innerWidth<768)return;autoInt=setInterval(()=>{carousel.scrollLeft+=1;if(carousel.scrollLeft>=carousel.scrollWidth-carousel.clientWidth)carousel.scrollLeft=0},30)};
  const stopAuto=()=>clearInterval(autoInt);
  startAuto();
  carousel.addEventListener('mouseenter',stopAuto);
  carousel.addEventListener('mouseleave',()=>{if(!dragging)startAuto()});
  carousel.addEventListener('mousedown',e=>{dragging=true;stopAuto();startX=e.pageX-carousel.offsetLeft;scrollL=carousel.scrollLeft});
  carousel.addEventListener('mouseleave',()=>{dragging=false;startAuto()});
  carousel.addEventListener('mouseup',()=>{dragging=false;startAuto()});
  carousel.addEventListener('mousemove',e=>{if(!dragging)return;e.preventDefault();carousel.scrollLeft=scrollL-(e.pageX-carousel.offsetLeft-startX)*2});
  carousel.addEventListener('touchstart',stopAuto,{passive:true});
  carousel.addEventListener('touchend',()=>setTimeout(startAuto,3000),{passive:true});
});
