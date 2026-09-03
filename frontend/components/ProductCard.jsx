'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition overflow-hidden">
      {/* Image */}
      <div className="relative bg-gray-100 h-48 flex items-center justify-center text-6xl">
        {product.image}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100"
        >
          <FiHeart
            size={20}
            className={isFavorite ? 'fill-red-500 text-red-500' : ''}
          />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-sm line-clamp-2 mb-2">{product.name}</h3>

        {/* Price */}
        <div className="mb-2">
          <div className="text-lg font-bold text-orange-500">
            KSh {product.price.toLocaleString()}
          </div>
          {product.originalPrice && (
            <div className="text-sm text-gray-500 line-through">
              KSh {product.originalPrice.toLocaleString()}
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3 text-sm">
          <span className="text-yellow-400">★★★★★</span>
          <span className="text-gray-500">({product.reviews})</span>
        </div>

        {/* Button */}
        <button
          onClick={handleAddToCart}
          className="btn-primary w-full text-sm py-2 flex items-center justify-center gap-2"
        >
          <FiShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
