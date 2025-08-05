import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminManageTopics() {
  const [topics, setTopics] = useState([]);
  const [editingTopic, setEditingTopic] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    videos: [""],
    notes: [""],
    quizPath: ""
  });

  useEffect(() => {
    axios.get("/topics.json").then(res => setTopics(res.data));
  }, []);

  // Add Topic
  const handleAdd = (e) => {
    e.preventDefault();
    const newTopic = {
      ...form,
      id: form.name.toLowerCase().replace(/\s+/g, '-'),
      videos: form.videos.filter(v => v.trim() !== ""),
      notes: form.notes.filter(n => n.trim() !== "")
    };
    setTopics([...topics, newTopic]);
    setForm({ name: "", description: "", videos: [""], notes: [""], quizPath: "" });
  };

  // Edit Topic
  const handleEdit = (topic) => {
    setEditingTopic(topic);
    setForm({
      name: topic.name,
      description: topic.description,
      videos: topic.videos.length ? topic.videos : [""],
      notes: topic.notes.length ? topic.notes : [""],
      quizPath: topic.quizPath
    });
  };

  // Update Topic
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedTopic = {
      ...editingTopic,
      ...form,
      videos: form.videos.filter(v => v.trim() !== ""),
      notes: form.notes.filter(n => n.trim() !== "")
    };
    setTopics(topics.map(t => t.id === editingTopic.id ? updatedTopic : t));
    setEditingTopic(null);
    setForm({ name: "", description: "", videos: [""], notes: [""], quizPath: "" });
  };

  // Delete Topic
  const handleDelete = (topicId) => {
    setTopics(topics.filter(t => t.id !== topicId));
  };

  // Add Video Field
  const addVideo = () => {
    setForm({ ...form, videos: [...form.videos, ""] });
  };

  // Remove Video Field
  const removeVideo = (index) => {
    setForm({ ...form, videos: form.videos.filter((_, i) => i !== index) });
  };

  // Update Video
  const updateVideo = (index, value) => {
    const newVideos = [...form.videos];
    newVideos[index] = value;
    setForm({ ...form, videos: newVideos });
  };

  // Add Note Field
  const addNote = () => {
    setForm({ ...form, notes: [...form.notes, ""] });
  };

  // Remove Note Field
  const removeNote = (index) => {
    setForm({ ...form, notes: form.notes.filter((_, i) => i !== index) });
  };

  // Update Note
  const updateNote = (index, value) => {
    const newNotes = [...form.notes];
    newNotes[index] = value;
    setForm({ ...form, notes: newNotes });
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Manage Topics & Questions</h2>
      
      <form onSubmit={editingTopic ? handleUpdate : handleAdd} className="mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Topic Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Quiz Path (e.g., /quiz/percentage)"
              value={form.quizPath}
              onChange={e => setForm({ ...form, quizPath: e.target.value })}
              required
            />
          </div>
          <div className="col-12">
            <textarea
              className="form-control"
              placeholder="Topic Description"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows="3"
              required
            />
          </div>
          
          {/* Videos Section */}
          <div className="col-12">
            <h5>Videos</h5>
            {form.videos.map((video, index) => (
              <div key={index} className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Video URL"
                  value={video}
                  onChange={e => updateVideo(index, e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => removeVideo(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-outline-primary" onClick={addVideo}>
              Add Video
            </button>
          </div>

          {/* Notes Section */}
          <div className="col-12">
            <h5>Notes</h5>
            {form.notes.map((note, index) => (
              <div key={index} className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Note"
                  value={note}
                  onChange={e => updateNote(index, e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => removeNote(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-outline-primary" onClick={addNote}>
              Add Note
            </button>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              {editingTopic ? "Update Topic" : "Add Topic"}
            </button>
            {editingTopic && (
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => {
                  setEditingTopic(null);
                  setForm({ name: "", description: "", videos: [""], notes: [""], quizPath: "" });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Videos</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {topics.map(topic => (
            <tr key={topic.id}>
              <td>{topic.id}</td>
              <td>{topic.name}</td>
              <td>{topic.description.substring(0, 50)}...</td>
              <td>{topic.videos.length}</td>
              <td>{topic.notes.length}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(topic)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(topic.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="alert alert-info mt-4">
        <b>Note:</b> These changes are in-memory only. When you connect to your backend, replace the axios calls with your API for full CRUD persistence.
      </div>
    </div>
  );
}

export default AdminManageTopics; 