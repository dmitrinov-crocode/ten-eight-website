import React from 'react';
import '../styles/FeaturesSection.css';

interface FeatureCard {
  number: string;
  title: string;
  description: string;
}

const cards: FeatureCard[] = [
  {
    number: '1',
    title: 'Powered by Polymarket',
    description: 'Place fight predictions and follow real-time community sentiment before every matchup',
  },
  {
    number: '2',
    title: 'Live Fight Feed',
    description: 'Follow fight news, injury updates, card changes, and everything happening before the bell',
  },
  {
    number: '3',
    title: 'Insider Predictions',
    description: 'Read picks and analysis from former fighters sharing who they believe will win and why',
  },
  {
    number: '4',
    title: 'Fantasy Leagues',
    description: 'Join fantasy fight leagues, track standings, and keep the competition going all season long',
  },
  {
    number: '5',
    title: 'Community Picks',
    description: 'Follow trending predictions and discover where the smartest bettors are placing picks',
  },
  {
    number: '6',
    title: 'Fight History Breakdown',
    description: 'Review fighter stats, recent performances, win streaks, and matchup history before betting',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="features" id="features">
      <div className="features__header">
        <h2 className="features__title-block">
          <span className="features__subtitle">Everything You Need to Stay</span>
          <span className="features__title-row">
            <span className="features__title-white">Ahead of </span>
            <span className="features__title-gradient">Fight Night</span>
          </span>
        </h2>
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
                  </div>
                  <p className="features__card-text">{card.description}</p>
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
                  </div>
                  <p className="features__card-text">{card.description}</p>
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
