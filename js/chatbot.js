// =============================================================
// GOOGLE GEMINI API KEY
const GEMINI_API_KEY = "AIzaSyAZHSxgvIHnqE4_3OxuGJ901j77IrFeooA";
// =============================================================

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are Dantisht AI Assistant, a warm and knowledgeable dental assistant for Dantisht Dental Clinic in Gurgaon India. Help users navigate the website and understand services. Answer dental questions in simple friendly language. Guide users to book via WhatsApp 7011463009. You can explain all of these dental treatments: Digital X-ray RVG, Advance RCT, Single Visit Root Canal Treatment, Orthodontic Treatment with Braces and Aligners, Surgical and Non-surgical Extraction, Ceramic and Zirconia Crown, Porcelain Veneers and Laminates, Mini Periodontal Surgery, Fixed Crowns and Bridge, Cosmetic Fillings, Advanced Tooth Whitening, Air Polishing and Ultrasonic Scaling, Implant, Removable Dentures Complete and Partial, Painless Children Treatment, Cosmetic Dentistry, Fracture Treatment, Diastema Treatment, Impaction Treatment, Full Mouth Rehabilitation, Smile Designing, Gingival Depigmentation, Bloodless Treatment, Treatment under NOX Conscious Sedation, PRP and PRF, Tooth Jewellery, Laser Hair Removal, Moles Warts Keloid Tattoo Removal, All kind Laser treatment, Permanent Makeup, Mesotherapy and Microneedling, Hydrafacial, Minor Aesthetic Treatment, Chemical Peeling. Clinic details: Doctor Dr. Supriya BDS MDS PGDCC FAD, Head Dentist and Aesthetic Expert, Member of ISPPD IDA ABHAYA. Phone plus 91 1244547139. WhatsApp 7011463009. Email thedantisht@gmail.com. Location Gurgaon India. Rules: Always be warm empathetic and professional. Never diagnose, always recommend an in-person visit. For pricing say please reach us on WhatsApp for a personalized quote. Respond in English by default and switch to Hindi if user writes in Hindi. Keep replies concise 2 to 4 sentences unless explaining a procedure. End every message with: Want to book a consultation? Chat with us on WhatsApp 😊`;

let conversationHistory = [];

document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.querySelector('.fab-bot');
  const win = document.querySelector('.chatbot-window');
  const closeBtn = document.querySelector('.close-chat');
  const messages = document.querySelector('.chat-messages');
  const input = document.querySelector('.chat-input-area input');
  const sendBtn = document.querySelector('.chat-input-area button');
  const typing = document.querySelector('.typing-indicator');
  const chips = document.querySelector('.chat-chips');

  if (!trigger || !win) return;

  trigger.addEventListener('click', e => {
    e.preventDefault();
    win.classList.add('active');
    messages.scrollTop = messages.scrollHeight;
  });

  closeBtn.addEventListener('click', () => win.classList.remove('active'));

  chips.addEventListener('click', e => {
    if (e.target.classList.contains('chip')) {
      sendMessage(e.target.textContent);
      chips.innerHTML = '';
    }
  });

  sendBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text) { sendMessage(text); input.value = ''; }
  });

  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      const text = input.value.trim();
      if (text) { sendMessage(text); input.value = ''; }
    }
  });

  function addMsg(text, sender) {
    const div = document.createElement('div');
    div.classList.add('msg', `msg-${sender}`);
    div.textContent = text;
    messages.insertBefore(div, typing);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() { typing.style.display = 'block'; messages.scrollTop = messages.scrollHeight; }
  function hideTyping() { typing.style.display = 'none'; }

  function updateChips(ctx) {
    const t = ctx.toLowerCase();
    let c;
    if (t.includes('service') || t.includes('treatment')) c = ['Root Canal', 'Implants', 'Smile Design'];
    else if (t.includes('price') || t.includes('cost')) c = ['Book Consultation', 'WhatsApp Us'];
    else if (t.includes('book') || t.includes('appointment')) c = ['Services', 'Location', 'Pricing'];
    else c = ['Services', 'Book Now', 'Pricing'];
    chips.innerHTML = c.map(x => `<div class="chip">${x}</div>`).join('');
  }

  // Build Gemini conversation format from history
  function buildGeminiContents() {
    const contents = [];
    for (const msg of conversationHistory) {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      });
    }
    return contents;
  }

  async function sendMessage(text) {
    addMsg(text, 'user');
    conversationHistory.push({ role: 'user', content: text });
    showTyping();

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: buildGeminiContents(),
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.7
          }
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `API ${res.status}`);
      }

      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that. Please try again.";

      conversationHistory.push({ role: 'assistant', content: reply });
      hideTyping();
      addMsg(reply, 'bot');
      updateChips(reply);
    } catch (err) {
      console.error('Chatbot error:', err);
      hideTyping();
      addMsg("I'm having connection issues. Please reach us on WhatsApp at +91 70114 63009 😊", 'bot');
      updateChips('error');
    }
  }
});
