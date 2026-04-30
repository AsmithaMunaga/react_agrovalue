export type UserRole = 'admin' | 'farmer' | 'buyer' | 'landowner';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  location?: string;
  isApproved: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  cropSource: string;
  images: string[];
  description: string;
  processingMethod: string;
  ingredients: string[];
  shelfLife: string;
  nutritionalInfo: string;
  price: number;
  discount: number;
  quantity: number;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  rating: number;
  reviews: Review[];
  inStock: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  buyerId: string;
  farmerId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'cod' | 'card';
  createdAt: string;
  deliveryAddress: string;
}

export interface Hotel {
  id: string;
  farmerId: string;
  farmerName: string;
  name: string;
  images: string[];
  description: string;
  location: string;
  roomTypes: RoomType[];
  tableCapacity: number;
  rating: number;
  pricePerNight: number;
  hasChef: boolean;
}

export interface RoomType {
  id: string;
  name: string;
  capacity: number;
  price: number;
  available: boolean;
}

export interface Chef {
  id: string;
  farmerId: string;
  name: string;
  image: string;
  specialCuisines: string[];
  pricePerHour: number;
  rating: number;
  experience: string;
  available: boolean;
}

export interface TransportService {
  id: string;
  farmerId: string;
  farmerName: string;
  vehicleType: string;
  image: string;
  capacity: string;
  pricePerKm: number;
  available: boolean;
  location: string;
}

export interface LandListing {
  id: string;
  ownerId: string;
  ownerName: string;
  images: string[];
  location: string;
  areaInAcres: number;
  soilType: string;
  phValue: number;
  waterAvailability: boolean;
  pricePerSeason: number;
  description: string;
  status: 'available' | 'rented' | 'pending';
}

export interface AISuggestion {
  crop: string;
  suitability: number;
  valueProducts: string[];
  priceRange: { min: number; max: number };
  season: string;
  notes: string;
}

