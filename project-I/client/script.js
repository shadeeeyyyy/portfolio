document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById("main-content");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  setTimeout(() => {
    mainContent.classList.remove("hidden");
    mainContent.classList.add("visible");
  }, 100);

  // --- Mobile Menu ---
  let menuOpen = false;

  function toggleMobileMenu() {
    menuOpen = !menuOpen;
    if (menuOpen) {
      mobileMenu.classList.add("open");
      document.body.style.overflow = "hidden";
    } else {
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  // This function is called from onclick on mobile menu links in index.html
  window.closeMobileMenu = function () {
    menuOpen = false;
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  };

  mobileMenuButton.addEventListener("click", toggleMobileMenu);

  // Close mobile menu when a navigation link is clicked
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  // --- Reveal On Scroll Logic ---
  const revealableElements = document.querySelectorAll(".revealable");

  const observerOptions = {
    root: null, // viewport
    rootMargin: "0px",
    threshold: 0.1, // Trigger when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, observerOptions);

  revealableElements.forEach((el) => {
    observer.observe(el);
  });

  // Initial check for elements already in view on page load
  revealableElements.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add("is-visible");
      observer.unobserve(el); // Stop observing once revealed
    }
  });
});
