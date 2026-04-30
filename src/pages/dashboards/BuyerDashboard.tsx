import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_PRODUCTS, MOCK_TRANSPORT } from '@/data/mockData';
import { ShoppingBag, TrendingUp, Star, Package, Truck, Hotel, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const mockOrders = [
  { id: 'ORD001', product: 'Mango Pickle', farmer: 'Ramesh Patil', amount: 269, status: 'delivered', date: '2024-01-15' },
  { id: 'ORD002', product: 'Organic Jaggery', farmer: 'Suresh Kumar', amount: 342, status: 'shipped', date: '2024-01-20' },
  { id: 'ORD003', product: 'Cold-Pressed Oil', farmer: 'Ramesh Patil', amount: 765, status: 'pending', date: '2024-01-22' },
];

const statusColors: Record<string, string> = {
  delivered: 'bg-primary/10 text-primary',
  shipped: 'bg-secondary/20 text-secondary-foreground',
  pending: 'bg-accent/10 text-accent',
  cancelled: 'bg-destructive/10 text-destructive',
};

export default function BuyerDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">Welcome, {user?.name?.split(' ')[0]}! 👋</h1>
            <p className="text-muted-foreground">Track your orders and explore more products</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Orders', value: '3', icon: ShoppingBag, color: 'text-primary' },
              { label: 'Total Spent', value: '₹1,376', icon: TrendingUp, color: 'text-secondary' },
              { label: 'Reviews Given', value: '2', icon: Star, color: 'text-accent' },
              { label: 'Saved Items', value: '5', icon: Package, color: 'text-earth' },
            ].map(stat => (
              <div key={stat.label} className="bg-card border border-border rounded-2xl p-4">
                <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Orders */}
            <div className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-border flex justify-between items-center">
                <h2 className="font-display text-lg font-bold text-foreground">My Orders</h2>
                <Link to="/products"><Button variant="outline" size="sm">Shop More</Button></Link>
              </div>
              <div className="divide-y divide-border">
                {mockOrders.map(order => (
                  <div key={order.id} className="p-4 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground text-sm">{order.product}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{order.farmer}</div>
                      <div className="text-xs text-muted-foreground">{order.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-foreground mb-1">₹{order.amount}</div>
                      <Badge className={`text-xs ${statusColors[order.status]}`}>{order.status}</Badge>
                    </div>
                    {order.status === 'delivered' && (
                      <Button size="sm" variant="outline" className="border-secondary text-secondary" onClick={() => toast.success('Review submitted!')}>
                        <Star className="w-3 h-3 mr-1" /> Rate
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-display font-bold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {[
                    { icon: Truck, label: 'Book Transport', path: '/transport', desc: 'After order confirmed' },
                    { icon: Hotel, label: 'Farm Hotels', path: '/hotels', desc: 'Plan farm visit' },
                    { icon: ShoppingBag, label: 'Browse Products', path: '/products', desc: 'Explore marketplace' },
                  ].map(a => (
                    <Link key={a.label} to={a.path}>
                      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><a.icon className="w-4 h-4 text-primary" /></div>
                        <div><div className="text-sm font-medium text-foreground">{a.label}</div><div className="text-xs text-muted-foreground">{a.desc}</div></div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="bg-primary rounded-2xl p-5 text-center">
                <h3 className="font-display font-bold text-primary-foreground mb-2">Invite Friends</h3>
                <p className="text-primary-foreground/70 text-sm mb-3">Earn ₹100 for each referral</p>
                <Button className="bg-gradient-harvest text-soil border-0 w-full" onClick={() => toast.success('Referral link copied!')}>Copy Referral Link</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
