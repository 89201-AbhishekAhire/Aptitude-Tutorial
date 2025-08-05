import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function StudyTopicDetail() {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/topics.json")
      .then(res => {
        const allTopics = res.data;
        const currentTopic = allTopics.find(t => t.id === topicId);
        setTopic(currentTopic);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading topic:", err);
        setLoading(false);
      });
  }, [topicId]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!topic) return <div className="text-center mt-5">Topic not found</div>;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <Link to="/study-dashboard" className="btn btn-outline-success mb-4">
            ← Back to Study Mode
          </Link>
          
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-success mb-4">{topic.name}</h2>
              <p className="card-text mb-4">{topic.description}</p>
              
              <h5 className="text-primary mb-3">📚 Study Notes</h5>
              <div className="mb-4">
                {topic.notes && topic.notes.length > 0 ? (
                  <div className="list-group">
                    {topic.notes.map((note, i) => (
                      <div key={i} className="list-group-item list-group-item-action">
                        <div className="d-flex align-items-start">
                          <span className="badge bg-primary me-2 mt-1">{i + 1}</span>
                          <div>{note}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-muted">No notes available.</span>
                )}
              </div>
              
              <h5 className="text-warning mb-3">💡 Tips & Tricks</h5>
              <div className="mb-4">
                <div className="alert alert-warning">
                  <h6>Quick Tips for {topic.name}:</h6>
                  <ul className="mb-0">
                    {topic.name === "Percentage" && (
                      <>
                        <li>Always remember: Percentage = (Value/Total) × 100</li>
                        <li>For percentage increase: ((New - Old) / Old) × 100</li>
                        <li>For percentage decrease: ((Old - New) / Old) × 100</li>
                        <li>Cross-multiplication is your friend!</li>
                      </>
                    )}
                    {topic.name === "Profit & Loss" && (
                      <>
                        <li>Profit = Selling Price - Cost Price</li>
                        <li>Loss = Cost Price - Selling Price</li>
                        <li>Profit % = (Profit / Cost Price) × 100</li>
                        <li>Loss % = (Loss / Cost Price) × 100</li>
                      </>
                    )}
                    {topic.name === "Time & Work" && (
                      <>
                        <li>Work = Time × Efficiency</li>
                        <li>If A can do work in 'a' days, A's 1 day work = 1/a</li>
                        <li>Combined work = (1/a + 1/b)</li>
                        <li>Time together = 1/(1/a + 1/b)</li>
                      </>
                    )}
                    {topic.name === "Speed & Distance" && (
                      <>
                        <li>Speed = Distance / Time</li>
                        <li>Distance = Speed × Time</li>
                        <li>Time = Distance / Speed</li>
                        <li>Average Speed = Total Distance / Total Time</li>
                      </>
                    )}
                    {topic.name === "Ratio" && (
                      <>
                        <li>Ratio a:b means a parts to b parts</li>
                        <li>If a:b = c:d, then ad = bc (cross-multiplication)</li>
                        <li>Compound ratio: (a:b) × (c:d) = (ac:bd)</li>
                        <li>For mixtures: (Q1×P1) + (Q2×P2) = (Total Q × Avg P)</li>
                      </>
                    )}
                    {topic.name === "Number Series" && (
                      <>
                        <li>Look for arithmetic progression (constant difference)</li>
                        <li>Check for geometric progression (constant ratio)</li>
                        <li>Fibonacci: Each term is sum of previous two</li>
                        <li>Square series: 1, 4, 9, 16, 25... (n²)</li>
                      </>
                    )}
                    {topic.name === "Ages" && (
                      <>
                        <li>Age difference remains constant over time</li>
                        <li>After n years: Age = Current Age + n</li>
                        <li>n years ago: Age = Current Age - n</li>
                        <li>Use cross-multiplication for ratio problems</li>
                      </>
                    )}
                    {topic.name === "Simple Interest" && (
                      <>
                        <li>SI = (Principal × Rate × Time) / 100</li>
                        <li>Amount = Principal + Simple Interest</li>
                        <li>For months: divide by 12 to get years</li>
                        <li>For days: divide by 365 to get years</li>
                      </>
                    )}
                    {topic.name === "Probability" && (
                      <>
                        <li>Probability = Favorable outcomes / Total outcomes</li>
                        <li>P(A or B) = P(A) + P(B) - P(A and B)</li>
                        <li>P(A and B) = P(A) × P(B) if independent</li>
                        <li>P(not A) = 1 - P(A)</li>
                      </>
                    )}
                    {topic.name === "Average" && (
                      <>
                        <li>Average = Sum of values / Number of values</li>
                        <li>Sum = Average × Number of values</li>
                        <li>New average = (Old sum + New value) / (n+1)</li>
                        <li>For consecutive numbers: Avg = (First + Last) / 2</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              
              <div className="text-center">
                <Link to={`/topic/${topicId}`} className="btn btn-primary btn-lg me-3">
                  Watch Videos
                </Link>
                <a href={topic.quizPath} className="btn btn-success btn-lg">
                  Take Practice Test
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyTopicDetail; 