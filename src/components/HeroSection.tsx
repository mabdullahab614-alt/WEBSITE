import React from 'react';
import { ArrowRight, Rotate3d, ShieldCheck, Zap, Truck } from 'lucide-react';
import { PHONE_COLORS } from '../data/products.ts';
import { PhoneColorConfig } from '../types.ts';

interface HeroSectionProps {
  selectedColor: PhoneColorConfig;
  onSelectColor: (c: PhoneColorConfig) => void;
  rotationSpeed: number;
  onToggleSpeed: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedColor,
  onSelectColor,
  rotationSpeed,
  onToggleSpeed
}) => {
  return (
    <section
      id="home"
      className="relative z-10 min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 pt-28 pb-16 max-w-7xl mx-auto"
    >
      <div className="max-w-2xl">
        {/* Live 3D Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-cyan-400/30 text-cyan-300 text-xs font-semibold mb-6 shadow-sm shadow-cyan-500/10 backdrop-blur-sm">
          <Rotate3d className="w-4 h-4 text-[#00e5ff] animate-spin" style={{ animationDuration: '6s' }} />
          <span>Interactive 3D Experience (Cursor & Scroll Reactive)</span>
        </div>

        {/* Heading matching PDF */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
          Level Up Your <span className="text-[#00e5ff] drop-shadow-[0_0_25px_rgba(0,229,255,0.4)]">Mobile</span> Life
        </h1>

        {/* Paragraph matching PDF */}
        <p className="mt-6 text-lg sm:text-xl text-[#b0b8d0] font-normal leading-relaxed max-w-xl">
          Latest smartphones, cases, chargers, earbuds and more. Engineered with next-gen performance and aerospace durability.
        </p>

        {/* Action Button matching PDF styling */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#shop"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#00e5ff] to-[#7c4dff] text-white font-bold text-base shadow-lg shadow-[#00e5ff]/20 hover:shadow-[#00e5ff]/50 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* 3D Spin Speed Toggle */}
          <button
            onClick={onToggleSpeed}
            type="button"
            className="px-5 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-semibold text-white/90 hover:text-[#00e5ff] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Rotate3d className="w-4 h-4" />
            <span>3D Spin: {rotationSpeed === 1 ? 'Normal' : rotationSpeed === 2 ? 'Turbo' : 'Paused'}</span>
          </button>
        </div>

        {/* Interactive 3D Phone Finish Swatches */}
        <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-lg">
          <div className="flex items-center justify-between text-xs font-semibold text-white/70 mb-3">
            <span>Customize 3D Smartphone Finish:</span>
            <span className="text-[#00e5ff] font-bold">{selectedColor.name}</span>
          </div>
          <div className="flex items-center gap-3">
            {PHONE_COLORS.map((c) => {
              const isSelected = selectedColor.name === c.name;
              return (
                <button
                  key={c.name}
                  onClick={() => onSelectColor(c)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'ring-2 ring-white scale-110 shadow-lg shadow-cyan-500/30'
                      : 'opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={`Select ${c.name}`}
                  aria-label={`Select ${c.name} color`}
                >
                  {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Trust Points */}
        <div className="mt-10 flex flex-wrap sm:grid sm:grid-cols-3 gap-3.5 sm:gap-4 max-w-xl text-left border-t border-white/10 pt-6">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-white/80 bg-white/[0.03] sm:bg-transparent px-3 py-1.5 sm:p-0 rounded-lg">
            <Truck className="w-4 h-4 text-[#00e5ff] shrink-0" />
            <span>Fast Express Delivery</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-white/80 bg-white/[0.03] sm:bg-transparent px-3 py-1.5 sm:p-0 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-[#7c4dff] shrink-0" />
            <span>1-Year Official Warranty</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-white/80 bg-white/[0.03] sm:bg-transparent px-3 py-1.5 sm:p-0 rounded-lg">
            <Zap className="w-4 h-4 text-[#ffc107] shrink-0" />
            <span>100% Genuine Gear</span>
          </div>
        </div>
      </div>
    </section>
  );
};
