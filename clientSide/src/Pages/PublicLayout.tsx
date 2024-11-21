import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Client/Header'
import Footer from '../components/Footer/Footer'

const PublicLayout = () => {
  return (
    <>
      <Header />
         <Outlet />
      <Footer />
    </>
  )
}

export default PublicLayout