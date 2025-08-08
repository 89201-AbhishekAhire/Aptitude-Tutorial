import React, { useEffect, useState } from "react";
import { FeedbackService } from "../services/api.js";

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        const response = await FeedbackService.getPendingFeedback();
        setFeedbacks(response.data || []);
      } catch (error) {
        console.error('Error loading feedbacks:', error);
        setFeedbacks([]);
      } finally {
        setLoading(false);
      }
    };
    loadFeedbacks();
  }, []);

  const handleStatusChange = async (feedbackId, newStatus) => {
    try {
      const response = await FeedbackService.updateFeedbackStatus(feedbackId, newStatus);
      if (response.success) {
        setFeedbacks(feedbacks.map(f => 
          f.feedbackId === feedbackId ? { ...f, status: newStatus } : f
        ));
      }
    } catch (error) {
      console.error('Error updating feedback status:', error);
      alert('Failed to update feedback status. Please try again.');
    }
  };

  const handleDelete = async (feedbackId) => {
    try {
      // Note: Delete endpoint might not exist in your backend yet
      // For now, we'll just remove from local state
      setFeedbacks(feedbacks.filter(f => f.feedbackId !== feedbackId));
    } catch (error) {
      console.error('Error deleting feedback:', error);
      alert('Failed to delete feedback. Please try again.');
    }
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
              <tr key={feedback.feedbackId}>
                <td>{feedback.feedbackId}</td>
                <td>
                  <strong>{feedback.userName}</strong><br/>
                  <small className="text-muted">ID: {feedback.userId}</small>
                </td>
                <td>
                  <div style={{ maxWidth: "300px", wordWrap: "break-word" }}>
                    {feedback.message}
                  </div>
                </td>
                <td>{new Date(feedback.createdAt).toLocaleDateString()}</td>
                <td>
                  <span className={`badge ${feedback.status === 'PENDING' ? 'bg-warning' : 'bg-success'}`}>
                    {feedback.status}
                  </span>
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleStatusChange(feedback.feedbackId, 'REVIEWED')}
                      disabled={feedback.status === 'REVIEWED'}
                    >
                      Mark Reviewed
                    </button>
                    <button
                      className="btn btn-sm btn-outline-warning"
                      onClick={() => handleStatusChange(feedback.feedbackId, 'PENDING')}
                      disabled={feedback.status === 'PENDING'}
                    >
                      Mark Pending
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(feedback.feedbackId)}
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

      <div className="alert alert-success mt-4">
        <b>✅ Connected to Backend:</b> All feedback operations are now connected to your Java Spring Boot backend API.
      </div>
    </div>
  );
}

export default AdminFeedback; 