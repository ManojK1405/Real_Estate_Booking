import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ListingCard from '../components/ListingCard.jsx';


const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc',
  });

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= SYNC URL → STATE ================= */
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      searchTerm: params.searchTerm || '',
      type: params.type || 'all',
      parking: params.parking === 'true',
      furnished: params.furnished === 'true',
      offer: params.offer === 'true',
      sort: params.sort || 'createdAt',
      order: params.order || 'desc',
    });
  }, [searchParams]);

  /* ================= FETCH LISTINGS ================= */
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams(searchParams).toString();
        const res = await fetch(
          `http://localhost:4000/api/listing/get?${query}`
        );
        const data = await res.json();
        setListings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [searchParams]);

  /* ================= APPLY FILTERS ================= */
  const applyFilters = () => {
    const params = new URLSearchParams();

    if (filters.searchTerm) params.set('searchTerm', filters.searchTerm);
    if (filters.type !== 'all') params.set('type', filters.type);
    if (filters.parking) params.set('parking', true);
    if (filters.furnished) params.set('furnished', true);
    if (filters.offer) params.set('offer', true);

    params.set('sort', filters.sort);
    params.set('order', filters.order);

    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-[300px_1fr] gap-10">

        {/* ================= FILTERS ================= */}
        <aside className="bg-white rounded-3xl border shadow-sm p-8 h-fit">
          <div className="space-y-8">

            <h2 className="text-xl font-semibold">Filters</h2>

            {/* TYPE */}
            <div>
              <p className="text-sm font-medium text-gray-600 mb-3">
                Listing Type
              </p>
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
              <p className="text-sm font-medium text-gray-600">Amenities</p>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.parking}
                  onChange={(e) =>
                    setFilters({ ...filters, parking: e.target.checked })
                  }
                />
                Parking
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.furnished}
                  onChange={(e) =>
                    setFilters({ ...filters, furnished: e.target.checked })
                  }
                />
                Furnished
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.offer}
                  onChange={(e) =>
                    setFilters({ ...filters, offer: e.target.checked })
                  }
                />
                Offer
              </label>
            </div>

            {/* SORT */}
            <div>
              <p className="text-sm font-medium text-gray-600 mb-3">
                Sort By
              </p>
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

            <button
              onClick={applyFilters}
              className="w-full bg-slate-800 text-white py-3.5 rounded-2xl
              font-medium hover:opacity-90"
            >
              Apply Filters
            </button>
          </div>
        </aside>

        {/* ================= RESULTS ================= */}
        <section>
          <h1 className="text-2xl font-semibold mb-8">
            Listing Results
          </h1>

          {loading && <p>Loading...</p>}

          {!loading && listings.length === 0 && (
            <p className="text-gray-500">No listings found.</p>
          )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {listings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
            ))}
        </div>

        </section>
      </div>
    </div>
  );
};

export default Search;
