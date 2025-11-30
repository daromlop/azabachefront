import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Heart, Sparkles, BookOpen, Palette, Star } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFF5FB]">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-r from-[#1a1a1a] to-[#2d2d2d] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-[#9A5073]/20 text-[#D4AF37] rounded-full text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4 inline mr-2" /> Nuestra Historia
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Creando Magia desde el Corazón
            </h1>
            <p className="text-xl text-gray-300">
              🖤 Bookish Gifts, for readers 📔 and Dark Fantasy 🦇
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600"
                  alt="Nuestra historia"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#D4AF37] text-[#1a1a1a] p-6 rounded-2xl shadow-xl">
                <p className="text-3xl font-bold" style={{ fontFamily: 'var(--font-playfair), serif' }}>2020</p>
                <p className="text-sm">Año de fundación</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                De lectora apasionada a creadora de joyas mágicas
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  ¡Hola! Soy Rosa, y Azabache es mi pequeño sueño hecho realidad. Todo empezó 
                  rodeada de libros de fantasía, figuras de anime y una pasión infinita por 
                  crear cosas bonitas. Siempre soñé con diseñar piezas que capturaran la 
                  esencia de los mundos que tanto amo.
                </p>
                <p>
                  Azabache nació de esa pasión: la necesidad de llevar conmigo un pedacito 
                  de Hogwarts, de la Tierra Media, del mundo de Ghibli... Y pronto descubrí 
                  que no era la única que sentía eso. En cada evento, en cada Mangafest, 
                  encontré personas que compartían la misma magia.
                </p>
                <p>
                  Hoy, cada pieza que creo está pensada para vosotros, los que encontráis 
                  magia en las historias. Para los que llevamos nuestros fandoms con orgullo. 
                  Para las almas que sueñan despiertas. ¡Gracias por ser parte de esta aventura!
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-16 h-16 bg-[#9A5073] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  R
                </div>
                <div>
                  <p className="font-semibold text-[#1a1a1a]">Rosa</p>
                  <p className="text-sm text-gray-500">Fundadora y Artista de Azabache</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1a1a1a] text-center mb-12" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Lo que nos hace especiales ✨
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#9A5073]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-[#9A5073]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Hecho con Amor</h3>
              <p className="text-gray-600">
                Cada pieza está creada a mano con dedicación y cariño. No somos una fábrica, 
                somos artesanos apasionados.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#9A5073]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-[#9A5073]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Diseños Únicos</h3>
              <p className="text-gray-600">
                Diseños originales inspirados en los mundos que amamos. No encontrarás 
                estas piezas en ningún otro lugar.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#9A5073]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-[#9A5073]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Materiales de Calidad</h3>
              <p className="text-gray-600">
                Utilizamos materiales hipoalergénicos y de alta calidad para que puedas 
                llevar tus piezas favoritas sin preocupaciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-[#9A5073] to-[#7a3d5a]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">+500</p>
              <p className="text-white/80">Clientes felices</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">+100</p>
              <p className="text-white/80">Diseños únicos</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">+20</p>
              <p className="text-white/80">Eventos al año</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">4.9</p>
              <p className="text-white/80">Valoración media</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1a1a1a] text-center mb-12" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Lo que dicen nuestros clientes 💜
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Laura M.',
                comment: 'Los pendientes de Evenstar son preciosos, tal cual en las películas. La calidad es increíble y el envío fue súper rápido.',
                rating: 5,
              },
              {
                name: 'Carlos P.',
                comment: 'Compré el colgante de las Reliquias para mi novia y le encantó. El packaging también es muy bonito, perfecto para regalo.',
                rating: 5,
              },
              {
                name: 'Sara L.',
                comment: 'Los conocí en el Mangafest y desde entonces soy clienta fiel. Cada pieza es única y el trato es increíble.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${star <= testimonial.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">&ldquo;{testimonial.comment}&rdquo;</p>
                <p className="font-semibold text-[#1a1a1a]">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <Instagram className="h-12 w-12 text-[#9A5073] mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Síguenos en Instagram
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Descubre nuestras últimas creaciones, behind the scenes, y entérate de eventos 
            y ofertas exclusivas.
          </p>
          <a 
            href="https://instagram.com/azabache_draws" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Instagram className="h-5 w-5" /> @azabache_draws
          </a>
        </div>
      </section>
    </div>
  );
}
