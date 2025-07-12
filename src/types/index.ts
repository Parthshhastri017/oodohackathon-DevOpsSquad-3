export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  joinDate: string;
  avatar?: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  size: string;
  condition: string;
  tags: string[];
  images: string[];
  uploaderId: string;
  uploaderName: string;
  status: 'pending' | 'approved' | 'rejected' | 'swapped';
  availability: 'available' | 'swapped' | 'reserved';
  createdAt: string;
  pointValue: number;
}

export interface SwapRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  itemId: string;
  itemTitle: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
}

export interface AppContextType {
  user: User | null;
  items: Item[];
  swapRequests: SwapRequest[];
  theme: 'light' | 'dark';
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  toggleTheme: () => void;
  addItem: (item: Omit<Item, 'id' | 'uploaderId' | 'uploaderName' | 'status' | 'createdAt'>) => void;
  requestSwap: (itemId: string) => void;
  redeemWithPoints: (itemId: string) => boolean;
  approveItem: (itemId: string) => void;
  rejectItem: (itemId: string) => void;
}