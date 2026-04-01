import React from 'react';
import { Layout } from '../components/layout/Layout';
import { useSalonData } from '@/lib/useSalonData';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import heroBg from '../assets/hero-bg.png';

export default function Home() {
  const { data } = useSalonData();
  if (!data) return null;

  const hasTestimonials = data.rating && parseFloat(data.rating) >= 4 && data.testimonials.length > 0;

  return (
    <Layout>
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />
          <img src={heroBg} alt="Salon Interior" className="w-full h-full object-cover object-center" />
        </div>
        
        <div className="container mx-auto px-4 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-primary tracking-[0.3em] uppercase text-sm md:text-base mb-6">Welcome to</h2>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF8D6] to-[#C9A84C] mb-8 leading-none">
              {data.salonName}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light mb-12 max-w-2xl mx-auto italic font-serif">
              Style • Beauty • Confidence
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/booking" className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] to-[#C9A84C] text-black px-12 py-4 font-medium uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                Book Appointment
              </Link>
              {data.whatsapp && (
                <a 
                  href={`https://wa.me/${data.whatsapp}?text=Hi, I would like to know more about your services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto border border-primary/50 text-primary px-12 py-4 uppercase tracking-widest hover:bg-primary/10 transition-colors"
                >
                  Contact WhatsApp
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-card relative">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">Our Services</h2>
            <div className="w-24 h-px bg-primary/50 mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.services.slice(0, 6).map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-background p-8 border border-primary/10 hover:border-primary/40 transition-colors duration-500 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="font-serif text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">{service}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  Experience premium {service.toLowerCase()} tailored to your unique style and preferences.
                </p>
                <Link href="/booking" className="text-primary text-sm uppercase tracking-widest group-hover:tracking-[0.2em] transition-all flex items-center gap-2">
                  Book Now <span className="text-lg">&rarr;</span>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services" className="inline-block border-b border-primary text-primary uppercase tracking-widest text-sm pb-1 hover:text-foreground hover:border-foreground transition-colors">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {data.staff.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">Our Artists</h2>
              <div className="w-24 h-px bg-primary/50 mx-auto" />
            </div>
            <div className="flex flex-wrap justify-center gap-12">
              {data.staff.map((member, idx) => (
                <div key={idx} className="text-center max-w-xs">
                  <div className="w-48 h-48 mx-auto rounded-full border-2 border-primary/20 p-2 mb-6">
                    <div className="w-full h-full rounded-full bg-card/50 flex items-center justify-center border border-primary/10">
                      <span className="font-serif text-3xl text-primary/40">{member.name.charAt(0)}</span>
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl text-foreground mb-2">{member.name}</h3>
                  <p className="text-primary tracking-widest uppercase text-xs">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {hasTestimonials && (
        <section className="py-24 bg-card relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,theme(colors.primary.DEFAULT)_0%,transparent_50%)]" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="font-serif text-4xl text-primary mb-12">Client Experiences</h2>
            <div className="max-w-4xl mx-auto flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8">
              {data.testimonials.map((text, idx) => (
                <div key={idx} className="min-w-full snap-center px-4">
                  <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground/90 italic leading-relaxed">
                    "{text}"
                  </p>
                  <div className="flex justify-center gap-1 mt-8 text-primary">
                    {[1,2,3,4,5].map(star => <span key={star}>★</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-32 bg-background relative border-t border-primary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-5xl md:text-7xl text-foreground mb-8">Transform Your Look Today</h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Step into a world of elegance and leave feeling more confident than ever.
          </p>
          <Link href="/booking" className="inline-block bg-primary text-primary-foreground px-12 py-5 font-medium uppercase tracking-widest text-sm hover:scale-105 transition-transform">
            Reserve Your Experience
          </Link>
        </div>
      </section>
    </Layout>
  );
}
