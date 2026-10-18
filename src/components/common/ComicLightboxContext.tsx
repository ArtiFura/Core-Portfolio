import React, { createContext, useContext, useState, useCallback } from 'react';

export interface LightboxData {
  src: string;
  alt?: string;
  title?: string;
  chapterTag?: string;
  dialogue?: string;
}

interface ComicLightboxContextType {
  isOpen: boolean;
  activeImage: LightboxData | null;
  openLightbox: (data: LightboxData) => void;
  closeLightbox: () => void;
}

const ComicLightboxContext = createContext<ComicLightboxContextType>({
  isOpen: false,
  activeImage: null,
  openLightbox: () => {},
  closeLightbox: () => {},
});

export const useComicLightbox = () => useContext(ComicLightboxContext);

export const ComicLightboxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<LightboxData | null>(null);

  const openLightbox = useCallback((data: LightboxData) => {
    setActiveImage(data);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ComicLightboxContext.Provider value={{ isOpen, activeImage, openLightbox, closeLightbox }}>
      {children}
    </ComicLightboxContext.Provider>
  );
};
