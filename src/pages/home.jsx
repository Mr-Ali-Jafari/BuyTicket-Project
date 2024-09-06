import React from 'react'

// components
import Landing from "../Components/Landing/Landing";
import HomeFilter from '../Components/HomeFilter/HomeFilter';


function Home() {
  return (
    <>
      <Landing isHome>
        <HomeFilter />
      </Landing>
    </>
  )
}

export default Home
