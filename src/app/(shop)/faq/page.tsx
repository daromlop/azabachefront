'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, Truck, CreditCard, RefreshCw, Package, Mail } from 'lucide-react';

const faqs = [
  {
    category: 'Envíos',
    icon: Truck,
    questions: [
      {
        question: '¿Cuánto tarda en llegar mi pedido?',
        answer: 'Los pedidos se preparan en 1-3 días laborables. Una vez enviado, el tiempo de entrega depende de tu ubicación: España peninsular 24-48h, Baleares y Canarias 3-5 días, Europa 5-10 días.'
      },
      {
        question: '¿Cuánto cuesta el envío?',
        answer: 'El envío tiene un coste de 4,99€ para España peninsular. ¡En pedidos superiores a 50€ el envío es GRATIS! Para otros destinos, el coste se calcula en el checkout.'
      },
      {
        question: '¿Hacéis envíos internacionales?',
        answer: 'Sí, enviamos a toda Europa y estamos trabajando para ampliar a más países. Contacta con nosotros si quieres saber si enviamos a tu país.'
      }
    ]
  },
  {
    category: 'Pagos',
    icon: CreditCard,
    questions: [
      {
        question: '¿Qué métodos de pago aceptáis?',
        answer: 'Aceptamos tarjeta de crédito/débito (Visa, Mastercard), PayPal, y Bizum. Todos los pagos son 100% seguros.'
      },
      {
        question: '¿Es seguro comprar en vuestra web?',
        answer: 'Absolutamente. Utilizamos encriptación SSL y no almacenamos datos de tarjetas. Todos los pagos se procesan a través de pasarelas seguras.'
      }
    ]
  },
  {
    category: 'Devoluciones',
    icon: RefreshCw,
    questions: [
      {
        question: '¿Puedo devolver un producto?',
        answer: 'Sí, tienes 14 días desde la recepción para devolver cualquier producto sin uso y en su embalaje original. Te reembolsamos el importe íntegro.'
      },
      {
        question: '¿Qué hago si mi producto llega dañado?',
        answer: 'Contacta con nosotros inmediatamente con fotos del producto y el embalaje. Te enviaremos uno nuevo o te reembolsamos el importe completo.'
      }
    ]
  },
  {
    category: 'Productos',
    icon: Package,
    questions: [
      {
        question: '¿De qué materiales están hechas las joyas?',
        answer: 'Utilizamos principalmente aleaciones de zinc, plata de ley 925, y baños en oro. Todos nuestros materiales son hipoalergénicos. En cada producto especificamos el material usado.'
      },
      {
        question: '¿Cómo cuido mis joyas?',
        answer: 'Evita el contacto con agua, perfumes y productos químicos. Guárdalas en un lugar seco y separadas entre sí. Límpialas con un paño suave cuando sea necesario.'
      },
      {
        question: '¿Hacéis pedidos personalizados?',
        answer: 'Dependiendo del diseño y la complejidad, podemos hacer piezas personalizadas. Contacta con nosotros para consultar disponibilidad y presupuesto.'
      },
      {
        question: '¿Los prints vienen enmarcados?',
        answer: 'No, los prints se envían sin marco para evitar daños durante el transporte y para que puedas elegir el marco que mejor se adapte a tu decoración. Se envían protegidos en tubos rígidos o sobres reforzados.'
      }
    ]
  },
  {
    category: 'Eventos',
    icon: HelpCircle,
    questions: [
      {
        question: '¿Cómo sé en qué eventos estaréis?',
        answer: 'Publicamos nuestro calendario de eventos en la web y en Instagram. También enviamos newsletters a nuestros suscriptores con toda la información.'
      },
      {
        question: '¿Los precios son los mismos en eventos que online?',
        answer: 'Generalmente sí, aunque en eventos solemos tener ofertas especiales y productos exclusivos que no encontrarás en la web.'
      }
    ]
  }
];

export default function FAQPage() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#FFF5FB]">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#9A5073] to-[#7a3d5a] py-16">
        <div className="container mx-auto px-4 text-center">
          <HelpCircle className="h-12 w-12 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Preguntas Frecuentes
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            ¿Tienes dudas? Aquí encontrarás las respuestas a las preguntas más comunes. 
            Si no encuentras lo que buscas, ¡contáctanos!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* FAQ Categories */}
        <div className="max-w-3xl mx-auto space-y-8">
          {faqs.map((category) => (
            <div key={category.category} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 p-6 border-b bg-[#FFF5FB]">
                <category.icon className="h-6 w-6 text-[#9A5073]" />
                <h2 className="text-xl font-bold text-[#1a1a1a]">{category.category}</h2>
              </div>
              <div className="divide-y">
                {category.questions.map((item, index) => {
                  const questionId = `${category.category}-${index}`;
                  const isOpen = openQuestion === questionId;
                  
                  return (
                    <div key={index} className="border-b last:border-b-0">
                      <button
                        onClick={() => toggleQuestion(questionId)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-[#1a1a1a] pr-4">{item.question}</span>
                        <ChevronDown 
                          className={`h-5 w-5 text-[#9A5073] flex-shrink-0 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 text-gray-600 animate-fade-in">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="max-w-3xl mx-auto mt-12 bg-[#1a1a1a] rounded-2xl p-8 text-center text-white">
          <Mail className="h-10 w-10 mx-auto mb-4 text-[#D4AF37]" />
          <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            ¿No encuentras tu respuesta?
          </h3>
          <p className="text-gray-400 mb-6">
            Escríbenos y te responderemos lo antes posible. Normalmente contestamos en menos de 24 horas.
          </p>
          <a 
            href="mailto:hola@azabache.shop"
            className="btn-accent inline-flex items-center gap-2"
          >
            <Mail className="h-5 w-5" /> Contactar
          </a>
        </div>
      </div>
    </div>
  );
}
