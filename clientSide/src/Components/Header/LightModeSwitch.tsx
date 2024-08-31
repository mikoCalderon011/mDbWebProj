import React, { useEffect, useState } from 'react'
import MoonIcon from '../../assets/Icons/MoonIcon'
import SunIcon from '../../assets/Icons/SunIcon';

const LightModeSwitch = () => {
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkTheme])

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
  }

  return (
    <button
      className='light-mode-switch'
      onClick={toggleDarkTheme}
    >
      {darkTheme ? <MoonIcon /> : <SunIcon />}
    </button>

  )
}

export default LightModeSwitch
