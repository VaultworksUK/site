const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const demoTriggers = document.querySelectorAll(".js-demo-trigger");
const demoModal = document.querySelector(".modal-overlay");
const modalClose = document.querySelector(".modal-close");
const hubspotFormContainer = document.querySelector("#hubspot-form-container");
let hubspotFormLoaded = false;

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

if (demoModal && modalClose) {
  const ensureHubspotForm = () => {
    if (!hubspotFormContainer || hubspotFormLoaded || !window.hbspt?.forms?.create) {
      return;
    }

    window.hbspt.forms.create({
      region: "eu1",
      formId: "9f4dad7c-15ca-4f42-bc0c-88ce9c1a9a01",
      portalId: "147949500",
      target: "#hubspot-form-container",
    });

    hubspotFormLoaded = true;
  };

  const closeModal = () => {
    demoModal.classList.remove("is-open");
    demoModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  const openModal = () => {
    ensureHubspotForm();
    demoModal.classList.add("is-open");
    demoModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  demoTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    });
  });

  modalClose.addEventListener("click", closeModal);

  demoModal.addEventListener("click", (event) => {
    if (event.target === demoModal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && demoModal.classList.contains("is-open")) {
      closeModal();
    }
  });

  window.addEventListener("load", () => {
    if (window.hbspt?.forms?.create) {
      ensureHubspotForm();
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
