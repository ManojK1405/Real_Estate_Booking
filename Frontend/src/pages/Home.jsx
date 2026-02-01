import { useEffect, useState } from 'react';
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


  useEffect(() => {
    const fetchData = async () => {
      const offer = await fetch(
        `${API_BASE}/api/listing/get?offer=true&limit=4`
      );
      const rent = await fetch(
        `${API_BASE}/api/listing/get?type=rent&limit=4`
      );
      const sale = await fetch(
        `${API_BASE}/api/listing/get?type=sell&limit=4`
      );

      setOfferListings(await offer.json());
      setRentListings(await rent.json());
      setSaleListings(await sale.json());
    };

    fetchData();
  }, []);

  return (
    <div className="bg-slate-50">


{/* ================= HERO ================= */}
<section className="relative bg-slate-50 overflow-hidden">
  
  {/* subtle background accent */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-slate-200/40 blur-3xl" />
    <div className="absolute top-40 -left-32 h-[360px] w-[360px] rounded-full bg-slate-300/30 blur-3xl" />
  </div>

  <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">

    {/* eyebrow */}
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-sm uppercase tracking-widest text-slate-500 mb-6"
    >
      Premium Real Estate Platform
    </motion.p>

    {/* headline */}
    <motion.h1
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-5xl sm:text-6xl font-bold text-slate-900 leading-tight"
    >
      Discover Homes That
      <span className="block mt-2 text-slate-600">
        Feel Instantly Right
      </span>
    </motion.h1>

    {/* subtext */}
    <motion.p
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="mt-8 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
    >
      ♾️ Villas is a thoughtfully designed real estate experience —
      blending clarity, aesthetics, and performance to help people
      find places they truly belong.
    </motion.p>

    {/* actions */}
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="mt-12 flex justify-center gap-5"
    >
      <a
        href="/search"
        className="bg-slate-900 text-white px-10 py-4 rounded-2xl
        font-medium shadow-lg hover:-translate-y-0.5
        hover:shadow-xl transition"
      >
        Explore Listings
      </a>

      <a
        href="/about"
        className="px-10 py-4 rounded-2xl border
        font-medium text-slate-700 hover:bg-slate-100 transition"
      >
        Our Philosophy
      </a>
    </motion.div>

  </div>
</section>


      {/* ================= FULL WIDTH SWIPER ================= */}
      <section className="w-full py-16 bg-white">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
          className="h-[420px]"
        >
          {[...offerListings, ...rentListings, ...saleListings]
            .slice(0, 6)
            .map((listing) => (
              <SwiperSlide key={listing._id}>
                <div className="relative h-full w-full">
                  <img
                    src={listing.imageUrls[0]}
                    alt={listing.name}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t
                    from-black/40 via-black/10 to-transparent" />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute bottom-8 left-8 text-white"
                  >
                    <h3 className="text-2xl font-semibold">
                      {listing.name}
                    </h3>
                    <p className="text-sm mt-1">
                      📍 {listing.address}
                    </p>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>

      {/* ================= LISTING SECTIONS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24 space-y-24">

        {/* OFFERS */}
        {offerListings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-6">
              🔥 Recent Offers
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {offerListings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </motion.div>
        )}

        {/* RENT */}
        {rentListings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-6">
              🏠 Places for Rent
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {rentListings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </motion.div>
        )}

        {/* SALE */}
        {saleListings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-6">
              💰 Places for Sale
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {saleListings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Home;
