import React from "react";
import { useNavigate } from "react-router-dom";

function Ratio() {
  const navigate = useNavigate();
  const handlePracticeTest = () => navigate("/quiz");

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ color: "#004d40", fontSize: "32px", marginBottom: "20px" }}>
        Ratio & Proportion – Tricks & Practice
      </h1>

      {/* Video Section */}
      <section style={{ marginTop: "20px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
          📺 How to Solve Ratio Problems
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/h1_0rZ9y0nw"
            title="Ratio & Proportion Basics"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/rStyN8BihtY"
            title="Master Ratio and Proportion"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Notes Section */}
      <section style={{ marginTop: "40px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
          📝 Important Notes & Formulas
        </h2>
        <ul style={{ fontSize: "18px", lineHeight: "1.6", marginLeft: "20px" }}>
          <li>A : B = a : b implies A = ka , B = kb for some constant k.</li>
          <li>Compound ratio: For ratios a:b and c:d, the compound ratio is ac:bd.</li>
          <li>Duplicate ratio = squares (a²:b²), triplicate = cubes (a³:b³).</li>
          <li>Use cross-multiplication method for checking proportionality.</li>
          <li>In successive partition problems, apply ratio on the whole amount directly.</li>
        </ul>
      </section>

      {/* Example Questions */}
      <section style={{ marginTop: "40px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
          🧠 Example Questions
        </h2>
        <ol style={{ fontSize: "18px", lineHeight: "1.6" }}>
          <li>If a:b = 2:3 and b:c = 4:5, find a:b:c.</li>
          <li>A mixture is made in the ratio 3:2. If total is 50 L, how much each?</li>
          <li>If salaries of A, B, C are in ratio 4 : 5 : 6 and sum is Rs 15,000, find B’s salary.</li>
        </ol>
      </section>

      {/* Practice Test Button */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={handlePracticeTest}
          style={{
            backgroundColor: "#00796b",
            color: "white",
            fontSize: "18px",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🎯 Take Practice Test
        </button>
      </div>
    </div>
  );
}

export default Ratio;
