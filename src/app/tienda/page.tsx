'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, X, ChevronDown, Search, Grid, List } from 'lucide-react';
import { ProductCard } from '@/components';
import { products, categories, themes } from '@/data/products';
import { Product } from '@/types';

function ShopContent() {
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const theme = searchParams.get('theme');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');

    if (category) setSelectedCategory(category);
    if (subcategory) setSelectedSubcategory(subcategory);
    if (theme) setSelectedTheme(theme);
    if (search) setSearchQuery(search);
    if (sort) setSortBy(sort);
  }, [searchParams]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Subcategory filter
    if (selectedSubcategory) {
      result = result.filter(p => p.subcategory === selectedSubcategory);
    }

    // Theme filter
    if (selectedTheme) {
      result = result.filter(p => p.theme === selectedTheme);
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedSubcategory, selectedTheme, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedTheme(null);
    setPriceRange([0, 50]);
    setSortBy('newest');
  };

  const activeFiltersCount = [
    selectedCategory,
    selectedSubcategory,
    selectedTheme,
    priceRange[0] > 0 || priceRange[1] < 50,
  ].filter(Boolean).length;

  const selectedCategoryData = categories.find(c => c.slug === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FFF5FB]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#9A5073] to-[#7a3d5a] py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            {selectedCategory 
              ? categories.find(c => c.slug === selectedCategory)?.name || 'Tienda'
              : selectedTheme
                ? themes.find(t => t.id === selectedTheme)?.name || 'Tienda'
                : 'Nuestra Tienda'}
          </h1>
          <p className="text-white/80">
            {filteredProducts.length} productos encontrados
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[#9A5073]"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none w-full md:w-48 px-4 py-3 border border-gray-200 rounded-xl focus:border-[#9A5073] bg-white pr-10"
            >
              <option value="newest">Más recientes</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="name">Nombre A-Z</option>
              <option value="rating">Mejor valorados</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          {/* View Mode */}
          <div className="flex border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 ${viewMode === 'grid' ? 'bg-[#9A5073] text-white' : 'bg-white text-gray-600'}`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 ${viewMode === 'list' ? 'bg-[#9A5073] text-white' : 'bg-white text-gray-600'}`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl"
          >
            <Filter className="h-5 w-5" />
            Filtros
            {activeFiltersCount > 0 && (
              <span className="bg-[#9A5073] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`w-full md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-[#1a1a1a]">Filtros</h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#9A5073] hover:underline"
                  >
                    Limpiar todo
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Categorías</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id}>
                      <button
                        onClick={() => {
                          setSelectedCategory(selectedCategory === category.slug ? null : category.slug);
                          setSelectedSubcategory(null);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.slug
                            ? 'bg-[#9A5073] text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {category.name}
                      </button>
                      {selectedCategory === category.slug && category.subcategories && (
                        <div className="ml-4 mt-2 space-y-1">
                          {category.subcategories.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => setSelectedSubcategory(
                                selectedSubcategory === sub.slug ? null : sub.slug
                              )}
                              className={`w-full text-left px-3 py-1 text-sm rounded transition-colors ${
                                selectedSubcategory === sub.slug
                                  ? 'text-[#9A5073] font-semibold'
                                  : 'text-gray-600 hover:text-[#9A5073]'
                              }`}
                            >
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Themes */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Temáticas</h4>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(selectedTheme === theme.id ? null : theme.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                        selectedTheme === theme.id
                          ? 'bg-[#9A5073] text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span>{theme.icon}</span>
                      <span className="text-sm">{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Precio</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      placeholder="Min"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      placeholder="Max"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-[#9A5073]"
                  />
                  <p className="text-sm text-gray-500">
                    {priceRange[0]}€ - {priceRange[1]}€
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Active Filters */}
            {(selectedCategory || selectedSubcategory || selectedTheme) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#9A5073] text-white rounded-full text-sm">
                    {categories.find(c => c.slug === selectedCategory)?.name}
                    <button onClick={() => { setSelectedCategory(null); setSelectedSubcategory(null); }}>
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                )}
                {selectedSubcategory && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#9A5073]/80 text-white rounded-full text-sm">
                    {selectedCategoryData?.subcategories?.find(s => s.slug === selectedSubcategory)?.name}
                    <button onClick={() => setSelectedSubcategory(null)}>
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                )}
                {selectedTheme && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#D4AF37] text-[#1a1a1a] rounded-full text-sm">
                    {themes.find(t => t.id === selectedTheme)?.icon} {themes.find(t => t.id === selectedTheme)?.name}
                    <button onClick={() => setSelectedTheme(null)}>
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">😿</p>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No encontramos productos
                </h3>
                <p className="text-gray-500 mb-4">
                  Prueba a modificar los filtros o buscar algo diferente
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FFF5FB] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9A5073]"></div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
