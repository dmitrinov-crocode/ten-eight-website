import React from 'react';
import '../styles/HighlightsSection.css';

const HighlightsSection: React.FC = () => {
  return (
    <section className="highlights" id="highlights">
      <div className="highlights__left">
        <div className="highlights__text-block">
          <div className="highlights__line-deco">
            <img src="/icon/line.svg" alt="" className="highlights__line-img" />
          </div>
          <h2 className="highlights__title highlights__title--desktop">{"Highlights you'll feel"}<br />{"immediately"}</h2>
          <h2 className="highlights__title highlights__title--mobile">{"Highlights"}<br />{"you'll feel"}<br />{"immediately"}</h2>
          <p className="highlights__description">
            Built for speed, clarity, and smarter fight decisions
          </p>
        </div>
        <div className="highlights__buttons">
          <div className="highlights__buttons-col">
            <button type="button" className="highlights__store-btn">
              <span className="highlights__store-icon">
                <img src="/icon/apple.svg" alt="Download 10-8 on the Apple App Store" />
              </span>
              <span className="highlights__store-text">
                <span className="highlights__store-label">Download on the</span>
                <span className="highlights__store-name">App Store</span>
              </span>
            </button>
            <button type="button" className="highlights__store-btn">
              <span className="highlights__store-icon">
                <img src="/icon/google_play.svg" alt="Get 10-8 on Google Play" />
              </span>
              <span className="highlights__store-text">
                <span className="highlights__store-label highlights__store-label--google">Get it now</span>
                <span className="highlights__store-name">Google Play</span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="highlights__bottom-line" />
      <div className="highlights__right">
        <div className="highlights__fighter-wrapper">
          <picture>
            <source type="image/webp" srcSet="/image/fighter.webp" />
            <img
              src="/image/fighter.png"
              alt="MMA fighter in fighting stance promoting the 10-8 app"
              className="highlights__fighter-img highlights__fighter-img--desktop"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <picture>
            <source type="image/webp" srcSet="/image/fighter.webp" />
            <img
              src="/image/fighter.png"
              alt="MMA fighter in fighting stance promoting the 10-8 app"
              className="highlights__fighter-img highlights__fighter-img--mobile"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <div className="highlights__qr-wrapper">
            <img
              src="/icon/qr-code.svg"
              alt="Scan QR code to download the 10-8 fight app"
              className="highlights__qr"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;

