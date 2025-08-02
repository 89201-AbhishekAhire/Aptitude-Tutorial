import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { registerUser } from '../services/user';
import { setUserSession } from '../services/auth';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/auth.context';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onRegister = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast.warn('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await registerUser(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.phone,
        formData.password
      );
      
      // Store user data in session storage for automatic login
      setUserSession(result.token, {
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email
      });
      
      // Set user in context
      setUser({
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email
      });
      
      toast.success(`Welcome ${result.firstName}! Registration successful!`);
      navigate('/home'); // Redirect directly to home page
      
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container'>
      <h2 className='page-header'>Register</h2>
      <form onSubmit={onRegister} className='form'>
        {/* Update all input fields to use name and handleChange */}
        <div className='mb-3'>
          <label>First Name</label>
          <input
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
            type='text'
            className='form-control'
            required
          />
        </div>
        <div className='mb-3'>
          <label>Last Name</label>
          <input
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
            type='text'
            className='form-control'
            required
          />
        </div>
        <div className='mb-3'>
          <label>Email</label>
          <input
            name="email"
            onChange={handleChange}
            type='email'
            className='form-control'
            value={formData.email}
            required
          />
        </div>
        <div className='mb-3'>
          <label>Phone Number</label>
          <input
            name="phone"
            onChange={handleChange}
            type='tel'
            className='form-control'
            value={formData.phone}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor=''>Password</label>
          <input
            name="password"
            onChange={handleChange}
            type='password'
            className='form-control'
            value={formData.password}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor=''>Confirm Password</label>
          <input
            name="confirmPassword"
            onChange={handleChange}
            type='password'
            className='form-control'
            value={formData.confirmPassword}
            required
          />
        </div>

        <div className='mb-3'>
          <div className='mb-3'>
            Already have an account? <Link to='/login'>Login here</Link>
          </div>
        </div>
        <button
          type="submit"
          className='btn btn-success'
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Register