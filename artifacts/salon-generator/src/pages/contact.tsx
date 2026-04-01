import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { useSalonData } from '@/lib/useSalonData';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail, Instagram, Facebook, Youtube, Send } from 'lucide-react';
import ctaBg from '../assets/cta-bg.png';

export default function Contact() {
  const { data } = useSalonData();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (!data) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Cosmetic form submit
    alert("Thank you for your message. We will get back to you shortly.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Layout>
      {/* 1. Hero */}
      <section className="relative pt-40 pb-24 px-4 overflow-hidden border-b border-primary/20">
        <div className="absolute inset-0 bg-[#050505] z-0" />
        <img src={ctaBg} alt="Salon" className="absolute inset-0 w-full h-full object-cover opacity-10 filter grayscale pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505] z-0" />
        
        <div className="container mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-6">
              <span className="text-primary">Contact</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">Connect With Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg italic font-serif">
              We are here to assist you with any inquiries or bespoke requests.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Info Cards */}
      <section className="py-12 bg-background relative -mt-12 z-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <MapPin size={24}/>, title: "Location", lines: [data.address || "123 Luxury Ave", "Design District, NY 10001"] },
              { icon: <Phone size={24}/>, title: "Contact", lines: [data.phone || "+1 234 567 8900", "hello@latelier.com"] },
              { icon: <Clock size={24}/>, title: "Hours", lines: ["Mon - Sat: 9AM - 8PM", "Sun: 10AM - 6PM"] }
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="bg-[#050505] border border-white/10 p-8 text-center hover:border-primary/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto flex items-center justify-center text-primary mb-6">
                  {card.icon}
                </div>
                <h3 className="text-xs uppercase tracking-widest text-primary mb-4">{card.title}</h3>
                {card.lines.map((line, j) => (
                  <p key={j} className="font-serif text-lg text-foreground/90">{line}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Form & Map Layout */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left: Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl text-foreground mb-2">Send an Inquiry</h2>
              <p className="text-muted-foreground text-sm mb-10">Fill out the form below and our concierge will reach out to you.</p>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary mb-3">Full Name</label>
                  <input 
                    type="text" required value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-foreground focus:outline-none focus:border-primary transition-colors font-serif text-xl placeholder:text-white/10"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary mb-3">Email Address</label>
                  <input 
                    type="email" required value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-foreground focus:outline-none focus:border-primary transition-colors font-serif text-xl placeholder:text-white/10"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary mb-3">Message</label>
                  <textarea 
                    required rows={4} value={formData.message} onChange={e=>setFormData({...formData, message:e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-foreground focus:outline-none focus:border-primary transition-colors font-serif text-xl placeholder:text-white/10 resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button type="submit" className="flex items-center justify-center gap-3 bg-transparent border border-primary text-primary w-full py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-black transition-colors">
                  <Send size={16} /> Send Message
                </button>
              </form>
            </motion.div>

            {/* Right: Map & Socials */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col h-full gap-8"
            >
              <div className="flex-grow min-h-[400px] border border-white/10 bg-card relative group p-2">
                {data.mapLink ? (
                  <>
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 mix-blend-overlay" />
                    <iframe 
                      src={data.mapLink} 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0, filter: 'invert(100%) hue-rotate(180deg) grayscale(80%) contrast(120%)' }} 
                      allowFullScreen 
                      loading="lazy" 
                      className="w-full h-full relative z-0"
                    ></iframe>
                  </>
                ) : (
                  <div className="w-full h-full bg-[#050505] flex flex-col items-center justify-center text-muted-foreground border border-white/5">
                    <MapPin size={48} className="mb-4 opacity-20" />
                    <span className="text-xs uppercase tracking-widest">Map View Unavailable</span>
                    <span className="font-serif text-xl text-foreground mt-4 text-center px-6">{data.address}</span>
                  </div>
                )}
              </div>

              {/* 4. Social Links */}
              <div className="bg-[#050505] border border-white/10 p-8 flex items-center justify-between">
                <span className="font-serif text-2xl text-foreground">Follow Our Socials</span>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors"><Instagram size={20} /></a>
                  <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors"><Facebook size={20} /></a>
                  <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors"><Youtube size={20} /></a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. Bottom CTA */}
      {data.whatsapp && (
        <section className="py-24 bg-[#050505] border-t border-primary/20 text-center">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-4xl text-foreground mb-6">Need immediate assistance?</h2>
            <p className="text-muted-foreground mb-8">Our concierge team is available on WhatsApp.</p>
            <a 
              href={`https://wa.me/${data.whatsapp}?text=Hi, I have an inquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3 uppercase tracking-widest font-semibold text-sm hover:bg-[#20b858] transition-colors rounded-full"
            >
              <MessageCircle size={20} /> Chat on WhatsApp
            </a>
          </div>
        </section>
      )}
    </Layout>
  );
}
