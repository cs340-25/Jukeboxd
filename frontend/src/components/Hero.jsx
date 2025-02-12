import React from 'react'
import { motion } from 'framer-motion'
import ScrollAnimation from './ScrollAnimation'
import '../styles/Hero.css'

function Hero() {
  return (
    <section className="hero-container">
      <div className="animation-wrapper">
        <ScrollAnimation />
      </div>
      
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Your Music Journey
          <span className="gradient-text"> Reimagined</span>
        </motion.h1>
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Rate, review, and discover music with friends.
          Join the community of music enthusiasts.
        </motion.p>
        <motion.button 
          className="cta-button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Get Started
        </motion.button>
      </motion.div>

      <motion.div 
        className="hero-features"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        {[
          { icon: '🎵', title: 'Track Music', desc: 'Keep track of what you listen to' },
          { icon: '✍️', title: 'Write Reviews', desc: 'Share your thoughts on albums' },
          { icon: '🤝', title: 'Connect', desc: 'Follow friends and share recommendations' }
        ].map((feature, index) => (
          <motion.div 
            key={index}
            className="feature-card"
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <span className="feature-icon">{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Hero 