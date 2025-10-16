# Theme Architecture & Organization

## Directory Structure

```
skeleton-theme/
├── assets/              # CSS, JS, images, fonts
│   ├── base/           # Core styles (proposed)
│   ├── components/     # Component styles (proposed)
│   └── utilities/      # Utility styles (proposed)
├── config/             # Theme settings
├── layout/             # Main theme layout
├── locales/            # Translations
├── sections/           # Page sections
│   ├── global/         # Header, footer, etc (proposed)
│   ├── homepage/       # Homepage sections (proposed)
│   ├── product/        # Product page sections (proposed)
│   └── collection/     # Collection sections (proposed)
├── snippets/           # Reusable components
│   ├── components/     # UI components (proposed)
│   ├── product/        # Product-related (proposed)
│   └── utilities/      # Helper snippets (proposed)
└── templates/          # Page templates

## Current Issues & Solutions

### 1. Duplicate Code
**Issue**: Multiple files have similar structures (modals, overlays, forms)
**Solution**: Create base components that can be extended

### 2. Inconsistent Naming
**Issue**: Mix of naming conventions (kebab-case, camelCase)
**Solution**: Standardize on kebab-case for files, BEM for CSS classes

### 3. Scattered Configurations
**Issue**: Colors, spacing defined in multiple places
**Solution**: Centralize in css-variables.liquid and settings_schema.json

### 4. Component Dependencies
**Issue**: Components depend on specific Alpine stores/data
**Solution**: Document dependencies at top of each file

## Proposed Refactoring

### Phase 1: Consolidate Styles
- Move all component styles from sections to dedicated CSS files
- Create `theme-components.css` for shared components
- Create `theme-utilities.css` for utility classes

### Phase 2: Organize Snippets
- Group related snippets in subdirectories
- Create base snippets for common patterns:
  - `base-modal.liquid`
  - `base-overlay.liquid`
  - `base-form.liquid`

### Phase 3: Standardize JavaScript
- Move all Alpine components to `alpine-components.js`
- Create proper module structure
- Add JSDoc comments for all functions

### Phase 4: Documentation
- Add README.md for each major directory
- Document component APIs and dependencies
- Create style guide for consistency

## Component Registry

### Modals
- `cart-drawer.liquid` - Cart sidebar
- `quick-view-modal.liquid` - Product quick view
- `size-calculator-ernesta.liquid` - Custom size calculator

### Forms
- `collection-filter-group.liquid` - Filter components
- `cleaning-product-selector.liquid` - Add-on selector
- `rug-pad-selector.liquid` - Rug pad options

### Sections
- `hero-minimal.liquid` - Homepage hero
- `featured-collections.liquid` - Collection grid
- `testimonials-minimal.liquid` - Customer reviews
- `announcement-bar.liquid` - Top announcements

## Best Practices

1. **File Naming**: Use descriptive names with purpose prefix
   - `section-[name].liquid`
   - `component-[name].liquid`
   - `utility-[name].liquid`

2. **CSS Organization**: Follow ITCSS methodology
   - Settings (variables)
   - Tools (mixins, functions)
   - Generic (resets)
   - Elements (base styles)
   - Objects (layout patterns)
   - Components (UI components)
   - Utilities (helpers)

3. **JavaScript Structure**:
   ```javascript
   // Component definition
   Alpine.data('componentName', () => ({
     // Properties
     property: value,
     
     // Lifecycle
     init() {},
     
     // Methods
     method() {},
     
     // Computed
     get computed() {}
   }));
   ```

4. **Liquid Patterns**:
   ```liquid
   {% comment %}
     Component: Name
     Description: What it does
     Dependencies: Alpine stores, CSS files
     Usage: {% render 'component-name', param: value %}
   {% endcomment %}
   ```

## Migration Plan

1. **Audit Current Code** (Week 1)
   - List all duplications
   - Identify shared patterns
   - Document dependencies

2. **Create Base Components** (Week 2)
   - Extract common code
   - Create extensible bases
   - Test thoroughly

3. **Refactor Existing** (Week 3-4)
   - Update components to use bases
   - Remove duplications
   - Update documentation

4. **Implement Standards** (Ongoing)
   - Code reviews
   - Linting rules
   - Team training
