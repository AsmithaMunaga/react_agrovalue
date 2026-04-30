import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserRole, type User } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const roles: { value: UserRole; label: string; emoji: string; desc: string; benefits: string[] }[] = [
  {
    value: 'farmer', label: 'Farmer', emoji: '🌾', desc: 'Sell value-added products',
    benefits: ['List products globally', 'AI crop suggestions', 'Hotel & transport services']
  },
  {
    value: 'buyer', label: 'Buyer', emoji: '🛒', desc: 'Shop authentic farm products',
    benefits: ['Direct from farmers', 'Book farm hotels', 'Transport booking']
  },
  {
    value: 'landowner', label: 'Land Owner', emoji: '🏞️', desc: 'Rent your agricultural land',
    benefits: ['Seasonal rental income', 'Verified tenants', 'Earnings dashboard']
  },
];

export default function Register() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('buyer');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { toast.error('Please fill all required fields'); return; }
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1000));

      const newUser: User = {
        id: crypto.randomUUID(),
        name,
        email,
        role,
        phone: phone || undefined,
        isApproved: role === 'buyer',
      };

      register(newUser);
      toast.success('Account created! Welcome to AgroValue 🌾');

      switch (role) {
        case 'buyer':
          navigate('/buyer-dashboard');
          break;
        case 'farmer':
          navigate('/farmer-dashboard');
          break;
        case 'landowner':
          navigate('/landowner-dashboard');
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left */}
      <div className="hidden lg:flex lg:w-2/5 bg-primary flex-col justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-80 h-80 rounded-full bg-secondary absolute -top-20 -right-20" />
          <div className="w-60 h-60 rounded-full bg-accent absolute bottom-20 -left-16" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-harvest flex items-center justify-center">
              <Leaf className="w-6 h-6 text-soil" />
            </div>
            <span className="font-display text-2xl font-bold text-primary-foreground">AgroValue</span>
          </div>
          <h2 className="font-display text-4xl font-bold text-primary-foreground leading-tight mb-4">
            Join India's <span className="text-secondary">Largest Rural</span> Marketplace
          </h2>
          <p className="text-primary-foreground/70 mb-8">12,400+ farmers already growing with us.</p>

          <div className="space-y-4">
            {['Free registration & listing', 'AI-powered crop recommendations', 'Instant global market access', 'Secure payments & earnings'].map(b => (
              <div key={b} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-primary-foreground/80 text-sm">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="font-display text-xl font-bold text-foreground">AgroValue</span>
          </div>

          {step === 1 ? (
            <>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">Choose Your Role</h1>
              <p className="text-muted-foreground mb-8">Select how you want to use AgroValue</p>
              <div className="space-y-4 mb-8">
                {roles.map(r => (
                  <button
                    key={r.value}
                    onClick={() => setRole(r.value)}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                      role === r.value ? 'border-primary bg-primary/5 shadow-agro' : 'border-border hover:border-primary/40'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{r.emoji}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-display font-bold text-foreground">{r.label}</span>
                          {role === r.value && <CheckCircle className="w-5 h-5 text-primary" />}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{r.desc}</p>
                        <div className="flex flex-wrap gap-1">
                          {r.benefits.map(b => (
                            <span key={b} className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{b}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <Button onClick={() => setStep(2)} className="w-full bg-primary text-primary-foreground">
                Continue as {roles.find(r => r.value === role)?.label}
              </Button>
            </>
          ) : (
            <>
              <button onClick={() => setStep(1)} className="text-sm text-primary hover:underline mb-6 flex items-center gap-1">
                ← Change Role
              </button>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">Create Account</h1>
              <p className="text-muted-foreground mb-8">Joining as <span className="font-medium text-primary">{roles.find(r => r.value === role)?.label}</span></p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Full Name *</Label>
                  <Input placeholder="Ramesh Patil" value={name} onChange={e => setName(e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label>Email Address *</Label>
                  <Input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input type="tel" placeholder="+91 98765 43210" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label>Password *</Label>
                  <Input type="password" placeholder="Minimum 8 characters" value={password} onChange={e => setPassword(e.target.value)} className="mt-1.5" />
                </div>
                {(role === 'farmer' || role === 'landowner') && (
                  <div className="p-3 bg-secondary/10 border border-secondary/30 rounded-lg text-sm text-foreground/80">
                    📋 KYC verification required after registration. Admin approval within 24 hours.
                  </div>
                )}
                <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </>
          )}

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
