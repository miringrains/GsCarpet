/**
 * Custom Rug Size Calculator
 * Advanced pricing logic and utilities for custom rug calculations
 */

class RugPriceCalculator {
  constructor(options = {}) {
    this.basePricePerSqFt = options.basePricePerSqFt || 23;
    this.shapeMultipliers = {
      rectangle: 1.0,
      square: 1.0,
      round: 1.15,
      oval: 1.10,
      runner: 1.05
    };
    this.materialMultipliers = options.materialMultipliers || {
      wool: 1.0,
      jute: 0.8,
      silk: 2.5,
      synthetic: 0.7,
      cotton: 0.9
    };
  }

  /**
   * Calculate area based on dimensions and shape
   */
  calculateArea(width, length, shape = 'rectangle') {
    switch (shape) {
      case 'round':
        // For round rugs, use width as diameter
        const radius = width / 2;
        return Math.PI * radius * radius;
      
      case 'oval':
        // Oval area = π × a × b (where a and b are semi-axes)
        return Math.PI * (width / 2) * (length / 2);
      
      case 'square':
        // For square, length equals width
        return width * width;
      
      default:
        // Rectangle or runner
        return width * length;
    }
  }

  /**
   * Get size tier discount based on area
   */
  getSizeTierMultiplier(area) {
    if (area >= 200) return 0.90;  // 10% discount for very large rugs
    if (area >= 100) return 0.95;  // 5% discount for large rugs
    if (area >= 50) return 0.98;   // 2% discount for medium-large rugs
    return 1.0;
  }

  /**
   * Calculate total price
   */
  calculatePrice(dimensions, options = {}) {
    const {
      width,
      length,
      shape = 'rectangle',
      material = 'wool',
      includeProtection = false,
      includePad = false,
      padType = 'classic-detached'
    } = { ...dimensions, ...options };

    // Calculate base area
    const area = this.calculateArea(width, length, shape);
    
    // Base price calculation
    let price = area * this.basePricePerSqFt;
    
    // Apply shape multiplier
    price *= this.shapeMultipliers[shape] || 1.0;
    
    // Apply material multiplier
    price *= this.materialMultipliers[material] || 1.0;
    
    // Apply size tier discount
    price *= this.getSizeTierMultiplier(area);
    
    // Add-ons
    if (includeProtection) {
      // Protection treatment scales with size
      price += Math.max(62, area * 0.5);
    }
    
    if (includePad) {
      // Pad pricing
      const padPrices = {
        'classic-attached': 100,
        'classic-detached': 100,
        'dual-grip': 120
      };
      price += padPrices[padType] || 100;
    }
    
    // Round to nearest $5
    return Math.round(price / 5) * 5;
  }

  /**
   * Format dimension for display
   */
  formatDimension(feet, inches = 0) {
    if (inches === 0) {
      return `${feet}′`;
    }
    return `${feet}′ ${inches}″`;
  }

  /**
   * Format size for display
   */
  formatSize(width, length, shape = 'rectangle') {
    const widthDisplay = this.formatDimension(Math.floor(width), Math.round((width % 1) * 12));
    
    if (shape === 'round') {
      return `${widthDisplay} diameter`;
    }
    
    if (shape === 'square') {
      return widthDisplay;
    }
    
    const lengthDisplay = this.formatDimension(Math.floor(length), Math.round((length % 1) * 12));
    return `${widthDisplay} × ${lengthDisplay}`;
  }

