'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import AdminHeader from '@/components/AdminHeader';
import { toast } from 'react-toastify';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      // Mock stats - in real app, fetch from backend
      setStats({
        totalOrders: 1234,
        totalRevenue: 15678900,
        totalProducts: 847,
        totalUsers: 5432,
        pendingOrders: 23,
      });
    } catch (error) {
      toast.error('Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminHeader />
      <main className="admin-container py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin">
              <div className="h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {/* Total Orders */}
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Orders</p>
                  <p className="text-3xl font-bold">{stats.totalOrders.toLocaleString()}</p>
                </div>
                <div className="text-4xl">📦</div>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold">
                    KSh {(stats.totalRevenue / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div className="text-4xl">💰</div>
              </div>
            </div>

            {/* Total Products */}
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Products</p>
                  <p className="text-3xl font-bold">{stats.totalProducts.toLocaleString()}</p>
                </div>
                <div className="text-4xl">📱</div>
              </div>
            </div>

            {/* Total Users */}
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Users</p>
                  <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <div className="text-4xl">👥</div>
              </div>
            </div>

            {/* Pending Orders */}
            <div className="card bg-orange-50 border-2 border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-semibold">Pending Orders</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.pendingOrders}</p>
                </div>
                <div className="text-4xl">⏳</div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex justify-between items-center pb-4 border-b last:border-b-0">
                  <div>
                    <p className="font-semibold">Order #ORD-{1000 + item}</p>
                    <p className="text-sm text-gray-600">Customer {item}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">KSh {(5000 * item).toLocaleString()}</p>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Pending
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
            <div className="space-y-4">
              {[
                { name: 'Samsung Galaxy S25', sales: 234 },
                { name: 'iPhone 15 Pro', sales: 189 },
                { name: 'Samsung Galaxy A06', sales: 156 },
                { name: 'iPad Pro', sales: 123 },
                { name: 'Sony WH-1000XM5', sales: 98 },
              ].map((product, idx) => (
                <div key={idx} className="flex justify-between items-center pb-4 border-b last:border-b-0">
                  <p className="font-semibold">{product.name}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${(product.sales / 234) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-semibold w-12 text-right">{product.sales}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
