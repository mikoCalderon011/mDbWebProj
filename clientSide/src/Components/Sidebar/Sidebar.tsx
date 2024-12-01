import React from 'react'
import MovieIcon from '../../assets/Icons/Admin/MovieIcon'
import TvShowIcon from '../../assets/Icons/Admin/TvShowIcon'
import PeopleIcon from '../../assets/Icons/Admin/PeopleIcon'
import UserIcon from '../../assets/Icons/Admin/UserIcon'
import SettingsIcon from '../../assets/Icons/Admin/SettingsIcon'
import LogoutIcon from '../../assets/Icons/Admin/LogoutIcon'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[5.1875rem] min-h-[34.315rem] h-[76.85dvh] rounded-[.75rem] flex flex-col items-center justify-between bg-gradient-to-b from-[#CC511D] to-black'>
      <section className='flex flex-col gap-[2.125rem] pt-[2.375rem]'>
         <NavLink
          to={'/admin/movie'}
         >
          <MovieIcon />
         </NavLink>
         <TvShowIcon />
         <PeopleIcon />
         <UserIcon />
      </section>
      <section className='flex flex-col gap-[2.125rem] pb-[2.375rem]'>
         <SettingsIcon />
         <LogoutIcon />
      </section>
    </div>
  )
}

export default Sidebar
