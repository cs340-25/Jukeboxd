import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../styles/pages/Auth.css'

const Auth = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const error = searchParams.get('error')
  const { isLoggedIn, login, register } = useAuth()

  useEffect(() => {
    if (error) {
      console.error('Authentication error:', error)
    }
    
    // Redirect if already logged in
    if (isLoggedIn) {
      navigate('/')
    }
  }, [error, navigate, isLoggedIn])

  const [isLoginMode, setIsLoginMode] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear any form errors when user types
    if (formError) {
      setFormError('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError('')
    
    // Simulate API call delay
    setTimeout(() => {
      if (isLoginMode) {
        // For presentation, only allow alex@gmail.com with password 123
        if (formData.email === 'alex@gmail.com' && formData.password === '123') {
          // Use login function from context
          login({
            email: formData.email,
            username: 'Alex',
            avatar: 'https://ui-avatars.com/api/?name=Alex&background=random'
          })
          
          // Redirect to home page
          navigate('/')
        } else {
          setFormError('Invalid email or password. Try alex@gmail.com / 123')
        }
      } else {
        // For registration, just log them in automatically
        register({
          email: formData.email,
          username: formData.username || 'User',
          avatar: `https://ui-avatars.com/api/?name=${formData.username || 'User'}&background=random`
        })
        
        // Redirect to home page
        navigate('/')
      }
      
      setIsSubmitting(false)
    }, 800) // Simulate network delay
  }

  const handleGoogleLogin = () => {
    // For presentation, simulate Google login
    setIsSubmitting(true)
    
    setTimeout(() => {
      login({
        email: 'user@gmail.com',
        username: 'Google User',
        avatar: 'https://ui-avatars.com/api/?name=Google+User&background=random'
      })
      
      navigate('/')
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <motion.div 
          className="auth-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>{isLoginMode ? 'Welcome Back' : 'Join Jukebox\'d'}</h2>
          <p className="auth-subtitle">
            {isLoginMode 
              ? 'Continue your musical journey' 
              : 'Start sharing your music taste with the world'}
          </p>

          {error && (
            <div className="error-message">
              An authentication error occurred. Please try again.
            </div>
          )}
          
          {formError && (
            <div className="error-message">
              {formError}
            </div>
          )}
          
          {isLoginMode && (
            <div className="demo-credentials">
              <p>For demo: Use email <strong>alex@gmail.com</strong> and password <strong>123</strong></p>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLoginMode && (
              <div className="form-group">
                <input 
                  type="text" 
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            )}
            <div className="form-group">
              <input 
                type="email" 
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="password" 
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required 
              />
            </div>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? 'Processing...' 
                : isLoginMode ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button 
            className="btn-secondary social-auth-btn"
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
          >
            <span className="google-icon">G</span>
            Continue with Google
          </button>

          <p className="auth-switch">
            {isLoginMode 
              ? "Don't have an account? " 
              : "Already have an account? "}
            <button 
              className="btn-text" 
              onClick={() => setIsLoginMode(!isLoginMode)}
              disabled={isSubmitting}
            >
              {isLoginMode ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Auth 