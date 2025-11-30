import Image from 'next/image';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';
import { events } from '@/data/products';

export default function EventsPage() {
  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const upcomingEvents = sortedEvents.filter(e => new Date(e.date) >= new Date());
  const pastEvents = sortedEvents.filter(e => new Date(e.date) < new Date());

  return (
    <div className="min-h-screen bg-[#FFF5FB]">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#9A5073] to-[#7a3d5a] py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-4">
            📅 Calendario de Eventos
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Encuéntranos en Persona
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Visítanos en ferias, convenciones y mercadillos donde podrás ver nuestras creaciones 
            en persona, probártelas y llevarte piezas exclusivas solo disponibles en eventos.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Upcoming Events */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Próximos Eventos ✨
          </h2>
          
          {upcomingEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {upcomingEvents.map((event, index) => (
                <div 
                  key={event.id} 
                  className={`bg-white rounded-2xl overflow-hidden shadow-lg card-hover ${
                    index === 0 ? 'md:col-span-2' : ''
                  }`}
                >
                  <div className={`grid ${index === 0 ? 'md:grid-cols-2' : ''}`}>
                    <div className={`relative ${index === 0 ? 'h-64 md:h-auto' : 'h-48'}`}>
                      <Image
                        src={event.image}
                        alt={event.name}
                        fill
                        className="object-cover"
                      />
                      {event.standNumber && (
                        <span className="absolute top-4 left-4 px-4 py-2 bg-[#D4AF37] text-[#1a1a1a] rounded-full font-bold">
                          Stand {event.standNumber}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        {event.name}
                      </h3>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-3 text-gray-600">
                          <Calendar className="h-5 w-5 text-[#9A5073]" />
                          <span>
                            {new Date(event.date).toLocaleDateString('es-ES', { 
                              weekday: 'long',
                              day: 'numeric', 
                              month: 'long',
                              year: 'numeric'
                            })}
                            {event.endDate && (
                              <> - {new Date(event.endDate).toLocaleDateString('es-ES', { 
                                day: 'numeric', 
                                month: 'long'
                              })}</>
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <MapPin className="h-5 w-5 text-[#9A5073]" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-6">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1 bg-[#FFF5FB] text-[#9A5073] rounded-full text-sm">
                          ✨ Descuentos especiales
                        </span>
                        <span className="px-3 py-1 bg-[#FFF5FB] text-[#9A5073] rounded-full text-sm">
                          🎁 Exclusivas de evento
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center">
              <p className="text-4xl mb-4">📅</p>
              <p className="text-gray-600">
                No hay eventos próximos programados. ¡Síguenos en Instagram para enterarte de las novedades!
              </p>
            </div>
          )}
        </section>

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Eventos Anteriores
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-xl overflow-hidden opacity-75">
                  <div className="relative h-40">
                    <Image
                      src={event.image}
                      alt={event.name}
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-700">{event.name}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString('es-ES', { 
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Info Section */}
        <section className="mt-16 bg-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            ¿Por qué visitarnos en eventos?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">👀</div>
              <h3 className="font-semibold text-[#1a1a1a] mb-2">Ver en persona</h3>
              <p className="text-gray-600 text-sm">
                Aprecia los detalles y la calidad de cada pieza antes de comprar
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="font-semibold text-[#1a1a1a] mb-2">Exclusivas</h3>
              <p className="text-gray-600 text-sm">
                Piezas únicas y ediciones limitadas solo disponibles en eventos
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-semibold text-[#1a1a1a] mb-2">Conócenos</h3>
              <p className="text-gray-600 text-sm">
                Charla con nosotros sobre tus fandoms favoritos
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
