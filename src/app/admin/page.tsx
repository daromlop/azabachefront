'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Package, Calendar, Plus, Edit, Trash2, 
  Search, Users, ShoppingBag, DollarSign, Eye, X, MapPin
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

      {/* Dashboard */}
      {activeTab === 'dashboard' && (
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Dashboard
          </h1>
          
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
              <Edit className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Configuración</p>
            </button>
          </div>

          {/* Recent Products */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Productos Recientes</h2>
            <div className="space-y-3">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={product.images[0]} alt="" fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{product.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{product.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-[#9A5073] text-sm">{product.price.toFixed(2)}€</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      product.stock > 10 ? 'bg-green-100 text-green-700' : 
                      product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.stock} uds
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Gestión de Productos
            </h1>
            <button onClick={() => setIsAddingProduct(true)} className="btn-primary flex items-center justify-center gap-2">
              <Plus className="h-5 w-5" /> Añadir Producto
            </button>
          </div>

          {/* Search */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A5073]"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative h-40">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Nuevo
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {themes.find(t => t.id === product.theme)?.name || product.theme}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[#9A5073]">{product.price.toFixed(2)}€</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.stock > 10 ? 'bg-green-100 text-green-700' : 
                      product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      Stock: {product.stock}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Link 
                      href={`/producto/${product.id}`}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                    >
                      <Eye className="h-4 w-4" /> Ver
                    </Link>
                    <button 
                      onClick={() => setEditingProduct(product)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                    >
                      <Edit className="h-4 w-4" /> Editar
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(product.id)}
                      className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Events Tab */}
      {activeTab === 'events' && (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Gestión de Eventos
            </h1>
            <button className="btn-primary flex items-center justify-center gap-2">
              <Plus className="h-5 w-5" /> Añadir Evento
            </button>
          </div>

          <div className="grid gap-4">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={event.image} alt={event.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{event.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        new Date(event.date) > new Date() 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {new Date(event.date) > new Date() ? 'Próximamente' : 'Finalizado'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.date).toLocaleDateString('es-ES', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex sm:flex-col gap-2 sm:ml-4">
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                      Editar
                    </button>
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-colors">
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Configuración
          </h1>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Información de la Tienda</h2>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Tienda</label>
                  <input 
                    type="text" 
                    defaultValue="Azabache" 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A5073]" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email de Contacto</label>
                  <input 
                    type="email" 
                    defaultValue="hola@azabache.com" 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A5073]" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                  <input 
                    type="text" 
                    defaultValue="@azabache_draws" 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A5073]" 
                  />
                </div>
              </div>
              <button className="btn-primary mt-4">Guardar Cambios</button>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Categorías</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <span key={cat.id} className="px-3 py-2 bg-gray-100 rounded-lg text-sm flex items-center gap-2">
                    {cat.name}
                    <button className="text-gray-400 hover:text-red-500">
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
              <button className="mt-4 text-[#9A5073] text-sm font-medium flex items-center gap-1">
                <Plus className="h-4 w-4" /> Añadir categoría
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Temáticas</h2>
              <div className="flex flex-wrap gap-2">
                {themes.map((theme) => (
                  <span key={theme.id} className="px-3 py-2 bg-gray-100 rounded-lg text-sm flex items-center gap-2">
                    {theme.icon} {theme.name}
                    <button className="text-gray-400 hover:text-red-500">
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
              <button className="mt-4 text-[#9A5073] text-sm font-medium flex items-center gap-1">
                <Plus className="h-4 w-4" /> Añadir temática
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {(isAddingProduct || editingProduct) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 sm:p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button 
                onClick={() => { setIsAddingProduct(false); setEditingProduct(null); }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Producto</label>
                <input 
                  type="text" 
                  defaultValue={editingProduct?.name || ''} 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A5073]" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <textarea 
                  rows={3} 
                  defaultValue={editingProduct?.description || ''} 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A5073]" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Precio (€)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    defaultValue={editingProduct?.price || ''} 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A5073]" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                  <input 
                    type="number" 
                    defaultValue={editingProduct?.stock || ''} 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A5073]" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                  <select 
                    defaultValue={editingProduct?.category || ''} 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A5073]"
                  >
                    <option value="">Seleccionar...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Temática</label>
                  <select 
                    defaultValue={editingProduct?.theme || ''} 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A5073]"
                  >
                    <option value="">Seleccionar...</option>
                    {themes.map((theme) => (
                      <option key={theme.id} value={theme.id}>{theme.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL de Imagen</label>
                <input 
                  type="url" 
                  defaultValue={editingProduct?.images[0] || ''} 
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9A5073]" 
                />
              </div>
            </div>
            <div className="sticky bottom-0 bg-white p-4 sm:p-6 border-t flex gap-3">
              <button 
                onClick={() => { setIsAddingProduct(false); setEditingProduct(null); }}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button className="flex-1 btn-primary">
                {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
