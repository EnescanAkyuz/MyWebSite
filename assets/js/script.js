// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initSmoothScroll();
    initContactForm();
    initTypewriter();
    initParallax();
    initLanguageToggle();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    let lastScrollTop = 0;
    let navbarTicking = false;
    window.addEventListener('scroll', function() {
        if (!navbarTicking) {
            requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                if (scrollTop > 100) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.boxShadow = 'none';
                }

                // Hide/show navbar on scroll
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
                lastScrollTop = scrollTop;
                navbarTicking = false;
            });
            navbarTicking = true;
        }
    }, { passive: true });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    let sectionTicking = false;

    window.addEventListener('scroll', function() {
        if (!sectionTicking) {
            requestAnimationFrame(function() {
                let current = '';

                sections.forEach(section => {
                    const sectionTop = section.offsetTop;

                    if (pageYOffset >= sectionTop - 200) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
                sectionTicking = false;
            });
            sectionTicking = true;
        }
    }, { passive: true });
}

// Smooth scroll functionality
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animations
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // Trigger counter animations
                if (entry.target.classList.contains('about')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll(`
        section,
        .project-card,
        .timeline-item,
        .skill-category,
        .certificate-card,
        .contact-item,
        .education-card
    `);

    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.setProperty('--target-width', width);
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
            bar.classList.add('animate');
        }, index * 200);
    });
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        updateCounter();
    });
}

// Typewriter effect for hero title
function initTypewriter() {
    const nameElement = document.querySelector('.name');
    if (!nameElement) return;
    
    const text = nameElement.textContent;
    nameElement.textContent = '';
    nameElement.style.borderRight = '2px solid #2563eb';
    
    let index = 0;
    
    function type() {
        if (index < text.length) {
            nameElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        } else {
            setTimeout(() => {
                nameElement.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    setTimeout(type, 1000);
}

// Parallax effect
function initParallax() {
    // Disable parallax on mobile/touch devices to prevent scroll jank
    const isMobile = window.matchMedia('(max-width: 768px)').matches ||
                     ('ontouchstart' in window) ||
                     (navigator.maxTouchPoints > 0);
    if (isMobile) return;

    const parallaxElements = document.querySelectorAll('.hero');
    let parallaxTicking = false;

    window.addEventListener('scroll', function() {
        if (!parallaxTicking) {
            requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                parallaxElements.forEach(element => {
                    const speed = 0.3;
                    element.style.transform = `translateY(${scrolled * speed}px)`;
                });
                parallaxTicking = false;
            });
            parallaxTicking = true;
        }
    }, { passive: true });
}

// Contact form handling
function initContactForm() {
    const form = document.querySelector('.form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        let isValid = true;
        const inputs = form.querySelectorAll('.form-input');
        const formData = {};
        
        inputs.forEach((input, index) => {
            input.classList.remove('error');
            
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            }
            
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    input.classList.add('error');
                    isValid = false;
                }
            }
            
            // Map inputs to form data
            if (index === 0) formData.name = input.value; // Name
            if (input.type === 'email') formData.email = input.value; // Email
            if (index === 2) formData.subject = input.value; // Subject
            if (input.tagName === 'TEXTAREA') formData.message = input.value; // Message
        });
        
        if (isValid) {
            // Send email using EmailJS
            const templateParams = {
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_email: 'enescandev@gmail.com'
            };
            
            emailjs.send('service_eaz99dk', 'template_2h8v8ng', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showNotification('Mesajınız başarıyla gönderildi!', 'success');
                    form.reset();
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    showNotification('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.', 'error');
                });
        } else {
            // Show error message
            showNotification('Lütfen tüm alanları doğru şekilde doldurunuz.', 'error');
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Click to remove
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Project card interactions
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Social links tracking (optional analytics)
function trackSocialClick(platform) {
    // This would integrate with analytics tools like Google Analytics
    console.log(`Social link clicked: ${platform}`);
    
    // Example Google Analytics event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            event_category: 'Social',
            event_label: platform
        });
    }
}

// Add click tracking to social links
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-link, .footer-social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const href = this.getAttribute('href');
            let platform = 'unknown';
            
            if (href.includes('linkedin')) platform = 'LinkedIn';
            else if (href.includes('github')) platform = 'GitHub';
            else if (href.includes('mailto')) platform = 'Email';
            else if (href.includes('twitter')) platform = 'Twitter';
            
            trackSocialClick(platform);
        });
    });
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Theme toggle (optional dark mode)
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
}

// Performance optimization: Lazy loading images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Scroll to top functionality
function initScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.classList.add('scroll-to-top');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-medium);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initLazyLoading();
    initScrollToTop();
});

// Resize handler for responsive adjustments
window.addEventListener('resize', function() {
    // Close mobile menu on resize
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth > 768) {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    }
});

// Page visibility change handler
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = '👋 Geri dön! - Enescan Akyüz';
    } else {
        document.title = 'Enescan Akyüz - Bilgisayar Mühendisi';
    }
});

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (e) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

