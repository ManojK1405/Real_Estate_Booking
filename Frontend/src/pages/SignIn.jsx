import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/userSlice.js";
import OAuth from "../components/OAuth.jsx";

const Signin = () => {
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ CLEAR ERROR ON PAGE LOAD (important for refresh)
  useEffect(() => {
    dispatch(signInFailure(null));
  }, [dispatch]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      dispatch(signInFailure("All fields are required"));
      return;
    }

    try {
      dispatch(signInStart());

      const res = await fetch("http://localhost:4000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure(data.message || "Login failed"));
        return;
      }

      // ✅ CLEAR ERROR & SAVE USER
      dispatch(signInSuccess(data.user));
      navigate("/");
    } catch (err) {
      dispatch(signInFailure("Network error. Try again later."));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Log In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-indigo-600 p-2 rounded-2xl text-white font-semibold hover:bg-indigo-700 disabled:opacity-70"
        >
          {loading ? "Signing In..." : "Log In"}
        </button>

        <OAuth/>
      </form>
      <p className="text-center text-sm mt-4 ">
        Dont have an account?{" "}
        <a
          href="/sign-up"
          className="text-amber-600 font-semibold hover:underline"
        >
          Sign Up
        </a>
      </p>


      {/* ✅ ERROR UI */}

      {error && (
        <p className="text-red-600 text-center mt-4 text-lg">{error}</p>
      )}
    </div>
  );
};

export default Signin;

//For Timer Alert!!

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import {
//   signInFailure,
//   signInStart,
//   signInSuccess,
// } from "../redux/userSlice.js";
// import OAuth from "../components/OAuth.jsx";

// const Signin = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   // 🔔 Alert state (NEW)
//   const [alert, setAlert] = useState(null); // { type, message }
//   const [timer, setTimer] = useState(0);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Clear redux error on mount
//   useEffect(() => {
//     dispatch(signInFailure(null));
//   }, [dispatch]);

//   // ⏳ Countdown logic
//   useEffect(() => {
//     if (timer <= 0) return;

//     const interval = setInterval(() => {
//       setTimer((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [timer]);

//   // 🔔 Alert helper
//   const showAlert = (type, message, duration = 3) => {
//     setAlert({ type, message });
//     setTimer(duration);

//     setTimeout(() => {
//       setAlert(null);
//     }, duration * 1000);
//   };

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
//       showAlert("error", "All fields are required");
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
//         dispatch(signInFailure(data.message));
//         showAlert("error", data.message || "Invalid username or password");
//         return;
//       }

//       dispatch(signInSuccess(data.user));
//       showAlert("success", "Logged in successfully", 2);

//       setTimeout(() => {
//         navigate("/");
//       }, 1500);
//     } catch (err) {
//       dispatch(signInFailure("Network error"));
//       showAlert("error", "Network error. Please try again.");
//     }
//   };

//   return (
//     <div className="p-3 max-w-lg mx-auto relative">
//       {/* 🌟 CENTERED COUNTDOWN ALERT (NEW) */}
//       {alert && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
//           <div
//             className={`w-80 rounded-2xl p-6 text-center shadow-xl border
//               ${
//                 alert.type === "success"
//                   ? "bg-emerald-50 border-emerald-300 text-emerald-800"
//                   : "bg-rose-50 border-rose-300 text-rose-800"
//               }`}
//           >
//             <div className="text-lg font-semibold mb-3">
//               {alert.message}
//             </div>

//             <div className="flex justify-center">
//               <div
//                 className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-bold
//                   ${
//                     alert.type === "success"
//                       ? "border-emerald-500"
//                       : "border-rose-500"
//                   }`}
//               >
//                 {timer}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 🔐 LOGIN UI (UNCHANGED) */}
//       <h1 className="text-3xl font-bold text-center my-7">Log In</h1>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="text"
//           id="username"
//           className="border p-3 rounded-lg"
//           placeholder="Username"
//           onChange={handleChange}
//         />

//         <input
//           type="password"
//           id="password"
//           className="border p-3 rounded-lg"
//           placeholder="Password"
//           onChange={handleChange}
//         />

//         <button
//           type="submit"
//           className="border bg-indigo-600 m-4 p-2 rounded-2xl text-white font-semibold hover:bg-indigo-700 transition-colors"
//         >
//           Log In
//         </button>

//         <OAuth />
        
//         <p className="text-center text-sm mt-4">
//         Dont have an account?{" "}
//         <a
//           href="/sign-up"
//           className="text-amber-600 font-semibold hover:underline"
//         >
//           Sign Up
//         </a>
//       </p>
//       </form>
//     </div>
//   );
// };

// export default Signin;
