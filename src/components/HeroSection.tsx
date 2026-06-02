import React from 'react';
import '../styles/HeroSection.css';

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero__left">
        <div className="hero__top-block">
          <div className="hero__title-block">
            <h1 className="hero__title">
              <span className="hero__title-line1">Every Fight Night</span>
              <span className="hero__title-line2">Starts Here</span>
            </h1>
            <p className="hero__description">
              Track fight bets, follow the latest fight news, join fantasy leagues, and get insider picks from ex-fighters and professionals who know who has the edge
            </p>
          </div>
        </div>
        <div className="hero__buttons">
          <div className="hero__qr-block">
            <img src="/icon/qr-code.svg" alt="Scan QR code to download the 10-8 fight app" className="hero__qr-img" />
          </div>
          <div className="hero__store-btns-col">
            <button type="button" className="hero__store-btn">
              <span className="hero__store-icon">
                <img src="/icon/apple.svg" alt="Download 10-8 on the Apple App Store" />
              </span>
              <span className="hero__store-text">
                <span className="hero__store-label">Download on the</span>
                <span className="hero__store-name">App Store</span>
              </span>
            </button>
            <button type="button" className="hero__store-btn">
              <span className="hero__store-icon">
                <img src="/icon/google_play.svg" alt="Get 10-8 on Google Play" />
              </span>
              <span className="hero__store-text">
                <span className="hero__store-label">Get it now</span>
                <span className="hero__store-name">Google Play</span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="hero__right">
        <div className="hero__phone-wrapper">
          <img src="/icon/ten-eight.svg" alt="" className="hero__ten-eight-bg" />
          <picture>
            <source type="image/webp" srcSet="/image/hero-desktop.webp" />
            <img
              src="/image/hero-desktop.png"
              alt="10-8 fight app on mobile"
              className="hero__phone2"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>
      </div>

      <div className="hero__mobile-phones">
        <div className="hero__mobile-phone-wrapper">
          <div className="hero__mobile-teneight-wrap">
            <img src="/icon/ten-eight-mobile.svg" alt="" className="hero__mobile-teneight" />
          </div>
          <picture>
            <source type="image/webp" srcSet="/image/hero-mobile.webp" />
            <img
              src="/image/hero-mobile.png"
              alt="10-8 fight app on mobile"
              className="hero__mobile-phone2"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>
      </div>

      <div className="hero__bottom-line" />
    </section>
  );
};

export default HeroSection;
