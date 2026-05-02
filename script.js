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

    // Unconnected links (Under construction page redirection)
    document.querySelectorAll('a[href="#"], a[href=""]').forEach(link => {
        // Skip specific functional links
        if (link.classList.contains('btn-top')) return;
        
        // CEO Greeting is implemented
        if (link.getAttribute('data-ko') === 'CEO인사말') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
                this.parentElement.classList.add('active');
                const originalContent = document.querySelector('.original-content');
                if (originalContent) originalContent.style.display = 'block';
            });
            return;
        }

        // Redirect unconnected links to Under Construction page
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'uc.html';
        });
    });
});
