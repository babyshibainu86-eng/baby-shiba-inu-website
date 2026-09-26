/* =========================================================
   BABY SHIBA INU — WEBSITE V2
   Main JavaScript
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
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {
        if (!navbar) return;

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const navLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    const sections = document.querySelectorAll("section[id]");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const target =
                link.getAttribute("href");

            if (
                target === `#${currentSection}`
            ) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                event.preventDefault();
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                navbarHeight -
                10;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".feature-card, .game-card, .big-card, " +
        ".roadmap-item, .community-card, " +
        ".section-heading"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal-element");
    });


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "reveal-visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );
                    }
                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       MINING CARD
    ===================================================== */

    const miningCard =
        document.querySelector(".mining-card");

    if (miningCard) {

        miningCard.style.cursor = "pointer";

        miningCard.addEventListener(
            "click",
            () => {

                showMessage(
                    "⛏️ Baby Shiba Mining is coming soon."
                );

            }
        );
    }


    /* =====================================================
       NFT BUTTON
    ===================================================== */

    const nftButtons =
        document.querySelectorAll(
            ".nft-card .outline-button"
        );

    nftButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showMessage(
                    "🖼️ Baby Shiba Inu NFT Collection is coming soon."
                );
            }
        );
    });


    /* =====================================================
       PLACEHOLDER SOCIAL LINKS
    ===================================================== */

    const placeholderLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );

    placeholderLinks.forEach(link => {

        if (
            link.classList.contains("nav-play")
        ) {
            return;
        }

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showMessage(
                    "🚀 Official Baby Shiba Inu community link coming soon."
                );
            }
        );
    });


    /* =====================================================
       MESSAGE SYSTEM
    ===================================================== */

    function showMessage(message) {

        let messageBox =
            document.querySelector(
                ".site-message"
            );

        if (!messageBox) {

            messageBox =
                document.createElement("div");

            messageBox.className =
                "site-message";

            document.body.appendChild(
                messageBox
            );
        }

        messageBox.textContent =
            message;

        messageBox.classList.add(
            "show"
        );

        clearTimeout(
            messageBox.hideTimer
        );

        messageBox.hideTimer =
            setTimeout(() => {

                messageBox.classList.remove(
                    "show"
                );

            }, 3000);
    }


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );

    if (heroVisual) {

        window.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 800
                ) {
                    return;
                }

                const x =
                    (window.innerWidth / 2 -
                    event.clientX) / 80;

                const y =
                    (window.innerHeight / 2 -
                    event.clientY) / 100;

                heroVisual.style.transform =
                    `translate(${x}px, ${y}px)`;
            }
        );
    }


    /* =====================================================
       GAME CARDS HOVER EFFECT
    ===================================================== */

    const gameCards =
        document.querySelectorAll(
            ".game-card"
        );

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
       TOKENOMICS COUNTER ANIMATION
    ===================================================== */

    const tokenNumbers =
        document.querySelectorAll(
            ".token-box strong"
        );

    const numberObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }

                    entry.target.classList.add(
                        "number-visible"
                    );

                    numberObserver.unobserve(
                        entry.target
                    );
                });

            },
            {
                threshold: 0.5
            }
        );


    tokenNumbers.forEach(number => {
        numberObserver.observe(number);
    });


    /* =====================================================
       BUTTON PRESS EFFECT
    ===================================================== */

    document.querySelectorAll(
        ".btn, .outline-button, .gold-small-button, .nav-play"
    ).forEach(button => {

        button.addEventListener(
            "mousedown",
            () => {
                button.style.transform =
                    "scale(0.97)";
            }
        );

        button.addEventListener(
            "mouseup",
            () => {
                button.style.transform = "";
            }
        );

        button.addEventListener(
            "mouseleave",
            () => {
                button.style.transform = "";
            }
        );
    });


    /* =====================================================
       REDUCED MOTION SUPPORT
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (prefersReducedMotion) {

        document.documentElement.style
            .scrollBehavior = "auto";
    }


    console.log(
        "🐕 Baby Shiba Inu Website V2 loaded successfully."
    );

});
