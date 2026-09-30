/* =========================================================
   BABY SHIBA INU — PREMIUM WEB3 WEBSITE
   APP.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header = document.getElementById("header");
    const menuButton = document.getElementById("menuButton");
    const mainNav = document.getElementById("mainNav");

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");

    const yearElement = document.getElementById("year");


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuButton && mainNav) {

        menuButton.addEventListener("click", () => {

            mainNav.classList.toggle("open");

            const isOpen =
                mainNav.classList.contains("open");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });


        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const updateHeader = () => {

        if (!header) return;

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const updateActiveNavigation = () => {

        const scrollPosition =
            window.scrollY + 180;

        let currentSection = "home";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.id;

            }

        });


        navLinks.forEach((link) => {

            const href =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );

        });

    };

    updateActiveNavigation();

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener("click", (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight -
                    15;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            });

        });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".info-card, " +
        ".ecosystem-card, " +
        ".roadmap-phase, " +
        ".token-panel, " +
        ".shibarium-panel, " +
        ".community-panel, " +
        ".world-node"
    );


    revealElements.forEach((element) => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity .7s ease, transform .7s ease";

    });


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.style.opacity = "1";

            element.style.transform =
                "translateY(0)";

        });

    }


    /* =====================================================
       STAGGER ECOSYSTEM CARDS
    ===================================================== */

    const ecosystemCards =
        document.querySelectorAll(
            ".ecosystem-card"
        );

    ecosystemCards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 80}ms`;

        }
    );


    /* =====================================================
       WORLD NODE INTERACTION
    ===================================================== */

    const worldNodes =
        document.querySelectorAll(
            ".world-node"
        );

    worldNodes.forEach((node) => {

        node.addEventListener(
            "mouseenter",
            () => {

                node.style.zIndex = "20";

            }
        );

        node.addEventListener(
            "mouseleave",
            () => {

                node.style.zIndex = "5";

            }
        );

    });


    /* =====================================================
       HERO PORTAL MOUSE EFFECT
    ===================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );

    const heroCharacter =
        document.querySelector(
            ".hero-character"
        );

    const heroCoin =
        document.querySelector(
            ".hero-coin"
        );


    if (
        heroVisual &&
        heroCharacter &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        heroVisual.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    heroVisual.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height -
                    0.5;


                heroCharacter.style.transform =
                    `translate(${x * 8}px, ${y * 8}px) scale(.98)`;


                if (heroCoin) {

                    heroCoin.style.transform =
                        `translate(${x * -14}px, ${y * -14}px) rotate(-14deg)`;

                }

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                heroCharacter.style.transform =
                    "";

                if (heroCoin) {

                    heroCoin.style.transform =
                        "";

                }

            }
        );

    }


    /* =====================================================
       BUTTON PRESS EFFECT
    ===================================================== */

    const interactiveButtons =
        document.querySelectorAll(
            ".primary-button, " +
            ".secondary-button, " +
            ".launch-button, " +
            ".social-button, " +
            ".community-links a"
        );


    interactiveButtons.forEach((button) => {

        button.addEventListener(
            "mousedown",
            () => {

                button.style.transform =
                    "scale(.97)";

            }
        );


        button.addEventListener(
            "mouseup",
            () => {

                button.style.transform =
                    "";

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       TEMPORARY # LINKS
    ===================================================== */

    const temporaryLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );


    temporaryLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

            }
        );

    });


    /* =====================================================
       ESC KEY — CLOSE MOBILE MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {
                return;
            }

            if (!mainNav || !menuButton) {
                return;
            }

            mainNav.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }
    );


    /* =====================================================
       RESIZE SAFETY
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900 &&
                mainNav &&
                menuButton
            ) {

                mainNav.classList.remove(
                    "open"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add(
        "page-ready"
    );


    console.log(
        "🐕 Baby Shiba Inu website loaded successfully."
    );

});
/* =========================================================
   BABY SHIBA - MOBILE WORLD MAP REAL CARD POSITIONING
   ========================================================= */

function fixBabyShibaWorldMobile() {
    const nodes = document.querySelectorAll(".world-node");

    if (!nodes.length) return;

    nodes.forEach((node) => {
        const text = node.textContent
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();

        node.classList.remove(
            "world-entrance",
            "world-community",
            "world-arena",
            "world-city",
            "world-future",
            "world-marketplace",
            "world-blockchain",
            "world-bshib"
        );

        if (text.includes("entrance portal")) {
            node.classList.add("world-entrance");
        } 
        else if (text.includes("community hub")) {
            node.classList.add("world-community");
        } 
        else if (text.includes("arena district")) {
            node.classList.add("world-arena");
        } 
        else if (text.includes("city district")) {
            node.classList.add("world-city");
        } 
        else if (text.includes("future city")) {
            node.classList.add("world-future");
        } 
        else if (text.includes("marketplace plaza")) {
            node.classList.add("world-marketplace");
        } 
        else if (text.includes("blockchain core")) {
            node.classList.add("world-blockchain");
        } 
        else if (text.includes("bshib center")) {
            node.classList.add("world-bshib");
        }
    });
}

document.addEventListener("DOMContentLoaded", fixBabyShibaWorldMobile);
window.addEventListener("load", fixBabyShibaWorldMobile);
