import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { useSalonData } from '@/lib/useSalonData';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { ChevronDown, Clock, Tag, ArrowRight } from 'lucide-react';
import serviceHair from '../assets/service-hair.png';
import serviceSkin from '../assets/service-skin.png';
import serviceBridal from '../assets/service-bridal.png';

const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'hair', name: 'Hair Services' },
  { id: 'skin', name: 'Skin & Face' },
  { id: 'makeup', name: 'Makeup & Bridal' },
  { id: 'mens', name: "Men's Grooming" }
];

const faqs = [
  { q: "Do I need to book an appointment in advance?", a: "While we do accept walk-ins based on availability, we highly recommend booking in advance to secure your preferred time and stylist." },
  { q: "What brands of products do you use?", a: "We exclusively use premium international brands such as L'Oreal Professionnel, Schwarzkopf, Kerastase, Olaplex, and M.A.C Cosmetics." },
  { q: "Do you offer bridal trial sessions?", a: "Yes, we offer comprehensive bridal trial sessions. This allows us to perfectly design your look before the big day." },
  { q: "Is there a cancellation fee?", a: "We request a 24-hour notice for any cancellations. Late cancellations may be subject to a nominal fee." },
  { q: "Do you provide consultations?", a: "Absolutely. Every service begins with a complimentary consultation to understand your needs, hair/skin type, and lifestyle." }
];

export default function Services() {
  const { data } = useSalonData();
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!data) return null;

  // Enrich default services with category, price, duration, and image
  const enrichedServices = data.services.map((service, idx) => {
    let cat = 'hair';
    let img = serviceHair;
    let price = "₹999";
    let duration = "45 mins";

    const s = service.toLowerCase();
    if (s.includes('facial') || s.includes('skin') || s.includes('cleanup')) { cat = 'skin'; img = serviceSkin; price = "₹1,499"; duration = "60 mins"; }
    else if (s.includes('bridal') || s.includes('makeup') || s.includes('party')) { cat = 'makeup'; img = serviceBridal; price = "₹4,999"; duration = "120 mins"; }
    else if (s.includes('beard') || s.includes('men')) { cat = 'mens'; price = "₹499"; duration = "30 mins"; }
    else if (s.includes('spa') || s.includes('keratin') || s.includes('color')) { price = "₹2,999"; duration = "90 mins"; }

    return { name: service, category: cat, price, duration, img, description: `Experience our premium ${service.toLowerCase()} tailored to your unique style. Includes consultation and luxury product application.` };
  });

  const filteredServices = activeCategory === 'all' ? enrichedServices : enrichedServices.filter(s => s.category === activeCategory);

  return (
    <Layout>
      {/* 1. Hero */}
      <section className="relative pt-40 pb-24 px-4 overflow-hidden border-b border-primary/20">
        <div className="absolute inset-0 bg-[#050505] z-0" />
        <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="container mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-primary">Services</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF8D6] to-[#C9A84C] mb-6">Menu of Services</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg italic font-serif">
              Curated experiences tailored to elevate your natural beauty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Categories & Services */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 text-xs uppercase tracking-widest transition-all ${
                  activeCategory === cat.id 
                    ? 'bg-primary text-black font-semibold' 
                    : 'border border-primary/30 text-primary hover:border-primary'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, idx) => (
                <motion.div 
                  key={service.name + idx}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group flex flex-col sm:flex-row bg-[#050505] border border-white/5 hover:border-primary/40 transition-colors overflow-hidden"
                >
                  <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                    <img src={service.img} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  <div className="sm:w-3/5 p-6 sm:p-8 flex flex-col justify-between relative">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent pointer-events-none" />
                    <div>
                      <h3 className="font-serif text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">{service.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                        {service.description}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6 uppercase tracking-widest">
                        <span className="flex items-center gap-1"><Tag size={14} className="text-primary" /> Starts {service.price}</span>
                        <span className="flex items-center gap-1"><Clock size={14} className="text-primary" /> {service.duration}</span>
                      </div>
                      <Link href="/booking" className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-widest border-b border-primary/30 hover:border-primary pb-1 transition-all group-hover:pl-2">
                        Book Session <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredServices.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No services found in this category.
            </div>
          )}
        </div>
      </section>

      {/* 3. Process Section */}
      <section className="py-24 bg-[#050505] border-y border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-4">The Experience</h2>
          <h3 className="font-serif text-4xl text-foreground mb-16">How It Works</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
            <div className="hidden md:block absolute top-6 left-0 w-full h-px bg-primary/20" />
            {[
              { step: "1", title: "Book", desc: "Schedule your preferred time online or via WhatsApp." },
              { step: "2", title: "Consult", desc: "Meet your stylist to discuss your aesthetic goals." },
              { step: "3", title: "Experience", desc: "Relax and enjoy your premium tailored service." },
              { step: "4", title: "Shine", desc: "Step out with confidence and aftercare advice." }
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#050505] border border-primary flex items-center justify-center text-primary font-serif text-xl mb-6">
                  {item.step}
                </div>
                <h4 className="font-serif text-xl text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQs */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Inquiries</h2>
            <h3 className="font-serif text-4xl text-foreground">Common Questions</h3>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/10 bg-card overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-serif text-xl text-foreground/90">{faq.q}</span>
                  <ChevronDown className={`text-primary transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-muted-foreground"
                    >
                      <p>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Bottom */}
      <section className="py-24 bg-[#050505] border-t border-primary/20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Need a custom consultation?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            Every client is unique. If you don't see exactly what you're looking for, reach out to us. We tailor our services to your specific needs.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="/contact" className="border border-primary text-primary px-8 py-3 uppercase tracking-widest text-sm hover:bg-primary hover:text-black transition-colors">
              Contact Our Experts
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
