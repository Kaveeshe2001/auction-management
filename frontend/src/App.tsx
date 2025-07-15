import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Shared/Navbar/Navbar'
import { UserProvider } from './providers/UserProvider';
import Footer from './components/Shared/Footer/Footer';
import { ToastContainer } from 'react-toastify';

function App() {
  const location = useLocation();
  const showNavbar = !['/login', '/signup'].includes(location.pathname);

  return (
    <>
      <UserProvider>
        {showNavbar && <Navbar />}
        <Outlet />
        <ToastContainer />
        <Footer />
      </UserProvider>
    </>
  )
}

export default App
