'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store';

export default function Cart() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={closeCart}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-[#1a1a1a] flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-[#9A5073]" />
            Tu Carrito
          </h2>
          <button 
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
              <button
                onClick={closeCart}
                className="btn-primary"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-[#FFF5FB] rounded-lg"
                >
                  {/* Product Image */}
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link 
                      href={`/producto/${item.product.id}`}
                      onClick={closeCart}
                      className="font-medium text-[#1a1a1a] hover:text-[#9A5073] line-clamp-2"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-[#9A5073] font-bold mt-1">
                      {item.product.price.toFixed(2)}€
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-white rounded transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-white rounded transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-xl font-bold text-[#1a1a1a]">{getTotalPrice().toFixed(2)}€</span>
            </div>
            <p className="text-sm text-gray-500">
              Envío calculado en el checkout
            </p>
            <div className="space-y-2">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full btn-primary text-center"
              >
                Finalizar Compra
              </Link>
              <button
                onClick={clearCart}
                className="w-full text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
