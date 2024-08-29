import React from 'react'
import WatchlistIcon from '../../assets/Icons/WatchlistIcon'

const Watchlist = () => {
  return (
    <a className='flex gap-[0.4375rem]' href=''>
      <WatchlistIcon />
      <span>Watchlist</span>
    </a>
  )
}

export default Watchlist
