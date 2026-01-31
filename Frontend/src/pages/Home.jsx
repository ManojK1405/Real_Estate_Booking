import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import ListingCard from '../components/ListingCard';

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const offerRes = await fetch(
          'http://localhost:4000/api/listing/get?offer=true&limit=4'
        );
        setOfferListings(await offerRes.json());

        const rentRes = await fetch(
          'http://localhost:4000/api/listing/get?type=rent&limit=4'
        );
        setRentListings(await rentRes.json());

        const saleRes = await fetch(
          'http://localhost:4000/api/listing/get?type=sell&limit=4'
        );
        setSaleListings(await saleRes.json());
      } catch (err) {
        console.log(err);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="bg-slate-50">

      {/* ================= HERO ================= */}
<section className="bg-slate-50">
  <div className="max-w-7xl mx-auto px-6 py-24 text-center">

    <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 leading-tight">
      Discover Your Next
      <span className="block text-slate-600 mt-2">
        Dream Home with ♾️ Villas
      </span>
    </h1>

    <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
      Explore handpicked villas, apartments, and homes for rent or sale —
      thoughtfully curated for comfort, elegance, and lifestyle.
    </p>

    <div className="mt-10 flex justify-center gap-4">
      <a
        href="/search"
        className="bg-slate-800 text-white px-8 py-4 rounded-2xl
        font-medium shadow hover:opacity-90 transition"
      >
        Browse Listings
      </a>

      <a
        href="/about"
        className="bg-white border px-8 py-4 rounded-2xl
        font-medium text-slate-700 hover:bg-slate-100 transition"
      >
        About Us
      </a>
    </div>
  </div>
</section>



      {/* ================= SWIPER ================= */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop
          className="rounded-3xl overflow-hidden"
        >
          {[...offerListings, ...rentListings, ...saleListings]
            .slice(0, 5)
            .map((listing) => (
              <SwiperSlide key={listing._id}>
                <img
                  src={listing.imageUrls[0]}
                  alt={listing.name}
                  className="h-[400px] w-full object-cover"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </section>

      {/* ================= LISTING SECTIONS ================= */}
      <section className="max-w-7xl mx-auto px-6 space-y-20 pb-20">

        {/* OFFERS */}
        {offerListings.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              🔥 Recent Offers
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {offerListings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {/* RENT */}
        {rentListings.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              🏠 Places for Rent
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {rentListings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {/* SALE */}
        {saleListings.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              💰 Places for Sale
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {saleListings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
