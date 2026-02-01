// import React from 'react'
// import { useEffect } from 'react';
// import { Link,useNavigate } from 'react-router-dom'
// import OAuth from '../components/OAuth';

// const SignUp = () => {
//   const [formData, setFormData] = React.useState({
//     username: '',
//     email: '',
//     password: ''
//   });

//   const [error, setError] = React.useState(null);
//   const [loading, setLoading] = React.useState(false); 

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [id]: value
//     }));
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.username || !formData.email || !formData.password) {
//       setError('All fields are required');
//       return;
//     }
//   setLoading(true);

//   try {
//     const res = await fetch('http://localhost:4000/api/auth/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(formData)
//     });
//     const data = await res.json();

//     if(data.success===false){
//       setError(data.message);
//       setLoading(false);
//       return;
//     }
//     setLoading(false);
//     navigate('/sign-in');
//   } catch (err) {
//     setError('An error occurred. Please try again.');
//     setLoading(false);
//     return;
//     }
//   }

//   return (
//     <div className='p-3 max-w-lg mx-auto'>
//       <h1 className='text-3xl font-bold text-center my-7 '>Sign Up</h1>
//       <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
//         <input type='text' id='username' className='border p-3 rounded-lg' placeholder='Username' onChange={handleChange} />
//         <input type='email' id='email' className='border p-3 rounded-lg' placeholder='Email' onChange={handleChange} />
//         <input type='password' id='password' className='border p-3 rounded-lg' placeholder='Password' onChange={handleChange} />

//         <button disabled={loading} type='submit' className='border bg-indigo-600 m-4 p-2 rounded-2xl text-white font-semibold hover:bg-indigo-700 transition-colors '>
//           {loading ? 'Signing Up...' : 'Sign Up'}
//         </button>

//         <OAuth />
//       </form>

//       <p className="text-center text-sm mt-4 ">
//         Already have an account?{" "}
//         <a
//           href="/sign-in"
//           className="text-amber-600 font-semibold hover:underline"
//         >
//           Login
//         </a>
//       </p>
//       {error && <p className="text-red-600 text-center mt-4 text-2xl">{error}</p>}
//     </div>
//   )
// }

// export default SignUp

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE_URL;


  // Clear error on mount (refresh-safe)
  useEffect(() => {
    setError(null);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        setError(data.message || "Signup failed.");
        setLoading(false);
        return;
      }

      setLoading(false);
      navigate("/sign-in");
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border p-10">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Create Account
          </h1>
          <p className="text-gray-500 mt-2">
            Join <strong>♾️ Infinity Villas</strong> and explore premium living
          </p>
        </div>

        {/* ALERT */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700
            px-4 py-3 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Choose a username"
              onChange={handleChange}
              className="mt-1 w-full border rounded-xl px-4 py-3
              focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              onChange={handleChange}
              className="mt-1 w-full border rounded-xl px-4 py-3
              focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create a secure password"
              onChange={handleChange}
              className="mt-1 w-full border rounded-xl px-4 py-3
              focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <button
            disabled={loading}
            className={`w-full py-3 rounded-2xl font-semibold text-white
            transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-slate-800 hover:bg-slate-900"
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t" />
          <span className="mx-3 text-sm text-gray-400">or</span>
          <div className="flex-grow border-t" />
        </div>

        {/* OAUTH */}
        <OAuth />

        {/* FOOTER */}
        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="text-slate-800 font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
