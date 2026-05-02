document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for top button
    const btnTop = document.querySelector('.btn-top');
    if (btnTop) {
        btnTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Scroll Down arrow in Hero section
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero Pagination active state toggling (visual only for now)
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            document.querySelector('.dot.active').classList.remove('active');
            dot.classList.add('active');
        });
    });

    // Sticky header shadow on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Language switch logic
    const langSwitch = document.getElementById('lang-switch');
    const translatableElements = document.querySelectorAll('.trans');

    if (langSwitch) {
        langSwitch.addEventListener('change', (e) => {
            const lang = e.target.value;
            document.documentElement.lang = lang; // 'ko' or 'en'
            
            translatableElements.forEach(el => {
                const text = el.getAttribute(`data-${lang}`);
                if (text) {
                    el.innerHTML = text;
                }
            });
        });
    }

    // Sidebar menu interactions (Under construction logic)
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    const originalContent = document.querySelector('.original-content');
    const underConstruction = document.querySelector('.under-construction');
    const ucTitle = document.querySelector('.uc-title');
    const ucBreadcrumb = document.querySelector('.uc-breadcrumb');
    let constructionTimeout;

    if (sidebarLinks.length > 0 && originalContent && underConstruction) {
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Clear any existing timeout
                if (constructionTimeout) clearTimeout(constructionTimeout);

                const isCEO = this.getAttribute('data-ko') === 'CEO인사말';

                // Change active state
                document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
                this.parentElement.classList.add('active');

                if (isCEO) {
                    originalContent.style.display = 'block';
                    underConstruction.style.display = 'none';
                } else {
                    // Update UC texts based on current language
                    const currentLang = document.documentElement.lang || 'ko';
                    const text = this.getAttribute(`data-${currentLang}`) || this.textContent;
                    
                    ucTitle.textContent = text;
                    ucTitle.setAttribute('data-ko', this.getAttribute('data-ko'));
                    ucTitle.setAttribute('data-en', this.getAttribute('data-en'));
                    
                    ucBreadcrumb.textContent = text;
                    ucBreadcrumb.setAttribute('data-ko', this.getAttribute('data-ko'));
                    ucBreadcrumb.setAttribute('data-en', this.getAttribute('data-en'));

                    // Toggle views
                    originalContent.style.display = 'none';
                    underConstruction.style.display = 'block';

                    // Revert after 3 seconds
                    constructionTimeout = setTimeout(() => {
                        underConstruction.style.display = 'none';
                        originalContent.style.display = 'block';
                        
                        // Revert active state to CEO인사말
                        document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
                        const ceoLink = document.querySelector('.sidebar-menu a[data-ko="CEO인사말"]');
                        if (ceoLink) ceoLink.parentElement.classList.add('active');
                    }, 3000);
                }
            });
        });
    }
});
