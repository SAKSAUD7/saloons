import React from 'react';
import { Layout } from '../components/layout/Layout';
import { useSalonData } from '@/lib/useSalonData';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function Services() {
  const { data } = useSalonData();
  if (!data) return null;

  return (
    <Layout>
      <section className="pt-32 pb-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
          >
            <h1 className="text-5xl md:text-7xl font-serif text-primary mb-6">Menu of Services</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto uppercase tracking-widest text-sm">
              Curated experiences tailored to elevate your natural beauty.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {data.services.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 2) * 0.1 }}
                className="group relative flex flex-col justify-between p-8 border border-primary/20 bg-card hover:bg-background transition-all duration-500"
              >
                <div>
                  <div className="flex justify-between items-baseline mb-4 border-b border-primary/10 pb-4">
                    <h3 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors">{service}</h3>
                    <span className="text-primary font-serif italic text-lg">Inquire</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                    A personalized {service.toLowerCase()} session designed specifically for your aesthetic goals. Includes consultation and premium product application.
                  </p>
                </div>
                <Link href="/booking" className="text-xs uppercase tracking-[0.2em] text-primary hover:text-foreground transition-colors self-start border border-primary/30 px-6 py-2 group-hover:bg-primary group-hover:text-primary-foreground">
                  Book Service
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 text-center border-t border-primary/20 pt-16">
            <h3 className="font-serif text-3xl text-foreground mb-6">Need a custom consultation?</h3>
            <Link href="/contact" className="inline-block border-b border-primary text-primary uppercase tracking-widest text-sm pb-1 hover:text-foreground hover:border-foreground transition-colors">
              Contact Our Experts
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
