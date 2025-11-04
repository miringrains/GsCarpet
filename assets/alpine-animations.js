// Alpine.js Unified Animation System
// Provides consistent springy animations throughout the theme
// Consolidates: alpine-animations.js, spring-animations.js, animations.js

// Register custom Alpine transitions
document.addEventListener('alpine:init', () => {
  // Spring transition (default)
  Alpine.transition('spring', {
    enter(el, start, end) {
      return {
        in(transition) {
          transition
            .duration(400)
            .easing('cubic-bezier(0.175, 0.885, 0.32, 1.275)')
            .start(start)
            .end(end);
        },
        out(transition) {
          transition
            .duration(300)
            .easing('cubic-bezier(0.215, 0.61, 0.355, 1)')
            .start(end)
            .end(start);
        }
      };
    }
  });

  // Smooth fade transition
  Alpine.transition('fade', {
    enter(el, start, end) {
      return {
        in(transition) {
          transition
            .duration(300)
            .easing('cubic-bezier(0.25, 0.46, 0.45, 0.94)')
            .start({ opacity: 0 })
            .end({ opacity: 1 });
        },
        out(transition) {
          transition
            .duration(200)
            .easing('cubic-bezier(0.25, 0.46, 0.45, 0.94)')
            .start({ opacity: 1 })
            .end({ opacity: 0 });
        }
      };
    }
  });

  // Slide transitions
  Alpine.transition('slide-right', {
    enter(el, start, end) {
      return {
        in(transition) {
          transition
            .duration(400)
            .easing('cubic-bezier(0.215, 0.61, 0.355, 1)')
            .start({ transform: 'translateX(100%)' })
            .end({ transform: 'translateX(0)' });
        },
        out(transition) {
          transition
            .duration(300)
            .easing('cubic-bezier(0.215, 0.61, 0.355, 1)')
            .start({ transform: 'translateX(0)' })
            .end({ transform: 'translateX(100%)' });
        }
      };
    }
  });

  Alpine.transition('slide-left', {
    enter(el, start, end) {
      return {
        in(transition) {
          transition
            .duration(400)
            .easing('cubic-bezier(0.215, 0.61, 0.355, 1)')
            .start({ transform: 'translateX(-100%)' })
            .end({ transform: 'translateX(0)' });
        },
        out(transition) {
          transition
            .duration(300)
            .easing('cubic-bezier(0.215, 0.61, 0.355, 1)')
            .start({ transform: 'translateX(0)' })
            .end({ transform: 'translateX(-100%)' });
        }
      };
    }
  });

  Alpine.transition('slide-up', {
    enter(el, start, end) {
      return {
        in(transition) {
          transition
            .duration(400)
            .easing('cubic-bezier(0.215, 0.61, 0.355, 1)')
            .start({ transform: 'translateY(20px)', opacity: 0 })
            .end({ transform: 'translateY(0)', opacity: 1 });
        },
        out(transition) {
          transition
            .duration(300)
            .easing('cubic-bezier(0.215, 0.61, 0.355, 1)')
            .start({ transform: 'translateY(0)', opacity: 1 })
            .end({ transform: 'translateY(20px)', opacity: 0 });
        }
      };
    }
  });

  // Scale transitions
  Alpine.transition('scale', {
    enter(el, start, end) {
      return {
        in(transition) {
          transition
            .duration(400)
            .easing('cubic-bezier(0.175, 0.885, 0.32, 1.275)')
            .start({ transform: 'scale(0.9)', opacity: 0 })
            .end({ transform: 'scale(1)', opacity: 1 });
        },
        out(transition) {
          transition
            .duration(300)
            .easing('cubic-bezier(0.215, 0.61, 0.355, 1)')
            .start({ transform: 'scale(1)', opacity: 1 })
            .end({ transform: 'scale(0.9)', opacity: 0 });
        }
      };
    }
  });
});

// Scroll Animation System
class ScrollAnimations {
  constructor() {
    this.observers = new Map();
    this.init();
  }
  
  init() {
    if (this.prefersReducedMotion()) return;
    
    this.setupScrollAnimations();
    this.setupParallax();
    this.bindEvents();
  }
  
  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  
  setupScrollAnimations() {
    const scrollElements = document.querySelectorAll('[data-scroll-animate]');
    if (scrollElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('in-view')) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '-10%',
      threshold: 0.1
    });
    
    scrollElements.forEach(element => observer.observe(element));
    this.observers.set('scroll', observer);
  }
  
  setupParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.updateParallax(entry.target, entry.intersectionRatio);
        }
      });
    }, {
      threshold: Array.from({ length: 101 }, (_, i) => i / 100)
    });
    
    parallaxElements.forEach(element => observer.observe(element));
    this.observers.set('parallax', observer);
  }
  
  updateParallax(element, intersectionRatio) {
    const depth = parseFloat(element.dataset.parallax) || 0.1;
    const maxOffset = 100;
    const offset = (1 - intersectionRatio) * depth * maxOffset;
    
    element.style.transform = `translateY(${offset}px)`;
    element.style.willChange = 'transform';
    
    clearTimeout(element._parallaxTimeout);
    element._parallaxTimeout = setTimeout(() => {
      element.style.willChange = '';
    }, 200);
  }
  
  bindEvents() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.handleReducedMotion(prefersReducedMotion.matches);
    prefersReducedMotion.addEventListener('change', (e) => {
      this.handleReducedMotion(e.matches);
    });
  }
  
  handleReducedMotion(reducedMotion) {
    if (reducedMotion) {
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      parallaxElements.forEach(element => {
        element.style.transform = '';
      });
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  }
  
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// Header Scroll Animation
class HeaderScroll {
  constructor() {
    this.header = document.querySelector('.site-header');
    if (!this.header) return;
    
    this.init();
  }
  
  init() {
    let lastScroll = 0;
    let scrollTimer = null;
    
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      if (currentScroll > 100) {
        this.header.classList.add('header--scrolled');
      } else {
        this.header.classList.remove('header--scrolled');
      }
      
      if (currentScroll > lastScroll && currentScroll > 500) {
        this.header.classList.add('header--hidden');
      } else {
        this.header.classList.remove('header--hidden');
      }
      
      lastScroll = currentScroll;
    };
    
    window.addEventListener('scroll', () => {
      if (scrollTimer) return;
      scrollTimer = setTimeout(() => {
        handleScroll();
        scrollTimer = null;
      }, 10);
    });
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.scrollAnimations = new ScrollAnimations();
    window.headerScroll = new HeaderScroll();
  });
} else {
  window.scrollAnimations = new ScrollAnimations();
  window.headerScroll = new HeaderScroll();
}

// Export animation configuration
window.AlpineAnimations = {
  transitions: {
    spring: 'transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]',
    springFast: 'transition-all duration-[350ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]',
    springSubtle: 'transition-all duration-[400ms] ease-[cubic-bezier(0.215,0.61,0.355,1)]',
    smooth: 'transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
    base: 'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]'
  },
  easings: {
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    springSubtle: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    base: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
};
