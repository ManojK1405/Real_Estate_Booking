// import { useEffect, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import ListingCard from '../components/ListingCard';

// const LIMIT = 9;

// const Search = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   const [filters, setFilters] = useState({
//     type: 'all',
//     parking: false,
//     furnished: false,
//     offer: false,
//     sort: 'createdAt',
//     order: 'desc',
//   });

//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showLoadMore, setShowLoadMore] = useState(false);
//   const [showFiltersMobile, setShowFiltersMobile] = useState(false);

//   /* ================= SYNC URL → FILTER STATE ================= */
//   useEffect(() => {
//     setFilters({
//       type: searchParams.get('type') || 'all',
//       parking: searchParams.get('parking') === 'true',
//       furnished: searchParams.get('furnished') === 'true',
//       offer: searchParams.get('offer') === 'true',
//       sort: searchParams.get('sort') || 'createdAt',
//       order: searchParams.get('order') || 'desc',
//     });
//   }, [searchParams]);

//   /* ================= FETCH LISTINGS ================= */
//   const fetchListings = async (startIndex = 0) => {
//     setLoading(true);
//     try {
//       const params = new URLSearchParams(searchParams);
//       params.set('limit', LIMIT);
//       params.set('startIndex', startIndex);

//       const res = await fetch(
//         `http://localhost:4000/api/listing/get?${params.toString()}`
//       );
//       const data = await res.json();

//       if (startIndex === 0) {
//         setListings(data);
//       } else {
//         setListings((prev) => [...prev, ...data]);
//       }

//       setShowLoadMore(data.length === LIMIT);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchListings(0);
//   }, [searchParams]);

//   /* ================= APPLY FILTERS ================= */
//   const applyFilters = () => {
//     const params = new URLSearchParams();

//     if (filters.type !== 'all') params.set('type', filters.type);
//     if (filters.parking) params.set('parking', true);
//     if (filters.furnished) params.set('furnished', true);
//     if (filters.offer) params.set('offer', true);

//     params.set('sort', filters.sort);
//     params.set('order', filters.order);

//     navigate(`/search?${params.toString()}`);
//     setShowFiltersMobile(false);
//   };

//   return (
//     <div className="bg-slate-50 min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-[300px_1fr] gap-10">

//         {/* ================= MOBILE FILTER BUTTON ================= */}
//         <div className="md:hidden">
//           <button
//             onClick={() => setShowFiltersMobile(!showFiltersMobile)}
//             className="w-full bg-white border rounded-2xl py-3 font-medium shadow-sm"
//           >
//             Filters
//           </button>

//           {showFiltersMobile && (
//             <div className="mt-6 bg-white rounded-3xl border p-6 shadow-sm">
//               <FilterContent filters={filters} setFilters={setFilters} />
//               <button
//                 onClick={applyFilters}
//                 className="mt-6 w-full bg-slate-800 text-white py-3 rounded-2xl"
//               >
//                 Apply Filters
//               </button>
//             </div>
//           )}
//         </div>

//         {/* ================= DESKTOP FILTER SIDEBAR ================= */}
//         <aside className="hidden md:block bg-white rounded-3xl border shadow-sm p-8 h-fit sticky top-24">
//           <FilterContent filters={filters} setFilters={setFilters} />
//           <button
//             onClick={applyFilters}
//             className="mt-8 w-full bg-slate-800 text-white py-3 rounded-2xl"
//           >
//             Apply Filters
//           </button>
//         </aside>

//         {/* ================= RESULTS ================= */}
//         <section>
//           <h1 className="text-2xl font-semibold mb-8">
//             Listing Results
//           </h1>

//           {loading && listings.length === 0 && (
//             <p className="text-gray-500">Loading...</p>
//           )}

//           {!loading && listings.length === 0 && (
//             <p className="text-gray-500">No listings found.</p>
//           )}

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
//             {listings.map((listing) => (
//               <ListingCard key={listing._id} listing={listing} />
//             ))}
//           </div>

//           {showLoadMore && (
//             <div className="flex justify-center mt-12">
//               <button
//                 onClick={() => fetchListings(listings.length)}
//                 disabled={loading}
//                 className="px-8 py-3 bg-slate-800 text-white rounded-2xl font-medium"
//               >
//                 {loading ? 'Loading...' : 'Load More'}
//               </button>
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// /* ================= FILTER CONTENT ================= */
// const FilterContent = ({ filters, setFilters }) => {
//   return (
//     <div className="space-y-8">
//       <h2 className="text-xl font-semibold">Filters</h2>

//       {/* TYPE */}
//       <div>
//         <p className="text-sm font-medium text-gray-600 mb-2">
//           Listing Type
//         </p>
//         <select
//           value={filters.type}
//           onChange={(e) =>
//             setFilters({ ...filters, type: e.target.value })
//           }
//           className="w-full border rounded-xl px-4 py-3"
//         >
//           <option value="all">Rent & Sale</option>
//           <option value="rent">Rent</option>
//           <option value="sell">Sale</option>
//         </select>
//       </div>

//       {/* AMENITIES */}
//       <div className="space-y-3">
//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             checked={filters.parking}
//             onChange={(e) =>
//               setFilters({ ...filters, parking: e.target.checked })
//             }
//           />
//           Parking
//         </label>

//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             checked={filters.furnished}
//             onChange={(e) =>
//               setFilters({ ...filters, furnished: e.target.checked })
//             }
//           />
//           Furnished
//         </label>

//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             checked={filters.offer}
//             onChange={(e) =>
//               setFilters({ ...filters, offer: e.target.checked })
//             }
//           />
//           Offer
//         </label>
//       </div>

