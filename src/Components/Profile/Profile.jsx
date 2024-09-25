// css
import './Profile.css'

// bootstrap
import { Col, Row } from 'react-bootstrap'

// icons
import { LuPencil, LuImagePlus, LuWallet } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { BsAirplane } from "react-icons/bs";
import { FiMessageCircle } from "react-icons/fi";

// imgaes
import user from '../../assets/images/user.png'

// router
import { NavLink } from 'react-router-dom';

function NavlinkDiv({ title, icon, link }) {
    return (
        <NavLink className="navlink" activeClassName="active" end to={link}>
            <div>
                {icon}
                <span className="title">{title}</span>
            </div>
            <span className="dot"></span>
        </NavLink>
    )
}

function Profile() {
    return (
        <>
            <h3 className="mb-5">User account information</h3>
            <div className='profile p-4 border-gray-4 d-block d-lg-flex justify-content-between align-items-start'>
                <div className="topbar text-center d-block d-lg-none">
                    <div className="img-box position-relative">
                        <img src={user} alt="" />
                        <div className="icon d-flex align-items-center justify-content-center position-absolute">
                            <LuImagePlus />
                        </div>
                    </div>
                    <p className="m-0 mt-3">alireza aghdam</p>
                    <p className="m-0 label mb-3">0912 643 2987</p>
                </div>
                <Row className='row-gap-sm-4 row-gap-2'>
                    <Col sm={6} xs={12}>
                        <p className="label m-0 mb-0 mb-sm-1">name and lastname</p>
                        <p className="info m-0 fw-bold">alireza aghdam</p>
                    </Col>
                    <Col sm={6} xs={12}>
                        <p className="label m-0 mb-0 mb-sm-1">gender</p>
                        <p className="info m-0 fw-bold">male</p>
                    </Col>
                    <Col sm={6} xs={12}>
                        <p className="label m-0 mb-0 mb-sm-1">nationality code</p>
                        <p className="info m-0 fw-bold">011192764</p>
                    </Col>
                    <Col sm={6} xs={12}>
                        <p className="label m-0 mb-0 mb-sm-1">phone number</p>
                        <p className="info m-0 fw-bold">09384955054</p>
                    </Col>
                </Row>
                <a href="#" className='d-flex gap-2 align-items-center mt-3 mt-lg-0'><LuPencil />Change Information </a>
            </div>
        </>
    )
}

function ProfileBar() {
    return (
        <div className='border-gray-4 p-2 mb-4'>
            <div className="topbar text-center d-none d-lg-block">
                <div className="img-box position-relative">
                    <img src={user} alt="" />
                    <div className="icon d-flex align-items-center justify-content-center position-absolute">
                        <LuImagePlus />
                    </div>
                </div>
                <p className="m-0 mt-3">alireza aghdam</p>
                <p className="m-0 label mb-3">0912 643 2987</p>
            </div>
            <div className="bottombar">
                <NavlinkDiv link="" title="user Information" icon={<FaRegUser />} />
                <NavlinkDiv link="travels" title="my travels" icon={<BsAirplane />} />
                <NavlinkDiv link="tickets" title="My tickets" icon={<FiMessageCircle />} />
                <NavlinkDiv link="wallet" title="wallet" icon={<LuWallet />} />
                <a href="logout" className='logout w-100 p-3 fs-5 text-center d-block'>logout</a>
            </div>
        </div>
    )
}


export { Profile, ProfileBar }
