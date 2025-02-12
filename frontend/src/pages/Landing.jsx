import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import ScrollScene from '../components/ScrollScene'
import '../styles/Landing.css'

function Landing() {
  return (
    <div className="landing">
      <ScrollScene />
      <Navbar />
      <Hero />
    </div>
  )
}

export default Landing 