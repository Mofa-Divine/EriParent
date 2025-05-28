
// DOM Elements
const header = document.getElementById('header');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const languageToggle = document.querySelectorAll('.btn-language');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.dot');
const testimonialPrev = document.querySelector('.control-btn.prev');
const testimonialNext = document.querySelector('.control-btn.next');
const contactForm = document.getElementById('contactForm');

// Current active testimonial index
let currentTestimonialIndex = 0;

// =========================
// Header Scroll Effect
// =========================
function handleHeaderScroll() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// =========================
// Mobile Navigation
// =========================
function toggleMobileMenu() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  
  // Toggle hamburger animation
  const bars = hamburger.querySelectorAll('.bar');
  if (hamburger.classList.contains('active')) {
    bars[0].style.transform = 'translateY(8px) rotate(45deg)';
    bars[1].style.opacity = '0';
    bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
  } else {
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
  }
}

function closeMobileMenu() {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  
  // Reset hamburger
  const bars = hamburger.querySelectorAll('.bar');
  bars[0].style.transform = 'none';
  bars[1].style.opacity = '1';
  bars[2].style.transform = 'none';
}

// =========================
// Language Toggle
// =========================
function handleLanguageToggle(e) {
  languageToggle.forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');
  
  // Here you would add logic to change language
  const language = e.target.dataset.lang;
  console.log(`Language changed to: ${language}`);
  
  // This is a placeholder for actual translation implementation
}

// =========================
// Tab Navigation
// =========================
function handleTabClick(e) {
  // Remove active class from all buttons and panes
  tabButtons.forEach(button => button.classList.remove('active'));
  tabPanes.forEach(pane => pane.classList.remove('active'));
  
  // Add active class to clicked button
  e.target.classList.add('active');
  
  // Show corresponding pane
  const tabId = e.target.dataset.tab;
  document.getElementById(tabId).classList.add('active');
}

// =========================
// Testimonial Slider
// =========================
function showTestimonial(index) {
  // Hide all slides
  testimonialSlides.forEach(slide => slide.classList.remove('active'));
  
  // Remove active class from all dots
  testimonialDots.forEach(dot => dot.classList.remove('active'));
  
  // Show slide at index and activate corresponding dot
  testimonialSlides[index].classList.add('active');
  testimonialDots[index].classList.add('active');
  
  // Update current index
  currentTestimonialIndex = index;
}

function nextTestimonial() {
  let newIndex = currentTestimonialIndex + 1;
  if (newIndex >= testimonialSlides.length) {
    newIndex = 0;
  }
  showTestimonial(newIndex);
}

function prevTestimonial() {
  let newIndex = currentTestimonialIndex - 1;
  if (newIndex < 0) {
    newIndex = testimonialSlides.length - 1;
  }
  showTestimonial(newIndex);
}

// Auto-advance testimonials every 5 seconds
let testimonialInterval = setInterval(nextTestimonial, 5000);

// Reset interval when manually changing testimonials
function resetTestimonialInterval() {
  clearInterval(testimonialInterval);
  testimonialInterval = setInterval(nextTestimonial, 5000);
}

// =========================
// Smooth Scrolling
// =========================
function smoothScroll(e) {
  e.preventDefault();
  
  const targetId = this.getAttribute('href');
  if (targetId.startsWith('#')) {
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Close mobile menu if open
      closeMobileMenu();
      
      // Calculate header height for offset
      const headerHeight = header.offsetHeight;
      
      // Scroll to target with offset for header
      window.scrollTo({
        top: targetElement.offsetTop - headerHeight,
        behavior: 'smooth'
      });
      
      // Update URL hash without causing page jump
      history.pushState(null, null, targetId);
    }
  }
}

// =========================
// Form Submission
// =========================
function handleFormSubmit(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const formValues = Object.fromEntries(formData.entries());
  
  // Basic validation
  if (!formValues.name || !formValues.email || !formValues.message) {
    alert('Please fill out all required fields');
    return;
  }
  
  // This would be replaced with actual form submission to a backend
  console.log('Form submitted:', formValues);
  
  // Show success message (placeholder)
  alert('Thank you for your message! We will get back to you soon.');
  
  // Reset form
  contactForm.reset();
}

// =========================
// Animation on Scroll
// =========================
function revealOnScroll() {
  const sections = document.querySelectorAll('section');
  const windowHeight = window.innerHeight;
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    
    // If section is in viewport
    if (sectionTop < windowHeight * 0.85) {
      section.style.opacity = 1;
      section.style.transform = 'translateY(0)';
    }
  });
}

// =========================
// Initialize Animations
// =========================
function initAnimations() {
  // Add initial animations to sections
  const sections = document.querySelectorAll('section:not(.hero)');
  sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Trigger initial reveal
  revealOnScroll();
}

// =========================
// Event Listeners
// =========================
// Window events
window.addEventListener('scroll', handleHeaderScroll);
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', initAnimations);

// Mobile menu
hamburger.addEventListener('click', toggleMobileMenu);

// Navigation links
navLinks.forEach(link => {
  link.addEventListener('click', smoothScroll);
});

// Language toggle
languageToggle.forEach(btn => {
  btn.addEventListener('click', handleLanguageToggle);
});

// Tabs
tabButtons.forEach(button => {
  button.addEventListener('click', handleTabClick);
});

// Testimonials
testimonialDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showTestimonial(index);
    resetTestimonialInterval();
  });
});

testimonialPrev.addEventListener('click', () => {
  prevTestimonial();
  resetTestimonialInterval();
});

testimonialNext.addEventListener('click', () => {
  nextTestimonial();
  resetTestimonialInterval();
});

// Contact form
if (contactForm) {
  contactForm.addEventListener('submit', handleFormSubmit);
}