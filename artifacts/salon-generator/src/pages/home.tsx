import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { useSalonData } from '@/lib/useSalonData';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { ChevronRight, Star, Quote, Scissors, Sparkles, Droplets, Heart, ShieldCheck, Award, Phone } from 'lucide-react';
import heroBg from '../assets/hero-bg.png';
import aboutBg from '../assets/about-bg.png';
import serviceHair from '../assets/service-hair.png';
import serviceSkin from '../assets/service-skin.png';
import gallery1 from '../assets/gallery-1.png';
import gallery2 from '../assets/gallery-2.png';
import gallery3 from '../assets/gallery-3.png';
import gallery4 from '../assets/gallery-4.png';
import gallery5 from '../assets/gallery-5.png';
import gallery6 from '../assets/gallery-6.png';

const Counter = ({ from, to }: { from: number, to: number }) => {
  const [count, setCount] = useState(from);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = from;
      const duration = 2000;
      const step = (to - from) / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= to) {
          setCount(to);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, from, to]);

  return <span ref={ref}>{count}</span>;
};

export default function Home() {
  const { data } = useSalonData();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  if (!data) return null;

  const hasTestimonials = data.rating && parseFloat(data.rating) >= 4 && data.testimonials.length > 0;
  const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % data.testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + data.testimonials.length) % data.testimonials.length);

  return (
    <Layout>
      {/* 1. Hero */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <img src={heroBg} alt="Salon Interior" className="w-full h-full object-cover object-center scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-20 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {data.rating && (
              <div className="mb-8 inline-flex items-center gap-2 border border-primary/30 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full">
                <Star size={14} className="text-primary fill-primary" />
                <span className="text-xs uppercase tracking-widest text-primary/90">{data.rating} Rating on Google</span>
              </div>
            )}
            
            <h2 className="text-primary tracking-[0.4em] uppercase text-xs md:text-sm mb-6 font-medium">Welcome to</h2>
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF8D6] to-[#C9A84C] mb-6 leading-none py-2">
              {data.salonName}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light mb-12 max-w-2xl mx-auto italic font-serif">
              Style • Beauty • Confidence
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-md mx-auto">
              <Link href="/booking" className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C9A84C] text-black px-8 py-4 font-semibold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                Book Appointment
              </Link>
              {data.whatsapp && (
                <a 
                  href={`https://wa.me/${data.whatsapp}?text=Hi, I would like to know more about your services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-primary/50 text-primary px-8 py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-black transition-colors"
                >
                  WhatsApp Us
                </a>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-primary/50 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </section>

      {/* 2. Stats Bar */}
      <section className="bg-[#050505] border-y border-primary/20 py-12 relative z-20 -mt-2">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-primary/10">
            <div className="text-center">
              <div className="font-serif text-4xl md:text-5xl text-primary mb-2"><Counter from={0} to={500} />+</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl md:text-5xl text-primary mb-2"><Counter from={0} to={10} />+</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl md:text-5xl text-primary mb-2"><Counter from={0} to={50} />+</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Services</div>
            </div>
            <div className="text-center border-r-0">
              <div className="font-serif text-4xl md:text-5xl text-primary mb-2">{data.rating || "4.9"}★</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Preview */}
      <section className="py-24 md:py-32 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-4">What We Do</h2>
              <h3 className="font-serif text-4xl md:text-5xl text-foreground">Our Signature Services</h3>
            </div>
            <Link href="/services" className="text-sm uppercase tracking-widest text-primary border-b border-primary pb-1 hover:text-foreground transition-colors flex items-center gap-2">
              View All Menu <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.services.slice(0, 6).map((service, idx) => {
              const bgImg = idx % 2 === 0 ? serviceHair : serviceSkin;
              const icons = [<Scissors />, <Sparkles />, <Droplets />];
              const Icon = icons[idx % 3];
              
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative h-[400px] overflow-hidden border border-white/10 hover:border-primary/50 transition-colors duration-500"
                >
                  <img src={bgImg} alt={service} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-30 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="w-12 h-12 bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center text-primary mb-6 group-hover:-translate-y-2 transition-transform duration-500">
                      {Icon}
                    </div>
                    <h4 className="font-serif text-2xl text-white mb-2 group-hover:text-primary transition-colors">{service}</h4>
                    <p className="text-sm text-white/70 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                      Experience luxury {service.toLowerCase()} tailored to you.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-primary">Starting ₹499</span>
                      <Link href="/booking" className="w-8 h-8 rounded-full border border-primary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Featured Treatment */}
      <section className="bg-card py-24 relative overflow-hidden border-y border-primary/10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] md:aspect-[3/4]"
            >
              <div className="absolute inset-0 border border-primary/30 translate-x-4 -translate-y-4" />
              <img src={gallery2} alt="Bridal Treatment" className="w-full h-full object-cover relative z-10" />
              <div className="absolute -bottom-6 -right-6 bg-background p-6 border border-primary/20 z-20 max-w-xs shadow-2xl">
                <p className="font-serif text-xl italic text-primary mb-2">"The ultimate luxury experience"</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">- Vogue Beauty</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Premium Service</h2>
              <h3 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Signature Bridal Transformation</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Your special day deserves nothing less than perfection. Our signature bridal package is a comprehensive journey of beauty, designed to make you radiate confidence and elegance.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Pre-wedding skincare consultation",
                  "HD Airbrush makeup application",
                  "Custom hair styling & draping",
                  "Premium international products"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                    <Sparkles size={16} className="text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/booking" className="inline-block border border-primary text-primary px-8 py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-black transition-colors">
                Book Consultation
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. About Teaser */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Why Choose Us?</h2>
              <h3 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Elevating the Standard of Beauty</h3>
              <p className="text-muted-foreground mb-8">
                At {data.salonName}, we blend artistry with luxury. Our commitment to excellence is reflected in every snip, every stroke, and every detail of our studio.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <ShieldCheck className="text-primary mb-4" size={28} />
                  <h4 className="font-serif text-xl mb-2">Hygiene First</h4>
                  <p className="text-xs text-muted-foreground">Strict sanitation protocols for your safety.</p>
                </div>
                <div>
                  <Heart className="text-primary mb-4" size={28} />
                  <h4 className="font-serif text-xl mb-2">Personal Care</h4>
                  <p className="text-xs text-muted-foreground">Tailored advice for your unique needs.</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 relative h-[600px]">
              <img src={aboutBg} alt="Salon Working" className="w-full h-full object-cover rounded-tr-[100px] rounded-bl-[100px]" />
              <div className="absolute inset-0 border border-primary/30 rounded-tr-[100px] rounded-bl-[100px] -translate-x-4 -translate-y-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Gallery Masonry */}
      <section className="py-24 bg-[#050505] border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Portfolio</h2>
            <h3 className="font-serif text-4xl md:text-5xl text-foreground">Our Masterpieces</h3>
          </div>
          
          <div className="columns-2 md:columns-3 gap-4 space-y-4 mb-12">
            {galleryImages.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group overflow-hidden break-inside-avoid"
              >
                <img src={img} alt={`Gallery ${i}`} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <span className="text-white text-xs uppercase tracking-widest border-b border-primary pb-1">View Detail</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/gallery" className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-3 uppercase tracking-widest text-sm hover:bg-primary hover:text-black transition-colors">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Staff Section */}
      {data.staff.length > 0 && (
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-4">The Experts</h2>
              <h3 className="font-serif text-4xl md:text-5xl text-foreground">Meet Our Artisans</h3>
            </div>
            
            <div className="flex flex-wrap justify-center gap-12 lg:gap-24">
              {data.staff.map((member, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-56 h-56 mx-auto rounded-full border border-primary/20 p-2 mb-6 group-hover:border-primary transition-colors duration-500 relative">
                    <div className="absolute inset-0 rounded-full border border-primary/0 group-hover:border-primary/50 scale-[1.05] transition-all duration-500" />
                    <div className="w-full h-full rounded-full bg-card overflow-hidden">
                      {/* Using initials if no image provided in staff array (since we don't have direct image links in staff type yet) */}
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-card to-black text-primary/30 font-serif text-5xl">
                        {member.name.charAt(0)}
                      </div>
                    </div>
                  </div>
                  <h4 className="font-serif text-2xl text-foreground mb-1">{member.name}</h4>
                  <p className="text-primary tracking-widest uppercase text-xs">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Testimonials */}
      {hasTestimonials && (
        <section className="py-32 bg-[#050505] border-y border-white/5 relative">
          <Quote className="absolute top-10 left-10 text-primary/5 w-64 h-64 -rotate-12 pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-16">Client Love</h2>
              
              <div className="min-h-[200px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex justify-center gap-1 mb-8">
                      {[1,2,3,4,5].map(star => <Star key={star} size={16} className="text-primary fill-primary" />)}
                    </div>
                    <p className="font-serif text-3xl md:text-5xl text-foreground/90 italic leading-tight mb-8">
                      "{data.testimonials[currentTestimonial]}"
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-serif">
                        C
                      </div>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">Verified Client</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-center gap-4 mt-12">
                <button onClick={prevTestimonial} className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors"><ChevronRight size={18} className="rotate-180" /></button>
                <button onClick={nextTestimonial} className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors"><ChevronRight size={18} /></button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 9. Brands Strip */}
      <section className="py-12 bg-background border-b border-primary/10 overflow-hidden">
        <div className="flex w-max animate-[scroll_30s_linear_infinite]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 px-8">
              {['LOREAL', 'SCHWARZKOPF', 'WELLA', 'KERASTASE', 'O.P.I', 'MAC', 'OLAPLEX'].map((brand, j) => (
                <div key={j} className="flex items-center gap-16">
                  <span className="font-serif text-2xl text-primary/40 uppercase tracking-widest">{brand}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* 10. CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/80 z-10" />
          <img src={heroBg} alt="Salon" className="w-full h-full object-cover scale-110" />
        </div>
        <div className="container mx-auto px-4 relative z-20 text-center">
          <Award className="mx-auto text-primary w-16 h-16 mb-8 opacity-80" />
          <h2 className="font-serif text-5xl md:text-7xl text-white mb-6">Ready for Your Transformation?</h2>
          <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto">
            Step into a world of elegance and leave feeling more confident than ever. Experience the finest beauty services in the city.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/booking" className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] to-[#C9A84C] text-black px-12 py-5 font-semibold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-[0_0_40px_rgba(212,175,55,0.4)]">
              Reserve Your Experience
            </Link>
            {data.phone && (
              <a href={`tel:${data.phone}`} className="w-full sm:w-auto text-white text-sm uppercase tracking-widest hover:text-primary transition-colors flex items-center justify-center gap-2">
                <Phone size={16} /> Call {data.phone}
              </a>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
