import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';

function App() {
  return (
    <BrowserRouter>
      <div className="page">
        <div className="page__bg">
          <img className="page__bg-blob page__bg-blob--4" src="/backgrounds/ellipse_4.svg" alt="" />
          <img className="page__bg-blob page__bg-blob--5" src="/backgrounds/ellipse_5.svg" alt="" />
          <img className="page__bg-blob page__bg-blob--6" src="/backgrounds/ellipse_6.svg" alt="" />
          <img className="page__bg-blob page__bg-blob--7" src="/backgrounds/ellipse_7.svg" alt="" />
          <img className="page__bg-blob page__bg-blob--4-mobile" src="/backgrounds/ellipse-4-mobile.svg" alt="" />
          <img className="page__bg-blob page__bg-blob--7-mobile" src="/backgrounds/ellipse-7-mobile.svg" alt="" />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/terms/" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/privacy/" element={<PrivacyPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
