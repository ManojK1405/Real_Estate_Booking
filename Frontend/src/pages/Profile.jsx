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

  // ✅ LOGOUT (FIXED)
  const handleLogout = async () => {
    await fetch('/api/auth/signout', {
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
          disabled={loading}
          className="w-full bg-slate-700 text-white p-3 rounded-lg font-semibold uppercase hover:opacity-90"
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

      <p className="text-green-600 text-center mt-6 cursor-pointer">
        Show Listings
      </p>
    </div>
  );
};

export default Profile;
