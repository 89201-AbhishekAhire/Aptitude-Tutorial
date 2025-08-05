import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheck, FaTimes, FaArrowLeft, FaArrowRight, FaHome } from "react-icons/fa";
import axios from "axios";

function TrainingTest() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);

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
    }, 1000);
  }, [topicId]);

  const handleAnswerSelect = (questionId, selectedOption) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
    setShowResult(true);
    
    // Check if answer is correct
    const currentQ = questions.find(q => q.question_id === questionId);
    if (selectedOption === currentQ.correct_option) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowResult(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setShowResult(false);
    }
  };

  const isAnswerCorrect = (questionId) => {
    const answer = answers[questionId];
    const question = questions.find(q => q.question_id === questionId);
    return answer === question.correct_option;
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading questions...</p>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const userAnswer = answers[currentQ.question_id];
  const isCorrect = userAnswer === currentQ.correct_option;

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h3>Practice Mode - {topicId.charAt(0).toUpperCase() + topicId.slice(1)}</h3>
          <p className="text-muted">Question {currentQuestion + 1} of {questions.length}</p>
          <p className="text-success">Correct Answers: {correctCount}</p>
        </div>
        <div className="col-md-4 text-end">
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate('/training-dashboard')}
          >
            <FaHome className="me-2" />
            Back to Training
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress mb-4" style={{ height: "10px" }}>
        <div 
          className="progress-bar bg-warning" 
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
                    userAnswer === option.label
                      ? isCorrect 
                        ? 'btn-success' 
                        : 'btn-danger'
                      : 'btn-outline-warning'
                  }`}
                  onClick={() => handleAnswerSelect(currentQ.question_id, option.label)}
                  disabled={showResult}
                >
                  <span className="fw-bold me-2">{option.label}.</span>
                  {option.option_text}
                  {userAnswer === option.label && (
                    <span className="ms-2">
                      {isCorrect ? <FaCheck /> : <FaTimes />}
                    </span>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Result Display */}
          {showResult && (
            <div className={`alert ${isCorrect ? 'alert-success' : 'alert-danger'} mt-3`}>
              <h6>
                {isCorrect ? (
                  <>
                    <FaCheck className="me-2" />
                    Correct!
                  </>
                ) : (
                  <>
                    <FaTimes className="me-2" />
                    Incorrect. The correct answer is: {currentQ.correct_option}
                  </>
                )}
              </h6>
              <p className="mb-0">
                {isCorrect 
                  ? "Great job! You got this one right." 
                  : "Keep practicing! You'll get better with each attempt."
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-outline-secondary"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          <FaArrowLeft className="me-2" />
          Previous
        </button>

        <div>
          {currentQuestion < questions.length - 1 ? (
            <button
              className="btn btn-warning"
              onClick={handleNext}
              disabled={!showResult}
            >
              Next
              <FaArrowRight className="ms-2" />
            </button>
          ) : (
            <div className="text-center">
              <p className="text-muted">You've completed all questions!</p>
              <button
                className="btn btn-success"
                onClick={() => navigate('/training-dashboard')}
              >
                Back to Training
              </button>
            </div>
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
                  ? isAnswerCorrect(questions[index].question_id)
                    ? 'btn-success' 
                    : 'btn-danger'
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

export default TrainingTest; 