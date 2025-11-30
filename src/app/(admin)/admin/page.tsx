'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Package, Calendar, Plus, Edit, Trash2, 
  Search, Users, ShoppingBag, DollarSign, Eye, X, MapPin,
  Info, CheckCircle, Settings, Image as ImageIcon,
  Globe, Mail, Instagram, Phone, Store, Palette, Tag, Clock,
  TrendingUp, FileText, Bell, Shield, CreditCard, Truck
} from 'lucide-react';
import { products as initialProducts, events, categories, themes } from '@/data/products';
import { Product } from '@/types';

type Tab = 'dashboard' | 'products' | 'events' | 'settings';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.theme.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteProduct = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const stats = {
    totalProducts: products.length,
    totalRevenue: products.reduce((acc, p) => acc + p.price * 10, 0),
    totalOrders: 156,
    totalCustomers: 89,
  };

  const upcomingEvents = events.filter(e => new Date(e.date) > new Date());
  const pastEvents = events.filter(e => new Date(e.date) <= new Date());

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-full">
      {/* Tab Navigation for Mobile */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 lg:hidden">
        {(['dashboard', 'products', 'events', 'settings'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
              activeTab === tab 
                ? 'bg-[#9A5073] text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab === 'dashboard' && 'Dashboard'}
            {tab === 'products' && 'Productos'}
            {tab === 'events' && 'Eventos'}
            {tab === 'settings' && 'Configuración'}
          </button>
        ))}
      </div>

      {/* ==================== DASHBOARD TAB ==================== */}
      {activeTab === 'dashboard' && (
        <div>
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Bienvenida Rosa, aquí tienes un resumen de tu tienda ✨</p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <Package className="h-6 w-6 sm:h-8 sm:w-8 text-[#9A5073]" />
                <span className="text-green-500 text-xs sm:text-sm">+12%</span>
              </div>
              <p className="text-xl sm:text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
              <p className="text-gray-500 text-xs sm:text-sm">Productos</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-[#D4AF37]" />
                <span className="text-green-500 text-xs sm:text-sm">+23%</span>
              </div>
              <p className="text-lg sm:text-3xl font-bold text-gray-900">{stats.totalRevenue.toFixed(0)}€</p>
              <p className="text-gray-500 text-xs sm:text-sm">Ingresos</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                <span className="text-green-500 text-xs sm:text-sm">+8%</span>
              </div>
              <p className="text-xl sm:text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
              <p className="text-gray-500 text-xs sm:text-sm">Pedidos</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
                <span className="text-green-500 text-xs sm:text-sm">+15%</span>
              </div>
              <p className="text-xl sm:text-3xl font-bold text-gray-900">{stats.totalCustomers}</p>
              <p className="text-gray-500 text-xs sm:text-sm">Clientes</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <button 
              onClick={() => setActiveTab('products')} 
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <Package className="h-8 w-8 text-[#9A5073] mx-auto mb-2" />
              <p className="text-sm font-medium">Productos</p>
            </button>
            <button 
              onClick={() => setActiveTab('events')} 
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <Calendar className="h-8 w-8 text-[#D4AF37] mx-auto mb-2" />
              <p className="text-sm font-medium">Eventos</p>
            </button>
            <button 
              onClick={() => setIsAddingProduct(true)} 
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <Plus className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Nuevo Producto</p>
            </button>
            <button 
              onClick={() => setActiveTab('settings')} 
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <Settings className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Configuración</p>
            </button>
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Productos Recientes</h2>
                <button onClick={() => setActiveTab('products')} className="text-[#9A5073] text-sm hover:underline">
                  Ver todos
                </button>
              </div>
              <div className="space-y-3">
                {products.slice(0, 4).map((product) => (
                  <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={product.images[0]} alt="" fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{product.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{product.category}</p>
                    </div>
                    <p className="font-semibold text-[#9A5073] text-sm">{product.price.toFixed(2)}€</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Próximos Eventos</h2>
                <button onClick={() => setActiveTab('events')} className="text-[#9A5073] text-sm hover:underline">
                  Ver todos
                </button>
              </div>
              {upcomingEvents.length > 0 ? (
                <div className="space-y-3">
                  {upcomingEvents.slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-[#9A5073]/10 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-[#9A5073]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{event.name}</p>
                        <p className="text-xs text-gray-500">{event.location}</p>
                      </div>
                      <p className="text-sm text-[#D4AF37] font-medium">
                        {new Date(event.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No hay eventos próximos</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================== PRODUCTS TAB ==================== */}
      {activeTab === 'products' && (
        <div>
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Gestión de Productos
            </h1>
            <p className="text-gray-500 mt-1">Añade, edita o elimina los productos de tu tienda</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900">¿Qué puedes hacer aquí?</h3>
                <ul className="text-sm text-blue-700 mt-1 space-y-1">
                  <li>• <strong>Añadir productos</strong>: Crea nuevas joyas o arte para tu catálogo</li>
                  <li>• <strong>Editar</strong>: Modifica precios, descripciones, fotos o stock</li>
                  <li>• <strong>Eliminar</strong>: Quita productos que ya no estén disponibles</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="bg-[#9A5073]/10 text-[#9A5073] px-3 py-1 rounded-full text-sm font-medium">
                {products.length} productos
              </span>
            </div>
            <button onClick={() => setIsAddingProduct(true)} className="btn-primary flex items-center justify-center gap-2">
              <Plus className="h-5 w-5" /> Añadir Producto
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o temática..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A5073]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative h-40">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">Nuevo</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{themes.find(t => t.id === product.theme)?.name}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[#9A5073]">{product.price.toFixed(2)}€</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-700' : product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      Stock: {product.stock}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Link href={`/producto/${product.id}`} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">
                      <Eye className="h-4 w-4" /> Ver
                    </Link>
                    <button onClick={() => setEditingProduct(product)} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200">
                      <Edit className="h-4 w-4" /> Editar
                    </button>
                    <button onClick={() => handleDeleteProduct(product.id)} className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== EVENTS TAB ==================== */}
      {activeTab === 'events' && (
        <div>
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Gestión de Eventos
            </h1>
            <p className="text-gray-500 mt-1">Administra los eventos donde participas con Azabache</p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-purple-900">¿Para qué sirve esta sección?</h3>
                <ul className="text-sm text-purple-700 mt-1 space-y-1">
                  <li>• <strong>Añadir eventos</strong>: Ferias, convenciones, mercadillos donde estarás presente</li>
                  <li>• <strong>Se muestran en la tienda</strong>: Los clientes verán estos eventos en la página principal y en /eventos</li>
                  <li>• <strong>Próximos eventos</strong>: Se destacan automáticamente los que están por venir</li>
                </ul>
                <p className="text-sm text-purple-600 mt-2 italic">💡 Tip: Añade eventos como Mangafest, Japan Weekend, mercadillos navideños, etc.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Clock className="h-4 w-4" /> {upcomingEvents.length} próximos
              </span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                {pastEvents.length} pasados
              </span>
            </div>
            <button onClick={() => setIsAddingEvent(true)} className="btn-primary flex items-center justify-center gap-2">
              <Plus className="h-5 w-5" /> Añadir Evento
            </button>
          </div>

          {upcomingEvents.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" /> Próximos Eventos
              </h2>
              <div className="grid gap-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border-l-4 border-green-500">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={event.image} alt={event.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{event.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex sm:flex-col gap-2">
                        <button className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 flex items-center justify-center gap-1">
                          <Edit className="h-4 w-4" /> Editar
                        </button>
                        <button className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 flex items-center justify-center gap-1">
                          <Trash2 className="h-4 w-4" /> Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {pastEvents.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-400" /> Eventos Pasados
              </h2>
              <div className="grid gap-4">
                {pastEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-xl shadow-sm p-4 opacity-60">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 grayscale">
                        <Image src={event.image} alt={event.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-700">{event.name}</h3>
                        <p className="text-sm text-gray-500">{event.location} - {new Date(event.date).toLocaleDateString('es-ES')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================== SETTINGS TAB ==================== */}
      {activeTab === 'settings' && (
        <div>
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Configuración
            </h1>
            <p className="text-gray-500 mt-1">Personaliza tu tienda y gestiona las opciones</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-900">¿Qué puedes configurar aquí?</h3>
                <ul className="text-sm text-amber-700 mt-1 space-y-1">
                  <li>• <strong>Información de la tienda</strong>: Nombre, descripción, contacto</li>
                  <li>• <strong>Redes sociales</strong>: Instagram, email de contacto</li>
                  <li>• <strong>Categorías y temáticas</strong>: Organiza tus productos</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Store className="h-6 w-6 text-[#9A5073]" />
                <h2 className="text-lg font-bold text-gray-900">Información de la Tienda</h2>
              </div>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Tienda</label>
                  <input type="text" defaultValue="Azabache" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A5073]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Eslogan</label>
                  <input type="text" defaultValue="🖤 Bookish Gifts, for readers 📔 and Dark Fantasy 🦇" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A5073]" />
                </div>
              </div>
              <button className="btn-primary mt-4">Guardar Cambios</button>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-6 w-6 text-[#9A5073]" />
                <h2 className="text-lg font-bold text-gray-900">Información de Contacto</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" defaultValue="hola@azabache.com" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A5073]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                  <input type="text" defaultValue="@azabache_draws" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A5073]" />
                </div>
              </div>
              <button className="btn-primary mt-4">Guardar Cambios</button>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Tag className="h-6 w-6 text-[#9A5073]" />
                <h2 className="text-lg font-bold text-gray-900">Categorías</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <span key={cat.id} className="px-4 py-2 bg-gray-100 rounded-lg text-sm">{cat.name}</span>
                ))}
              </div>
              <button className="mt-4 text-[#9A5073] text-sm font-medium flex items-center gap-1">
                <Plus className="h-4 w-4" /> Añadir categoría
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="h-6 w-6 text-[#9A5073]" />
                <h2 className="text-lg font-bold text-gray-900">Temáticas</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {themes.map((theme) => (
                  <span key={theme.id} className="px-4 py-2 bg-[#9A5073]/10 text-[#9A5073] rounded-lg text-sm">
                    {theme.icon} {theme.name}
                  </span>
                ))}
              </div>
              <button className="mt-4 text-[#9A5073] text-sm font-medium flex items-center gap-1">
                <Plus className="h-4 w-4" /> Añadir temática
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200">
              <h2 className="text-lg font-bold text-gray-400 mb-4">Próximamente...</h2>
              <div className="grid sm:grid-cols-3 gap-4 text-gray-400">
                <div className="flex items-center gap-3"><CreditCard className="h-5 w-5" /><span className="text-sm">Métodos de pago</span></div>
                <div className="flex items-center gap-3"><Truck className="h-5 w-5" /><span className="text-sm">Opciones de envío</span></div>
                <div className="flex items-center gap-3"><Bell className="h-5 w-5" /><span className="text-sm">Notificaciones</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODALS ==================== */}
      {(isAddingProduct || editingProduct) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
              <button onClick={() => { setIsAddingProduct(false); setEditingProduct(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                <input type="text" defaultValue={editingProduct?.name || ''} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#9A5073]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción *</label>
                <textarea rows={3} defaultValue={editingProduct?.description || ''} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#9A5073]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Precio (€) *</label>
                  <input type="number" step="0.01" defaultValue={editingProduct?.price || ''} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#9A5073]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock *</label>
                  <input type="number" defaultValue={editingProduct?.stock || ''} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#9A5073]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoría *</label>
                  <select defaultValue={editingProduct?.category || ''} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#9A5073]">
                    <option value="">Seleccionar...</option>
                    {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Temática *</label>
                  <select defaultValue={editingProduct?.theme || ''} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#9A5073]">
                    <option value="">Seleccionar...</option>
                    {themes.map((theme) => (<option key={theme.id} value={theme.id}>{theme.icon} {theme.name}</option>))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL de Imagen *</label>
                <input type="url" defaultValue={editingProduct?.images[0] || ''} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#9A5073]" />
              </div>
            </div>
            <div className="sticky bottom-0 bg-white p-4 border-t flex gap-3">
              <button onClick={() => { setIsAddingProduct(false); setEditingProduct(null); }} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Cancelar</button>
              <button className="flex-1 btn-primary">{editingProduct ? 'Guardar' : 'Crear'}</button>
            </div>
          </div>
        </div>
      )}

      {isAddingEvent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">Nuevo Evento</h2>
              <button onClick={() => setIsAddingEvent(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Evento *</label>
                <input type="text" placeholder="Ej: Mangafest 2025" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#9A5073]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción *</label>
                <textarea rows={3} placeholder="Describe el evento..." className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#9A5073]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha *</label>
                  <input type="date" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#9A5073]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación *</label>
                  <input type="text" placeholder="Ej: FIBES, Sevilla" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#9A5073]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL de Imagen *</label>
                <input type="url" placeholder="https://..." className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#9A5073]" />
              </div>
            </div>
            <div className="sticky bottom-0 bg-white p-4 border-t flex gap-3">
              <button onClick={() => setIsAddingEvent(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Cancelar</button>
              <button className="flex-1 btn-primary">Crear Evento</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
