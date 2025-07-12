import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Calendar, Star, Package } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ItemCard } from '../components/ItemCard';

export function Dashboard() {
  const { user, items, swapRequests } = useApp();

  if (!user) return null;

  const userItems = items.filter(item => item.uploaderId === user.id);
  const userSwapRequests = swapRequests.filter(swap => swap.requesterId === user.id);
  const availableItems = userItems.filter(item => item.availability === 'available').length;
  const swappedItems = userItems.filter(item => item.availability === 'swapped').length;
  const reservedItems = userItems.filter(item => item.availability === 'reserved').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sticky top-8">
              <div className="text-center mb-6">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                )}
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              </div>

              <div className="space-y-4">
                <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-700 dark:text-emerald-300 font-medium">Points Balance</span>
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{user.points}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{userItems.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Items Listed</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{userSwapRequests.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Swap Requests</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-2 bg-green-50 dark:bg-green-900/30 rounded">
                    <div className="font-bold text-green-600 dark:text-green-400">{availableItems}</div>
                    <div className="text-green-700 dark:text-green-300">Available</div>
                  </div>
                  <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/30 rounded">
                    <div className="font-bold text-orange-600 dark:text-orange-400">{reservedItems}</div>
                    <div className="text-orange-700 dark:text-orange-300">Reserved</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <div className="font-bold text-gray-600 dark:text-gray-400">{swappedItems}</div>
                    <div className="text-gray-700 dark:text-gray-300">Swapped</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Member since {new Date(user.joinDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  to="/add-item"
                  className="flex items-center p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                >
                  <Plus className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">List New Item</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Share something from your closet</div>
                  </div>
                </Link>
                <Link
                  to="/browse"
                  className="flex items-center p-4 bg-teal-50 dark:bg-teal-900/30 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors"
                >
                  <Package className="h-8 w-8 text-teal-600 dark:text-teal-400 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Browse Items</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Discover new fashion pieces</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* My Items */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">My Items</h3>
                <Link
                  to="/add-item"
                  className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium"
                >
                  + Add Item
                </Link>
              </div>

              {userItems.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No items yet</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Start by listing your first item to begin swapping!
                  </p>
                  <Link
                    to="/add-item"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-medium"
                  >
                    List Your First Item
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {userItems.map((item) => (
                    <ItemCard key={item.id} item={item} showStatus={true} />
                  ))}
                </div>
              )}
            </div>

            {/* Recent Swap Requests */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Recent Swap Requests</h3>

              {userSwapRequests.length === 0 ? (
                <div className="text-center py-8">
                  <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No swap requests yet</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Browse items and start requesting swaps to see them here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userSwapRequests.map((swap) => (
                    <div key={swap.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{swap.itemTitle}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Requested on {new Date(swap.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        swap.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        swap.status === 'accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {swap.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}