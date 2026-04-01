import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { useSalonData } from '@/lib/useSalonData';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { X, Maximize2, MoveRight } from 'lucide-react';
import galleryPlaceholder from '../assets/gallery-placeholder.png';
import gallery1 from '../assets/gallery-1.png';
import gallery2 from '../assets/gallery-2.png';
import gallery3 from '../assets/gallery-3.png';
import gallery4 from '../assets/gallery-4.png';
import gallery5 from '../assets/gallery-5.png';
import gallery6 from '../assets/gallery-6.png';

const categories = ['All', 'Hair', 'Bridal', 'Skin', 'Men'];

export default function Gallery() {
  const { data } = useSalonData();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  if (!data) return null;

  const defaultImages = [
    { src: gallery1, category: 'Hair', title: 'Balayage Color' },
    { src: gallery2, category: 'Bridal', title: 'Signature Bridal' },
    { src: gallery3, category: 'Men', title: 'Classic Fade' },
    { src: gallery4, category: 'Skin', title: 'Radiance Facial' },
    { src: gallery5, category: 'Hair', title: 'Keratin Spa' },
    { src: gallery6, category: 'Skin', title: 'Luxury Manicure' },
  ];

  const images = data.galleryImages.length > 0 
    ? data.galleryImages.map((src, i) => ({ src, category: categories[(i % 4) + 1], title: `Gallery Image ${i+1}` }))
    : defaultImages;

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <Layout>
      {/* 1. Hero */}
      <section className="relative pt-40 pb-20 px-4 overflow-hidden border-b border-primary/20">
        <div className="absolute inset-0 bg-[#050505] z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none z-0" />
        <div className="container mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-primary">Portfolio</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF8D6] to-[#C9A84C] mb-6">Our Work</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg italic font-serif">
              Every look tells a unique story. Explore our recent masterpieces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Filter Tabs & 3. Masonry Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 text-xs uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? 'bg-primary text-black font-semibold' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence>
              {filteredImages.map((img, idx) => (
                <motion.div
                  key={img.src + idx}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="break-inside-avoid relative group cursor-pointer overflow-hidden border border-white/5 bg-card"
                  onClick={() => setSelectedImg(img.src)}
                >
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    className="w-full h-auto object-cover group-hover:scale-105 group-hover:blur-[2px] transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                    <span className="text-primary text-xs uppercase tracking-widest mb-2">{img.category}</span>
                    <h3 className="font-serif text-2xl text-white mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.title}</h3>
                    <div className="w-12 h-12 rounded-full border border-primary/50 flex items-center justify-center text-primary translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      <Maximize2 size={18} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredImages.length === 0 && (
            <div className="text-center py-20 text-muted-foreground font-serif text-xl italic">
              No works available in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* 4. Before / After */}
      <section className="py-24 bg-[#050505] border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Transformations</h2>
            <h3 className="font-serif text-4xl text-foreground">Before & After</h3>
          </div>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-2 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-background rounded-full border border-primary flex items-center justify-center z-20 text-primary md:flex hidden shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <MoveRight size={24} />
            </div>
            
            <div className="relative group">
              <img src={gallery1} alt="Before" className="w-full h-[500px] object-cover filter grayscale brightness-75" />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur border border-white/10 px-4 py-1 text-xs uppercase tracking-widest text-muted-foreground">
                Before
              </div>
            </div>
            <div className="relative group">
              <img src={gallery1} alt="After" className="w-full h-[500px] object-cover" />
              <div className="absolute top-4 right-4 bg-primary text-black font-semibold px-4 py-1 text-xs uppercase tracking-widest">
                After
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Instagram Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl text-foreground mb-4">Follow us on Instagram</h3>
            <p className="text-primary text-sm uppercase tracking-widest">@{data.salonName.replace(/\s+/g, '').toLowerCase()}_studio</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {images.slice(0,6).map((img, i) => (
              <a key={i} href="#" className="aspect-square relative group overflow-hidden block">
                <img src={img.src} alt="" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center mix-blend-overlay" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-primary transition-colors">
              <X size={32} strokeWidth={1} />
            </button>
            <motion.img 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              src={selectedImg} 
              alt="Enlarged view" 
              className="max-w-full max-h-[90vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10" 
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
