import { useCart } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center bg-background">
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add authentic farm products to get started</p>
            <Link to="/products">
              <Button className="bg-primary text-primary-foreground">Browse Products</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Shopping Cart</h1>
              <p className="text-muted-foreground mt-1">{totalItems} items</p>
            </div>
            <Button variant="outline" size="sm" onClick={clearCart} className="text-destructive border-destructive/30 hover:bg-destructive hover:text-destructive-foreground">
              <Trash2 className="w-4 h-4 mr-2" /> Clear Cart
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => {
                const discounted = item.product.price * (1 - item.product.discount / 100);
                return (
                  <div key={item.product.id} className="bg-card border border-border rounded-2xl p-4 flex gap-4">
                    <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="font-display font-semibold text-foreground leading-tight">{item.product.name}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.product.farmerName} · {item.product.farmerLocation}</p>
                          <Badge variant="secondary" className="text-xs mt-1">{item.product.category}</Badge>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-border rounded-lg overflow-hidden">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-3 py-1.5 hover:bg-muted">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-1.5 font-medium text-sm min-w-8 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-3 py-1.5 hover:bg-muted">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-foreground">₹{(discounted * item.quantity).toFixed(0)}</div>
                          {item.product.discount > 0 && (
                            <div className="text-xs text-muted-foreground line-through">₹{(item.product.price * item.quantity).toFixed(0)}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-20">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  {items.map(item => {
                    const disc = item.product.price * (1 - item.product.discount / 100);
                    return (
                      <div key={item.product.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground truncate pr-2">{item.product.name} × {item.quantity}</span>
                        <span className="font-medium text-foreground shrink-0">₹{(disc * item.quantity).toFixed(0)}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-border pt-4 space-y-2 mb-4">
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>₹{totalPrice.toFixed(0)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery</span><span className="text-primary">FREE</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">GST (5%)</span><span>₹{(totalPrice * 0.05).toFixed(0)}</span></div>
                </div>
                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-display font-bold text-foreground text-lg">Total</span>
                    <span className="font-display font-bold text-2xl text-primary">₹{(totalPrice * 1.05).toFixed(0)}</span>
                  </div>
                </div>
                <Button onClick={() => navigate('/checkout')} className="w-full bg-primary text-primary-foreground" size="lg">
                  Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <div className="mt-3 p-3 bg-muted/50 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">🔒 Secure payment powered by AgroValue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
