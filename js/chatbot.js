/**
 * ================================================================
 * DANTISHT AI CHATBOT — Google Gemini 2.0 Flash
 * ================================================================
 * ⚠️ SECURITY: Move API key to backend proxy for production
 * ================================================================
 */

// ─── CONFIG ─────────────────────────────────────────────────────
const CONFIG = {
  API_KEY: "AIzaSyAsBcaBA6OJ5Av4t_SxX09xBJIV8u1WRB0",
  MODEL: "gemini-2.5-flash-lite",
  MAX_HISTORY: 10,
  MAX_TOKENS: 300,
  TEMPERATURE: 0.7,
  TIMEOUT_MS: 30000,
  MAX_RETRIES: 1,
  COOLDOWN_MS: 4000,
};

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.MODEL}:generateContent?key=${CONFIG.API_KEY}`;

// ─── SYSTEM PROMPT ──────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Dantisht AI Assistant for Dantisht Dental Clinic, Gurgaon, India. Be warm, professional, and concise (2-4 sentences).

TREATMENTS: Digital X-ray, RCT, Single Visit Root Canal, Braces & Aligners, Extraction, Ceramic/Zirconia Crown, Veneers, Periodontal Surgery, Fixed Bridge, Cosmetic Fillings, Tooth Whitening, Scaling, Implant, Dentures, Children Treatment, Cosmetic Dentistry, Fracture Treatment, Diastema, Impaction, Full Mouth Rehab, Smile Designing, Gingival Depigmentation, Bloodless Treatment, NOX Sedation, PRP/PRF, Tooth Jewellery, Laser Hair Removal, Tattoo/Mole Removal, Laser Treatment, Permanent Makeup, Mesotherapy, Hydrafacial, Chemical Peeling.

DOCTOR: Dr. Supriya (BDS, MDS, PGDCC, FAD) — Member ISPPD, IDA, ABHAYA.
CONTACT: Phone +91 124-4547139 | WhatsApp 7011463009 | Email thedantisht@gmail.com
HOURS: Mon-Sat 10AM-8PM, Sun by appointment.

RULES: Never diagnose. For pricing say "WhatsApp us for a quote." End with: Want to book? Chat on WhatsApp 😊`;

// ─── STATE ──────────────────────────────────────────────────────
let history = [];
let isSending = false;
let lastSendTime = 0;

