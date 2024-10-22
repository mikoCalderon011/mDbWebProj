import React from 'react'
import Header from '../components/Header/Header'

const SignIn = () => {
  return (
    <>
      <main className='text-white flex flex-col gap-0 font-roboto p-0'>
        <p>this is a login page lmao</p>
        <div className='flex flex-col gap-[1rem]'>
          <div className='flex gap-[1rem] '>
            <p>email</p>
            <input className='text-black' type="text" name="email" id="" />
          </div>
          <div className='flex gap-[1rem]'>
            <p>password</p>
            <input className='text-black' type="password" name="email" id="" />
          </div>
          <button className='bg-slate-700'>Login</button>
        </div>
      </main>
    </>
  )
}

export default SignIn
