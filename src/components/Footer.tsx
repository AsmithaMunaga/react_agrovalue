import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-soil text-primary-foreground/80">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-harvest flex items-center justify-center">
                <Leaf className="w-5 h-5 text-soil" />
              </div>
              <div>
                <span className="font-display text-lg font-bold text-primary-foreground">AgroValue</span>
                <p className="text-[10px] text-primary-foreground/50">Rural Marketplace</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Empowering rural entrepreneurs to add value to their crops and reach global markets.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <button key={i} className="w-8 h-8 rounded-full bg-primary/20 hover:bg-secondary/80 hover:text-soil flex items-center justify-center transition-all">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Marketplace</h4>
            <ul className="space-y-2 text-sm">
              {['Browse Products', 'Farm Hotels', 'Transport Services', 'Rent Land', 'AI Crop Advisor'].map(item => (
                <li key={item}><a href="#" className="hover:text-secondary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">For Farmers</h4>
            <ul className="space-y-2 text-sm">
              {['Register as Farmer', 'Add Products', 'Manage Orders', 'Earnings Dashboard', 'KYC Verification'].map(item => (
                <li key={item}><a href="#" className="hover:text-secondary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-secondary" /> support@agrovalue.in</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-secondary" /> 1800-AGRO-HELP</li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-secondary mt-0.5" /> Mumbai, Maharashtra, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
          <p>© 2024 AgroValue Platform. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-secondary">Privacy Policy</a>
            <a href="#" className="hover:text-secondary">Terms of Service</a>
            <a href="#" className="hover:text-secondary">Grievance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
