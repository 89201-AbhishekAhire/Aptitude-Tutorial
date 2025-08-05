import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalculator, FaPercent, FaBalanceScale, FaClock, FaRoad, FaEquals, FaUser, FaMoneyBill, FaDice, FaChartBar, FaTrophy } from "react-icons/fa";
import axios from "axios";

const challengeTopics = [
  { id: "percentage", name: "Percentage", icon: <FaPercent />, questionCount: 10, timeLimit: 10 },
  { id: "profit-loss", name: "Profit & Loss", icon: <FaBalanceScale />, questionCount: 10, timeLimit: 10 },
  { id: "time-work", name: "Time & Work", icon: <FaClock />, questionCount: 10, timeLimit: 10 },
  { id: "speed-distance", name: "Speed & Distance", icon: <FaRoad />, questionCount: 10, timeLimit: 10 },
  { id: "ratio", name: "Ratio", icon: <FaEquals />, questionCount: 10, timeLimit: 10 },
  { id: "number-series", name: "Number Series", icon: <FaCalculator />, questionCount: 10, timeLimit: 10 },
  { id: "ages", name: "Ages", icon: <FaUser />, questionCount: 10, timeLimit: 10 },
  { id: "simple-interest", name: "Simple Interest", icon: <FaMoneyBill />, questionCount: 10, timeLimit: 10 },
  { id: "probability", name: "Probability", icon: <FaDice />, questionCount: 10, timeLimit: 10 },
  { id: "average", name: "Average", icon: <FaChartBar />, questionCount: 10, timeLimit: 10 },
];

function ChallengeModeDashboard() {
  const [userScores, setUserScores] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This will be replaced with backend API call
    // For now, simulate user scores
    const mockScores = {
      "percentage": { lastScore: 8, totalAttempts: 2, bestScore: 9, timeTaken: "8:30" },
      "profit-loss": { lastScore: 7, totalAttempts: 1, bestScore: 7, timeTaken: "9:15" },
      "time-work": { lastScore: 6, totalAttempts: 1, bestScore: 6, timeTaken: "9:45" },
    };
    setUserScores(mockScores);
    setLoading(false);
  }, []);

  const getScoreDisplay = (topicId) => {
    const score = userScores[topicId];
    if (!score) return "Not attempted";
    return `${score.lastScore}/10 (Best: ${score.bestScore}/10)`;
  };

  const getAttemptsDisplay = (topicId) => {
    const score = userScores[topicId];
    if (!score) return "0 attempts";
    return `${score.totalAttempts} attempt${score.totalAttempts > 1 ? 's' : ''}`;
  };

  const getTimeDisplay = (topicId) => {
    const score = userScores[topicId];
    if (!score) return "No time recorded";
    return score.timeTaken;
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold" style={{ color: "#004d40" }}>
        Challenge Mode - Timed Tests
      </h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 justify-content-center">
        {challengeTopics.map((topic) => (
          <div className="col" key={topic.id}>
            <div className="card h-100 shadow-sm border-0"
              style={{
                borderRadius: "16px",
                transition: "transform 0.2s, box-shadow 0.2s",
                background: "#f8d7da",
                border: "2px solid #dc3545"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
              }}
            >
              <div className="card-body text-center p-4">
                <div style={{ fontSize: "3rem", marginBottom: "12px", color: "#dc3545" }}>
                  {topic.icon}
                </div>
                <h5 className="fw-bold mb-3">{topic.name}</h5>
                <p className="text-muted mb-2">{topic.questionCount} Questions</p>
                <p className="text-danger mb-3">
                  <FaClock className="me-1" />
                  {topic.timeLimit} Minutes
                </p>
                
                <div className="mb-3">
                  <small className="text-muted">Last Score:</small><br/>
                  <span className="fw-bold">{getScoreDisplay(topic.id)}</span>
                </div>
                
                <div className="mb-3">
                  <small className="text-muted">Best Time:</small><br/>
                  <span className="fw-bold">{getTimeDisplay(topic.id)}</span>
                </div>
                
                <div className="mb-3">
                  <small className="text-muted">Attempts:</small><br/>
                  <span className="fw-bold">{getAttemptsDisplay(topic.id)}</span>
                </div>
                
                <Link
                  to={`/challenge/${topic.id}`}
                  className="btn btn-danger btn-lg w-100"
                >
                  <FaTrophy className="me-2" />
                  Start Challenge
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChallengeModeDashboard; 