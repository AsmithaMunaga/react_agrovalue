import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Package, ShoppingBag, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { toast } from 'sonner';

const pendingFarmers = [
  { id: 'pf1', name: 'Arjun Sharma', location: 'Pune, MH', applied: '2024-01-20', type: 'Farmer' },
  { id: 'pf2', name: 'Meera Devi', location: 'Nagpur, MH', applied: '2024-01-21', type: 'Land Owner' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">Admin Panel 🛡️</h1>
            <p className="text-muted-foreground">Platform overview and management</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Farmers', value: '12,400', icon: Users, color: 'text-primary' },
              { label: 'Products Listed', value: '45,200', icon: Package, color: 'text-secondary' },
              { label: 'Orders Today', value: '1,847', icon: ShoppingBag, color: 'text-accent' },
              { label: 'Revenue (Month)', value: '₹42.5L', icon: TrendingUp, color: 'text-earth' },
            ].map(stat => (
              <div key={stat.label} className="bg-card border border-border rounded-2xl p-4">
                <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-border"><h2 className="font-display text-lg font-bold text-foreground">Pending Approvals</h2></div>
              <div className="divide-y divide-border">
                {pendingFarmers.map(f => (
                  <div key={f.id} className="p-4 flex items-center justify-between gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">{f.name[0]}</div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground text-sm">{f.name}</div>
                      <div className="text-xs text-muted-foreground">{f.location} · Applied {f.applied}</div>
                    </div>
                    <Badge className="bg-secondary/20 text-secondary-foreground">{f.type}</Badge>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => toast.success(`${f.name} approved!`)}><CheckCircle className="w-4 h-4" /></Button>
                      <Button size="sm" variant="outline" className="text-destructive border-destructive/30" onClick={() => toast.error(`${f.name} rejected`)}><XCircle className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-border"><h2 className="font-display text-lg font-bold text-foreground">Recent Products</h2></div>
              <div className="divide-y divide-border">
                {MOCK_PRODUCTS.slice(0, 4).map(p => (
                  <div key={p.id} className="p-4 flex items-center gap-3">
                    <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-foreground truncate">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.farmerName}</div>
                    </div>
                    <Badge className="bg-primary/10 text-primary text-xs">₹{p.price}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
