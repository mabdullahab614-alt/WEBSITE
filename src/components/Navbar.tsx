import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Shop', href: '#shop' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[rgba(10,10,26,0.75)] backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-2 group text-decoration-none">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00e5ff] to-[#7c4dff] flex items-center justify-center text-black font-extrabold shadow-lg shadow-[#00e5ff]/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-black" />
          </div>
          <span className="text-2xl font-black tracking-tight text-[#00e5ff] group-hover:text-cyan-300 transition-colors">
            GadgetHub
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white/80 hover:text-[#00e5ff] text-sm font-semibold tracking-wide transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#00e5ff] hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Actions: Cart & Mobile toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenCart}
            aria-label={`View shopping cart with ${cartCount} items`}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#7c4dff]/90 to-[#6a3ae0] hover:from-[#00e5ff] hover:to-[#00b4d8] text-white hover:text-black font-bold text-sm shadow-lg shadow-[#7c4dff]/25 hover:shadow-[#00e5ff]/30 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Cart:</span>
            <span
              id="count"
              className="px-2 py-0.5 rounded-full bg-black/40 text-xs font-mono font-bold"
            >
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:text-[#00e5ff] transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a1a]/95 backdrop-blur-xl border-b border-white/10 px-6 py-5 flex flex-col space-y-4 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleLinkClick}
              className="text-lg font-medium text-white/90 hover:text-[#00e5ff] transition-colors py-2 border-b border-white/5"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
