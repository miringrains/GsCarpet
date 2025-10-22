/**
 * Spring Animation System
 * Origin-based animations with subtle parallax
 */

class SpringAnimations {
  constructor() {
    this.animationOrigins = new Map();
    this.parallaxElements = [];
    this.observers = new Map();
    
    this.init();
  }
  
  init() {
    this.setupOriginAnimations();
    this.setupParallax();
    this.setupScrollAnimations();
    this.bindEvents();
  }
  
  /**
   * Get element center for origin calculations
   */
  getElementCenter(element) {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }
  
  /**
   * Setup origin-based animations
   */
  setupOriginAnimations() {
    // Define animation origins
    this.animationOrigins.set('cart', () => {
      const cartIcon = document.querySelector('.header__cart-icon, [data-cart-icon]');
      return cartIcon ? this.getElementCenter(cartIcon) : { x: window.innerWidth - 50, y: 50 };
    });
    
    this.animationOrigins.set('search', () => {
      const searchIcon = document.querySelector('.header__search-icon, [data-search-icon]');
      return searchIcon ? this.getElementCenter(searchIcon) : { x: window.innerWidth - 100, y: 50 };
    });
    
    this.animationOrigins.set('filter', (trigger) => {
      return trigger ? this.getElementCenter(trigger) : { x: 100, y: 200 };
    });
    
    this.animationOrigins.set('quickview', (trigger) => {
      return trigger ? this.getElementCenter(trigger) : { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    });
  }
  
  /**
   * Animate element from origin point
   */
  animateFromOrigin(element, originType, trigger = null) {
    const origin = this.animationOrigins.get(originType);
    if (!origin) return;
    
    const originPoint = typeof origin === 'function' ? origin(trigger) : origin;
    const elementRect = element.getBoundingClientRect();
    const elementCenter = this.getElementCenter(element);
    
    // Calculate transform origin based on direction
    const transformOriginX = originPoint.x < elementCenter.x ? '0%' : '100%';
    const transformOriginY = originPoint.y < elementCenter.y ? '0%' : '100%';
    
    // Set transform origin
    element.style.transformOrigin = `${transformOriginX} ${transformOriginY}`;
    
    // Add animation class
    element.classList.add('animating-from-origin');
    
    // Clean up after animation
    element.addEventListener('animationend', () => {
      element.classList.remove('animating-from-origin');
      element.style.transformOrigin = '';
    }, { once: true });
  }
  
  /**
   * Setup parallax scrolling
   */
  setupParallax() {
    // Find all parallax elements
    this.parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (this.parallaxElements.length === 0) return;
    
    // Create intersection observer for parallax
    const parallaxObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.updateParallax(entry.target, entry.intersectionRatio);
        }
      });
    }, {
      threshold: Array.from({ length: 101 }, (_, i) => i / 100)
    });
    
    // Observe all parallax elements
    this.parallaxElements.forEach(element => {
      parallaxObserver.observe(element);
    });
    
    this.observers.set('parallax', parallaxObserver);
  }
  
  /**
   * Update parallax position
   */
  updateParallax(element, intersectionRatio) {
    const depth = parseFloat(element.dataset.parallax) || 0.1;
    const maxOffset = 100; // Maximum 100px movement
    
    // Calculate offset based on intersection ratio
    // Starts at maxOffset and moves to 0 as element comes into view
    const offset = (1 - intersectionRatio) * depth * maxOffset;
    
    // Apply transform
    element.style.transform = `translateY(${offset}px)`;
    element.style.willChange = 'transform';
    
    // Clean up will-change after animation settles
    clearTimeout(element._parallaxTimeout);
    element._parallaxTimeout = setTimeout(() => {
      element.style.willChange = '';
    }, 200);
  }
  
  /**
   * Setup scroll-triggered animations
   */
  setupScrollAnimations() {
    // Find all elements that should animate on scroll
    const scrollElements = document.querySelectorAll('[data-scroll-animate]');
    
    if (scrollElements.length === 0) return;
    
    // Create staggered animation observer
    const scrollObserver = new IntersectionObserver((entries) => {
      // Sort entries by their position in the document
      const sortedEntries = Array.from(entries).sort((a, b) => {
        return a.target.compareDocumentPosition(b.target) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
      });
      
      sortedEntries.forEach((entry, index) => {
        if (entry.isIntersecting && !entry.target.classList.contains('in-view')) {
          // Stagger animations by DOM order
          const delay = index * 40; // 40ms between each element
          entry.target.style.transitionDelay = `${delay}ms`;
          
          // Add class after a frame to ensure transition works
          requestAnimationFrame(() => {
            entry.target.classList.add('in-view');
          });
          
          // Clean up delay after animation
          setTimeout(() => {
            entry.target.style.transitionDelay = '';
          }, 400 + delay);
        }
      });
    }, {
      rootMargin: '-10%',
      threshold: 0.1
    });
    
    // Observe all scroll elements
    scrollElements.forEach(element => {
      scrollObserver.observe(element);
    });
    
    this.observers.set('scroll', scrollObserver);
  }
  
  /**
   * Bind global events
   */
  bindEvents() {
    // Handle cart drawer animations
    document.addEventListener('cart:open', (e) => {
      const cartDrawer = document.querySelector('.cart-drawer__content');
      if (cartDrawer) {
        this.animateFromOrigin(cartDrawer, 'cart', e.detail?.trigger);
      }
    });
    
    // Handle search modal animations
    document.addEventListener('search:open', (e) => {
      const searchModal = document.querySelector('.header__search-modal');
      if (searchModal) {
        this.animateFromOrigin(searchModal, 'search', e.detail?.trigger);
      }
    });
    
    // Handle quick view animations
    document.addEventListener('quickview:open', (e) => {
      const quickViewModal = document.querySelector('.quick-view-modal__content');
      if (quickViewModal) {
        this.animateFromOrigin(quickViewModal, 'quickview', e.detail?.trigger);
      }
    });
    
    // Handle filter animations
    document.addEventListener('filter:toggle', (e) => {
      const filterPanel = document.querySelector('.collection-filters');
      if (filterPanel) {
        this.animateFromOrigin(filterPanel, 'filter', e.detail?.trigger);
      }
    });
    
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.handleReducedMotion(prefersReducedMotion.matches);
    prefersReducedMotion.addEventListener('change', (e) => {
      this.handleReducedMotion(e.matches);
    });
  }
  
  /**
   * Handle reduced motion preference
   */
  handleReducedMotion(reducedMotion) {
    if (reducedMotion) {
      // Disable parallax
      this.parallaxElements.forEach(element => {
        element.style.transform = '';
      });
      
      // Add class to body for CSS adjustments
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  }
  
  /**
   * Destroy observers and clean up
   */
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.animationOrigins.clear();
    this.parallaxElements = [];
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.springAnimations = new SpringAnimations();
  });
} else {
  window.springAnimations = new SpringAnimations();
}

// Export for use in other scripts
window.SpringAnimations = SpringAnimations;
