import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingCart, Heart, Share2, MapPin, ChevronLeft, ChevronRight, Package, Clock, Leaf, Flame } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState<'desc' | 'nutrition' | 'reviews'>('desc');

  const product = MOCK_PRODUCTS.find(p => p.id === id);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">😔</div>
        <h2 className="font-display text-2xl font-bold text-foreground">Product not found</h2>
        <Button className="mt-4" onClick={() => navigate('/products')}>Back to Products</Button>
      </div>
    </div>
  );

  const discounted = product.price * (1 - product.discount / 100);

  const handleAddToCart = () => {
    addToCart(product, qty);
    toast.success(`${qty}x ${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <button onClick={() => navigate('/')} className="hover:text-primary">Home</button>
            <span>/</span>
            <button onClick={() => navigate('/products')} className="hover:text-primary">Products</button>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
            {/* Image Gallery */}
            <div>
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-muted">
                <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover animate-fade-in" />
                {product.discount > 0 && (
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground border-0">{product.discount}% OFF</Badge>
                )}
                <button
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card/80 flex items-center justify-center hover:bg-card shadow-agro"
                  onClick={() => setActiveImg(prev => (prev - 1 + product.images.length) % product.images.length)}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card/80 flex items-center justify-center hover:bg-card shadow-agro"
                  onClick={() => setActiveImg(prev => (prev + 1) % product.images.length)}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-primary shadow-agro' : 'border-border'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">{product.category}</Badge>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{product.name}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-secondary text-secondary' : 'text-muted'}`} />
                  ))}
                  <span className="text-sm font-medium ml-1">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews.length} reviews)</span>
                <Badge variant="secondary" className={product.inStock ? 'text-primary' : 'text-destructive'}>
                  {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </Badge>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 mb-6 p-4 bg-muted/50 rounded-xl">
                <span className="font-display text-4xl font-bold text-foreground">₹{discounted.toFixed(0)}</span>
                {product.discount > 0 && (
                  <>
                    <span className="text-muted-foreground line-through text-xl">₹{product.price}</span>
                    <Badge className="bg-accent text-accent-foreground border-0">Save ₹{(product.price - discounted).toFixed(0)}</Badge>
                  </>
                )}
              </div>

              {/* Farmer info */}
              <div className="flex items-center gap-3 mb-6 p-3 bg-card border border-border rounded-xl">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">{product.farmerName[0]}</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{product.farmerName}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="w-3 h-3" />{product.farmerLocation}</div>
                </div>
                <Button variant="outline" size="sm" className="ml-auto border-primary text-primary">View Farm</Button>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: Package, label: 'Crop Source', value: product.cropSource },
                  { icon: Clock, label: 'Shelf Life', value: product.shelfLife },
                  { icon: Flame, label: 'Processing', value: product.processingMethod.split(' ')[0] + '...' },
                  { icon: Leaf, label: 'Stock', value: `${product.quantity} units` },
                ].map(info => (
                  <div key={info.label} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <info.icon className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <div className="text-xs text-muted-foreground">{info.label}</div>
                      <div className="text-sm font-medium text-foreground truncate">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quantity & Actions */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center border border-border rounded-xl overflow-hidden">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-2 hover:bg-muted text-lg font-medium">−</button>
                  <span className="px-4 py-2 font-semibold min-w-12 text-center">{qty}</span>
                  <button onClick={() => setQty(q => Math.min(product.quantity, q + 1))} className="px-4 py-2 hover:bg-muted text-lg font-medium">+</button>
                </div>
                <Button onClick={handleAddToCart} className="flex-1 bg-primary text-primary-foreground" disabled={!product.inStock}>
                  <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                </Button>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground" onClick={() => { handleAddToCart(); navigate('/checkout'); }}>
                  Buy Now
                </Button>
                <Button variant="outline" size="icon"><Heart className="w-4 h-4" /></Button>
                <Button variant="outline" size="icon"><Share2 className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden mb-12">
            <div className="flex border-b border-border">
              {(['desc', 'nutrition', 'reviews'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium transition-all ${activeTab === tab ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {tab === 'desc' ? 'Description' : tab === 'nutrition' ? 'Nutrition' : `Reviews (${product.reviews.length})`}
                </button>
              ))}
            </div>
            <div className="p-6">
              {activeTab === 'desc' && (
                <div className="space-y-4">
                  <p className="text-foreground/80 leading-relaxed">{product.description}</p>
                  <div>
                    <h4 className="font-display font-semibold text-foreground mb-2">Processing Method</h4>
                    <p className="text-foreground/70">{product.processingMethod}</p>
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground mb-2">Ingredients</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.ingredients.map(ing => <Badge key={ing} variant="secondary">{ing}</Badge>)}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'nutrition' && (
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-3">Nutritional Information</h4>
                  <p className="text-foreground/80 bg-muted/50 rounded-xl p-4">{product.nutritionalInfo}</p>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {product.reviews.length > 0 ? product.reviews.map(review => (
                    <div key={review.id} className="border-b border-border pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-foreground">{review.userName}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-secondary text-secondary' : 'text-muted'}`} />)}
                        </div>
                      </div>
                      <p className="text-foreground/70 text-sm">{review.comment}</p>
                      <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                    </div>
                  )) : (
                    <p className="text-muted-foreground text-center py-8">No reviews yet. Be the first to review!</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