//       {/* SORT */}
//       <div>
//         <p className="text-sm font-medium text-gray-600 mb-2">
//           Sort By
//         </p>
//         <select
//           value={`${filters.sort}-${filters.order}`}
//           onChange={(e) => {
//             const [sort, order] = e.target.value.split('-');
//             setFilters({ ...filters, sort, order });
//           }}
//           className="w-full border rounded-xl px-4 py-3"
//         >
//           <option value="createdAt-desc">Latest</option>
//           <option value="regularPrice-asc">Price: Low to High</option>
//           <option value="regularPrice-desc">Price: High to Low</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default Search;


import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ListingCard from '../components/ListingCard';

const LIMIT = 9;

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc',
  });

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  /* ================= SYNC URL → FILTER STATE ================= */
  useEffect(() => {
    setFilters({
      type: searchParams.get('type') || 'all',
      parking: searchParams.get('parking') === 'true',
      furnished: searchParams.get('furnished') === 'true',
      offer: searchParams.get('offer') === 'true',
      sort: searchParams.get('sort') || 'createdAt',
      order: searchParams.get('order') || 'desc',
    });
  }, [searchParams]);

  /* ================= FETCH LISTINGS ================= */
  const fetchListings = async (startIndex = 0) => {
    setLoading(true);
    try {
      const params = new URLSearchParams(searchParams);
      params.set('limit', LIMIT);
      params.set('startIndex', startIndex);

      const res = await fetch(
        `http://localhost:4000/api/listing/get?${params.toString()}`
      );
      const data = await res.json();

      if (startIndex === 0) {
        setListings(data);
      } else {
        setListings((prev) => [...prev, ...data]);
      }

      setShowLoadMore(data.length === LIMIT);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings(0);
  }, [searchParams]);

  /* ================= APPLY FILTERS ================= */
  const applyFilters = () => {
    const params = new URLSearchParams();

    if (filters.type !== 'all') params.set('type', filters.type);
    if (filters.parking) params.set('parking', true);
    if (filters.furnished) params.set('furnished', true);
    if (filters.offer) params.set('offer', true);

    params.set('sort', filters.sort);
    params.set('order', filters.order);

    navigate(`/search?${params.toString()}`);
    setShowFiltersMobile(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-[320px_1fr] gap-12">

        {/* ================= MOBILE FILTER ================= */}
        <div className="md:hidden">
          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="w-full bg-white border rounded-2xl py-3 font-medium shadow-sm"
          >
            {showFiltersMobile ? 'Hide Filters' : 'Show Filters'}
          </button>

          {showFiltersMobile && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-white rounded-3xl border p-6 shadow-sm"
            >
              <FilterContent filters={filters} setFilters={setFilters} />
              <button
                onClick={applyFilters}
                className="mt-8 w-full bg-slate-800 text-white py-3 rounded-2xl"
              >
                Apply Filters
              </button>
            </motion.div>
          )}
        </div>

        {/* ================= DESKTOP FILTER ================= */}
        <aside className="hidden md:block bg-white rounded-3xl border shadow-sm p-8 h-fit sticky top-24">
          <FilterContent filters={filters} setFilters={setFilters} />
          <button
            onClick={applyFilters}
            className="mt-10 w-full bg-slate-800 text-white py-3 rounded-2xl"
          >
            Apply Filters
          </button>
        </aside>

        {/* ================= RESULTS ================= */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-2xl font-semibold">
              Property Results
            </h1>
            <span className="text-sm text-gray-500">
              {listings.length} listings
            </span>
          </div>

          {loading && listings.length === 0 && (
            <p className="text-gray-500">Loading properties...</p>
          )}

          {!loading && listings.length === 0 && (
            <p className="text-gray-500">No listings found.</p>
          )}

          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {listings.map((listing) => (
              <motion.div
                key={listing._id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <ListingCard listing={listing} />
              </motion.div>
            ))}
          </motion.div>

          {showLoadMore && (
            <div className="flex justify-center mt-14">
              <button
                onClick={() => fetchListings(listings.length)}
                disabled={loading}
                className="px-10 py-3 bg-slate-800 text-white rounded-2xl font-medium"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

/* ================= FILTER CONTENT ================= */
const FilterContent = ({ filters, setFilters }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Refine Search</h2>

      {/* TYPE */}
      <div>
        <label className="text-sm font-medium text-gray-600 mb-2 block">
          Listing Type
        </label>
        <select
          value={filters.type}
          onChange={(e) =>
            setFilters({ ...filters, type: e.target.value })
          }
          className="w-full border rounded-xl px-4 py-3"
        >
          <option value="all">Rent & Sale</option>
          <option value="rent">Rent</option>
          <option value="sell">Sale</option>
        </select>
      </div>

      {/* AMENITIES */}
      <div className="space-y-3">
        {[
          ['parking', 'Parking'],
          ['furnished', 'Furnished'],
          ['offer', 'Special Offers'],
        ].map(([key, label]) => (
          <label key={key} className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={filters[key]}
              onChange={(e) =>
                setFilters({ ...filters, [key]: e.target.checked })
              }
            />
            {label}
          </label>
        ))}
      </div>

      {/* SORT */}
      <div>
        <label className="text-sm font-medium text-gray-600 mb-2 block">
          Sort By
        </label>
        <select
          value={`${filters.sort}-${filters.order}`}
          onChange={(e) => {
            const [sort, order] = e.target.value.split('-');
            setFilters({ ...filters, sort, order });
          }}
          className="w-full border rounded-xl px-4 py-3"
        >
          <option value="createdAt-desc">Latest</option>
          <option value="regularPrice-asc">Price: Low to High</option>
          <option value="regularPrice-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default Search;
