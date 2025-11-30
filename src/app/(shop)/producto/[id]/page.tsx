'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Heart, ShoppingBag, Star, Minus, Plus, ChevronLeft, ChevronRight, Truck, Shield, RefreshCw } from 'lucide-react';
import { ProductCard } from '@/components';
import { getProductById, products, themes } from '@/data/products';
import { useCartStore, useWishlistStore } from '@/store';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProductById(productId);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF5FB]">
        <div className="text-center">
          <h1 className="text-4xl mb-4">😿</h1>
          <p className="text-xl text-gray-600 mb-4">Producto no encontrado</p>
          <Link href="/tienda" className="btn-primary">
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const themeName = themes.find(t => t.id === product.theme)?.name || product.theme;

  const handleAddToCart = () => {
    addItem(product, quantity);
    openCart();
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Related products (same theme or category)
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.theme === product.theme || p.category === product.category))
    .slice(0, 4);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-[#FFF5FB]">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#9A5073]">Inicio</Link>
            <span className="text-gray-300">/</span>
            <Link href="/tienda" className="text-gray-500 hover:text-[#9A5073]">Tienda</Link>
            <span className="text-gray-300">/</span>
            <Link href={`/tienda?category=${product.category}`} className="text-gray-500 hover:text-[#9A5073]">
              {product.category === 'jewelry' ? 'Joyería' : 'Arte'}
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-[#9A5073]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <span className="badge badge-new">Nuevo</span>}
                {product.onSale && <span className="badge badge-sale">Oferta</span>}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-[#9A5073]' : 'border-transparent'
                    }`}
                  >
                    <Image src={image} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Theme Badge */}
            <Link
              href={`/tienda?theme=${product.theme}`}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-sm hover:bg-[#D4AF37]/30 transition-colors"
            >
              {themes.find(t => t.id === product.theme)?.icon} {themeName}
            </Link>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(product.rating)
                        ? 'fill-[#D4AF37] text-[#D4AF37]'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews.length} reseñas)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-[#9A5073]">
                {product.price.toFixed(2)}€
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  {product.originalPrice.toFixed(2)}€
                </span>
              )}
              {product.onSale && product.originalPrice && (
                <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Stock */}
            <div className="flex items-center gap-2">
              {product.stock > 10 ? (
                <span className="text-green-600">✓ En stock</span>
              ) : product.stock > 0 ? (
                <span className="text-orange-500">⚠ Solo quedan {product.stock} unidades</span>
              ) : (
                <span className="text-red-500">✕ Agotado</span>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Quantity */}
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="w-16 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="h-5 w-5" />
                Añadir al carrito
              </button>

              {/* Wishlist */}
              <button
                onClick={handleToggleWishlist}
                className={`p-3 border rounded-lg transition-colors ${
                  inWishlist
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : 'border-gray-200 hover:border-[#9A5073] hover:text-[#9A5073]'
                }`}
              >
                <Heart className={`h-6 w-6 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-8 w-8 mx-auto text-[#9A5073] mb-2" />
                <p className="text-sm text-gray-600">Envío gratis +50€</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto text-[#9A5073] mb-2" />
                <p className="text-sm text-gray-600">Pago seguro</p>
              </div>
              <div className="text-center">
                <RefreshCw className="h-8 w-8 mx-auto text-[#9A5073] mb-2" />
                <p className="text-sm text-gray-600">Devolución 14 días</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        {product.reviews.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Opiniones de clientes
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-[#9A5073] rounded-full flex items-center justify-center text-white font-semibold">
                      {review.userName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{review.userName}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1 ml-auto">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              También te puede gustar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
