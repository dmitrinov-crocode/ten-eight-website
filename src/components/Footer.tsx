import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__copy">
        <p>© 2026 10-8. All rights reserved.</p>
      </div>
      <div className="footer__logo">
        <img src="/icon/logo.svg" alt="10-8 fight app logo" />
      </div>
      <div className="footer__links">
        <Link to="/privacy/" className="footer__link">
          <p>Privacy Policy</p>
        </Link>
        <Link to="/terms/" className="footer__link">
          <p>Terms of Use</p>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
