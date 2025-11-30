'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  LayoutDashboard, Package, Calendar, Settings, Plus, Edit, Trash2, 
  Search, Eye, TrendingUp, Users, ShoppingBag, DollarSign 
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

  // Stats for dashboard
  const stats = {
    totalProducts: products.length,
    totalRevenue: products.reduce((acc, p) => acc + p.price * 10, 0), // Simulated
    totalOrders: 156, // Simulated
    totalCustomers: 89, // Simulated
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#1a1a1a] min-h-screen fixed left-0 top-0 p-6">
          <Link href="/" className="text-2xl font-bold text-gradient block mb-8">
            Azabache
          </Link>
          <p className="text-gray-400 text-sm mb-8">Panel de Administración</p>
          
          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'products', label: 'Productos', icon: Package },
              { id: 'events', label: 'Eventos', icon: Calendar },
              { id: 'settings', label: 'Configuración', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? 'bg-[#9A5073] text-white' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <Link href="/" className="text-gray-400 hover:text-white text-sm">
              ← Volver a la tienda
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="text-3xl font-bold text-[#1a1a1a] mb-8" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Dashboard
              </h1>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <Package className="h-8 w-8 text-[#9A5073]" />
                    <span className="text-green-500 text-sm">+12%</span>
                  </div>
                  <p className="text-3xl font-bold text-[#1a1a1a]">{stats.totalProducts}</p>
                  <p className="text-gray-500">Productos</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="h-8 w-8 text-[#D4AF37]" />
                    <span className="text-green-500 text-sm">+23%</span>
                  </div>
                  <p className="text-3xl font-bold text-[#1a1a1a]">{stats.totalRevenue.toFixed(2)}€</p>
                  <p className="text-gray-500">Ingresos (demo)</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <ShoppingBag className="h-8 w-8 text-blue-500" />
                    <span className="text-green-500 text-sm">+8%</span>
                  </div>
                  <p className="text-3xl font-bold text-[#1a1a1a]">{stats.totalOrders}</p>
                  <p className="text-gray-500">Pedidos (demo)</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="h-8 w-8 text-green-500" />
                    <span className="text-green-500 text-sm">+15%</span>
                  </div>
                  <p className="text-3xl font-bold text-[#1a1a1a]">{stats.totalCustomers}</p>
                  <p className="text-gray-500">Clientes (demo)</p>
                </div>
              </div>

              {/* Recent Products */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Productos Recientes</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Producto</th>
                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Categoría</th>
                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Precio</th>
                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.slice(0, 5).map((product) => (
                        <tr key={product.id} className="border-b last:border-b-0">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                                <Image src={product.images[0]} alt="" fill className="object-cover" />
                              </div>
                              <span className="font-medium text-[#1a1a1a]">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-500 capitalize">{product.category}</td>
                          <td className="py-3 px-4 font-semibold text-[#9A5073]">{product.price.toFixed(2)}€</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              product.stock > 10 ? 'bg-green-100 text-green-700' : 
                              product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 
                              'bg-red-100 text-red-700'
                            }`}>
                              {product.stock} uds
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Products */}
          {activeTab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  Gestión de Productos
                </h1>
                <button
                  onClick={() => setIsAddingProduct(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus className="h-5 w-5" /> Añadir Producto
                </button>
              </div>

              {/* Search */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-4 px-6 text-gray-500 font-medium">Producto</th>
                      <th className="text-left py-4 px-6 text-gray-500 font-medium">Temática</th>
                      <th className="text-left py-4 px-6 text-gray-500 font-medium">Categoría</th>
                      <th className="text-left py-4 px-6 text-gray-500 font-medium">Precio</th>
                      <th className="text-left py-4 px-6 text-gray-500 font-medium">Stock</th>
                      <th className="text-left py-4 px-6 text-gray-500 font-medium">Estado</th>
                      <th className="text-left py-4 px-6 text-gray-500 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b last:border-b-0 hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                              <Image src={product.images[0]} alt="" fill className="object-cover" />
                            </div>
                            <div>
                              <p className="font-medium text-[#1a1a1a]">{product.name}</p>
                              <p className="text-sm text-gray-500">ID: {product.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="flex items-center gap-2">
                            {themes.find(t => t.id === product.theme)?.icon}
                            <span className="text-gray-600">{themes.find(t => t.id === product.theme)?.name}</span>
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-600 capitalize">{product.category}</td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-semibold text-[#9A5073]">{product.price.toFixed(2)}€</p>
                            {product.originalPrice && (
                              <p className="text-sm text-gray-400 line-through">{product.originalPrice.toFixed(2)}€</p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            product.stock > 10 ? 'bg-green-100 text-green-700' : 
                            product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-red-100 text-red-700'
                          }`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-wrap gap-1">
                            {product.featured && (
                              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">Destacado</span>
                            )}
                            {product.isNew && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">Nuevo</span>
                            )}
                            {product.onSale && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">Oferta</span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/producto/${product.id}`}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Ver"
                            >
                              <Eye className="h-5 w-5 text-gray-500" />
                            </Link>
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Editar"
                            >
                              <Edit className="h-5 w-5 text-blue-500" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 className="h-5 w-5 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Events */}
          {activeTab === 'events' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  Gestión de Eventos
                </h1>
                <button className="btn-primary flex items-center gap-2">
                  <Plus className="h-5 w-5" /> Añadir Evento
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="relative h-40">
                      <Image src={event.image} alt={event.name} fill className="object-cover" />
                      {event.standNumber && (
                        <span className="absolute top-4 right-4 px-3 py-1 bg-[#D4AF37] text-[#1a1a1a] rounded-full text-sm font-bold">
                          Stand {event.standNumber}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{event.name}</h3>
                      <p className="text-gray-500 mb-2">{event.location}</p>
                      <p className="text-sm text-[#9A5073] mb-4">
                        {new Date(event.date).toLocaleDateString('es-ES', { 
                          day: 'numeric', 
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                      <div className="flex gap-2">
                        <button className="flex-1 btn-secondary text-sm py-2">
                          <Edit className="h-4 w-4 inline mr-1" /> Editar
                        </button>
                        <button className="p-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div>
              <h1 className="text-3xl font-bold text-[#1a1a1a] mb-8" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Configuración
              </h1>
              
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Información de la Tienda</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la tienda</label>
                    <input
                      type="text"
                      defaultValue="Azabache"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email de contacto</label>
                    <input
                      type="email"
                      defaultValue="hola@azabache.shop"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea
                      rows={3}
                      defaultValue="🖤 Bookish Gifts, for readers 📔 and Dark Fantasy 🦇"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                    />
                  </div>
                </div>
                <button className="btn-primary mt-6">Guardar cambios</button>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Configuración de Envíos</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Coste de envío estándar</label>
                    <input
                      type="number"
                      step="0.01"
                      defaultValue="4.99"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Envío gratis a partir de</label>
                    <input
                      type="number"
                      step="0.01"
                      defaultValue="50.00"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                    />
                  </div>
                </div>
                <button className="btn-primary mt-6">Guardar cambios</button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add/Edit Product Modal */}
      {(isAddingProduct || editingProduct) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-[#1a1a1a]">
                {editingProduct ? 'Editar Producto' : 'Añadir Producto'}
              </h2>
            </div>
            <form className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del producto *</label>
                <input
                  type="text"
                  required
                  defaultValue={editingProduct?.name || ''}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  placeholder="Ej: Colgante Reliquias de la Muerte"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
                <textarea
                  required
                  rows={4}
                  defaultValue={editingProduct?.description || ''}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  placeholder="Describe el producto..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    defaultValue={editingProduct?.price || ''}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                    placeholder="19.99"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio original (si está en oferta)</label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={editingProduct?.originalPrice || ''}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                    placeholder="24.99"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
                  <select
                    required
                    defaultValue={editingProduct?.category || ''}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  >
                    <option value="">Selecciona...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Temática *</label>
                  <select
                    required
                    defaultValue={editingProduct?.theme || ''}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  >
                    <option value="">Selecciona...</option>
                    {themes.map((theme) => (
                      <option key={theme.id} value={theme.id}>{theme.icon} {theme.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
                <input
                  type="number"
                  required
                  defaultValue={editingProduct?.stock || 0}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked={editingProduct?.featured || false}
                    className="w-5 h-5 rounded border-gray-300 text-[#9A5073] focus:ring-[#9A5073]"
                  />
                  <span className="text-sm text-gray-700">Producto destacado</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked={editingProduct?.isNew || false}
                    className="w-5 h-5 rounded border-gray-300 text-[#9A5073] focus:ring-[#9A5073]"
                  />
                  <span className="text-sm text-gray-700">Marcar como nuevo</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked={editingProduct?.onSale || false}
                    className="w-5 h-5 rounded border-gray-300 text-[#9A5073] focus:ring-[#9A5073]"
                  />
                  <span className="text-sm text-gray-700">En oferta</span>
                </label>
              </div>
              <div className="flex gap-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingProduct(false);
                    setEditingProduct(null);
                  }}
                  className="flex-1 btn-secondary"
                >
                  Cancelar
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  {editingProduct ? 'Guardar cambios' : 'Crear producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
