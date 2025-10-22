// Alpine.js Unified Animation System
// Provides consistent springy animations throughout the theme

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

  // Register global animation utilities
  Alpine.magic('animate', () => {
    return {
      // Hover animations
      hover: {
        lift: 'transform: translateY(-2px) scale(1.02); box-shadow: 0 4px 12px rgba(0,0,0,0.1)',
        liftSubtle: 'transform: translateY(-1px); box-shadow: 0 2px 8px rgba(0,0,0,0.08)',
        scale: 'transform: scale(1.05)',
        scaleSubtle: 'transform: scale(1.02)',
        glow: 'box-shadow: 0 0 20px rgba(0,0,0,0.1)'
      },
      
      // Click animations
      click: {
        press: 'transform: scale(0.98)',
        bounce: 'transform: scale(0.95) translateY(1px)'
      },
      
      // Transition classes
      transition: {
        spring: 'transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]',
        springFast: 'transition-all duration-[350ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]',
        springSubtle: 'transition-all duration-[400ms] ease-[cubic-bezier(0.215,0.61,0.355,1)]',
        smooth: 'transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
        base: 'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]'
      }
    };
  });

  // Global enter/leave animations for common patterns
  Alpine.directive('animate', (el, { expression }, { effect, evaluateLater }) => {
    const getAnimation = evaluateLater(expression);
    
    effect(() => {
      getAnimation(animation => {
        if (animation === 'fadeIn') {
          el.style.animation = 'fadeIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        } else if (animation === 'slideUp') {
          el.style.animation = 'slideUp 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) forwards';
        } else if (animation === 'scaleIn') {
          el.style.animation = 'scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        }
      });
    });
  });
});

// CSS Keyframes for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes springPulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
  
  /* Utility classes for consistent animations */
  .animate-spring {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
  }
  
  .animate-spring-fast {
    transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
  }
  
  .animate-spring-subtle {
    transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) !important;
  }
  
  .animate-smooth {
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
  }
  
  .animate-base {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
  
  /* Hover utilities */
  .hover-lift {
    transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) !important;
  }
  
  .hover-lift:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  .hover-scale {
    transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) !important;
  }
  
  .hover-scale:hover {
    transform: scale(1.05);
  }
  
  /* Loading spinner with spring animation */
  @keyframes springRotate {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(1.1);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }
  
  .spring-spinner {
    animation: springRotate 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
  }
`;
document.head.appendChild(style);

// Export animation configuration for use in other scripts
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

