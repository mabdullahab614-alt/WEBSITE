import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types.ts';
import { ProductCard } from './ProductCard.tsx';
import { filterProducts } from '../utils/shopLogic.ts';

interface ProductsSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  onAddToCart,
  onQuickView
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'smartphones', label: 'Phones' },
    { id: 'audio', label: 'Audio' },
    { id: 'power', label: 'Charging & Power' },
    { id: 'protection', label: 'Cases & Glass' },
    { id: 'wearables', label: 'Wearables' }
  ];

  const filtered = useMemo(() => {
    return filterProducts(products, selectedCategory, searchQuery);
  }, [products, selectedCategory, searchQuery]);

  return (
    <section id="shop" className="relative z-10 min-h-screen py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Title matching PDF */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-[#00e5ff] text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Flagship Collection</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Our Products
        </h2>
        <p className="mt-3 text-[#b0b8d0] text-sm sm:text-base">
          Engineered for extreme performance, fast charging, crystal audio, and rugged everyday protection.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none" role="tablist">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00e5ff] to-[#7c4dff] text-white shadow-md shadow-[#00e5ff]/20 scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search phones, earbuds, chargers..."
            aria-label="Search catalog products"
            className="w-full pl-10 pr-9 py-2 rounded-full bg-white/5 border border-white/15 focus:border-[#00e5ff] text-white placeholder-white/40 text-sm focus:outline-none focus:ring-1 focus:ring-[#00e5ff] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search query"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Product Grid matching PDF specs */}
      {filtered.length > 0 ? (
        <div
          id="products"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6.5"
        >
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-4 rounded-2xl bg-white/5 border border-white/10">
          <SlidersHorizontal className="w-10 h-10 text-white/30 mx-auto mb-3" />
          <p className="text-lg font-bold text-white">No products match your search</p>
          <p className="text-sm text-white/50 mt-1">Try clearing filters or search terms</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-5 py-2 rounded-full bg-cyan-500 text-black font-semibold text-xs hover:bg-cyan-400 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