import mangoPickle from '@/assets/mango-pickle.jpg';
import tomatoSauce from '@/assets/tomato-sauce.jpg';
import organicJaggery from '@/assets/organic-jaggery.jpg';
import groundnutOil from '@/assets/groundnut-oil.jpg';
import freshGhee from '@/assets/fresh-ghee.jpg';
import farmHotel from '@/assets/farm-hotel.jpg';
import hotelDining from '@/assets/hotel-dining.jpg';
import farmChef from '@/assets/farm-chef.jpg';
import transportVehicle from '@/assets/transport-vehicle.jpg';
import farmLand from '@/assets/farm-land.jpg';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Traditional Mango Pickle',
    category: 'Pickles & Preserves',
    cropSource: 'Alphonso Mango',
    images: [mangoPickle, organicJaggery, tomatoSauce],
    description: 'Handcrafted mango pickle made using traditional family recipe with organic spices. Sun-dried for 21 days for deep flavor development.',
    processingMethod: 'Sun-drying + Cold infusion in mustard oil',
    ingredients: ['Raw Mango', 'Mustard Oil', 'Fenugreek', 'Turmeric', 'Red Chilli', 'Salt'],
    shelfLife: '18 months',
    nutritionalInfo: 'Per 100g: Calories 85, Carbs 8g, Fat 6g, Protein 1g, Sodium 890mg',
    price: 299,
    discount: 10,
    quantity: 150,
    farmerId: 'f1',
    farmerName: 'Ramesh Patil',
    farmerLocation: 'Ratnagiri, Maharashtra',
    rating: 4.7,
    reviews: [
      { id: 'r1', userId: 'u1', userName: 'Priya S.', rating: 5, comment: 'Authentic taste, just like grandma used to make!', date: '2024-01-15' },
      { id: 'r2', userId: 'u2', userName: 'Amit K.', rating: 4, comment: 'Great quality, fast delivery.', date: '2024-01-20' },
    ],
    inStock: true,
  },
  {
    id: '2',
    name: 'Organic Jaggery Blocks',
    category: 'Natural Sweeteners',
    cropSource: 'Sugarcane',
    images: [organicJaggery, mangoPickle, groundnutOil],
    description: 'Pure organic jaggery made from sugarcane juice without any chemicals. Rich in iron and minerals. Traditional open-pan method.',
    processingMethod: 'Open-pan boiling, no chemicals',
    ingredients: ['Organic Sugarcane Juice'],
    shelfLife: '12 months',
    nutritionalInfo: 'Per 100g: Calories 383, Carbs 98g, Iron 11mg, Calcium 85mg',
    price: 180,
    discount: 5,
    quantity: 300,
    farmerId: 'f2',
    farmerName: 'Suresh Kumar',
    farmerLocation: 'Kolhapur, Maharashtra',
    rating: 4.8,
    reviews: [
      { id: 'r3', userId: 'u3', userName: 'Meera T.', rating: 5, comment: 'Best jaggery I have ever tasted!', date: '2024-01-10' },
    ],
    inStock: true,
  },
  {
    id: '3',
    name: 'Cold-Pressed Groundnut Oil',
    category: 'Edible Oils',
    cropSource: 'Groundnut',
    images: [groundnutOil, freshGhee, organicJaggery],
    description: 'Wood-pressed groundnut oil retaining all natural nutrients. No heat, no refining. Rich in Vitamin E and healthy fats.',
    processingMethod: 'Traditional wood/stone cold pressing (Chekku)',
    ingredients: ['100% Organic Groundnuts'],
    shelfLife: '9 months',
    nutritionalInfo: 'Per 100ml: Calories 884, Total Fat 100g, Vitamin E 8mg',
    price: 450,
    discount: 15,
    quantity: 200,
    farmerId: 'f1',
    farmerName: 'Ramesh Patil',
    farmerLocation: 'Ratnagiri, Maharashtra',
    rating: 4.9,
    reviews: [
      { id: 'r4', userId: 'u4', userName: 'Kavita M.', rating: 5, comment: 'Amazing quality, very pure!', date: '2024-01-22' },
    ],
    inStock: true,
  },
  {
    id: '4',
    name: 'Farm-Fresh Desi Ghee',
    category: 'Dairy Products',
    cropSource: 'Desi Cow Milk',
    images: [freshGhee, groundnutOil, mangoPickle],
    description: 'Bilona method ghee from free-range desi cows. Made using ancient churning process. Granular texture indicates purity.',
    processingMethod: 'Bilona (curd churning) method',
    ingredients: ['A2 Desi Cow Milk'],
    shelfLife: '12 months',
    nutritionalInfo: 'Per 100g: Calories 900, Fat 100g, Vitamin A 3.69mg, Vitamin D 1.5mcg',
    price: 850,
    discount: 0,
    quantity: 80,
    farmerId: 'f3',
    farmerName: 'Lakshmi Devi',
    farmerLocation: 'Anand, Gujarat',
    rating: 4.6,
    reviews: [],
    inStock: true,
  },
  {
    id: '5',
    name: 'Homemade Tomato Sauce',
    category: 'Sauces & Condiments',
    cropSource: 'Tomato',
    images: [tomatoSauce, mangoPickle, organicJaggery],
    description: 'Thick, rich tomato sauce made from farm-fresh tomatoes with organic herbs. No preservatives, no artificial colors.',
    processingMethod: 'Slow cooking with stone-ground spices',
    ingredients: ['Farm Tomatoes', 'Garlic', 'Basil', 'Oregano', 'Salt', 'Organic Sugar'],
    shelfLife: '6 months',
    nutritionalInfo: 'Per 100g: Calories 45, Carbs 9g, Protein 2g, Vitamin C 18mg',
    price: 220,
    discount: 20,
    quantity: 120,
    farmerId: 'f2',
    farmerName: 'Suresh Kumar',
    farmerLocation: 'Kolhapur, Maharashtra',
    rating: 4.4,
    reviews: [],
    inStock: true,
  },
];

export const MOCK_HOTELS: Hotel[] = [
  {
    id: 'h1',
    farmerId: 'f1',
    farmerName: 'Ramesh Patil',
    name: 'Patil Farm Stay',
    images: [farmHotel, hotelDining, farmLand],
    description: 'Experience authentic rural life. Stay amidst mango orchards, enjoy farm-to-table meals, and unwind in nature.',
    location: 'Ratnagiri, Maharashtra',
    roomTypes: [
      { id: 'rt1', name: 'Mud Cottage', capacity: 2, price: 2500, available: true },
      { id: 'rt2', name: 'Tree House', capacity: 3, price: 4000, available: true },
      { id: 'rt3', name: 'Farm Villa', capacity: 6, price: 8000, available: false },
    ],
    tableCapacity: 20,
    rating: 4.8,
    pricePerNight: 2500,
    hasChef: true,
  },
];

