// import React from 'react'
// import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
// import {app} from '../firebase.js'
// import { signInSuccess } from '../redux/userSlice.js'
// import {useDispatch} from 'react-redux'



// const OAuth = () => {

//   const handleGoogleClick = async () =>{
//     try {
//       const dispatch = useDispatch();
//       const provider = new GoogleAuthProvider()
//       const auth = getAuth(app)

//       const result = await signInWithPopup(auth,provider);

//       const res = await fetch('/api/auth/google',{
//         method:'POST',
//         headers:{
//           'content-Type':'application/json'
//         },
//         body : JSON.stringify({name:result.user.displayName , email:result.user.email,photo:result.user.photoURL})
//       })
//       const data = res.json();
//       dispatch(signInSuccess(data)); 
//     } catch (error) {
//       console.log('couldnt sign in with google',error);
//     }
//   }

//   return (
//     <button type="button" onClick={handleGoogleClick} className='bg-red-600 rounded-2xl hover:opacity-90 text-white p-2 w-auto'>OAuth</button> 
//   )
// }

// export default OAuth


import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { signInSuccess } from "../redux/userSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  // ✅ Hooks at top-level (CORRECT)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("http://localhost:4000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();

      dispatch(signInSuccess(data.user));
      navigate("/");
    } catch (error) {
      console.error("Couldn't sign in with Google:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-600 rounded-2xl hover:opacity-90 text-white p-2 w-auto"
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
