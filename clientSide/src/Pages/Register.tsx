import React, { useState } from 'react';
import { registerUser } from '../api/api';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {
const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    full_name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(userDetails);
      alert('Account created!');
      navigate('/signin');
    } catch (error) {
      console.log(error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <main className="text-white flex flex-col gap-4 font-roboto p-4">
      <h2 className="text-center text-2xl font-semibold mb-6">Register</h2>
      
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="full_name" className="text-gray-700">Full Name</label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            value={userDetails.full_name}
            onChange={handleChange}
            className="text-white p-2 border border-gray-300 rounded-md bg-transparent"
            required
            placeholder="Enter your full name"
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={userDetails.email}
            onChange={handleChange}
            className="text-white p-2 border border-gray-300 rounded-md bg-transparent"
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-gray-700">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={userDetails.password}
            onChange={handleChange}
            className="text-white p-2 border border-gray-300 rounded-md bg-transparent"
            required
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700"
        >
          Register
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Already have an account? 
          <NavLink to="/signin" className="text-blue-600 hover:underline">Login</NavLink>
        </p>
      </div>
    </main>
  );
};

export default Register;
