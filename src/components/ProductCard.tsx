'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore, useWishlistStore } from '@/store';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    openCart();
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md card-hover">
      <Link href={`/producto/${product.id}`}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="badge badge-new">Nuevo</span>
            )}
            {product.onSale && (
              <span className="badge badge-sale">Oferta</span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
              inWishlist 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-700 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
          </button>

          {/* Quick Add Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleAddToCart}
              className="w-full bg-white text-[#9A5073] py-2 rounded-lg font-semibold hover:bg-[#9A5073] hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="h-5 w-5" />
              Añadir al carrito
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Theme Badge */}
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            {product.theme.replace('-', ' ')}
          </span>

          {/* Name */}
          <h3 className="font-semibold text-[#1a1a1a] mt-1 group-hover:text-[#9A5073] transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <Star className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
            <span className="text-sm text-gray-600">{product.rating}</span>
            <span className="text-sm text-gray-400">({product.reviews.length})</span>
          </div>

          {/* Price */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-bold text-[#9A5073]">
              {product.price.toFixed(2)}€
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.originalPrice.toFixed(2)}€
              </span>
            )}
          </div>

          {/* Stock */}
          {product.stock < 5 && product.stock > 0 && (
            <p className="text-xs text-orange-500 mt-2">
              ¡Solo quedan {product.stock} unidades!
            </p>
          )}
          {product.stock === 0 && (
            <p className="text-xs text-red-500 mt-2">
              Agotado
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
