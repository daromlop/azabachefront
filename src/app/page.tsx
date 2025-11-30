'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Star, Sparkles, BookOpen, Crown } from 'lucide-react';
import { ProductCard } from '@/components';
import { getFeaturedProducts, getNewProducts, events, categories, themes } from '@/data/products';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts().slice(0, 8);
  const newProducts = getNewProducts().slice(0, 4);
  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Floating Elements - Hidden on mobile to avoid overlap */}
        <div className="hidden md:block absolute top-20 left-10 text-[#D4AF37] animate-bounce opacity-60">
          <Sparkles className="h-8 w-8" />
        </div>
        <div className="hidden md:block absolute bottom-32 right-20 text-[#9A5073] animate-pulse opacity-60">
          <Star className="h-10 w-10" />
        </div>
        <div className="hidden md:block absolute top-40 right-32 text-[#D4AF37] animate-bounce delay-300 opacity-60">
          <Crown className="h-6 w-6" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left animate-fade-in">
              <span className="inline-block px-4 py-2 bg-[#9A5073]/20 text-[#D4AF37] rounded-full text-sm font-medium mb-6">
                ✨ Bienvenido/a a tu mundo mágico ✨
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                <span className="text-gradient">Azabache</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-4">
                🖤 Bookish Gifts, for readers 📔 and Dark Fantasy 🦇
              </p>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0">
                Descubre nuestra colección de joyería artesanal y arte gráfico inspirado en tus universos favoritos. 
                Piezas únicas para almas que sueñan con mundos mágicos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/tienda" className="btn-primary inline-flex items-center justify-center gap-2">
                  Explorar Tienda <ArrowRight className="h-5 w-5" />
                </Link>
                <Link href="/eventos" className="btn-secondary inline-flex items-center justify-center gap-2">
                  <Calendar className="h-5 w-5" /> Próximos Eventos
                </Link>
              </div>
            </div>

            {/* Hero Image Collage */}
            <div className="relative hidden lg:block animate-slide-up">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-48 rounded-2xl overflow-hidden animate-pulse-glow">
                    <Image
                      src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400"
                      alt="Joyería Fantasy"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-64 rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400"
                      alt="Dark Academia"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative h-64 rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
                      alt="Arte Fantasy"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-48 rounded-2xl overflow-hidden animate-pulse-glow">
                    <Image
                      src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400"
                      alt="Pendientes Mágicos"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Explora Nuestras Categorías
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Desde joyería artesanal hasta arte gráfico, encuentra la pieza perfecta para expresar tu lado más mágico
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((category) => (
              <Link 
                key={category.id}
                href={`/tienda?category=${category.slug}`}
                className="group relative h-80 rounded-2xl overflow-hidden card-hover"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                    {category.name}
                  </h3>
                  <p className="text-gray-300 mb-4">{category.description}</p>
                  {category.subcategories && (
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub) => (
                        <span key={sub.id} className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-[#FFF5FB]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Productos Destacados ✨
              </h2>
              <p className="text-gray-600">Los favoritos de nuestra comunidad</p>
            </div>
            <Link href="/tienda" className="mt-4 md:mt-0 text-[#9A5073] hover:text-[#7a3d5a] font-semibold inline-flex items-center gap-2">
              Ver todo <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Themes Carousel */}
      <section className="py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Temáticas Mágicas
            </h2>
            <p className="text-gray-400">Explora por tu universo favorito</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {themes.slice(0, 12).map((theme) => (
              <Link
                key={theme.id}
                href={`/tienda?theme=${theme.id}`}
                className="bg-[#2d2d2d] hover:bg-[#9A5073] p-6 rounded-xl text-center transition-all duration-300 group"
              >
                <span className="text-4xl block mb-3">{theme.icon}</span>
                <span className="text-white text-sm font-medium">{theme.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                🆕 Recién llegados
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Novedades
              </h2>
            </div>
            <Link href="/tienda?sort=newest" className="mt-4 md:mt-0 text-[#9A5073] hover:text-[#7a3d5a] font-semibold inline-flex items-center gap-2">
              Ver todas <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-gradient-to-br from-[#9A5073] to-[#7a3d5a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-4">
              📅 Nos vemos en persona
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Próximos Eventos
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Visítanos en ferias y eventos donde podrás ver nuestras creaciones en persona, 
              conocernos y llevarte piezas exclusivas
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl overflow-hidden card-hover">
                <div className="relative h-48">
                  <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                  {event.standNumber && (
                    <span className="absolute top-4 right-4 px-3 py-1 bg-[#D4AF37] text-[#1a1a1a] rounded-full text-sm font-bold">
                      Stand {event.standNumber}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1a1a1a] mb-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                    {event.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 text-[#9A5073]" />
                    <span className="text-sm">
                      {new Date(event.date).toLocaleDateString('es-ES', { 
                        day: 'numeric', 
                        month: 'long',
                        year: 'numeric'
                      })}
                      {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString('es-ES', { 
                        day: 'numeric', 
                        month: 'long'
                      })}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 text-[#9A5073]" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/eventos" className="btn-accent inline-flex items-center gap-2">
              Ver todos los eventos <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-[#FFF5FB]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
                  alt="Sobre Azabache"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#D4AF37] text-[#1a1a1a] p-6 rounded-2xl shadow-xl">
                <p className="text-3xl font-bold" style={{ fontFamily: 'var(--font-playfair), serif' }}>+500</p>
                <p className="text-sm">Clientes felices</p>
              </div>
            </div>
            <div>
              <span className="inline-block px-4 py-2 bg-[#9A5073]/10 text-[#9A5073] rounded-full text-sm font-medium mb-4">
                <BookOpen className="h-4 w-4 inline mr-2" /> Nuestra Historia
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Creando magia desde el corazón
              </h2>
              <p className="text-gray-600 mb-6">
                ¡Hola! Soy Rosa, y Azabache es mi pequeño sueño hecho realidad. Nació de mi pasión 
                por los libros, el anime y los mundos fantásticos. Cada pieza que creo está diseñada 
                para aquellos que, como yo, encuentran magia en las historias.
              </p>
              <p className="text-gray-600 mb-8">
                Desde mi taller, elaboro joyería y arte gráfico con todo el cariño para lectores, 
                otakus, gamers y soñadores. ¡Nos vemos en el próximo evento!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/sobre-nosotros" className="btn-primary inline-flex items-center justify-center gap-2">
                  Conocer más <ArrowRight className="h-5 w-5" />
                </Link>
                <Link href="/faq" className="btn-secondary inline-flex items-center justify-center gap-2">
                  Preguntas Frecuentes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-[#9A5073] text-3xl mb-2">🚚</div>
              <h4 className="font-semibold text-[#1a1a1a]">Envío Gratis</h4>
              <p className="text-sm text-gray-500">En pedidos +50€</p>
            </div>
            <div>
              <div className="text-[#9A5073] text-3xl mb-2">✨</div>
              <h4 className="font-semibold text-[#1a1a1a]">Hecho a Mano</h4>
              <p className="text-sm text-gray-500">Con amor y magia</p>
            </div>
            <div>
              <div className="text-[#9A5073] text-3xl mb-2">🔒</div>
              <h4 className="font-semibold text-[#1a1a1a]">Pago Seguro</h4>
              <p className="text-sm text-gray-500">100% protegido</p>
            </div>
            <div>
              <div className="text-[#9A5073] text-3xl mb-2">💬</div>
              <h4 className="font-semibold text-[#1a1a1a]">Atención Personal</h4>
              <p className="text-sm text-gray-500">Siempre disponible</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
