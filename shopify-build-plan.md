# Ernesta-Style Custom Rug Theme Implementation

## Design Philosophy: Modern Minimalism

### Visual Language

- **Whitespace as luxury**: Generous padding (40-80px sections), breathing room between elements
- **Typography-first**: Large, confident type sizes (18-20px body, 48-64px headings)
- **Subtle depth**: Box shadows instead of borders (`0 2px 8px rgba(0,0,0,0.04)`)
- **Geometric precision**: Perfect circles, squares, clean lines
- **Restrained palette**: 90% neutral, 10% accent color
- **No visual noise**: Remove all unnecessary dividers, decorations, gradients

### Reference Aesthetics

- Linear.app's clarity and space
- Stripe's sophisticated simplicity  
- Apple's product presentation
- High-end furniture sites (Herman Miller, Knoll)

## Libraries & Tools

### CSS Framework: Tailwind CSS

- Install via CDN for rapid prototyping: `<script src="https://cdn.tailwindcss.com"></script>`
- Custom configuration for our design system
- Utility-first approach perfect for Shopify's component structure

### Animation Libraries

- **AOS (Animate On Scroll)**: For subtle reveal animations
  ```html
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css" />
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  ```

- **Alpine.js**: For interactive components without heavy JavaScript
  ```html
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  ```


### Additional Tools

- **Swiper.js**: For product image carousels
- **Headless UI**: Accessible component patterns
- **Floating UI**: For tooltips and popovers

## Phase 1: Design System & Foundation

### Enhanced Color System

```css
:root {
  /* Backgrounds */
  --color-surface: #FFFFFF;
  --color-background: #FAFAFA;
  --color-background-subtle: #F5F5F7;
  
  /* Text */
  --color-text-primary: #000000;
  --color-text-secondary: #6B6B6B;
  --color-text-tertiary: #999999;
  
  /* Accents */
  --color-accent: #000000; /* Black as primary accent */
  --color-accent-hover: #333333;
  --color-success: #52C41A;
  
  /* Borders & Shadows */
  --color-border: rgba(0, 0, 0, 0.06);
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);
  
  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 3rem;
  --space-xl: 4rem;
  --space-2xl: 6rem;
  --space-3xl: 8rem;
  
  /* Animation */
  --transition-base: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Typography System

- Primary: Inter or DM Sans
- Display: Clash Display or similar geometric font
- Hierarchy:
  ```css
  .text-display { font-size: clamp(3rem, 5vw, 4.5rem); }
  .text-h1 { font-size: clamp(2.5rem, 4vw, 3.5rem); }
  .text-h2 { font-size: clamp(2rem, 3vw, 2.5rem); }
  .text-body { font-size: 1.125rem; line-height: 1.7; }
  ```


## Phase 2: Animated Components

### Micro-interactions

```javascript
// Subtle hover effects
.product-card {
  transition: var(--transition-base);
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

// Magnetic buttons
.btn-magnetic {
  position: relative;
  transition: var(--transition-base);
}
```

### Page Transitions

- Fade-in on scroll with stagger effect
- Smooth filter panel slide
- Number count-up animations
- Parallax scrolling for hero images

### Loading States

- Skeleton screens with shimmer effect
- Smooth content replacement
- Progress indicators for filters

## Phase 3: Enhanced Collection Page

### Filter Panel Design

```html
<div x-data="{ open: false }" class="relative">
  <!-- Floating filter button -->
  <button @click="open = !open" 
          class="fixed bottom-8 right-8 bg-black text-white rounded-full px-6 py-3 shadow-lg">
    <span x-show="!open">Filters</span>
    <span x-show="open">Close</span>
  </button>
  
  <!-- Slide-out panel -->
  <div x-show="open" 
       x-transition:enter="transform transition-transform duration-300"
       x-transition:enter-start="translate-x-full"
       x-transition:enter-end="translate-x-0"
       class="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl">
    <!-- Filter content -->
  </div>
</div>
```

### Product Grid Animation

```javascript
// Staggered fade-in
document.querySelectorAll('.product-card').forEach((card, index) => {
  card.setAttribute('data-aos', 'fade-up');
  card.setAttribute('data-aos-delay', index * 50);
});
```

## Phase 4: Interactive Elements

### Custom Size Calculator

- Animated number inputs with increment/decrement
- Real-time price updates with smooth transitions
- Visual size preview that scales
- Subtle haptic feedback on mobile

### Image Galleries

```javascript
// Smooth zoom on hover
.product-image {
  overflow: hidden;
}
.product-image img {
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.product-image:hover img {
  transform: scale(1.05);
}
```

## Phase 5: Performance & Polish

### Optimizations

- Lazy loading with blur-up effect
- Intersection Observer for animations
- CSS containment for better performance
- Critical CSS inlining

### Accessibility

- Focus-visible styling
- Keyboard navigation
- Screen reader announcements
- Reduced motion support

## Implementation Structur

```
assets/
  - tailwind.config.js (custom configuration)
  - theme.css (custom utilities and components)
  - animations.js (AOS + custom animations)
  - alpine-components.js (interactive components)
  
snippets/
  - animation-wrapper.liquid
  - loading-skeleton.liquid
  - hover-card.liquid
  - magnetic-button.liquid
  
sections/
  - hero-minimal.liquid (clean hero with parallax)
  - collection-modern.liquid (enhanced collection)
  - filter-panel.liquid (slide-out filters)
```

## Key Design Principles

1. **Invisible Design**: The interface should feel inevitable, not designed
2. **Purposeful Motion**: Every animation serves a function
3. **Consistent Rhythm**: Spacing follows a mathematical scale
4. **Refined Details**: Perfect alignment, consistent radiuses
5. **Progressive Disclosure**: Show complexity only when needed

This approach creates a theme that feels premium, modern, and effortlessly elegant—exactly what high-end rug shoppers expect.