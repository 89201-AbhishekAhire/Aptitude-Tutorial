import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaEdit, FaComments, FaBrain } from "react-icons/fa";

function AdminDashboard({ admin, onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Top Bar */}
        <div className="d-flex justify-content-between align-items-center border-bottom bg-white px-4 py-3 shadow-sm">
          <div className="fw-bold text-primary">Home</div>
          <div className="d-flex align-items-center">
            <span className="fw-semibold me-3 text-danger">ADMIN</span>
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
          <h1 className="fw-bold my-5 display-4 text-dark">ADMIN</h1>
          <div className="row g-4 w-100 justify-content-center">
            <div className="col-12 col-md-6 col-lg-4">
              <div
                className="card dashboard-card h-100 text-center shadow border-0 p-4"
                style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
                onClick={() => navigate("/admin/manage-topics")}
              >
                <FaEdit size={40} className="mb-3 text-primary" />
                <h4 className="fw-bold">Manage Topic / Question</h4>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div
                className="card dashboard-card h-100 text-center shadow border-0 p-4"
                style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
                onClick={() => navigate("/admin/manage-users")}
              >
                <FaUsers size={40} className="mb-3 text-success" />
                <h4 className="fw-bold">Manage User</h4>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div
                className="card dashboard-card h-100 text-center shadow border-0 p-4"
                style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
                onClick={() => navigate("/admin/feedback")}
              >
                <FaComments size={40} className="mb-3 text-warning" />
                <h4 className="fw-bold">Feedback Review</h4>
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
      `}</style>
    </div>
  );
}

export default AdminDashboard;
