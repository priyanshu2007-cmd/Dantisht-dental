/**
 * ================================================================
 * DANTISHT TREATMENTS — Complete Data + UI System
 * ================================================================
 * 22 Dental + 16 Aesthetic = 38 treatments
 * Data-driven: cards & modal rendered from JS object
 * ================================================================
 */

// ─── TREATMENT DATA ─────────────────────────────────────────────

const treatments = {

  // ══════════════════════════════════════════════════════════════
  // 🦷  DENTAL SOLUTIONS  (22)
  // ══════════════════════════════════════════════════════════════

  dental: [
    {
      id: 'digitalXray',
      name: 'Digital X-ray (RVG)',
      category: 'Dental',
      icon: 'fa-solid fa-x-ray',
      description: 'Digital X-rays (RVG) are an advanced diagnostic tool that provides instant, high-resolution images of teeth and surrounding structures with minimal radiation exposure. It allows early detection of cavities, infections, and bone issues, ensuring precise and effective treatment planning.',
      benefits: [
        'Instant and accurate diagnosis',
        'Low radiation exposure',
        'Detects hidden dental issues',
        'Improves treatment precision'
      ]
    },
    {
      id: 'advanceRCT',
      name: 'Advance RCT',
      category: 'Dental',
      icon: 'fa-solid fa-tooth',
      description: 'Advanced Root Canal Treatment is a modern procedure designed to remove infection from within the tooth while preserving its natural structure. Using precise techniques, it effectively relieves pain and restores normal tooth function.',
      benefits: [
        'Eliminates infection and pain',
        'Saves natural tooth',
        'Prevents further complications',
        'Long-lasting results'
      ]
    },
    {
      id: 'singleVisitRCT',
      name: 'Single Visit Root Canal Treatment',
      category: 'Dental',
      icon: 'fa-solid fa-bolt',
      description: 'This advanced root canal technique completes the entire procedure in a single visit using modern equipment and efficient protocols. It offers quick relief and maximum convenience without compromising quality.',
      benefits: [
        'Completed in one visit',
        'Immediate pain relief',
        'Time-saving solution',
        'Comfortable procedure'
      ]
    },
    {
      id: 'orthodontics',
      name: 'Orthodontic Treatment (Braces & Aligners)',
      category: 'Dental',
      icon: 'fa-solid fa-teeth',
      description: 'Orthodontic treatment corrects misaligned teeth and bite issues using braces or clear aligners. It improves both aesthetics and functionality, resulting in a properly aligned and confident smile.',
      benefits: [
        'Straightens teeth effectively',
        'Improves bite alignment',
        'Enhances facial aesthetics',
        'Supports long-term oral health'
      ]
    },
    {
      id: 'extraction',
      name: 'Surgical Extraction (Non-surgical & Surgical)',
      category: 'Dental',
      icon: 'fa-solid fa-hand-holding-medical',
      description: 'This procedure involves safe removal of damaged or impacted teeth using advanced techniques and anesthesia to ensure comfort and minimal trauma.',
      benefits: [
        'Pain-free experience',
        'Prevents infection spread',
        'Safe and controlled procedure',
        'Quick recovery'
      ]
    },
    {
      id: 'crown',
      name: 'Ceramic / Zirconia Crown',
      category: 'Dental',
      icon: 'fa-solid fa-crown',
      description: 'Ceramic and zirconia crowns are durable restorations that protect damaged teeth while maintaining a natural appearance. They restore strength, function, and aesthetics effectively.',
      benefits: [
        'Natural tooth-like appearance',
        'High durability',
        'Restores chewing function',
        'Protects weak teeth'
      ]
    },
    {
      id: 'veneers',
      name: 'Porcelain Veneers / Laminates',
      category: 'Dental',
      icon: 'fa-solid fa-gem',
      description: 'Veneers are thin shells bonded to the front of teeth to improve color, shape, and alignment, creating a flawless and aesthetically pleasing smile.',
      benefits: [
        'Enhances smile appearance',
        'Fixes discoloration and gaps',
        'Natural-looking results',
        'Long-lasting solution'
      ]
    },
    {
      id: 'periodontal',
      name: 'Mini Periodontal Surgery',
      category: 'Dental',
      icon: 'fa-solid fa-scissors',
      description: 'A minimally invasive procedure used to treat gum diseases and restore gum health while promoting faster healing and improved oral hygiene.',
      benefits: [
        'Treats gum infections',
        'Minimally invasive',
        'Faster healing',
        'Improves gum health'
      ]
    },
    {
      id: 'bridge',
      name: 'Fixed Crowns / Bridge',
      category: 'Dental',
      icon: 'fa-solid fa-bridge',
      description: 'Fixed crowns and bridges replace missing or damaged teeth, restoring both function and appearance with stable and durable restorations.',
      benefits: [
        'Restores missing teeth',
        'Improves chewing ability',
        'Natural appearance',
        'Long-lasting'
      ]
    },
    {
      id: 'fillings',
      name: 'Cosmetic Fillings',
      category: 'Dental',
      icon: 'fa-solid fa-fill-drip',
      description: 'Tooth-colored fillings repair cavities and minor damage while blending seamlessly with natural teeth, maintaining both strength and aesthetics.',
      benefits: [
        'Natural appearance',
        'Prevents further decay',
        'Restores tooth structure',
        'Durable solution'
      ]
    },
    {
      id: 'whitening',
      name: 'Advanced Tooth Whitening',
      category: 'Dental',
      icon: 'fa-solid fa-sun',
      description: 'A professional whitening procedure that removes stains and discoloration, resulting in a brighter and more radiant smile.',
      benefits: [
        'Instant visible results',
        'Safe and effective',
        'Enhances smile',
        'Boosts confidence'
      ]
    },
    {
      id: 'scaling',
      name: 'Air Polishing / Ultrasonic Scaling',
      category: 'Dental',
      icon: 'fa-solid fa-spray-can-sparkles',
      description: 'This cleaning procedure removes plaque, tartar, and stains using advanced technology to improve oral hygiene and gum health.',
      benefits: [
        'Deep cleaning',
        'Prevents gum disease',
        'Freshens breath',
        'Smooth tooth surface'
      ]
    },
    {
      id: 'implants',
      name: 'Implant',
      category: 'Dental',
      icon: 'fa-solid fa-screwdriver-wrench',
      description: 'Dental implants are a permanent solution for missing teeth, providing strong support for artificial teeth that look and function like natural ones.',
      benefits: [
        'Permanent tooth replacement',
        'Natural look and feel',
        'Improves chewing',
        'Prevents bone loss'
      ]
    },
    {
      id: 'dentures',
      name: 'Removable Dentures (Complete / Partial)',
      category: 'Dental',
      icon: 'fa-solid fa-teeth-open',
      description: 'Custom-made dentures replace missing teeth, restoring function, speech, and facial structure effectively.',
      benefits: [
        'Restores smile',
        'Improves speech',
        'Enhances appearance',
        'Comfortable fit'
      ]
    },
    {
      id: 'childrenTreatment',
      name: 'Painless Children Treatment',
      category: 'Dental',
      icon: 'fa-solid fa-child',
      description: 'Specialized dental care designed for children using gentle techniques to ensure comfort and a positive dental experience.',
      benefits: [
        'Child-friendly approach',
        'Reduces fear',
        'Prevents early issues',
        'Encourages healthy habits'
      ]
    },
    {
      id: 'cosmeticDentistry',
      name: 'Cosmetic Dentistry',
      category: 'Dental',
      icon: 'fa-solid fa-wand-magic-sparkles',
      description: 'A range of treatments aimed at improving the appearance of teeth and smile using modern cosmetic techniques.',
      benefits: [
        'Enhances smile aesthetics',
        'Boosts confidence',
        'Corrects imperfections',
        'Natural results'
      ]
    },
    {
      id: 'fracture',
      name: 'Fracture Treatment',
      category: 'Dental',
      icon: 'fa-solid fa-shield-halved',
      description: 'Treatment for broken or chipped teeth to restore strength, structure, and appearance using advanced restorative methods.',
      benefits: [
        'Restores tooth integrity',
        'Prevents further damage',
        'Improves function',
        'Enhances appearance'
      ]
    },
    {
      id: 'diastema',
      name: 'Diastema Treatment',
      category: 'Dental',
      icon: 'fa-solid fa-arrows-left-right',
      description: 'Focuses on closing gaps between teeth using cosmetic or orthodontic solutions for a more balanced smile.',
      benefits: [
        'Closes gaps effectively',
        'Improves symmetry',
        'Enhances smile',
        'Long-lasting results'
      ]
    },
    {
      id: 'impaction',
      name: 'Impaction Treatment',
      category: 'Dental',
      icon: 'fa-solid fa-circle-exclamation',
      description: 'Treatment for impacted teeth that fail to erupt properly, preventing pain, infection, and alignment issues.',
      benefits: [
        'Relieves pain',
        'Prevents infection',
        'Protects nearby teeth',
        'Improves oral health'
      ]
    },
    {
      id: 'fullMouth',
      name: 'Full Mouth Rehabilitation',
      category: 'Dental',
      icon: 'fa-solid fa-rotate',
      description: 'A comprehensive treatment that restores the entire mouth, improving function, comfort, and aesthetics through a combination of procedures.',
      benefits: [
        'Restores full oral function',
        'Improves appearance',
        'Enhances comfort',
        'Long-term solution'
      ]
    },
    {
      id: 'smileDesign',
      name: 'Smile Designing',
      category: 'Dental',
      icon: 'fa-solid fa-face-smile-beam',
      description: 'A customized cosmetic treatment that enhances the overall appearance of your smile using advanced dental techniques.',
      benefits: [
        'Improves smile aesthetics',
        'Boosts confidence',
        'Corrects multiple issues',
        'Natural results'
      ]
    },
    {
      id: 'gingivalDepigmentation',
      name: 'Gingival Depigmentation',
      category: 'Dental',
      icon: 'fa-solid fa-palette',
      description: 'A cosmetic procedure that removes dark pigmentation from gums, giving them a healthier and more uniform pink appearance.',
      benefits: [
        'Improves gum aesthetics',
        'Enhances smile',
        'Safe procedure',
        'Long-lasting results'
      ]
    }
  ],

  // ══════════════════════════════════════════════════════════════
  // ✨  AESTHETIC SOLUTIONS  (16)
  // ══════════════════════════════════════════════════════════════

  aesthetic: [
    {
      id: 'prp',
      name: 'PRP and PRF',
      category: 'Aesthetic',
      icon: 'fa-solid fa-vial',
      description: 'PRP and PRF treatments use your body\'s natural growth factors to rejuvenate skin and promote hair growth, improving overall texture and vitality.',
      benefits: [
        'Natural and safe',
        'Boosts collagen',
        'Improves skin quality',
        'Promotes hair growth'
      ]
    },
    {
      id: 'toothJewellery',
      name: 'Tooth Jewellery',
      category: 'Aesthetic',
      icon: 'fa-solid fa-diamond',
      description: 'A cosmetic enhancement where small decorative elements are placed on teeth to add a stylish and unique look to your smile.',
      benefits: [
        'Enhances smile aesthetics',
        'Non-invasive',
        'Quick procedure',
        'Customizable'
      ]
    },
    {
      id: 'naturalPeeling',
      name: 'Chemical & Natural Peeling',
      category: 'Aesthetic',
      icon: 'fa-solid fa-leaf',
      description: 'A skin treatment that removes dead cells and improves texture using chemical or natural agents, revealing brighter and smoother skin.',
      benefits: [
        'Improves skin texture',
        'Reduces pigmentation',
        'Brightens complexion',
        'Smoothens skin'
      ]
    },
    {
      id: 'acneTreatment',
      name: 'Acne Treatment',
      category: 'Aesthetic',
      icon: 'fa-solid fa-droplet',
      description: 'Targets the root causes of acne to reduce breakouts, inflammation, and scarring, promoting clear and healthy skin.',
      benefits: [
        'Reduces acne',
        'Controls oil',
        'Improves skin clarity',
        'Prevents future breakouts'
      ]
    },
    {
      id: 'mesotherapy',
      name: 'Mesotherapy',
      category: 'Aesthetic',
      icon: 'fa-solid fa-syringe',
      description: 'A technique that delivers essential nutrients into the skin to rejuvenate and improve hydration and glow.',
      benefits: [
        'Deep skin nourishment',
        'Improves hydration',
        'Enhances glow',
        'Reduces aging signs'
      ]
    },
    {
      id: 'microneedling',
      name: 'Microneedling',
      category: 'Aesthetic',
      icon: 'fa-solid fa-fingerprint',
      description: 'A skin rejuvenation procedure that stimulates collagen production by creating micro-injuries, improving texture and reducing scars.',
      benefits: [
        'Boosts collagen',
        'Reduces scars',
        'Improves texture',
        'Enhances skin firmness'
      ]
    },
    {
      id: 'bodyContouring',
      name: 'Body Contouring & Tightening',
      category: 'Aesthetic',
      icon: 'fa-solid fa-person',
      description: 'Non-invasive treatments that reshape the body and improve skin firmness by reducing fat and tightening tissues.',
      benefits: [
        'Improves body shape',
        'Tightens skin',
        'Non-invasive',
        'Boosts confidence'
      ]
    },
    {
      id: 'skinConditioning',
      name: 'Skin Conditioning',
      category: 'Aesthetic',
      icon: 'fa-solid fa-hand-sparkles',
      description: 'Improves overall skin health by enhancing hydration, texture, and resilience through targeted treatments.',
      benefits: [
        'Improves skin quality',
        'Hydrates deeply',
        'Smoothens texture',
        'Healthy glow'
      ]
    },
    {
      id: 'chemicalPeeling',
      name: 'Chemical Peeling',
      category: 'Aesthetic',
      icon: 'fa-solid fa-flask',
      description: 'Removes damaged outer skin layers to reveal fresh, smoother, and more even-toned skin.',
      benefits: [
        'Reduces pigmentation',
        'Improves texture',
        'Brightens skin',
        'Stimulates renewal'
      ]
    },
    {
      id: 'molesRemoval',
      name: 'Moles / Warts / Keloid / Tattoo Removal',
      category: 'Aesthetic',
      icon: 'fa-solid fa-eraser',
      description: 'Advanced procedures to safely remove unwanted skin growths and tattoos, improving skin appearance.',
      benefits: [
        'Safe removal',
        'Improves appearance',
        'Minimal scarring',
        'Quick recovery'
      ]
    },
    {
      id: 'microdermabrasion',
      name: 'Microdermabrasion',
      category: 'Aesthetic',
      icon: 'fa-solid fa-feather',
      description: 'A gentle exfoliation treatment that removes dead skin cells and promotes new skin growth.',
      benefits: [
        'Smoothens skin',
        'Improves texture',
        'Enhances glow',
        'Non-invasive'
      ]
    },
    {
      id: 'laserHairRemoval',
      name: 'Laser Hair Removal',
      category: 'Aesthetic',
      icon: 'fa-solid fa-bolt-lightning',
      description: 'Uses advanced laser technology to reduce unwanted hair by targeting hair follicles for long-term smooth skin.',
      benefits: [
        'Long-term hair reduction',
        'Smooth skin',
        'No cuts or irritation',
        'Time-saving'
      ]
    },
    {
      id: 'laserTreatments',
      name: 'All Types of Laser Treatments',
      category: 'Aesthetic',
      icon: 'fa-solid fa-wand-magic',
      description: 'A range of laser-based procedures used for skin rejuvenation, pigmentation, and hair removal with precision and safety.',
      benefits: [
        'Versatile treatment options',
        'Improves skin quality',
        'Safe and precise',
        'Effective results'
      ]
    },
    {
      id: 'permanentMakeup',
      name: 'Permanent Makeup',
      category: 'Aesthetic',
      icon: 'fa-solid fa-paintbrush',
      description: 'A cosmetic technique that enhances facial features by applying long-lasting pigments for brows, lips, or eyeliner.',
      benefits: [
        'Saves time daily',
        'Long-lasting results',
        'Enhances features',
        'Smudge-proof'
      ]
    },
    {
      id: 'hydrafacial',
      name: 'Hydrafacial',
      category: 'Aesthetic',
      icon: 'fa-solid fa-water',
      description: 'A multi-step facial treatment that deeply cleanses, exfoliates, extracts impurities, and hydrates the skin for an instant glow.',
      benefits: [
        'Deep cleansing',
        'Instant glow',
        'Improves hydration',
        'Refreshes skin'
      ]
    },
    {
      id: 'minorAesthetic',
      name: 'Minor Aesthetic Treatment',
      category: 'Aesthetic',
      icon: 'fa-solid fa-star',
      description: 'Includes small cosmetic procedures designed to enhance appearance safely with minimal downtime.',
      benefits: [
        'Quick results',
        'Minimal downtime',
        'Safe procedures',
        'Enhances appearance'
      ]
    }
  ]
};

