const projectData = {
  signlingo: {
    num: "01",
    title: "SignLingo",
    role: "AI Developer - Feb-Jun 2025",
    chips: ["CNN-LSTM", "TensorFlow", "MediaPipe", "Real-time", "Web Platform"],
    metrics: [
      { val: "95.3%", key: "Accuracy" },
      { val: "26", key: "Gestures" },
      { val: "<50ms", key: "Latency" },
      { val: "Browser", key: "Deployment" }
    ],
    sections: [
      {
        heading: "Overview",
        content: "SignLingo is an AI-powered sign language learning application built to support BISINDO practice with live browser-based feedback. It focuses on making sign language practice more accessible and responsive without depending on a server for every prediction."
      },
      {
        heading: "Technical Approach",
        content: "The model combines <strong>CNN</strong> feature extraction with <strong>LSTM</strong> sequence learning so it can understand both pose and motion. MediaPipe landmarks were normalized and grouped into fixed-length frame windows before being sent to the model for classification."
      },
      {
        heading: "Results & Performance",
        content: "The final model reached <strong>95.3% accuracy</strong> across 26 BISINDO gestures. Deployment through TensorFlow.js kept inference under <strong>50ms</strong>, which made the browser experience feel immediate during practice."
      },
      {
        heading: "What I Learned",
        content: "The hardest part was balancing model quality against browser performance. This project pushed me to think more carefully about model size, inference speed, and how to make an ML feature feel polished in a real user experience."
      }
    ]
  },
  firedetect: {
    num: "02",
    title: "Early Forest Fire Detection",
    role: "Lead Developer - Feb-Jun 2025",
    chips: ["YOLOv8", "Edge AI", "Raspberry Pi", "OpenCV", "Python"],
    metrics: [
      { val: "93.2%", key: "mAP@0.5" },
      { val: "43 FPS", key: "Throughput" },
      { val: "23ms", key: "Per Frame" },
      { val: "Edge", key: "Deployment" }
    ],
    sections: [
      {
        heading: "Overview",
        content: "This project focuses on early fire detection in forest environments where delayed response can be costly. The goal was to build a model that stayed accurate while still being realistic to deploy on lower-powered hardware."
      },
      {
        heading: "Technical Approach",
        content: "I used a fine-tuned <strong>YOLOv8n</strong> model and trained it on a dataset that included smoke, flame, and difficult forest scenes. The deployment path included ONNX export and hardware-conscious optimization for edge use cases."
      },
      {
        heading: "Results & Performance",
        content: "The detector reached <strong>93.2% mAP@0.5</strong> and ran at roughly <strong>43 FPS</strong> on a GPU setup. The edge version was slower but still practical for monitoring scenarios where consistent updates matter more than cinematic frame rates."
      },
      {
        heading: "What I Learned",
        content: "This build strengthened my understanding of the full edge AI workflow: data curation, model training, optimization, and deployment tradeoffs. It also highlighted how important imbalance handling is for safety-related detection tasks."
      }
    ]
  },
  nlpmod: {
    num: "03",
    title: "NLP Moderation Engine",
    role: "NLP Developer - Sept 2025-Feb 2026",
    chips: ["DistilBERT", "Flask", "NLTK", "TensorFlow", "REST API"],
    metrics: [
      { val: "92%", key: "Accuracy" },
      { val: "0.97", key: "AUC-ROC" },
      { val: "<80ms", key: "API Response" },
      { val: "6", key: "Categories" }
    ],
    sections: [
      {
        heading: "Overview",
        content: "The NLP Moderation Engine is a text moderation pipeline designed to flag harmful or toxic content in real time. It was built as a practical API service rather than just a model notebook, so the focus included serving, response time, and integration readiness."
      },
      {
        heading: "Technical Approach",
        content: "The pipeline uses preprocessing with <strong>Python and NLTK</strong> before classification with a fine-tuned <strong>DistilBERT</strong> model. Flask wraps the model in a clean API so moderation logic can be plugged into web products more easily."
      },
      {
        heading: "Results & Performance",
        content: "The model achieved <strong>92% accuracy</strong> with an <strong>AUC-ROC of 0.97</strong>. The API kept average response time under <strong>80ms</strong>, which makes it suitable for moderation flows that need to feel instant to users."
      },
      {
        heading: "What I Learned",
        content: "This project taught me a lot about turning transformer models into usable systems. The main lessons came from handling class imbalance, tuning for inference speed, and making the API flexible enough for product teams to work with."
      }
    ]
  }
};

const nav = document.getElementById("nav");
const progressBar = document.getElementById("scrollProgress");
const backToTopButton = document.getElementById("backToTop");
const menuButton = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const pageSections = [...document.querySelectorAll("section")];
const navItems = [...document.querySelectorAll(".nav-links a")];

