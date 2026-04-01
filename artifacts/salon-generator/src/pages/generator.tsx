import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useSalonData } from '@/lib/useSalonData';

export default function Generator() {
  const [, setLocation] = useLocation();
  const { save } = useSalonData();
  
  const [rawData, setRawData] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // Basic parsing logic
      const lines = rawData.split('\n').filter(l => l.trim().length > 0);
      let salonName = "Luxury Salon";
      let rating = "5.0";
      let address = "";
      let phone = "";
      let mapLink = "";

      const firstLineParts = lines[0]?.split('|').map(s => s.trim()) || [];
      if (firstLineParts.length >= 1) salonName = firstLineParts[0];
      if (firstLineParts.length >= 2) rating = firstLineParts[1];
      if (firstLineParts.length >= 3) address = firstLineParts[2];
      if (firstLineParts.length >= 4) phone = firstLineParts[3];
      if (firstLineParts.length >= 5) mapLink = firstLineParts[4];

      const cleanPhone = phone.replace(/\D/g, '');
      const whatsapp = cleanPhone ? `91${cleanPhone}` : '';

      const ratingNum = parseFloat(rating) || 5;
      const testimonials = ratingNum >= 4 
        ? ["Amazing experience and professional staff", "Highly recommended salon, beautiful ambiance.", "The best service I've ever had!"]
        : ["Good service and friendly environment", "Nice place, will visit again."];

      save({
        salonName,
        rating,
        address,
        phone,
        whatsapp,
        mapLink,
        galleryImages: images,
        testimonials
      });

      setLocation("/");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl z-10"
      >
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF8D6] to-[#C9A84C] mb-6">
            L'Atelier Studio
          </h1>
          <p className="text-muted-foreground tracking-widest uppercase text-sm">Premium Salon Website Generator</p>
        </div>

        <div className="bg-card/50 backdrop-blur-md border border-primary/20 p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm uppercase tracking-widest text-primary mb-4">
                Raw Data
              </label>
              <textarea
                value={rawData}
                onChange={(e) => setRawData(e.target.value)}
                placeholder="Name | Rating | Address | Phone | Map Link"
                className="w-full h-40 bg-black/50 border border-primary/20 text-foreground placeholder:text-white/20 p-4 focus:outline-none focus:border-primary transition-colors font-sans resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm uppercase tracking-widest text-primary mb-4">
                Gallery Images
              </label>
              <div className="border-2 border-dashed border-primary/30 p-8 text-center hover:border-primary/60 transition-colors cursor-pointer relative bg-black/30">
                <input 
                  type="file" 
                  multiple 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-muted-foreground">
                  <span className="text-primary block mb-2 font-medium">Click to upload</span>
                  <span className="text-xs">or drag and drop</span>
                </div>
              </div>
              
              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-6">
                  {images.map((img, i) => (
                    <div key={i} className="aspect-square relative group overflow-hidden border border-primary/20">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#C9A84C] text-black py-4 uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Crafting Experience..." : "Generate Website"}
              </button>
              <button
                type="button"
                onClick={() => { setRawData(""); setImages([]); }}
                className="px-8 border border-primary/30 text-primary uppercase tracking-widest text-sm hover:bg-primary/5 transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
