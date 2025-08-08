import React, { useEffect, useState } from "react";
import { TopicService } from "../services/api.js";

function TopicsInfo() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const response = await TopicService.getAllTopics();
        setTopics(response.data || []);
      } catch (error) {
        console.error('Error loading topics:', error);
        setTopics([]);
      } finally {
        setLoading(false);
      }
    };
    loadTopics();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold" style={{ color: "#004d40" }}>
        All Topics
      </h2>
      {topics.map(topic => (
        <div key={topic.topicId} className="card mb-5 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-primary">{topic.topicName}</h3>
            <p className="card-text">{topic.description}</p>
            <h5>Videos</h5>
            <div className="mb-3">
              {topic.videos && topic.videos.length > 0 ? (
                topic.videos.map((url, i) => (
                  <div key={i} className="mb-3">
                    <iframe
                      width="360"
                      height="215"
                      src={url}
                      title={`Video ${i + 1}`}
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                ))
              ) : (
                <span>No videos available.</span>
              )}
            </div>
            <h5>Notes</h5>
            <ul>
              {topic.notes && topic.notes.length > 0 ? (
                topic.notes.map((note, i) => <li key={i}>{note}</li>)
              ) : (
                <li>No notes available.</li>
              )}
            </ul>
            <a href={`/quiz/${topic.topicSlug}`}>
              <button className="btn btn-primary mt-3">Take Practice Test</button>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopicsInfo;
