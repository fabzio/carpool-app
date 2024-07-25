import { useState, useEffect } from 'react';

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (documentHeight > windowHeight) {
        const scrollFraction = scrollTop / (documentHeight - windowHeight);
        setScrollPosition(scrollFraction);
      } else {
        setScrollPosition(0); // Si no hay scroll disponible, establecer en 1
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Llamar handleScroll una vez para establecer la posición inicial
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
};

export default useScrollPosition;
