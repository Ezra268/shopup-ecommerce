'use client';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { FiShoppingCart, FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { logout } from '@/store/authSlice';
import Cookies from 'js-cookie';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove('auth_token');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-black">
              SHOP<span className="text-orange-500">UP★</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 mx-8">
            <input
              type="text"
              placeholder="Search products..."
              className="input-field rounded-r-none flex-1"
            />
            <button className="btn-primary rounded-l-none">Search</button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link href="/cart" className="relative">
              <FiShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-orange-500 hover:text-orange-600"
                  title="Logout"
                >
                  <FiLogOut size={20} />
                </button>
              </div>
            ) : (
              <Link href="/auth/login" className="btn-primary text-sm py-1 px-4">
                Sign In
              </Link>
            )}

            {/* Mobile Menu */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t">
            <input
              type="text"
              placeholder="Search products..."
              className="input-field w-full mb-4 mt-4"
            />
            <div className="space-y-2">
              <Link href="/" className="block p-2 hover:bg-gray-100 rounded">
                Home
              </Link>
              <Link href="/products" className="block p-2 hover:bg-gray-100 rounded">
                Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
