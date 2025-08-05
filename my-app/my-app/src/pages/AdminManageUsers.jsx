import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminManageUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: "student", password: "" });

  useEffect(() => {
    axios.get("/users.json").then(res => setUsers(res.data));
  }, []);

  // Add User
  const handleAdd = (e) => {
    e.preventDefault();
    const newUser = {
      ...form,
      user_id: users.length ? Math.max(...users.map(u => u.user_id)) + 1 : 1,
      created_at: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
    setForm({ name: "", email: "", role: "student", password: "" });
  };

  // Edit User
  const handleEdit = (user) => {
    setEditingUser(user);
    setForm({ name: user.name, email: user.email, role: user.role, password: user.password });
  };

  // Update User
  const handleUpdate = (e) => {
    e.preventDefault();
    setUsers(users.map(u => u.user_id === editingUser.user_id ? { ...editingUser, ...form } : u));
    setEditingUser(null);
    setForm({ name: "", email: "", role: "student", password: "" });
  };

  // Delete User
  const handleDelete = (user_id) => {
    setUsers(users.filter(u => u.user_id !== user_id));
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Manage Users</h2>
      <form onSubmit={editingUser ? handleUpdate : handleAdd} className="mb-4">
        <div className="row g-2">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="col">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="col">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <div className="col">
            <select
              className="form-select"
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">
              {editingUser ? "Update" : "Add"}
            </button>
            {editingUser && (
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => {
                  setEditingUser(null);
                  setForm({ name: "", email: "", role: "student", password: "" });
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
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.user_id}>
              <td>{u.user_id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{new Date(u.created_at).toLocaleString()}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(u)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u.user_id)}>
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

export default AdminManageUsers; 