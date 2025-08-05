import React from 'react';
import { useNavigate } from 'react-router-dom';

function SimpleInterest() {
  const navigate = useNavigate();
  const handlePracticeTest = () => navigate('/quiz');

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: 'auto' }}>
      <h1 style={{ color: '#004d40', fontSize: '32px', marginBottom: '20px' }}>
        Simple Interest – Tricks & Practice
      </h1>

      {/* Video Section */}
      <section style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>
          📺 How to Solve Simple Interest Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/amqcEBuX6do"  
            title="Simple Interest Fast Trick"
            frameBorder="0"
            allowFullScreen
          ></iframe>

          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/6iqQA7MFpFs"
            title="Simple Interest Q&A Aptitude"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Notes Section */}
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>
          📝 Important Notes & Formula
        </h2>
        <ul style={{ fontSize: '18px', lineHeight: '1.6', marginLeft: '20px' }}>
          <li>Simple Interest (SI) = (P × R × T) ÷ 100.</li>
          <li>Total Amount = Principal + SI.</li>
          <li>If SI is given, you can find R or T using formula rearrangement.</li>
          <li>Quick trick: If SI for 2 years = X, then SI for 1 year = X ÷ 2.</li>
          <li>Always check whether time is in months or years; adjust formula accordingly.</li>
        </ul>
      </section>

      {/* Example Questions */}
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>
          🧠 Example Questions
        </h2>
        <ol style={{ fontSize: '18px', lineHeight: '1.6' }}>
          <li>Find the SI on ₹14,000 for 3 years at 5% p.a.</li>
          <li>If SI on ₹10,000 for 2 years is ₹1,200, what is the rate?</li>
          <li>Principal doubles in 5 years under SI. What is the rate?</li>
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
            cursor: 'pointer'
          }}
        >
          🎯 Take Practice Test
        </button>
      </div>
    </div>
  );
}

export default SimpleInterest;
