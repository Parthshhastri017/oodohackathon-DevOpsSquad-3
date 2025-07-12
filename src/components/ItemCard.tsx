import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../types';
import { MapPin, Star, Tag } from 'lucide-react';

interface ItemCardProps {
  item: Item;
  showStatus?: boolean;
}

export function ItemCard({ item, showStatus = false }: ItemCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'reserved': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'swapped': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">
      <Link to={`/item/${item.id}`}>
        <div className="aspect-w-4 aspect-h-5 relative overflow-hidden">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {showStatus && (
            <div className="absolute top-3 right-3 space-y-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
              <div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(item.availability)}`}>
                  {item.availability}
                </span>
              </div>
            </div>
          )}
          {item.availability === 'swapped' && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold">
                SWAPPED
              </span>
            </div>
          )}
          {item.availability === 'reserved' && (
            <div className="absolute inset-0 bg-orange-500 bg-opacity-20 flex items-center justify-center">
              <span className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold">
                RESERVED
              </span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              {item.pointValue} pts
            </span>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/item/${item.id}`}>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
            {item.title}
          </h3>
        </Link>
        
        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center">
            <Tag className="h-4 w-4 mr-1" />
            {item.size}
          </span>
          <span className="flex items-center">
            <Star className="h-4 w-4 mr-1" />
            {item.condition}
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {item.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            by {item.uploaderName}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}