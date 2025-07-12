import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, User, Calendar, Tag, ArrowLeft, Heart, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const { items, user, requestSwap, redeemWithPoints } = useApp();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const item = items.find(i => i.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Item not found</h2>
          <Link 
            to="/browse" 
            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
          >
            Back to Browse
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
  };

  const handleRequestSwap = () => {
    if (user && user.id !== item.uploaderId && item.availability === 'available') {
      setIsProcessing(true);
      requestSwap(item.id);
      setTimeout(() => {
        setIsProcessing(false);
        alert('Swap request sent! The item is now reserved for you.');
      }, 1000);
    }
  };

  const handleRedeemWithPoints = () => {
    if (user && user.id !== item.uploaderId && item.availability === 'available') {
      if (user.points < item.pointValue) {
        alert(`You need ${item.pointValue - user.points} more points to redeem this item.`);
        return;
      }
      
      setIsProcessing(true);
      const success = redeemWithPoints(item.id);
      setTimeout(() => {
        setIsProcessing(false);
        if (success) {
          alert(`Successfully redeemed! ${item.pointValue} points have been deducted from your account.`);
        } else {
          alert('Failed to redeem item. Please try again.');
        }
      }, 1000);
    }
  };

  const canRequestSwap = user && user.id !== item.uploaderId && item.status === 'approved' && item.availability === 'available';
  const canRedeemWithPoints = user && user.id !== item.uploaderId && item.status === 'approved' && item.availability === 'available' && user.points >= item.pointValue;
  const isItemUnavailable = item.availability !== 'available';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/browse" 
          className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Browse
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
              <img
                src={item.images[currentImageIndex]}
                alt={item.title}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              
              {item.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              <div className="absolute top-4 left-4">
                <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {item.pointValue} points
                </span>
              </div>

              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {item.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex 
                        ? 'border-emerald-500' 
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{item.title}</h1>
                <div className="flex flex-col space-y-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.status === 'approved' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {item.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.availability === 'available' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : item.availability === 'reserved'
                      ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}>
                    {item.availability}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Tag className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">Category: {item.category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 dark:text-gray-300">Type: {item.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 dark:text-gray-300">Size: {item.size}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">Condition: {item.condition}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {isItemUnavailable && (
                  <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                    <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
                      {item.availability === 'swapped' 
                        ? 'This item has already been swapped.' 
                        : 'This item is currently reserved for another user.'}
                    </p>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4">
                  {!user ? (
                    <Link
                      to="/login"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-semibold text-center transition-colors"
                    >
                      Sign in to Request Swap
                    </Link>
                  ) : user.id === item.uploaderId ? (
                    <div className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 py-3 px-6 rounded-lg font-semibold text-center">
                      This is your item
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={handleRequestSwap}
                        disabled={!canRequestSwap || isProcessing}
                        className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                          canRequestSwap && !isProcessing
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {isProcessing ? 'Processing...' : 'Request Swap'}
                      </button>
                      <button
                        onClick={handleRedeemWithPoints}
                        disabled={!canRedeemWithPoints || isProcessing}
                        className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                          canRedeemWithPoints && !isProcessing
                            ? 'bg-amber-600 hover:bg-amber-700 text-white'
                            : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {isProcessing ? 'Processing...' : `Redeem (${item.pointValue} pts)`}
                      </button>
                    </>
                  )}
                </div>
                
                {user && user.id !== item.uploaderId && user.points < item.pointValue && item.availability === 'available' && (
                  <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                      You need {item.pointValue - user.points} more points to redeem this item. 
                      Current balance: {user.points} points.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Item History */}
            {(item.availability === 'swapped' || item.availability === 'reserved') && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Item Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Current Status:</span>
                    <span className={`font-medium ${
                      item.availability === 'swapped' 
                        ? 'text-gray-600 dark:text-gray-400' 
                        : 'text-orange-600 dark:text-orange-400'
                    }`}>
                      {item.availability === 'swapped' ? 'Swapped' : 'Reserved'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Listed on:</span>
                    <span className="text-gray-900 dark:text-white">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Uploader Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Listed by</h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                  <User className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{item.uploaderName}</h4>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    Listed on {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}