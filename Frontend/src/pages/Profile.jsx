import React, { useEffect, useRef, useState } from 'react';
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


  // Upload image when file changes
  useEffect(() => {
    if (file) uploadImage(file);
  }, [file]);

  // Cloudinary upload
  const uploadImage = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'InfinityVillas'); // unsigned preset

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dy0drp7ka/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );

      const imgData = await res.json();

      if (!res.ok) {
        alert(imgData.error?.message || 'Image upload failed');
        return;
      }

      setFormData((prev) => ({
        ...prev,
        avatar: imgData.secure_url,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  //Show all the listing of a user 
  const handleShowListings = async () => {
    try {
      setListingsFetched(true);

      const res = await fetch(
        `http://localhost:4000/api/listing/listings/${currentUser._id}`,
        { credentials: 'include' }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setListings(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  
  // Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form Submit 
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());

    try {
      const res = await fetch(`/api/users/update/${currentUser._id}`, {
        method: 'POST',
        credentials: 'include', // 🔥 REQUIRED
        headers: {
          'Content-Type': 'application/json',
        },
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

  //To track if data is changed so as to enable update button
  const isChanged =
  formData.username !== currentUser.username ||
  formData.email !== currentUser.email ||
  formData.avatar !== currentUser.avatar ||
  formData.password.trim() !== '';

  // ✅ LOGOUT (FIXED)
  const handleLogout = async () => {
    await fetch('http://localhost:4000/api/auth/signout', {
      method: 'POST',          // 🔥 REQUIRED
      credentials: 'include',  // 🔥 REQUIRED
    });

    dispatch(signOut());
    navigate('/sign-in');
  };

  // ✅ DELETE ACCOUNT (FIXED)
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      'Are you sure? This action cannot be undone.'
    );
    if (!confirmDelete) return;

    await fetch(`/api/users/delete/${currentUser._id}`, {
      method: 'DELETE',
      credentials: 'include', // 🔥 REQUIRED
    });

    dispatch(signOut());
    dispatch(deleteUserSuccess(data));
    navigate('/sign-in');
  };

// ================= DELETE LISTING =================
// Deletes a listing created by the logged-in user
const handleDeleteListing = async (listingId) => {
  // Confirm before deleting
  const confirmDelete = window.confirm('Are you sure you want to delete this listing?');
  if (!confirmDelete) return;

  try {
    // Call backend delete API
    const res = await fetch(
      `http://localhost:4000/api/listing/delete/${listingId}`,
      {
        method: 'DELETE',
        credentials: 'include', // send auth cookie
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    // Remove deleted listing from UI
    setListings((prev) =>
      prev.filter((listing) => listing._id !== listingId)
    );
  } catch (err) {
    console.error(err.message);
  }
};

// ================= UPDATE LISTING =================
// Navigates to update listing page
const handleUpdateListing = (listingId) => {
  navigate(`/update-listing/${listingId}`);
};


  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-slate-700 mb-8">
        Profile
      </h1>

      {/* Avatar */}
      <input
        type="file"
        hidden
        accept="image/*"
        ref={fileRef}
        onChange={(e) => setFile(e.target.files[0])}
      />

      <div className="flex justify-center mb-6">
        <img
          src={formData.avatar}
          alt="profile"
          className="h-24 w-24 rounded-full object-cover cursor-pointer"
          onClick={() => fileRef.current.click()}
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border bg-slate-100 focus:outline-none"
          placeholder="Username"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border bg-slate-100 focus:outline-none"
          placeholder="Email"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border bg-slate-100 focus:outline-none"
          placeholder="Password"
        />

        <button
          disabled={loading || !isChanged}
          className={`w-full p-3 rounded-lg font-semibold uppercase 
            ${loading || !isChanged
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-slate-700 text-white hover:opacity-90'
            }`}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>


        <button
          type="button"
          className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold uppercase hover:opacity-90" 
          onClick={() => navigate('/create-listing')}
        >
          Create Listing
        </button>
      </form>

      {/* Bottom actions */}
      <div className="flex justify-between mt-6 text-sm">
        <span
          className="text-red-600 cursor-pointer"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </span>
        <span
          onClick={handleLogout}
          className="text-red-600 cursor-pointer"
        >
          Sign out
        </span>
      </div>

      {error && (
        <p className="text-red-600 text-center mt-4">{error}</p>
      )}

      <p className="text-green-600 text-center mt-6 cursor-pointer" onClick={handleShowListings}>
        Show Listings
      </p>
      {listingsFetched && listings.length === 0 && (
      <p className="text-center text-gray-500 mt-4">
         No listings present
      </p>
    )}

  {listings.map((listing) => (
  <div
    key={listing._id}
    className="border rounded-lg p-3 mt-4 hover:bg-slate-50"
  >

    <img
      src={listing.imageUrls[0]}
      alt="listing"
      className="h-32 w-full object-cover rounded-lg cursor-pointer"
      onClick={() => navigate(`/listing/${listing._id}`)}
    />

    <p className="font-semibold mt-2">{listing.name}</p>
    <p className="text-sm text-gray-600">{listing.address}</p>

    <div className="flex gap-3 mt-3">
      <button
        onClick={() => handleUpdateListing(listing._id)}
        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:opacity-90"
      >
        Update
      </button>

      <button
        onClick={() => handleDeleteListing(listing._id)}
        className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:opacity-90"
      >
        Delete
      </button>
    </div>
  </div>
))}


    </div>
  );
};

export default Profile;
