import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBook, FaChalkboardTeacher, FaBolt, FaTrophy, FaBrain, FaComments } from "react-icons/fa";

function AfterLoginHome({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* Sidebar */}
      <div className="bg-white border-end shadow-sm d-flex flex-column align-items-center py-4" style={{ width: 240, minHeight: "100vh", position: "sticky", top: 0 }}>
        <div className="mb-4">
          <FaBrain size={40} className="text-primary" />
          <h4 className="mt-2 mb-0 fw-bold text-primary">Aptitude</h4>
        </div>
        <ul className="nav flex-column w-100">
          <li className="nav-item mb-2">
            <a className="nav-link active d-flex align-items-center" href="#">
              <FaBook className="me-2" /> Aptitude
            </a>
          </li>
        </ul>
      </div>
      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Top Bar */}
        <div className="d-flex justify-content-between align-items-center border-bottom bg-white px-4 py-3 shadow-sm">
          <div></div>
          <div className="d-flex align-items-center">
            <span className="fw-semibold me-3">Welcome, <span className="text-primary">{user.name}</span></span>
            <button
              className="btn btn-outline-primary btn-sm me-2"
              onClick={() => navigate("/feedback")}
            >
              <FaComments className="me-1" />
              Feedback
            </button>
            <button
              className="btn btn-outline-danger btn-sm px-4 fw-bold"
              onClick={onLogout}
            >
              Log Out
            </button>
          </div>
        </div>
        {/* Dashboard Content */}
        <div className="container d-flex flex-column align-items-center justify-content-center flex-grow-1">
          <h1 className="fw-bold my-5 display-4 text-dark">APTITUDE</h1>
          <div className="row g-4 w-100 justify-content-center">
            <div className="col-12 col-md-6 col-lg-4">
              <div
                className="card dashboard-card h-100 text-center shadow border-0 p-4"
                style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
                onClick={() => navigate("/study-dashboard")}
              >
                <FaChalkboardTeacher size={40} className="mb-3 text-success" />
                <h4 className="fw-bold">STUDY MODE</h4>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div
                className="card dashboard-card h-100 text-center shadow border-0 p-4"
                style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
                onClick={() => navigate("/training-dashboard")}
              >
                <FaBolt size={40} className="mb-3 text-warning" />
                <h4 className="fw-bold">TRAINING MODE</h4>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div
                className="card dashboard-card h-100 text-center shadow border-0 p-4"
                style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
                onClick={() => navigate("/challenge-dashboard")}
              >
                <FaTrophy size={40} className="mb-3 text-danger" />
                <h4 className="fw-bold">CHALLENGE MODE</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Custom CSS for hover effect */}
      <style>{`
        .dashboard-card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12) !important;
        }
        .nav-link.active, .nav-link:hover {
          background: #e9ecef;
          border-radius: 8px;
          color: #0d6efd !important;
        }
      `}</style>
    </div>
  );
}
export default AfterLoginHome;
