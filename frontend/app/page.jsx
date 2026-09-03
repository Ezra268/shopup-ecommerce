'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Bounce } from 'react-toastify';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: 1, name: 'Phones & Tablets', icon: '📱' },
    { id: 2, name: 'TVs & Audio', icon: '📺' },
    { id: 3, name: 'Appliances', icon: '🧺' },
    { id: 4, name: 'Health & Beauty', icon: '🧴' },
    { id: 5, name: 'Home & Office', icon: '🏠' },
    { id: 6, name: 'Fashion', icon: '👕' },
    { id: 7, name: 'Computing', icon: '💻' },
    { id: 8, name: 'Gaming', icon: '🎮' },
    { id: 9, name: 'Supermarket', icon: '🛒' },
    { id: 10, name: 'Baby Products', icon: '👶' },
  ];

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = selectedCategory ? { category: selectedCategory } : {};
      const response = await api.get('/api/products', { params });
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-16 md:py-24">
          <div className="container">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold mb-2">🔥 SHOPUP FESTIVAL DEALS</div>
              <h1 className="text-4xl md:text-5xl font-black mb-4">Big deals. Fast delivery.</h1>
              <p className="text-lg mb-6 text-orange-50">
                Phones, TVs, audio, beauty, groceries, home essentials, fashion, computing, gaming and baby products.
              </p>
              <button className="btn-primary bg-white text-orange-500 hover:bg-gray-100">
                Shop Now
              </button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="container py-12">
          <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                className={`p-4 rounded-lg border-2 transition text-center ${
                  selectedCategory === cat.name
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 bg-white hover:border-orange-300'
                }`}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="text-xs font-semibold line-clamp-2">{cat.name}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="container py-12">
          <h2 className="text-2xl font-bold mb-8">
            {selectedCategory || 'Featured Products'}
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin">
                <div className="h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full"></div>
              </div>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
