import React from 'react';
import { useNavigate } from 'react-router-dom';

function Average() {
  const navigate = useNavigate();

  const handlePracticeTest = () => {
    navigate('/quiz');
  };

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: 'auto' }}>
      <h1 style={{ color: '#004d40', fontSize: '32px', marginBottom: '20px' }}>
        Average – Tricks & Practice
      </h1>

      {/* Video Section */}
      <section style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>📺 How to Solve Average Problems</h2>
        <div style={{ display: 'grid', gap: '20px' }}>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/7VAQ8we_pDo"
            title="Average Lecture Series 1"
            frameBorder="0"
            allowFullScreen
          ></iframe>

          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/gRwEwQ5kqW0"
            title="Mastering Average for Aptitude Test"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </section>


      {/* Notes Section */}
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>📝 Important Notes & Tricks</h2>
        <ul style={{ fontSize: '18px', lineHeight: '1.6', marginLeft: '20px' }}>
          <li>Average = (Sum of observations) / (Number of observations).</li>
          <li>If the average of n numbers is A, then sum = A × n.</li>
          <li>When a number is added or removed, use deviation from average for quick calculations.</li>
          <li>Use alligation method for combined average when two groups are involved.</li>
          <li>Be careful with weighted averages in problems involving different weights or counts.</li>
        </ul>
      </section>

      {/* Practice Questions */}
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>🧠 Example Questions</h2>
        <ol style={{ fontSize: '18px', lineHeight: '1.6' }}>
          <li>The average age of 5 students is 20 years. A new student joins and the average becomes 21. Find the age of the new student.</li>
          <li>The average of five consecutive numbers is 27. What is the smallest of these numbers?</li>
          <li>A batsman’s average score after 10 innings is 45. How many runs must he score in the next innings to increase the average to 48?</li>
        </ol>
      </section>

      {/* Practice Resources */}
      <section style={{ marginTop: '40px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>📝 Practice Resources</h2>
        <ul style={{ fontSize: '18px', lineHeight: '1.6' }}>
          <li>
            <a
              href="https://www.indiabix.com/aptitude/average/"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#00796b', fontWeight: 'bold', textDecoration: 'underline' }}
            >
              IndiaBix – Problems on Average
            </a>
          </li>
          <li>
            <a
              href="https://www.examveda.com/average/"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#00796b', fontWeight: 'bold', textDecoration: 'underline' }}
            >
              Examveda – Average Questions Practice
            </a>
          </li>
        </ul>
      </section>

      {/* Practice Test Button */}
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <button
          onClick={handlePracticeTest}
          style={{
            backgroundColor: '#00796b',
            color: 'white',
            padding: '14px 28px',
            fontSize: '18px',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
        >
          🎯 Take Practice Test
        </button>
      </div>
    </div>
  );
}

export default Average;