function safeQuerySelectorAll(selector) {
    try {
        return document.querySelectorAll(selector);
    } catch (e) {
        console.warn(`Elements not found: ${selector}`);
        return [];
    }
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initScrollAnimations,
        initSkillBars,
        showNotification
    };
}

// Language Toggle Functionality
let translations = {};
let currentLanguage = 'tr';

async function loadTranslations() {
    try {
        const response = await fetch('./assets/lang/translations.json');
        translations = await response.json();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function initLanguageToggle() {
    loadTranslations().then(() => {
        // Get saved language or default to Turkish
        const savedLanguage = localStorage.getItem('language') || 'tr';
        currentLanguage = savedLanguage;
        
        // Set initial language
        updateLanguage(currentLanguage);
        
        // Language toggle button
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', function() {
                currentLanguage = currentLanguage === 'tr' ? 'en' : 'tr';
                updateLanguage(currentLanguage);
                localStorage.setItem('language', currentLanguage);
            });
        }
    });
}

function updateLanguage(lang) {
    if (!translations[lang]) return;
    
    const langData = translations[lang];
    
    // Update language button text
    const langText = document.querySelector('.lang-text');
    if (langText) {
        langText.textContent = lang === 'tr' ? 'EN' : 'TR';
    }
    
    // Update page language attribute
    document.documentElement.lang = lang;
    
    // Update all elements with data-translate attribute
    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getNestedProperty(langData, key);
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Update specific content areas
    updateSectionTitles(langData);
    updateAboutSection(langData);
    updateExperienceSection(langData);
    updateProjectsSection(langData);
    updateEducationSection(langData);
    updateSkillsSection(langData);
    updateCertificatesSection(langData);
    updateContactSection(langData);
    updateFooter(langData);
    
    // Update form placeholders
    updateFormPlaceholders(langData);
    
    // Update page title
}

function getNestedProperty(obj, path) {
    return path.split('.').reduce((current, key) => current && current[key], obj);
}

function updateSectionTitles(langData) {
    // About section
    const aboutTitle = document.querySelector('#about .section-title');
    const aboutSubtitle = document.querySelector('#about .section-subtitle');
    if (aboutTitle) aboutTitle.textContent = langData.sections.about;
    if (aboutSubtitle) aboutSubtitle.textContent = langData.sections.aboutSubtitle;
    
    // Experience section
    const expTitle = document.querySelector('#experience .section-title');
    const expSubtitle = document.querySelector('#experience .section-subtitle');
    if (expTitle) expTitle.textContent = langData.sections.experience;
    if (expSubtitle) expSubtitle.textContent = langData.sections.experienceSubtitle;
    
    // Projects section
    const projTitle = document.querySelector('#projects .section-title');
    const projSubtitle = document.querySelector('#projects .section-subtitle');
    if (projTitle) projTitle.textContent = langData.sections.projects;
    if (projSubtitle) projSubtitle.textContent = langData.sections.projectsSubtitle;
    
    // Education section
    const eduTitle = document.querySelector('#education .section-title');
    const eduSubtitle = document.querySelector('#education .section-subtitle');
    if (eduTitle) eduTitle.textContent = langData.sections.education;
    if (eduSubtitle) eduSubtitle.textContent = langData.sections.educationSubtitle;
    
    // Skills section
    const skillsTitle = document.querySelector('#skills .section-title');
    const skillsSubtitle = document.querySelector('#skills .section-subtitle');
    if (skillsTitle) skillsTitle.textContent = langData.sections.skills;
    if (skillsSubtitle) skillsSubtitle.textContent = langData.sections.skillsSubtitle;
    
    // Certificates section
    const certTitle = document.querySelector('#certificates .section-title');
    const certSubtitle = document.querySelector('#certificates .section-subtitle');
    if (certTitle) certTitle.textContent = langData.sections.certificates;
    if (certSubtitle) certSubtitle.textContent = langData.sections.certificatesSubtitle;
    
    // Contact section
    const contactTitle = document.querySelector('#contact .section-title');
    const contactSubtitle = document.querySelector('#contact .section-subtitle');
    if (contactTitle) contactTitle.textContent = langData.sections.contact;
    if (contactSubtitle) contactSubtitle.textContent = langData.sections.contactSubtitle;
}

function updateAboutSection(langData) {
    const aboutTexts = document.querySelectorAll('.about-text p');
    if (aboutTexts.length >= 3) {
        aboutTexts[0].textContent = langData.about.text1;
        aboutTexts[1].textContent = langData.about.text2;
        aboutTexts[2].textContent = langData.about.text3;
    }
    
    // Update stats labels
    const statLabels = document.querySelectorAll('.stat-label');
    const statsKeys = ['experience', 'projects', 'users', 'satisfaction'];
    statLabels.forEach((label, index) => {
        if (statsKeys[index] && langData.about.stats[statsKeys[index]]) {
            label.textContent = langData.about.stats[statsKeys[index]];
        }
    });
}

