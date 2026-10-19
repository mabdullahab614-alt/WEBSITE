import type { Product, CartItem } from '../types.ts';

export function calculateCartTotals(items: CartItem[]): {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  totalItems: number;
} {
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  // Free shipping over $50, else $5.99
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
  // 8% estimated tax
  const tax = Number((subtotal * 0.08).toFixed(2));
  const total = Number((subtotal + shipping + tax).toFixed(2));

  return {
    subtotal: Number(subtotal.toFixed(2)),
    tax,
    shipping,
    total,
    totalItems
  };
}

export function filterProducts(
  products: Product[],
  category: string,
  searchQuery: string
): Product[] {
  return products.filter((product) => {
    const matchesCategory = category === 'all' || product.category === category;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      q === '' ||
      product.name.toLowerCase().includes(q) ||
      product.tagline.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });
}

export function calculateTiltAngles(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number },
  maxDegree = 15
): { rotateX: number; rotateY: number } {
  if (rect.width === 0 || rect.height === 0) {
    return { rotateX: 0, rotateY: 0 };
  }
  const x = (clientX - rect.left) / rect.width - 0.5;
  const y = (clientY - rect.top) / rect.height - 0.5;

  // Clamped -0.5 to 0.5
  const clampedX = Math.max(-0.5, Math.min(0.5, x));
  const clampedY = Math.max(-0.5, Math.min(0.5, y));

  const rotateY = Number((clampedX * maxDegree * 2).toFixed(2));
  const rotateX = Number((-clampedY * maxDegree * 2).toFixed(2));

  return { rotateX, rotateY };
}
