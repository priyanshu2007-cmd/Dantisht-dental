document.addEventListener('DOMContentLoaded',()=>{
  // Mobile menu
  const btn=document.querySelector('.mobile-menu-btn');
  const nav=document.querySelector('nav');
  const hamburger=document.querySelector('.hamburger');
  if(btn&&nav&&hamburger){
    btn.addEventListener('click',()=>{nav.classList.toggle('active');hamburger.classList.toggle('open')});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('active');hamburger.classList.remove('open')}));
  }

  // Sticky header
  const header=document.querySelector('header');
  window.addEventListener('scroll',()=>{header.classList.toggle('scrolled',window.scrollY>80)});

  // Typewriter
  const tw=document.querySelector('.typewriter-text');
  if(tw){
    const text=tw.dataset.text||tw.innerText;tw.innerText='';let i=0;
    function type(){if(i<text.length){tw.innerHTML+=text.charAt(i);i++;setTimeout(type,80)}else tw.classList.remove('typewriter-cursor')}
    setTimeout(()=>{tw.classList.add('typewriter-cursor');type()},500);
  }

  // GSAP scroll animations
  if(typeof gsap!=='undefined'&&typeof ScrollTrigger!=='undefined'){
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.gsap-fade-up').forEach(el=>{
      gsap.to(el,{scrollTrigger:{trigger:el,start:'top 85%'},opacity:1,y:0,duration:.8,ease:'power2.out'});
    });
    document.querySelectorAll('.gsap-stagger-container').forEach(c=>{
      const items=c.querySelectorAll('.gsap-stagger-item');
      gsap.to(items,{scrollTrigger:{trigger:c,start:'top 80%'},opacity:1,y:0,duration:.6,stagger:.1,ease:'power2.out'});
    });
  }else{
    const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity=1;e.target.style.transform='translateY(0)';e.target.style.transition='.6s ease';obs.unobserve(e.target)}})},{threshold:.1});
    document.querySelectorAll('.gsap-fade-up,.gsap-stagger-item').forEach(el=>obs.observe(el));
  }

  // 3D tilt on cards
  document.querySelectorAll('.tilt-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      if(window.innerWidth<768)return;
      const r=card.getBoundingClientRect();
      const x=e.clientX-r.left,y=e.clientY-r.top;
      const rx=((y-r.height/2)/r.height)*-10,ry=((x-r.width/2)/r.width)*10;
      card.style.transform=`perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave',()=>{card.style.transform='perspective(800px) rotateX(0) rotateY(0)'});
  });

  // Accordion
  document.querySelectorAll('.acc-header').forEach(h=>{
    h.addEventListener('click',()=>{
      const c=h.nextElementSibling,icon=h.querySelector('i');
      c.classList.toggle('active');
      if(icon)icon.classList.toggle('fa-plus'),icon.classList.toggle('fa-minus');
    });
  });
});
