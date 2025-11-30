import { Product, Event, Category } from '@/types';

// Productos de ejemplo con imágenes de Unsplash
export const products: Product[] = [
  // JOYERÍA - COLGANTES
  {
    id: '1',
    name: 'Colgante Reliquias de la Muerte',
    description: 'Elegante colgante de plata con el símbolo de las Reliquias de la Muerte. Perfecto para cualquier Potterhead que quiera llevar la magia consigo. Cadena de 45cm incluida.',
    price: 24.99,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500'
    ],
    category: 'jewelry',
    subcategory: 'necklace',
    theme: 'harry-potter',
    stock: 15,
    featured: true,
    isNew: false,
    onSale: false,
    rating: 4.8,
    reviews: [
      { id: 'r1', userName: 'María G.', rating: 5, comment: '¡Precioso! Tal como en las fotos.', date: '2025-11-15' },
      { id: 'r2', userName: 'Carlos P.', rating: 5, comment: 'Regalo perfecto para mi novia fan de HP.', date: '2025-11-10' }
    ],
    createdAt: '2025-01-15'
  },
  {
    id: '2',
    name: 'Colgante Evenstar Arwen',
    description: 'Réplica del colgante Evenstar de Arwen del Señor de los Anillos. Elaborado en aleación de plata con cristal central. Un símbolo de amor eterno.',
    price: 34.99,
    originalPrice: 44.99,
    images: [
      'https://images.unsplash.com/photo-1603974372039-adc49044b6bd?w=500',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500'
    ],
    category: 'jewelry',
    subcategory: 'necklace',
    theme: 'lord-of-the-rings',
    stock: 8,
    featured: true,
    isNew: false,
    onSale: true,
    rating: 4.9,
    reviews: [
      { id: 'r3', userName: 'Laura M.', rating: 5, comment: 'Absolutamente hermoso, muy detallado.', date: '2025-11-20' }
    ],
    createdAt: '2025-02-20'
  },
  {
    id: '3',
    name: 'Colgante Totoro en la Luna',
    description: 'Adorable colgante de Totoro sentado en una luna creciente. Hecho a mano con resina y detalles en dorado. Para los amantes de Studio Ghibli.',
    price: 19.99,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500'
    ],
    category: 'jewelry',
    subcategory: 'necklace',
    theme: 'studio-ghibli',
    stock: 20,
    featured: true,
    isNew: true,
    onSale: false,
    rating: 4.7,
    reviews: [],
    createdAt: '2025-11-01'
  },
  {
    id: '4',
    name: 'Colgante Dragón Targaryen',
    description: 'Majestuoso colgante con dragón de tres cabezas, símbolo de la Casa Targaryen. Acabado en plata antigua con detalles en rojo rubí.',
    price: 29.99,
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500'
    ],
    category: 'jewelry',
    subcategory: 'necklace',
    theme: 'game-of-thrones',
    stock: 12,
    featured: false,
    isNew: false,
    onSale: false,
    rating: 4.6,
    reviews: [
      { id: 'r4', userName: 'Pedro S.', rating: 4, comment: 'Muy bonito, aunque un poco más pequeño de lo esperado.', date: '2025-10-05' }
    ],
    createdAt: '2025-03-10'
  },

  // JOYERÍA - PENDIENTES
  {
    id: '5',
    name: 'Pendientes Luna y Estrella Mágicos',
    description: 'Pendientes asimétricos con luna creciente y estrella. Perfectos para un look místico y encantador. Cierre de mariposa.',
    price: 16.99,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500'
    ],
    category: 'jewelry',
    subcategory: 'earrings',
    theme: 'witchy',
    stock: 25,
    featured: true,
    isNew: false,
    onSale: false,
    rating: 4.8,
    reviews: [
      { id: 'r5', userName: 'Ana R.', rating: 5, comment: '¡Son preciosos! Muy ligeros y cómodos.', date: '2025-11-18' }
    ],
    createdAt: '2025-04-15'
  },
  {
    id: '6',
    name: 'Pendientes Alas de Dragón',
    description: 'Espectaculares pendientes con forma de alas de dragón. Diseño gótico con acabado en plata envejecida. Para las almas más salvajes.',
    price: 22.99,
    images: [
      'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=500',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500'
    ],
    category: 'jewelry',
    subcategory: 'earrings',
    theme: 'dragons',
    stock: 18,
    featured: false,
    isNew: true,
    onSale: false,
    rating: 4.9,
    reviews: [],
    createdAt: '2025-11-10'
  },
  {
    id: '7',
    name: 'Pendientes Snitch Dorada',
    description: 'Delicados pendientes con forma de Snitch Dorada. Las alas tienen movimiento para un efecto mágico. Ideal para fans de Quidditch.',
    price: 18.99,
    originalPrice: 24.99,
    images: [
      'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=500',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500'
    ],
    category: 'jewelry',
    subcategory: 'earrings',
    theme: 'harry-potter',
    stock: 30,
    featured: true,
    isNew: false,
    onSale: true,
    rating: 4.7,
    reviews: [
      { id: 'r6', userName: 'Elena V.', rating: 5, comment: 'Perfectos para el día a día, muy discretos.', date: '2025-10-25' }
    ],
    createdAt: '2025-05-20'
  },

  // JOYERÍA - PULSERAS
  {
    id: '8',
    name: 'Pulsera Símbolos Élficos',
    description: 'Elegante pulsera con grabados de símbolos élficos del Señor de los Anillos. Ajustable, en aleación de plata. Un must para cualquier fan de Tolkien.',
    price: 27.99,
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500'
    ],
    category: 'jewelry',
    subcategory: 'bracelet',
    theme: 'lord-of-the-rings',
    stock: 10,
    featured: false,
    isNew: false,
    onSale: false,
    rating: 4.5,
    reviews: [],
    createdAt: '2025-06-10'
  },
  {
    id: '9',
    name: 'Pulsera Casas de Hogwarts',
    description: 'Pulsera con charms de las cuatro casas de Hogwarts. Incluye león, serpiente, águila y tejón. Perfecta para el mago indeciso.',
    price: 32.99,
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500'
    ],
    category: 'jewelry',
    subcategory: 'bracelet',
    theme: 'harry-potter',
    stock: 14,
    featured: true,
    isNew: false,
    onSale: false,
    rating: 4.8,
    reviews: [
      { id: 'r7', userName: 'Sara L.', rating: 5, comment: 'Los charms son súper detallados, me encanta.', date: '2025-11-12' }
    ],
    createdAt: '2025-07-05'
  },
  {
    id: '10',
    name: 'Pulsera Sailor Moon',
    description: 'Pulsera inspirada en Sailor Moon con cristales en tonos rosa y dorado. Cierre magnético. En nombre de la luna, ¡te castigaré!',
    price: 21.99,
    images: [
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500'
    ],
    category: 'jewelry',
    subcategory: 'bracelet',
    theme: 'anime',
    stock: 22,
    featured: false,
    isNew: true,
    onSale: false,
    rating: 4.6,
    reviews: [],
    createdAt: '2025-11-05'
  },

  // JOYERÍA - ANILLOS
  {
    id: '11',
    name: 'Anillo Único (El Señor de los Anillos)',
    description: 'Réplica del Anillo Único con inscripción élfica que brilla en la oscuridad. Disponible en varias tallas. Un anillo para gobernarlos a todos.',
    price: 19.99,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500'
    ],
    category: 'jewelry',
    subcategory: 'ring',
    theme: 'lord-of-the-rings',
    stock: 40,
    featured: true,
    isNew: false,
    onSale: false,
    rating: 4.9,
    reviews: [
      { id: 'r8', userName: 'Diego M.', rating: 5, comment: 'Increíble que brille en la oscuridad, muy chulo.', date: '2025-11-22' }
    ],
    createdAt: '2025-01-20'
  },
  {
    id: '12',
    name: 'Anillo Serpiente Slytherin',
    description: 'Anillo con diseño de serpiente enrollada, representando la casa Slytherin. Acabado en plata con ojos de esmeralda. Ambición y astucia.',
    price: 24.99,
    images: [
      'https://images.unsplash.com/photo-1603974372039-adc49044b6bd?w=500',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500'
    ],
    category: 'jewelry',
    subcategory: 'ring',
    theme: 'harry-potter',
    stock: 16,
    featured: false,
    isNew: false,
    onSale: false,
    rating: 4.7,
    reviews: [],
    createdAt: '2025-08-15'
  },

  // JOYERÍA - BROCHES
  {
    id: '13',
    name: 'Broche Hoja de Lórien',
    description: 'Broche élfico con forma de hoja de Lothlórien. Ideal para capas, chaquetas o como accesorio de bolso. Regalo de la Dama Galadriel.',
    price: 15.99,
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500'
    ],
    category: 'jewelry',
    subcategory: 'brooch',
    theme: 'lord-of-the-rings',
    stock: 28,
    featured: false,
    isNew: false,
    onSale: false,
    rating: 4.6,
    reviews: [],
    createdAt: '2025-09-01'
  },
  {
    id: '14',
    name: 'Broche Gato Negro Mágico',
    description: 'Adorable broche de gato negro con sombrero de bruja. Perfecto para el look cottagecore/witchy. Esmaltado a mano.',
    price: 12.99,
    originalPrice: 16.99,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500',
      'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=500'
    ],
    category: 'jewelry',
    subcategory: 'brooch',
    theme: 'witchy',
    stock: 35,
    featured: true,
    isNew: false,
    onSale: true,
    rating: 4.8,
    reviews: [
      { id: 'r9', userName: 'Luna S.', rating: 5, comment: '¡Es tan cute! Lo llevo en mi mochila.', date: '2025-11-08' }
    ],
    createdAt: '2025-04-20'
  },

  // ARTE - PRINTS
  {
    id: '15',
    name: 'Print Castillo de Howl',
    description: 'Ilustración artística del Castillo Ambulante de Howl al atardecer. Impreso en papel de alta calidad 300g. Tamaño A4.',
    price: 14.99,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500'
    ],
    category: 'art',
    subcategory: 'print',
    theme: 'studio-ghibli',
    stock: 50,
    featured: true,
    isNew: false,
    onSale: false,
    rating: 4.9,
    reviews: [
      { id: 'r10', userName: 'Marta C.', rating: 5, comment: 'Los colores son increíbles, ya lo tengo enmarcado.', date: '2025-11-19' }
    ],
    createdAt: '2025-02-10'
  },
  {
    id: '16',
    name: 'Print Dark Academia Library',
    description: 'Ilustración de una misteriosa biblioteca con estética Dark Academia. Tonos ocres y sombras dramáticas. Tamaño A4.',
    price: 14.99,
    images: [
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=500',
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500'
    ],
    category: 'art',
    subcategory: 'print',
    theme: 'dark-academia',
    stock: 45,
    featured: true,
    isNew: false,
    onSale: false,
    rating: 4.8,
    reviews: [],
    createdAt: '2025-03-15'
  },
  {
    id: '17',
    name: 'Print Dragón de Fuego',
    description: 'Espectacular ilustración de un dragón emergiendo de las llamas. Estilo fantasy épico. Tamaño A3.',
    price: 19.99,
    images: [
      'https://images.unsplash.com/photo-1577493340887-b7bfff550145?w=500',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500'
    ],
    category: 'art',
    subcategory: 'print',
    theme: 'dragons',
    stock: 30,
    featured: false,
    isNew: true,
    onSale: false,
    rating: 4.7,
    reviews: [],
    createdAt: '2025-11-15'
  },
  {
    id: '18',
    name: 'Print Maleficent Portrait',
    description: 'Retrato artístico de Maléfica con su icónico look. Tonos verdes y morados. Para los amantes de los villanos Disney.',
    price: 14.99,
    originalPrice: 19.99,
    images: [
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500'
    ],
    category: 'art',
    subcategory: 'print',
    theme: 'disney-villains',
    stock: 25,
    featured: false,
    isNew: false,
    onSale: true,
    rating: 4.6,
    reviews: [],
    createdAt: '2025-05-10'
  },

  // ARTE - STICKERS
  {
    id: '19',
    name: 'Pack Stickers Studio Ghibli',
    description: 'Set de 10 stickers holográficos con personajes de Studio Ghibli: Totoro, Sin Cara, Calcifer y más. Resistentes al agua.',
    price: 8.99,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
      'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=500'
    ],
    category: 'art',
    subcategory: 'sticker',
    theme: 'studio-ghibli',
    stock: 60,
    featured: true,
    isNew: false,
    onSale: false,
    rating: 4.9,
    reviews: [
      { id: 'r11', userName: 'Nerea P.', rating: 5, comment: 'Son preciosos y el efecto holográfico es genial.', date: '2025-11-21' }
    ],
    createdAt: '2025-06-20'
  },
  {
    id: '20',
    name: 'Pack Stickers Pociones Mágicas',
    description: 'Colección de 8 stickers con diseños de pociones y calderos. Estética witchy/cottagecore. Vinilo de alta calidad.',
    price: 6.99,
    images: [
      'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=500',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
    ],
    category: 'art',
    subcategory: 'sticker',
    theme: 'witchy',
    stock: 75,
    featured: false,
    isNew: false,
    onSale: false,
    rating: 4.7,
    reviews: [],
    createdAt: '2025-07-15'
  },

  // ARTE - MARCAPÁGINAS
  {
    id: '21',
    name: 'Marcapáginas Varita Mágica',
    description: 'Marcapáginas metálico con forma de varita mágica y detalle de pluma de fénix. Para lectores mágicos.',
    price: 7.99,
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500'
    ],
    category: 'art',
    subcategory: 'bookmark',
    theme: 'harry-potter',
    stock: 40,
    featured: false,
    isNew: false,
    onSale: false,
    rating: 4.5,
    reviews: [],
    createdAt: '2025-08-10'
  },
  {
    id: '22',
    name: 'Marcapáginas Árbol de Gondor',
    description: 'Elegante marcapáginas metálico con el diseño del Árbol Blanco de Gondor. Acabado en plata antigua.',
    price: 8.99,
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500'
    ],
    category: 'art',
    subcategory: 'bookmark',
    theme: 'lord-of-the-rings',
    stock: 35,
    featured: false,
    isNew: true,
    onSale: false,
    rating: 4.8,
    reviews: [],
    createdAt: '2025-11-08'
  },

  // ARTE - POSTALES
  {
    id: '23',
    name: 'Set Postales Anime Clásico',
    description: 'Colección de 6 postales con ilustraciones de anime clásico: Akira, Ghost in the Shell, Evangelion y más. Impresión premium.',
    price: 9.99,
    images: [
      'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=500',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500'
    ],
    category: 'art',
    subcategory: 'postcard',
    theme: 'anime',
    stock: 55,
    featured: false,
    isNew: false,
    onSale: false,
    rating: 4.6,
    reviews: [],
    createdAt: '2025-09-15'
  },
  {
    id: '24',
    name: 'Set Postales Mitología Griega',
    description: 'Set de 8 postales con ilustraciones de dioses y criaturas mitológicas griegas. Estilo artístico clásico con toques modernos.',
    price: 11.99,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
      'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=500'
    ],
    category: 'art',
    subcategory: 'postcard',
    theme: 'mythology',
    stock: 40,
    featured: false,
    isNew: false,
    onSale: false,
    rating: 4.7,
    reviews: [],
    createdAt: '2025-10-01'
  }
];

