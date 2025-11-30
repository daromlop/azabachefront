'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, CreditCard, Truck, Check, Lock } from 'lucide-react';
import { useCartStore } from '@/store';

type Step = 'shipping' | 'payment' | 'confirmation';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState<Step>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [shippingData, setShippingData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'España',
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setCurrentStep('confirmation');
    clearCart();
  };

  if (items.length === 0 && currentStep !== 'confirmation') {
    return (
      <div className="min-h-screen bg-[#FFF5FB] flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🛒</p>
          <h1 className="text-2xl font-bold text-[#1a1a1a] mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-6">Añade algunos productos para continuar</p>
          <Link href="/tienda" className="btn-primary">
            Ir a la tienda
          </Link>
        </div>
      </div>
    );
  }

  if (currentStep === 'confirmation') {
    return (
      <div className="min-h-screen bg-[#FFF5FB] flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full mx-4 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-[#1a1a1a] mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            ¡Pedido Confirmado! ✨
          </h1>
          <p className="text-gray-600 mb-2">
            Gracias por tu compra, {shippingData.fullName}
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Te hemos enviado un email de confirmación a {shippingData.email}
          </p>
          <div className="bg-[#FFF5FB] p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-500">Número de pedido</p>
            <p className="font-bold text-[#9A5073]">AZ-{Date.now().toString().slice(-8)}</p>
          </div>
          <Link href="/tienda" className="btn-primary block">
            Seguir comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF5FB]">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/tienda" className="flex items-center gap-2 text-gray-600 hover:text-[#9A5073]">
              <ChevronLeft className="h-5 w-5" />
              Volver a la tienda
            </Link>
            <span className="text-2xl font-bold text-gradient">Azabache</span>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Lock className="h-4 w-4" />
              Pago seguro
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-8">
            <div className={`flex items-center gap-2 ${currentStep === 'shipping' ? 'text-[#9A5073]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'shipping' ? 'bg-[#9A5073] text-white' : 'bg-green-500 text-white'
              }`}>
                {currentStep === 'payment' ? <Check className="h-5 w-5" /> : '1'}
              </div>
              <span className="hidden sm:block font-medium">Envío</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-200" />
            <div className={`flex items-center gap-2 ${currentStep === 'payment' ? 'text-[#9A5073]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'payment' ? 'bg-[#9A5073] text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="hidden sm:block font-medium">Pago</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {currentStep === 'shipping' && (
              <form onSubmit={handleShippingSubmit} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="h-6 w-6 text-[#9A5073]" />
                  <h2 className="text-xl font-bold text-[#1a1a1a]">Datos de envío</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingData.fullName}
                      onChange={(e) => setShippingData({...shippingData, fullName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                      placeholder="María García"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={shippingData.email}
                      onChange={(e) => setShippingData({...shippingData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                      placeholder="maria@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      required
                      value={shippingData.phone}
                      onChange={(e) => setShippingData({...shippingData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                      placeholder="+34 600 000 000"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingData.street}
                      onChange={(e) => setShippingData({...shippingData, street: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                      placeholder="Calle Ejemplo, 123, 2º A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ciudad *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingData.city}
                      onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                      placeholder="Sevilla"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Código Postal *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingData.postalCode}
                      onChange={(e) => setShippingData({...shippingData, postalCode: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                      placeholder="41001"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full btn-primary mt-6">
                  Continuar al pago
                </button>
              </form>
            )}

            {currentStep === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="h-6 w-6 text-[#9A5073]" />
                  <h2 className="text-xl font-bold text-[#1a1a1a]">Datos de pago</h2>
                </div>

                <div className="bg-[#FFF5FB] p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-600">
                    <strong>Demo:</strong> Puedes usar cualquier dato de prueba. No se procesará ningún pago real.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Número de tarjeta *
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre en la tarjeta *
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentData.cardName}
                      onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                      placeholder="MARIA GARCIA"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de expiración *
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentData.expiry}
                        onChange={(e) => setPaymentData({...paymentData, expiry: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                        placeholder="MM/AA"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV *
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('shipping')}
                    className="btn-secondary"
                  >
                    Volver
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Lock className="h-5 w-5" />
                        Pagar {total.toFixed(2)}€
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="font-bold text-[#1a1a1a] mb-4">Resumen del pedido</h3>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#9A5073] text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1a1a1a] truncate">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.product.price.toFixed(2)}€ x {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-[#1a1a1a]">
                      {(item.product.price * item.quantity).toFixed(2)}€
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span>{shipping === 0 ? 'Gratis' : `${shipping.toFixed(2)}€`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-[#9A5073]">
                    ¡Añade {(50 - subtotal).toFixed(2)}€ más para envío gratis!
                  </p>
                )}
                <div className="flex justify-between text-lg font-bold text-[#1a1a1a] pt-2 border-t">
                  <span>Total</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
