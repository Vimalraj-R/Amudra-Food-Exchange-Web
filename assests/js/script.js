// script.js - Handles UI interactions, animations, and page transitions

// ========== MOBILE MENU TOGGLE ==========
const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuBtn.classList.toggle("open");
    });
}

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (event) {
        event.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// ========== ANIMATIONS ON SCROLL ==========
const animatedElements = document.querySelectorAll(".animate");

function animateOnScroll() {
    let scrollPos = window.scrollY + window.innerHeight;
    animatedElements.forEach(element => {
        if (element.getBoundingClientRect().top + window.scrollY < scrollPos) {
            element.classList.add("visible");
        }
    });
}

// Initial check
animateOnScroll();

// Scroll event listener
window.addEventListener("scroll", animateOnScroll);

// ========== BACK TO TOP BUTTON ==========
const backToTop = document.getElementById("back-to-top");

if (backToTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// ========== DARK MODE TOGGLE ==========
const darkModeToggle = document.getElementById("dark-mode-toggle");

if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });

    // Load theme from storage
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
}

// ========== FORM VALIDATION ==========
const form = document.querySelector(".contact-form");

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let message = document.getElementById("message").value.trim();
        let errorMsg = document.getElementById("error-msg");

        if (!name || !email || !message) {
            errorMsg.innerText = "⚠️ Please fill out all fields.";
            errorMsg.style.color = "red";
            return;
        }

        // Simulate form submission
        errorMsg.innerText = "✅ Message Sent Successfully!";
        errorMsg.style.color = "green";
        form.reset();
    });
}

// ========== LOADING SCREEN ==========
document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        }, 1500);
    }
});

// ========== TESTIMONIAL SLIDER ==========
const slides = document.querySelectorAll(".testimonial-slide");
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Initial display
if (slides.length > 0) {
    showSlide(currentSlide);
    setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
}

// ========== LIVE CLOCK ==========
function updateClock() {
    let clock = document.getElementById("live-clock");
    if (clock) {
        let now = new Date();
        clock.innerText = now.toLocaleTimeString();
        setTimeout(updateClock, 1000);
    }
}

// Start clock
updateClock();
