import React from 'react'
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
    setLoading(true);
    // Here you can handle the form submission, e.g., send data to backend  
    

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
  } catch (err) {
    setError('An error occurred. Please try again.');
    setLoading(false);
    return;
  }

    // On successful signup, navigate to sign-in page
    navigate('/sign-in');
  }
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold text-center my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4 '>
        <input type='text' placeholder='Username' className="border p-3 rounded-lg" id="username" onChange={handleChange}/>
        <input type='email' placeholder='Email' className="border p-3 rounded-lg" id="email" onChange={handleChange}/>
        <input type='password' placeholder='Password' className="border p-3 rounded-lg" id="password" onChange={handleChange}/>
        <button disabled={loading} type='submit' className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-80" onClick={handleSubmit}>
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