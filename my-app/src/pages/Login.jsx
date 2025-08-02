import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { loginUser } from '../services/user';
import { setUserSession } from '../services/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth.context';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Validate inputs
    if (!email.trim()) {
      toast.warn('Please enter email');
      return;
    }
    if (!password) {
      toast.warn('Please enter password');
      return;
    }

    setIsLoading(true);
    
    try {
      // Call the login service
      const result = await loginUser(email, password);
      
      // Store user data in session storage
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
      
      // Show success message and redirect
      toast.success(`Welcome back, ${result.firstName}!`);
      navigate('/home'); // Redirect to home page
      
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle specific error cases
      if (error.message === 'User not found') {
        toast.error('No account found with this email');
      } else if (error.message === 'Invalid password') {
        toast.error('Incorrect password');
      } else {
        toast.error(error.userFriendlyMessage || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission on Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onLogin(e);
    }
  };

  return (
    <div className='container'>
      <h2 className='page-header'>Login</h2>

      <form onSubmit={onLogin}>
        <div className='mb-3'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type='email'
            className='form-control'
            placeholder='username@test.com'
            onKeyPress={handleKeyPress}
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type='password'
            className='form-control'
            placeholder='#######'
            onKeyPress={handleKeyPress}
            required
          />
        </div>

        <div className='mb-3'>
          <div className='mb-3'>
            Don't have an account yet? <Link to='/register'>Register here</Link>
          </div>
          <button
            type='submit'
            className='btn btn-success'
            disabled={isLoading}
          >

            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Logging in...
              </>
            ) : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;