export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'smartphones' | 'audio' | 'power' | 'protection' | 'wearables';
  iconSymbol: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
  tagline: string;
  specs: string[];
  inStock: boolean;
  colors?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface PhoneColorConfig {
  name: string;
  hex: string;
  accent: string;
  threeColor: number;
}
