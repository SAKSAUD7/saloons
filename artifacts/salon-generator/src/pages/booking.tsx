import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { useSalonData } from '@/lib/useSalonData';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Star, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';

const timeSlots = [
  "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", 
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
];

export default function Booking() {
  const { data } = useSalonData();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: ''
  });

  if (!data) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.whatsapp) {
      alert("Booking via WhatsApp is currently unavailable. Please call us.");
      return;
    }
    const msg = `Hi, I would like to request an appointment.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nService: ${formData.service}\nDate: ${formData.date}\nTime: ${formData.time}`;
    window.open(`https://wa.me/${data.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <Layout>
      <section className="pt-32 pb-24 px-4 bg-background min-h-[100dvh] flex items-center border-b border-primary/20">
        <div className="container mx-auto max-w-6xl mt-10">
          
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Left: Form */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 bg-[#050505] p-8 md:p-12 border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] pointer-events-none" />
              
              <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Reserve Your Time</h1>
              <p className="text-muted-foreground text-sm mb-10">Please fill out the details below. We will confirm your appointment shortly.</p>

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-primary mb-3">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-white/20 font-serif text-lg"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-primary mb-3">Phone</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-white/20 font-serif text-lg"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary mb-3">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-white/20 font-serif text-lg"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary mb-3">Service Category</label>
                  <select 
                    required
                    value={formData.service}
                    onChange={e => setFormData({...formData, service: e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif text-lg appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-background text-muted-foreground">Select a service...</option>
                    {data.services.map((s, i) => (
                      <option key={i} value={s} className="bg-background text-foreground">{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary mb-3">Preferred Date</label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif text-lg [color-scheme:dark] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary mb-4">Preferred Time</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setFormData({...formData, time})}
                        className={`py-2 text-xs font-medium uppercase tracking-widest transition-all border ${
                          formData.time === time 
                            ? 'bg-primary border-primary text-black' 
                            : 'border-white/10 text-muted-foreground hover:border-primary/50 hover:text-primary'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  <input type="hidden" required value={formData.time} />
                </div>

                <div className="pt-6">
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C9A84C] text-black py-4 uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                  >
                    <MessageCircle size={18} />
                    {data.whatsapp ? "Request via WhatsApp" : "Submit Request"}
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Right: Info */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-serif text-3xl text-foreground mb-8 border-b border-white/10 pb-4">Salon Information</h3>
                
                <div className="space-y-8 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Location</p>
                      <p className="font-serif text-lg text-foreground">{data.address || "123 Luxury Ave, Design District"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Clock size={18} />
                    </div>
                    <div className="w-full">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Hours</p>
                      <div className="font-serif text-lg text-foreground w-full max-w-[200px] space-y-1">
                        <div className="flex justify-between"><span>Mon-Sat</span><span>9AM - 8PM</span></div>
                        <div className="flex justify-between text-muted-foreground"><span>Sunday</span><span>10AM - 6PM</span></div>
                      </div>
                    </div>
                  </div>

                  {data.phone && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Phone size={18} />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Contact</p>
                        <p className="font-serif text-lg text-foreground">{data.phone}</p>
                      </div>
                    </div>
                  )}

                  {data.rating && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Star size={18} className="fill-primary" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Rating</p>
                        <p className="font-serif text-lg text-foreground">{data.rating} / 5.0 Google Reviews</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-card border border-white/5 p-6 mt-8">
                <h4 className="text-xs uppercase tracking-widest text-primary mb-4">Our Policies</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ShieldCheck size={16} className="text-primary shrink-0 mt-0.5" />
                    <span><strong>24hr Cancellation:</strong> Please notify us 24 hours prior to cancel.</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Sparkles size={16} className="text-primary shrink-0 mt-0.5" />
                    <span><strong>Consultations:</strong> All chemical services require a prior consultation.</span>
                  </li>
                </ul>
              </div>

            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