function updateExperienceSection(langData) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        if (langData.experience[index]) {
            const exp = langData.experience[index];
            const title = item.querySelector('.timeline-title');
            const company = item.querySelector('.timeline-company');
            const date = item.querySelector('.timeline-date');
            const description = item.querySelector('.timeline-description');
            const achievements = item.querySelectorAll('.timeline-achievements li');
            
            if (title) title.textContent = exp.title;
            if (company) company.textContent = exp.company;
            if (date) date.textContent = exp.date;
            if (description) description.textContent = exp.description;
            
            if (exp.achievements && achievements.length > 0) {
                achievements.forEach((achievement, achIndex) => {
                    if (exp.achievements[achIndex]) {
                        achievement.textContent = exp.achievements[achIndex];
                    }
                });
            }
        }
    });
}

function updateProjectsSection(langData) {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        if (langData.projects[index]) {
            const project = langData.projects[index];
            const title = card.querySelector('.project-title');
            const description = card.querySelector('.project-description');
            const overlay = card.querySelector('.project-overlay p');
            
            if (title) title.textContent = project.title;
            if (description) description.textContent = project.description;
            if (overlay) overlay.textContent = project.overlay;
        }
    });
}

function updateEducationSection(langData) {
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach((card, index) => {
        if (langData.education[index]) {
            const edu = langData.education[index];
            const degree = card.querySelector('.education-degree');
            const school = card.querySelector('.education-school');
            const year = card.querySelector('.education-year');
            const gpa = card.querySelector('.education-gpa');
            const description = card.querySelector('.education-description');
            
            if (degree) degree.textContent = edu.degree;
            if (school) school.textContent = edu.school;
            if (year) year.textContent = edu.year;
            if (description) description.textContent = edu.description;
            
            if (gpa) {
                if (edu.gpa) {
                    gpa.textContent = edu.gpa;
                    gpa.style.display = 'block';
                } else {
                    gpa.style.display = 'none';
                }
            }
        }
    });
}

function updateSkillsSection(langData) {
    const skillCategories = document.querySelectorAll('.category-title');
    const skillsKeys = ['mobile', 'web', 'ai', 'backend', 'devops'];
    
    skillCategories.forEach((category, index) => {
        if (skillsKeys[index] && langData.skills[skillsKeys[index]]) {
            const textNode = category.childNodes[2]; // The text node after the icon
            if (textNode) {
                textNode.textContent = langData.skills[skillsKeys[index]];
            }
        }
    });
}

function updateCertificatesSection(langData) {
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach((card, index) => {
        if (langData.certificates[index]) {
            const title = card.querySelector('.certificate-title');
            const parts = langData.certificates[index].split(' - ');
            if (title && parts.length >= 2) {
                title.textContent = parts[0];
                const issuer = card.querySelector('.certificate-issuer');
                if (issuer) {
                    const issuerAndDate = parts[1].split(' (');
                    issuer.textContent = issuerAndDate[0];
                    
                    const date = card.querySelector('.certificate-date');
                    if (date && issuerAndDate[1]) {
                        date.textContent = issuerAndDate[1].replace(')', '');
                    }
                }
            }
        }
    });
}

function updateContactSection(langData) {
    const contactTitle = document.querySelector('#contact .section-title');
    const contactDescription = document.querySelector('.contact-info + .contact-form').previousElementSibling.querySelector('p');
    
    if (contactTitle) contactTitle.textContent = langData.contact.title;
    
    // Update contact items
    const contactItems = document.querySelectorAll('.contact-item h3');
    const contactKeys = ['phone', 'email'];
    contactItems.forEach((item, index) => {
        if (contactKeys[index] && langData.contact[contactKeys[index]]) {
            item.textContent = langData.contact[contactKeys[index]];
        }
    });
}

function updateFormPlaceholders(langData) {
    const formInputs = document.querySelectorAll('.form-input');
    const placeholderKeys = ['name', 'email', 'subject', 'message'];
    
    formInputs.forEach((input, index) => {
        if (placeholderKeys[index] && langData.contact.form[placeholderKeys[index]]) {
            input.placeholder = langData.contact.form[placeholderKeys[index]];
        }
    });
    
    const submitBtn = document.querySelector('.btn-full');
    if (submitBtn && langData.contact.form.send) {
        submitBtn.textContent = langData.contact.form.send;
    }
}

function updateFooter(langData) {
    const footerText = document.querySelector('.footer-text p');
    if (footerText) {
        footerText.innerHTML = '&copy; 2024 Enescan Akyüz. ' + langData.footer.rights;
    }
}

// Update notification messages
function showNotification(message, type = 'info') {
    // Use translated messages if available
    if (translations[currentLanguage] && translations[currentLanguage].notifications) {
        if (type === 'success' && translations[currentLanguage].notifications.success) {
            message = translations[currentLanguage].notifications.success;
        } else if (type === 'error' && translations[currentLanguage].notifications.error) {
            message = translations[currentLanguage].notifications.error;
        }
    }
    
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Click to remove
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}
