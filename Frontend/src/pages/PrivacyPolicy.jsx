import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-6"
      >
        <div className="bg-white border rounded-3xl p-10 shadow-sm space-y-12">

          {/* HEADER */}
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Privacy Policy
            </h1>
            <p className="mt-4 text-gray-600">
              Your privacy matters to us. This policy explains how we
              collect, use, and protect your information.
            </p>
          </div>

          {/* SECTION 1 */}
          <Section title="1. Information We Collect">
            <p className="text-gray-600 leading-relaxed">
              We may collect personal information when you use our platform,
              create listings, or communicate with us.
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Name, email address, and contact details</li>
              <li>Property information you submit</li>
              <li>Usage and interaction data</li>
            </ul>
          </Section>

          {/* SECTION 2 */}
          <Section title="2. How We Use Your Information">
            <p className="text-gray-600 leading-relaxed">
              The information we collect is used to:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Provide and improve our services</li>
              <li>Display property listings</li>
              <li>Ensure platform security</li>
              <li>Communicate important updates</li>
            </ul>
          </Section>

          {/* SECTION 3 */}
          <Section title="3. Data Protection">
            <p className="text-gray-600 leading-relaxed">
              We take reasonable measures to protect your data from
              unauthorized access, misuse, or disclosure.
            </p>
          </Section>

          {/* SECTION 4 */}
          <Section title="4. Third-Party Services">
            <p className="text-gray-600 leading-relaxed">
              We may use trusted third-party services (such as image hosting
              or analytics tools) that process data on our behalf.
            </p>
          </Section>

          {/* SECTION 5 */}
          <Section title="5. Your Rights">
            <p className="text-gray-600 leading-relaxed">
              You have the right to access, update, or delete your personal
              information. Contact us if you wish to exercise these rights.
            </p>
          </Section>

          {/* FOOTER */}
          <div className="pt-6 border-t">
            <p className="text-sm text-gray-500">
              Last updated: November 2025
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

/* ================= SECTION COMPONENT ================= */

const Section = ({ title, children }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-slate-800">
      {title}
    </h2>
    {children}
  </div>
);

export default PrivacyPolicy;
