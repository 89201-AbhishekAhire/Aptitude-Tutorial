import { Link } from "react-router-dom";

function Topic() {
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
        minHeight: "calc(100vh - 120px)", // leaves space for header & footer
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        boxSizing: "border-box",
      }}
    >
      {/* Heading on top center */}
      <h2
        style={{
          fontSize: "32px",
          color: "#004d40",
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        Select a Topic
      </h2>

      {/* Grid of buttons */}
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
