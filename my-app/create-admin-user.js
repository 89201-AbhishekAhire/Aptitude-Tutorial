// Script to create admin user via API
// Run this with: node create-admin-user.js

const axios = require('axios');

const API_BASE_URL = 'http://localhost:8080/api';

async function createAdminUser() {
  try {
    const adminData = {
      name: "Admin User",
      email: "admin@test.com",
      password: "admin123",
      role: "ADMIN"
    };

    console.log('Creating admin user...');
    const response = await axios.post(`${API_BASE_URL}/users/register`, adminData);
    
    if (response.data.success) {
      console.log('✅ Admin user created successfully!');
      console.log('Email: admin@test.com');
      console.log('Password: admin123');
      console.log('Role: ADMIN');
    } else {
      console.log('❌ Failed to create admin user:', response.data.message);
    }
  } catch (error) {
    if (error.response?.data?.message?.includes('already exists')) {
      console.log('ℹ️ Admin user already exists');
      console.log('Email: admin@test.com');
      console.log('Password: admin123');
    } else {
      console.error('❌ Error creating admin user:', error.response?.data || error.message);
    }
  }
}

async function createTestUser() {
  try {
    const userData = {
      name: "Test User",
      email: "user@test.com",
      password: "user123",
      role: "STUDENT"
    };

    console.log('Creating test user...');
    const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
    
    if (response.data.success) {
      console.log('✅ Test user created successfully!');
      console.log('Email: user@test.com');
      console.log('Password: user123');
      console.log('Role: STUDENT');
    } else {
      console.log('❌ Failed to create test user:', response.data.message);
    }
  } catch (error) {
    if (error.response?.data?.message?.includes('already exists')) {
      console.log('ℹ️ Test user already exists');
      console.log('Email: user@test.com');
      console.log('Password: user123');
    } else {
      console.error('❌ Error creating test user:', error.response?.data || error.message);
    }
  }
}

async function main() {
  console.log('🚀 Creating test users for your application...\n');
  
  await createAdminUser();
  console.log('');
  await createTestUser();
  
  console.log('\n🎯 Test Credentials:');
  console.log('Admin Login: admin@test.com / admin123');
  console.log('User Login: user@test.com / user123');
}

main(); 