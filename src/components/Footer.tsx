import Link from 'next/link';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Newsletter Section */}
      <div className="bg-[#9A5073] py-12 -mb-px">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">¡Únete a nuestra comunidad mágica!</h3>
          <p className="text-white/80 mb-6">Recibe novedades, ofertas exclusivas y entérate de los próximos eventos</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu email mágico"
              className="flex-1 px-4 py-3 rounded-lg bg-white text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
            <button type="submit" className="btn-accent">
              Suscribirse ✨
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold text-gradient mb-4 block">
              Azabache
            </Link>
            <p className="text-gray-400 mb-4">
              🖤 Bookish Gifts, for readers 📔 and Dark Fantasy 🦇
            </p>
            <p className="text-gray-400 text-sm">
              Joyería artesanal y arte gráfico con temática friki, gótica y fantasy. 
              Creaciones únicas hechas con amor por Rosa para almas mágicas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tienda" className="text-gray-400 hover:text-white transition-colors">
                  Tienda
                </Link>
              </li>
              <li>
                <Link href="/tienda?category=jewelry" className="text-gray-400 hover:text-white transition-colors">
                  Joyería
                </Link>
              </li>
              <li>
                <Link href="/tienda?category=art" className="text-gray-400 hover:text-white transition-colors">
                  Arte Gráfico
                </Link>
              </li>
              <li>
                <Link href="/eventos" className="text-gray-400 hover:text-white transition-colors">
                  Próximos Eventos
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="text-gray-400 hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Themes */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Temáticas Populares</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tienda?theme=harry-potter" className="text-gray-400 hover:text-white transition-colors">
                  ⚡ Harry Potter
                </Link>
              </li>
              <li>
                <Link href="/tienda?theme=lord-of-the-rings" className="text-gray-400 hover:text-white transition-colors">
                  💍 El Señor de los Anillos
                </Link>
              </li>
              <li>
                <Link href="/tienda?theme=studio-ghibli" className="text-gray-400 hover:text-white transition-colors">
                  🌙 Studio Ghibli
                </Link>
              </li>
              <li>
                <Link href="/tienda?theme=dark-academia" className="text-gray-400 hover:text-white transition-colors">
                  📚 Dark Academia
                </Link>
              </li>
              <li>
                <Link href="/tienda?theme=witchy" className="text-gray-400 hover:text-white transition-colors">
                  🔮 Witchy
                </Link>
              </li>
              <li>
                <Link href="/tienda?theme=dragons" className="text-gray-400 hover:text-white transition-colors">
                  🐉 Dragones
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="h-5 w-5 text-[#9A5073]" />
                <a href="mailto:hola@azabache.shop" className="hover:text-white transition-colors">
                  hola@azabache.shop
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Instagram className="h-5 w-5 text-[#9A5073]" />
                <a href="https://instagram.com/azabache_draws" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  @azabache_draws
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-5 w-5 text-[#9A5073]" />
                <span>Sevilla, España</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="h-5 w-5 text-[#9A5073]" />
                <span>+34 600 000 000</span>
              </li>
            </ul>

            {/* Social */}
            <div className="mt-6 flex gap-4">
              <a 
                href="https://instagram.com/azabache_draws" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#9A5073] rounded-full flex items-center justify-center hover:bg-[#b86d8f] transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© 2025 Azabache. Todos los derechos reservados.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacidad" className="hover:text-white transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-white transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="/envios" className="hover:text-white transition-colors">
              Política de Envíos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
