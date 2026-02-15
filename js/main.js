/* ============================================
   Seliana Psicologia — Main JavaScript
   ============================================ */

(function () {
    'use strict';

    /* --- Navigation --- */
    var nav = document.getElementById('nav');
    var navToggle = document.getElementById('nav-toggle');
    var navMenu = document.getElementById('nav-menu');

    if (nav) {
        window.addEventListener('scroll', function () {
            nav.classList.toggle('nav--scrolled', window.scrollY > 50);
        }, { passive: true });

        if (window.scrollY > 50) {
            nav.classList.add('nav--scrolled');
        }
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', function (e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });

        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
            });
        });
    }

    // Close menu on iframe focus (calendar page)
    var iframe = document.querySelector('iframe');
    if (iframe && navMenu) {
        window.addEventListener('blur', function () {
            setTimeout(function () {
                if (document.activeElement && document.activeElement.tagName === 'IFRAME') {
                    navMenu.classList.remove('active');
                }
            }, 100);
        });
    }

    /* --- Testimonial Slider --- */
    var sliders = document.querySelectorAll('.testimonial');
    var btnNext = document.getElementById('next');
    var btnBefore = document.getElementById('before');

    if (sliders.length > 0 && btnNext && btnBefore) {
        var currentSlide = 0;

        function showSlide(index) {
            sliders.forEach(function (s) { s.classList.remove('testimonial--active'); });
            sliders[index].classList.add('testimonial--active');
        }

        btnNext.addEventListener('click', function () {
            currentSlide = (currentSlide + 1) % sliders.length;
            showSlide(currentSlide);
        });

        btnBefore.addEventListener('click', function () {
            currentSlide = (currentSlide - 1 + sliders.length) % sliders.length;
            showSlide(currentSlide);
        });

        setInterval(function () {
            currentSlide = (currentSlide + 1) % sliders.length;
            showSlide(currentSlide);
        }, 8000);
    }

    /* --- FAQ Accordion --- */
    var faqItems = document.querySelectorAll('.faq-item__question');

    faqItems.forEach(function (question) {
        question.addEventListener('click', function () {
            var faqItem = question.closest('.faq-item');
            var answer = faqItem.querySelector('.faq-item__answer');
            var isOpen = faqItem.classList.contains('faq-item--open');

            document.querySelectorAll('.faq-item').forEach(function (item) {
                item.classList.remove('faq-item--open');
                item.querySelector('.faq-item__answer').style.height = '0';
            });

            if (!isOpen) {
                faqItem.classList.add('faq-item--open');
                answer.style.height = answer.scrollHeight + 'px';
            }
        });
    });

    /* --- Team Card Expander --- */
    var expandBtns = document.querySelectorAll('.team-card__expand--open');
    var closeBtns = document.querySelectorAll('.team-card__expand--close');

    expandBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var card = btn.closest('.team-card');
            document.querySelectorAll('.team-card.expanded').forEach(function (c) {
                if (c !== card) c.classList.remove('expanded');
            });
            card.classList.add('expanded');
        });
    });

    closeBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            btn.closest('.team-card').classList.remove('expanded');
        });
    });

    /* --- Intersection Observer for Animations --- */
    if ('IntersectionObserver' in window) {
        // Reveal animations
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.reveal').forEach(function (el) {
            revealObserver.observe(el);
        });

        // Team card entrance
        var teamObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    teamObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.team-card').forEach(function (card) {
            teamObserver.observe(card);
        });
    } else {
        document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
        document.querySelectorAll('.team-card').forEach(function (card) { card.classList.add('show'); });
    }

})();
