import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';
import WaitlistModal from './WaitlistModal';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const closeMenu = () => setMenuOpen(false);

  const anchor = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <>
      <div className="announcement-bar">
        <span className="announcement-bar__text">
          Launching mid-June. Picking select waitlist members for early beta access.
        </span>
        <button
          type="button"
          className="announcement-bar__link"
          onClick={() => setWaitlistOpen(true)}
        >
          Join waitlist&nbsp;&rarr;
        </button>
      </div>
      <header className="header">
        <div className="header__left">
          <div className="header__logo">
            {isHome ? (
              <img src="/icon/logo.svg" alt="10-8 fight app logo" />
            ) : (
              <Link to="/" aria-label="Back to home">
                <img src="/icon/logo.svg" alt="10-8 fight app logo" />
              </Link>
            )}
          </div>
          <nav className="header__nav">
            <a href={anchor('#features')}>Features</a>
            <a href={anchor('#reviews')}>Reviews</a>
            <a href={anchor('#highlights')}>Highlights</a>
          </nav>
        </div>
        <a href={anchor('#download')} className="header__cta header__cta--desktop">
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
              <a href={anchor('#features')} onClick={closeMenu}>Features</a>
              <div className="mobile-menu__divider" />
              <a href={anchor('#reviews')} onClick={closeMenu}>Reviews</a>
              <div className="mobile-menu__divider" />
              <a href={anchor('#highlights')} onClick={closeMenu}>Highlights</a>
              <div className="mobile-menu__divider" />
            </nav>
            <a href={anchor('#download')} className="mobile-menu__cta" onClick={closeMenu}>
              Download App
            </a>
          </div>
        </div>
      )}

      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
};

export default Header;
