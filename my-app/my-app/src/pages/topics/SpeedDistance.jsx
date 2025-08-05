import React from 'react';
import { useNavigate } from 'react-router-dom';

function SpeedDistance() {
  const navigate = useNavigate();
  const handlePracticeTest = () => navigate('/quiz');

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: 'auto' }}>
      <h1 style={{ color: '#004d40', fontSize: '32px', marginBottom: '20px' }}>
        Time, Speed & Distance – Tricks & Practice
      </h1>

      {/* Video Section */}
      <section style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>
          📺 How to Solve Time, Speed & Distance Problems
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/HFVpwZPl2A8"
            title="Time Speed Distance Quant Aptitude Tips"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/XHnvtpmrJUk"
            title="Time Speed & Distance Basics"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Notes Section */}
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>📝 Important Notes & Formulas</h2>
        <ul style={{ fontSize: '18px', lineHeight: '1.6', marginLeft: '20px' }}>
          <li>Speed = Distance ÷ Time; ensure consistent units.</li>
          <li>If multiple speeds are involved, use total distance ÷ total time.</li>
          <li>Boat problems: Upstream = speed – current; Downstream = speed + current.</li>
          <li>Relative speed for two moving objects is |v1 + v2| (opposite) or |v1 – v2| (same direction).</li>
          <li>Convert units as needed: e.g., km/h to m/s → × 5/18, and vice versa → × 18/5.</li>
        </ul>
      </section>

      {/* Example Questions */}
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>🧠 Example Questions</h2>
        <ol style={{ fontSize: '18px', lineHeight: '1.6' }}>
          <li>A car travels 150 km at 50 km/h and then 100 km at 40 km/h. What is its average speed?</li>
          <li>A boat travels downstream 30 km in 2 hours and returns upstream in 3 hours. Find speed of boat in still water and speed of the current.</li>
          <li>Two trains, 180 km apart, travel towards each other at 60 km/h and 40 km/h. How long until they meet?</li>
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

export default SpeedDistance;
