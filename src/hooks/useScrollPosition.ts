import { useState, useEffect } from "react";

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFull, setIsFull] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (documentHeight > windowHeight) {
        const scrollFraction = scrollTop / (documentHeight - windowHeight);
        setScrollPosition(scrollFraction);
      } else {
        setIsFull(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Llamar handleScroll una vez para establecer la posición inicial
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollPosition, isFull };
};

export default useScrollPosition;