  /**
   * Validate dimensions
   */
  validateDimensions(width, length, shape = 'rectangle') {
    const errors = [];
    
    // Minimum size validation
    const minSize = 2; // 2 feet minimum
    if (width < minSize) {
      errors.push(`Width must be at least ${minSize} feet`);
    }
    
    if (shape !== 'round' && shape !== 'square' && length < minSize) {
      errors.push(`Length must be at least ${minSize} feet`);
    }
    
    // Maximum size validation
    const maxWidth = 15;
    const maxLength = 25;
    
    if (width > maxWidth) {
      errors.push(`Width cannot exceed ${maxWidth} feet`);
    }
    
    if (shape !== 'round' && shape !== 'square' && length > maxLength) {
      errors.push(`Length cannot exceed ${maxLength} feet`);
    }
    
    // Shape-specific validation
    if (shape === 'round' && width > 15) {
      errors.push('Round rugs cannot exceed 15 feet in diameter');
    }
    
    if (shape === 'runner') {
      const ratio = length / width;
      if (ratio < 2.5) {
        errors.push('Runners should be at least 2.5 times longer than they are wide');
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Get room size recommendations
   */
  getRoomRecommendations() {
    return {
      'living-room': {
        small: { width: 5, length: 7, label: 'Small Living Room' },
        medium: { width: 8, length: 10, label: 'Medium Living Room' },
        large: { width: 9, length: 12, label: 'Large Living Room' }
      },
      'dining-room': {
        '4-seat': { width: 6, length: 8, label: '4-Seat Table' },
        '6-seat': { width: 8, length: 10, label: '6-Seat Table' },
        '8-seat': { width: 9, length: 12, label: '8-Seat Table' }
      },
      'bedroom': {
        twin: { width: 5, length: 8, label: 'Twin Bed' },
        queen: { width: 6, length: 9, label: 'Queen Bed' },
        king: { width: 8, length: 10, label: 'King Bed' }
      },
      'hallway': {
        narrow: { width: 2.5, length: 8, label: 'Narrow Hallway' },
        standard: { width: 3, length: 10, label: 'Standard Hallway' },
        wide: { width: 4, length: 12, label: 'Wide Hallway' }
      }
    };
  }

  /**
   * Convert between units
   */
  convertUnits(value, fromUnit, toUnit) {
    // Conversion factors to feet
    const toFeet = {
      'ft': 1,
      'in': 1 / 12,
      'cm': 1 / 30.48,
      'm': 3.28084
    };
    
    // Convert to feet first
    const inFeet = value * (toFeet[fromUnit] || 1);
    
    // Convert from feet to target unit
    const fromFeet = {
      'ft': 1,
      'in': 12,
      'cm': 30.48,
      'm': 0.3048
    };
    
    return inFeet * (fromFeet[toUnit] || 1);
  }
}

// Initialize global calculator instance
window.rugCalculator = new RugPriceCalculator();

// Alpine.js store for calculator state
document.addEventListener('alpine:init', () => {
  Alpine.store('calculator', {
    // State
    shape: 'rectangle',
    widthFeet: 5,
    widthInches: 0,
    lengthFeet: 5,
    lengthInches: 0,
    material: 'wool',
    includeProtection: false,
    includePad: false,
    padType: 'classic-detached',
    
    // Computed
    get width() {
      return this.widthFeet + (this.widthInches / 12);
    },
    
    get length() {
      return this.lengthFeet + (this.lengthInches / 12);
    },
    
    get area() {
      return window.rugCalculator.calculateArea(this.width, this.length, this.shape);
    },
    
    get price() {
      return window.rugCalculator.calculatePrice({
        width: this.width,
        length: this.length,
        shape: this.shape,
        material: this.material,
        includeProtection: this.includeProtection,
        includePad: this.includePad,
        padType: this.padType
      });
    },
    
    get displaySize() {
      return window.rugCalculator.formatSize(this.width, this.length, this.shape);
    },
    
    // Methods
    setDimensions(widthFeet, widthInches, lengthFeet, lengthInches) {
      this.widthFeet = widthFeet;
      this.widthInches = widthInches;
      this.lengthFeet = lengthFeet;
      this.lengthInches = lengthInches;
    },
    
    setShape(shape) {
      this.shape = shape;
      // For round/square, make length equal width
      if (shape === 'round' || shape === 'square') {
        this.lengthFeet = this.widthFeet;
        this.lengthInches = this.widthInches;
      }
    },
    
    validate() {
      return window.rugCalculator.validateDimensions(this.width, this.length, this.shape);
    }
  });
});

// Utility function for Shopify integration
window.addCustomRugToCart = async function(productId, properties) {
  const formData = new FormData();
  formData.append('id', productId);
  formData.append('quantity', 1);
  
  // Add all properties
  Object.entries(properties).forEach(([key, value]) => {
    formData.append(`properties[${key}]`, value);
  });
  
  try {
    const response = await fetch('/cart/add.js', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Failed to add to cart');
    }
    
    const result = await response.json();
    
    // Trigger cart update event
    document.dispatchEvent(new CustomEvent('cart:added', { detail: result }));
    
    return result;
  } catch (error) {
    console.error('Error adding custom rug to cart:', error);
    throw error;
  }
};