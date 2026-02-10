import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  signOut,
  deleteUserSuccess,
} from '../redux/userSlice.js';

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    avatar: currentUser.avatar,
    password: '',
  });

  const [listings, setListings] = useState([]);
  const [listingsFetched, setListingsFetched] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  /* ================= AVATAR UPLOAD ================= */
  useEffect(() => {
    if (!file) return;

    const uploadImage = async () => {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'InfinityVillas');

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dy0drp7ka/image/upload',
        { method: 'POST', body: data }
      );
      const imgData = await res.json();

      if (res.ok) {
        setFormData((prev) => ({ ...prev, avatar: imgData.secure_url }));
      }
    };

    uploadImage();
  }, [file]);

  /* ================= FORM ================= */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const isChanged =
    formData.username !== currentUser.username ||
    formData.email !== currentUser.email ||
    formData.avatar !== currentUser.avatar ||
    formData.password.trim() !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());

    try {
      const res = await fetch(`${API_BASE}/api/users/update/${currentUser._id}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      dispatch(updateUserSuccess(data));
      alert('Profile updated successfully');
    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  };

  /* ================= LISTINGS ================= */
  const handleShowListings = async () => {
    setListingsFetched(true);
    const res = await fetch(
      `${API_BASE}/api/listing/listings/${currentUser._id}`,
      { credentials: 'include' }
    );
    setListings(await res.json());
  };

  const handleDeleteListing = async (id) => {
    if (!window.confirm('Delete this listing?')) return;
    await fetch(`${API_BASE}/api/listing/delete/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    setListings((prev) => prev.filter((l) => l._id !== id));
  };

  const handleLogout = async () => {
    await fetch(`${API_BASE}/api/auth/signout`, {
      method: 'POST',
      credentials: 'include',
    });
    dispatch(signOut());
    navigate('/sign-in');
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('This action cannot be undone. Continue?')) return;
    await fetch(`${API_BASE}/api/users/delete/${currentUser._id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    dispatch(signOut());
    dispatch(deleteUserSuccess());
    navigate('/sign-in');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6"
      >
        {/* ================= HEADER ================= */}
        <h1 className="text-4xl font-bold text-slate-800 text-center mb-16">
          Your Profile
        </h1>

        {/* ================= PROFILE CARD ================= */}
        <div className="bg-white rounded-3xl border shadow-sm p-10 max-w-xl mx-auto">
          <input
            type="file"
            hidden
            ref={fileRef}
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <div className="flex justify-center mb-8">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={formData.avatar}
              alt="avatar"
              onClick={() => fileRef.current.click()}
              className="h-28 w-28 rounded-full object-cover cursor-pointer"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {['username', 'email', 'password'].map((field) => (
              <input
                key={field}
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full border rounded-xl px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            ))}

            <button
              disabled={!isChanged || loading}
              className={`w-full py-3 rounded-xl font-medium transition
              ${
                !isChanged
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-slate-800 text-white hover:opacity-90'
              }`}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/create-listing')}
              className="w-full py-3 rounded-xl font-medium
              bg-green-600 text-white hover:opacity-90"
            >
              Create New Listing
            </button>
          </form>

          <div className="flex justify-between text-sm mt-8 text-red-600">
            <span onClick={handleDeleteAccount} className="cursor-pointer">
              Delete Account
            </span>
            <span onClick={handleLogout} className="cursor-pointer">
              Sign Out
            </span>
          </div>

          {error && (
            <p className="text-red-600 text-center mt-4">{error}</p>
          )}
        </div>

        {/* ================= MODERN LISTINGS ================= */}
        <div className="mt-28">
          <div className="text-center">
            <button
              onClick={handleShowListings}
              className="text-lg font-medium text-slate-800
              hover:underline underline-offset-4"
            >
              View Your Listings
            </button>
          </div>

          <AnimatePresence>
            {listingsFetched && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-14"
              >
                {listings.length === 0 && (
                  <p className="col-span-full text-center text-gray-500">
                    You haven’t created any listings yet.
                  </p>
                )}

                {listings.map((listing, index) => (
                  <motion.div
                    key={listing._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    className="group relative bg-white rounded-3xl
                    border shadow-sm hover:shadow-xl transition overflow-hidden"
                  >
                    {/* IMAGE */}
                    <div
                      onClick={() => navigate(`/listing/${listing._id}`)}
                      className="relative h-48 overflow-hidden cursor-pointer"
                    >
                      <img
                        src={listing.imageUrls[0]}
                        alt={listing.name}
                        className="h-full w-full object-cover
                        group-hover:scale-105 transition duration-500"
                      />

                      {/* ACTIONS */}
                      <div className="absolute top-4 right-4 flex gap-2
                      opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/update-listing/${listing._id}`);
                          }}
                          className="bg-white/90 backdrop-blur px-3 py-1.5
                          rounded-full text-sm shadow hover:bg-white"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteListing(listing._id);
                          }}
                          className="bg-red-500 text-white px-3 py-1.5
                          rounded-full text-sm shadow hover:bg-red-600"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-5">
                      <h3 className="font-semibold text-slate-800 text-lg">
                        {listing.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        📍 {listing.address}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
