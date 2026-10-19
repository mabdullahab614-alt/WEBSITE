import React, { useRef, useState } from 'react';
import { Check, Plus, Eye, Star } from 'lucide-react';
import { Product } from '../types.ts';
import { calculateTiltAngles } from '../utils/shopLogic.ts';
import { sound } from '../utils/audio.ts';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const { rotateX, rotateY } = calculateTiltAngles(
      e.clientX,
      e.clientY,
      rect,
      12
    );
    setTransformStyle(
      `perspective(700px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(-4px)`
    );
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(700px) rotateY(0deg) rotateX(0deg) translateY(0px)');
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playPop();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1400);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onQuickView(product)}
      style={{
        transform: transformStyle,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out, box-shadow 0.2s ease'
      }}
      className="card group relative bg-white/[0.07] hover:bg-white/[0.11] border border-white/[0.15] hover:border-cyan-400/50 rounded-[18px] p-6 text-center cursor-pointer backdrop-blur-md shadow-lg shadow-black/40 hover:shadow-cyan-500/15 flex flex-col justify-between"
    >
      {/* Badge */}
      {product.badge && (
        <span className="absolute top-3.5 right-3.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#7c4dff] to-[#00e5ff] text-[10px] font-bold tracking-wider text-black uppercase shadow-sm">
          {product.badge}
        </span>
      )}

      {/* 3D Icon with translateZ */}
      <div
        style={{ transform: 'translateZ(50px)' }}
        className="ico text-6xl my-4 transition-transform group-hover:scale-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] select-none"
      >
        {product.iconSymbol}
      </div>

      {/* Info */}
      <div style={{ transform: 'translateZ(30px)' }} className="flex-1 flex flex-col justify-center">
        <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-[#00e5ff] transition-colors mt-2 mb-1">
          {product.name}
        </h3>

        <p className="text-xs text-[#b0b8d0] line-clamp-2 px-2 min-h-[32px]">
          {product.tagline}
        </p>

        {/* Rating */}
        <div className="flex items-center justify-center gap-1.5 my-2.5 text-xs text-amber-400">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span className="font-semibold text-white/90">{product.rating}</span>
          <span className="text-white/40">({product.reviewsCount})</span>
        </div>

        {/* Price matching PDF */}
        <div className="price flex items-baseline justify-center gap-2 mt-1">
          <span className="text-2xl font-black text-[#00e5ff]">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-white/40 line-through font-normal">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ transform: 'translateZ(40px)' }} className="mt-5 flex items-center justify-center gap-2">
        <button
          onClick={handleAdd}
          type="button"
          aria-label={`Add ${product.name} to cart`}
          className={`flex-1 py-2.5 px-4 rounded-full font-bold text-sm transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${
            isAdded
              ? 'bg-[#00e5ff] text-black font-extrabold shadow-[#00e5ff]/50 scale-105'
              : 'bg-[#7c4dff] hover:bg-[#00e5ff] text-white hover:text-black shadow-[#7c4dff]/40 hover:shadow-[#00e5ff]/40'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Added ✓</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add to Cart</span>
            </>
          )}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          type="button"
          aria-label={`Quick view specifications for ${product.name}`}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
          title="Quick Specs"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
