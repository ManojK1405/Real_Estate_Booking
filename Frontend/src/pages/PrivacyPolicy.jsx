import React from 'react';
import { motion } from 'framer-motion';
import Section from '../components/Section';

const PrivacyPolicy = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
            Privacy Policy
          </h1>
          <p className="mt-5 text-lg text-gray-600">
            Your privacy matters to us at <strong>♾️ Infinity Villas</strong>.
          </p>
        </div>

        {/* CONTENT */}
        <div className="bg-white border rounded-3xl shadow-sm p-10 space-y-10">

          <Section title="1. Introduction">
            We at <strong>Infinity Villas</strong> respect your privacy and are
            committed to protecting your personal information. This Privacy
            Policy explains how we collect, use, and safeguard your data.
          </Section>

          <Section title="2. Information We Collect">
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal details such as name and email address</li>
              <li>Account and listing information you provide</li>
              <li>Usage data to improve platform performance</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            Your information is used to:
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Provide and improve our services</li>
              <li>Facilitate property listings and inquiries</li>
              <li>Communicate important updates and support messages</li>
            </ul>
          </Section>

          <Section title="4. Data Security">
            We implement industry-standard security measures to protect your
            data. However, no method of transmission over the internet is 100%
            secure.
          </Section>

          <Section title="5. Cookies & Tracking">
            Infinity Villas may use cookies to enhance user experience, analyze
            traffic, and personalize content. You can control cookie settings
            through your browser.
          </Section>

          <Section title="6. Third-Party Services">
            We may share limited information with trusted third-party services
            (such as payment or image hosting providers) strictly for platform
            functionality.
          </Section>

          <Section title="7. Your Rights">
            You have the right to access, update, or delete your personal
            information. You may also request clarification on how your data is
            used.
          </Section>

          <Section title="8. Changes to This Policy">
            We may update this Privacy Policy periodically. Any changes will be
            reflected on this page with an updated revision date.
          </Section>

          <Section title="9. Contact Us">
            If you have any questions about this Privacy Policy, please contact
            us at <strong>support@infinityvillas.com</strong>.
          </Section>

        </div>

        {/* FOOTER */}
        <div className="text-center mt-16 text-sm text-gray-500">
          © {new Date().getFullYear()} ♾️ Infinity Villas · Your trust, our priority
        </div>
      </motion.div>
    </div>
  );
};


export default PrivacyPolicy;
