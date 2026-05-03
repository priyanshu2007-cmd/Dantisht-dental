/**
 * ================================================================
 * INTERACTIVE FALLING PARTICLES — Clickable + Hoverable
 * Teal (#2A9D8F) + Champagne Gold (#B59363)
 * ================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;pointer-events:auto;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -100, y: -100 };
  const COLORS = ['rgba(42,157,143,', 'rgba(181,147,99,'];
  const COUNT = 60;

  // Treatment zones — particles randomly assigned
  const ZONES = [
    { key: 'advanceRCT',        label: '🦷 Root Canal' },
    { key: 'implants',          label: '🔩 Implants' },
    { key: 'smileDesign',       label: '😊 Smile Design' },
    { key: 'whitening',         label: '✨ Whitening' },
    { key: 'braces',            label: '🦷 Braces' },
    { key: 'scaling',           label: '🧹 Scaling' },
    { key: 'childrenTreatment', label: '👶 Kids Dental' },
    { key: 'hydrafacial',       label: '💧 Hydrafacial' },
    { key: 'botox',             label: '💉 Botox' },
    { key: 'prp',               label: '🩸 PRP Therapy' },
    { key: 'laserHairRemoval',  label: '✨ Laser Hair' }
  ];

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : -10;
      this.size = 1 + Math.random() * 3;
      this.speed = 0.3 + Math.random() * 0.7;
      this.drift = (Math.random() - 0.5) * 0.5;
      this.opacity = 0.3 + Math.random() * 0.5;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.zone = ZONES[Math.floor(Math.random() * ZONES.length)];
      this.hovered = false;
    }
    update() {
      this.y += this.speed;
      this.x += this.drift;
      if (this.y > H + 10) this.reset(false);
      if (this.x < -10 || this.x > W + 10) this.reset(false);

      const dx = mouse.x - this.x, dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      this.hovered = dist < 30;
    }
    draw() {
      const s = this.hovered ? this.size * 3 : this.size;
      const o = this.hovered ? 1 : this.opacity;

      // Glow
      ctx.beginPath();
      ctx.arc(this.x, this.y, s + 4, 0, Math.PI * 2);
      ctx.fillStyle = this.color + (o * 0.15) + ')';
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(this.x, this.y, s, 0, Math.PI * 2);
      ctx.fillStyle = this.color + o + ')';
      ctx.fill();

      // Label on hover
      if (this.hovered) {
        ctx.font = '12px Inter, sans-serif';
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = 'rgba(0,0,0,.6)';
        ctx.lineWidth = 3;
        ctx.strokeText(this.zone.label, this.x + 12, this.y - 8);
        ctx.fillText(this.zone.label, this.x + 12, this.y - 8);
      }
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();

  // Mouse tracking
  canvas.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  canvas.addEventListener('mouseleave', () => { mouse.x = -100; mouse.y = -100; });

  // Click handling — open treatment modal or pass through
  canvas.addEventListener('click', e => {
    const hit = particles.find(p => {
      const dx = e.clientX - p.x, dy = e.clientY - p.y;
      return Math.sqrt(dx * dx + dy * dy) < 30;
    });

    if (hit && window.TreatmentModal) {
      window.TreatmentModal.open(hit.zone.key);
    } else {
      // Pass click through to elements below
      canvas.style.pointerEvents = 'none';
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) el.click();
      setTimeout(() => { canvas.style.pointerEvents = 'auto'; }, 100);
    }
  });

  // Touch support
  canvas.addEventListener('touchstart', e => {
    const t = e.touches[0];
    const hit = particles.find(p => {
      const dx = t.clientX - p.x, dy = t.clientY - p.y;
      return Math.sqrt(dx * dx + dy * dy) < 40;
    });
    if (hit && window.TreatmentModal) {
      e.preventDefault();
      window.TreatmentModal.open(hit.zone.key);
    } else {
      canvas.style.pointerEvents = 'none';
      setTimeout(() => { canvas.style.pointerEvents = 'auto'; }, 300);
    }
  }, { passive: false });

  // Cursor
  canvas.addEventListener('mousemove', e => {
    const hit = particles.some(p => {
      const dx = e.clientX - p.x, dy = e.clientY - p.y;
      return Math.sqrt(dx * dx + dy * dy) < 30;
    });
    canvas.style.cursor = hit ? 'pointer' : 'default';
  });
});
