/* =========================================================
   BABY SHIBA INU — WEBSITE V2
   Main website interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });


        /* Close menu after clicking a link */

        const mobileLinks = navLinks.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.textContent = "☰";
            });

        });
    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
       ===================================================== */

    const navbar = document.querySelector(".navbar");

    const updateNavbar = () => {

        if (!navbar) return;

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const navItems = document.querySelectorAll(
        ".nav-links a[href^='#']"
    );

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const setActiveNavigation = () => {

        let currentSection = "home";

        const scrollPosition =
            window.scrollY + 140;

        sections.forEach(section => {

            const top = section.offsetTop;
            const height = section.offsetHeight;

            if (
                scrollPosition >= top &&
                scrollPosition < top + height
            ) {
                currentSection = section.id;
            }

        });

        navItems.forEach(link => {

            const href =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );

        });
    };

    setActiveNavigation();

    window.addEventListener(
        "scroll",
        setActiveNavigation,
        { passive: true }
    );


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    const allAnchorLinks =
        document.querySelectorAll("a[href^='#']");

    allAnchorLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".feature-card, " +
        ".game-card, " +
        ".roadmap-item, " +
        ".big-card, " +
        ".shibarium-content, " +
        ".shibarium-art, " +
        ".community-card"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -35px 0px"
                }
            );


        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       STAGGERED CARD ANIMATION
       ===================================================== */

    const animatedGroups = [
        ".feature-card",
        ".game-card",
        ".roadmap-item",
        ".community-card"
    ];

    animatedGroups.forEach(selector => {

        const elements =
            document.querySelectorAll(selector);

        elements.forEach((element, index) => {

            element.style.transitionDelay =
                `${Math.min(index * 70, 350)}ms`;

        });

    });


    /* =====================================================
       HERO PARALLAX
       ===================================================== */

    const heroArt =
        document.querySelector(".hero-art");

    const heroMessage =
        document.querySelector(".hero-message");

    const heroCoin =
        document.querySelector(".hero-coin");


    let ticking = false;

    const updateParallax = () => {

        if (
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        ) {
            return;
        }

        if (!heroArt) return;

        const scrollY = window.scrollY;

        if (scrollY > 650) {
            ticking = false;
            return;
        }

        const movement =
            Math.min(scrollY * 0.08, 35);

        heroArt.style.transform =
            `translateY(${movement}px)`;

        if (heroMessage) {

            heroMessage.style.transform =
                `translateY(${scrollY * -0.035}px) rotate(-6deg)`;
        }

        if (heroCoin) {

            heroCoin.style.transform =
                `translateY(${scrollY * -0.045}px)`;
        }

        ticking = false;
    };


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;
            }

        },
        { passive: true }
    );


    /* =====================================================
       GAME CARD INTERACTION
       ===================================================== */

    const gameCards =
        document.querySelectorAll(".game-card");

    gameCards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {
                card.style.zIndex = "5";
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {
                card.style.zIndex = "";
            }
        );

    });


    /* =====================================================
       BUTTON PRESS EFFECT
       ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn, " +
            ".nav-play, " +
            ".outline-button, " +
            ".gold-small-button"
        );

    buttons.forEach(button => {

        button.addEventListener(
            "pointerdown",
            () => {
                button.style.transform =
                    "translateY(1px) scale(0.98)";
            }
        );

        button.addEventListener(
            "pointerup",
            () => {
                button.style.transform = "";
            }
        );

        button.addEventListener(
            "pointercancel",
            () => {
                button.style.transform = "";
            }
        );

        button.addEventListener(
            "pointerleave",
            () => {
                button.style.transform = "";
            }
        );

    });


    /* =====================================================
       IMAGE ERROR HANDLING
       ===================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-not-found"
                );

            }
        );

    });


    /* =====================================================
       PREVENT EMPTY SOCIAL LINKS
       ===================================================== */

    const emptyLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );

    emptyLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

            }
        );

    });


    /* =====================================================
       RESIZE SAFETY
       ===================================================== */

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {

                if (
                    window.innerWidth > 820 &&
                    navLinks
                ) {
                    navLinks.classList.remove(
                        "open"
                    );

                    if (menuToggle) {

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        menuToggle.textContent = "☰";
                    }
                }

            }, 150);

        }
    );


    /* =====================================================
       PAGE READY
       ===================================================== */

    document.body.classList.add("page-ready");

    console.log(
        "🐕 Baby Shiba Inu website loaded successfully."
    );

});
