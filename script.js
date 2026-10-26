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



// 3. Portfolio Feedback and Rating System
const feedbackSection = document.getElementById("feedbackSection");
const ratingStars = document.querySelectorAll(".rating-star");
const ratingInput = document.getElementById("ratingValue");
const feedbackForm = document.getElementById("feedbackForm");
const feedbackMessage = document.getElementById("feedbackMessage");
const feedbackList = document.getElementById("feedbackList");

let selectedRating = 0;

// Interactive star rating
ratingStars.forEach((star) => {
    star.addEventListener("mouseenter", () => {
        const rating = Number(star.dataset.rating);
        ratingStars.forEach((item) => {
            item.classList.toggle(
                "selected",
                Number(item.dataset.rating) <= rating
            );
        });
    });

    star.addEventListener("click", () => {
        selectedRating = Number(star.dataset.rating);

        if (ratingInput) {
            ratingInput.value = selectedRating;
        }

        ratingStars.forEach((item) => {
            item.classList.toggle(
                "selected",
                Number(item.dataset.rating) <= selectedRating
            );
            item.setAttribute(
                "aria-pressed",
                String(Number(item.dataset.rating) === selectedRating)
            );
        });
    });

    star.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            star.click();
        }
    });

    star.addEventListener("mouseleave", () => {
        ratingStars.forEach((item) => {
            item.classList.toggle(
                "selected",
                Number(item.dataset.rating) <= selectedRating
            );
        });
    });
});

// Submit feedback
if (feedbackForm) {
    feedbackForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameInput = document.getElementById("feedbackName");
        const commentInput = document.getElementById("feedbackComment");

        const name = nameInput.value.trim();
        const comment = commentInput.value.trim();

        if (selectedRating === 0) {
            feedbackMessage.textContent =
                "Please select a star rating before submitting.";
            feedbackMessage.className = "feedback-error";
            return;
        }

        if (!name || !comment) {
            feedbackMessage.textContent =
                "Please enter your name and feedback.";
            feedbackMessage.className = "feedback-error";
            return;
        }

        // Create feedback card safely
        const feedbackCard = document.createElement("article");
        feedbackCard.className = "feedback-card";

        const reviewer = document.createElement("h4");
        reviewer.textContent = name;

        const stars = document.createElement("p");
        stars.className = "feedback-stars";
        stars.textContent =
            "★".repeat(selectedRating) +
            "☆".repeat(5 - selectedRating);

        const review = document.createElement("p");
        review.textContent = comment;

        feedbackCard.append(reviewer, stars, review);

        if (feedbackList) {
            feedbackList.prepend(feedbackCard);
        }

        feedbackMessage.textContent =
            "Thank you for rating my portfolio!";
        feedbackMessage.className = "feedback-success";

        feedbackForm.reset();
        selectedRating = 0;

        if (ratingInput) {
            ratingInput.value = "";
        }

        ratingStars.forEach((star) => {
            star.classList.remove("selected");
            star.setAttribute("aria-pressed", "false");
        });
    });
}
