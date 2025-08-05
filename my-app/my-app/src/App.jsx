import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Topic from "./pages/Topic";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { isAuthenticated, getCurrentUser } from './services/auth';
import { AuthContext } from './contexts/auth.context';
import Percentage from "./pages/topics/Percentage";
import ProfitLoss from "./pages/topics/ProfitLoss";
import TimeWork from "./pages/topics/TimeWork";
import SpeedDistance from "./pages/topics/SpeedDistance";
import Ratio from "./pages/topics/Ratio";
import NumberSeries from "./pages/topics/NumberSeries";
import Ages from "./pages/topics/Ages";
import SimpleInterest from "./pages/topics/SimpleInterest";
import Probability from "./pages/topics/Probability";
import Average from "./pages/topics/Average";
function App() {
  // create a state member for keeping user details
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is authenticated on app load
    if (isAuthenticated()) {
      const userData = getCurrentUser();
      setUser(userData);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route
                path='/'
                element={<Login />}
              />
              <Route
                path='register'
                element={<Register />}
              />
              <Route
                path='home'
                element={user ? <Home /> : <Navigate to='/' />}
              />
              <Route
                path='topic'
                element={user ? <Topic /> : <Navigate to='/' />}
              />
              <Route
                path='topic/percentage'
                element={user ? <Percentage /> : <Navigate to='/' />}
              />
              <Route
                path='topic/profit-loss'
                element={user ? <ProfitLoss /> : <Navigate to='/' />}
              />
              <Route
                path='topic/time-work'
                element={user ? <TimeWork /> : <Navigate to='/' />}
              />
              <Route
                path='topic/speed-distance'
                element={user ? <SpeedDistance /> : <Navigate to='/' />}
              />
              <Route
                path='topic/ratio'
                element={user ? <Ratio /> : <Navigate to='/' />}
              />
              <Route
                path='topic/number-series'
                element={user ? <NumberSeries /> : <Navigate to='/' />}
              />
              <Route
                path='topic/ages'
                element={user ? <Ages /> : <Navigate to='/' />}
              />
              <Route
                path='topic/simple-interest'
                element={user ? <SimpleInterest /> : <Navigate to='/' />}
              />
              <Route
                path='topic/probability'
                element={user ? <Probability /> : <Navigate to='/' />}
              />
              <Route
                path='topic/average'
                element={user ? <Average /> : <Navigate to='/' />}
              />
              <Route
                path='quiz'
                element={user ? <Quiz /> : <Navigate to='/' />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App