// Eventos próximos
export const events: Event[] = [
  {
    id: 'e1',
    name: 'Mangafest 2025',
    location: 'FIBES - Sevilla',
    date: '2025-12-05',
    endDate: '2025-12-07',
    description: 'El mayor evento de cultura japonesa y manga del sur de España. ¡Nos vemos en nuestro stand con todas las novedades!',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600',
    standNumber: 'A-42'
  },
  {
    id: 'e2',
    name: 'Salón del Cómic de Granada',
    location: 'Palacio de Congresos - Granada',
    date: '2026-01-17',
    endDate: '2026-01-18',
    description: 'Feria de cómic, manga y cultura alternativa. Presentaremos nuestra nueva colección de joyería Dark Academia.',
    image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=600',
    standNumber: 'B-15'
  },
  {
    id: 'e3',
    name: 'Friki Market Málaga',
    location: 'Centro Comercial Larios - Málaga',
    date: '2026-02-14',
    description: 'Mercadillo mensual de productos frikis. Ediciones limitadas y descuentos especiales solo disponibles en el evento.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    standNumber: 'Mesa 7'
  },
  {
    id: 'e4',
    name: 'Japan Weekend Madrid',
    location: 'IFEMA - Madrid',
    date: '2026-03-21',
    endDate: '2026-03-22',
    description: 'El evento más grande de cultura japonesa en España. No te pierdas nuestras exclusivas de evento.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600',
    standNumber: 'Por confirmar'
  }
];

