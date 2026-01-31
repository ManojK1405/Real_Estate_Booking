import React from 'react';
import { motion } from 'framer-motion';

const ContactSupport = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* HEADER */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
            Contact & Support
          </h1>
          <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
            Need help, have questions, or want to partner with us?
            We’re here to make your experience with <strong>♾️ Infinity Villas</strong> seamless.
          </p>
        </div>

        {/* CONTENT GRID */}
        <div className="grid md:grid-cols-2 gap-14">

          {/* CONTACT INFO */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white border rounded-3xl p-10 shadow-sm space-y-8"
          >
            <h2 className="text-2xl font-semibold text-slate-800">
              Get in Touch
            </h2>

            <InfoItem icon="📧" title="Email">
              support@infinityvillas.com
            </InfoItem>

            <InfoItem icon="📞" title="Phone">
              +91 73873 50403
            </InfoItem>

            <InfoItem icon="📍" title="Office">
              Pune, Maharashtra, India
            </InfoItem>

            <div className="pt-4">
              <p className="text-sm text-gray-500">
                Our support team is available Monday to Saturday,
                9:00 AM – 6:00 PM IST.
              </p>
            </div>
          </motion.div>

          {/* SUPPORT FORM */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white border rounded-3xl p-10 shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-slate-800 mb-8">
              Send Us a Message
            </h2>

            <form className="space-y-6">
              <Input label="Your Name" placeholder="Enter your full name" />
              <Input label="Email Address" placeholder="you@example.com" />
              <Textarea label="Message" placeholder="How can we help you?" />

              <button
                type="button"
                className="w-full bg-slate-800 text-white py-4 rounded-2xl
                font-medium hover:opacity-90 transition"
              >
                Submit Message
              </button>
            </form>
          </motion.div>
        </div>

        {/* FOOTER NOTE */}
        <div className="text-center mt-24 text-gray-500 text-sm">
          © {new Date().getFullYear()} ♾️ Infinity Villas · Designed with care for premium living
        </div>
      </motion.div>
    </div>
  );
};

/* ================= REUSABLE UI ================= */

const InfoItem = ({ icon, title, children }) => (
  <div className="flex items-start gap-4">
    <span className="text-2xl">{icon}</span>
    <div>
      <p className="font-medium text-slate-700">{title}</p>
      <p className="text-gray-600">{children}</p>
    </div>
  </div>
);

const Input = ({ label, placeholder }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-600">
      {label}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full border rounded-xl px-4 py-3
      focus:outline-none focus:ring-2 focus:ring-slate-400"
    />
  </div>
);

const Textarea = ({ label, placeholder }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-600">
      {label}
    </label>
    <textarea
      placeholder={placeholder}
      rows={5}
      className="w-full border rounded-xl px-4 py-3
      resize-none focus:outline-none focus:ring-2 focus:ring-slate-400"
    />
  </div>
);

export default ContactSupport;
