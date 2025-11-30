'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  LayoutDashboard, Package, Calendar, Settings, Plus, Edit, Trash2, 
  Search, Eye, Users, ShoppingBag, DollarSign, Menu, X, ChevronLeft
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.theme.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteProduct = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  const stats = {
    totalProducts: products.length,
    totalRevenue: products.reduce((acc, p) => acc + p.price * 10, 0),
    totalOrders: 156,
    totalCustomers: 89,
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Productos', icon: Package },
    { id: 'events', label: 'Eventos', icon: Calendar },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-[#1a1a1a] text-white p-4 flex items-center justify-between sticky top-0 z-40">
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-gray-800 rounded-lg">
          <Menu className="h-6 w-6" />
        </button>
        <span className="text-xl font-bold text-gradient">Admin</span>
        <Link href="/" className="p-2 hover:bg-gray-800 rounded-lg">
          <ChevronLeft className="h-6 w-6" />
        </Link>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-[#1a1a1a] p-6 z-50 transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-2xl font-bold text-gradient">Azabache</Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>
        <p className="text-gray-400 text-sm mb-8">Panel de Administración</p>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id as Tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id ? 'bg-[#9A5073] text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Link href="/" className="text-gray-400 hover:text-white text-sm flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" /> Volver a la tienda
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 min-h-screen">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-6 sm:mb-8" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Dashboard
            </h1>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <Package className="h-6 w-6 sm:h-8 sm:w-8 text-[#9A5073]" />
                  <span className="text-green-500 text-xs sm:text-sm">+12%</span>
                </div>
                <p className="text-xl sm:text-3xl font-bold text-[#1a1a1a]">{stats.totalProducts}</p>
                <p className="text-gray-500 text-xs sm:text-sm">Productos</p>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-[#D4AF37]" />
                  <span className="text-green-500 text-xs sm:text-sm">+23%</span>
                </div>
                <p className="text-lg sm:text-3xl font-bold text-[#1a1a1a]">{stats.totalRevenue.toFixed(0)}€</p>
                <p className="text-gray-500 text-xs sm:text-sm">Ingresos</p>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                  <span className="text-green-500 text-xs sm:text-sm">+8%</span>
                </div>
                <p className="text-xl sm:text-3xl font-bold text-[#1a1a1a]">{stats.totalOrders}</p>
                <p className="text-gray-500 text-xs sm:text-sm">Pedidos</p>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
                  <span className="text-green-500 text-xs sm:text-sm">+15%</span>
                </div>
                <p className="text-xl sm:text-3xl font-bold text-[#1a1a1a]">{stats.totalCustomers}</p>
                <p className="text-gray-500 text-xs sm:text-sm">Clientes</p>
              </div>
            </div>

            {/* Recent Products */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-[#1a1a1a] mb-4">Productos Recientes</h2>
              
              {/* Mobile Cards */}
              <div className="sm:hidden space-y-3">
                {products.slice(0, 5).map((product) => (
                  <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={product.images[0]} alt="" fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#1a1a1a] text-sm truncate">{product.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{product.category}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-[#9A5073] text-sm">{product.price.toFixed(2)}€</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-700' : product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {product.stock}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden sm:block overflow-x-auto">
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
                          <span className={`px-2 py-1 rounded-full text-xs ${product.stock > 10 ? 'bg-green-100 text-green-700' : product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Gestión de Productos
              </h1>
              <button onClick={() => setIsAddingProduct(true)} className="btn-primary flex items-center justify-center gap-2">
                <Plus className="h-5 w-5" /> Añadir Producto
              </button>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
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

            {/* Mobile Product Cards */}
            <div className="lg:hidden space-y-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={product.images[0]} alt="" fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-[#1a1a1a] mb-1 truncate">{product.name}</h3>
                      <p className="text-sm text-gray-500 mb-1">
                        {themes.find(t => t.id === product.theme)?.icon} {themes.find(t => t.id === product.theme)?.name}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-[#9A5073]">{product.price.toFixed(2)}€</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-700' : product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                          Stock: {product.stock}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t flex-wrap">
                    {product.featured && <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">Destacado</span>}
                    {product.isNew && <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">Nuevo</span>}
                    {product.onSale && <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">Oferta</span>}
                    <div className="flex-1" />
                    <Link href={`/producto/${product.id}`} className="p-2 hover:bg-gray-100 rounded-lg"><Eye className="h-5 w-5 text-gray-500" /></Link>
                    <button onClick={() => setEditingProduct(product)} className="p-2 hover:bg-blue-50 rounded-lg"><Edit className="h-5 w-5 text-blue-500" /></button>
                    <button onClick={() => handleDeleteProduct(product.id)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 className="h-5 w-5 text-red-500" /></button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-4 px-6 text-gray-500 font-medium">Producto</th>
                      <th className="text-left py-4 px-6 text-gray-500 font-medium">Temática</th>
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
                        <td className="py-4 px-6">
                          <p className="font-semibold text-[#9A5073]">{product.price.toFixed(2)}€</p>
                          {product.originalPrice && <p className="text-sm text-gray-400 line-through">{product.originalPrice.toFixed(2)}€</p>}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-sm ${product.stock > 10 ? 'bg-green-100 text-green-700' : product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-wrap gap-1">
                            {product.featured && <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">Destacado</span>}
                            {product.isNew && <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">Nuevo</span>}
                            {product.onSale && <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">Oferta</span>}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <Link href={`/producto/${product.id}`} className="p-2 hover:bg-gray-100 rounded-lg"><Eye className="h-5 w-5 text-gray-500" /></Link>
                            <button onClick={() => setEditingProduct(product)} className="p-2 hover:bg-blue-50 rounded-lg"><Edit className="h-5 w-5 text-blue-500" /></button>
                            <button onClick={() => handleDeleteProduct(product.id)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 className="h-5 w-5 text-red-500" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Events */}
        {activeTab === 'events' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Gestión de Eventos
              </h1>
              <button className="btn-primary flex items-center justify-center gap-2">
                <Plus className="h-5 w-5" /> Añadir Evento
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="relative h-32 sm:h-40">
                    <Image src={event.image} alt={event.name} fill className="object-cover" />
                    {event.standNumber && (
                      <span className="absolute top-3 right-3 px-2 sm:px-3 py-1 bg-[#D4AF37] text-[#1a1a1a] rounded-full text-xs sm:text-sm font-bold">
                        Stand {event.standNumber}
                      </span>
                    )}
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-[#1a1a1a] mb-2">{event.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">{event.location}</p>
                    <p className="text-sm text-[#9A5073] mb-4">
                      {new Date(event.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <div className="flex gap-2">
                      <button className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center gap-1">
                        <Edit className="h-4 w-4" /> Editar
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
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-6 sm:mb-8" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Configuración
            </h1>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-[#1a1a1a] mb-4">Información de la Tienda</h2>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la tienda</label>
                    <input type="text" defaultValue="Azabache" className="w-full px-4 py-3 border border-gray-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email de contacto</label>
                    <input type="email" defaultValue="hola@azabache.shop" className="w-full px-4 py-3 border border-gray-200 rounded-lg" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea rows={3} defaultValue="🖤 Bookish Gifts, for readers 📔 and Dark Fantasy 🦇" className="w-full px-4 py-3 border border-gray-200 rounded-lg" />
                  </div>
                </div>
                <button className="btn-primary mt-6 w-full sm:w-auto">Guardar cambios</button>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-[#1a1a1a] mb-4">Configuración de Envíos</h2>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Coste de envío estándar</label>
                    <input type="number" step="0.01" defaultValue="4.99" className="w-full px-4 py-3 border border-gray-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Envío gratis a partir de</label>
                    <input type="number" step="0.01" defaultValue="50.00" className="w-full px-4 py-3 border border-gray-200 rounded-lg" />
                  </div>
                </div>
                <button className="btn-primary mt-6 w-full sm:w-auto">Guardar cambios</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add/Edit Product Modal */}
      {(isAddingProduct || editingProduct) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1a1a1a]">
                  {editingProduct ? 'Editar Producto' : 'Añadir Producto'}
                </h2>
                <button onClick={() => { setIsAddingProduct(false); setEditingProduct(null); }} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <form className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del producto *</label>
                <input type="text" required defaultValue={editingProduct?.name || ''} className="w-full px-4 py-3 border border-gray-200 rounded-lg" placeholder="Ej: Colgante Reliquias de la Muerte" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
                <textarea required rows={4} defaultValue={editingProduct?.description || ''} className="w-full px-4 py-3 border border-gray-200 rounded-lg" placeholder="Describe el producto..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio *</label>
                  <input type="number" step="0.01" required defaultValue={editingProduct?.price || ''} className="w-full px-4 py-3 border border-gray-200 rounded-lg" placeholder="19.99" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio original</label>
                  <input type="number" step="0.01" defaultValue={editingProduct?.originalPrice || ''} className="w-full px-4 py-3 border border-gray-200 rounded-lg" placeholder="24.99" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
                  <select required defaultValue={editingProduct?.category || ''} className="w-full px-4 py-3 border border-gray-200 rounded-lg">
                    <option value="">Selecciona...</option>
                    {categories.map((cat) => <option key={cat.id} value={cat.slug}>{cat.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Temática *</label>
                  <select required defaultValue={editingProduct?.theme || ''} className="w-full px-4 py-3 border border-gray-200 rounded-lg">
                    <option value="">Selecciona...</option>
                    {themes.map((theme) => <option key={theme.id} value={theme.id}>{theme.icon} {theme.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
                <input type="number" required defaultValue={editingProduct?.stock || 0} className="w-full px-4 py-3 border border-gray-200 rounded-lg" />
              </div>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={editingProduct?.featured || false} className="w-5 h-5 rounded border-gray-300 text-[#9A5073] focus:ring-[#9A5073]" />
                  <span className="text-sm text-gray-700">Destacado</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={editingProduct?.isNew || false} className="w-5 h-5 rounded border-gray-300 text-[#9A5073] focus:ring-[#9A5073]" />
                  <span className="text-sm text-gray-700">Nuevo</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={editingProduct?.onSale || false} className="w-5 h-5 rounded border-gray-300 text-[#9A5073] focus:ring-[#9A5073]" />
                  <span className="text-sm text-gray-700">En oferta</span>
                </label>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
                <button type="button" onClick={() => { setIsAddingProduct(false); setEditingProduct(null); }} className="flex-1 btn-secondary">
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
