const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const demoTriggers = document.querySelectorAll(".js-demo-trigger");
const demoSection = document.querySelector("#demo-form");

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

if (demoSection) {
  const scrollToDemoSection = () => {
    const headerOffset = 96;
    const targetTop = demoSection.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth",
    });
  };

  const revealDemoSection = () => {
    demoSection.classList.remove("is-hidden");
    demoSection.setAttribute("aria-hidden", "false");
    window.requestAnimationFrame(() => {
      scrollToDemoSection();
    });
    window.setTimeout(scrollToDemoSection, 250);
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
