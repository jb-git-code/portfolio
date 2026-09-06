const EMAILJS_CONFIG = {
  PUBLIC_KEY:  "YeG7t4833Jrc5M-UE",
  SERVICE_ID:  "service_57q4k8a",
  TEMPLATE_ID: "template_ng4kdzp",
};


const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");

window.addEventListener("scroll", () => {
  nav.classList.toggle("is-scrolled", window.scrollY > 8);
}, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("menu-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));


const terminalBody = document.getElementById("terminalBody");

const statLines = [
  { key: "role",     val: "Software Developer" },
  { key: "stack",    val: "Flutter · Node.js · MongoDB" },
  { key: "college",  val: "IIIT Bhagalpur, CSE '28" },
  { key: "dsa_solved", val: "600+" },
  { key: "codechef", val: "2\u2605" },
  { key: "lichess",  val: "1600" },
  { key: "status",   val: "open to opportunities" },
];

function typeTerminal() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    statLines.forEach(line => {
      const p = document.createElement("p");
      p.innerHTML = `<span class="out-key">${line.key}:</span> <span class="out-val">${line.val}</span>`;
      terminalBody.appendChild(p);
    });
    return;
  }

  let lineIndex = 0;

  function typeNextLine() {
    if (lineIndex >= statLines.length) {
      const cursorP = document.createElement("p");
      cursorP.innerHTML = `<span class="prompt">$</span><span class="cursor"></span>`;
      terminalBody.appendChild(cursorP);
      return;
    }

    const line = statLines[lineIndex];
    const p = document.createElement("p");
    const keySpan = document.createElement("span");
    keySpan.className = "out-key";
    const valSpan = document.createElement("span");
    valSpan.className = "out-val";

    p.appendChild(keySpan);
    p.appendChild(document.createTextNode(" "));
    p.appendChild(valSpan);
    terminalBody.appendChild(p);

    const fullKey = line.key + ":";
    let i = 0;
    const typeKey = setInterval(() => {
      keySpan.textContent = fullKey.slice(0, i + 1);
      i++;
      if (i >= fullKey.length) {
        clearInterval(typeKey);
        let j = 0;
        const typeVal = setInterval(() => {
          valSpan.textContent = line.val.slice(0, j + 1);
          j++;
          if (j >= line.val.length) {
            clearInterval(typeVal);
            lineIndex++;
            setTimeout(typeNextLine, 120);
          }
        }, 18);
      }
    }, 22);
  }

  setTimeout(typeNextLine, 400);
}

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      typeTerminal();
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

heroObserver.observe(document.getElementById("hero"));


const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const submitLabel = document.getElementById("submitLabel");
const formStatus = document.getElementById("formStatus");

const emailjsConfigured =
  window.emailjs &&
  EMAILJS_CONFIG.PUBLIC_KEY !== "YOUR_PUBLIC_KEY" &&
  EMAILJS_CONFIG.SERVICE_ID !== "YOUR_SERVICE_ID" &&
  EMAILJS_CONFIG.TEMPLATE_ID !== "YOUR_TEMPLATE_ID";

if (window.emailjs && emailjsConfigured) {
  emailjs.init({ publicKey: EMAILJS_CONFIG.PUBLIC_KEY });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formStatus.textContent = "";
  formStatus.className = "form-status";

  if (!emailjsConfigured) {
    // Fallback: EmailJS isn't set up yet — open the user's mail client instead.
    const name = form.from_name.value.trim();
    const email = form.reply_to.value.trim();
    const message = form.message.value.trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:projayanshu22@gmail.com?subject=${subject}&body=${body}`;
    formStatus.textContent = "EmailJS isn't configured yet — opening your email app instead. See README.md.";
    formStatus.classList.add("error");
    return;
  }

  submitBtn.disabled = true;
  submitLabel.textContent = "Sending…";

  emailjs.sendForm(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, form)
    .then(() => {
      formStatus.textContent = "Message sent — thanks! I'll get back to you soon.";
      formStatus.classList.add("success");
      form.reset();
    })
    .catch((err) => {
      console.error("EmailJS error:", err);
      formStatus.textContent = "Something went wrong sending that. Try emailing me directly instead.";
      formStatus.classList.add("error");
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitLabel.textContent = "Send message";
    });
});

document.getElementById("year").textContent = new Date().getFullYear();
