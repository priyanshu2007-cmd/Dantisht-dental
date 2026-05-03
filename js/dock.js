/**
 * MagnificationDock — Vanilla JS
 * macOS-inspired dock with mouse-proximity magnification, spring physics, and tooltips.
 * Adapted for Dantisht dental clinic website.
 */
(function () {
  'use strict';

  var CONFIG = {
    baseSize: 48,
    maxSize: 72,
    distance: 180,
    springStiffness: 0.12,
    springDamping: 0.7
  };

  var isHomePage = window.location.pathname.endsWith('index.html') ||
                   window.location.pathname.endsWith('/') ||
                   window.location.pathname === '';

  function goToSection(sectionId) {
    var el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = 'index.html#' + sectionId;
    }
  }

  var ITEMS = [
    { icon: 'fa-solid fa-house', label: 'Home', action: function() { 
      if (isHomePage) { window.scrollTo({ top: 0, behavior: 'smooth' }); }
      else { window.location.href = 'index.html'; }
    }},
    { icon: 'fa-solid fa-tooth', label: 'Treatments', action: function() { goToSection('services'); } },
    { icon: 'fa-solid fa-user-doctor', label: 'Our Doctor', action: function() { goToSection('about'); } },
    { icon: 'fa-solid fa-star', label: 'Reviews', action: function() { window.location.href = 'reviews.html'; } },
    { icon: 'fa-brands fa-whatsapp', label: 'WhatsApp', accent: '#25D366', action: function() { 
      window.open('https://wa.me/917011463009', '_blank'); 
    }},
    { icon: 'fa-solid fa-phone', label: 'Call Us', accent: '#2A9D8F', action: function() { 
      window.location.href = 'tel:+911244547139'; 
    }},
    { icon: 'fa-solid fa-calendar-check', label: 'Book Now', accent: '#B59363', action: function() { 
      window.open('https://wa.me/917011463009?text=Hi%20Dantisht!%20I%20would%20like%20to%20book%20an%20appointment.', '_blank'); 
    }}
  ];

  // Simple spring
  function SpringValue(initial) {
    this.target = initial;
    this.current = initial;
    this.velocity = 0;
  }
  SpringValue.prototype.set = function(t) { this.target = t; };
  SpringValue.prototype.tick = function() {
    var force = (this.target - this.current) * CONFIG.springStiffness;
    this.velocity += force;
    this.velocity *= CONFIG.springDamping;
    this.current += this.velocity;
    return this.current;
  };

  function createDock() {
    // Remove old FABs
    var oldFabs = document.querySelectorAll('.fab-container, .fab-call, .fab');
    for (var i = 0; i < oldFabs.length; i++) { oldFabs[i].style.display = 'none'; }

    // Dock wrapper
    var dock = document.createElement('div');
    dock.className = 'mag-dock';

    // Panel
    var panel = document.createElement('div');
    panel.className = 'mag-dock-panel';

    var springs = [];
    var itemEls = [];

    for (var i = 0; i < ITEMS.length; i++) {
      (function(item, idx) {
        var spring = new SpringValue(CONFIG.baseSize);
        springs.push(spring);

        var el = document.createElement('button');
        el.className = 'mag-dock-item';
        el.type = 'button';
        el.title = item.label;
        el.style.width = CONFIG.baseSize + 'px';
        el.style.height = CONFIG.baseSize + 'px';
        if (item.accent) {
          el.style.background = item.accent;
          el.style.borderColor = 'transparent';
          el.setAttribute('data-accent', '1');
        }

        var iconEl = document.createElement('i');
        iconEl.className = item.icon + ' mag-dock-icon';
        if (item.accent) iconEl.style.color = '#fff';
        el.appendChild(iconEl);

        // Tooltip
        var tooltip = document.createElement('span');
        tooltip.className = 'mag-dock-tooltip';
        tooltip.textContent = item.label;
        el.appendChild(tooltip);

        el.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          item.action();
        });

        panel.appendChild(el);
        itemEls.push(el);
      })(ITEMS[i], i);
    }

    dock.appendChild(panel);
    document.body.appendChild(dock);

    // Animation loop
    var mouseX = Infinity;

    panel.addEventListener('mousemove', function(e) { mouseX = e.clientX; });
    panel.addEventListener('mouseleave', function() { mouseX = Infinity; });

    function animate() {
      for (var i = 0; i < itemEls.length; i++) {
        var el = itemEls[i];
        var rect = el.getBoundingClientRect();
        var center = rect.left + rect.width / 2;
        var dist = Math.abs(mouseX - center);
        var targetSize = dist < CONFIG.distance
          ? CONFIG.baseSize + (CONFIG.maxSize - CONFIG.baseSize) * (1 - dist / CONFIG.distance)
          : CONFIG.baseSize;

        springs[i].set(targetSize);
        var size = springs[i].tick();

        el.style.width = Math.round(size) + 'px';
        el.style.height = Math.round(size) + 'px';
        var icon = el.querySelector('.mag-dock-icon');
        if (icon) icon.style.fontSize = Math.round(size * 0.4) + 'px';
      }
      requestAnimationFrame(animate);
    }
    animate();

    // Show/hide on scroll
    var lastScroll = 0;
    var hidden = false;
    window.addEventListener('scroll', function() {
      var st = window.scrollY;
      if (st > lastScroll && st > 300 && !hidden) {
        dock.classList.add('dock-hidden');
        hidden = true;
      } else if (st < lastScroll && hidden) {
        dock.classList.remove('dock-hidden');
        hidden = false;
      }
      lastScroll = st;
    }, { passive: true });
  }

  // Init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createDock);
  } else {
    createDock();
  }
})();
