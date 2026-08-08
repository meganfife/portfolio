//JAVASCRIPT//


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



// Smooth scroll to section
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: "smooth" });
    }
}


// Lightbox functions
let galleryImages = [];
let currentIndex = 0;

/* Register all gallery images on page load */
document.addEventListener("DOMContentLoaded", () => {
    galleryImages = Array.from(document.querySelectorAll(".photo-item"));
	
});


/* Open lightbox */
function openLightbox(src, caption) {

    // Build galleryImages ONLY from the section containing the clicked image
    const clickedItem = event.currentTarget;
    const section = clickedItem.closest(".gallery-section");
    galleryImages = Array.from(section.querySelectorAll(".photo-item"));

    // Find index of clicked image
    currentIndex = galleryImages.findIndex(item => {
        const imgSrc = item.querySelector("img").src;
        return imgSrc.includes(src);
    });

    if (currentIndex === -1) currentIndex = 0;

    // Set image + caption
    document.getElementById("lightbox-img").src = src;
    document.getElementById("lightbox-caption").textContent = caption || "";

    // Show lightbox
    document.getElementById("lightbox").style.display = "flex";
}

/* Show next image */
function nextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;

    const nextItem = galleryImages[currentIndex];
    const img = nextItem.querySelector("img");

    document.getElementById("lightbox-img").src = img.src;
    document.getElementById("lightbox-caption").textContent =
        nextItem.querySelector(".caption-overlay").textContent;
}

/* Show previous image */
function prevImage() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;

    const prevItem = galleryImages[currentIndex];
    const img = prevItem.querySelector("img");

    document.getElementById("lightbox-img").src = img.src;
    document.getElementById("lightbox-caption").textContent =
        prevItem.querySelector(".caption-overlay").textContent;
}

/* Close lightbox */
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

/* Show image by index */
function showImage(index) {
    const item = galleryImages[index];
    const img = item.querySelector("img");
    const caption = item.querySelector(".caption-overlay").textContent;

    document.getElementById("lightbox-img").src = img.src;
    document.getElementById("lightbox-caption").textContent = caption;
}



// Fade-in on scroll
document.addEventListener("DOMContentLoaded", () => {
    const faders = document.querySelectorAll(".fade-in");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        faders.forEach(el => observer.observe(el));
    } else {
        // Fallback: just show them
        faders.forEach(el => el.classList.add("visible"));
    }
});
