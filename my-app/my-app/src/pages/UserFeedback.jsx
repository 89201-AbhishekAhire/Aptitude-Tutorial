import React, { useState, useEffect } from "react";
import { FaComments, FaPaperPlane, FaHistory } from "react-icons/fa";
import axios from "axios";

function UserFeedback({ currentUser }) {
  const [feedback, setFeedback] = useState("");
  const [userFeedbacks, setUserFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Load user's previous feedback
    loadUserFeedbacks();
  }, [currentUser]);

  const loadUserFeedbacks = async () => {
    try {
      // This will be replaced with backend API call
      // const response = await axios.get(`/api/user-feedback/${currentUser.user_id}`);
      
      // Mock data for now
      const mockFeedbacks = [
        {
          feedback_id: 1,
          message: "Great platform! The percentage topic helped me a lot.",
          created_at: "2024-01-15T10:30:00Z"
        },
        {
          feedback_id: 2,
          message: "Please add more practice questions for profit and loss.",
          created_at: "2024-01-14T15:45:00Z"
        }
      ];
      setUserFeedbacks(mockFeedbacks);
    } catch (error) {
      console.error("Error loading feedback:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      setError("Please enter your feedback");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Prepare feedback data for backend
      const feedbackData = {
        user_id: currentUser.user_id,
        message: feedback.trim(),
        created_at: new Date().toISOString()
      };

      // Submit to backend - replace with actual API call
      // await axios.post('/api/feedback', feedbackData);
      console.log('Feedback to submit:', feedbackData);

      // Add to local state for immediate display
      const newFeedback = {
        feedback_id: Date.now(), // Temporary ID
        message: feedback.trim(),
        created_at: new Date().toISOString()
      };
      setUserFeedbacks(prev => [newFeedback, ...prev]);
      
      setFeedback("");
      setSuccess("Feedback submitted successfully! Thank you for your input.");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError("Failed to submit feedback. Please try again.");
      console.error("Error submitting feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h2 className="text-center mb-5">
            <FaComments className="me-2 text-primary" />
            Submit Feedback
          </h2>

          {/* Feedback Form */}
          <div className="card shadow-sm mb-5">
            <div className="card-body p-4">
              <h5 className="mb-3">Share Your Thoughts</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Tell us about your experience, suggestions, or any issues you've encountered..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    Your feedback helps us improve the platform
                  </small>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="me-2" />
                        Submit Feedback
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Success/Error Messages */}
              {success && (
                <div className="alert alert-success mt-3" role="alert">
                  {success}
                </div>
              )}
              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* User's Previous Feedback */}
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h5 className="mb-3">
                <FaHistory className="me-2 text-secondary" />
                Your Previous Feedback
              </h5>
              
              {userFeedbacks.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">No feedback submitted yet.</p>
                  <small>Your feedback will appear here once submitted.</small>
                </div>
              ) : (
                <div className="feedback-list">
                  {userFeedbacks.map((feedback) => (
                    <div key={feedback.feedback_id} className="border-bottom pb-3 mb-3">
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="flex-grow-1">
                          <p className="mb-1">{feedback.message}</p>
                          <small className="text-muted">
                            Submitted on {formatDate(feedback.created_at)}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserFeedback; 