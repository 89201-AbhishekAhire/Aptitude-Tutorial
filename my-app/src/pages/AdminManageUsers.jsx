import React, { useEffect, useState } from "react";
import { UserService } from "../services/api.js";

function AdminManageUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: "student", password: "" });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await UserService.getAllUsers();
        setUsers(response.data || []);
      } catch (error) {
        console.error('Error loading users:', error);
        setUsers([]);
      }
    };
    loadUsers();
  }, []);

  // Add User
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role.toUpperCase()
      };
      
      const response = await UserService.createUser(userData);
      if (response.success) {
        setUsers([...users, response.data]);
        setForm({ name: "", email: "", role: "student", password: "" });
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
    }
  };

  // Edit User
  const handleEdit = (user) => {
    setEditingUser(user);
    setForm({ 
      name: user.name, 
      email: user.email, 
      role: user.role?.toLowerCase() || "student", 
      password: user.password || "" 
    });
  };

  // Update User
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role.toUpperCase()
      };
      
      const response = await UserService.updateUser(editingUser.userId, userData);
      if (response.success) {
        setUsers(users.map(u => u.userId === editingUser.userId ? response.data : u));
        setEditingUser(null);
        setForm({ name: "", email: "", role: "student", password: "" });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    }
  };

  // Delete User
  const handleDelete = async (userId) => {
    try {
      const response = await UserService.deleteUser(userId);
      if (response.success) {
        setUsers(users.filter(u => u.userId !== userId));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    }
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
            <tr key={u.userId}>
              <td>{u.userId}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{new Date(u.createdAt).toLocaleString()}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(u)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u.userId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="alert alert-success mt-4">
        <b>✅ Connected to Backend:</b> All user operations are now connected to your Java Spring Boot backend API.
      </div>
    </div>
  );
}

export default AdminManageUsers; 