const modalBackdrop = document.getElementById("modalBackdrop");
const modal = document.getElementById("modal");
const modalCloseButton = document.getElementById("modalClose");
const modalNum = document.getElementById("modalNum");
const modalTitle = document.getElementById("modalTitle");
const modalRole = document.getElementById("modalRole");
const modalChips = document.getElementById("modalChips");
const modalBody = document.getElementById("modalBody");

function updateScrollProgress() {
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const currentScroll = window.scrollY;
  const progress = documentHeight > 0 ? (currentScroll / documentHeight) * 100 : 0;

  nav.classList.toggle("scrolled", currentScroll > 50);
  backToTopButton.classList.toggle("visible", currentScroll > 400);
  progressBar.style.width = `${progress}%`;
}

function updateActiveNavLink() {
  let currentSectionId = "";

  pageSections.forEach((section) => {
    const triggerPoint = section.offsetTop - section.clientHeight / 3;

    if (window.scrollY >= triggerPoint) {
      currentSectionId = section.id;
    }
  });

  navItems.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentSectionId}`;
    link.classList.toggle("nav-active", isActive);
  });
}

function setupMenu() {
  menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuButton.classList.toggle("active");
  });

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.classList.remove("active");
    });
  });
}

function setupBackToTop() {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function setupPhotoFallback() {
  const photo = document.querySelector(".photo-img");

  if (!photo) return;

  const hideBrokenImage = () => {
    photo.style.display = "none";
  };

  if (!photo.getAttribute("src") || photo.getAttribute("src") === "your-photo.jpg") {
    hideBrokenImage();
    return;
  }

  if (photo.complete && photo.naturalWidth === 0) {
    hideBrokenImage();
    return;
  }

  photo.addEventListener("error", hideBrokenImage);
}

function setupFadeIn() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const siblings = [...entry.target.parentNode.children];
      const delay = siblings.indexOf(entry.target) * 80;

      entry.target.style.transitionDelay = `${delay}ms`;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in").forEach((element) => observer.observe(element));
}

function animateCount(element) {
  const target = Number.parseFloat(element.dataset.val);
  const output = element.querySelector(".count-num");
  const usesDecimal = String(target).includes(".");
  const step = target / 45;
  let current = 0;

  const timer = window.setInterval(() => {
    current = Math.min(current + step, target);
    output.textContent = usesDecimal ? current.toFixed(1) : Math.round(current);

    if (current >= target) {
      window.clearInterval(timer);
    }
  }, 28);
}

function setupCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      animateCount(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll(".stat-val[data-val], .f-metric-val[data-val]").forEach((element) => observer.observe(element));
}

function setupEducationBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.querySelectorAll(".edu-progress-fill").forEach((bar, index) => {
        bar.style.transitionDelay = `${index * 150 + 300}ms`;
        bar.classList.add("animate");
      });

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".edu-cards-grid").forEach((grid) => observer.observe(grid));
}

function renderMetricCards(metrics) {
  return `
    <div class="modal-metrics">
      ${metrics.map((metric) => `
        <div class="modal-metric">
          <span class="modal-metric-val mono">${metric.val}</span>
          <span class="modal-metric-key">${metric.key}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function renderSections(sections) {
  return sections.map((section) => `
    <div class="modal-section">
      <h4 class="modal-section-heading mono">${section.heading}</h4>
      <p class="modal-section-text">${section.content}</p>
    </div>
  `).join("");
}

function openProjectModal(projectKey) {
  const project = projectData[projectKey];

  if (!project) return;

  modalNum.textContent = project.num;
  modalTitle.textContent = project.title;
  modalRole.textContent = project.role;
  modalChips.innerHTML = project.chips
    .map((chip) => `<span class="chip mono">${chip}</span>`)
    .join("");
  modalBody.innerHTML = renderMetricCards(project.metrics) + renderSections(project.sections);

  modalBackdrop.classList.add("open");
  document.body.style.overflow = "hidden";

  window.setTimeout(() => {
    modal.classList.add("open");
  }, 10);
}

function closeProjectModal() {
  modal.classList.remove("open");

  window.setTimeout(() => {
    modalBackdrop.classList.remove("open");
    document.body.style.overflow = "";
  }, 300);
}

function setupProjectModal() {
  document.querySelectorAll(".project-details-btn").forEach((button) => {
    button.addEventListener("click", () => {
      openProjectModal(button.dataset.project);
    });
  });

  modalCloseButton.addEventListener("click", closeProjectModal);

  modalBackdrop.addEventListener("click", (event) => {
    if (event.target === modalBackdrop) {
      closeProjectModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProjectModal();
    }
  });
}

function handleScroll() {
  updateScrollProgress();
  updateActiveNavLink();
}

setupMenu();
setupBackToTop();
setupPhotoFallback();
setupFadeIn();
setupCounters();
setupEducationBars();
setupProjectModal();

handleScroll();
window.addEventListener("scroll", handleScroll);