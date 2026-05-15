import React, { useState, useEffect, useRef } from 'react';
import '../styles/ShowcaseSection.css';

const SLIDE_COUNT = 4;
const AUTOPLAY_INTERVAL = 3000;

const ShowcaseSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % SLIDE_COUNT);
    }, AUTOPLAY_INTERVAL);
  };

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    resetAutoplay();
  };

  return (
    <section className="showcase">
      <div className="showcase__image-container">
        {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
          <div
            key={i}
            className={`showcase__image${activeIndex === i ? ' showcase__image--active' : ''}`}
          >
            <img
              src="/backgrounds/group-ten-eight.svg"
              alt=""
              className="showcase__wireframe"
            />
            <img
              src="/image/man.png"
              alt="Fighter"
              className="showcase__man"
            />
          </div>
        ))}
        <div className="showcase__pagination">
          {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
            <div
              key={i}
              className={`showcase__dot ${activeIndex === i ? 'showcase__dot--active' : 'showcase__dot--inactive'}`}
              onClick={() => handleDotClick(i)}
            />
          ))}
        </div>
      </div>
      <div className="showcase__bottom-line" />
    </section>
  );
};

export default ShowcaseSection;
