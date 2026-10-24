/**
 * Yuvan T - Portfolio Scripts
 * Handles mobile navigation, scroll spy, and interactive UI states
 */
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("main section[id]");

    // 1. Mobile Menu Toggle
    if (menuToggle && navLinks) {
        function toggleMenu(forceClose = false) {
            const shouldOpen = forceClose ? false : !navLinks.classList.contains("open");
            
            navLinks.classList.toggle("open", shouldOpen);
            menuToggle.classList.toggle("active", shouldOpen);
            menuToggle.setAttribute("aria-expanded", String(shouldOpen));
        }

        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close when clicking nav link
        navItems.forEach((link) => {
            link.addEventListener("click", () => {
                toggleMenu(true);
            });
        });

        // Close when clicking outside of navbar
        document.addEventListener("click", (e) => {
            if (navLinks.classList.contains("open") && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                toggleMenu(true);
            }
        });

        // Close on Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && navLinks.classList.contains("open")) {
                toggleMenu(true);
                menuToggle.focus();
            }
        });

        // Close if resized to desktop breakpoint
        window.addEventListener("resize", () => {
            if (window.innerWidth > 768 && navLinks.classList.contains("open")) {
                toggleMenu(true);
            }
        });
    }

    // 2. Scroll Spy (Active Nav Link Indicator)
    let isTicking = false;

    function updateActiveNavLink() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        let currentSectionId = "home";

        // Check if reached bottom of page
        if (scrollPosition + windowHeight >= documentHeight - 60) {
            currentSectionId = "contact";
        } else {
            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 120;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSectionId = section.getAttribute("id");
                }
            });
        }

        // Apply active class to matching nav anchor
        navItems.forEach((link) => {
            const href = link.getAttribute("href");
            const isMatch = href === `#${currentSectionId}`;
            link.classList.toggle("active", isMatch);
        });

        isTicking = false;
    }

    window.addEventListener("scroll", () => {
        if (!isTicking) {
            window.requestAnimationFrame(updateActiveNavLink);
            isTicking = true;
        }
    }, { passive: true });

    // Initial check on load
    updateActiveNavLink();
});
