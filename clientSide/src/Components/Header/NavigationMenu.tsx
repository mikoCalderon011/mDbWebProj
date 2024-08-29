import React from 'react'

const NavigationMenu = () => {
	return (
		<ul className=' flex gap-[1.75rem]'>
			<li>
				<a className='text-white font-roboto text-[0.875rem]' href="">Movies</a>
			</li>
			<li>
				<a className='text-white font-roboto text-[0.875rem]' href="">TV Shows</a>
			</li>
			<li>
				<a className='text-white font-roboto text-[0.875rem]' href="">People</a>
			</li>
		</ul>
	)
}

export default NavigationMenu
