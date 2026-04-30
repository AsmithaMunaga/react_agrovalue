import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, MapPin, Users, CheckCircle, XCircle, Clock } from 'lucide-react';
import { MOCK_LANDS } from '@/data/mockData';
import { toast } from 'sonner';

const mockRequests = [
  { id: 'r1', tenant: 'Ramesh Patil', location: 'Nashik', season: 'Kharif 2024', status: 'pending', amount: 45000 },
  { id: 'r2', tenant: 'Suresh Kumar', location: 'Nashik', season: 'Rabi 2024', status: 'approved', amount: 45000 },
];

export default function LandOwnerDashboard() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">Land Owner Dashboard 🏞️</h1>
            <p className="text-muted-foreground">Welcome, {user?.name}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Lands Listed', value: '1', icon: MapPin, color: 'text-primary' },
              { label: 'Annual Earnings', value: '₹90,000', icon: TrendingUp, color: 'text-secondary' },
              { label: 'Active Tenants', value: '1', icon: Users, color: 'text-accent' },
              { label: 'Pending Requests', value: '1', icon: Clock, color: 'text-earth' },
            ].map(stat => (
              <div key={stat.label} className="bg-card border border-border rounded-2xl p-4">
                <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
            <div className="p-5 border-b border-border"><h2 className="font-display text-lg font-bold text-foreground">Rental Requests</h2></div>
            <div className="divide-y divide-border">
              {mockRequests.map(req => (
                <div key={req.id} className="p-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-medium text-foreground">{req.tenant}</div>
                    <div className="text-xs text-muted-foreground">{req.location} · {req.season}</div>
                  </div>
                  <div className="font-bold text-foreground">₹{req.amount.toLocaleString()}</div>
                  <Badge className={req.status === 'approved' ? 'bg-primary/10 text-primary' : 'bg-secondary/20 text-secondary-foreground'}>{req.status}</Badge>
                  {req.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => toast.success('Request approved!')}><CheckCircle className="w-4 h-4" /></Button>
                      <Button size="sm" variant="outline" className="text-destructive" onClick={() => toast.error('Request rejected')}><XCircle className="w-4 h-4" /></Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
