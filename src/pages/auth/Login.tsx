import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserRole } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { requestOtp, verifyOtp } from '@/lib/authApi';
import { useAuth } from '@/context/AuthContext';

const roles: { value: UserRole; label: string; emoji: string; demo: string }[] = [
  { value: 'admin', label: 'Admin', emoji: '🛡️', demo: 'admin@agrovalue.com' },
  { value: 'farmer', label: 'Farmer', emoji: '🌾', demo: 'farmer@agrovalue.com' },
  { value: 'buyer', label: 'Buyer', emoji: '🛒', demo: 'buyer@agrovalue.com' },
  { value: 'landowner', label: 'Land Owner', emoji: '🏞️', demo: 'landowner@agrovalue.com' },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [role, setRole] = useState<UserRole>('buyer');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleDemoLogin = (r: typeof roles[0]) => {
    setRole(r.value);
    setEmail(r.demo);
    toast.info(`Demo email filled for ${r.label}`);
  };

  const handleSendOtp = async () => {
    if (!email) {
      toast.error('Please enter email');
      return;
    }

    try {
      setLoading(true);
      const response = await requestOtp(email);
      toast.success(response.message || 'OTP sent successfully');
      setOtpSent(true);
    } catch (error) {
      console.error(error);
      toast.error('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !otp) {
      toast.error('Please enter email and OTP');
      return;
    }

    try {
      setLoading(true);

      const user = await verifyOtp(email, otp);

      login(user);

      toast.success('Welcome back!');

      switch (role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'farmer':
          navigate('/farmer-dashboard');
          break;
        case 'buyer':
          navigate('/buyer-dashboard');
          break;
        case 'landowner':
          navigate('/landowner-dashboard');
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error('Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-10">
          <div className="w-96 h-96 rounded-full bg-secondary absolute -top-24 -left-24" />
          <div className="w-64 h-64 rounded-full bg-accent absolute bottom-12 right-12" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-harvest flex items-center justify-center">
              <Leaf className="w-6 h-6 text-soil" />
            </div>
            <span className="font-display text-2xl font-bold text-primary-foreground">AgroValue</span>
          </div>
          <h2 className="font-display text-5xl font-bold text-primary-foreground leading-tight mb-6">
            Welcome<br />Back to<br /><span className="text-secondary">AgroValue</span>
          </h2>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            India's premier rural value-addition marketplace.
            Connect, trade, and grow together.
          </p>
        </div>
        <div className="relative grid grid-cols-2 gap-4">
          {roles.map(r => (
            <button
              key={r.value}
              onClick={() => handleDemoLogin(r)}
              className="group bg-primary-foreground/10 hover:bg-gradient-harvest border border-primary-foreground/20 hover:border-secondary rounded-xl p-4 text-left transition-all"
            >
              <div className="text-2xl mb-2">{r.emoji}</div>
              <div className="text-sm font-semibold text-primary-foreground group-hover:text-soil">{r.label}</div>
              <div className="text-xs text-primary-foreground/60 group-hover:text-soil/70">Demo Login →</div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="font-display text-xl font-bold text-foreground">AgroValue</span>
          </div>

          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Sign In</h1>
          <p className="text-muted-foreground mb-8">Select your role and login with OTP</p>

          <div className="grid grid-cols-4 gap-2 mb-6">
            {roles.map(r => (
              <button
                key={r.value}
                onClick={() => setRole(r.value)}
                className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border transition-all text-xs font-medium ${
                  role === r.value
                    ? 'bg-primary text-primary-foreground border-primary shadow-agro'
                    : 'border-border text-muted-foreground hover:border-primary/50'
                }`}
              >
                <span className="text-xl">{r.emoji}</span>
                <span>{r.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label>OTP</Label>
              <div className="relative mt-1.5">
                <Input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="button" className="w-full" onClick={handleSendOtp} disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </Button>

            <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={loading || !otpSent}>
              {loading ? 'Signing in...' : 'Verify OTP & Sign In'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}