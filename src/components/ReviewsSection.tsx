import React from 'react';
import '../styles/ReviewsSection.css';

interface Review {
  name: string;
  quote: string;
  avatar: string;
}

const reviews: Review[] = [
  {
    name: 'Maya R.',
    quote: 'Checking odds and news in one place makes fight night way easier',
    avatar: '/image/avatar-1.svg',
  },
  {
    name: 'Jordan K.',
    quote: 'The ex-fighter picks are the best part. It feels like getting inside info',
    avatar: '/image/avatar-2.svg',
  },
  {
    name: 'Alyssa S.',
    quote: 'Fantasy leagues and fight news keep me locked in all week',
    avatar: '/image/avatar-3.svg',
  },
];

const ReviewsSection: React.FC = () => {
  return (
    <section className="reviews" id="reviews">
      <div className="reviews__header">
        <h2 className="reviews__title">Loved by Every User</h2>
        <p className="reviews__subtitle">Fast, focused, and built for serious fight watchers</p>
      </div>
      <div className="reviews__list">
        <div className="reviews__row">
          {reviews.map((review) => (
            <div key={review.name} className="reviews__card">
              <div className="reviews__card-user">
                <div className="reviews__card-avatar-group">
                  <img src={review.avatar} alt={`Avatar of ${review.name}, 10-8 app user`} className="reviews__card-avatar" loading="lazy" decoding="async" />
                  <div className="reviews__card-name-group">
                    <p className="reviews__card-name">{review.name}</p>
                  </div>
                </div>
                <img
                  src="/icon/stars.svg"
                  alt="5 out of 5 stars rating"
                  className="reviews__stars"
                />
              </div>
              <div className="reviews__card-quote-wrap">
                <p className="reviews__card-quote">{review.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="reviews__bottom-line" />
    </section>
  );
};

export default ReviewsSection;
