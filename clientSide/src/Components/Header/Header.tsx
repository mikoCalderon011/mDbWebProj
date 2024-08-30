import React from 'react'
import TskrLogo from './TskrLogo'
import NavigationMenu from './NavigationMenu'
import SearchBar from './SearchBar'
import HeaderToolbar from './HeaderToolbar'

const Header = () => {
    return (
        <div className='w-full h-[3.5rem] bg-[#ffffff] flex justify-center items-center text-black font-roboto text-[0.875rem] relative dark:text-white dark:bg-[#070707] transition-bg-color duration-500'>
            <div className='w-[66.625rem] flex flex-row items-center'>
                <TskrLogo />
                <NavigationMenu />
                <SearchBar />
                <HeaderToolbar />
            </div>
        </div>
    )
}

export default Header
