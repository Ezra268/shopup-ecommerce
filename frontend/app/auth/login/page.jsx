'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import api from '@/lib/api';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/authSlice';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });

      const { user, token } = response.data;
      dispatch(setUser({ user, token }));
      Cookies.set('auth_token', token);
      toast.success('Login successful!');
      router.push('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/api/auth/register', {
        name,
        email,
        password,
      });

      const { user, token } = response.data;
      dispatch(setUser({ user, token }));
      Cookies.set('auth_token', token);
      toast.success('Account created successfully!');
      router.push('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 p-8">
          <h1 className="text-3xl font-black text-center mb-2">
            SHOP<span className="text-orange-500">UP★</span>
          </h1>
          <p className="text-center text-gray-500 mb-8">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </p>

          <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-orange-500 font-semibold hover:text-orange-600 ml-1"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
