import React, { useState, useEffect } from 'react';
import { useSalonData } from '@/lib/useSalonData';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Facebook, Twitter, MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  const { data, loading } = useSalonData();
  const [, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return <div className="min-h-[100dvh] bg-background flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans">
      {data && (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-primary/30 shadow-[0_4px_30px_rgba(212,175,55,0.1)]' : 'bg-transparent border-b border-white/5'}`}>
          <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <Link href="/" className="font-serif text-2xl md:text-3xl font-bold tracking-widest text-primary flex items-center gap-2">
              <span className="w-8 h-8 rounded-full border border-primary flex items-center justify-center text-sm">{data.salonName.charAt(0)}</span>
              {data.salonName || "L'Atelier"}
            </Link>
            
            <nav className="hidden lg:flex items-center gap-8">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <Link key={link.name} href={link.path} className="text-xs uppercase tracking-[0.2em] font-medium hover:text-primary transition-colors relative group py-2">
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-3 text-muted-foreground border-r border-white/10 pr-6">
                <a href="#" className="hover:text-primary transition-colors"><Instagram size={18} strokeWidth={1.5} /></a>
                <a href="#" className="hover:text-primary transition-colors"><Facebook size={18} strokeWidth={1.5} /></a>
              </div>
              <Link href="/booking" className="bg-gradient-to-r from-[#D4AF37] to-[#C9A84C] text-black px-6 py-2.5 font-semibold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                Book Now
              </Link>
            </div>

            <button 
              className="lg:hidden text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={28} strokeWidth={1.5} />
            </button>
          </div>
        </header>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-primary/20">
              <span className="font-serif text-2xl text-primary">{data?.salonName}</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-foreground hover:text-primary"><X size={28} strokeWidth={1.5} /></button>
            </div>
            <div className="flex flex-col items-center justify-center flex-grow gap-8 p-6">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Contact', path: '/contact' },
                { name: 'Book Appointment', path: '/booking' }
              ].map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={link.path} 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-serif text-3xl uppercase tracking-widest ${link.name === 'Book Appointment' ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="p-8 border-t border-primary/20 flex justify-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary"><Instagram size={24} strokeWidth={1.5} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Facebook size={24} strokeWidth={1.5} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Twitter size={24} strokeWidth={1.5} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {children}
      </main>

      {data && (
        <footer className="bg-[#050505] border-t border-primary/20 pt-20 pb-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              {/* Brand Col */}
              <div>
                <Link href="/" className="font-serif text-3xl text-primary mb-6 block">
                  {data.salonName}
                </Link>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 pr-4">
                  Experience luxury and sophistication at our premium salon. Elevate your style with our expert professionals dedicated to bringing out your best self.
                </p>
                <div className="flex items-center gap-4">
                  <a href="#" className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors"><Instagram size={18} /></a>
                  <a href="#" className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors"><Facebook size={18} /></a>
                  <a href="#" className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors"><Twitter size={18} /></a>
                </div>
              </div>

              {/* Links Col */}
              <div>
                <h4 className="font-serif text-xl mb-6 text-foreground">Quick Links</h4>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li><Link href="/about" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span> About Us</Link></li>
                  <li><Link href="/services" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span> Our Services</Link></li>
                  <li><Link href="/gallery" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span> Portfolio</Link></li>
                  <li><Link href="/booking" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span> Book Appointment</Link></li>
                  <li><Link href="/generator" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span> Generator Tool</Link></li>
                </ul>
              </div>

              {/* Contact Col */}
              <div>
                <h4 className="font-serif text-xl mb-6 text-foreground">Contact Info</h4>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {data.address && (
                    <li className="flex items-start gap-3">
                      <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                      <span>{data.address}</span>
                    </li>
                  )}
                  {data.phone && (
                    <li className="flex items-center gap-3">
                      <Phone size={18} className="text-primary shrink-0" />
                      <span>{data.phone}</span>
                    </li>
                  )}
                  <li className="flex items-center gap-3">
                    <Mail size={18} className="text-primary shrink-0" />
                    <span>hello@example.com</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock size={18} className="text-primary shrink-0" />
                    <span>Mon-Sat: 9AM - 8PM</span>
                  </li>
                </ul>
              </div>

              {/* Newsletter Col */}
              <div>
                <h4 className="font-serif text-xl mb-6 text-foreground">Newsletter</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Subscribe to receive updates, access to exclusive deals, and more.
                </p>
                <form className="relative" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="w-full bg-background border border-primary/30 p-3 pr-12 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                  />
                  <button type="submit" className="absolute right-0 top-0 h-full px-4 text-primary hover:text-primary/70 transition-colors">
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground uppercase tracking-widest">
              <p>&copy; {new Date().getFullYear()} {data.salonName}. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      )}

      {data?.whatsapp && (
        <a 
          href={`https://wa.me/${data.whatsapp}?text=Hi, I would like to book an appointment.`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-110 transition-transform z-50 ring-2 ring-primary/50 ring-offset-2 ring-offset-background"
        >
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.322.101.144.453.712 1.056 1.248.776.692 1.356.892 1.515.986.159.094.254.08.348-.028l.496-.607c.101-.122.215-.101.348-.05.133.05 .837.398.981.472.144.076.24.116.275.18.035.064.035.378-.109.783z"/></svg>
        </a>
      )}
    </div>
  );
}
