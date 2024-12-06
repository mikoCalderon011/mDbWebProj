import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../api/api';
import { jwtDecode } from 'jwt-decode';
import useAuth from '../hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';

const userRole = Number(import.meta.env.VITE_YT_ROLE_USER);
const adminRole = Number(import.meta.env.VITE_YT_ROLE_ADMIN);

const SignIn = () => {
  const { user, setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.accessToken) {
      if (user.roles.includes(adminRole)) {
        navigate('/admin/movie');
      } else if (user.roles.includes(userRole)) {
        navigate('/');
      }
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      const response = await axiosPrivate.post(
        '/auth',
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      const accessToken = response.data.accessToken;
      const decodedToken = jwtDecode(accessToken);
      const { roles } = decodedToken;

      localStorage.setItem("jwt", response.data.refreshToken);
      setUser({ email, accessToken, roles });

      if (roles.includes(adminRole)) {
        navigate('/admin/movie');
      } else if (roles.includes(userRole)) {
        navigate('/');
      } else {
        setError('Unknown role.');
      }
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <main className="text-white flex flex-col gap-6 font-roboto p-6">
      <h2 className="text-center text-2xl font-semibold mb-6">Login</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black p-2 border border-gray-300 rounded-md bg-transparent focus:outline-none"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black p-2 border border-gray-300 rounded-md bg-transparent focus:outline-none"
            required
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Don't have an account? 
          <NavLink to="/signup" className="text-blue-600 hover:underline"> Sign up</NavLink>
        </p>
      </div>
    </main>
  );
};

export default SignIn;
