import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Recycle, Users, Award, Shirt } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ItemCarousel } from '../components/ItemCarousel';

export function Landing() {
  const { items } = useApp();
  const featuredItems = items.filter(item => item.status === 'approved').slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Shirt className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Welcome to <span className="text-emerald-200">ReWear</span>
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Join our eco-conscious community and give your clothes a second life. 
              Swap, trade, and discover unique fashion while reducing waste.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-50 transition-colors inline-flex items-center justify-center"
              >
                Start Swapping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/browse"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-emerald-600 transition-colors inline-flex items-center justify-center"
              >
                Browse Items
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How ReWear Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Simple, sustainable, and rewarding. Join thousands who are already making a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 dark:bg-emerald-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Shirt className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">List Your Items</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Upload photos and details of clothes you no longer wear. Help them find a new home.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 dark:bg-teal-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Connect & Swap</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse items from other users and request swaps. Build connections with fellow fashion lovers.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 dark:bg-amber-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Earn Rewards</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Gain points for every successful swap and use them to unlock premium items.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ItemCarousel items={featuredItems} title="Featured Items" />
          
          <div className="text-center mt-8">
            <Link
              to="/browse"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center"
            >
              View All Items
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-emerald-600 dark:bg-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
              Making a Difference Together
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-emerald-200 mb-2">10K+</div>
                <div className="text-emerald-100 text-lg">Items Swapped</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-emerald-200 mb-2">5K+</div>
                <div className="text-emerald-100 text-lg">Happy Members</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-emerald-200 mb-2">50T</div>
                <div className="text-emerald-100 text-lg">CO₂ Saved (kg)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Recycle className="h-16 w-16 text-emerald-600 dark:text-emerald-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Start Your Sustainable Fashion Journey?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Join ReWear today and be part of the fashion revolution that puts the planet first.
          </p>
          <Link
            to="/signup"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center"
          >
            Join ReWear Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}