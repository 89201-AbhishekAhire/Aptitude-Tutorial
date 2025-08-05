import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaClock, FaCheck, FaTimes, FaArrowLeft, FaArrowRight, FaTrophy } from "react-icons/fa";
import axios from "axios";

function ChallengeTest() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState(null);

  // Mock questions - replace with backend API call
  const mockQuestions = {
    "percentage": [
      {
        question_id: 1,
        content: "What is 25% of 80?",
        options: [
          { label: "A", option_text: "15" },
          { label: "B", option_text: "20" },
          { label: "C", option_text: "25" },
          { label: "D", option_text: "30" }
        ],
        correct_option: "B"
      },
      {
        question_id: 2,
        content: "If a number is increased by 20% and then decreased by 20%, what is the net change?",
        options: [
          { label: "A", option_text: "No change" },
          { label: "B", option_text: "4% decrease" },
          { label: "C", option_text: "4% increase" },
          { label: "D", option_text: "20% decrease" }
        ],
        correct_option: "B"
      },
      {
        question_id: 3,
        content: "What is 15% of 200?",
        options: [
          { label: "A", option_text: "25" },
          { label: "B", option_text: "30" },
          { label: "C", option_text: "35" },
          { label: "D", option_text: "40" }
        ],
        correct_option: "B"
      }
    ],
    "profit-loss": [
      {
        question_id: 4,
        content: "A shopkeeper buys an article for Rs. 100 and sells it for Rs. 120. What is his profit percentage?",
        options: [
          { label: "A", option_text: "15%" },
          { label: "B", option_text: "20%" },
          { label: "C", option_text: "25%" },
          { label: "D", option_text: "30%" }
        ],
        correct_option: "B"
      },
      {
        question_id: 5,
        content: "If cost price is Rs. 80 and selling price is Rs. 60, what is the loss percentage?",
        options: [
          { label: "A", option_text: "20%" },
          { label: "B", option_text: "25%" },
          { label: "C", option_text: "30%" },
          { label: "D", option_text: "35%" }
        ],
        correct_option: "B"
      }
    ]
  };

  useEffect(() => {
    // Simulate API call - replace with actual backend call
    setTimeout(() => {
      setQuestions(mockQuestions[topicId] || []);
      setLoading(false);
      setStartTime(new Date());
    }, 1000);
  }, [topicId]);

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const handleAnswerSelect = (questionId, selectedOption) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    
    // Calculate score
    let correctAnswers = 0;
    questions.forEach(question => {
      if (answers[question.question_id] === question.correct_option) {
        correctAnswers++;
      }
    });
    
    const finalScore = correctAnswers;
    setScore(finalScore);

    // Calculate time taken
    const endTime = new Date();
    const timeTaken = Math.round((endTime - startTime) / 1000); // seconds

    // Prepare data for backend - matches USER_ANSWER table structure
    const userAnswers = questions.map(question => ({
      user_id: null, // Will be set from current user context
      question_id: question.question_id,
      selected_option: answers[question.question_id] || null,
      is_correct: answers[question.question_id] === question.correct_option,
      mode: "Challenge Mode",
      answered_at: new Date().toISOString()
    }));

    // Submit to backend - replace with actual API call
    try {
      // await axios.post('/api/user-answers', { 
      //   answers: userAnswers,
      //   timeTaken: timeTaken,
      //   score: finalScore
      // });
      console.log('Challenge results to submit:', {
        answers: userAnswers,
        timeTaken: timeTaken,
        score: finalScore
      });
    } catch (error) {
      console.error('Error submitting challenge results:', error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading challenge...</p>
      </div>
    );
  }

  if (isSubmitted) {
    const timeTaken = Math.round((new Date() - startTime) / 1000);
    const timeDisplay = formatTime(timeTaken);
    
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body text-center p-5">
                <FaTrophy size={60} className="text-danger mb-4" />
                <h2 className="text-danger mb-4">Challenge Completed!</h2>
                <div className="mb-4">
                  <h3>Your Score: {score}/{questions.length}</h3>
                  <p className="text-muted">Percentage: {Math.round((score / questions.length) * 100)}%</p>
                  <p className="text-info">Time Taken: {timeDisplay}</p>
                </div>
                <div className="mb-4">
                  <button 
                    className="btn btn-danger me-3"
                    onClick={() => navigate('/challenge-dashboard')}
                  >
                    Back to Challenges
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => window.location.reload()}
                  >
                    Retake Challenge
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h3>Challenge Mode - {topicId.charAt(0).toUpperCase() + topicId.slice(1)}</h3>
          <p className="text-muted">Question {currentQuestion + 1} of {questions.length}</p>
        </div>
        <div className="col-md-4 text-end">
          <div className="d-flex align-items-center justify-content-end">
            <FaClock className="text-danger me-2" />
            <span className={`fw-bold ${timeLeft < 60 ? 'text-danger' : 'text-danger'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress mb-4" style={{ height: "10px" }}>
        <div 
          className="progress-bar bg-danger" 
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      <div className="card shadow-sm mb-4">
        <div className="card-body p-4">
          <h5 className="mb-4">{currentQ.content}</h5>
          
          <div className="row">
            {currentQ.options.map((option, index) => (
              <div key={option.label} className="col-md-6 mb-3">
                <button
                  className={`btn w-100 text-start p-3 ${
                    answers[currentQ.question_id] === option.label 
                      ? 'btn-danger' 
                      : 'btn-outline-danger'
                  }`}
                  onClick={() => handleAnswerSelect(currentQ.question_id, option.label)}
                >
                  <span className="fw-bold me-2">{option.label}.</span>
                  {option.option_text}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-outline-secondary"
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
        >
          <FaArrowLeft className="me-2" />
          Previous
        </button>

        <div>
          {currentQuestion < questions.length - 1 ? (
            <button
              className="btn btn-danger"
              onClick={() => setCurrentQuestion(prev => prev + 1)}
            >
              Next
              <FaArrowRight className="ms-2" />
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={handleSubmit}
            >
              <FaCheck className="me-2" />
              Submit Challenge
            </button>
          )}
        </div>
      </div>

      {/* Question Navigation */}
      <div className="mt-4">
        <h6>Question Navigation:</h6>
        <div className="d-flex flex-wrap gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm ${
                answers[questions[index].question_id] 
                  ? 'btn-danger' 
                  : index === currentQuestion 
                    ? 'btn-warning' 
                    : 'btn-outline-secondary'
              }`}
              onClick={() => setCurrentQuestion(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChallengeTest; 