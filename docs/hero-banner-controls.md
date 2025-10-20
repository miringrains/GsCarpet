# Hero Banner Section Controls

The hero banner section is now properly configured with all customization controls visible in the Shopify customizer.

## Structure

The section follows Shopify best practices:
1. **CSS File**: `/assets/section-hero-banner.css` - Contains all styles
2. **Section File**: `/sections/hero-banner.liquid` - Contains HTML structure and schema
3. **Dynamic Styles**: CSS variables defined in a `<style>` tag for dynamic values

## Available Controls

### Content Tab
- **Background image** - Upload your hero image
- **Subtitle** - Small text above the heading (e.g., "Premium Collection")
- **Heading** - Main hero title
- **Subheading** - Descriptive text under the heading
- **Button label** - Primary CTA button text
- **Button link** - Primary button destination
- **Second button label** - Optional secondary button
- **Second button link** - Secondary button destination

### Layout Tab
- **Contained width** - Toggle between full-width and contained with max-width
- **Height (desktop)** - Slider: 50-100vh in 5vh steps
- **Height (mobile)** - Slider: 50-100vh in 5vh steps
- **Border radius** - Slider: 0-40px in 4px steps (only applies when contained)
- **Text alignment** - Select: Left, Center, Right
- **Vertical alignment** - Select: Top, Center, Bottom
- **Content max width** - Slider: 600-1200px in 100px steps
- **Padding top** - Slider: 0-200px in 10px steps
- **Padding bottom** - Slider: 0-200px in 10px steps

### Typography Tab
- **Title size** - Slider: 2-6rem in 0.25rem steps
- **Title weight** - Select: Light (300), Regular (400), Medium (500), Semi-bold (600), Bold (700)
- **Subtitle size** - Slider: 0.75-2rem in 0.125rem steps
- **Text size** - Slider: 0.875-2rem in 0.125rem steps

### Colors Tab
- **Use custom colors** - Checkbox to enable custom color options
- **Background color** - Color picker (when custom colors enabled)
- **Text color** - Color picker (when custom colors enabled)

### Background Image Overlay Tab
- **Enable overlay** - Checkbox to add overlay on background image
- **Overlay color** - Color picker for overlay
- **Overlay opacity** - Slider: 0-100% in 5% steps

## How It Works

### CSS Variables
Dynamic values are set as CSS variables in the section:
```liquid
{%- style -%}
  #shopify-section-{{ section.id }} {
    --hero-height: {{ section.settings.height }}vh;
    --hero-border-radius: {{ section.settings.border_radius }}px;
    /* etc... */
  }
{%- endstyle -%}
```

### CSS Classes
The CSS file uses these variables:
```css
.hero-banner {
  min-height: var(--hero-height, 90vh);
  border-radius: var(--hero-border-radius, 0);
}
```

### Responsive Design
- Mobile styles automatically adjust sizing
- Text alignment can be forced to center on mobile
- Separate height controls for desktop and mobile

## Troubleshooting

If controls don't appear:
1. Clear your browser cache
2. Check that the CSS file exists at `/assets/section-hero-banner.css`
3. Ensure the schema in the section file is properly formatted
4. Try refreshing the customizer

## Customization Tips

1. **For full-width heroes**: Keep "Contained width" unchecked
2. **For rounded corners**: Check "Contained width" then adjust border radius
3. **For better text readability**: Use overlay with 30-50% opacity on images
4. **For mobile**: Test different heights as 90vh on mobile can be too tall
