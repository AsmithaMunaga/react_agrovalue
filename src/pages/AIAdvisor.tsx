import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AI_SUGGESTIONS } from '@/data/mockData';
import { Brain, Sparkles, TrendingUp, Leaf, ChevronRight } from 'lucide-react';

const seasons = ['Kharif (Jun-Sep)', 'Rabi (Oct-Mar)', 'Zaid (Mar-Jun)'];

export default function AIAdvisor() {
  const [ph, setPh] = useState('');
  const [season, setSeason] = useState('');
  const [results, setResults] = useState<typeof AI_SUGGESTIONS[string] | null>(null);
  const [loading, setLoading] = useState(false);

  const getSuggestions = async () => {
    if (!ph || !season) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    const phNum = parseFloat(ph);
    let key = 'neutral-rabi';
    if (phNum < 6.5) key = `low-${season.includes('Kharif') ? 'kharif' : season.includes('Rabi') ? 'rabi' : 'zaid'}`;
    else if (phNum > 7.5) key = `high-${season.includes('Kharif') ? 'kharif' : season.includes('Rabi') ? 'rabi' : 'zaid'}`;
    else key = `neutral-${season.includes('Kharif') ? 'kharif' : season.includes('Rabi') ? 'rabi' : 'zaid'}`;
    const found = AI_SUGGESTIONS[key] || AI_SUGGESTIONS['neutral-rabi'];
    setResults(found);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="bg-primary py-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"><div className="w-96 h-96 rounded-full bg-secondary absolute -top-24 left-1/4" /></div>
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-harvest mx-auto flex items-center justify-center mb-4 animate-float">
              <Brain className="w-8 h-8 text-soil" />
            </div>
            <h1 className="font-display text-5xl font-bold text-primary-foreground mb-3">AI Crop Advisor</h1>
            <p className="text-primary-foreground/70 text-lg max-w-lg mx-auto">Enter your soil pH and season to get personalized crop & value-addition recommendations</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="bg-card border border-border rounded-2xl p-8 mb-8 shadow-agro">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Soil & Season Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-1">
                <Label>Soil pH Value *</Label>
                <Input type="number" step="0.1" min="0" max="14" placeholder="e.g. 6.8" value={ph} onChange={e => setPh(e.target.value)} className="mt-1.5 text-lg" />
                <p className="text-xs text-muted-foreground mt-1">Range: 0-14 (7 = neutral)</p>
              </div>
              <div className="md:col-span-2">
                <Label>Cropping Season *</Label>
                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  {seasons.map(s => (
                    <button key={s} onClick={() => setSeason(s)} className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${season === s ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:border-primary/40'}`}>
                      {s.split(' ')[0]}
                      <div className="text-xs font-normal">{s.split(' ').slice(1).join(' ')}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* pH Guide */}
            <div className="flex gap-2 mb-6 p-3 bg-muted rounded-xl text-xs">
              {[['< 6.5', 'Acidic', 'bg-accent/20 text-accent'], ['6.5-7.5', 'Neutral', 'bg-primary/20 text-primary'], ['> 7.5', 'Alkaline', 'bg-secondary/20 text-secondary']].map(([range, label, cls]) => (
                <div key={label} className={`flex-1 p-2 rounded-lg text-center ${cls}`}>
                  <div className="font-bold">{range}</div>
                  <div>{label}</div>
                </div>
              ))}
            </div>
            <Button onClick={getSuggestions} className="w-full bg-primary text-primary-foreground" size="lg" disabled={!ph || !season || loading}>
              {loading ? <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />Analyzing Soil...</span> : <><Sparkles className="w-5 h-5 mr-2" />Get AI Recommendations</>}
            </Button>
          </div>

          {results && (
            <div className="animate-fade-in-up">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-secondary" /> Top Crop Recommendations
              </h2>
              <div className="space-y-4">
                {results.map((s, i) => (
                  <div key={s.crop} className="bg-card border border-border rounded-2xl p-6 hover:shadow-agro transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-display font-bold text-primary">{i + 1}</div>
                        <div>
                          <h3 className="font-display text-xl font-bold text-foreground">{s.crop}</h3>
                          <p className="text-sm text-muted-foreground">{s.season} Season</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary font-display">{s.suitability}%</div>
                        <div className="text-xs text-muted-foreground">Suitability</div>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mb-4">
                      <div className="bg-gradient-primary rounded-full h-2 transition-all" style={{ width: `${s.suitability}%` }} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <p className="text-xs text-muted-foreground uppercase font-medium mb-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" />Value-Added Products</p>
                        <div className="flex flex-wrap gap-2">
                          {s.valueProducts.map(p => <Badge key={p} className="bg-secondary/10 text-secondary border-secondary/20">{p}</Badge>)}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-medium mb-2">Market Price</p>
                        <Badge className="bg-primary/10 text-primary border-primary/20">₹{s.priceRange.min}-{s.priceRange.max}/kg</Badge>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-muted/50 rounded-lg flex items-start gap-2">
                      <Leaf className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-xs text-foreground/70">{s.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
