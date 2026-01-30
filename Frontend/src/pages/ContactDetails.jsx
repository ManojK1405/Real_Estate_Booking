import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ContactDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const listingId = location.state?.listingId;

  const [owner, setOwner] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!listingId) {
      navigate('/');
      return;
    }

    const fetchOwner = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/listing/contact/${listingId}`,
          { credentials: 'include' }
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setOwner(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOwner();
  }, [listingId, navigate]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Contact Owner
        </h1>

        {/* OWNER CARD */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-14 w-14 rounded-full bg-slate-700 text-white 
            flex items-center justify-center text-xl font-semibold">
            {owner.username[0].toUpperCase()}
          </div>

          <div>
            <p className="font-semibold text-lg">
              {owner.username}
            </p>
            <p className="text-gray-500 text-sm">
              {owner.email}
            </p>
          </div>
        </div>

        {/* MESSAGE BOX */}
        <label className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          rows="4"
          className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-slate-500"
          placeholder="Hi, I'm interested in your listing..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* CTA */}
        <a
          href={`mailto:${owner.email}?subject=Regarding your listing&body=${encodeURIComponent(
            message
          )}`}
          className="block text-center bg-linear-to-r from-slate-700 to-slate-900
          text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
        >
          Send Email
        </a>

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="block mx-auto mt-4 text-sm text-gray-500 hover:underline"
        >
          ← Back to Listing
        </button>

      </div>
    </div>
  );
};

export default ContactDetails;
