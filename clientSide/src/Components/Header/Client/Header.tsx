import React from 'react'
import TskrLogo from '../../../assets/Icons/TskrLogo'
import NavigationMenu from './NavigationMenu'
import SearchBar from './SearchBar'
import HeaderToolbar from './HeaderToolbar'

const Header = () => {
    return (
        <header className='client-header'>
            <div className='w-[66.625rem] flex flex-row items-center'>
                <TskrLogo />
                <NavigationMenu />
                <SearchBar />
                <HeaderToolbar />
            </div>
        </header>
    )
}

export default Header
