import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MOCK_LANDS } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Droplets, FlaskConical } from 'lucide-react';
import { toast } from 'sonner';

export default function Land() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl font-bold text-primary-foreground mb-2">Rent Agricultural Land</h1>
          <p className="text-primary-foreground/70">Access fertile land by season from verified land owners</p>
        </div>
      </div>
      <main className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {MOCK_LANDS.map(land => (
              <div key={land.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-agro-lg transition-shadow">
                <div className="grid grid-cols-2 h-48">
                  {land.images.map((img, i) => (
                    <img key={i} src={img} alt="" className="w-full h-full object-cover" />
                  ))}
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground">{land.ownerName}'s Land</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="w-3.5 h-3.5" />{land.location}</div>
                    </div>
                    <Badge className={land.status === 'available' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted text-muted-foreground'}>
                      {land.status === 'available' ? '✓ Available' : 'Rented'}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground/70 mb-4">{land.description}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { icon: MapPin, label: 'Area', value: `${land.areaInAcres} Acres` },
                      { icon: FlaskConical, label: 'Soil Type', value: land.soilType },
                      { icon: FlaskConical, label: 'pH Value', value: land.phValue.toString() },
                      { icon: Droplets, label: 'Water', value: land.waterAvailability ? 'Borewell + Canal' : 'Rain-fed' },
                    ].map(info => (
                      <div key={info.label} className="bg-muted/50 rounded-lg p-2.5 flex items-center gap-2">
                        <info.icon className="w-4 h-4 text-primary shrink-0" />
                        <div>
                          <div className="text-xs text-muted-foreground">{info.label}</div>
                          <div className="text-sm font-medium text-foreground">{info.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-display text-2xl font-bold text-primary">₹{land.pricePerSeason.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground ml-1">/season</span>
                    </div>
                    <Button className="bg-primary text-primary-foreground" onClick={() => toast.success('Rental request sent to land owner!')}>Request Rental</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
