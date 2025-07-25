import React from 'react';
import { useNavigate } from 'react-router-dom';

function NumberSeries() {
  const navigate = useNavigate();
  const handlePracticeTest = () => {
    navigate('/quiz');
  };

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: 'auto' }}>
      <h1 style={{ color: '#004d40', fontSize: '32px', marginBottom: '20px' }}>
        Number Series – Tricks & Practice
      </h1>

      {/* Video Section */}
      <section style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>📺 How to Solve Number Series</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <iframe
            width="100%" height="315"
            src="https://www.youtube.com/embed/gEkV-nhiRVA"
            title="Number Series Lesson 1"
            frameBorder="0"
            allowFullScreen
          ></iframe>

          <iframe
            width="100%" height="315"
            src="https://www.youtube.com/embed/nVpKPo5R3fY"
            title="Number Series Solving Strategies"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Notes Section */}
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>📝 Important Notes & Tricks</h2>
        <ul style={{ fontSize: '18px', lineHeight: '1.6', marginLeft: '20px' }}>
          <li>Look for basic differences or ratios between consecutive terms.</li>
          <li>Check for patterns like squares, cubes, primes, Fibonacci, or alternating operations.</li>
          <li>Progressions—AP, GP, or mixed sequences—are common; test them.</li>
          <li>Don’t miss hidden increments like +1, +2, +4, doubling or halving patterns.</li>
          <li>When in doubt, find the nth term formula if consistent.</li>
        </ul>
      </section>

      {/* Example Questions */}
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>🧠 Example Questions</h2>
        <ol style={{ fontSize: '18px', lineHeight: '1.6' }}>
          <li>Fill in the blank: 3, 6, 12, 24, __</li>
          <li>Next number: 121, 144, 169, 196, __</li>
          <li>Find the wrong term: 2, 4, 8, 16, 33, 64</li>
        </ol>
      </section>

      {/* Practice Resources */}
      <section style={{ marginTop: '40px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>📝 Practice Resources</h2>
        <ul style={{ fontSize: '18px', lineHeight: '1.6' }}>
          <li><strong>IndiaBix – Number Series</strong> (external)</li>
          <li><strong>Examveda – Number Series</strong> (external)</li>
        </ul>
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

export default NumberSeries;
