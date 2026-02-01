import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 
        sm:grid-cols-2 md:grid-cols-4 text-sm text-gray-600">

        {/* BRAND */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Infinity Villas
          </h2>
          <p className="leading-relaxed">
            Find trusted places to rent or buy with ease.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-gray-800 font-medium mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-gray-900">
                Explore
              </Link>
            </li>
            <li>
              <Link to="/create-listing" className="hover:text-gray-900">
                Create Listing
              </Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-gray-800 font-medium mb-3">
            Support
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/contact" className="hover:text-gray-900">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-gray-900">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-gray-900">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
        <h3 className="text-gray-800 font-medium mb-3">
          Get in Touch
        </h3>

        {/* 📍 Location → Google Maps */}
      <a
      href="https://www.google.com/maps/place/Pune,+Maharashtra,+India"
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:text-gray-900 transition cursor-pointer"
        >
          📍 Pune, India
      </a>

      <a
      href="mailto:support@infinityvillas.com"
      className="block hover:text-gray-900 transition cursor-pointer"
      >
       ✉ support@infinityvillas.com
      </a>


</div>

      </div>

      {/* BOTTOM */}
      <div className="text-center text-xs text-gray-500 py-4 border-t border-gray-200">
        © {new Date().getFullYear()} Infinity Villas. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
