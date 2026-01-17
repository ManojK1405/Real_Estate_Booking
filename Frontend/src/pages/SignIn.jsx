import React from 'react'
import { useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom'

const Signin = () => {
  const [formData, setFormData] = React.useState({
    username: '',
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

  if (!formData.username || !formData.password) {
    setError("All fields are required");
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const res = await fetch("http://localhost:4000/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // IMPORTANT for cookies
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Login failed");
      setLoading(false);
      return;
    }

    // ✅ Only navigate on SUCCESS
    navigate("/");
  } catch (err) {
    setError("Please try again.");
    setLoading(false);
  }
};


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold text-center my-7 '>Log In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <input type='text' id='username' className='border p-3 rounded-lg' placeholder='Username' onChange={handleChange} />
        <input type='password' id='password' className='border p-3 rounded-lg' placeholder='Password' onChange={handleChange} />

        <button disabled={loading} type='submit' className='border bg-indigo-600 m-4 p-2 rounded-2xl text-white font-semibold hover:bg-indigo-700 transition-colors '>
          {loading ? 'Signing In...' : 'Log In'}
        </button>
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
      {error && <p className="text-red-600 text-center mt-4 text-2xl">{error}</p>}
    </div>
  )
}

export default Signin