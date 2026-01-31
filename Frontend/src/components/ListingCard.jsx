import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  const price = listing.offer
    ? listing.discountPrice
    : listing.regularPrice;

  return (
    <Link to={`/listing/${listing._id}`}>
      <div
  className="bg-white rounded-3xl border shadow-sm overflow-hidden
  transform transition-all duration-300 ease-out
  hover:-translate-y-2 hover:scale-[1.02]
  hover:shadow-2xl"
>

        {/* IMAGE */}
        <div className="relative">
          <img
            src={listing.imageUrls[0]}
            alt={listing.name}
            className="h-52 w-full object-cover"
          />

          {/* BADGE */}
          <span
            className={`absolute top-4 left-4 px-3 py-1 text-xs
            rounded-full font-medium text-white
            ${listing.type === 'rent' ? 'bg-green-600' : 'bg-red-600'}`}
          >
            {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
          </span>
        </div>

        {/* CONTENT */}
        <div className="p-5 space-y-3">
          <h2 className="text-lg font-semibold truncate">
            {listing.name}
          </h2>

          <p className="text-sm text-gray-500">
            📍 {listing.address}
          </p>

          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>

          <div className="flex justify-between items-center pt-3">
            <p className="text-xl font-bold">
              ₹ {price.toLocaleString()}
              {listing.type === 'rent' && (
                <span className="text-sm font-normal text-gray-500">
                  {' '} / month
                </span>
              )}
            </p>

            <div className="flex gap-3 text-sm text-gray-600">
              <span>🛏 {listing.bedrooms}</span>
              <span>🛁 {listing.bathrooms}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
