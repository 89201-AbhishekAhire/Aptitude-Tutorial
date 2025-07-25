import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfitLoss() {
  const navigate = useNavigate();
  const handlePracticeTest = () => navigate('/quiz');

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: 'auto' }}>
      <h1 style={{ color: '#004d40', fontSize: '32px', marginBottom: '20px' }}>
        Profit & Loss – Tricks & Practice
      </h1>

      {/* Video Section */}
      <section style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>
          📺 Key Concepts & Shortcuts
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/tKdjDSVOrzM"
            title="Profit and Loss Tips & Tricks"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/dTc6cXk-YkU"
            title="Profit & Loss Basics Tutorial"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Notes Section */}
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>📝 Important Notes & Formulas</h2>
        <ul style={{ fontSize: '18px', lineHeight: '1.6', marginLeft: '20px' }}>
          <li>Profit = SP − CP; Loss = CP − SP</li>
          <li>Profit %(P%) = (Profit ÷ CP) × 100; Loss %(L%) = (Loss ÷ CP) × 100</li>
          <li>SP = CP × (1 + P%/100); SP = CP × (1 − L%/100)</li>
          <li>Successive percentages: for profit of a% then b%, use a + b + (ab)/100</li>
          <li>Use complement for discount: Discount = MP − SP, SP = MP × (1 − discount/100)</li>
        </ul>
      </section>

      {/* Example Questions */}
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>🧠 Example Questions</h2>
        <ol style={{ fontSize: '18px', lineHeight: '1.6' }}>
          <li>A shopkeeper sells an article at a profit of 20%. If he had sold it for ₹200 more, he would have gained 25%. What was the CP?</li>
          <li>If CP = ₹120 and SP = ₹150, what is the profit %?</li>
          <li>A vendor marks goods at 20% above CP and gives a 10% discount. What is the net profit %?</li>
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
          }}>
          🎯 Take Practice Test
        </button>
      </div>
    </div>
  );
}

export default ProfitLoss;
