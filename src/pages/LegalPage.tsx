import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDocumentHead } from '../hooks/useDocumentHead';
import '../styles/LegalPage.css';

export interface LegalSection {
  /** Section heading (e.g. "1. Acceptance of Terms"). */
  heading: string;
  /** Optional paragraphs of body copy rendered above the list. */
  paragraphs?: React.ReactNode[];
  /** Optional subsections — each renders as a subheading with its own paragraphs/list. */
  subsections?: Array<{
    heading: string;
    paragraphs?: React.ReactNode[];
    items?: React.ReactNode[];
  }>;
  /** Optional bullet list of items. */
  items?: React.ReactNode[];
  /** Marks a section as a disclaimer (uppercase styling). Used for AS-IS / liability blocks. */
  disclaimer?: boolean;
}

interface LegalPageProps {
  title: string;
  updated: string;
  /** Optional intro paragraph rendered before the numbered sections. */
  intro?: React.ReactNode;
  sections: LegalSection[];
  pageTitle: string;
  metaDescription: string;
  canonical: string;
}

const LegalPage: React.FC<LegalPageProps> = ({
  title,
  updated,
  intro,
  sections,
  pageTitle,
  metaDescription,
  canonical,
}) => {
  useDocumentHead({ title: pageTitle, description: metaDescription, canonical });

  // Scroll-to-top is only meaningful for in-app navigation.
  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="legal">
          <div className="legal__inner">
            <Link to="/" className="legal__back" aria-label="Back to home">
              ← Back to home
            </Link>

            <header className="legal__header">
              <h1 className="legal__title">{title}</h1>
              <p className="legal__updated">Last updated: {updated}</p>
            </header>

            <div className="legal__content">
              {intro && <div className="legal__section">{intro}</div>}

              {sections.map((section) => (
                <div
                  key={section.heading}
                  className={`legal__section${section.disclaimer ? ' legal__section--disclaimer' : ''}`}
                >
                  <h2 className="legal__section-heading">{section.heading}</h2>

                  {section.paragraphs?.map((p, i) => (
                    <p
                      key={i}
                      className={section.disclaimer ? 'legal__disclaimer' : undefined}
                    >
                      {p}
                    </p>
                  ))}

                  {section.items && (
                    <ul className="legal__list">
                      {section.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {section.subsections?.map((sub) => (
                    <React.Fragment key={sub.heading}>
                      <h3 className="legal__section-subheading">{sub.heading}</h3>
                      {sub.paragraphs?.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                      {sub.items && (
                        <ul className="legal__list">
                          {sub.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default LegalPage;
