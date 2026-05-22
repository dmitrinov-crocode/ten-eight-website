import React from 'react';
import LegalPage, { LegalSection } from './LegalPage';

const CONTACT_EMAIL = 'support@10-8.gg';

const sections: LegalSection[] = [
  {
    heading: 'Introduction',
    paragraphs: [
      <>10-8.gg (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our UFC fantasy prediction platform.</>,
    ],
  },
  {
    heading: 'Information We Collect',
    subsections: [
      {
        heading: 'Information You Provide',
        items: [
          <><strong>Account Information:</strong> When you sign up, we collect your email address, username, and profile picture (if using Google sign-in).</>,
          <><strong>Predictions:</strong> Your fight predictions and picks are stored to calculate scores and display on leaderboards.</>,
          <><strong>Groups:</strong> Information about groups you create or join, including group names and membership.</>,
        ],
      },
      {
        heading: 'Information Collected Automatically',
        items: [
          <><strong>Usage Data:</strong> We collect information about how you interact with our platform, including pages visited and features used.</>,
          <><strong>Device Information:</strong> Browser type, operating system, and device identifiers.</>,
          <><strong>Log Data:</strong> IP address, access times, and referring URLs.</>,
        ],
      },
    ],
  },
  {
    heading: 'How We Use Your Information',
    items: [
      'To provide and maintain our service',
      'To calculate and display your prediction scores and rankings',
      'To enable group features and leaderboards',
      'To communicate with you about your account or updates to our service',
      'To improve and optimize our platform',
      'To detect and prevent fraud or abuse',
    ],
  },
  {
    heading: 'Information Sharing',
    paragraphs: [
      <>We do not sell your personal information. We may share information in the following circumstances:</>,
    ],
    items: [
      <><strong>Public Leaderboards:</strong> Your username and scores may be visible to other users on leaderboards.</>,
      <><strong>Group Members:</strong> Your username and predictions may be visible to members of groups you join.</>,
      <><strong>Service Providers:</strong> We use third-party services (like Supabase for authentication and data storage, Vercel for hosting) that may process your data.</>,
      <><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights.</>,
    ],
  },
  {
    heading: 'Data Security',
    paragraphs: [
      <>We implement appropriate security measures to protect your information, including encryption in transit (HTTPS), secure authentication, and access controls. However, no method of transmission over the Internet is 100% secure.</>,
    ],
  },
  {
    heading: 'Your Rights',
    paragraphs: [<>You have the right to:</>],
    items: [
      'Access your personal data',
      'Correct inaccurate data',
      'Request deletion of your account and data',
      'Export your data',
    ],
  },
  {
    heading: 'Cookies',
    paragraphs: [
      <>We use essential cookies for authentication and session management. We do not use third-party tracking cookies for advertising purposes.</>,
    ],
  },
  {
    heading: "Children's Privacy",
    paragraphs: [
      <>Our service is not intended for users under 18 years of age. We do not knowingly collect information from children under 18.</>,
    ],
  },
  {
    heading: 'Changes to This Policy',
    paragraphs: [
      <>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &ldquo;Last updated&rdquo; date.</>,
    ],
  },
  {
    heading: 'Contact Us',
    paragraphs: [
      <>If you have questions about this Privacy Policy, please contact us at:</>,
      <>
        Email:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="legal__contact-email">
          {CONTACT_EMAIL}
        </a>
      </>,
    ],
  },
];

const PrivacyPage: React.FC = () => (
  <LegalPage
    title="Privacy Policy"
    updated="January 8, 2026"
    sections={sections}
    pageTitle="Privacy Policy — 10-8"
    metaDescription="How 10-8.gg collects, uses, and safeguards your information on the free-to-play UFC fantasy prediction platform. Your data, your rights, our commitments."
    canonical="https://www.10-8.gg/privacy/"
  />
);

export default PrivacyPage;
