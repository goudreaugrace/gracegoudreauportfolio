(function () {
    const activeClass = 'is-active';
    let navLinks = [];
    let sections = [];
    let ticking = false;

    function injectStyles() {
        if (document.getElementById('caseStudyNavStyles')) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'caseStudyNavStyles';
        style.textContent = `
            .case-toc a {
                cursor: pointer;
            }

            .case-toc a:hover,
            .case-toc a.${activeClass} {
                color: #315dff !important;
                border-bottom-color: #315dff !important;
            }

            .case-toc a.${activeClass} {
                font-weight: 500;
            }

            .case-toc a:focus-visible {
                outline: 2px solid #315dff;
                outline-offset: 4px;
            }
        `;
        document.head.appendChild(style);
    }

    function collectNavItems() {
        navLinks = Array.from(document.querySelectorAll('.case-toc a[href^="#"]'));
        sections = navLinks
            .map((link) => {
                const id = decodeURIComponent(link.getAttribute('href').slice(1));
                return {
                    link,
                    section: document.getElementById(id)
                };
            })
            .filter((item) => item.section);
    }

    function setActiveLink(activeLink) {
        navLinks.forEach((link) => {
            const isActive = link === activeLink;
            link.classList.toggle(activeClass, isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function updateActiveLink() {
        ticking = false;

        if (!sections.length) {
            collectNavItems();
        }

        if (!sections.length) {
            return;
        }

        const activationLine = Math.min(window.innerHeight * 0.35, 260);
        let activeItem = sections[0];

        sections.forEach((item) => {
            const rect = item.section.getBoundingClientRect();

            if (rect.top <= activationLine && rect.bottom > 96) {
                activeItem = item;
            }
        });

        setActiveLink(activeItem.link);
    }

    function requestUpdate() {
        if (ticking) {
            return;
        }

        ticking = true;
        window.requestAnimationFrame(updateActiveLink);
    }

    function initCaseStudyNav() {
        injectStyles();
        collectNavItems();
        updateActiveLink();
    }

    function observeProtectedContent() {
        const mainContent = document.getElementById('mainContent');

        if (!mainContent || !window.MutationObserver) {
            return;
        }

        const observer = new MutationObserver(requestUpdate);
        observer.observe(mainContent, {
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    }

    window.initCaseStudyNav = initCaseStudyNav;
    window.refreshCaseStudyNav = requestUpdate;

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('hashchange', requestUpdate);

    document.addEventListener('DOMContentLoaded', () => {
        initCaseStudyNav();
        observeProtectedContent();
        setTimeout(requestUpdate, 150);
    });

    if (document.readyState !== 'loading') {
        initCaseStudyNav();
        observeProtectedContent();
    }
})();
