import React from 'react';
import { ArrowUp, Sparkles, Github, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#070714]/90 py-12 px-6 sm:px-12 text-center text-[#777]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#00e5ff] to-[#7c4dff] flex items-center justify-center text-black font-extrabold">
            <Sparkles className="w-4 h-4 text-black" />
          </div>
          <span className="text-xl font-black text-white">
            Gadget<span className="text-[#00e5ff]">Hub</span>
          </span>
        </div>

        {/* Navigation links */}
        <div className="flex items-center gap-6 text-sm text-[#b0b8d0]">
          <a href="#home" className="hover:text-[#00e5ff] transition-colors">
            Home
          </a>
          <a href="#shop" className="hover:text-[#00e5ff] transition-colors">
            Shop
          </a>
          <a href="#about" className="hover:text-[#00e5ff] transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-[#00e5ff] transition-colors">
            Contact
          </a>
        </div>

        {/* Social and Top */}
        <div className="flex items-center gap-4">
          <a
            href="#home"
            aria-label="Twitter Profile"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00e5ff] transition-colors"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="#home"
            aria-label="Instagram Profile"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00e5ff] transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="#home"
            aria-label="GitHub Repository"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00e5ff] transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="ml-2 p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-[#00e5ff] transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Copyright matching PDF */}
      <div className="mt-8 pt-6 border-t border-white/5 text-xs text-[#777]">
        &copy; 2026 GadgetHub. All rights reserved.
      </div>
    </footer>
  );
};
