import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InfoItem from '../components/InfoItem';
import Input from '../components/Input';
import Textarea from '../components/Textarea';

const ContactSupport = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;


  const isFormValid =
    name.trim() && email.trim() && message.trim();

  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      await fetch(`${API_BASE}/api/message/messageApp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      setName('');
      setEmail('');
      setMessage('');
      setSuccess(true);

      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error(err);
    }
  };

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

            <p className="text-sm text-gray-500 pt-4">
              Our support team is available Monday to Saturday,
              9:00 AM – 6:00 PM IST.
            </p>
          </motion.div>

          {/* SUPPORT FORM */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white border rounded-3xl p-10 shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-slate-800 mb-8">
              Send Us a Message
            </h2>

            {!success ? (
              <form className="space-y-6">
                <Input
                  label="Your Name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Input
                  label="Email Address"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Textarea
                  label="Message"
                  placeholder="How can we help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <button
                  type="button"
                  disabled={!isFormValid}
                  onClick={handleSubmit}
                  className="w-full bg-slate-800 text-white py-4 rounded-2xl
                  font-medium hover:opacity-90 transition
                  disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Message
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col items-center justify-center text-center py-14"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                  className="text-6xl mb-6"
                >
                  🎉
                </motion.div>

                <h3 className="text-2xl font-semibold text-slate-800 mb-2">
                  Message Sent Successfully!
                </h3>

                <p className="text-gray-600 max-w-sm">
                  Thanks for contacting Infinity Villas.
                  Our team will get back to you shortly.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* FOOTER */}
        <div className="text-center mt-24 text-gray-500 text-sm">
          © {new Date().getFullYear()} ♾️ Infinity Villas · Designed with care for premium living
        </div>
      </motion.div>
    </div>
  );
};

export default ContactSupport;
