import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold text-slate-800"
        >
          Redefining the Way You
          <span className="block text-slate-600 mt-2">
            Discover Homes
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto"
        >
          ♾️ Villas is a thoughtfully designed real estate platform that blends
          technology, simplicity, and elegance to help you find spaces that truly feel like home.
        </motion.p>
      </section>

      {/* ================= STORY ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold text-slate-800 mb-6">
            Our Philosophy
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We believe finding a home should feel inspiring — not overwhelming.
            That’s why ∞ Villas focuses on clean design, intuitive search, and
            meaningful experiences rather than clutter and noise.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Every interaction is crafted with intention, ensuring users feel
            confident, comfortable, and empowered while exploring properties.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl border shadow-sm p-10"
        >
          <ul className="space-y-6 text-gray-700">
            <li className="flex gap-3">
              <span className="text-xl">🏡</span>
              <span>Carefully curated listings</span>
            </li>
            <li className="flex gap-3">
              <span className="text-xl">⚡</span>
              <span>Fast, intuitive search experience</span>
            </li>
            <li className="flex gap-3">
              <span className="text-xl">🎨</span>
              <span>Design-first, user-focused interface</span>
            </li>
            <li className="flex gap-3">
              <span className="text-xl">🔒</span>
              <span>Secure & transparent interactions</span>
            </li>
          </ul>
        </motion.div>
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-3 gap-10 text-center">

          {[
            { label: 'Curated Properties', value: '500+' },
            { label: 'Cities Covered', value: '20+' },
            { label: 'Happy Users', value: '1K+' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p className="text-4xl font-bold text-slate-800">
                {stat.value}
              </p>
              <p className="mt-2 text-gray-600">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CLOSING ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold text-slate-800"
        >
          Designed with Purpose.
          <span className="block text-slate-600 mt-2">
            Built with Passion.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-gray-600 max-w-2xl mx-auto"
        >
          ∞ Villas isn’t just a real estate platform —
          it’s a carefully crafted digital experience built
          for people who appreciate quality and clarity.
        </motion.p>
      </section>
    </div>
  );
};

export default About;
