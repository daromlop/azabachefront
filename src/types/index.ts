// Tipos para la aplicación

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: ProductCategory;
  subcategory?: JewelryType | ArtType;
  theme: Theme;
  stock: number;
  featured: boolean;
  isNew: boolean;
  onSale: boolean;
  rating: number;
  reviews: Review[];
  createdAt: string;
}

export type ProductCategory = 'jewelry' | 'art';

export type JewelryType = 'necklace' | 'earrings' | 'bracelet' | 'ring' | 'brooch';

export type ArtType = 'print' | 'sticker' | 'bookmark' | 'postcard';

export type Theme = 
  | 'harry-potter'
  | 'lord-of-the-rings'
  | 'game-of-thrones'
  | 'studio-ghibli'
  | 'anime'
  | 'disney-villains'
  | 'dragons'
  | 'dark-academia'
  | 'witchy'
  | 'gothic'
  | 'mythology'
  | 'fairy-tales';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Event {
  id: string;
  name: string;
  location: string;
  date: string;
  endDate?: string;
  description: string;
  image: string;
  standNumber?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  shippingAddress: Address;
  createdAt: string;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}
