import React from 'react'

// css
import './HomeFilter.css'

// bootstrap
import { Col, Row } from 'react-bootstrap';

// icons
import { BsAirplaneEngines } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

function HomeFilterItem({ title, icon, isActive }) {
    return (
        <p className={`home-filter-item d-flex align-items-center justify-content-center gap-2 m-0 ${isActive && 'active'}`}>
            {icon}
            {title}
        </p>
    ) 
}

function HomeFilter() {
    return (
        <div className='filter-box expand-filter-box'>
            <div className="topbar d-flex justify-content-md-start justify-content-center gap-4">
                <HomeFilterItem isActive={true} icon={<BsAirplaneEngines />} title="Foreign flight" />
                <HomeFilterItem icon={<BsAirplaneEngines />} title="Domestic flight" />
            </div>
            <hr />
            <div className="btns">
                <button className='btn--outline' >go</button>
                <button className='btn--outline active'>go and forth</button>
                <button className='btn--outline'>multi-track</button>
            </div>
            <Row className='mt-4 row-gap-3'>
                <Col lg={2} md={6} xs={12}>
                    <div>
                        <input type="text" placeholder='origin' className='filter-input' />
                    </div>
                </Col>
                <Col lg={2} md={6} xs={12}>
                    <div>
                        <input type="text" placeholder='destination' className='filter-input' />
                    </div>
                </Col>
                <Col lg={2} md={6} xs={12}>
                    <div>
                        <input type="text" placeholder='Round trip date' className='filter-input' />
                    </div>
                </Col>
                <Col lg={2} md={6} xs={12}>
                    <div>
                        <input type="text" placeholder='number of passengers' className='filter-input' />
                    </div>
                </Col>
                <Col lg={2} md={6} xs={12}>
                    <div>
                        <input type="text" placeholder='Flight class' className='filter-input' />
                    </div>
                </Col>
                <Col lg={2} md={6} xs={12}>
                    <div><button className='btn--primary'>
                        <span>search</span>
                        <FaSearch />
                    </button></div>
                </Col>
            </Row>
        </div>
    )
}

export default HomeFilter
