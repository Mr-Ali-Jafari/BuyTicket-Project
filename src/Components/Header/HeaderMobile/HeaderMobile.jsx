import { createPortal } from "react-dom";
import { useContext } from "react";
import { headerData } from "../../../Context/header";

// css
import './HeaderMobile.css'

// router
import { NavLink } from 'react-router-dom'

// icons 
import { MdOutlineReceiptLong } from "react-icons/md";
import { BsAirplaneEngines } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";

function MobileSidebarItem({ title, icon, link }) {
    return (
        <NavLink to={link} end className={({ isActive }) => isActive ? 'mobile-sidebar-item active' : 'mobile-sidebar-item'}>
            {icon}
            <span>{title}</span>
        </NavLink>
    )
}

function HeaderMobile() {
    let context = useContext(headerData)
    return createPortal(
        <>
            <div className={context.isHeaderOpen ? 'mobile-sidebar active' : 'mobile-sidebar'}>
                <div>
                    <MobileSidebarItem icon={<FiHome />} title="Home" link="/" />
                    <MobileSidebarItem icon={<MdOutlineReceiptLong />} title="Travel insurance" link="/dd" />
                    <MobileSidebarItem icon={<BsAirplaneEngines />} title="my travels" link="/dds" />
                    <MobileSidebarItem icon={<BsAirplaneEngines />} title="my travels" link="/dds" />
                    <MobileSidebarItem icon={<BsAirplaneEngines />} title="my travels" link="/dds" />
                    <MobileSidebarItem icon={<BsAirplaneEngines />} title="my travels" link="/dds" />
                </div>
                <button onClick={() => context.setIsLoginOpen(true)} className='btn--primary justify-content-center'>
                    <span>login / register</span>
                    <FaRegUser />
                </button>
            </div>
        </>
        , document.getElementById('header_sidebar'))
}

export default HeaderMobile
