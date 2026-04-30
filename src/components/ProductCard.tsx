import { Product } from '@/data/mockData';
import { Star, ShoppingCart, MapPin, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const discountedPrice = product.price * (1 - product.discount / 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      description: `₹${discountedPrice.toFixed(0)} × 1`,
    });
  };

  return (
    <Link to={`/products/${product.id}`}>
      <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-agro-lg hover:-translate-y-1 transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.discount > 0 && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground border-0 text-xs">
              <Tag className="w-3 h-3 mr-1" />{product.discount}% OFF
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <Badge variant="secondary">Out of Stock</Badge>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="w-full bg-primary text-primary-foreground hover:bg-primary-light"
              disabled={!product.inStock}
            >
              <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-display font-semibold text-foreground text-sm leading-tight line-clamp-2">{product.name}</h3>
          </div>
          <Badge variant="secondary" className="text-xs mb-2">{product.category}</Badge>

          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
            <span className="text-xs font-medium text-foreground">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews.length} reviews)</span>
          </div>

          <div className="flex items-center gap-1 mb-3 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{product.farmerLocation}</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-foreground text-lg font-body">₹{discountedPrice.toFixed(0)}</span>
              {product.discount > 0 && (
                <span className="text-xs text-muted-foreground line-through ml-1">₹{product.price}</span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{product.quantity} left</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