// ─── INIT ───────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  console.log("🦷 Dantisht Chatbot initializing...");

  const trigger = document.querySelector(".fab-bot");
  const win = document.querySelector(".chatbot-window");
  const closeBtn = document.querySelector(".close-chat");
  const clearBtn = document.querySelector(".clear-chat");
  const messages = document.querySelector(".chat-messages");
  const input = document.querySelector(".chat-input-area input");
  const sendBtn = document.querySelector(".chat-input-area button");
  const typing = document.querySelector(".typing-indicator");
  const chips = document.querySelector(".chat-chips");

  if (!trigger || !win) {
    console.warn("❌ Chatbot DOM not found");
    return;
  }

  // ─── EVENT LISTENERS ────────────────────────────────────────

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    win.classList.add("active");
    scrollDown();
    input.focus();
    console.log("✅ Chat window opened");
  });

  closeBtn.addEventListener("click", () => {
    win.classList.remove("active");
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Clear chat history?")) {
        history = [];
        const allMsgs = messages.querySelectorAll(".msg");
        allMsgs.forEach((m, i) => {
          if (i > 0) m.remove();
        });
        setChips(["Services", "Book Now", "Read Reviews", "Pricing"]);
        console.log("🗑️ History cleared");
      }
    });
  }

  chips.addEventListener("click", (e) => {
    if (e.target.classList.contains("chip")) {
      const text = e.target.textContent;
      if (text === "Read Reviews") {
        window.location.href = "reviews.html";
        return;
      }
      send(text);
    }
  });

  sendBtn.addEventListener("click", () => {
    const t = input.value.trim();
    if (t) {
      send(t);
      input.value = "";
    }
  });

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const t = input.value.trim();
      if (t) {
        send(t);
        input.value = "";
      }
    }
  });

  // ─── HELPERS ────────────────────────────────────────────────

  /** Scroll chat to bottom */
  function scrollDown() {
    setTimeout(() => {
      messages.scrollTo({ top: messages.scrollHeight, behavior: "smooth" });
    }, 100);
  }

  /** Add message bubble to chat */
  function addMsg(text, sender) {
    const div = document.createElement("div");
    div.className = `msg msg-${sender}`;

    const textEl = document.createElement("div");
    textEl.className = "msg-text";
    textEl.textContent = text;
    div.appendChild(textEl);

    const timeEl = document.createElement("span");
    timeEl.className = "msg-time";
    timeEl.textContent = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    div.appendChild(timeEl);

    messages.insertBefore(div, typing);
    scrollDown();
  }

  /** Set suggestion chips */
  function setChips(arr) {
    chips.innerHTML = arr.map((c) => `<div class="chip">${c}</div>`).join("");
  }

  /** Update chips based on response context */
  function updateChips(text) {
    const t = text.toLowerCase();
    if (t.includes("service") || t.includes("treatment"))
      setChips(["Root Canal", "Implants", "Smile Design", "WhatsApp"]);
    else if (t.includes("price") || t.includes("cost"))
      setChips(["Book Consultation", "WhatsApp Us", "Services"]);
    else if (t.includes("book") || t.includes("appointment"))
      setChips(["Services", "Location", "Pricing"]);
    else setChips(["Services", "Book Now", "Read Reviews", "Pricing"]);
  }

  // ─── SEND MESSAGE ───────────────────────────────────────────

  /**
   * Send a user message and get AI response
   * @param {string} text - User message
   */
  async function send(text) {
    if (isSending) return;

    // Cooldown check — prevent rapid-fire requests
    const elapsed = Date.now() - lastSendTime;
    if (elapsed < CONFIG.COOLDOWN_MS && lastSendTime > 0) {
      const wait = Math.ceil((CONFIG.COOLDOWN_MS - elapsed) / 1000);
      addMsg(
        `Please wait ${wait} second${
          wait > 1 ? "s" : ""
        } before sending another message.`,
        "bot",
      );
      return;
    }

    isSending = true;
    lastSendTime = Date.now();
    input.disabled = true;
    sendBtn.disabled = true;

    // Sanitize input
    const clean = text
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .substring(0, 500);

    // Add to UI
    addMsg(clean, "user");

    // Add to history
    history.push({ role: "user", parts: [{ text: clean }] });

    // Trim history to max limit
    while (history.length > CONFIG.MAX_HISTORY) {
      history.shift();
      console.log("📎 Trimmed old message from history");
    }

    // Show typing
    typing.style.display = "flex";
    scrollDown();

    console.log(`📤 Sending: "${clean}" (history: ${history.length} msgs)`);

    try {
      const reply = await callAPI();

      // Add bot response to history
      history.push({ role: "model", parts: [{ text: reply }] });

      // Hide typing, show response
      typing.style.display = "none";
      addMsg(reply, "bot");
      updateChips(reply);

      console.log(`✅ Response: "${reply.substring(0, 80)}..."`);
    } catch (err) {
      console.error("❌ Error:", err.message);
      typing.style.display = "none";

      // Show user-friendly error
      let errorMsg;
      if (err.message.includes("401"))
        errorMsg = "API key issue. Please contact the clinic directly.";
      else if (err.message.includes("429"))
        errorMsg = "Too many requests. Please wait a moment and try again.";
      else if (err.message.includes("400"))
        errorMsg = "Something went wrong. Please try a simpler question.";
      else errorMsg = "I'm having trouble connecting right now.";

      addMsg(`${errorMsg} Reach us on WhatsApp at +91 70114 63009 😊`, "bot");
      updateChips("error");
    }

    isSending = false;
    input.disabled = false;
    sendBtn.disabled = false;
    input.focus();
  }

  // ─── API CALL WITH RETRY ───────────────────────────────────

  /**
   * Call Gemini API with retry logic
   * @returns {Promise<string>} Bot response text
   */
  async function callAPI() {
    let lastErr;

    for (let attempt = 1; attempt <= CONFIG.MAX_RETRIES; attempt++) {
      try {
        console.log(`🔍 API attempt ${attempt}/${CONFIG.MAX_RETRIES}`);

        // Build request body — Gemini API format
        const requestBody = {
          contents: history,
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          generationConfig: {
            maxOutputTokens: CONFIG.MAX_TOKENS,
            temperature: CONFIG.TEMPERATURE,
          },
        };

        console.log(
          "📦 Request body:",
          JSON.stringify(requestBody).substring(0, 300) + "...",
        );

        // Timeout controller
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), CONFIG.TIMEOUT_MS);

        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify(requestBody),
        });

        clearTimeout(timer);

        console.log(`📥 Response status: ${res.status}`);

        // Handle errors
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          const errMsg = errData.error?.message || `HTTP ${res.status}`;
          console.error(`🔴 API Error ${res.status}:`, errMsg);

          // Don't retry auth, bad request, OR rate limit errors
          if (res.status === 401 || res.status === 400) {
            throw new Error(`${res.status}: ${errMsg}`);
          }

          // Rate limited — don't retry, just wait
          if (res.status === 429) {
            throw new Error(
              "429: Rate limited. Please wait 10-15 seconds and try again.",
            );
          }

          throw new Error(`${res.status}: ${errMsg}`);
        }

        // Parse response
        const data = await res.json();
        console.log(
          "📥 Response data:",
          JSON.stringify(data).substring(0, 300),
        );

        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) {
          console.warn(
            "⚠️ Empty response:",
            JSON.stringify(data).substring(0, 200),
          );
          throw new Error("Empty AI response");
        }

        return reply;
      } catch (err) {
        if (err.name === "AbortError") {
          console.warn("⏰ Request timed out");
          lastErr = new Error("Request timed out");
        } else {
          lastErr = err;
        }

        if (err.message.includes("401") || err.message.includes("400")) {
          throw err; // Don't retry these
        }

        if (attempt < CONFIG.MAX_RETRIES) {
          const wait = 1000 * Math.pow(2, attempt - 1);
          console.log(`⏳ Retrying in ${wait}ms...`);
          await new Promise((r) => setTimeout(r, wait));
        }
      }
    }

    throw lastErr || new Error("All retries failed");
  }

  // ─── READY ──────────────────────────────────────────────────
  setChips(["Services", "Book Now", "Pricing"]);
  console.log("✅ Chatbot ready! Max history:", CONFIG.MAX_HISTORY);
});
