import { useState, useEffect } from 'react';

export interface Staff {
  name: string;
  role: string;
}

export interface SalonData {
  salonName: string;
  phone: string;
  whatsapp: string;
  address: string;
  rating: string;
  mapLink: string;
  services: string[];
  staff: Staff[];
  galleryImages: string[];
  testimonials: string[];
}

const defaultData: SalonData = {
  salonName: "",
  phone: "",
  whatsapp: "",
  address: "",
  rating: "",
  mapLink: "",
  services: ["Haircut & Styling", "Facial & Cleanup", "Hair Coloring", "Beard Grooming", "Bridal Makeup", "Spa & Massage"],
  staff: [{name: "Expert Stylist", role: "Hair Specialist"}, {name: "Beauty Expert", role: "Skincare Specialist"}],
  galleryImages: [],
  testimonials: []
};

export function useSalonData() {
  const [data, setData] = useState<SalonData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('salonData');
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse salonData", e);
      }
    }
    setLoading(false);
  }, []);

  const save = (newData: Partial<SalonData>) => {
    const merged = { ...data, ...defaultData, ...newData } as SalonData;
    localStorage.setItem('salonData', JSON.stringify(merged));
    setData(merged);
  };

  const clear = () => {
    localStorage.removeItem('salonData');
    setData(null);
  };

  return { data, loading, save, clear };
}
