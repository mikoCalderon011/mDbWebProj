import React from 'react'
import TheMovieDatabaseIcon from '../../assets/Icons/TheMovieDatabaseIcon'
import { Facebook, GitHub, LinkedIn, Twitter } from '../../assets/Icons/SocialMediaIcons'

const Footer = () => {
  return (
    <footer className='h-auto flex justify-center items-center bg-[#FF8731] dark:bg-[#070707] text-[#ffffff]'>
      <div className='w-[66.625rem] flex py-[5.9375rem] justify-between'>
        <div className='flex gap-[3rem]'>
          <ul>
            <span className='font-robotoCondensed arsenal-title dark:text-[#707070]'>Frontend</span>
            <li className='arsenal'>HTML</li>
            <li className='arsenal'>SCSS</li>
            <li className='arsenal'>TypeScript</li>
            <li className='arsenal'>React</li>
          </ul>
          <ul>
            <span className='font-robotoCondensed arsenal-title dark:text-[#707070]'>Backend</span>
            <li className='arsenal'>Node.js</li>
            <li className='arsenal'>Express</li>
            <li className='arsenal'>MongoDB</li>
            <li className='arsenal'>Mongoose</li>
          </ul>
          <ul>
            <span className='font-robotoCondensed arsenal-title dark:text-[#707070]'>Tools</span>
            <li className='arsenal'>VS Code</li>
            <li className='arsenal'>Vite</li>
            <li className='arsenal'>Figma</li>
          </ul>
          <ul>
            <span className='font-robotoCondensed arsenal-title dark:text-[#707070]'>Fonts</span>
            <li className='arsenal'>Roboto</li>
            <li className='arsenal'>Roboto Condensed</li>
            <li className='arsenal'>Passion One</li>
          </ul>
          <ul className='flex flex-col gap-[.5rem]'>
            <span className='font-robotoCondensed arsenal-title dark:text-[#707070]'>API Used</span>
            <a
              href="https://themoviedb.org/"
              className='brightness-100 hover:brightness-150'
            >
              <TheMovieDatabaseIcon />
            </a>
          </ul>
        </div>
        <div className='flex'> 
          <div className='flex flex-col gap-[1.5rem]'>
            <div className='flex flex-col'>
              <span className='arsenal-title font-robotoCondensed dark:text-[#707070]'>Get in touch</span>
              <span className='arsenal dark:text-[#ffffff]'>calderon.miko.00149@dyci.edu.ph</span>
            </div>
            <div className='flex flex-col gap-[.5rem]'>
              <span className='font-robotoCondensed arsenal-title dark:text-[#707070]'>Follow me on social media</span>
              <div className='flex gap-[2.1625rem]'>
                <a href="https://x.com/Utamikoo">
                  <Twitter />
                </a>
                <a href="https://github.com/humblecode07">
                  <GitHub />
                </a>
                <a href="https://www.linkedin.com/in/mkcldrn777/">
                  <LinkedIn />
                </a>
                <a href="https://www.facebook.com/MKCLDRN">
                  <Facebook />
                </a>
              </div>
            </div>
            <span className='arsenal dark:text-[#ffffff]'>© 2024 tskr! All rights reserved. </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