// ─── MODAL COMPONENT ────────────────────────────────────────────

class TreatmentModal {
  constructor() {
    this.overlay = null;
    this.isOpen = false;
    this._currentName = '';
    this._create();
    this._bind();
  }

  _create() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'treatment-modal-overlay';
    this.overlay.innerHTML = `
      <div class="treatment-modal">
        <button class="modal-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
        <div class="modal-icon"><i></i></div>
        <div class="modal-body">
          <h2 class="modal-title"></h2>
          <span class="modal-category"></span>
          <p class="modal-desc"></p>
          <div class="modal-benefits">
            <h4><i class="fa-solid fa-check-circle"></i> Key Benefits</h4>
            <ul></ul>
          </div>
        </div>
        <div class="modal-actions">
          <button class="modal-btn modal-btn-primary" id="modal-book-btn">
            <i class="fa-brands fa-whatsapp"></i> Book Now
          </button>
          <a href="tel:+911244547139" class="modal-btn modal-btn-secondary">
            <i class="fa-solid fa-phone"></i> Call Us
          </a>
        </div>
        <div class="modal-booking-form" id="modal-booking-form">
          <h4 style="margin-bottom:.75rem;color:var(--primary)">📋 Quick Booking</h4>
          <div class="booking-field">
            <label for="booking-name">Your Name</label>
            <input type="text" id="booking-name" placeholder="Enter your name" maxlength="50" autocomplete="name">
          </div>
          <div class="booking-field">
            <label for="booking-age">Your Age</label>
            <input type="number" id="booking-age" placeholder="Enter your age" min="1" max="120">
          </div>
          <a id="booking-wa-link" class="modal-btn modal-btn-primary" target="_blank" href="#" style="margin-top:.5rem">
            <i class="fa-brands fa-whatsapp"></i> Send to WhatsApp
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(this.overlay);
  }

  _bind() {
    // Close button
    this.overlay.querySelector('.modal-close')
      .addEventListener('click', () => this.close());

    // Click outside to close
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });

    // Book button → show form
    this.overlay.querySelector('#modal-book-btn').addEventListener('click', () => {
      const form = this.overlay.querySelector('#modal-booking-form');
      form.style.display = 'block';
      form.querySelector('#booking-name').focus();
      this.overlay.querySelector('#modal-book-btn').style.display = 'none';
    });

    // Update WhatsApp link as user types
    const nameInput = this.overlay.querySelector('#booking-name');
    const ageInput = this.overlay.querySelector('#booking-age');
    const waLink = this.overlay.querySelector('#booking-wa-link');

    const updateLink = () => {
      const name = nameInput.value.trim() || 'Not provided';
      const age = ageInput.value.trim() || 'Not provided';
      const msg = `Hi Dantisht, I'm interested in ${this._currentName}.\nName: ${name}\nAge: ${age}`;
      waLink.href = `https://wa.me/917011463009?text=${encodeURIComponent(msg)}`;
    };

    nameInput.addEventListener('input', updateLink);
    ageInput.addEventListener('input', updateLink);
  }

  /** Find treatment by ID across both categories */
  _find(id) {
    return treatments.dental.find(t => t.id === id)
      || treatments.aesthetic.find(t => t.id === id);
  }

  /** Open modal for a treatment ID */
  open(id) {
    const t = this._find(id);
    if (!t) return;

    this._currentName = t.name;

    // Set icon
    const icon = this.overlay.querySelector('.modal-icon i');
    icon.className = t.icon;

    // Set title
    this.overlay.querySelector('.modal-title').textContent = t.name;

    // Set category badge
    const cat = this.overlay.querySelector('.modal-category');
    cat.textContent = t.category === 'Dental' ? '🦷 Dental Solution' : '✨ Aesthetic Solution';
    cat.className = `modal-category cat-${t.category.toLowerCase()}`;

    // Set description
    this.overlay.querySelector('.modal-desc').textContent = t.description;

    // Set benefits
    this.overlay.querySelector('.modal-benefits ul').innerHTML =
      t.benefits.map(b => `<li><i class="fa-solid fa-circle-check"></i> ${b}</li>`).join('');

    // Reset booking form
    const form = this.overlay.querySelector('#modal-booking-form');
    form.style.display = 'none';
    form.querySelector('#booking-name').value = '';
    form.querySelector('#booking-age').value = '';
    this.overlay.querySelector('#modal-book-btn').style.display = '';

    // Set default WhatsApp link
    const msg = `Hi Dantisht, I'm interested in ${t.name}.`;
    this.overlay.querySelector('#booking-wa-link').href =
      `https://wa.me/917011463009?text=${encodeURIComponent(msg)}`;

    // Show modal
    this.overlay.classList.add('active');
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.overlay.classList.remove('active');
    this.isOpen = false;
    document.body.style.overflow = '';
  }
}

