import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MOCK_HOTELS, MOCK_CHEFS } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Users, ChefHat, Bed } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Hotels() {
  const [bookingModal, setBookingModal] = useState<string | null>(null);
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('');
  const [roomType, setRoomType] = useState('');

  const handleBook = () => {
    toast.success('Booking request sent! The farmer will confirm within 2 hours.');
    setBookingModal(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl font-bold text-primary-foreground mb-2">Farm Stay Hotels</h1>
          <p className="text-primary-foreground/70">Experience authentic rural hospitality</p>
        </div>
      </div>
      <main className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4">
          {MOCK_HOTELS.map(hotel => (
            <div key={hotel.id} className="bg-card border border-border rounded-2xl overflow-hidden mb-8 shadow-agro hover:shadow-agro-lg transition-shadow">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Images */}
                <div className="lg:col-span-1 grid grid-rows-2 gap-1 h-64 lg:h-auto">
                  <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover" />
                  <div className="grid grid-cols-2 gap-1">
                    <img src={hotel.images[1]} alt="" className="w-full h-full object-cover" />
                    <img src={hotel.images[2]} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
                {/* Info */}
                <div className="lg:col-span-2 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-foreground">{hotel.name}</h2>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1"><MapPin className="w-3.5 h-3.5" />{hotel.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-secondary text-secondary" /><span className="font-bold">{hotel.rating}</span></div>
                      <div className="font-display text-2xl font-bold text-primary mt-1">₹{hotel.pricePerNight.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">per night</div>
                    </div>
                  </div>
                  <p className="text-foreground/70 text-sm mb-4">{hotel.description}</p>
                  {/* Room Types */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1"><Bed className="w-4 h-4 text-primary" />Room Types</p>
                    <div className="flex flex-wrap gap-2">
                      {hotel.roomTypes.map(r => (
                        <div key={r.id} className={`px-3 py-1.5 rounded-full text-xs border ${r.available ? 'border-primary/30 bg-primary/5 text-primary' : 'border-border bg-muted text-muted-foreground line-through'}`}>
                          {r.name} · ₹{r.price}/night · {r.capacity} guests
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {hotel.hasChef && <Badge className="bg-secondary/10 text-secondary border-secondary/20"><ChefHat className="w-3 h-3 mr-1" />Chef Available</Badge>}
                    <Badge className="bg-muted text-muted-foreground"><Users className="w-3 h-3 mr-1" />{hotel.tableCapacity} table seats</Badge>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button className="bg-primary text-primary-foreground" onClick={() => setBookingModal(hotel.id)}>Book Now</Button>
                    <Button variant="outline" className="border-primary text-primary">View All Images</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Chefs */}
          <h2 className="font-display text-2xl font-bold text-foreground mt-12 mb-6 flex items-center gap-2"><ChefHat className="w-6 h-6 text-primary" />Available Farm Chefs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_CHEFS.map(chef => (
              <div key={chef.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-agro transition-shadow">
                <img src={chef.image} alt={chef.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-lg font-bold text-foreground">{chef.name}</h3>
                    <div className="flex items-center gap-1 text-sm"><Star className="w-4 h-4 fill-secondary text-secondary" />{chef.rating}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{chef.experience} experience</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {chef.specialCuisines.map(c => <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-foreground">₹{chef.pricePerHour}/hour</span>
                    <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => toast.success('Chef booking request sent!')}>Book Chef</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      {bookingModal && (
        <div className="fixed inset-0 bg-soil/60 z-50 flex items-center justify-center p-4" onClick={() => setBookingModal(null)}>
          <div className="bg-card rounded-2xl p-6 w-full max-w-md shadow-agro-lg" onClick={e => e.stopPropagation()}>
            <h3 className="font-display text-xl font-bold text-foreground mb-4">Book Your Stay</h3>
            <div className="space-y-4">
              <div><Label>Check-in Date</Label><input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full mt-1.5 px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" /></div>
              <div><Label>Room Type</Label><select value={roomType} onChange={e => setRoomType(e.target.value)} className="w-full mt-1.5 px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none">{MOCK_HOTELS[0].roomTypes.map(r => <option key={r.id}>{r.name}</option>)}</select></div>
              <div><Label>Guests</Label><input type="number" min={1} max={10} value={guests} onChange={e => setGuests(e.target.value)} className="w-full mt-1.5 px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none" /></div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setBookingModal(null)}>Cancel</Button>
                <Button className="flex-1 bg-primary text-primary-foreground" onClick={handleBook}>Confirm Booking</Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
