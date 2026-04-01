const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const demoTriggers = document.querySelectorAll(".js-demo-trigger");
const demoSection = document.querySelector("#demo-form");
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

if (demoSection && hubspotFormContainer) {
  const scrollToDemoSection = () => {
    const headerOffset = 96;
    const targetTop = demoSection.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth",
    });
  };

  const ensureHubspotForm = () => {
    if (hubspotFormLoaded || !window.hbspt?.forms?.create) {
      return false;
    }

    window.hbspt.forms.create({
      region: "eu1",
      formId: "9f4dad7c-15ca-4f42-bc0c-88ce9c1a9a01",
      portalId: "147949500",
      target: "#hubspot-form-container",
    });

    hubspotFormLoaded = true;
    return true;
  };

  const revealDemoSection = () => {
    demoSection.classList.remove("is-hidden");
    demoSection.setAttribute("aria-hidden", "false");
    window.requestAnimationFrame(() => {
      scrollToDemoSection();
    });

    const tryRenderVisibleForm = () => {
      if (ensureHubspotForm()) {
        window.setTimeout(scrollToDemoSection, 150);
        return;
      }

      window.setTimeout(tryRenderVisibleForm, 300);
    };

    window.setTimeout(tryRenderVisibleForm, 50);
  };

  demoTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      revealDemoSection();
      nav?.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
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