// ─── CARD RENDERER ──────────────────────────────────────────────

/**
 * Render treatment cards into a container element
 * @param {Array} list - Array of treatment objects
 * @param {HTMLElement} container - DOM element to render into
 */
function renderCards(list, container) {
  container.innerHTML = list.map(t => `
    <div class="treatment-card" data-treatment="${t.id}" tabindex="0" role="button" aria-label="Learn more about ${t.name}">
      <span class="treatment-card-icon"><i class="${t.icon}"></i></span>
      <h4>${t.name}</h4>
      <p>${t.description.substring(0, 90)}…</p>
    </div>
  `).join('');
}

// ─── INIT ───────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const modal = new TreatmentModal();

  // Expose globally for particles.js integration
  window.TreatmentModal = modal;

  // Render dental cards — supports both ID formats
  const dentalGrid = document.getElementById('dental-grid') || document.getElementById('dental-cards');
  if (dentalGrid) renderCards(treatments.dental, dentalGrid);

  // Render aesthetic cards — supports both ID formats
  const aestheticGrid = document.getElementById('aesthetic-grid') || document.getElementById('aesthetic-cards');
  if (aestheticGrid) renderCards(treatments.aesthetic, aestheticGrid);

  // Global click delegation for all treatment cards
  document.addEventListener('click', (e) => {
    const card = e.target.closest('[data-treatment]');
    if (card) { e.preventDefault(); modal.open(card.dataset.treatment); }
  });

  // Keyboard accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const card = e.target.closest('[data-treatment]');
      if (card) modal.open(card.dataset.treatment);
    }
  });

  console.log(`✅ Treatments loaded: ${treatments.dental.length} dental + ${treatments.aesthetic.length} aesthetic = ${treatments.dental.length + treatments.aesthetic.length} total`);
});
