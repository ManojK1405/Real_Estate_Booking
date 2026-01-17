import React from 'react'
import { useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom'

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