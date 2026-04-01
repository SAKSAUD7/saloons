import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { useSalonData } from '@/lib/useSalonData';
import { motion, AnimatePresence } from 'framer-motion';
import galleryPlaceholder from '../assets/gallery-placeholder.png';

export default function Gallery() {
  const { data } = useSalonData();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  if (!data) return null;

  const images = data.galleryImages.length > 0 
    ? data.galleryImages 
    : [galleryPlaceholder, galleryPlaceholder, galleryPlaceholder, galleryPlaceholder, galleryPlaceholder, galleryPlaceholder];

  return (
    <Layout>
      <section className="pt-32 pb-32 px-4">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-serif text-primary mb-6">Gallery</h1>
            <p className="text-muted-foreground uppercase tracking-widest text-sm">
              A glimpse into our world of beauty.
            </p>
          </motion.div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="break-inside-avoid relative group cursor-pointer overflow-hidden border border-primary/20"
                onClick={() => setSelectedImg(src)}
              >
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay" />
                <img 
                  src={src} 
                  alt="Gallery item" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImg} 
              alt="Enlarged view" 
              className="max-w-full max-h-[90vh] object-contain border border-primary/30 shadow-[0_0_50px_rgba(212,175,55,0.1)]" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
