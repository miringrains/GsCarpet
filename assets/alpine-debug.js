// Alpine.js Debug Helper
console.log('🔍 Alpine Debug: Script loaded');

// Check if Alpine is available
if (window.Alpine) {
  console.log('✅ Alpine is available on window');
} else {
  console.error('❌ Alpine is NOT available on window');
}

// Check Alpine stores after Alpine init
document.addEventListener('alpine:init', () => {
  console.log('🚀 Alpine init event fired');
  
  // Check cart store
  if (Alpine.store('cart')) {
    console.log('✅ Cart store is initialized', Alpine.store('cart'));
  } else {
    console.error('❌ Cart store is NOT initialized');
  }
  
  // Check quickView store
  if (Alpine.store('quickView')) {
    console.log('✅ QuickView store is initialized', Alpine.store('quickView'));
  } else {
    console.error('❌ QuickView store is NOT initialized');
  }
});

// Check Alpine components after initialization
document.addEventListener('alpine:initialized', () => {
  console.log('🎯 Alpine initialized event fired');
  
  // Check if components are registered
  console.log('📦 Registered Alpine data:', Object.keys(Alpine.data || {}));
});

// Log any Alpine errors
window.addEventListener('error', (e) => {
  if (e.message && e.message.includes('Alpine')) {
    console.error('🔥 Alpine Error:', e.message);
  }
});
