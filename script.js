const header = document.querySelector(".header");
const navMenu = document.querySelector(".nav-menu");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelectorAll(".nav-link");
const backToTopBtn = document.querySelector(".back-to-top");
const revealItems = document.querySelectorAll(".reveal");
const parallaxItems = document.querySelectorAll("[data-parallax-speed]");
const heroSlides = document.querySelectorAll(".hero-slide");
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");
const testimonialItems = document.querySelectorAll(".testimonial-item");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const contactForm = document.getElementById("contactForm");
const appointmentForm = document.getElementById("appointmentForm");

let currentTestimonialIndex = 0;
let testimonialTimer;

document.addEventListener("DOMContentLoaded", () => {
    initHeaderState();
    initMobileMenu();
    initRevealAnimations();
    initScrollParallax();
    initHeroStack();
    initSmoothScroll();
    initActiveNav();
    initBackToTop();
    initGalleryFilter();
    initTestimonials();
    initForms();
    setMinAppointmentDate();
});

function initHeaderState() {
    const onScroll = () => {
        header?.classList.toggle("scrolled", window.scrollY > 30);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
}

function initMobileMenu() {
    if (!mobileMenuToggle || !navMenu) return;

    mobileMenuToggle.addEventListener("click", () => {
        mobileMenuToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenuToggle.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
}

function initRevealAnimations() {
    if (!("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const targetId = anchor.getAttribute("href");
            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            const headerOffset = header ? header.offsetHeight - 10 : 0;
            const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
            window.scrollTo({ top, behavior: "smooth" });
        });
    });
}

function initActiveNav() {
    const sections = [...document.querySelectorAll("main section[id]")];
    if (!sections.length) return;

    const setActive = () => {
        const current = sections.findLast((section) => {
            const top = section.offsetTop - (header?.offsetHeight || 0) - 80;
            return window.scrollY >= top;
        });

        navLinks.forEach((link) => {
            const isActive = current && link.getAttribute("href") === `#${current.id}`;
            link.classList.toggle("active", Boolean(isActive));
        });
    };

    setActive();
    window.addEventListener("scroll", setActive, { passive: true });
}

function initBackToTop() {
    if (!backToTopBtn) return;

    const onScroll = () => {
        backToTopBtn.classList.toggle("show", window.scrollY > 500);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function initGalleryFilter() {
    if (!filterButtons.length || !galleryItems.length) return;

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            filterButtons.forEach((btn) => btn.classList.toggle("active", btn === button));

            galleryItems.forEach((item) => {
                const show = filter === "all" || item.dataset.category === filter;
                item.classList.toggle("is-hidden", !show);
            });
        });
    });
}

function initTestimonials() {
    if (!testimonialItems.length || !prevBtn || !nextBtn) return;

    const showTestimonial = (index) => {
        testimonialItems.forEach((item, itemIndex) => {
            item.classList.toggle("active", itemIndex === index);
        });
    };

    const next = () => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialItems.length;
        showTestimonial(currentTestimonialIndex);
    };

    const prev = () => {
        currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialItems.length) % testimonialItems.length;
        showTestimonial(currentTestimonialIndex);
    };

    const restartTimer = () => {
        window.clearInterval(testimonialTimer);
        testimonialTimer = window.setInterval(next, 5500);
    };

    prevBtn.addEventListener("click", () => {
        prev();
        restartTimer();
    });

    nextBtn.addEventListener("click", () => {
        next();
        restartTimer();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            prev();
            restartTimer();
        }
        if (event.key === "ArrowRight") {
            next();
            restartTimer();
        }
    });

    showTestimonial(currentTestimonialIndex);
    restartTimer();
}

function initForms() {
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = Object.fromEntries(new FormData(contactForm).entries());
            const errors = [];

            if (!formData.name || formData.name.trim().length < 2) {
                errors.push("Ad soyad en az 2 karakter olmalı.");
            }
            if (!isValidEmail(formData.email)) {
                errors.push("Geçerli bir e-posta adresi girin.");
            }
            if (!formData.service) {
                errors.push("Bir hizmet seçin.");
            }
            if (!formData.message || formData.message.trim().length < 10) {
                errors.push("Mesaj en az 10 karakter olmalı.");
            }

            handleFormFeedback(contactForm, errors, "Mesajınız alındı. En kısa sürede size dönüş yapacağız.");
        });
    }

    if (appointmentForm) {
        appointmentForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = Object.fromEntries(new FormData(appointmentForm).entries());
            const errors = [];

            if (!formData["app-name"] || formData["app-name"].trim().length < 2) {
                errors.push("Ad soyad bilgisini kontrol edin.");
            }
            if (!isValidPhone(formData["app-phone"])) {
                errors.push("Geçerli bir telefon numarası girin.");
            }
            if (!formData["app-date"]) {
                errors.push("Bir tarih seçin.");
            }
            if (!formData["app-time"]) {
                errors.push("Bir saat seçin.");
            }
            if (!formData["app-service"]) {
                errors.push("Bir paket seçin.");
            }

            handleFormFeedback(appointmentForm, errors, "Randevu talebiniz oluşturuldu. Müsaitlik teyidi için sizinle iletişime geçeceğiz.");
        });
    }
}

function initScrollParallax() {
    if (!parallaxItems.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const updateParallax = () => {
        if (window.innerWidth <= 880) {
            parallaxItems.forEach((item) => {
                item.style.transform = "";
            });
            return;
        }

        const viewportHeight = window.innerHeight;

        parallaxItems.forEach((item) => {
            const speed = Number(item.dataset.parallaxSpeed || 0.1);
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.top + rect.height / 2;
            const distanceFromCenter = itemCenter - viewportHeight / 2;
            const offset = distanceFromCenter * -speed * 0.18;
            item.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
        });
    };

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax);
}

function initHeroStack() {
    if (heroSlides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let activeIndex = 0;
    const swapSlide = () => {
        heroSlides[activeIndex].classList.remove("active");
        activeIndex = (activeIndex + 1) % heroSlides.length;
        heroSlides[activeIndex].classList.add("active");
    };

    window.setInterval(swapSlide, 4200);
}

function handleFormFeedback(form, errors, successMessage) {
    removeFeedback(form);

    const feedback = document.createElement("div");
    feedback.className = `form-feedback ${errors.length ? "error" : "success"}`;
    feedback.textContent = errors.length ? errors[0] : successMessage;
    form.prepend(feedback);

    if (!errors.length) {
        form.reset();
        setMinAppointmentDate();
    }
}

function removeFeedback(form) {
    const existing = form.querySelector(".form-feedback");
    if (existing) existing.remove();
}

function setMinAppointmentDate() {
    const dateInput = document.getElementById("app-date");
    if (!dateInput) return;

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    dateInput.min = `${yyyy}-${mm}-${dd}`;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
}

function isValidPhone(phone) {
    return /^\+?[\d\s()-]{10,}$/.test(phone || "");
}
