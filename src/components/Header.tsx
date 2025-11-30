'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, User, ChevronDown } from 'lucide-react';
import { useCartStore, useWishlistStore } from '@/store';
import { categories, themes } from '@/data/products';
import Cart from './Cart';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const cartItems = useCartStore((state) => state.getTotalItems());
  const wishlistItems = useWishlistStore((state) => state.items.length);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const isCartOpen = useCartStore((state) => state.isOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/tienda?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        {/* Top bar */}
        <div className="bg-[#1a1a1a] text-white text-sm py-2">
          <div className="container mx-auto px-4 text-center">
            <span className="text-[#D4AF37]">✨</span> Envío gratis en pedidos superiores a 50€ <span className="text-[#D4AF37]">✨</span>
          </div>
        </div>

        {/* Main header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-gradient">Azabache</span>
              <span className="hidden sm:block text-sm text-gray-500 mt-2">Bookish & Fantasy</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-[#9A5073] fancy-underline transition-colors">
                Inicio
              </Link>
              
              {/* Categorías dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('categories')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center text-gray-700 hover:text-[#9A5073] transition-colors">
                  Categorías <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {activeDropdown === 'categories' && (
                  <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg py-4 animate-slide-down">
                    {categories.map((category) => (
                      <div key={category.id} className="px-4 py-2">
                        <Link 
                          href={`/tienda?category=${category.slug}`}
                          className="font-semibold text-[#9A5073] hover:text-[#7a3d5a]"
                        >
                          {category.name}
                        </Link>
                        {category.subcategories && (
                          <div className="ml-4 mt-2 space-y-1">
                            {category.subcategories.map((sub) => (
                              <Link
                                key={sub.id}
                                href={`/tienda?category=${category.slug}&subcategory=${sub.slug}`}
                                className="block text-sm text-gray-600 hover:text-[#9A5073]"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Temáticas dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('themes')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center text-gray-700 hover:text-[#9A5073] transition-colors">
                  Temáticas <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {activeDropdown === 'themes' && (
                  <div className="absolute top-full left-0 w-72 bg-white shadow-xl rounded-lg py-4 animate-slide-down max-h-96 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2 px-4">
                      {themes.map((theme) => (
                        <Link
                          key={theme.id}
                          href={`/tienda?theme=${theme.id}`}
                          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-[#9A5073] py-1"
                        >
                          <span>{theme.icon}</span>
                          <span>{theme.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/tienda" className="text-gray-700 hover:text-[#9A5073] fancy-underline transition-colors">
                Tienda
              </Link>
              <Link href="/eventos" className="text-gray-700 hover:text-[#9A5073] fancy-underline transition-colors">
                Eventos
              </Link>
              <Link href="/sobre-nosotros" className="text-gray-700 hover:text-[#9A5073] fancy-underline transition-colors">
                Sobre Nosotros
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-700 hover:text-[#9A5073] transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist */}
              <Link href="/wishlist" className="relative p-2 text-gray-700 hover:text-[#9A5073] transition-colors">
                <Heart className="h-5 w-5" />
                {wishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#9A5073] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlistItems}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button 
                onClick={toggleCart}
                className="relative p-2 text-gray-700 hover:text-[#9A5073] transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#1a1a1a] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartItems}
                  </span>
                )}
              </button>

              {/* Admin */}
              <Link href="/admin" className="hidden md:block p-2 text-gray-700 hover:text-[#9A5073] transition-colors">
                <User className="h-5 w-5" />
              </Link>

              {/* Mobile menu button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-700"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {isSearchOpen && (
            <form onSubmit={handleSearch} className="mt-4 animate-slide-down">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#9A5073] rounded-lg focus:ring-2 focus:ring-[#9A5073]/20"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#9A5073] text-white rounded-lg hover:bg-[#7a3d5a]"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t animate-slide-down">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <Link href="/" className="block text-gray-700 hover:text-[#9A5073]" onClick={() => setIsMenuOpen(false)}>
                Inicio
              </Link>
              <div className="space-y-2">
                <p className="font-semibold text-[#9A5073]">Categorías</p>
                {categories.map((category) => (
                  <div key={category.id} className="ml-4">
                    <Link 
                      href={`/tienda?category=${category.slug}`}
                      className="block text-gray-600 hover:text-[#9A5073]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-[#9A5073]">Temáticas</p>
                <div className="ml-4 grid grid-cols-2 gap-2">
                  {themes.map((theme) => (
                    <Link
                      key={theme.id}
                      href={`/tienda?theme=${theme.id}`}
                      className="text-sm text-gray-600 hover:text-[#9A5073]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {theme.icon} {theme.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/tienda" className="block text-gray-700 hover:text-[#9A5073]" onClick={() => setIsMenuOpen(false)}>
                Tienda
              </Link>
              <Link href="/eventos" className="block text-gray-700 hover:text-[#9A5073]" onClick={() => setIsMenuOpen(false)}>
                Eventos
              </Link>
              <Link href="/sobre-nosotros" className="block text-gray-700 hover:text-[#9A5073]" onClick={() => setIsMenuOpen(false)}>
                Sobre Nosotros
              </Link>
              <Link href="/admin" className="block text-gray-700 hover:text-[#9A5073]" onClick={() => setIsMenuOpen(false)}>
                Admin
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Cart Sidebar */}
      {isCartOpen && <Cart />}
    </>
  );
}
