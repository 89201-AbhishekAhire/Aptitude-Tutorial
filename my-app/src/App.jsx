import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AfterLoginHome from "./pages/AfterLoginHome";
import Home from './pages/Home';
import Topic from "./pages/Topic";
import Quiz from "./pages/Quiz";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider, useAuth } from "./context/AuthContext";


import TopicsInfo from "./pages/TopicsInfo";
import TopicDetail from "./pages/TopicDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminManageUsers from "./pages/AdminManageUsers";
import AdminManageTopics from "./pages/AdminManageTopics";
import AdminFeedback from "./pages/AdminFeedback";
import StudyModeDashboard from "./pages/StudyModeDashboard";
import StudyTopicDetail from "./pages/StudyTopicDetail";
import TrainingModeDashboard from "./pages/TrainingModeDashboard";
import TrainingTest from "./pages/TrainingTest";
import ChallengeModeDashboard from "./pages/ChallengeModeDashboard";
import ChallengeTest from "./pages/ChallengeTest";
import UserFeedback from "./pages/UserFeedback";

function AppRoutes() {
  const { currentUser, adminUser, handleLogin, handleLogout, handleAdminLogin, handleAdminLogout, loading } = useAuth();

  const handleRegister = (newUser) => {
    // This is now handled by the backend, so we don't need to manage local state
    console.log('User registered:', newUser);
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      Loading...
    </div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topic" element={<Topic />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="/admin-login"
            element={<AdminLogin onAdminLogin={handleAdminLogin} />}
          />
          <Route
            path="/admin-dashboard"
            element={
              adminUser ? (
                <AdminDashboard admin={adminUser} onLogout={handleAdminLogout} />
              ) : (
                <Navigate to="/admin-login" />
              )
            }
          />
          <Route
            path="/admin/manage-users"
            element={
              adminUser ? (
                <AdminManageUsers />
              ) : (
                <Navigate to="/admin-login" />
              )
            }
          />
          <Route
            path="/admin/manage-topics"
            element={
              adminUser ? (
                <AdminManageTopics />
              ) : (
                <Navigate to="/admin-login" />
              )
            }
          />
          <Route
            path="/admin/feedback"
            element={
              adminUser ? (
                <AdminFeedback />
              ) : (
                <Navigate to="/admin-login" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              currentUser ? (
                <AfterLoginHome user={currentUser} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/challenge-dashboard"
            element={
              currentUser ? (
                <ChallengeModeDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/challenge/:topicId"
            element={
              currentUser ? (
                <ChallengeTest />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/training-dashboard"
            element={
              currentUser ? (
                <TrainingModeDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/training/:topicId"
            element={
              currentUser ? (
                <TrainingTest />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/study-dashboard"
            element={
              currentUser ? (
                <StudyModeDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/study/:topicId"
            element={
              currentUser ? (
                <StudyTopicDetail />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/feedback"
            element={
              currentUser ? (
                <UserFeedback currentUser={currentUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/topics" element={<TopicsInfo />} />
          <Route path="/topic/:topicId" element={<TopicDetail />} />
          {/* Add other routes here */}
          <Route path="*" element={<Navigate to={adminUser ? "/admin-dashboard" : currentUser ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;