// Categorías
export const categories: Category[] = [
  {
    id: 'c1',
    name: 'Joyería',
    slug: 'jewelry',
    description: 'Collares, pendientes, pulseras, anillos y broches con diseños únicos de fantasía.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
    subcategories: [
      { id: 's1', name: 'Colgantes', slug: 'necklace' },
      { id: 's2', name: 'Pendientes', slug: 'earrings' },
      { id: 's3', name: 'Pulseras', slug: 'bracelet' },
      { id: 's4', name: 'Anillos', slug: 'ring' },
      { id: 's5', name: 'Broches', slug: 'brooch' }
    ]
  },
  {
    id: 'c2',
    name: 'Arte Gráfico',
    slug: 'art',
    description: 'Prints, stickers, marcapáginas y postales con ilustraciones originales.',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400',
    subcategories: [
      { id: 's6', name: 'Prints', slug: 'print' },
      { id: 's7', name: 'Stickers', slug: 'sticker' },
      { id: 's8', name: 'Marcapáginas', slug: 'bookmark' },
      { id: 's9', name: 'Postales', slug: 'postcard' }
    ]
  }
];

// Temáticas
export const themes = [
  { id: 'harry-potter', name: 'Harry Potter', icon: '⚡' },
  { id: 'lord-of-the-rings', name: 'El Señor de los Anillos', icon: '💍' },
  { id: 'game-of-thrones', name: 'Juego de Tronos', icon: '🐉' },
  { id: 'studio-ghibli', name: 'Studio Ghibli', icon: '🌙' },
  { id: 'anime', name: 'Anime Clásico', icon: '⭐' },
  { id: 'disney-villains', name: 'Villanos Disney', icon: '👑' },
  { id: 'dragons', name: 'Dragones', icon: '🔥' },
  { id: 'dark-academia', name: 'Dark Academia', icon: '📚' },
  { id: 'witchy', name: 'Witchy / Brujería', icon: '🔮' },
  { id: 'gothic', name: 'Gótico', icon: '🦇' },
  { id: 'mythology', name: 'Mitología', icon: '⚔️' },
  { id: 'fairy-tales', name: 'Cuentos de Hadas', icon: '🧚' }
];

// Helper functions
export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

export const getProductsByTheme = (theme: string): Product[] => {
  return products.filter(p => p.theme === theme);
};

export const getProductsBySubcategory = (subcategory: string): Product[] => {
  return products.filter(p => p.subcategory === subcategory);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(p => p.isNew);
};

export const getOnSaleProducts = (): Product[] => {
  return products.filter(p => p.onSale);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery) ||
    p.theme.toLowerCase().includes(lowercaseQuery)
  );
};
