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

  const API_BASE = import.meta.env.VITE_API_BASE_URL;


  /* ================= FETCH LISTING ================= */
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/listing/get/${id}`,
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
  const perDayPrice = Math.round(price / 21);
  const perWeekendPrice = Math.round(price / 12);

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
                  ₹ {perWeekendPrice.toLocaleString()} / day for weekends
                </p>
                <p className="text-gray-500">
                  ₹ {perDayPrice.toLocaleString()} / day for Weekdays
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

//Some error in Routing
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { motion } from 'framer-motion';

// const Listing = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { currentUser } = useSelector((state) => state.user);

//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [currentImage, setCurrentImage] = useState(0);

//   /* ================= FETCH ================= */
//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:4000/api/listing/get/${id}`,
//           { credentials: 'include' }
//         );
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.message);
//         setListing(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchListing();
//   }, [id]);

//   /* ================= CTA ================= */
//   const handleContactClick = () => {
//     if (!currentUser) {
//       navigate('/sign-in', {
//         state: { message: 'Login to contact owner' },
//       });
//     } else {
//       navigate(`/contact-details/${id}`);
//     }
//   };

//   if (loading)
//     return <p className="text-center mt-24 text-gray-500">Loading…</p>;
//   if (error)
//     return <p className="text-center mt-24 text-red-500">{error}</p>;

//   const price = listing.offer ? listing.discountPrice : listing.regularPrice;
//   const perDayPrice = Math.round(price / 30);

//   return (
//     <div className="bg-slate-50 min-h-screen">

//       {/* ================= HERO GALLERY ================= */}
//       <section className="relative">
//         <motion.img
//           key={currentImage}
//           initial={{ opacity: 0.8, scale: 1.03 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6 }}
//           src={listing.imageUrls[currentImage]}
//           className="h-[520px] w-full object-cover"
//           alt="listing"
//         />

//         {/* overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

//         {/* arrows */}
//         <button
//           onClick={() =>
//             setCurrentImage(
//               currentImage === 0
//                 ? listing.imageUrls.length - 1
//                 : currentImage - 1
//             )
//           }
//           className="absolute left-6 top-1/2 -translate-y-1/2
//           bg-white/80 backdrop-blur p-3 rounded-full shadow"
//         >
//           ◀
//         </button>

//         <button
//           onClick={() =>
//             setCurrentImage(
//               currentImage === listing.imageUrls.length - 1
//                 ? 0
//                 : currentImage + 1
//             )
//           }
//           className="absolute right-6 top-1/2 -translate-y-1/2
//           bg-white/80 backdrop-blur p-3 rounded-full shadow"
//         >
//           ▶
//         </button>

//         {/* title overlay */}
//         <div className="absolute bottom-10 left-10 text-white max-w-xl">
//           <h1 className="text-4xl font-bold">{listing.name}</h1>
//           <p className="mt-2 text-white/90">📍 {listing.address}</p>
//         </div>
//       </section>

//       {/* ================= CONTENT ================= */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-[1.2fr_0.8fr] gap-16"
//       >

//         {/* LEFT */}
//         <div className="space-y-10">

//           {/* thumbnails */}
//           <div className="flex gap-4 overflow-x-auto">
//             {listing.imageUrls.map((img, i) => (
//               <img
//                 key={i}
//                 src={img}
//                 onClick={() => setCurrentImage(i)}
//                 className={`h-24 w-36 object-cover rounded-xl cursor-pointer
//                 border-2 transition
//                 ${currentImage === i
//                   ? 'border-slate-800'
//                   : 'border-transparent hover:border-slate-400'
//                 }`}
//               />
//             ))}
//           </div>

//           {/* features */}
//           <div className="flex flex-wrap gap-4">
//             <Feature label={`${listing.bedrooms} Bedrooms`} icon="🛏" />
//             <Feature label={`${listing.bathrooms} Bathrooms`} icon="🛁" />
//             {listing.parking && <Feature label="Parking" icon="🚗" />}
//             {listing.furnished && <Feature label="Furnished" icon="🛋" />}
//           </div>

//           {/* description */}
//           <div>
//             <h2 className="text-xl font-semibold mb-3">About this property</h2>
//             <p className="text-gray-700 leading-relaxed text-lg">
//               {listing.description}
//             </p>
//           </div>
//         </div>

//         {/* RIGHT CARD */}
//         <div className="bg-white border rounded-3xl shadow-lg p-10 h-fit sticky top-24 space-y-8">

//           {/* badge */}
//           <span
//             className={`inline-block px-4 py-1 rounded-full text-white text-sm font-medium
//             ${listing.type === 'rent' ? 'bg-green-600' : 'bg-red-600'}`}
//           >
//             {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
//           </span>

//           {/* price */}
//           <div>
//             {listing.type === 'sell' ? (
//               <p className="text-3xl font-bold">
//                 ₹ {price.toLocaleString()}
//               </p>
//             ) : (
//               <>
//                 <p className="text-3xl font-bold">
//                   ₹ {price.toLocaleString()}
//                   <span className="text-base font-normal text-gray-500">
//                     {' '} / month
//                   </span>
//                 </p>
//                 <p className="text-gray-500 mt-1">
//                   ₹ {perDayPrice.toLocaleString()} / day (weekends)
//                 </p>
//               </>
//             )}
//           </div>

//           {/* CTA */}
//           <button
//             onClick={handleContactClick}
//             className="w-full bg-slate-900 text-white py-4 rounded-2xl
//             text-lg font-medium shadow-lg
//             hover:-translate-y-0.5 hover:shadow-xl transition"
//           >
//             {listing.type === 'sell' ? 'Contact Owner' : 'Book Now'}
//           </button>

//           {/* login message */}
//           {location.state?.message && (
//             <p className="text-sm text-red-500 text-center">
//               {location.state.message}
//             </p>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// const Feature = ({ icon, label }) => (
//   <div className="flex items-center gap-2 bg-white border rounded-xl px-4 py-2 shadow-sm">
//     <span className="text-lg">{icon}</span>
//     <span className="text-sm font-medium text-gray-700">{label}</span>
//   </div>
// );

// export default Listing;



