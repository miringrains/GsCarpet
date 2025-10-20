# Reference Components from Premium Themes

This directory contains reference components from verified GitHub repositories that you can use as inspiration or directly adapt for your theme.

## Sources

### 1. **Shopify Dawn** (Official - Actively Maintained)
- **Repository:** `github.com/Shopify/dawn`
- **Description:** Shopify's flagship theme with modern best practices

### 2. **Archetype Themes** (Component Library)
- **Repository:** `github.com/archetype-themes/reference-theme`
- **Description:** Component-first development approach

## Available Components

### From Dawn Theme:
- **dawn-image-banner.liquid** - Full-featured hero banner with:
  - Multiple height options (small, medium, large, adapt)
  - Text positioning controls
  - Overlay opacity
  - Mobile/desktop content alignment
  - Animation effects (ambient, zoom-in, fixed)
  
- **dawn-rich-text.liquid** - Content section with:
  - Heading and text blocks
  - Button support
  - Size controls
  
- **dawn-multicolumn.liquid** - Multi-column layout for:
  - Feature lists
  - Team members
  - Product benefits
  
- **dawn-slideshow.liquid** - Advanced carousel with:
  - Auto-play
  - Navigation controls
  - Multiple slides
  
- **dawn-featured-collection.liquid** - Product grid section
- **dawn-collection-list.liquid** - Collection showcase

### From Archetype Themes:
- **archetype-media-with-text.liquid** - Image + text combinations
- **archetype-section-header/** - Reusable section headers
- **archetype-product-gallery/** - Advanced product image gallery

## How to Use

1. **Review the code** - Each component shows production-ready patterns
2. **Copy what you need** - Don't copy blindly, understand the structure
3. **Adapt the styling** - Match your theme's design system
4. **Test thoroughly** - Ensure compatibility with your theme

## Key Patterns to Learn:

### From Dawn:
- Responsive image loading with `srcset`
- Accessibility patterns
- Schema organization
- CSS class naming (BEM-style)
- Animation triggers

### From Archetype:
- Component-first architecture
- Modular JavaScript
- Advanced Liquid patterns
- Performance optimizations

## CSS Dependencies

Most Dawn components expect these CSS files:
- `base.css` - Global styles
- `section-[name].css` - Section-specific styles
- `component-[name].css` - Component styles

## JavaScript Dependencies

Dawn uses:
- Web Components for interactivity
- Minimal vanilla JavaScript
- No jQuery dependency

## Tips:

1. **Start with Dawn** - It's the most modern and maintained
2. **Look for patterns** - Don't just copy, understand why
3. **Check dependencies** - Some components need specific JS/CSS
4. **Test on mobile** - All components should be responsive
5. **Validate accessibility** - Use proper ARIA labels

## Need More?

Other repositories to explore:
- Browse `github.com/topics/shopify-theme`
- Check Shopify Partner Slack for shared code
- Look at theme marketplace for inspiration
