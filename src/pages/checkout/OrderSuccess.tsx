import { Link } from 'react-router-dom';
import { CheckCircle, Home, ShoppingBag, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';

export default function OrderSuccess() {
  const orderId = `AGV${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-background flex items-center justify-center p-8">
        <div className="text-center max-w-lg animate-scale-in">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-primary" />
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">Order Placed!</h1>
          <p className="text-muted-foreground text-lg mb-2">Your order has been successfully placed.</p>
          <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full mb-8">
            <span className="text-sm text-muted-foreground">Order ID:</span>
            <span className="font-mono font-bold text-primary">#{orderId}</span>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-display font-semibold text-foreground mb-4">What happens next?</h3>
            <div className="space-y-4">
              {[
                { icon: CheckCircle, step: '1', text: 'Farmer accepts your order (within 2 hours)', done: true },
                { icon: Truck, step: '2', text: 'Order packed & dispatched (1-2 business days)', done: false },
                { icon: Home, step: '3', text: 'Delivered to your doorstep (3-7 days)', done: false },
              ].map(s => (
                <div key={s.step} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${s.done ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    <s.icon className="w-4 h-4" />
                  </div>
                  <span className={`text-sm ${s.done ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{s.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/buyer-dashboard">
              <Button className="bg-primary text-primary-foreground">Track My Order</Button>
            </Link>
            <Link to="/products">
              <Button variant="outline"><ShoppingBag className="w-4 h-4 mr-2" /> Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
