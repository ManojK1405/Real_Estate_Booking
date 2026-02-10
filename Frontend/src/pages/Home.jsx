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

  /* ================= IMAGE OPTIMIZER ================= */
  const optimizeImage = (url, width = 1200) => {
    if (!url?.includes('cloudinary')) return url;
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
  };

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [offerRes, rentRes, saleRes] = await Promise.all([
          fetch(`${API_BASE}/api/listing/get?offer=true&limit=4`),
          fetch(`${API_BASE}/api/listing/get?type=rent&limit=4`),
          fetch(`${API_BASE}/api/listing/get?type=sell&limit=4`)
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

  /* ================= SWIPER DATA ================= */
  const swiperListings = useMemo(
    () =>
      offerListings.slice(0, 2)
        .concat(rentListings.slice(0, 2))
        .concat(saleListings.slice(0, 2)),
    [offerListings, rentListings, saleListings]
  );

  const enableLoop = swiperListings.length >= 4;

  return (
    <div className="bg-slate-50">

{/* ================= HERO ================= */}
<section className="relative overflow-hidden">
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-slate-200/40 blur-3xl" />
    <div className="absolute top-40 -left-32 h-[360px] w-[360px] rounded-full bg-slate-300/30 blur-3xl" />
  </div>

  <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-5xl sm:text-6xl font-bold text-slate-900"
    >
      Discover Homes That
      <span className="block mt-2 text-slate-600">Feel Instantly Right</span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mt-8 text-lg text-gray-600 max-w-2xl mx-auto"
    >
      ♾️ Villas blends aesthetics and performance to help you find
      a place you truly belong.
    </motion.p>
  </div>
</section>

{/* ================= SWIPER ================= */}
<section className="w-full py-16 bg-white">
  {swiperListings.length > 0 && (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      loop={enableLoop}
      className="h-[420px]"
    >
      {swiperListings.map((listing, index) => (
        <SwiperSlide key={`${listing._id}-${index}`}>
          <div className="relative h-full w-full">
            <img
              src={optimizeImage(listing.imageUrls[0], 1400)}
              alt={listing.name}
              loading="eager"
              fetchPriority="high"
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
  )}
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

/* ================= SECTION COMPONENT ================= */
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
