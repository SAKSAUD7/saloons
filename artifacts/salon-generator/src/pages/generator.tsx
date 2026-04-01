import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useSalonData } from '@/lib/useSalonData';
import { TEMPLATES, applyTemplate } from '@/lib/templates';
import { Check, ChevronRight, Upload, X, Sparkles, RotateCcw } from 'lucide-react';

const STEPS = ['Template', 'Salon Info', 'Photos'];

export default function Generator() {
  const [, setLocation] = useLocation();
  const { save } = useSalonData();

  const [step, setStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('noir-gold');
  const [rawData, setRawData] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => setImages((prev) => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (idx: number) => setImages((prev) => prev.filter((_, i) => i !== idx));

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);

    setTimeout(() => {
      const lines = rawData.split('\n').filter((l) => l.trim().length > 0);
      let salonName = 'Luxury Salon';
      let rating = '';
      let address = '';
      let phone = '';
      let mapLink = '';

      const firstLine = lines[0] || '';
      const parts = firstLine.split('|').map((s) => s.trim());
      if (parts[0]) salonName = parts[0];
      if (parts[1]) rating = parts[1];
      if (parts[2]) address = parts[2];
      if (parts[3]) phone = parts[3];
      if (parts[4]) mapLink = parts[4];

      const cleanPhone = phone.replace(/\D/g, '');
      const whatsapp = cleanPhone ? `91${cleanPhone}` : '';

      const ratingNum = parseFloat(rating) || 0;
      const testimonials =
        ratingNum >= 4
          ? [
              'Absolutely stunning results! The team is incredibly talented and made me feel so special.',
              'Best salon experience I have ever had. The ambiance, the service, everything was perfect.',
              'I left feeling completely transformed. Highly recommend to everyone looking for luxury service.',
            ]
          : [
              'Good service and a friendly environment. Will definitely visit again.',
              'Nice place with professional staff. Value for money.',
            ];

      save({
        salonName,
        rating,
        address,
        phone,
        whatsapp,
        mapLink,
        galleryImages: images,
        testimonials,
        templateId: selectedTemplate,
      });

      applyTemplate(selectedTemplate);
      setLocation('/');
    }, 1200);
  };

  const handleReset = () => {
    setRawData('');
    setImages([]);
    setSelectedTemplate('noir-gold');
    setStep(0);
  };

  const canProceedStep1 = selectedTemplate !== '';
  const canProceedStep2 = rawData.trim().length > 0;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start py-12 px-4 relative overflow-x-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Background glow orbs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] rounded-full bg-yellow-500/5 blur-[150px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] rounded-full bg-yellow-500/4 blur-[150px]" />
      </div>

      <div className="w-full max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 border border-yellow-500/20 bg-yellow-500/5 px-4 py-1.5 rounded-full mb-6">
            <Sparkles size={13} className="text-yellow-400" />
            <span className="text-xs uppercase tracking-widest text-yellow-400/90">Premium Website Generator</span>
          </div>
          <h1
            className="text-5xl md:text-7xl font-bold mb-4 leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              background: 'linear-gradient(135deg, #D4AF37 0%, #FFF8D6 50%, #C9A84C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            L'Atelier Studio
          </h1>
          <p className="text-sm uppercase tracking-[0.3em] text-white/40">
            Create your salon's perfect website in minutes
          </p>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-10 gap-0">
          {STEPS.map((label, i) => (
            <React.Fragment key={i}>
              <button
                onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-full transition-all text-xs uppercase tracking-widest font-medium ${
                  i === step
                    ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30'
                    : i < step
                    ? 'text-yellow-500/70 cursor-pointer hover:text-yellow-400'
                    : 'text-white/25 cursor-default'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${
                    i < step
                      ? 'border-yellow-500 bg-yellow-500 text-black'
                      : i === step
                      ? 'border-yellow-500/60 text-yellow-400'
                      : 'border-white/15 text-white/25'
                  }`}
                >
                  {i < step ? <Check size={12} /> : i + 1}
                </span>
                {label}
              </button>
              {i < STEPS.length - 1 && (
                <div className={`w-12 h-px ${i < step ? 'bg-yellow-500/40' : 'bg-white/10'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">

          {/* STEP 0: Template Picker */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6 text-center">
                <h2
                  className="text-2xl font-semibold text-white/90 mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Choose Your Theme
                </h2>
                <p className="text-white/40 text-sm">Select the look and feel for your salon website</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                {TEMPLATES.map((t) => {
                  const isSelected = selectedTemplate === t.id;
                  const isHovered = hoveredTemplate === t.id;
                  return (
                    <motion.button
                      key={t.id}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedTemplate(t.id)}
                      onMouseEnter={() => setHoveredTemplate(t.id)}
                      onMouseLeave={() => setHoveredTemplate(null)}
                      className={`relative text-left rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        isSelected
                          ? 'border-yellow-400 shadow-[0_0_30px_rgba(212,175,55,0.25)]'
                          : 'border-white/8 hover:border-white/20'
                      }`}
                    >
                      {/* Template Preview Card */}
                      <div
                        className="relative h-44 overflow-hidden"
                        style={{ background: t.previewBg }}
                      >
                        {/* Simulated navbar */}
                        <div
                          className="absolute top-0 left-0 right-0 h-8 flex items-center px-3 gap-2"
                          style={{ background: t.previewBg, borderBottom: `1px solid ${t.previewAccent}22` }}
                        >
                          <div className="w-4 h-4 rounded-full border flex items-center justify-center text-[7px] font-bold" style={{ borderColor: t.previewAccent, color: t.previewAccent }}>S</div>
                          <div className="flex gap-2 ml-auto">
                            {['H', 'A', 'S', 'G'].map((l) => (
                              <div key={l} className="text-[7px] uppercase" style={{ color: t.previewText + '80' }}>{l}</div>
                            ))}
                          </div>
                          <div className="ml-2 px-2 py-0.5 text-[7px] uppercase font-bold rounded-sm" style={{ background: t.gradient[0], color: t.previewBg }}>Book</div>
                        </div>

                        {/* Hero simulation */}
                        <div className="absolute top-8 left-0 right-0 bottom-0 flex flex-col items-center justify-center px-4">
                          <div className="text-[9px] uppercase tracking-widest mb-1" style={{ color: t.previewAccent + 'aa' }}>Welcome to</div>
                          <div
                            className="text-lg font-bold mb-1.5 text-center leading-tight"
                            style={{
                              fontFamily: `'${t.fontSerif}', serif`,
                              background: `linear-gradient(135deg, ${t.gradient[0]}, ${t.gradient[1]})`,
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            Salon Name
                          </div>
                          <div className="text-[8px] mb-3" style={{ color: t.previewText + '60', fontStyle: 'italic', fontFamily: `'${t.fontSerif}', serif` }}>Style • Beauty • Confidence</div>
                          <div className="flex gap-2">
                            <div className="px-3 py-1 text-[7px] uppercase tracking-widest font-bold" style={{ background: `linear-gradient(135deg, ${t.gradient[0]}, ${t.gradient[1]})`, color: t.previewBg }}>Book Now</div>
                            <div className="px-3 py-1 text-[7px] uppercase tracking-widest border" style={{ borderColor: t.previewAccent + '60', color: t.previewAccent }}>WhatsApp</div>
                          </div>
                        </div>

                        {/* Services row at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 flex gap-1 p-2">
                          {['Hair', 'Skin', 'Bridal', 'Men'].map((s) => (
                            <div key={s} className="flex-1 py-1 text-center text-[6px] uppercase border" style={{ borderColor: t.previewAccent + '30', color: t.previewText + '60', background: t.previewAccent + '08' }}>{s}</div>
                          ))}
                        </div>

                        {/* Glow orb */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full blur-3xl pointer-events-none" style={{ background: t.previewAccent + '18' }} />

                        {/* Selected checkmark */}
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
                            style={{ background: t.gradient[0] }}
                          >
                            <Check size={14} className="text-black" strokeWidth={3} />
                          </motion.div>
                        )}
                      </div>

                      {/* Template Info */}
                      <div className="p-4" style={{ background: '#0f0f0f', borderTop: `1px solid ${isSelected ? '#D4AF3740' : '#ffffff10'}` }}>
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-semibold text-white/90 text-sm mb-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>{t.name}</div>
                            <div className="text-xs text-white/40">{t.tagline}</div>
                          </div>
                          <div
                            className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] border"
                            style={{ borderColor: t.previewAccent + '40', color: t.previewAccent }}
                          >
                            <div className="w-2.5 h-2.5 rounded-full" style={{ background: t.previewAccent }} />
                            {t.fontSerif.split(' ')[0]}
                          </div>
                        </div>
                        <div className="flex gap-1.5 mt-3">
                          {[t.previewBg, t.gradient[0], t.gradient[1], t.card, t.mutedFg].map((c, i) => (
                            <div key={i} className="w-5 h-5 rounded-full border border-white/10" style={{ background: c }} />
                          ))}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(1)}
                  disabled={!canProceedStep1}
                  className="flex items-center gap-2 px-8 py-3.5 font-semibold uppercase tracking-widest text-sm text-black disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:opacity-90 hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #D4AF37, #C9A84C)', boxShadow: '0 0 25px rgba(212,175,55,0.25)' }}
                >
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 1: Salon Info */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="mb-6 text-center">
                <h2
                  className="text-2xl font-semibold text-white/90 mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Enter Salon Details
                </h2>
                <p className="text-white/40 text-sm">Paste your salon information below</p>
              </div>

              <div className="border border-white/8 rounded-xl overflow-hidden mb-5" style={{ background: '#111111' }}>
                <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
                  <span className="text-xs uppercase tracking-widest text-yellow-500/70">Raw Data Input</span>
                </div>
                <div className="p-5">
                  <textarea
                    value={rawData}
                    onChange={(e) => setRawData(e.target.value)}
                    placeholder="Salon Name | Rating | Address | Phone | Map Link&#10;&#10;Example:&#10;Glamour Studio | 4.8 | 12 MG Road, Mumbai | 9876543210 | https://maps.google.com/..."
                    className="w-full h-44 bg-transparent text-white/80 placeholder:text-white/20 focus:outline-none resize-none text-sm leading-relaxed"
                    required
                  />
                </div>
              </div>

              <div className="border border-yellow-500/15 rounded-xl p-4 mb-8" style={{ background: '#111111' }}>
                <p className="text-xs text-yellow-500/60 uppercase tracking-widest mb-2">Format Guide</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-white/40">
                  <div className="flex gap-2"><span className="text-yellow-500/50">Name</span><span>Glamour Studio</span></div>
                  <div className="flex gap-2"><span className="text-yellow-500/50">Rating</span><span>4.8</span></div>
                  <div className="flex gap-2"><span className="text-yellow-500/50">Address</span><span>12 MG Road, Mumbai</span></div>
                  <div className="flex gap-2"><span className="text-yellow-500/50">Phone</span><span>9876543210</span></div>
                  <div className="flex gap-2 col-span-2"><span className="text-yellow-500/50">Map Link</span><span className="truncate">https://maps.google.com/...</span></div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(0)}
                  className="flex items-center gap-2 px-6 py-3 border border-white/15 text-white/50 text-sm uppercase tracking-widest hover:text-white/80 hover:border-white/25 transition-all rounded-lg"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep2}
                  className="flex items-center gap-2 px-8 py-3.5 font-semibold uppercase tracking-widest text-sm text-black disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:opacity-90 hover:scale-105 rounded-lg"
                  style={{ background: 'linear-gradient(135deg, #D4AF37, #C9A84C)', boxShadow: '0 0 25px rgba(212,175,55,0.2)' }}
                >
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Photos + Generate */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="mb-6 text-center">
                <h2
                  className="text-2xl font-semibold text-white/90 mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Upload Gallery Photos
                </h2>
                <p className="text-white/40 text-sm">Optional — showcase your salon's best work</p>
              </div>

              {/* Upload Zone */}
              <div className="relative border-2 border-dashed border-white/15 rounded-xl p-10 text-center hover:border-yellow-500/40 transition-colors mb-6 group" style={{ background: '#111111' }}>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center gap-3 pointer-events-none">
                  <div className="w-14 h-14 rounded-full border border-yellow-500/30 flex items-center justify-center group-hover:border-yellow-500/60 transition-colors" style={{ background: '#1a1a1a' }}>
                    <Upload size={22} className="text-yellow-500/60 group-hover:text-yellow-500 transition-colors" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm font-medium mb-1">Drop photos here or click to browse</p>
                    <p className="text-white/25 text-xs">PNG, JPG, WEBP up to 10MB each</p>
                  </div>
                </div>
              </div>

              {/* Image Previews */}
              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {images.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-white/10 group">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeImage(i)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
                      >
                        <X size={12} className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Summary before generate */}
              <div className="border border-white/8 rounded-xl p-5 mb-8" style={{ background: '#0f0f0f' }}>
                <p className="text-xs uppercase tracking-widest text-white/30 mb-4">Summary</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/40">Theme</span>
                    <span className="text-white/80 font-medium">{TEMPLATES.find(t => t.id === selectedTemplate)?.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/40">Salon Data</span>
                    <span className="text-green-400 text-xs flex items-center gap-1"><Check size={12} /> Provided</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/40">Gallery Photos</span>
                    <span className="text-white/80">{images.length > 0 ? `${images.length} photo${images.length > 1 ? 's' : ''} uploaded` : 'Using placeholder images'}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 px-6 py-3 border border-white/15 text-white/50 text-sm uppercase tracking-widest hover:text-white/80 hover:border-white/25 transition-all rounded-lg"
                >
                  Back
                </button>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-2 px-5 py-3 border border-white/10 text-white/35 text-xs uppercase tracking-widest hover:text-white/60 transition-all rounded-lg"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                  <button
                    onClick={handleGenerate}
                    disabled={generating}
                    className="relative flex items-center gap-2 px-10 py-3.5 font-bold uppercase tracking-widest text-sm text-black transition-all hover:scale-105 active:scale-100 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #D4AF37, #C9A84C)', boxShadow: '0 0 35px rgba(212,175,55,0.35)' }}
                  >
                    {generating ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                        />
                        Crafting your website...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        Generate Website
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
