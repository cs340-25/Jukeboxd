import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import '../styles/pages/Auth.css'

const Auth = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    if (error) {
      console.error('Authentication error:', error)
    }
  }, [error])

  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    if (password.length < 7) {
      return 'Password must be at least 7 characters'
    }

    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one capital letter'
    }

    const allowedSpecialChars = '~`!@#$%^&*()-_+={}[]|\\;:"<>,./?'
    const hasAllowedSpecial = [...password].some(char => allowedSpecialChars.includes(char))
    if (!hasAllowedSpecial) {
      return 'Password must contain at least one special character'
    }

    // Check for unrecognized special characters
    const unrecognizedChar = [...password].find(char => {
      return !char.match(/[a-zA-Z0-9]/) && !allowedSpecialChars.includes(char)
    })
    if (unrecognizedChar) {
      return 'Unrecognized character detected'
    }

    return ''
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Real-time validation
    if (name === 'email') {
      setErrors(prev => ({
        ...prev,
        email: validateEmail(value) ? '' : 'Invalid email format'
      }))
    }
    if (name === 'password') {
      setErrors(prev => ({
        ...prev,
        password: validatePassword(value)
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate before submission
    const emailError = validateEmail(formData.email) ? '' : 'Invalid email format'
    const passwordError = validatePassword(formData.password)

    setErrors({
      email: emailError,
      password: passwordError
    })

    if (!emailError && !passwordError) {
      // Proceed with form submission
      console.log('Form submitted:', formData)
    }
  }

  // Add this function to check if form is valid
  const isFormValid = () => {
    if (isLogin) {
      return formData.email && formData.password && !errors.email && !errors.password
    } else {
      return formData.username && formData.email && formData.password && 
             !errors.email && !errors.password
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5001/api/google/login'
  }

  const getErrorMessage = (error) => {
    switch (error) {
      case 'access_denied':
        return 'Access was denied. Please try again.';
      case 'login_failed':
        return 'Login failed. Please try again.';
      case 'token_error':
        return 'Failed to authenticate with Google. Please try again.';
      case 'userinfo_error':
        return 'Failed to get user information. Please try again.';
      case 'database_error':
        return 'Failed to save user information. Please try again.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <motion.div 
          className="auth-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>{isLogin ? 'Welcome Back' : 'Join Jukebox\'d'}</h2>
          <p className="auth-subtitle">
            {isLogin 
              ? 'Continue your musical journey' 
              : 'Start sharing your music taste with the world'}
          </p>

          {error && (
            <div className="error-message">
              {getErrorMessage(error)}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
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
              {errors.email && <span className="error-message">{errors.email}</span>}
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
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={!isFormValid()}
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button 
            className="btn-secondary social-auth-btn"
            onClick={handleGoogleLogin}
          >
            <img src="/google-icon.svg" alt="Google" />
            Continue with Google
          </button>

          <p className="auth-switch">
            {isLogin 
              ? "Don't have an account? " 
              : "Already have an account? "}
            <button 
              className="btn-text" 
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Auth 