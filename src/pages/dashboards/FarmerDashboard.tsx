import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { Package, TrendingUp, Star, ShoppingBag, Plus, Brain, Hotel, Truck, ToggleLeft, ToggleRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';

export default function FarmerDashboard() {
  const { user } = useAuth();
  const [hotelEnabled, setHotelEnabled] = useState(false);
  const [transportEnabled, setTransportEnabled] = useState(true);
  const myProducts = MOCK_PRODUCTS.filter(p => p.farmerId === 'f1');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Farmer Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.name?.split(' ')[0]} 🌾</p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20">✓ KYC Verified</Badge>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Products Listed', value: myProducts.length, icon: Package, color: 'text-primary' },
              { label: 'This Month Revenue', value: '₹18,450', icon: TrendingUp, color: 'text-secondary' },
              { label: 'Avg Rating', value: '4.8 ⭐', icon: Star, color: 'text-accent' },
              { label: 'Orders Received', value: '42', icon: ShoppingBag, color: 'text-earth' },
            ].map(stat => (
              <div key={stat.label} className="bg-card border border-border rounded-2xl p-4">
                <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Products */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-border flex justify-between items-center">
                  <h2 className="font-display text-lg font-bold text-foreground">My Products</h2>
                  <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => toast.info('Add product form coming soon!')}><Plus className="w-4 h-4 mr-1" />Add Product</Button>
                </div>
                <div className="divide-y divide-border">
                  {myProducts.map(p => (
                    <div key={p.id} className="p-4 flex items-center gap-4">
                      <img src={p.images[0]} alt={p.name} className="w-14 h-14 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground text-sm">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.category} · Stock: {p.quantity}</div>
                        <div className="flex items-center gap-1 mt-0.5"><Star className="w-3 h-3 fill-secondary text-secondary" /><span className="text-xs">{p.rating}</span></div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-foreground">₹{p.price}</div>
                        {p.discount > 0 && <Badge className="text-xs bg-accent/10 text-accent">{p.discount}% off</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Services Toggles */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-display font-bold text-foreground mb-4">My Services</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                    <div className="flex items-center gap-2"><Hotel className="w-4 h-4 text-primary" /><span className="text-sm font-medium">Farm Hotel</span></div>
                    <button onClick={() => setHotelEnabled(!hotelEnabled)} className={`transition-colors ${hotelEnabled ? 'text-primary' : 'text-muted-foreground'}`}>
                      {hotelEnabled ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                    <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-accent" /><span className="text-sm font-medium">Transport</span></div>
                    <button onClick={() => setTransportEnabled(!transportEnabled)} className={`transition-colors ${transportEnabled ? 'text-primary' : 'text-muted-foreground'}`}>
                      {transportEnabled ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                    </button>
                  </div>
                </div>
              </div>
              {/* AI Advisor */}
              <div className="bg-primary rounded-2xl p-5">
                <Brain className="w-6 h-6 text-secondary mb-2" />
                <h3 className="font-display font-bold text-primary-foreground mb-1">AI Crop Advisor</h3>
                <p className="text-primary-foreground/70 text-xs mb-3">Get crop suggestions based on your soil pH</p>
                <Link to="/ai-advisor"><Button className="bg-gradient-harvest text-soil border-0 w-full text-sm">Try Now →</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
