'use client';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { removeFromCart, updateQuantity, clearCart } from '@/store/cartSlice';
import { FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function CartPage() {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);
  const [shippingMethod, setShippingMethod] = useState('standard');

  const shippingCost = shippingMethod === 'express' ? 500 : 200;
  const finalTotal = total + shippingCost;

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    // Redirect to checkout page
    window.location.href = '/checkout';
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="container py-20 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">Start shopping to add items to your cart</p>
          <Link href="/" className="btn-primary inline-block">
            <FiArrowLeft className="inline mr-2" />
            Continue Shopping
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 divide-y">
              {items.map((item) => (
                <div key={item.id} className="p-4 flex gap-4">
                  <div className="text-4xl bg-gray-100 w-24 h-24 rounded flex items-center justify-center flex-shrink-0">
                    {item.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{item.name}</h3>
                    <p className="text-orange-500 font-bold text-lg mb-4">
                      KSh {item.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2">
                      <label className="text-sm">Qty:</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: parseInt(e.target.value),
                            })
                          )
                        }
                        className="input-field w-16"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 hover:text-red-700 self-start"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              {/* Shipping */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Shipping Method</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">Standard Delivery - KSh 200</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">Express Delivery - KSh 500</span>
                  </label>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>KSh {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>KSh {shippingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-orange-500">KSh {finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Buttons */}
              <button onClick={handleCheckout} className="btn-primary w-full mb-3">
                Proceed to Checkout
              </button>
              <Link
                href="/"
                className="btn-secondary w-full text-center block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
