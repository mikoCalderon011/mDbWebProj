import React from 'react'
import TskrLogo from './TskrLogo'
import NavigationMenu from './NavigationMenu'
import SearchBar from './SearchBar'

const Header = () => {
    return (
        <div className='w-full h-[3.5rem] bg-[#666666] flex justify-center items-center'>
            <div className='w-[66.625rem] flex flex-row'>
                <TskrLogo />
                <NavigationMenu />
                <SearchBar />
            </div>
        </div>
    )
}

export default Header
