import React from 'react'
import { useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

const SignUp = () => {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false); 

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }
  setLoading(true);

  try {
    const res = await fetch('http://localhost:4000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json();

    if(data.success===false){
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    navigate('/sign-in');
  } catch (err) {
    setError('An error occurred. Please try again.');
    setLoading(false);
    return;
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold text-center my-7 '>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <input type='text' id='username' className='border p-3 rounded-lg' placeholder='Username' onChange={handleChange} />
        <input type='email' id='email' className='border p-3 rounded-lg' placeholder='Email' onChange={handleChange} />
        <input type='password' id='password' className='border p-3 rounded-lg' placeholder='Password' onChange={handleChange} />

        <button disabled={loading} type='submit' className='border bg-indigo-600 m-4 p-2 rounded-2xl text-white font-semibold hover:bg-indigo-700 transition-colors '>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>

        <OAuth />
      </form>

      <p className="text-center text-sm mt-4 ">
        Already have an account?{" "}
        <a
          href="/sign-in"
          className="text-amber-600 font-semibold hover:underline"
        >
          Login
        </a>
      </p>
      {error && <p className="text-red-600 text-center mt-4 text-2xl">{error}</p>}
    </div>
  )
}

export default SignUp


//For Timer Alert!!

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import OAuth from "../components/OAuth";

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   // 🔔 Alert state (NEW)
//   const [alert, setAlert] = useState(null); // { type, message }
//   const [timer, setTimer] = useState(0);

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

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

//     if (!formData.username || !formData.email || !formData.password) {
//       showAlert("error", "All fields are required");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch("http://localhost:4000/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok || data.success === false) {
//         setLoading(false);
//         showAlert("error", data.message || "Signup failed");
//         return;
//       }

//       setLoading(false);
//       showAlert("success", "Account created successfully", 2);

//       setTimeout(() => {
//         navigate("/sign-in");
//       }, 1500);
//     } catch (err) {
//       setLoading(false);
//       showAlert("error", "Network error. Please try again.");
//     }
//   };

//   return (
//     <div className="p-3 max-w-lg mx-auto relative">
//       {/* 🌟 CENTERED COUNTDOWN ALERT */}
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

//       {/* 📝 SIGNUP UI (UNCHANGED) */}
//       <h1 className="text-3xl font-bold text-center my-7">Sign Up</h1>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="text"
//           id="username"
//           className="border p-3 rounded-lg"
//           placeholder="Username"
//           onChange={handleChange}
//         />

//         <input
//           type="email"
//           id="email"
//           className="border p-3 rounded-lg"
//           placeholder="Email"
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
//           disabled={loading}
//           type="submit"
//           className="border bg-indigo-600 m-4 p-2 rounded-2xl text-white font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-70"
//         >
//           {loading ? "Signing Up..." : "Sign Up"}
//         </button>

//         <OAuth />
//       </form>

//       <p className="text-center text-sm mt-4">
//         Already have an account?{" "}
//         <a
//           href="/sign-in"
//           className="text-amber-600 font-semibold hover:underline"
//         >
//           Login
//         </a>
//       </p>
//     </div>
//   );
// };

// export default SignUp;
