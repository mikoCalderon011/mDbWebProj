import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../api/api';
import { jwtDecode } from 'jwt-decode';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

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
        console.log('admin', user)
        navigate('/admin');
      } else if (user.roles.includes(userRole)) {
        console.log('user', user)
        navigate('/');
      }
    }
  }, [user, navigate]);

  // Handle login
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
      setUser({ email, accessToken, roles }); // Ensure roles are included
      
      console.log('Login successful:', response);

      if (roles.includes(adminRole)) {
        navigate('/admin');
      } else if (roles.includes(userRole)) {
        navigate('/');
      } else {
        setError('Unknown role.');
      }

    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <>
      <main className='text-white flex flex-col gap-0 font-roboto p-0'>
        <p>this is a login page lmaoa</p>
        {error && <p className='text-red-500'>{error}</p>}
        <div className='flex flex-col gap-[1rem]'>
          <div className='flex gap-[1rem]'>
            <p>Email</p>
            <input
              className='text-black'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex gap-[1rem]'>
            <p>Password</p>
            <input
              className='text-black'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className='bg-slate-700' onClick={handleLogin}>
            Login
          </button>
        </div>
      </main>
    </>
  );
};

export default SignIn;
