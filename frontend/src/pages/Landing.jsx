import React from 'react'
import '../styles/Landing.css'

function Landing() {
  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to My Portfolio</h1>
          <p className="hero-subtitle">Frontend Developer & Creative Designer</p>
          <button className="cta-button">Explore My Work</button>
        </div>
      </section>

      {/* About Section */}
      <section className="section about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>Your compelling introduction goes here...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {/* Project Cards */}
            <div className="project-card">
              <div className="project-image"></div>
              <h3>Project One</h3>
              <p>Project description goes here</p>
            </div>
            {/* Add more project cards */}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <form className="contact-form">
              <input type="email" placeholder="Your Email" />
              <textarea placeholder="Your Message"></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing 