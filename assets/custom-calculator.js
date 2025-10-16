/**
 * Custom Size Calculator for Rugs
 * Handles size calculations, price updates, and cart integration
 */

class CustomSizeCalculator {
  constructor() {
    this.init();
  }

  init() {
    // Initialize Alpine.js components for size calculator
    document.addEventListener('alpine:init', () => {
      Alpine.data('advancedSizeCalculator', () => ({
        // State
        sizeMode: 'standard',
        shape: 'rectangle',
        width: 8,
        length: 10,
        unit: 'ft',
        basePrice: 25,
        quantity: 1,
        
        // Room presets
        roomPresets: {
          living: { width: 8, length: 10, name: 'Living Room' },
          dining: { width: 9, length: 12, name: 'Dining Room' },
          bedroom: { width: 6, length: 9, name: 'Bedroom' },
          hallway: { width: 3, length: 10, name: 'Hallway' },
          entryway: { width: 5, length: 7, name: 'Entryway' },
          kitchen: { width: 5, length: 8, name: 'Kitchen' }
        },
        
        // Initialize
        init() {
          // Get base price from product metafields if available
          const priceElement = document.querySelector('[data-price-per-sqft]');
          if (priceElement) {
            this.basePrice = parseFloat(priceElement.dataset.pricePerSqft);
          }
          
          // Load saved preferences
          this.loadPreferences();
        },
        
        // Computed properties
        get widthInFeet() {
          return this.convertToFeet(this.width, this.unit);
        },
        
        get lengthInFeet() {
          return this.convertToFeet(this.length, this.unit);
        },
        
        get area() {
          const w = this.widthInFeet;
          const l = this.lengthInFeet;
          
          switch (this.shape) {
            case 'round':
              return Math.PI * Math.pow(w / 2, 2);
            case 'oval':
              return Math.PI * (w / 2) * (l / 2);
            default:
              return w * l;
          }
        },
        
        get totalPrice() {
          return this.area * this.basePrice * this.quantity;
        },
        
        get pricePerRug() {
          return this.area * this.basePrice;
        },
        
        get sizeText() {
          if (this.shape === 'square' || this.shape === 'round') {
            return `${this.width} ${this.unit}`;
          }
          return `${this.width} x ${this.length} ${this.unit}`;
        },
        
        get areaText() {
          return `${this.area.toFixed(1)} sq ft`;
        },
        
        // Methods
        selectShape(shape) {
          this.shape = shape;
          
          // Adjust dimensions for special shapes
          if (shape === 'square') {
            this.length = this.width;
          } else if (shape === 'runner') {
            this.width = 3;
            this.length = 10;
          }
          
          this.savePreferences();
        },
        
        selectStandardSize(width, length) {
          this.sizeMode = 'standard';
          this.width = width;
          this.length = length;
          this.shape = 'rectangle';
          this.unit = 'ft';
          this.savePreferences();
        },
        
        selectRoomPreset(roomType) {
          const preset = this.roomPresets[roomType];
          if (preset) {
            this.width = preset.width;
            this.length = preset.length;
            this.shape = 'rectangle';
            this.unit = 'ft';
          }
        },
        
        convertToFeet(value, fromUnit) {
          switch (fromUnit) {
            case 'in':
              return value / 12;
            case 'cm':
              return value / 30.48;
            default:
              return value;
          }
        },
        
        convertFromFeet(value, toUnit) {
          switch (toUnit) {
            case 'in':
              return value * 12;
            case 'cm':
              return value * 30.48;
            default:
              return value;
          }
        },
        
        changeUnit(newUnit) {
          // Convert current values to new unit
          const widthInFeet = this.convertToFeet(this.width, this.unit);
          const lengthInFeet = this.convertToFeet(this.length, this.unit);
          
          this.width = Math.round(this.convertFromFeet(widthInFeet, newUnit) * 10) / 10;
          this.length = Math.round(this.convertFromFeet(lengthInFeet, newUnit) * 10) / 10;
          this.unit = newUnit;
          
          this.savePreferences();
        },
        
        validateDimensions() {
          // Minimum and maximum sizes
          const minSize = 1;
          const maxSize = 30; // feet
          
          const widthInFeet = this.widthInFeet;
          const lengthInFeet = this.lengthInFeet;
          
          if (widthInFeet < minSize || lengthInFeet < minSize) {
            return { valid: false, message: 'Minimum size is 1 ft' };
          }
          
          if (widthInFeet > maxSize || lengthInFeet > maxSize) {
            return { valid: false, message: 'Maximum size is 30 ft' };
          }
          
          return { valid: true };
        },
        
        formatPrice(price) {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(price);
        },
        
        savePreferences() {
          // Save user preferences to localStorage
          const preferences = {
            shape: this.shape,
            unit: this.unit,
            lastWidth: this.width,
            lastLength: this.length
          };
          localStorage.setItem('rugCalculatorPrefs', JSON.stringify(preferences));
        },
        
        loadPreferences() {
          // Load saved preferences
          const saved = localStorage.getItem('rugCalculatorPrefs');
          if (saved) {
            try {
              const prefs = JSON.parse(saved);
              this.shape = prefs.shape || 'rectangle';
              this.unit = prefs.unit || 'ft';
            } catch (e) {
              console.error('Error loading preferences:', e);
            }
          }
        },
        
        async addToCart() {
          const validation = this.validateDimensions();
          if (!validation.valid) {
            alert(validation.message);
            return;
          }
          
          // Prepare cart data
          const formData = new FormData();
          const variantId = document.querySelector('[name="id"]').value;
          
          formData.append('id', variantId);
          formData.append('quantity', this.quantity);
          
          // Add custom properties
          formData.append('properties[Shape]', this.shape.charAt(0).toUpperCase() + this.shape.slice(1));
          formData.append('properties[Size]', this.sizeText);
          formData.append('properties[Area]', this.areaText);
          formData.append('properties[Unit Price]', this.formatPrice(this.pricePerRug));
          formData.append('properties[Total Price]', this.formatPrice(this.totalPrice));
          
          if (this.shape !== 'square' && this.shape !== 'round') {
            formData.append('properties[Width]', `${this.width} ${this.unit}`);
            formData.append('properties[Length]', `${this.length} ${this.unit}`);
          } else {
            const dimension = this.shape === 'round' ? 'Diameter' : 'Size';
            formData.append(`properties[${dimension}]`, `${this.width} ${this.unit}`);
          }
          
          try {
            const response = await fetch('/cart/add.js', {
              method: 'POST',
              body: formData
            });
            
            if (response.ok) {
              const item = await response.json();
              
              // Trigger cart update event
              document.dispatchEvent(new CustomEvent('cart:added', {
                detail: { item, quantity: this.quantity }
              }));
              
              // Open cart drawer if available
              if (window.Alpine && Alpine.store('cart')) {
                Alpine.store('cart').openDrawer();
              }
              
              // Show success message
              this.showSuccessMessage();
            } else {
              throw new Error('Failed to add to cart');
            }
          } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Error adding to cart. Please try again.');
          }
        },
        
        showSuccessMessage() {
          // Create and show success notification
          const notification = document.createElement('div');
          notification.className = 'cart-notification';
          notification.innerHTML = `
            <div class="cart-notification__content">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm-1 15l-5-5 1.41-1.41L9 12.17l7.59-7.59L18 6l-9 9z"/>
              </svg>
              <span>Custom rug added to cart!</span>
            </div>
          `;
          
          document.body.appendChild(notification);
          
          // Animate in
          setTimeout(() => {
            notification.classList.add('cart-notification--visible');
          }, 10);
          
          // Remove after 3 seconds
          setTimeout(() => {
            notification.classList.remove('cart-notification--visible');
            setTimeout(() => {
              notification.remove();
            }, 300);
          }, 3000);
        }
      }));
    });
  }
  
  // Utility functions
  static calculateShipping(area, location = 'US') {
    // Calculate shipping based on size and location
    const baseShipping = 15;
    const perSqFt = 0.5;
    
    let shipping = baseShipping + (area * perSqFt);
    
    // International shipping
    if (location !== 'US') {
      shipping *= 2.5;
    }
    
    // Free shipping threshold
    if (shipping > 100 && location === 'US') {
      shipping = 0;
    }
    
    return shipping;
  }
  
  static estimateProductionTime(area) {
    // Estimate production time based on size
    const baseDays = 7;
    const perSqFt = 0.2;
    
    const days = Math.ceil(baseDays + (area * perSqFt));
    
    return {
      min: days,
      max: days + 3,
      text: `${days}-${days + 3} business days`
    };
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CustomSizeCalculator();
  });
} else {
  new CustomSizeCalculator();
}

// Export for use in other scripts
window.CustomSizeCalculator = CustomSizeCalculator;

// Add notification styles
const styles = `
  .cart-notification {
    position: fixed;
    top: 100px;
    right: 20px;
    z-index: 9999;
    transform: translateX(400px);
    transition: transform 0.3s ease;
  }
  
  .cart-notification--visible {
    transform: translateX(0);
  }
  
  .cart-notification__content {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 24px;
    background-color: #000;
    color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    font-size: 16px;
    font-weight: 500;
  }
  
  .cart-notification__content svg {
    flex-shrink: 0;
    color: #52C41A;
  }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
