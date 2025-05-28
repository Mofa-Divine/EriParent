
// main.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle aria-expanded for accessibility
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle hamburger animation
        const bars = this.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.toggle('active'));
      });
    }
  
    // Language Toggle
    const languageButtons = document.querySelectorAll('.btn-language');
    languageButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all buttons
        languageButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // In a real implementation, you would change the language here
        const lang = this.getAttribute('data-lang');
        console.log(`Language changed to: ${lang}`);
        // You would typically load translations or redirect to a language-specific page
      });
    });
  
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = document.querySelector('#header').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
          }
        }
      });
    });
  
    // Active Navigation Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-list a');
    
    window.addEventListener('scroll', function() {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  
    // Header Scroll Effect
    const header = document.getElementById('header');
    if (header) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }
  
    // Current Year in Footer
    const currentYearElement = document.querySelector('.current-year');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    }
  });
  
  // form-validation.js
  document.addEventListener('DOMContentLoaded', function() {
    // Newsletter Form Validation
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = document.getElementById('newsletter-email');
        const email = emailInput.value.trim();
        
        if (!validateEmail(email)) {
          showError(emailInput, 'Please enter a valid email address');
          return;
        }
        
        // In a real implementation, you would submit the form here
        console.log('Submitting newsletter form with email:', email);
        
        // Show success message
        showSuccess(emailInput, 'Thank you for subscribing!');
        
        // Reset form
        newsletterForm.reset();
      });
    }
  
    // Email Validation Helper
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  
    // Show Error Message
    function showError(input, message) {
      const formGroup = input.parentElement;
      const errorElement = document.createElement('small');
      errorElement.className = 'error-message';
      errorElement.style.color = '#ef4444';
      errorElement.style.display = 'block';
      errorElement.style.marginTop = '0.5rem';
      errorElement.textContent = message;
      
      // Remove existing error if any
      const existingError = formGroup.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }
      
      formGroup.appendChild(errorElement);
      input.style.borderColor = '#ef4444';
    }
  
    // Show Success Message
    function showSuccess(input, message) {
      const formGroup = input.parentElement;
      const successElement = document.createElement('div');
      successElement.className = 'success-message';
      successElement.style.color = '#22c55e';
      successElement.style.marginTop = '1rem';
      successElement.style.padding = '0.75rem';
      successElement.style.backgroundColor = '#f0fdf4';
      successElement.style.borderRadius = '0.375rem';
      successElement.style.textAlign = 'center';
      successElement.textContent = message;
      
      // Remove existing messages if any
      const existingMessage = formGroup.querySelector('.success-message');
      if (existingMessage) {
        existingMessage.remove();
      }
      
      const existingError = formGroup.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }
      
      formGroup.appendChild(successElement);
      input.style.borderColor = '#d1fae5';
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successElement.remove();
        input.style.borderColor = '';
      }, 5000);
    }
  });