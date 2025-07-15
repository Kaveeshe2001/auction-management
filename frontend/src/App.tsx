import { useLocation } from 'react-router-dom'
import Navbar from './components/Shared/Navbar/Navbar'
import { UserProvider } from './providers/UserProvider';

function App() {
  const location = useLocation();
  const showNavbar = !['/login', '/signup'].includes(location.pathname);

  return (
    <>
      <UserProvider>
        {showNavbar && <Navbar />}
      </UserProvider>
    </>
  )
}

export default App
