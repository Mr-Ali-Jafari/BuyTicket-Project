import { useEffect } from 'react';

// css
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

// router
import { useRoutes } from 'react-router-dom'
import routes from './router'

// components
import Header from './Components/Header/Header'
import HeaderMobile from './Components/Header/HeaderMobile/HeaderMobile'
import Login from './Components/Login/Login'
import CheckCode from './Components/Login/CheckCode'

// alerts
import { ToastContainer } from 'react-toastify'

// context
import { HeaderProvider } from './Context/header'
// hooks 
import useUserInfo from './hooks/useUserInfo';

function App() {
  let router = useRoutes(routes)
  const userInfo = useUserInfo()
  useEffect(() => {
    userInfo()
  }, [])

  return (
    <>
      <HeaderProvider>
        <HeaderMobile />
        <Header />
        <Login />
        <CheckCode />
      </HeaderProvider>
      <ToastContainer />
      {router}
    </>
  )
}

export default App
