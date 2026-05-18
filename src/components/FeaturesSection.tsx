import React from 'react';
import '../styles/FeaturesSection.css';

interface FeatureCard {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

const cards: FeatureCard[] = [
  {
    number: '1',
    title: 'Powered by Polymarket',
    subtitle: 'Bet through prediction markets',
    description: 'Place fight predictions and follow real-time community sentiment before every matchup',
    tags: ['Polymarket', 'Live Odds'],
  },
  {
    number: '2',
    title: 'Live Fight Feed',
    subtitle: 'Tap to stay updated',
    description: 'Follow fight news, injury updates, card changes, and everything happening before the bell',
    tags: ['Live', 'Breaking News'],
  },
  {
    number: '3',
    title: 'Insider Predictions',
    subtitle: 'See what ex-fighters think',
    description: 'Read picks and analysis from former fighters sharing who they believe will win and why',
    tags: ['Insider', 'Expert'],
  },
  {
    number: '4',
    title: 'Fantasy Leagues',
    subtitle: 'Compete with other fans',
    description: 'Join fantasy fight leagues, track standings, and keep the competition going all season long',
    tags: ['Fantasy', 'Leagues'],
  },
  {
    number: '5',
    title: 'Community Picks',
    subtitle: 'See where fans lean',
    description: 'Follow trending predictions and discover where the smartest bettors are placing picks',
    tags: ['Community', 'Trends'],
  },
  {
    number: '6',
    title: 'Fight History Breakdown',
    subtitle: 'Analyze every matchup',
    description: 'Review fighter stats, recent performances, win streaks, and matchup history before betting',
    tags: ['Stats', 'History'],
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="features" id="features">
      <div className="features__header">
        <div className="features__title-block">
          <p className="features__subtitle">Everything You Need to Stay</p>
          <div className="features__title-row">
            <p className="features__title-gradient">Ahead</p>
            <p className="features__title-white">of Fight Night</p>
          </div>
        </div>
        <div className="features__description">
          <p>Built for quick decisions, live updates, </p>
          <p>and sharp fight insight</p>
        </div>
      </div>
      <div className="features__list">
        <div className="features__row">
          {cards.slice(0, 3).map((card) => (
            <div key={card.number} className="features__card">
              <p className="features__card-number">{card.number}</p>
              <div className="features__card-content">
                <div className="features__card-info">
                  <div className="features__card-title-block">
                    <p className="features__card-title">{card.title}</p>
                    <p className="features__card-subtitle">{card.subtitle}</p>
                  </div>
                  <p className="features__card-text">{card.description}</p>
                </div>
                <div className="features__card-tags">
                  {card.tags.map((tag) => (
                    <span key={tag} className="features__card-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="features__row">
          {cards.slice(3, 6).map((card) => (
            <div key={card.number} className="features__card">
              <p className="features__card-number">{card.number}</p>
              <div className="features__card-content">
                <div className="features__card-info">
                  <div className="features__card-title-block">
                    <p className="features__card-title">{card.title}</p>
                    <p className="features__card-subtitle">{card.subtitle}</p>
                  </div>
                  <p className="features__card-text">{card.description}</p>
                </div>
                <div className="features__card-tags">
                  {card.tags.map((tag) => (
                    <span key={tag} className="features__card-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="features__bottom-line" />
    </section>
  );
};

export default FeaturesSection;
