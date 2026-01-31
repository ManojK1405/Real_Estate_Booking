import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const faqs = [
  {
    question: 'What is ♾️ Villas?',
    answer:
      '♾️ Villas is a modern real estate platform designed to help users discover premium homes, villas, and apartments for rent or sale through a clean and intuitive experience.',
  },
  {
    question: 'Is ♾️ Villas free to use?',
    answer:
      'Yes. Browsing listings, searching properties, and contacting owners are completely free for users.',
  },
  {
    question: 'How do I contact a property owner?',
    answer:
      'You can contact the owner directly from the listing page. You need to be logged in to view contact details for security reasons.',
  },
  {
    question: 'Can I list my own property?',
    answer:
      'Absolutely. Once logged in, you can create, update, and manage your own listings directly from your profile.',
  },
  {
    question: 'How accurate are the listings?',
    answer:
      'Listings are created and managed by verified users. We encourage honest representation and provide tools to report inaccurate listings.',
  },
  {
    question: 'Does ♾️ Villas support rentals and sales?',
    answer:
      'Yes. ♾️ Villas supports both rental properties and properties for sale, with advanced filters to help you find exactly what you need.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold text-slate-800"
        >
          Frequently Asked Questions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Everything you need to know about ♾️ Villas — clearly explained,
          transparently answered.
        </motion.p>
      </section>

      {/* ================= FAQ LIST ================= */}
      <section className="max-w-4xl mx-auto px-6 pb-28">
        <div className="space-y-6">

          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white border rounded-2xl shadow-sm"
            >
              <button
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center
                px-6 py-5 text-left"
              >
                <span className="text-lg font-medium text-slate-800">
                  {faq.question}
                </span>

                <span
                  className={`text-xl transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

        </div>
      </section>
    </div>
  );
};

export default FAQ;
