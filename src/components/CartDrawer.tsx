import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types.ts';
import { calculateCartTotals } from '../utils/shopLogic.ts';
import { sound } from '../utils/audio.ts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const totals = calculateCartTotals(cart);
  const freeShippingThreshold = 50;
  const progressToFreeShipping = Math.min(
    100,
    (totals.subtotal / freeShippingThreshold) * 100
  );

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      sound.playSuccess();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // failover
      }
    }, 900);
  };

  const handleFinish = () => {
    setCheckoutComplete(false);
    onClearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-full bg-[#0d0d21] border-l border-white/10 flex flex-col shadow-2xl shadow-cyan-900/40 relative z-10"
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#7c4dff]/20 text-[#00e5ff] flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Your Cart</h3>
              <p className="text-xs text-[#b0b8d0]">
                {totals.totalItems} {totals.totalItems === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart drawer"
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-5 py-3.5 bg-white/[0.03] border-b border-white/5">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#b0b8d0]">
              {totals.subtotal >= freeShippingThreshold ? (
                <span className="text-[#00e5ff] font-semibold">🎉 You unlocked Free Express Shipping!</span>
              ) : (
                <span>
                  Add <b className="text-white">${(freeShippingThreshold - totals.subtotal).toFixed(2)}</b> more for Free Shipping
                </span>
              )}
            </span>
            <span className="font-mono text-white/60">{Math.round(progressToFreeShipping)}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00e5ff] to-[#7c4dff] transition-all duration-300"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Body content */}
        {checkoutComplete ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#00e5ff]/20 text-[#00e5ff] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-black text-white">Order Confirmed!</h4>
            <p className="text-sm text-[#b0b8d0] mt-2 max-w-xs">
              Thank you for shopping at GadgetHub. Your items are being prepared for dispatch with express tracking.
            </p>
            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 w-full text-left text-xs space-y-1">
              <div className="flex justify-between text-white/70">
                <span>Order ID:</span>
                <span className="font-mono text-[#00e5ff]">#GH-{(Math.random() * 900000 + 100000).toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Estimated Delivery:</span>
                <span className="text-white font-medium">Tomorrow, by 5:00 PM</span>
              </div>
            </div>
            <button
              onClick={handleFinish}
              className="mt-8 w-full py-3.5 rounded-full bg-gradient-to-r from-[#00e5ff] to-[#7c4dff] text-white font-bold text-sm cursor-pointer shadow-lg shadow-[#00e5ff]/20"
            >
              Continue Shopping
            </button>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-white/30">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <p className="text-base font-bold text-white">Your cart is currently empty</p>
            <p className="text-xs text-[#b0b8d0] mt-1 max-w-xs">
              Explore our smartphones, fast chargers, earbuds, and protective gear.
            </p>
            <a
              href="#shop"
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00e5ff] to-[#7c4dff] text-white font-bold text-xs tracking-wider uppercase cursor-pointer"
            >
              Browse Catalog
            </a>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 space-y-3.5 scrollbar-thin">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 hover:border-white/20 transition-colors"
              >
                {/* Product Icon */}
                <div className="w-12 h-12 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-2xl shrink-0">
                  {item.product.iconSymbol}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-bold text-white truncate">
                    {item.product.name}
                  </h5>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold text-[#00e5ff]">
                      ${item.product.price}
                    </span>
                    <span className="text-[10px] text-white/40">each</span>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-lg bg-black/50 border border-white/10 overflow-hidden">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      aria-label={`Decrease quantity of ${item.product.name}`}
                      className="p-1.5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2.5 text-xs font-mono font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      aria-label={`Increase quantity of ${item.product.name}`}
                      className="p-1.5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    aria-label={`Remove ${item.product.name} from cart`}
                    className="p-1.5 text-white/40 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Totals & Checkout */}
        {cart.length > 0 && !checkoutComplete && (
          <div className="p-5 border-t border-white/10 bg-[#0a0a1a] space-y-3">
            <div className="space-y-1.5 text-xs text-[#b0b8d0]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-mono font-semibold">${totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="text-white font-mono">${totals.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {totals.shipping === 0 ? (
                    <span className="text-[#00e5ff] font-semibold">FREE</span>
                  ) : (
                    <span className="text-white font-mono">${totals.shipping.toFixed(2)}</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold text-white">
                <span>Total Due</span>
                <span className="text-lg text-[#00e5ff] font-black font-mono">
                  ${totals.total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-[#00e5ff] to-[#7c4dff] hover:from-[#38ef7d] hover:to-[#11998e] text-white font-bold text-sm shadow-lg shadow-[#00e5ff]/25 hover:shadow-cyan-400/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isCheckingOut ? (
                <span>Securing Order...</span>
              ) : (
                <>
                  <span>Checkout (${totals.total.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
