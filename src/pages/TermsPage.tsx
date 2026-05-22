import React from 'react';
import LegalPage, { LegalSection } from './LegalPage';

const CONTACT_EMAIL = 'support@10-8.gg';

const sections: LegalSection[] = [
  {
    heading: '1. Acceptance of Terms',
    paragraphs: [
      <>By accessing or using 10-8.gg (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</>,
    ],
  },
  {
    heading: '2. Description of Service',
    paragraphs: [
      <>10-8.gg is a free-to-play UFC fantasy prediction platform. Users can make predictions on upcoming UFC fights, earn points based on correct predictions, and compete on leaderboards. This is NOT a gambling or betting service. No real money is wagered, won, or lost.</>,
    ],
  },
  {
    heading: '3. Eligibility',
    paragraphs: [
      <>You must be at least 18 years old to use the Service. By using the Service, you represent and warrant that you meet this age requirement.</>,
    ],
  },
  {
    heading: '4. User Accounts',
    items: [
      'You are responsible for maintaining the confidentiality of your account credentials.',
      'You are responsible for all activities that occur under your account.',
      'You agree to provide accurate and complete information when creating your account.',
      "You may not create multiple accounts or use someone else's account without permission.",
      'We reserve the right to suspend or terminate accounts that violate these terms.',
    ],
  },
  {
    heading: '5. User Conduct',
    paragraphs: [<>You agree not to:</>],
    items: [
      'Use the Service for any illegal purpose',
      'Harass, abuse, or harm other users',
      'Use offensive, vulgar, or inappropriate usernames',
      'Attempt to manipulate scores, leaderboards, or game mechanics',
      'Use automated scripts, bots, or other software to interact with the Service',
      "Attempt to gain unauthorized access to other users' accounts or our systems",
      'Interfere with the proper functioning of the Service',
    ],
  },
  {
    heading: '6. Intellectual Property',
    paragraphs: [
      <>The Service and its original content, features, and functionality are owned by 10-8.gg and are protected by copyright, trademark, and other intellectual property laws. UFC, fighter names, and related trademarks are the property of Zuffa, LLC and are used for informational purposes only.</>,
    ],
  },
  {
    heading: '7. Disclaimer of Warranties',
    disclaimer: true,
    paragraphs: [
      <>THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. FIGHT INFORMATION, STATISTICS, AND ODDS DISPLAYED ARE FOR ENTERTAINMENT PURPOSES ONLY AND MAY NOT BE ACCURATE.</>,
    ],
  },
  {
    heading: '8. Limitation of Liability',
    disclaimer: true,
    paragraphs: [
      <>TO THE MAXIMUM EXTENT PERMITTED BY LAW, 10-8.GG SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED $100.</>,
    ],
  },
  {
    heading: '9. Groups and Private Leagues',
    items: [
      'Users may create and join private groups to compete with friends.',
      'Group creators are responsible for sharing invite codes appropriately.',
      'We are not responsible for any disputes between group members.',
      'Groups are for entertainment purposes only – no gambling or wagering is permitted.',
    ],
  },
  {
    heading: '10. Modifications to Service',
    paragraphs: [
      <>We reserve the right to modify, suspend, or discontinue the Service at any time without notice. We may also modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the modified Terms.</>,
    ],
  },
  {
    heading: '11. Termination',
    paragraphs: [
      <>We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including breach of these Terms.</>,
    ],
  },
  {
    heading: '12. Governing Law',
    paragraphs: [
      <>These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.</>,
    ],
  },
  {
    heading: '13. Contact Us',
    paragraphs: [
      <>If you have questions about these Terms of Service, please contact us at:</>,
      <>
        Email:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="legal__contact-email">
          {CONTACT_EMAIL}
        </a>
      </>,
    ],
  },
];

const TermsPage: React.FC = () => (
  <LegalPage
    title="Terms of Service"
    updated="January 8, 2026"
    sections={sections}
    pageTitle="Terms of Service — 10-8"
    metaDescription="Read the Terms of Service for 10-8.gg, the free-to-play UFC fantasy prediction platform. Eligibility, user conduct, intellectual property, and more."
    canonical="https://www.10-8.gg/terms/"
  />
);

export default TermsPage;
