import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import '../styles/WaitlistModal.css';

interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const WaitlistModal: React.FC<WaitlistModalProps> = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  // Reset state shortly after closing so it's fresh on reopen.
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setEmail('');
      setError('');
      setSubmitting(false);
      setSubmitted(false);
    }, 250);
    return () => clearTimeout(t);
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!EMAIL_RE.test(value)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitting(true);

    const { error: insertError } = await supabase
      .from('waitlist')
      .insert({ email: value });

    setSubmitting(false);

    if (insertError) {
      // 23505 = unique_violation: email is already on the list.
      if (insertError.code === '23505') {
        setSubmitted(true);
        return;
      }
      setError('Something went wrong. Please try again.');
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="waitlist-overlay" onClick={onClose}>
      <div
        className="waitlist-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Join the waitlist"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="waitlist-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <img src="/icon/cross.svg" alt="" />
        </button>

        {submitted ? (
          <div className="waitlist-modal__success">
            <h2 className="waitlist-modal__title">You're on the list!</h2>
            <p className="waitlist-modal__subtitle">
              We'll reach out to <strong>{email.trim()}</strong> when early beta
              access opens.
            </p>
            <button className="waitlist-modal__submit" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <h2 className="waitlist-modal__title">Join the waitlist</h2>
            <p className="waitlist-modal__subtitle">
              Enter your email to get early beta access when we launch.
            </p>
            <form className="waitlist-modal__form" onSubmit={handleSubmit} noValidate>
              <input
                type="email"
                className={`waitlist-modal__input${error ? ' waitlist-modal__input--error' : ''}`}
                placeholder="you@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                disabled={submitting}
                autoFocus
              />
              {error && <span className="waitlist-modal__error">{error}</span>}
              <button
                type="submit"
                className="waitlist-modal__submit"
                disabled={submitting}
              >
                {submitting ? 'Joining…' : 'Join waitlist'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default WaitlistModal;
