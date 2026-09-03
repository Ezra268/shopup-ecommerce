'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import Cookies from 'js-cookie';

export default function AdminHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    Cookies.remove('admin_token');
    window.location.href = '/auth/login';
  };

  return (
    <>
      <header className="bg-gray-900 text-white shadow">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <h1 className="text-2xl font-black">
              SHOP<span className="text-orange-500">UP★</span>
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 hover:text-orange-500 transition"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed md:static top-16 left-0 right-0 bg-gray-800 text-white w-64 min-h-screen transition-transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <nav className="p-6 space-y-2">
          <Link
            href="/admin"
            className="block px-4 py-2 rounded hover:bg-orange-500 transition"
          >
            📄 Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="block px-4 py-2 rounded hover:bg-orange-500 transition"
          >
            📚 Products
          </Link>
          <Link
            href="/admin/orders"
            className="block px-4 py-2 rounded hover:bg-orange-500 transition"
          >
            📂 Orders
          </Link>
          <Link
            href="/admin/users"
            className="block px-4 py-2 rounded hover:bg-orange-500 transition"
          >
            👥 Users
          </Link>
          <Link
            href="/admin/payments"
            className="block px-4 py-2 rounded hover:bg-orange-500 transition"
          >
            💳 Payments
          </Link>
          <Link
            href="/admin/settings"
            className="block px-4 py-2 rounded hover:bg-orange-500 transition"
          >
            ⚙️ Settings
          </Link>
        </nav>
      </aside>
    </>
  );
}
