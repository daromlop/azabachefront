'use client';

import Link from 'next/link';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { ProductCard } from '@/components';
import { useWishlistStore, useCartStore } from '@/store';

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const handleAddAllToCart = () => {
    items.forEach(item => addToCart(item));
    openCart();
  };

  return (
    <div className="min-h-screen bg-[#FFF5FB]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#9A5073] to-[#7a3d5a] py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-white" />
            <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Mi Lista de Deseos
            </h1>
          </div>
          <p className="text-white/80 mt-2">
            {items.length} {items.length === 1 ? 'producto guardado' : 'productos guardados'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">
              Tu lista de deseos está vacía
            </h2>
            <p className="text-gray-600 mb-6">
              Guarda tus productos favoritos para comprarlos más tarde
            </p>
            <Link href="/tienda" className="btn-primary">
              Explorar tienda
            </Link>
          </div>
        ) : (
          <>
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between mb-8">
              <button
                onClick={handleAddAllToCart}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-5 w-5" />
                Añadir todo al carrito
              </button>
              <button
                onClick={clearWishlist}
                className="text-red-500 hover:text-red-600 flex items-center justify-center gap-2"
              >
                <Trash2 className="h-5 w-5" />
                Vaciar lista
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
