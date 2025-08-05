import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate feedback data matching the FEEDBACK table structure
    const mockFeedbacks = [
      {
        feedback_id: 1,
        user_id: 1,
        user_name: "Alice",
        message: "Great platform! The percentage topic helped me a lot.",
        created_at: "2024-01-15T10:30:00Z",
        status: "pending"
      },
      {
        feedback_id: 2,
        user_id: 2,
        user_name: "Bob",
        message: "Please add more practice questions for profit and loss.",
        created_at: "2024-01-14T15:45:00Z",
        status: "reviewed"
      },
      {
        feedback_id: 3,
        user_id: 3,
        user_name: "Charlie",
        message: "The video quality is excellent. Keep up the good work!",
        created_at: "2024-01-13T09:20:00Z",
        status: "pending"
      },
      {
        feedback_id: 4,
        user_id: 1,
        user_name: "Alice",
        message: "The challenge mode is really helpful for practice.",
        created_at: "2024-01-12T14:15:00Z",
        status: "reviewed"
      }
    ];
    setFeedbacks(mockFeedbacks);
    setLoading(false);
  }, []);

  const handleStatusChange = (feedbackId, newStatus) => {
    setFeedbacks(feedbacks.map(f => 
      f.feedback_id === feedbackId ? { ...f, status: newStatus } : f
    ));
  };

  const handleDelete = (feedbackId) => {
    setFeedbacks(feedbacks.filter(f => f.feedback_id !== feedbackId));
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">Feedback Review</h2>
      
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h5>Total Feedback</h5>
              <h3>{feedbacks.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h5>Pending</h5>
              <h3>{feedbacks.filter(f => f.status === 'pending').length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h5>Reviewed</h5>
              <h3>{feedbacks.filter(f => f.status === 'reviewed').length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h5>This Month</h5>
              <h3>{feedbacks.filter(f => new Date(f.created_at).getMonth() === new Date().getMonth()).length}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Message</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(feedback => (
              <tr key={feedback.feedback_id}>
                <td>{feedback.feedback_id}</td>
                <td>
                  <strong>{feedback.user_name}</strong><br/>
                  <small className="text-muted">ID: {feedback.user_id}</small>
                </td>
                <td>
                  <div style={{ maxWidth: "300px", wordWrap: "break-word" }}>
                    {feedback.message}
                  </div>
                </td>
                <td>{new Date(feedback.created_at).toLocaleDateString()}</td>
                <td>
                  <span className={`badge ${feedback.status === 'pending' ? 'bg-warning' : 'bg-success'}`}>
                    {feedback.status}
                  </span>
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleStatusChange(feedback.feedback_id, 'reviewed')}
                      disabled={feedback.status === 'reviewed'}
                    >
                      Mark Reviewed
                    </button>
                    <button
                      className="btn btn-sm btn-outline-warning"
                      onClick={() => handleStatusChange(feedback.feedback_id, 'pending')}
                      disabled={feedback.status === 'pending'}
                    >
                      Mark Pending
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(feedback.feedback_id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {feedbacks.length === 0 && (
        <div className="text-center py-5">
          <h4 className="text-muted">No feedback available</h4>
          <p>Users haven't submitted any feedback yet.</p>
        </div>
      )}

      <div className="alert alert-info mt-4">
        <b>Note:</b> This is using mock data. When you connect to your backend, replace with actual feedback API calls.
        <br/>
        <b>Database Structure:</b> FEEDBACK table with user_id, message, created_at fields linked to USER table.
      </div>
    </div>
  );
}

export default AdminFeedback; 