import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, Item, SwapRequest, AppContextType } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    points: 150,
    joinDate: '2024-01-15',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@rewear.com',
    points: 0,
    joinDate: '2024-01-01'
  }
];

const mockItems: Item[] = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic blue denim jacket in excellent condition. Perfect for layering in spring and fall.',
    category: 'Outerwear',
    type: 'Jacket',
    size: 'M',
    condition: 'Excellent',
    tags: ['vintage', 'denim', 'casual'],
    images: [
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=2',
      'https://images.pexels.com/photos/1656685/pexels-photo-1656685.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=2'
    ],
    uploaderId: '1',
    uploaderName: 'Sarah Johnson',
    status: 'approved',
    availability: 'available',
    createdAt: '2024-01-20',
    pointValue: 45
  },
  {
    id: '2',
    title: 'Silk Blouse',
    description: 'Elegant silk blouse in cream color, perfect for professional or formal occasions.',
    category: 'Tops',
    type: 'Blouse',
    size: 'S',
    condition: 'Good',
    tags: ['silk', 'formal', 'elegant'],
    images: [
      'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=2'
    ],
    uploaderId: '1',
    uploaderName: 'Sarah Johnson',
    status: 'approved',
    availability: 'available',
    createdAt: '2024-01-18',
    pointValue: 35
  },
  {
    id: '3',
    title: 'Wool Sweater',
    description: 'Cozy wool sweater in forest green. Hand-knitted with care.',
    category: 'Tops',
    type: 'Sweater',
    size: 'L',
    condition: 'Very Good',
    tags: ['wool', 'handmade', 'cozy'],
    images: [
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=2'
    ],
    uploaderId: '1',
    uploaderName: 'Sarah Johnson',
    status: 'pending',
    availability: 'available',
    createdAt: '2024-01-22',
    pointValue: 40
  }
];

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<Item[]>(mockItems);
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('rewear-theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    if (name && email && password) {
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        points: 50, // Welcome bonus
        joinDate: new Date().toISOString().split('T')[0]
      };
      setUser(newUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('rewear-theme', newTheme);
  };

  const addItem = (itemData: Omit<Item, 'id' | 'uploaderId' | 'uploaderName' | 'status' | 'createdAt'>) => {
    if (!user) return;
    
    const newItem: Item = {
      ...itemData,
      id: Date.now().toString(),
      uploaderId: user.id,
      uploaderName: user.name,
      status: 'pending',
      availability: 'available',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setItems(prev => [...prev, newItem]);
  };

  const requestSwap = (itemId: string) => {
    if (!user) return;
    
    const item = items.find(i => i.id === itemId);
    if (!item || item.availability !== 'available') return;
    
    const newRequest: SwapRequest = {
      id: Date.now().toString(),
      requesterId: user.id,
      requesterName: user.name,
      itemId,
      itemTitle: item.title,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setSwapRequests(prev => [...prev, newRequest]);
    
    // Mark item as reserved while swap request is pending
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, availability: 'reserved' as const } : item
    ));
  };

  const redeemWithPoints = (itemId: string): boolean => {
    if (!user) return false;
    
    const item = items.find(i => i.id === itemId);
    if (!item || item.availability !== 'available' || user.points < item.pointValue) {
      return false;
    }
    
    // Deduct points from user
    setUser(prev => prev ? { ...prev, points: prev.points - item.pointValue } : null);
    
    // Mark item as swapped
    setItems(prev => prev.map(i => 
      i.id === itemId ? { ...i, availability: 'swapped' as const } : i
    ));
    
    // Add points to item owner (if different from current user)
    if (item.uploaderId !== user.id) {
      // In a real app, this would update the item owner's points in the database
      console.log(`Added ${item.pointValue} points to ${item.uploaderName}`);
    }
    
    return true;
  };
  const approveItem = (itemId: string) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, status: 'approved' as const } : item
    ));
  };

  const rejectItem = (itemId: string) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, status: 'rejected' as const } : item
    ));
  };

  return (
    <AppContext.Provider value={{
      user,
      items,
      swapRequests,
      theme,
      login,
      signup,
      logout,
      toggleTheme,
      addItem,
      requestSwap,
      redeemWithPoints,
      approveItem,
      rejectItem
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}