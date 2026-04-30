import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, TrendingUp, MapPin, Truck, Hotel, ChefHat, Brain, ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MOCK_PRODUCTS } from '@/data/mockData';
import heroBanner from '@/assets/hero-banner.jpg';
import farmHotel from '@/assets/farm-hotel.jpg';
import transportVehicle from '@/assets/transport-vehicle.jpg';
import farmLand from '@/assets/farm-land.jpg';
import { ProductCard } from '@/components/ProductCard';

const services = [
  { icon: ShoppingBag, title: 'Value-Added Products', desc: 'Shop authentic farm-processed goods', path: '/products', color: 'text-primary' },
  { icon: Hotel, title: 'Farm Stay Hotels', desc: 'Experience rural hospitality', path: '/hotels', color: 'text-secondary' },
  { icon: Truck, title: 'Transport Services', desc: 'Reliable farm produce transport', path: '/transport', color: 'text-accent' },
  { icon: MapPin, title: 'Rent Farm Land', desc: 'Access fertile land by season', path: '/land', color: 'text-earth' },
  { icon: ChefHat, title: 'Book a Farm Chef', desc: 'Authentic rural cuisine experience', path: '/hotels', color: 'text-harvest' },
  { icon: Brain, title: 'AI Crop Advisor', desc: 'Smart suggestions based on soil pH', path: '/ai-advisor', color: 'text-sage' },
];

const stats = [
  { label: 'Registered Farmers', value: '12,400+' },
  { label: 'Products Listed', value: '45,000+' },
  { label: 'Orders Fulfilled', value: '2.8L+' },
  { label: 'States Covered', value: '28' },
];

export default function Home() {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <Badge className="mb-6 bg-secondary/20 text-secondary border-secondary/30 text-sm px-4 py-1.5 font-body animate-fade-in">
              🌾 India's First Rural Value-Addition Marketplace
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-[1.1] animate-fade-in-up">
              From Farm<br />to Global<br />
              <span className="text-secondary">Markets</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 font-body leading-relaxed max-w-lg animate-fade-in-up animate-delay-100">
              Empowering farmers to transform crops into premium products. Buy authentic, 
              book farm stays, rent land, and get AI-powered crop insights.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up animate-delay-200">
              <Link to="/products">
                <Button size="lg" className="bg-gradient-harvest text-soil font-semibold hover:opacity-90 shadow-amber border-0 text-base px-8">
                  Shop Products <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8">
                  Become a Farmer
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating stat cards */}
        <div className="absolute bottom-8 right-4 md:right-12 hidden lg:flex gap-4 animate-fade-in animate-delay-300">
          {stats.slice(0, 2).map(s => (
            <div key={s.label} className="glass rounded-xl px-5 py-3 text-center">
              <div className="font-display text-2xl font-bold text-secondary">{s.value}</div>
              <div className="text-xs text-primary-foreground/70 font-body">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(s => (
              <div key={s.label}>
                <div className="font-display text-3xl font-bold text-secondary">{s.value}</div>
                <div className="text-sm text-primary-foreground/70 font-body mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent-light text-accent border-accent/20">Our Services</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Everything Rural, <span className="text-primary">One Platform</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A complete ecosystem connecting farmers, buyers, land owners, and travellers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <Link key={svc.title} to={svc.path}>
                <div className={`group bg-card border border-border rounded-2xl p-6 hover:shadow-agro-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in-up`} style={{ animationDelay: `${i * 80}ms` }}>
                  <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <svc.icon className={`w-6 h-6 ${svc.color}`} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{svc.title}</h3>
                  <p className="text-sm text-muted-foreground">{svc.desc}</p>
                  <div className={`mt-4 flex items-center text-sm font-medium ${svc.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    Explore <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Featured</Badge>
              <h2 className="font-display text-4xl font-bold text-foreground">Farm-Fresh Products</h2>
              <p className="text-muted-foreground mt-2">Handcrafted by verified farmers across India</p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Farm Experiences */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent-light text-accent border-accent/20">Experiences</Badge>
            <h2 className="font-display text-4xl font-bold text-foreground">
              Beyond Products – <span className="text-accent">Farm Experiences</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: farmHotel, title: 'Farm Stay Hotels', desc: 'Sleep amidst orchards and fields', path: '/hotels', tag: 'From ₹2,500/night' },
              { img: transportVehicle, title: 'Transport Services', desc: 'Reliable delivery from farm to home', path: '/transport', tag: 'From ₹25/km' },
              { img: farmLand, title: 'Rent Agricultural Land', desc: 'Access fertile land by season', path: '/land', tag: 'From ₹45,000/season' },
            ].map(exp => (
              <Link key={exp.title} to={exp.path} className="group block">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-4">
                  <img src={exp.img} alt={exp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-soil/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-secondary text-secondary-foreground border-0 mb-2">{exp.tag}</Badge>
                    <h3 className="font-display text-xl font-bold text-primary-foreground">{exp.title}</h3>
                    <p className="text-sm text-primary-foreground/80">{exp.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Advisor CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-gradient-harvest mx-auto flex items-center justify-center mb-6 animate-float">
              <Brain className="w-8 h-8 text-soil" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              AI-Powered Crop Advisor
            </h2>
            <p className="text-primary-foreground/70 mb-8 text-lg">
              Enter your soil pH and season — get personalized crop recommendations and value-addition suggestions.
            </p>
            <Link to="/ai-advisor">
              <Button size="lg" className="bg-gradient-harvest text-soil font-semibold hover:opacity-90 shadow-amber border-0 text-base px-10">
                Try AI Advisor Free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-foreground">Farmer Success Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Ramesh Patil', location: 'Ratnagiri, MH', text: 'AgroValue helped me earn 3x more from my mango harvest by turning them into premium pickles!', income: '₹4.5L/year' },
              { name: 'Suresh Kumar', location: 'Kolhapur, MH', text: 'My jaggery now sells in 15 countries. The platform made going global so easy.', income: '₹8.2L/year' },
              { name: 'Lakshmi Devi', location: 'Anand, GJ', text: 'Our farm stay hotel is fully booked every weekend thanks to AgroValue listings!', income: '₹12L/year' },
            ].map((t, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 hover:shadow-agro transition-shadow">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-secondary text-secondary" />)}
                </div>
                <p className="text-foreground/80 italic mb-4">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground font-display">{t.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{t.location}</div>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20">{t.income}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 bg-muted/40 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-6 h-6 text-primary" />
            <TrendingUp className="w-6 h-6 text-secondary" />
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">Ready to Grow Together?</h2>
          <p className="text-muted-foreground mb-8">Join 12,400+ farmers already transforming their livelihoods.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/register"><Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-light">Register as Farmer</Button></Link>
            <Link to="/register"><Button size="lg" variant="outline" className="border-primary text-primary">Register as Buyer</Button></Link>
            <Link to="/register"><Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">Register as Land Owner</Button></Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
