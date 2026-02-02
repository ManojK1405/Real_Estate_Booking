import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import ListingCard from '../components/ListingCard';

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // 🔥 Cloudinary optimizer
  const optimizeImage = (url, width = 1200) => {
    if (!url?.includes('cloudinary')) return url;
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
  };

  // 🚀 Parallel fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [offerRes, rentRes, saleRes] = await Promise.all([
          fetch(`${API_BASE}/api/listing/get?offer=true&limit=4`),
          fetch(`${API_BASE}/api/listing/get?type=rent&limit=4`),
          fetch(`${API_BASE}/api/listing/get?type=sell&limit=4`),
        ]);

        setOfferListings(await offerRes.json());
        setRentListings(await rentRes.json());
        setSaleListings(await saleRes.json());
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // 🎯 Optimized swiper data
  const swiperListings = useMemo(
    () =>
      offerListings.slice(0, 2)
        .concat(rentListings.slice(0, 2))
        .concat(saleListings.slice(0, 2)),
    [offerListings, rentListings, saleListings]
  );

  return (
    <div className="bg-slate-50">

{/* ================= HERO ================= */}
<section className="relative overflow-hidden">
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-slate-200/40 blur-3xl" />
    <div className="absolute top-40 -left-32 h-[360px] w-[360px] rounded-full bg-slate-300/30 blur-3xl" />
  </div>

  <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-sm uppercase tracking-widest text-slate-500 mb-6"
    >
      Premium Real Estate Platform
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-5xl sm:text-6xl font-bold text-slate-900"
    >
      Discover Homes That
      <span className="block mt-2 text-slate-600">
        Feel Instantly Right
      </span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="mt-8 text-lg text-gray-600 max-w-2xl mx-auto"
    >
      ♾️ Villas blends clarity, aesthetics, and performance to help
      people find places they truly belong.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="mt-12 flex justify-center gap-5"
    >
      <a href="/search" className="bg-slate-900 text-white px-10 py-4 rounded-2xl shadow-lg">
        Explore Listings
      </a>
      <a href="/about" className="px-10 py-4 rounded-2xl border text-slate-700">
        Our Philosophy
      </a>
    </motion.div>
  </div>
</section>

{/* ================= SWIPER ================= */}
<section className="w-full py-16 bg-white">
  <Swiper
    modules={[Autoplay]}
    autoplay={{ delay: 3500, disableOnInteraction: false }}
    loop
    className="h-[420px]"
  >
    {swiperListings.map((listing) => (
      <SwiperSlide key={listing._id}>
        <div className="relative h-full w-full">
          <img
            src={optimizeImage(listing.imageUrls[0], 1400)}
            alt={listing.name}
            loading="eager"
            fetchpriority="high"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

          <div className="absolute bottom-8 left-8 text-white">
            <h3 className="text-2xl font-semibold">{listing.name}</h3>
            <p className="text-sm">📍 {listing.address}</p>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>

{/* ================= LISTINGS ================= */}
<section className="max-w-7xl mx-auto px-6 py-24 space-y-24">

  {offerListings.length > 0 && (
    <Section title="🔥 Recent Offers">
      {offerListings.map((l) => (
        <ListingCard key={l._id} listing={l} />
      ))}
    </Section>
  )}

  {rentListings.length > 0 && (
    <Section title="🏠 Places for Rent">
      {rentListings.map((l) => (
        <ListingCard key={l._id} listing={l} />
      ))}
    </Section>
  )}

  {saleListings.length > 0 && (
    <Section title="💰 Places for Sale">
      {saleListings.map((l) => (
        <ListingCard key={l._id} listing={l} />
      ))}
    </Section>
  )}

</section>
</div>
);
};

// 🔹 Reusable section wrapper
const Section = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-2xl font-semibold mb-6">{title}</h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {children}
    </div>
  </motion.div>
);

export default Home;
