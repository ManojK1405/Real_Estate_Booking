// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   signInFailure,
//   signInStart,
//   signInSuccess,
// } from "../redux/userSlice.js";
// import OAuth from "../components/OAuth.jsx";

// const Signin = () => {
//   const [formData, setFormData] = React.useState({
//     username: "",
//     password: "",
//   });

//   const { loading, error } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // ✅ CLEAR ERROR ON PAGE LOAD (important for refresh)
//   useEffect(() => {
//     dispatch(signInFailure(null));
//   }, [dispatch]);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.username || !formData.password) {
//       dispatch(signInFailure("All fields are required"));
//       return;
//     }

//     try {
//       dispatch(signInStart());

//       const res = await fetch("http://localhost:4000/api/auth/signin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         dispatch(signInFailure(data.message || "Login failed"));
//         return;
//       }

//       // ✅ CLEAR ERROR & SAVE USER
//       dispatch(signInSuccess(data.user));
//       navigate("/");
//     } catch (err) {
//       dispatch(signInFailure("Network error. Try again later."));
//     }
//   };

//   return (
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className="text-3xl font-bold text-center my-7">Log In</h1>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="text"
//           id="username"
//           placeholder="Username"
//           className="border p-3 rounded-lg"
//           onChange={handleChange}
//         />

//         <input
//           type="password"
//           id="password"
//           placeholder="Password"
//           className="border p-3 rounded-lg"
//           onChange={handleChange}
//         />

//         <button
//           disabled={loading}
//           className="bg-indigo-600 p-2 rounded-2xl text-white font-semibold hover:bg-indigo-700 disabled:opacity-70"
//         >
//           {loading ? "Signing In..." : "Log In"}
//         </button>

//         <OAuth/>
//       </form>
//       <p className="text-center text-sm mt-4 ">
//         Dont have an account?{" "}
//         <a
//           href="/sign-up"
//           className="text-amber-600 font-semibold hover:underline"
//         >
//           Sign Up
//         </a>
//       </p>


//       {/* ✅ ERROR UI */}

//       {error && (
//         <p className="text-red-600 text-center mt-4 text-lg">{error}</p>
//       )}
//     </div>
//   );
// };

// export default Signin;


import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/userSlice.js";
import OAuth from "../components/OAuth.jsx";

const Signin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE_URL;


  // Clear stale errors on mount
  useEffect(() => {
    dispatch(signInFailure(null));
  }, [dispatch]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      dispatch(signInFailure("Please fill in all fields."));
      return;
    }

    try {
      dispatch(signInStart());

      const res = await fetch(`${API_BASE}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure(data.message || "Login failed."));
        return;
      }

      dispatch(signInSuccess(data.user));
      navigate("/");
    } catch {
      dispatch(signInFailure("Network error. Please try again."));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border p-10">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2">
            Sign in to continue to <strong>♾️ Infinity Villas</strong>
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
              placeholder="Enter your username"
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
              placeholder="Enter your password"
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
            {loading ? "Signing In..." : "Sign In"}
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
          Don’t have an account?{" "}
          <Link
            to="/sign-up"
            className="text-slate-800 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
