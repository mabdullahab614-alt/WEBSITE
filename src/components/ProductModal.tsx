import React, { useState } from 'react';
import { X, Check, Star, Shield, Zap, Sparkles, Plus, Minus } from 'lucide-react';
import { Product } from '../types.ts';
import { sound } from '../utils/audio.ts';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    sound.playPop();
    onAddToCart(product, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Detailed specifications for ${product.name}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#0e0e24] border border-cyan-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/20 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product modal"
          className="absolute right-5 top-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#00e5ff]/20 to-[#7c4dff]/20 border border-white/15 flex items-center justify-center text-4xl shadow-inner shrink-0">
            {product.iconSymbol}
          </div>
          <div className="flex-1 pr-6">
            {product.badge && (
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-[#00e5ff] text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
                {product.badge}
              </span>
            )}
            <h3 className="text-2xl font-black text-white">{product.name}</h3>
            <p className="text-xs text-[#b0b8d0] mt-1">{product.tagline}</p>
          </div>
        </div>

        {/* Rating and Price */}
        <div className="mt-5 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-amber-400 text-sm">
            <Star className="w-4 h-4 fill-amber-400" />
            <span className="font-bold text-white">{product.rating}</span>
            <span className="text-xs text-white/50">({product.reviewsCount} customer reviews)</span>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-[#00e5ff]">${product.price}</span>
            {product.originalPrice && (
              <span className="ml-2 text-xs text-white/40 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>

        {/* Tech Specifications */}
        <div className="mt-6">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#00e5ff]" />
            Key Technical Specifications
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {product.specs.map((spec) => (
              <div
                key={spec}
                className="p-3 rounded-lg bg-black/40 border border-white/10 text-xs text-white/90 flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                <span>{spec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Perks */}
        <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-white/70">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#7c4dff]" />
            <span>1-Year Official Warranty</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#00e5ff]" />
            <span>Fast Express Dispatch</span>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="mt-8 pt-5 border-t border-white/10 flex items-center gap-4">
          {/* Qty selector */}
          <div className="flex items-center rounded-full bg-white/10 border border-white/15 px-3 py-1.5">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              aria-label="Decrease quantity"
              className="p-1 text-white/60 hover:text-white cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 text-sm font-mono font-bold text-white">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              aria-label="Increase quantity"
              className="p-1 text-white/60 hover:text-white cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            className={`flex-1 py-3 px-6 rounded-full font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
              added
                ? 'bg-[#00e5ff] text-black font-extrabold shadow-[#00e5ff]/40'
                : 'bg-gradient-to-r from-[#00e5ff] to-[#7c4dff] text-white hover:scale-[1.02] shadow-[#00e5ff]/20'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <span>Add to Cart • ${(product.price * qty).toFixed(2)}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
