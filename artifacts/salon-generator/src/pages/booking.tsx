import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { useSalonData } from '@/lib/useSalonData';
import { motion } from 'framer-motion';

export default function Booking() {
  const { data } = useSalonData();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: ''
  });

  if (!data) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.whatsapp) {
      alert("Booking is currently unavailable as no WhatsApp number is configured.");
      return;
    }
    const msg = `Hi, I want to book a ${formData.service} at ${data.salonName}.\nName: ${formData.name}\nPhone: ${formData.phone}\nPreferred Date: ${formData.date}`;
    window.open(`https://wa.me/${data.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <Layout>
      <section className="pt-32 pb-32 px-4 relative flex-grow flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.05)_0%,transparent_50%)]" />
        
        <div className="container mx-auto max-w-2xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-serif text-primary mb-6">Reserve an Appointment</h1>
            <p className="text-muted-foreground">Select your desired service and preferred time.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card/50 backdrop-blur border border-primary/20 p-8 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary mb-3">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b border-primary/30 pb-2 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50 font-serif text-xl"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary mb-3">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-transparent border-b border-primary/30 pb-2 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50 font-serif text-xl"
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-primary mb-3">Service</label>
                <select 
                  required
                  value={formData.service}
                  onChange={e => setFormData({...formData, service: e.target.value})}
                  className="w-full bg-transparent border-b border-primary/30 pb-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif text-xl appearance-none"
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
                  className="w-full bg-transparent border-b border-primary/30 pb-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif text-xl [color-scheme:dark]"
                />
              </div>

              <div className="pt-8">
                <button 
                  type="submit"
                  disabled={!data.whatsapp}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C9A84C] text-black py-5 uppercase tracking-widest font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                >
                  {data.whatsapp ? "Confirm via WhatsApp" : "Booking Unavailable"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
