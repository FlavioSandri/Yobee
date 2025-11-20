// script.js - Versão Final Corrigida
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initHeaderEffects();
    initMobileMenu();
    initScrollAnimations();
    initCounters();
    initForms();
    initSmoothScroll();
    initParticles();
    initTypeWriter();
    initProjectsAnimation(); // Esta é a função importante
});

// Header effects
function initHeaderEffects() {
    const header = document.querySelector('.main-header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Mobile menu
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    // Fade-in animation
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up, .scale-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
}

// Counter animations
function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const countersObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    countersObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const sectionsWithCounters = document.querySelectorAll('.hero-section, .stats-container, .company-stats');
        sectionsWithCounters.forEach(section => {
            if (section.querySelector('.stat-number')) {
                countersObserver.observe(section);
            }
        });
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// Form handling
function initForms() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                alert('Obrigado pela sua mensagem! Entraremos em contato em breve.');
                contactForm.reset();
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }
}

// Smooth scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const header = document.querySelector('.main-header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Particles background
function initParticles() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 60, 
                    density: { 
                        enable: true, 
                        value_area: 800 
                    } 
                },
                color: { 
                    value: "#E6B400" 
                },
                shape: { 
                    type: "circle" 
                },
                opacity: { 
                    value: 0.4, 
                    random: true 
                },
                size: { 
                    value: 3, 
                    random: true 
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#E6B400",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { 
                        enable: true, 
                        mode: "repulse" 
                    },
                    onclick: { 
                        enable: true, 
                        mode: "push" 
                    },
                    resize: true
                }
            }
        });
    }
}

// Typewriter effect
function initTypeWriter() {
    const typeElements = document.querySelectorAll('.type-writer');
    
    typeElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    type();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// PROJECTS ANIMATION - VERSÃO COMPLETAMENTE CORRIGIDA
function initProjectsAnimation() {
    const projectSlides = document.querySelectorAll('.project-slide');
    const indicators = document.querySelectorAll('.indicator');
    const projectsSection = document.querySelector('.projects-section');
    
    if (!projectSlides.length || !projectsSection) {
        console.log('Elementos dos projetos não encontrados');
        return;
    }
    
    console.log('Inicializando animação dos projetos:', projectSlides.length, 'slides encontrados');
    
    // Configurar alturas para scroll
    const sectionHeight = projectsSection.offsetHeight;
    const slideHeight = sectionHeight / projectSlides.length;
    
    // Configurar posições dos slides
    projectSlides.forEach((slide, index) => {
        slide.style.height = `${slideHeight}px`;
        slide.style.top = `${index * slideHeight}px`;
    });
    
    // Observer para detectar slides ativos
    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const slide = entry.target;
            const slideId = slide.id;
            
            if (entry.isIntersecting) {
                console.log('Slide ativo:', slideId);
                
                // Remover active de todos os slides
                projectSlides.forEach(s => s.classList.remove('active'));
                
                // Adicionar active ao slide atual
                slide.classList.add('active');
                
                // Atualizar indicadores
                indicators.forEach(indicator => {
                    indicator.classList.remove('active');
                    if (indicator.getAttribute('data-target') === slideId) {
                        indicator.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-20% 0px -20% 0px'
    });
    
    // Observar cada slide
    projectSlides.forEach(slide => {
        slideObserver.observe(slide);
    });
    
    // Navegação por clique nos indicadores
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetSlide = document.getElementById(targetId);
            
            if (targetSlide) {
                const targetPosition = targetSlide.offsetTop;
                
                window.scrollTo({
                    top: targetPosition - 100, // Ajuste para header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efeito parallax suave
    let ticking = false;
    
    function updateAnimations() {
        const scrollY = window.pageYOffset;
        const projectsStart = projectsSection.offsetTop;
        const scrollProgress = (scrollY - projectsStart) / (sectionHeight - window.innerHeight);
        
        projectSlides.forEach((slide, index) => {
            const phoneMockup = slide.querySelector('.phone-mockup');
            if (phoneMockup) {
                const slideProgress = (scrollY - slide.offsetTop) / window.innerHeight;
                const rotation = Math.sin(slideProgress * Math.PI) * 5;
                const scale = 1 + Math.sin(slideProgress * Math.PI) * 0.1;
                
                if (Math.abs(slideProgress) < 1) {
                    phoneMockup.style.transform = `
                        rotateY(${rotation}deg)
                        scale(${scale})
                    `;
                }
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    });
    
    // Inicializar primeiro slide
    if (projectSlides[0]) {
        projectSlides[0].classList.add('active');
    }
    if (indicators[0]) {
        indicators[0].classList.add('active');
    }
    
    console.log('Animação dos projetos inicializada com sucesso');
}


