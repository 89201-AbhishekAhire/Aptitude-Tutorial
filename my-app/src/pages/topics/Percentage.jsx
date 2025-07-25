import React from 'react';
import { useNavigate } from 'react-router-dom';

function Percentage() {
  const navigate = useNavigate();
  const handlePracticeTest = () => navigate('/quiz');

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: 'auto' }}>
      <h1 style={{ color: '#004d40', fontSize: '32px', marginBottom: '20px' }}>
        Percentage – Tricks & Practice
      </h1>

      {/* Video Section */}
      <section style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>
          📺 How to Solve Percentage Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <iframe
            width="100%" height="315"
            src="https://www.youtube.com/embed/ZLlSwFlTgJU"
            title="Aptitude Lesson 03: Percentage"
            frameBorder="0"
            allowFullScreen
          />
          <iframe
            width="100%" height="315"
            src="https://www.youtube.com/embed/fkSGkfnX-Ig"
            title="Percentage basics – Quantitative Aptitude"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </section>

      {/* Notes Section */}
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>
          📝 Important Notes & Tricks
        </h2>
        <ul style={{ fontSize: '18px', lineHeight: '1.6', marginLeft: '20px' }}>
          <li>Percentage = (Part / Whole) × 100</li>
          <li>Increase by x% → Multiply by (1 + x/100), Decrease by x% → Multiply by (1 – x/100)</li>
          <li>Successive changes: Use formula A + B + (AB)/100</li>
          <li>Discount calculation: DP = MP × (1 – discount%)</li>
          <li>“% of what?” is crucial—check the base!</li>
        </ul>
      </section>

      {/* Example Questions */}
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>
          🧠 Example Questions
        </h2>
        <ol style={{ fontSize: '18px', lineHeight: '1.6' }}>
          <li>What is 25% of 480?</li>
          <li>If price increases by 20% then decreases by 20%, find net change.</li>
          <li>A’s salary is 25% more than B’s. How much percent is B’s less than A’s?</li>
        </ol>
      </section>

      {/* Practice Test Button */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          onClick={handlePracticeTest}
          style={{
            backgroundColor: '#00796b',
            color: 'white',
            fontSize: '18px',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          🎯 Take Practice Test
        </button>
      </div>
    </div>
  );
}

export default Percentage;
