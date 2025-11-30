import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, quantity: number = 1) => {
        const items = get().items;
        const existingItem = items.find(item => item.product.id === product.id);

        if (existingItem) {
          set({
            items: items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ items: [...items, { product, quantity }] });
        }
      },

      removeItem: (productId: string) => {
        set({ items: get().items.filter(item => item.product.id !== productId) });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'azabache-cart',
    }
  )
);

// Wishlist Store
interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        const items = get().items;
        if (!items.find(item => item.id === product.id)) {
          set({ items: [...items, product] });
        }
      },

      removeItem: (productId: string) => {
        set({ items: get().items.filter(item => item.id !== productId) });
      },

      isInWishlist: (productId: string) => {
        return get().items.some(item => item.id === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'azabache-wishlist',
    }
  )
);

// Search/Filter Store
interface FilterState {
  searchQuery: string;
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  selectedTheme: string | null;
  priceRange: [number, number];
  sortBy: 'name' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
  setSearchQuery: (query: string) => void;
  setCategory: (category: string | null) => void;
  setSubcategory: (subcategory: string | null) => void;
  setTheme: (theme: string | null) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: 'name' | 'price-asc' | 'price-desc' | 'newest' | 'rating') => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: '',
  selectedCategory: null,
  selectedSubcategory: null,
  selectedTheme: null,
  priceRange: [0, 100],
  sortBy: 'newest',

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setCategory: (category: string | null) => set({ selectedCategory: category, selectedSubcategory: null }),
  setSubcategory: (subcategory: string | null) => set({ selectedSubcategory: subcategory }),
  setTheme: (theme: string | null) => set({ selectedTheme: theme }),
  setPriceRange: (range: [number, number]) => set({ priceRange: range }),
  setSortBy: (sort) => set({ sortBy: sort }),
  resetFilters: () => set({
    searchQuery: '',
    selectedCategory: null,
    selectedSubcategory: null,
    selectedTheme: null,
    priceRange: [0, 100],
    sortBy: 'newest',
  }),
}));
