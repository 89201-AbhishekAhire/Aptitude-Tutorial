import React, { useState, useEffect } from 'react';
import { fetchQuizData } from '../services/Quiz.js';
import './Quiz.css';
const Quiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await fetchQuizData();
        setQuizData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadQuiz();
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    // Check if answer is correct
    if (selectedOption === quizData.questions[currentIndex].answer) {
      setScore(score + 1);
    }

    // Move to next question or end quiz
    if (currentIndex < quizData.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption('');
    } else {
      setQuizCompleted(true);
    }
  };

  if (loading) return <div className="quiz-loading">Loading quiz...</div>;
  if (error) return <div className="quiz-error">Error: {error}</div>;
  if (!quizData) return <div>No quiz data available</div>;

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">{quizData.quizTitle}</h1>
      
      {quizCompleted ? (
        <div className="quiz-results">
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score}/{quizData.questions.length}</p>
        </div>
      ) : (
        <div className="question-container">
          <div className="question-meta">
            <span>Question {currentIndex + 1} of {quizData.questions.length}</span>
            <span className="difficulty">{quizData.questions[currentIndex].difficulty}</span>
          </div>
          
          <h3 className="question-text">{quizData.questions[currentIndex].question}</h3>
          
          <div className="options-container">
            {quizData.questions[currentIndex].options.map((option, idx) => (
              <div 
                key={idx}
                className={`option ${selectedOption === option ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
          
          <button 
            className="next-button"
            onClick={handleNext}
            disabled={!selectedOption}
          >
            {currentIndex === quizData.questions.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;