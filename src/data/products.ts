import { Product, PhoneColorConfig } from '../types.ts';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'phone-x',
    name: 'Smartphone X',
    price: 699,
    originalPrice: 799,
    category: 'smartphones',
    iconSymbol: '📱',
    rating: 4.9,
    reviewsCount: 342,
    badge: 'Hero Flagship',
    tagline: 'Super AMOLED 120Hz, Triple 50MP AI Matrix, SnapDragon 8 Gen 3',
    specs: ['6.7" OLED 120Hz', '5000 mAh Battery', '256GB / 12GB RAM', 'Titanium Frame'],
    inStock: true,
    colors: ['#00e5ff', '#7c4dff', '#1b1b2f', '#ffc107']
  },
  {
    id: 'wireless-earbuds',
    name: 'Wireless Earbuds',
    price: 49,
    originalPrice: 69,
    category: 'audio',
    iconSymbol: '🎧',
    rating: 4.8,
    reviewsCount: 189,
    badge: 'Best Seller',
    tagline: 'Active Noise Canceling with 36hr Battery and Spatial Audio',
    specs: ['40dB Active Hybrid ANC', '36h Playtime with case', 'IPX5 Water Resistant', 'Bluetooth 5.3 Low-Latency'],
    inStock: true,
    colors: ['#ffffff', '#0a0a1a', '#00e5ff']
  },
  {
    id: 'fast-charger-65w',
    name: 'Fast Charger 65W',
    price: 25,
    originalPrice: 35,
    category: 'power',
    iconSymbol: '⚡',
    rating: 4.9,
    reviewsCount: 220,
    badge: 'GaN III Fast',
    tagline: 'Ultra-compact Gallium Nitride dual USB-C + USB-A fast charging',
    specs: ['65W GaN III Technology', 'Dual USB-C PD 3.0', 'Universal Laptop/Phone support', 'Surge & Heat Protection'],
    inStock: true
  },
  {
    id: 'power-bank-20000',
    name: 'Power Bank 20000mAh',
    price: 35,
    originalPrice: 45,
    category: 'power',
    iconSymbol: '🔋',
    rating: 4.7,
    reviewsCount: 164,
    badge: 'High Capacity',
    tagline: 'Charge up to 3 devices simultaneously with digital LED percentage display',
    specs: ['20,000mAh Lithium-Polymer', '22.5W Two-Way Fast Charge', 'LED Battery Display', 'Airline Approved'],
    inStock: true
  },
  {
    id: 'tempered-glass',
    name: 'Tempered Glass',
    price: 8,
    originalPrice: 12,
    category: 'protection',
    iconSymbol: '🛡️',
    rating: 4.9,
    reviewsCount: 512,
    badge: '9H Hardness',
    tagline: 'Oleophobic anti-fingerprint, 0.26mm crystal-clear 9H diamond shield',
    specs: ['9H Hardness Shatterproof', 'Edge-to-Edge 2.5D Curved', 'Anti-Fingerprint Coating', 'Easy Alignment Frame'],
    inStock: true
  },
  {
    id: 'armor-phone-case',
    name: 'Armor Phone Case',
    price: 15,
    originalPrice: 22,
    category: 'protection',
    iconSymbol: '🧲',
    rating: 4.8,
    reviewsCount: 295,
    badge: 'Drop Tested',
    tagline: 'Military drop-tested shockproof bumper with built-in magnetic ring',
    specs: ['12ft Military Drop Protection', 'MagSafe Compatible', 'Air-Cushioned Corners', 'Raised Camera Lip'],
    inStock: true,
    colors: ['#00e5ff', '#7c4dff', '#1b1b2f']
  },
  {
    id: 'smart-watch',
    name: 'Smart Watch',
    price: 89,
    originalPrice: 119,
    category: 'wearables',
    iconSymbol: '⌚',
    rating: 4.7,
    reviewsCount: 140,
    badge: 'AMOLED Dial',
    tagline: 'All-day SpO2, Heart Rate, 100+ Workout Modes and Bluetooth Calling',
    specs: ['1.43" HD AMOLED Always-On', '7-Day Battery Life', 'Heart Rate & Sleep Monitor', '5ATM Waterproof'],
    inStock: true,
    colors: ['#1b1b2f', '#7c4dff', '#00e5ff']
  },
  {
    id: 'bluetooth-speaker',
    name: 'Bluetooth Speaker',
    price: 40,
    originalPrice: 55,
    category: 'audio',
    iconSymbol: '🔊',
    rating: 4.8,
    reviewsCount: 98,
    badge: '360° Sound',
    tagline: 'Deep punchy bass, RGB reactive sync lights, and IPX7 waterproof housing',
    specs: ['20W High Output Bass', 'RGB Beat-Synced Ring', '14 Hours Playback', 'TWS Stereo Pairing'],
    inStock: true,
    colors: ['#0a0a1a', '#00e5ff', '#7c4dff']
  }
];

export const PHONE_COLORS: PhoneColorConfig[] = [
  { name: 'Cyber Cyan', hex: '#00e5ff', accent: 'cyan', threeColor: 0x00e5ff },
  { name: 'Neon Purple', hex: '#7c4dff', accent: 'purple', threeColor: 0x7c4dff },
  { name: 'Deep Space', hex: '#1b1b2f', accent: 'slate', threeColor: 0x1b1b2f },
  { name: 'Sunset Amber', hex: '#ffc107', accent: 'amber', threeColor: 0xffc107 },
  { name: 'Neon Pink', hex: '#ff4081', accent: 'pink', threeColor: 0xff4081 }
];
