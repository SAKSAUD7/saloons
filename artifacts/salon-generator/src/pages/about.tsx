import React from 'react';
import { Layout } from '../components/layout/Layout';
import { useSalonData } from '@/lib/useSalonData';
import { motion } from 'framer-motion';
import aboutBg from '../assets/about-bg.png';

export default function About() {
  const { data } = useSalonData();
  if (!data) return null;

  return (
    <Layout>
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-serif text-primary mb-6">Our Story</h1>
            <div className="w-24 h-px bg-primary/50 mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-serif text-foreground mb-6">The {data.salonName} Experience</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Welcome to {data.salonName}, where luxury meets artistry. We believe that beauty is an expression of individuality, and our mission is to craft looks that resonate with your personal style.
                </p>
                <p>
                  Established with a vision to redefine the salon experience, we combine premium products, cutting-edge techniques, and a serene ambiance to offer you an unparalleled journey of transformation.
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative aspect-[4/5] md:aspect-square"
            >
              <div className="absolute inset-0 border border-primary/30 translate-x-4 translate-y-4" />
              <img src={aboutBg} alt="Stylist at work" className="w-full h-full object-cover relative z-10" />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-32 text-center">
            {[
              { title: "Premium Products", desc: "We use only the finest luxury brands to ensure long-lasting, brilliant results." },
              { title: "Expert Artistry", desc: "Our team comprises industry veterans dedicated to mastering their craft." },
              { title: "Serene Ambiance", desc: "Escape the ordinary in our meticulously designed, tranquil studio." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 border border-primary/10 bg-card/30 backdrop-blur"
              >
                <h3 className="font-serif text-2xl text-primary mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </Layout>
  );
}
