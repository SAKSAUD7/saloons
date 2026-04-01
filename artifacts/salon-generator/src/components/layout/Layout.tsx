import React from 'react';
import { useSalonData } from '@/lib/useSalonData';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';

export function Layout({ children }: { children: React.ReactNode }) {
  const { data, loading } = useSalonData();
  const [, setLocation] = useLocation();

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {data && (
        <header className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-primary/20 transition-all duration-300">
          <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <Link href="/" className="font-serif text-2xl font-bold tracking-wider text-primary">
              {data.salonName || "L'Atelier"}
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm uppercase tracking-widest hover:text-primary transition-colors">Home</Link>
              <Link href="/about" className="text-sm uppercase tracking-widest hover:text-primary transition-colors">About</Link>
              <Link href="/services" className="text-sm uppercase tracking-widest hover:text-primary transition-colors">Services</Link>
              <Link href="/gallery" className="text-sm uppercase tracking-widest hover:text-primary transition-colors">Gallery</Link>
              <Link href="/contact" className="text-sm uppercase tracking-widest hover:text-primary transition-colors">Contact</Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link href="/generator" className="hidden md:inline-flex text-xs border border-primary/50 text-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 uppercase tracking-widest">
                Create New Website
              </Link>
              <Link href="/booking" className="bg-gradient-to-r from-[#D4AF37] to-[#C9A84C] text-black px-6 py-2.5 font-medium uppercase tracking-wider text-sm hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                Book Now
              </Link>
            </div>
          </div>
        </header>
      )}

      <main className="flex-grow">
        {children}
      </main>

      {data && (
        <footer className="bg-card border-t border-primary/20 py-16 mt-20">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div>
              <h3 className="font-serif text-2xl text-primary mb-6">{data.salonName}</h3>
              <p className="text-muted-foreground max-w-sm mx-auto md:mx-0">
                Experience luxury and sophistication at our premium salon. Elevate your style with our expert professionals.
              </p>
            </div>
            <div>
              <h4 className="uppercase tracking-widest text-sm mb-6 text-primary">Contact</h4>
              <ul className="space-y-4 text-muted-foreground">
                {data.address && <li>{data.address}</li>}
                {data.phone && <li>{data.phone}</li>}
              </ul>
            </div>
            <div>
              <h4 className="uppercase tracking-widest text-sm mb-6 text-primary">Quick Links</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
                <li><Link href="/booking" className="hover:text-primary transition-colors">Book Appointment</Link></li>
                <li><Link href="/generator" className="hover:text-primary transition-colors">Create New Website</Link></li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/5 text-center text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} {data.salonName}. All rights reserved.
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
