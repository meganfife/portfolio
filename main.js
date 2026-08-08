// JavaScript Document

// BURGER MENU TOGGLE
const burger = document.getElementById("burgerMenu");
const mobileNav = document.getElementById("mobileNav");
const navLinks = mobileNav.querySelectorAll("a");

// OPEN / CLOSE BURGER MENU
burger.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
  mobileNav.classList.remove("close"); // reset close state
});

// CLOSE MENU WHEN A LINK IS CLICKED
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    mobileNav.classList.add("close"); // slide out to the right
  });
});


//GLOBE SLOW DOWN
document.addEventListener("DOMContentLoaded", () => {
  const globeVideo = document.querySelector(".mini-globe video");
  if (globeVideo) {
    globeVideo.playbackRate = 0.8;  // 0.8 = half speed
  }
});



/* --------------------------------------------------
   SMOOTH SCROLL FOR BUTTONS
-------------------------------------------------- */
document.querySelectorAll(".scroll-down-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* --------------------------------------------------
   SIMPLE SCROLL ANIMATIONS
   (Fade-in sections as they enter view)
-------------------------------------------------- */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".section").forEach((section) => {
  observer.observe(section);
});

/* --------------------------------------------------
   GLOBE HOVER INTERACTION
   (Detect approximate regions on the 2D globe)
-------------------------------------------------- */
const globe = document.querySelector(".global-globe");
const popups = document.querySelectorAll(".global-popup");

// Approximate hover zones (percentage positions)
const hoverRegions = [
  { country: "japan", x: 68, y: 42, r: 10 },
  { country: "england", x: 42, y: 33, r: 10 },
  { country: "germany", x: 47, y: 38, r: 10 },
  { country: "us", x: 25, y: 42, r: 14 },
];

if (globe) {
  globe.addEventListener("mousemove", (e) => {
    const rect = globe.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    let activeCountry = null;

    hoverRegions.forEach((region) => {
      const dx = x - region.x;
      const dy = y - region.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < region.r) {
        activeCountry = region.country;
      }
    });

    popups.forEach((popup) => {
      if (popup.dataset.country === activeCountry) {
        popup.classList.add("active");
      } else {
        popup.classList.remove("active");
      }
    });
  });

  globe.addEventListener("mouseleave", () => {
    popups.forEach((popup) => popup.classList.remove("active"));
  });
}

/* --------------------------------------------------
   OPTIONAL: SCROLL SHRINK EFFECT FOR HERO GLOBE
-------------------------------------------------- */
const heroGlobe = document.querySelector(".hero-globe");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const maxShrink = 0.75; // 75% of original size
  const shrinkPoint = 300; // px

  if (heroGlobe) {
    const scale = Math.max(
      maxShrink,
      1 - scrollY / shrinkPoint
    );
    heroGlobe.style.transform = `scale(${scale})`;
  }
});
