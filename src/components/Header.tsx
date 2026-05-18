import React, { useState } from 'react';
import '../styles/Header.css';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="header">
        <div className="header__left">
          <div className="header__logo">
            <img src="/icon/logo.svg" alt="10-8 Logo" />
          </div>
          <nav className="header__nav">
            <a href="#features">Features</a>
            <a href="#reviews">Reviews</a>
            <a href="#highlights">Highlights</a>
          </nav>
        </div>
        <a href="#download" className="header__cta header__cta--desktop">
          Download App
        </a>
        <button
          className="header__menu-btn"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <img src="/icon/menu.svg" alt="" />
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu__topbar">
            <button
              className="mobile-menu__close"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <img src="/icon/cross.svg" alt="" />
            </button>
          </div>
          <div className="mobile-menu__body">
            <nav className="mobile-menu__nav">
              <a href="#features" onClick={closeMenu}>Features</a>
              <div className="mobile-menu__divider" />
              <a href="#reviews" onClick={closeMenu}>Reviews</a>
              <div className="mobile-menu__divider" />
              <a href="#highlights" onClick={closeMenu}>Highlights</a>
              <div className="mobile-menu__divider" />
            </nav>
            <a href="#download" className="mobile-menu__cta" onClick={closeMenu}>
              Download App
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
