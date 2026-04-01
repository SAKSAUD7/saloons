import React from 'react';
import { Layout } from '../components/layout/Layout';
import { useSalonData } from '@/lib/useSalonData';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Award, Sparkles, ShieldCheck, Heart, Droplets, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';
import aboutBg from '../assets/about-bg.png';
import team1 from '../assets/team-1.png';
import team2 from '../assets/team-2.png';
import team3 from '../assets/team-3.png';

export default function About() {
  const { data } = useSalonData();
  if (!data) return null;

  const defaultTeam = [
    { name: "Sarah Jenkins", role: "Master Stylist", img: team1 },
    { name: "Michael Chen", role: "Senior Barber", img: team2 },
    { name: "Elena Rodriguez", role: "Makeup Artist", img: team3 }
  ];

  const displayTeam = data.staff.length > 0 
    ? data.staff.map((s, i) => ({ ...s, img: defaultTeam[i % 3].img }))
    : defaultTeam;

  return (
    <Layout>
      {/* 1. Page Hero */}
      <section className="relative pt-40 pb-24 px-4 overflow-hidden border-b border-primary/20">
        <div className="absolute inset-0 bg-[#050505] z-0" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="container mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-primary">About Us</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF8D6] to-[#C9A84C] mb-6">Our Heritage</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg italic font-serif">
              Crafting confidence through exceptional artistry since our inception.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-6 -top-6 w-32 h-32 border-l border-t border-primary/30" />
              <div className="absolute -right-6 -bottom-6 w-32 h-32 border-r border-b border-primary/30" />
              <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-4">The Journey</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-8">Redefining the standard of modern luxury</h3>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Welcome to {data.salonName}, where luxury meets unparalleled artistry. We believe that true beauty is an authentic expression of individuality, and our singular mission is to craft looks that resonate deeply with your personal style and essence.
                </p>
                <p>
                  Established with a profound vision to revolutionize the salon experience, we harmoniously blend world-class premium products, avant-garde techniques, and a meticulously designed serene ambiance to offer you a transformative journey of self-discovery.
                </p>
                <p>
                  Every appointment is more than just a service—it is a curated experience tailored to elevate your confidence and celebrate your inherent elegance.
                </p>
              </div>
              <div className="mt-10 font-serif text-2xl text-primary italic">
                - The {data.salonName} Team
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] md:aspect-[3/4]"
            >
              <div className="absolute inset-0 border border-primary/40 translate-x-6 translate-y-6" />
              <img src={aboutBg} alt="Stylist at work" className="w-full h-full object-cover relative z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Stats Row */}
      <section className="py-16 bg-[#050505] border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "15+", label: "Years Excellence" },
              { num: "10k+", label: "Happy Clients" },
              { num: "30+", label: "Expert Artists" },
              { num: "50+", label: "Industry Awards" }
            ].map((stat, i) => (
              <div key={i} className="text-center relative">
                {i !== 0 && <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-primary/20" />}
                <div className="text-4xl md:text-5xl font-serif text-primary mb-2">{stat.num}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Our Commitment</h2>
            <h3 className="font-serif text-4xl md:text-5xl text-foreground">Why We Stand Out</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Sparkles />, title: "Premium Products", desc: "We exclusively partner with elite global brands to ensure brilliant, enduring results that nourish." },
              { icon: <Award />, title: "Expert Artistry", desc: "Our curated team comprises passionate industry veterans dedicated to mastering their evolving craft." },
              { icon: <ShieldCheck />, title: "Hygiene First", desc: "Uncompromising hospital-grade sanitation protocols ensuring your absolute safety and peace of mind." },
              { icon: <Heart />, title: "Personalized Care", desc: "Bespoke consultations tailored strictly to your unique aesthetic goals and lifestyle requirements." },
              { icon: <CheckCircle2 />, title: "Latest Techniques", desc: "Continuous global education keeps our team at the absolute forefront of contemporary trends." },
              { icon: <Droplets />, title: "Affordable Luxury", desc: "Experiencing premium indulgence shouldn't be out of reach. We offer competitive, transparent pricing." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border border-white/5 bg-card/30 hover:bg-card hover:border-primary/30 transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="font-serif text-xl text-foreground mb-3">{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Team */}
      <section className="py-24 bg-[#050505]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-4">The Masters</h2>
            <h3 className="font-serif text-4xl md:text-5xl text-foreground">Creative Directors</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {displayTeam.map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[3/4] mb-6 overflow-hidden">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 border border-primary/20 m-4 pointer-events-none group-hover:scale-95 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h4 className="font-serif text-2xl text-foreground mb-1">{member.name}</h4>
                <p className="text-primary text-xs uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-sm text-muted-foreground">With years of specialized experience, {member.name.split(' ')[0]} brings unmatched precision and creativity to every client session.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Awards */}
      <section className="py-24 bg-background border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/3">
              <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Recognition</h2>
              <h3 className="font-serif text-4xl text-foreground mb-6">Excellence Acknowledged</h3>
              <p className="text-muted-foreground text-sm">Our relentless pursuit of perfection has garnered attention from prestigious industry bodies across the nation.</p>
            </div>
            <div className="md:w-2/3 grid sm:grid-cols-2 gap-6">
              {[
                "Best Luxury Salon 2023 - Beauty Awards",
                "Excellence in Bridal Makeup - Wedding Vows",
                "Top Colorist of the Year - Hair Magazine",
                "Sustainable Salon Award 2022"
              ].map((award, i) => (
                <div key={i} className="flex items-center gap-4 p-6 border border-white/10 bg-card">
                  <Award className="text-primary shrink-0" size={24} />
                  <span className="text-sm font-serif text-foreground/90">{award}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Our Process */}
      <section className="py-24 bg-[#050505]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-4">How We Work</h2>
            <h3 className="font-serif text-4xl md:text-5xl text-foreground">The Transformation Journey</h3>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            {[
              { step: "01", title: "Consultation", desc: "In-depth analysis of your needs, features, and lifestyle." },
              { step: "02", title: "Design", desc: "Collaborative planning of the exact look, colors, and techniques." },
              { step: "03", title: "Execution", desc: "Meticulous application using premium products." },
              { step: "04", title: "Perfection", desc: "Final styling, adjustments, and aftercare advice." }
            ].map((phase, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-[#050505] border-2 border-primary/30 flex items-center justify-center font-serif text-3xl text-primary mb-6 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                  {phase.step}
                </div>
                <h4 className="font-serif text-xl text-foreground mb-3">{phase.title}</h4>
                <p className="text-sm text-muted-foreground">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="py-32 bg-background relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom,theme(colors.primary.DEFAULT)_0%,transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-serif text-5xl md:text-6xl text-foreground mb-6">Begin Your Journey</h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            Book an appointment today and let our master artists reveal your most radiant self.
          </p>
          <Link href="/booking" className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#C9A84C] text-black px-10 py-4 font-semibold uppercase tracking-widest text-sm hover:opacity-90 transition-opacity">
            Schedule Appointment <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
