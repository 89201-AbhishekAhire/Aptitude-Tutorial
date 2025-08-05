import React from "react";
import { useNavigate } from "react-router-dom";

function Probability() {
  const navigate = useNavigate();
  const handlePracticeTest = () => navigate("/quiz");

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ color: "#004d40", fontSize: "32px", marginBottom: "20px" }}>
        Probability – Tricks & Practice
      </h1>

      {/* Video Section */}
      <section style={{ marginTop: "20px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
          📺 How to Solve Probability Problems
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/BTYcStz2PHg"
            title="Probability Tricks"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/lxm6ez2cx6Y"
            title="Probability Basics & Tricks"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Notes Section */}
      <section style={{ marginTop: "40px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
          📝 Important Notes & Tricks
        </h2>
        <ul style={{ fontSize: "18px", lineHeight: "1.6", marginLeft: "20px" }}>
          <li>Probability = Favorable outcomes ÷ Total outcomes.</li>
          <li>P(A') = 1 – P(A) for the complement of an event.</li>
          <li>For "or" use addition, for "and" use multiplication rules.</li>
          <li>P(A ∪ B) = P(A) + P(B) − P(A ∩ B) (union formula).</li>
          <li>Many problems use dice, coins, or card drawing—be familiar with these basics.</li>
        </ul>
      </section>

      {/* Example Questions */}
      <section style={{ marginTop: "40px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
          🧠 Example Questions
        </h2>
        <ol style={{ fontSize: "18px", lineHeight: "1.6" }}>
          <li>What is the probability of getting a sum of 7 on a pair of dice?</li>
          <li>You flip a coin 3 times. What is the probability of getting exactly 2 heads?</li>
          <li>From a deck of 52 cards, what is the probability of drawing an ace?</li>
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

export default Probability;
