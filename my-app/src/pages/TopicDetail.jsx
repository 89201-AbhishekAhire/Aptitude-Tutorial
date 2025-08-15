import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function TopicDetail() {
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
          <Link to="/topics" className="btn btn-outline-primary mb-4">
            ← Back to All Topics
          </Link>
          
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-primary mb-4">{topic.name}</h2>
              <p className="card-text mb-4">{topic.description}</p>
              
              <h5 className="text-success mb-3">Videos</h5>
              <div className="mb-4">
                {topic.videos && topic.videos.length > 0 ? (
                  topic.videos.map((url, i) => (
                    <div key={i} className="mb-3">
                      <iframe
                        width="100%"
                        height="315"
                        src={url}
                        title={`${topic.name} Video ${i + 1}`}
                        frameBorder="0"
                        allowFullScreen
                        className="rounded"
                      />
                    </div>
                  ))
                ) : (
                  <span className="text-muted">No videos available.</span>
                )}
              </div>
              
              <h5 className="text-info mb-3">Notes</h5>
              <ul className="list-group list-group-flush mb-4">
                {topic.notes && topic.notes.length > 0 ? (
                  topic.notes.map((note, i) => (
                    <li key={i} className="list-group-item">{note}</li>
                  ))
                ) : (
                  <li className="list-group-item text-muted">No notes available.</li>
                )}
              </ul>
              
              <div className="text-center">
                <a href={topic.quizPath} className="btn btn-primary btn-lg">
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

export default TopicDetail;
