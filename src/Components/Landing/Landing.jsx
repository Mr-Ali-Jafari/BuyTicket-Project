import React from 'react'

// images
import landingImg from '../../assets/images/landing-img.png'

// css
import './Landing.css'

function Landing({ isHome, children }) {
    return (
        <div className='landing mt-2'>
            {isHome && (
                <div className='home'>
                    <h2 className='title'>Convenience and speed in</h2>
                    <h2 className='title'>Booking plane tickets with Bilito</h2>
                </div>
            )}
            <img src={landingImg} alt="airplane" className='d-block d-xl-none' />
            {children}
        </div>
    )
}

export default Landing
