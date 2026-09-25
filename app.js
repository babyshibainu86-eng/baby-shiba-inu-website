/* =========================================
   BABY SHIBA INU — WEBSITE V2
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       SMOOTH SCROLL
    ========================================== */

    const navigationLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    navigationLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                event.preventDefault();
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbar = document.querySelector(".navbar");

            const navbarHeight = navbar
                ? navbar.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================================
       NAVBAR SCROLL EFFECT
    ========================================== */

    const navbar = document.querySelector(".navbar");

    const updateNavbar = () => {

        if (!navbar) {
            return;
        }

        if (window.scrollY > 30) {

            navbar.style.background =
                "rgba(5, 8, 23, 0.92)";

            navbar.style.boxShadow =
                "0 10px 35px rgba(0, 0, 0, 0.20)";

        } else {

            navbar.style.background =
                "rgba(5, 8, 23, 0.72)";

            navbar.style.boxShadow =
                "none";
        }

    };

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    /* =========================================
       REVEAL ANIMATIONS
    ========================================== */

    const revealElements = document.querySelectorAll(
        ".feature-card, .game-card, .token-main, .token-stat, .roadmap-item, .social-card, .shibarium-box"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "is-visible"
                    );

                    observerInstance.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {

            element.classList.add(
                "reveal-element"
            );

            observer.observe(element);

        });

    }


    /* =========================================
       MINING CARD
    ========================================== */

    const miningLink =
        document.querySelector(
            ".mining-card .card-link"
        );

    if (miningLink) {

        miningLink.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                showWebsiteMessage(
                    "Baby Shiba Mining is coming soon."
                );

            }
        );

    }


    /* =========================================
       NFT BUTTON
    ========================================== */

    const nftButton =
        document.querySelector(
            ".nft-content .secondary-button"
        );

    if (nftButton) {

        nftButton.addEventListener(
            "click",
            () => {

                showWebsiteMessage(
                    "Baby Shiba NFT Collection is coming soon."
                );

            }
        );

    }


    /* =========================================
       SOCIAL LINKS
    ========================================== */

    const socialLinks =
        document.querySelectorAll(
            ".social-card"
        );

    socialLinks.forEach((link) => {

        const href =
            link.getAttribute("href");

        if (!href || href === "#") {

            link.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    showWebsiteMessage(
                        "Official community link coming soon."
                    );

                }
            );

        }

    });


    /* =========================================
       COMING SOON ITEMS
    ========================================== */

    const comingSoonItems =
        document.querySelectorAll(
            ".coming-soon"
        );

    comingSoonItems.forEach((item) => {

        item.style.cursor = "default";

    });


    /* =========================================
       MESSAGE SYSTEM
    ========================================== */

    function showWebsiteMessage(message) {

        let messageBox =
            document.querySelector(
                ".website-message"
            );

        if (!messageBox) {

            messageBox =
                document.createElement("div");

            messageBox.className =
                "website-message";

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

            }, 2800);

    }


    /* =========================================
       ADD MESSAGE STYLES
    ========================================== */

    const messageStyle =
        document.createElement("style");

    messageStyle.textContent = `

        .reveal-element {
            opacity: 0;
            transform: translateY(25px);
            transition:
                opacity 0.7s ease,
                transform 0.7s ease;
        }

        .reveal-element.is-visible {
            opacity: 1;
            transform: translateY(0);
        }

        .website-message {
            position: fixed;

            left: 50%;
            bottom: 28px;

            transform:
                translate(-50%, 25px);

            z-index: 9999;

            width: max-content;
            max-width:
                calc(100% - 30px);

            padding:
                13px 18px;

            border-radius: 14px;

            border:
                1px solid
                rgba(57, 184, 255, 0.28);

            background:
                rgba(8, 13, 34, 0.94);

            color: #ffffff;

            font-size: 12px;
            font-weight: 700;

            box-shadow:
                0 15px 40px
                rgba(0, 0, 0, 0.35);

            backdrop-filter:
                blur(12px);

            opacity: 0;

            pointer-events: none;

            transition:
                opacity 0.3s ease,
                transform 0.3s ease;
        }

        .website-message.show {
            opacity: 1;

            transform:
                translate(-50%, 0);
        }

    `;

    document.head.appendChild(
        messageStyle
    );


    /* =========================================
       CURRENT YEAR
    ========================================== */

    const copyright =
        document.querySelector(
            ".copyright"
        );

    if (copyright) {

        copyright.textContent =
            `© ${new Date().getFullYear()} Baby Shiba Inu. All rights reserved.`;

    }


    /* =========================================
       PAGE READY
    ========================================== */

    document.body.classList.add(
        "website-ready"
    );

});
