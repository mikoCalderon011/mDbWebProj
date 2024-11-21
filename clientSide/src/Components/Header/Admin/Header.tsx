import React from 'react'
import AdminTskr from '../../../assets/Icons/Admin/AdminTskr'
import SearchBox from './SearchBox'

const Header = () => {

   console.log("sasasasas")

   return (
      <header className='admin-header'>
         <div className='w-[74.8125rem] flex flex-row items-center justify-between'>
            <AdminTskr />
            <div className='flex w-[38.4375rem] overflow-hidden'>
               <SearchBox />
            </div>
         </div>
      </header>
   )
}

export default Header
