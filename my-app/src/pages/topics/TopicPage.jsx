import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

function TopicPage() {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser, adminUser, isAuthenticated } = useAuth();

  useEffect(() => {
    axios.get('/topicsData.json')
      .then(res => {
        const allTopics = res.data;
        const currentTopic = allTopics[topicId];
        setTopic(currentTopic);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading topics data:", err);
        setLoading(false);
      });
  }, [topicId]);

  if (loading) return <div>Loading...</div>;
  if (!topic) return <div>Topic not found</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{topic.title}</h1>

      {isAuthenticated && (
        <div style={{
          background: currentUser ? '#e8f5e8' : '#ffe8e8',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: `2px solid ${currentUser ? '#4CAF50' : '#ff6b6b'}`
        }}>
          {currentUser && (
            <p style={{ margin: 0, color: '#2e7d32', fontWeight: 'bold' }}>
              📖 {currentUser.name}, let's learn about {topic.title}!
            </p>
          )}
          {adminUser && (
            <p style={{ margin: 0, color: '#d32f2f', fontWeight: 'bold' }}>
              🔧 Admin {adminUser.name} - Reviewing {topic.title} content
            </p>
          )}
        </div>
      )}

      <h2>Videos</h2>
      {topic.videos.map((url, i) => (
        <iframe
          key={i}
          width="560"
          height="315"
          src={url}
          title={`Video ${i + 1}`}
          frameBorder="0"
          allowFullScreen
          style={{ marginBottom: '20px' }}
        />
      ))}

      <h2>Notes</h2>
      <ul>
        {topic.notes.map((note, i) => <li key={i}>{note}</li>)}
      </ul>

      <h2>Examples</h2>
      <ul>
        {topic.examples.map((example, i) => <li key={i}>{example}</li>)}
      </ul>

      <a href={topic.quizPath}>
        <button className="btn btn-primary mt-4">Take Practice Test</button>
      </a>
    </div>
  );
}

export default TopicPage;
