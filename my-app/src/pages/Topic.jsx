import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function Topic() {
  const { currentUser, adminUser, isAuthenticated } = useAuth();
  
  const topics = [
    { id: "percentage", name: "Percentage" },
    { id: "profit-loss", name: "Profit & Loss" },
    { id: "time-work", name: "Time & Work" },
    { id: "speed-distance", name: "Speed & Distance" },
    { id: "ratio", name: "Ratio" },
    { id: "number-series", name: "Number Series" },
    { id: "ages", name: "Ages" },
    { id: "simple-interest", name: "Simple Interest" },
    { id: "probability", name: "Probability" },
    { id: "average", name: "Average" },
  ];

  return (
    <div
      style={{
        minHeight: "calc(100vh - 120px)", 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        boxSizing: "border-box",
      }}
    >
     
      <h2
        style={{
          fontSize: "32px",
          color: "#004d40",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Select a Topic
      </h2>

      {isAuthenticated && (
        <div style={{
          background: currentUser ? '#e8f5e8' : '#ffe8e8',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: `2px solid ${currentUser ? '#4CAF50' : '#ff6b6b'}`,
          maxWidth: '600px',
          width: '100%'
        }}>
          {currentUser && (
            <p style={{ margin: 0, color: '#2e7d32', fontWeight: 'bold', textAlign: 'center' }}>
              📚 {currentUser.name}, choose a topic to study or practice!
            </p>
          )}
          {adminUser && (
            <p style={{ margin: 0, color: '#d32f2f', fontWeight: 'bold', textAlign: 'center' }}>
              🔧 Admin {adminUser.name} - Topic Management View
            </p>
          )}
        </div>
      )}
      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        {topics.map((topic) => (
          <Link
            key={topic.id}
            to={`/topic/${topic.id}`}
            style={{
              padding: "20px",
              background: "#e0f7fa",
              borderRadius: "12px",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "16px",
              color: "#00796b",
              textDecoration: "none",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            {topic.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Topic;
