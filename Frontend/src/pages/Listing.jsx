import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Listing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImage, setCurrentImage] = useState(0);

  /* ================= FETCH LISTING ================= */
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/listing/get/${id}`,
          { credentials: 'include' }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setListing(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  /* ================= CTA HANDLER ================= */
  const handleContactClick = () => {
    if (!currentUser) {
      navigate('/sign-in', {
        state: { message: 'Login to contact owner' },
      });
    } else {
      navigate(`/contact-details/${id}`, {
        state: { listingId: listing?._id },
      });
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  const price = listing.offer ? listing.discountPrice : listing.regularPrice;
  const perDayPrice = Math.round(price / 30);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* LOGIN MESSAGE */}
      {location.state?.message && (
        <p className="text-red-500 text-center mb-6">
          {location.state.message}
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-8">

        {/* ================= IMAGE SECTION ================= */}
        <div>
          <div className="relative h-105 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={listing.imageUrls[currentImage]}
              alt="listing"
              className="w-full h-full object-cover"
            />

            <button
              onClick={() =>
                setCurrentImage(
                  currentImage === 0
                    ? listing.imageUrls.length - 1
                    : currentImage - 1
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 
              bg-white/70 backdrop-blur p-3 rounded-full shadow"
            >
              ◀
            </button>

            <button
              onClick={() =>
                setCurrentImage(
                  currentImage === listing.imageUrls.length - 1
                    ? 0
                    : currentImage + 1
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 
              bg-white/70 backdrop-blur p-3 rounded-full shadow"
            >
              ▶
            </button>
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {listing.imageUrls.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setCurrentImage(i)}
                className={`h-20 w-28 object-cover rounded-lg cursor-pointer border-2
                ${currentImage === i ? 'border-slate-700' : 'border-transparent'}
                `}
              />
            ))}
          </div>
        </div>

        {/* ================= DETAILS ================= */}
        <div className="space-y-6">

          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">{listing.name}</h1>
            <span
              className={`px-4 py-1 rounded-full text-white text-sm font-medium
              ${listing.type === 'rent' ? 'bg-green-600' : 'bg-red-600'}`}
            >
              {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
            </span>
          </div>

          <p className="text-gray-500">{listing.address}</p>

          {/* PRICE CARD */}
          <div className="bg-slate-50 border rounded-xl p-5 shadow-sm">
            {listing.type === 'sell' ? (
              <p className="text-3xl font-bold">
                ₹ {price.toLocaleString()}
              </p>
            ) : (
              <>
                <p className="text-2xl font-semibold">
                  ₹ {price.toLocaleString()} / month
                </p>
                <p className="text-gray-500">
                  ₹ {perDayPrice.toLocaleString()} / day for weekends
                </p>
              </>
            )}
          </div>

          {/* FEATURES (ICONS SAFE ✅) */}
          <div className="flex flex-wrap gap-6 text-gray-700 text-lg">
            <span className="flex items-center gap-2">
              🛏 <strong>{listing.bedrooms}</strong> Beds
            </span>

            <span className="flex items-center gap-2">
              🛁 <strong>{listing.bathrooms}</strong> Baths
            </span>

            {listing.parking && (
              <span className="flex items-center gap-2">
                🚗 Parking
              </span>
            )}

            {listing.furnished && (
              <span className="flex items-center gap-2">
                🛋 Furnished
              </span>
            )}
          </div>

          {/* DESCRIPTION */}
          <p className="font-sans text-lg leading-relaxed font-semibold text-black">
            {listing.description}
          </p>

          {/* CTA */}
          <button
            onClick={handleContactClick}
            className="w-full md:w-auto bg-linear-to-r from-slate-700 to-slate-900
            text-white px-10 py-4 rounded-xl text-lg font-medium shadow-lg
            hover:scale-[1.02] transition"
          >
            {listing.type === 'sell' ? 'Contact Owner' : 'Book Now'}
          </button>

        </div>
      </div>
    </div>
  );
};

export default Listing;
