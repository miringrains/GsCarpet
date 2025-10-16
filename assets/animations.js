/**
 * Ernesta-Style Premium Theme Animations
 * Smooth, sophisticated animations and interactions
 */

class ThemeAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Initialize all animation modules
    this.initScrollAnimations();
    this.initHeaderScroll();
    this.initImageLazyLoad();
    this.initProductCardHovers();
    this.initSmoothScroll();
    this.initNumberCounters();
  }

  /**
   * Scroll-triggered animations using Intersection Observer
   */
  initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if (!animatedElements.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animation = element.dataset.animate || 'fade-in';
          const delay = element.dataset.animateDelay || 0;
          
          setTimeout(() => {
            element.classList.add('animated', animation);
          }, delay);
          
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    animatedElements.forEach(element => observer.observe(element));
  }

  /**
   * Sticky header with background transition
   */
  initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScroll = 0;
    let scrollTimer = null;
    
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      // Add/remove scrolled class
      if (currentScroll > 100) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
      
      // Hide/show header on scroll
      if (currentScroll > lastScroll && currentScroll > 500) {
        header.classList.add('header--hidden');
      } else {
        header.classList.remove('header--hidden');
      }
      
      lastScroll = currentScroll;
    };

    // Throttle scroll events
    window.addEventListener('scroll', () => {
      if (scrollTimer) return;
      
      scrollTimer = setTimeout(() => {
        handleScroll();
        scrollTimer = null;
      }, 10);
    });
  }

  /**
   * Image lazy loading with fade-in effect
   */
  initImageLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-lazy]');
    
    if (!lazyImages.length) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.lazy;
          
          // Create temp image to preload
          const tempImg = new Image();
          tempImg.src = src;
          
          tempImg.onload = () => {
            img.src = src;
            img.classList.add('loaded');
            img.removeAttribute('data-lazy');
          };
          
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px'
    });

    lazyImages.forEach(img => {
      imageObserver.observe(img);
      img.classList.add('lazy-image');
    });
  }

  /**
   * Product card hover effects
   */
  initProductCardHovers() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
      const images = card.querySelectorAll('.product-card__image img');
      
      if (images.length > 1) {
        // Multiple images - swap on hover
        card.addEventListener('mouseenter', () => {
          images[0].style.opacity = '0';
          images[1].style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
          images[0].style.opacity = '1';
          images[1].style.opacity = '0';
        });
      }
      
      // Magnetic button effect
      const button = card.querySelector('.btn-magnetic');
      if (button) {
        this.addMagneticEffect(button);
      }
    });
  }

  /**
   * Magnetic button effect
   */
  addMagneticEffect(element) {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translate(0, 0)';
    });
  }

  /**
   * Smooth scroll for anchor links
   */
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (!target) return;
        
        e.preventDefault();
        
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    });
  }

  /**
   * Animated number counters
   */
  initNumberCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    if (!counters.length) return;

    const observerOptions = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.counter);
          const duration = parseInt(counter.dataset.duration) || 2000;
          const increment = target / (duration / 16);
          
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString();
          }, 16);
          
          observer.unobserve(counter);
        }
      });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
  }

  /**
   * Parallax scrolling effect
   */
  static initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (!parallaxElements.length) return;

    let ticking = false;
    
    const updateParallax = () => {
      const scrolled = window.scrollY;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }
}

// Animation utility functions
const AnimationUtils = {
  /**
   * Stagger animation for a group of elements
   */
  staggerAnimate(elements, animation = 'fade-in', delay = 50) {
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animated', animation);
      }, index * delay);
    });
  },

  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /**
   * Debounce function for performance
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

// Initialize animations when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!AnimationUtils.prefersReducedMotion()) {
      new ThemeAnimations();
      ThemeAnimations.initParallax();
    }
  });
} else {
  if (!AnimationUtils.prefersReducedMotion()) {
    new ThemeAnimations();
    ThemeAnimations.initParallax();
  }
}

// Export for use in other scripts
window.ThemeAnimations = ThemeAnimations;
window.AnimationUtils = AnimationUtils;
