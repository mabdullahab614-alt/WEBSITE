/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThreeCanvas } from './components/ThreeCanvas.tsx';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ProductsSection } from './components/ProductsSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { ProductModal } from './components/ProductModal.tsx';
import { INITIAL_PRODUCTS, PHONE_COLORS } from './data/products.ts';
import { Product, CartItem, PhoneColorConfig } from './types.ts';
import { ShoppingBag } from 'lucide-react';

export default function App() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedPhoneColor, setSelectedPhoneColor] = useState<PhoneColorConfig>(PHONE_COLORS[0]);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);

  // Cart total items count
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Add to cart handler
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  // Update item quantity
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  // Remove item
  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Toggle rotation speed between Normal (1), Fast (2), and Paused (0)
  const handleToggleSpeed = () => {
    setRotationSpeed((prev) => (prev === 1 ? 2 : prev === 2 ? 0 : 1));
  };

  return (
    <div className="relative min-h-screen text-white bg-[#0a0a1a] selection:bg-[#00e5ff] selection:text-black">
      {/* 3D Background Canvas */}
      <ThreeCanvas
        phoneColor={selectedPhoneColor.threeColor}
        rotationSpeed={rotationSpeed}
      />

      {/* Navigation Bar */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection
          selectedColor={selectedPhoneColor}
          onSelectColor={setSelectedPhoneColor}
          rotationSpeed={rotationSpeed}
          onToggleSpeed={handleToggleSpeed}
        />

        <ProductsSection
          products={products}
          onAddToCart={(product) => handleAddToCart(product, 1)}
          onQuickView={(product) => setQuickViewProduct(product)}
        />

        <AboutSection />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Fixed Floating Cart Button matching PDF (#cart) */}
      <button
        id="cart"
        onClick={() => setIsCartOpen(true)}
        aria-label={`Open Cart (${cartCount} items)`}
        className="fixed right-5 bottom-5 z-40 bg-[#7c4dff] hover:bg-[#00e5ff] text-white hover:text-black px-5 py-3.5 rounded-full font-bold shadow-xl shadow-[#7c4dff]/40 hover:shadow-[#00e5ff]/50 transition-all cursor-pointer flex items-center gap-2 transform hover:scale-105 active:scale-95"
      >
        <ShoppingBag className="w-5 h-5" />
        <span>Cart:</span>
        <span id="count" className="font-mono text-sm">
          {cartCount}
        </span>
      </button>

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Product Quick-View Specification Modal */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