export const MOCK_CHEFS: Chef[] = [
  {
    id: 'c1',
    farmerId: 'f1',
    name: 'Chef Anand',
    image: farmChef,
    specialCuisines: ['Maharashtrian', 'Coastal Konkani', 'Organic Fusion'],
    pricePerHour: 800,
    rating: 4.9,
    experience: '15 years',
    available: true,
  },
];

export const MOCK_TRANSPORT: TransportService[] = [
  {
    id: 't1',
    farmerId: 'f1',
    farmerName: 'Ramesh Patil',
    vehicleType: 'Mini Truck (2 Ton)',
    image: transportVehicle,
    capacity: '2000 kg',
    pricePerKm: 25,
    available: true,
    location: 'Ratnagiri, Maharashtra',
  },
];

export const MOCK_LANDS: LandListing[] = [
  {
    id: 'l1',
    ownerId: 'lo1',
    ownerName: 'Vijay Desai',
    images: [farmLand, farmHotel],
    location: 'Nashik, Maharashtra',
    areaInAcres: 5,
    soilType: 'Black Cotton Soil',
    phValue: 6.8,
    waterAvailability: true,
    pricePerSeason: 45000,
    description: 'Fertile black cotton soil with borewell irrigation. Suitable for cotton, soybeans, and vegetables.',
    status: 'available',
  },
];

export const AI_SUGGESTIONS: Record<string, AISuggestion[]> = {
  'low-kharif': [
    { crop: 'Groundnut', suitability: 92, valueProducts: ['Cold-pressed Oil', 'Peanut Butter', 'Groundnut Chikki'], priceRange: { min: 400, max: 600 }, season: 'Kharif', notes: 'Excellent for acidic soil. High market demand.' },
    { crop: 'Sweet Potato', suitability: 88, valueProducts: ['Chips', 'Flour', 'Candy'], priceRange: { min: 50, max: 120 }, season: 'Kharif', notes: 'Tolerates low pH very well.' },
    { crop: 'Blueberry', suitability: 75, valueProducts: ['Jam', 'Juice', 'Dried Berries'], priceRange: { min: 800, max: 1500 }, season: 'Kharif', notes: 'Premium export crop for acidic soil.' },
  ],
  'neutral-rabi': [
    { crop: 'Wheat', suitability: 95, valueProducts: ['Atta', 'Semolina', 'Bread'], priceRange: { min: 30, max: 60 }, season: 'Rabi', notes: 'Ideal for neutral soil. Staple with steady demand.' },
    { crop: 'Mustard', suitability: 90, valueProducts: ['Mustard Oil', 'Pickle', 'Paste'], priceRange: { min: 80, max: 150 }, season: 'Rabi', notes: 'High value oil crop.' },
    { crop: 'Gram/Chickpea', suitability: 85, valueProducts: ['Besan', 'Dal', 'Roasted Snacks'], priceRange: { min: 60, max: 100 }, season: 'Rabi', notes: 'Protein-rich legume, excellent export potential.' },
  ],
  'high-zaid': [
    { crop: 'Asparagus', suitability: 85, valueProducts: ['Pickled', 'Frozen', 'Soup'], priceRange: { min: 300, max: 800 }, season: 'Zaid', notes: 'Alkaline soil specialist. Premium export market.' },
    { crop: 'Sugarcane', suitability: 80, valueProducts: ['Jaggery', 'Bagasse Board', 'Ethanol'], priceRange: { min: 28, max: 40 }, season: 'Zaid', notes: 'Year-round income with multiple by-products.' },
    { crop: 'Aloe Vera', suitability: 78, valueProducts: ['Gel', 'Juice', 'Cosmetics'], priceRange: { min: 15, max: 25 }, season: 'Zaid', notes: 'Low water requirement, high margin.' },
  ],
};
