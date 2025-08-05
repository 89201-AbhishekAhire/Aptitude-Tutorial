import React from "react";
import { Link } from "react-router-dom";
import { FaCalculator, FaPercent, FaBalanceScale, FaClock, FaRoad, FaEquals, FaUser, FaMoneyBill, FaDice, FaChartBar } from "react-icons/fa";

const studyTopics = [
  { id: "percentage", name: "Percentage", icon: <FaPercent /> },
  { id: "profit-loss", name: "Profit & Loss", icon: <FaBalanceScale /> },
  { id: "time-work", name: "Time & Work", icon: <FaClock /> },
  { id: "speed-distance", name: "Speed & Distance", icon: <FaRoad /> },
  { id: "ratio", name: "Ratio", icon: <FaEquals /> },
  { id: "number-series", name: "Number Series", icon: <FaCalculator /> },
  { id: "ages", name: "Ages", icon: <FaUser /> },
  { id: "simple-interest", name: "Simple Interest", icon: <FaMoneyBill /> },
  { id: "probability", name: "Probability", icon: <FaDice /> },
  { id: "average", name: "Average", icon: <FaChartBar /> },
];

function StudyModeDashboard() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold" style={{ color: "#004d40" }}>
        Study Mode - Select a Topic
      </h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 justify-content-center">
        {studyTopics.map((topic) => (
          <div className="col" key={topic.id}>
            <Link
              to={`/study/${topic.id}`}
              className="text-decoration-none"
            >
              <div className="card h-100 shadow-sm text-center study-card border-0"
                style={{
                  borderRadius: "16px",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  background: "#e8f5e8",
                  color: "#2e7d32",
                  fontWeight: "bold",
                  fontSize: "18px",
                  padding: "32px 0"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>
                  {topic.icon}
                </div>
                {topic.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudyModeDashboard; 