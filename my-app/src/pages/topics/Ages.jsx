import React from 'react';
import { useNavigate } from 'react-router-dom';

function Ages() {
  const navigate = useNavigate();

  const handlePracticeTest = () => {
    navigate('/quiz');
  };

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: 'auto' }}>
      <h1 style={{ color: '#004d40', fontSize: '32px', marginBottom: '20px' }}>
        Ages – Tricks & Practice
      </h1>

      {/* Video Section */}
      <section style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>📺 How to Solve Age Problems</h2>
        <div style={{ display: 'grid', gap: '20px' }}>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/I3hCy0CGUCg"
            title="Age Concept Aptitude Challenge"
            frameBorder="0"
            allowFullScreen
          ></iframe>

          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/7pg8aQNPkcE"
            title="Aptitude Made Easy: Ages"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Notes Section */}
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>📝 Important Notes & Tricks</h2>
        <ul style={{ fontSize: '18px', lineHeight: '1.6', marginLeft: '20px' }}>
          <li>If current age = x, then age after n years = x + n, and age n years ago = x – n.</li>
          <li>When multiple people are involved, set up relations carefully; e.g., “A is twice as old as B” means A = 2 × B.</li>
          <li>Be cautious with expressions involving “x years ago” or “x years hence” — they must be correctly placed in equations.</li>
          <li>Gender-based clues often appear: “A is 5 years younger than his sister” needs clear representation.</li>
          <li>Once you form correct equations, solve systematically rather than guesswork to avoid mistakes.</li>
        </ul>
      </section>

      {/* Practice Questions */}
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>🧠 Example Questions</h2>
        <ol style={{ fontSize: '18px', lineHeight: '1.6' }}>
          <li>If A is 5 years older than B, and 3 years ago their ages were in ratio 4:3, find their current ages.</li>
          <li>The sum of ages of A and B is 45. Five years ago, A’s age was twice B’s age. Find their ages now.</li>
          <li>A father is three times as old as his son. After 10 years, father will be twice his son's age. Find their current ages.</li>
        </ol>
      </section>

      {/* Practice Resources */}
      <section style={{ marginTop: '40px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>📝 Practice Resources</h2>
        <ul style={{ fontSize: '18px', lineHeight: '1.6' }}>
          <li>
            <a
              href="https://www.indiabix.com/aptitude/problems-on-ages/"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#00796b', fontWeight: 'bold', textDecoration: 'underline' }}
            >
              IndiaBix – Problems on Ages
            </a>
          </li>
          <li>
            <a
              href="https://www.examveda.com/age-problems/"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#00796b', fontWeight: 'bold', textDecoration: 'underline' }}
            >
              Examveda – Age Problems Practice
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

export default Ages;
