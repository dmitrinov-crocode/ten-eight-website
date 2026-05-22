import React, { useState, useEffect, useRef } from 'react';
import '../styles/ShowcaseSection.css';

const SLIDE_COUNT = 3;
const AUTOPLAY_INTERVAL = 3000;

const images = [
  '/image/fighter-1.png',
  '/image/fighter-3.png',
  '/image/fighter-2.png'
];

const images_mobile = [
  '/image/fighter-1-mobile.png',
  '/image/fighter-3-mobile.png',
  '/image/fighter-2-mobile.png'

];

const slideAlts = [
  '10-8 app showcasing live fight odds powered by Polymarket',
  '10-8 app showcasing the live fight news feed and updates',
  '10-8 app showcasing insider picks from ex-fighters',
];

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
  }, []);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    resetAutoplay();
  };

  return (
    <section className="showcase">
      <div className="showcase__image-container">
        {images.map((image, i) => (
          <div
            key={i}
            className={`showcase__image${activeIndex === i ? ' showcase__image--active' : ''}`}
          >
            <picture>
              <source type="image/webp" srcSet={image.replace(/\.png$/, '.webp')} />
              <img
                src={image}
                alt={slideAlts[i]}
                className="showcase__slide-image showcase__slide-image--desktop"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <picture>
              <source type="image/webp" srcSet={images_mobile[i].replace(/\.png$/, '.webp')} />
              <img
                src={images_mobile[i]}
                alt={slideAlts[i]}
                className="showcase__slide-image showcase__slide-image--mobile"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        ))}
        <div className="showcase__pagination">
          {images.map((_, i) => (
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
