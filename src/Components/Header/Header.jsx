// images
import logo from '../../assets/images/LOGO.png'

// css
import './Header.css'

// router
import { NavLink } from 'react-router-dom'

// icons
import { FiPhone } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5";

// context
import { useContext } from 'react';
import { headerData } from '../../Context/header';
import { AuthContext } from '../../Context/authContext'

function HeaderItems({ title, link }) {
  return (
    <NavLink to={link} end className={({ isActive }) => isActive ? 'header-item active' : 'header-item'}>
      {title}
    </NavLink>
  )
}


function Header() {

  // context
  let context = useContext(headerData)
  let authContext = useContext(AuthContext)

  return (
    <>
      <header className='d-flex align-items-center justify-content-center'>
        <div className='container-xl container-fluid d-flex justify-content-between align-items-center'>
          <nav className="left d-lg-flex d-none align-items-center gap-4">
            <button onClick={() => context.setIsLoginOpen(true)} className='btn--primary'>
              <span>{authContext.isLogin ? 'Dashboard' : 'login / register'}</span>
              <FaRegUser />
            </button>
            <div className="call d-flex justify-content-center align-items-center gap-2">
              <FiPhone />
              <span>support 021-4045</span>
            </div>
          </nav>
          <nav className="right d-lg-flex d-none align-items-center gap-5">
            <ul className='d-flex align-items-center gap-3 m-0'>
              <HeaderItems title="my travels" link="/dds" />
              <HeaderItems title="Travel insurance" link="/dd" />
              <HeaderItems title="Home" link="/" />
            </ul>
            <img src={logo} alt="logo" />
          </nav>
          <div className="mobile-header d-lg-none d-flex align-align-items-center justify-content-between w-100">
            {context.isHeaderOpen ?
              <IoCloseSharp onClick={() => context.setIsHeaderOpen(prev => !prev)} />
              : <IoMenuSharp onClick={() => context.setIsHeaderOpen(prev => !prev)} />}
            <img className='mobile-logo' src={logo} alt="logo" />
            <FaRegUser onClick={() => context.setIsLoginOpen(true)} className='mobile-user' />
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
