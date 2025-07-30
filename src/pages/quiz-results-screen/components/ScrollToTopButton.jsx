import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <Button
        variant="default"
        size="icon"
        onClick={scrollToTop}
        iconName="ArrowUp"
        className="w-12 h-12 rounded-full glass-card shadow-lg hover:scale-110 transition-transform duration-200 bg-gradient-to-r from-primary to-secondary"
        aria-label="Scroll to top"
      />
    </div>
  );
};

export default ScrollToTopButton;