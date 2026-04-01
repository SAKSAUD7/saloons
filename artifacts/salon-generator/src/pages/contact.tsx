import React from 'react';
import { Layout } from '../components/layout/Layout';
import { useSalonData } from '@/lib/useSalonData';
import { motion } from 'framer-motion';

export default function Contact() {
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
            <h1 className="text-5xl md:text-7xl font-serif text-primary mb-6">Get in Touch</h1>
            <div className="w-24 h-px bg-primary/50 mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-serif text-foreground mb-8">Salon Details</h2>
              
              <div className="space-y-12">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Location</h3>
                  <p className="font-serif text-2xl text-foreground/90">{data.address || "123 Luxury Ave, Design District"}</p>
                </div>
                
                {data.phone && (
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Phone</h3>
                    <p className="font-serif text-2xl text-foreground/90">{data.phone}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Hours</h3>
                  <div className="font-serif text-xl text-foreground/90 space-y-2">
                    <p className="flex justify-between max-w-xs"><span>Mon - Fri</span> <span>9:00 AM - 8:00 PM</span></p>
                    <p className="flex justify-between max-w-xs"><span>Saturday</span> <span>10:00 AM - 7:00 PM</span></p>
                    <p className="flex justify-between max-w-xs text-muted-foreground"><span>Sunday</span> <span>Closed</span></p>
                  </div>
                </div>

                {data.whatsapp && (
                  <div className="pt-8">
                     <a 
                      href={`https://wa.me/${data.whatsapp}?text=Hi, I have an inquiry.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-primary text-primary-foreground px-8 py-3 uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors"
                    >
                      Message on WhatsApp
                    </a>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="h-[500px] border border-primary/20 bg-card p-2 relative"
            >
              {data.mapLink ? (
                <iframe 
                  src={data.mapLink} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(80%) contrast(150%)' }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              ) : (
                <div className="w-full h-full bg-background flex items-center justify-center text-muted-foreground text-sm uppercase tracking-widest border border-primary/10">
                  Map View Unavailable
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
