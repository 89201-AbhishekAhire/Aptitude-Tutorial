import React from 'react';
import { useNavigate } from 'react-router-dom';

function TimeWork() {
  const navigate = useNavigate();
  const handlePracticeTest = () => navigate('/quiz');

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: 'auto' }}>
      <h1 style={{ color: '#004d40', fontSize: '32px', marginBottom: '20px' }}>
        Time & Work – Tricks & Practice
      </h1>

      {/* Video Section */}
      <section style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>
          📺 How to Solve Time & Work Problems
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/4nksqsrHorc"
            title="CAT 2025 Quant – Time and Work"
            frameBorder="0"
            allowFullScreen
          />
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/-RrvcDSjgYg"
            title="Best Methods & Tricks for Time and Work"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </section>

      {/* Notes Section */}
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>
          📝 Important Notes & Formulas
        </h2>
        <ul style={{ fontSize: '18px', lineHeight: '1.6', marginLeft: '20px' }}>
          <li>Work = Rate × Time. If A takes a days, his 1-day work = 1/a.</li>
          <li>Combined work: A + B = 1/a + 1/b; Total days = 1 / (sum of rates).</li>
          <li>Efficiency is inversely proportional to time taken.</li>
          <li>Pipes & cisterns: treat inlet as positive, outlet as negative rates.</li>
          <li>Men & work: M₁D₁H₁ = M₂D₂H₂ (men × days × hours = constant).</li>
        </ul>
      </section>

      {/* Example Questions */}
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>
          🧠 Example Questions
        </h2>
        <ol style={{ fontSize: '18px', lineHeight: '1.6' }}>
          <li>A can do a job in 12 days, B in 18 days. How long together?</li>
          <li>A pipe fills a tank in 6 hours, another empties in 9 hours. Net fill time?</li>
          <li>4 men can finish a job in 5 days working 6 hrs/day. How long will 6 men take at 8 hrs/day?</li>
        </ol>
      </section>

      {/* Practice Test Button */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          onClick={handlePracticeTest}
          style={{
            backgroundColor: '#00796b',
            color: '#fff',
            fontSize: '18px',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          🎯 Take Practice Test
        </button>
      </div>
    </div>
  );
}

export default TimeWork;
