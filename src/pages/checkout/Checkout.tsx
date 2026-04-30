import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Truck, CheckCircle, MapPin, Phone, User } from 'lucide-react';
import { toast } from 'sonner';

type PaymentMethod = 'cod' | 'card';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [address, setAddress] = useState({ name: '', phone: '', street: '', city: '', state: '', pincode: '' });

  const formatCard = (val: string) => val.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
  const formatExpiry = (val: string) => val.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);

  const handlePlaceOrder = async () => {
    if (!address.name || !address.phone || !address.street || !address.city) {
      toast.error('Please fill all delivery details');
      return;
    }
    if (paymentMethod === 'card') {
      if (!cardData.number || !cardData.expiry || !cardData.cvv || !cardData.name) {
        toast.error('Please fill all card details');
        return;
      }
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    clearCart();
    setLoading(false);
    navigate('/order-success');
  };

  const total = totalPrice * 1.05;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="font-display text-3xl font-bold text-foreground mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground">Delivery Address</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="flex items-center gap-1"><User className="w-3 h-3" /> Full Name *</Label>
                    <Input className="mt-1.5" placeholder="Priya Sharma" value={address.name} onChange={e => setAddress({ ...address, name: e.target.value })} />
                  </div>
                  <div>
                    <Label className="flex items-center gap-1"><Phone className="w-3 h-3" /> Phone *</Label>
                    <Input className="mt-1.5" placeholder="+91 98765 43210" value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Street Address *</Label>
                    <Input className="mt-1.5" placeholder="Flat 4B, Anand Nagar, Near..." value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} />
                  </div>
                  <div>
                    <Label>City *</Label>
                    <Input className="mt-1.5" placeholder="Mumbai" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
                  </div>
                  <div>
                    <Label>State</Label>
                    <Input className="mt-1.5" placeholder="Maharashtra" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} />
                  </div>
                  <div>
                    <Label>PIN Code</Label>
                    <Input className="mt-1.5" placeholder="400001" value={address.pincode} onChange={e => setAddress({ ...address, pincode: e.target.value })} />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground">Payment Method</h2>
                </div>

                {/* Method Selection */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { value: 'cod' as const, icon: '💵', label: 'Cash on Delivery', desc: 'Pay when you receive' },
                    { value: 'card' as const, icon: '💳', label: 'Debit Card', desc: 'Secure online payment' },
                  ].map(m => (
                    <button
                      key={m.value}
                      onClick={() => setPaymentMethod(m.value)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${paymentMethod === m.value ? 'border-primary bg-primary/5 shadow-agro' : 'border-border hover:border-primary/40'}`}
                    >
                      <div className="text-2xl mb-2">{m.icon}</div>
                      <div className="font-semibold text-sm text-foreground">{m.label}</div>
                      <div className="text-xs text-muted-foreground">{m.desc}</div>
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 animate-fade-in">
                    {/* Mock card preview */}
                    <div className="relative h-44 rounded-2xl overflow-hidden p-6" style={{ background: 'linear-gradient(135deg, hsl(145,45%,22%), hsl(145,35%,40%))' }}>
                      <div className="absolute inset-0 opacity-10">
                        <div className="w-48 h-48 rounded-full bg-white absolute -top-12 -right-12" />
                        <div className="w-32 h-32 rounded-full bg-white absolute bottom-0 left-12" />
                      </div>
                      <div className="relative">
                        <div className="w-10 h-7 rounded bg-gradient-harvest mb-4" />
                        <div className="font-mono text-white text-xl tracking-widest mb-4">
                          {cardData.number || '#### #### #### ####'}
                        </div>
                        <div className="flex justify-between">
                          <div>
                            <div className="text-white/60 text-xs">Card Holder</div>
                            <div className="text-white font-medium text-sm">{cardData.name || 'YOUR NAME'}</div>
                          </div>
                          <div>
                            <div className="text-white/60 text-xs">Expires</div>
                            <div className="text-white font-medium text-sm">{cardData.expiry || 'MM/YY'}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Card Number *</Label>
                      <Input
                        className="mt-1.5 font-mono"
                        placeholder="1234 5678 9012 3456"
                        value={cardData.number}
                        onChange={e => setCardData({ ...cardData, number: formatCard(e.target.value) })}
                        maxLength={19}
                      />
                    </div>
                    <div>
                      <Label>Card Holder Name *</Label>
                      <Input className="mt-1.5" placeholder="PRIYA SHARMA" value={cardData.name} onChange={e => setCardData({ ...cardData, name: e.target.value.toUpperCase() })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Expiry Date *</Label>
                        <Input className="mt-1.5" placeholder="MM/YY" value={cardData.expiry} onChange={e => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })} maxLength={5} />
                      </div>
                      <div>
                        <Label>CVV *</Label>
                        <Input className="mt-1.5" placeholder="•••" type="password" value={cardData.cvv} onChange={e => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })} maxLength={3} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg text-xs text-muted-foreground">
                      🔒 256-bit SSL encrypted. Your card data is never stored.
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="p-4 bg-muted/50 rounded-xl text-sm text-foreground/80 flex items-center gap-3 animate-fade-in">
                    <Truck className="w-5 h-5 text-primary shrink-0" />
                    Pay cash when your order is delivered at your doorstep. Available for orders up to ₹5,000.
                  </div>
                )}
              </div>
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-20">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {items.map(item => {
                    const disc = item.product.price * (1 - item.product.discount / 100);
                    return (
                      <div key={item.product.id} className="flex gap-3">
                        <img src={item.product.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground truncate">{item.product.name}</div>
                          <div className="text-xs text-muted-foreground">Qty: {item.quantity}</div>
                        </div>
                        <div className="text-sm font-semibold text-foreground">₹{(disc * item.quantity).toFixed(0)}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-border pt-4 space-y-2 mb-4 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{totalPrice.toFixed(0)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="text-primary font-medium">FREE</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">GST (5%)</span><span>₹{(totalPrice * 0.05).toFixed(0)}</span></div>
                </div>
                <div className="border-t border-border pt-4 mb-6 flex justify-between items-center">
                  <span className="font-display font-bold text-foreground text-lg">Total</span>
                  <span className="font-display font-bold text-2xl text-primary">₹{total.toFixed(0)}</span>
                </div>
                <Badge className="w-full justify-center mb-4 bg-primary/10 text-primary border-primary/20">
                  {paymentMethod === 'cod' ? '💵 Cash on Delivery' : '💳 Card Payment'}
                </Badge>
                <Button
                  onClick={handlePlaceOrder}
                  className="w-full bg-primary text-primary-foreground"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <>Place Order · ₹{total.toFixed(0)}</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
