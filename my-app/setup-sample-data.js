// Script to set up sample data for the application
// Run this with: node setup-sample-data.js

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
    } else {
      console.log('❌ Failed to create admin user:', response.data.message);
    }
  } catch (error) {
    if (error.response?.data?.message?.includes('already exists')) {
      console.log('ℹ️ Admin user already exists');
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
    } else {
      console.log('❌ Failed to create test user:', response.data.message);
    }
  } catch (error) {
    if (error.response?.data?.message?.includes('already exists')) {
      console.log('ℹ️ Test user already exists');
    } else {
      console.error('❌ Error creating test user:', error.response?.data || error.message);
    }
  }
}

async function createSampleTopics() {
  const topics = [
    {
      topicName: "Java Programming",
      topicSlug: "java-programming",
      description: "Learn Java programming fundamentals, OOP concepts, and best practices"
    },
    {
      topicName: "Percentage",
      topicSlug: "percentage",
      description: "Learn about percentages, calculations, and applications"
    },
    {
      topicName: "Profit and Loss",
      topicSlug: "profit-loss",
      description: "Understand profit, loss, and business calculations"
    },
    {
      topicName: "Time and Work",
      topicSlug: "time-work",
      description: "Solve problems related to time and work efficiency"
    }
  ];

  console.log('Creating sample topics...');
  
  for (const topic of topics) {
    try {
      const response = await axios.post(`${API_BASE_URL}/topics`, topic);
      if (response.data.success) {
        console.log(`✅ Topic "${topic.topicName}" created successfully!`);
      } else {
        console.log(`❌ Failed to create topic "${topic.topicName}":`, response.data.message);
      }
    } catch (error) {
      if (error.response?.data?.message?.includes('already exists')) {
        console.log(`ℹ️ Topic "${topic.topicName}" already exists`);
      } else {
        console.error(`❌ Error creating topic "${topic.topicName}":`, error.response?.data || error.message);
      }
    }
  }
}

async function testQuizEndpoint() {
  try {
    console.log('Testing quiz endpoint...');
    const response = await axios.get(`${API_BASE_URL}/quiz/questions/java-programming?limit=5`);
    
    if (response.data.success) {
      console.log('✅ Quiz endpoint working!');
      console.log(`Found ${response.data.data.length} questions`);
    } else {
      console.log('❌ Quiz endpoint returned error:', response.data.message);
    }
  } catch (error) {
    console.error('❌ Quiz endpoint error:', error.response?.data || error.message);
  }
}

async function testTopicsEndpoint() {
  try {
    console.log('Testing topics endpoint...');
    const response = await axios.get(`${API_BASE_URL}/topics`);
    
    if (response.data.success) {
      console.log('✅ Topics endpoint working!');
      console.log(`Found ${response.data.data.length} topics`);
      response.data.data.forEach(topic => {
        console.log(`  - ${topic.topicName} (${topic.topicSlug})`);
      });
    } else {
      console.log('❌ Topics endpoint returned error:', response.data.message);
    }
  } catch (error) {
    console.error('❌ Topics endpoint error:', error.response?.data || error.message);
  }
}

async function main() {
  console.log('🚀 Setting up sample data for your application...\n');
  
  await createAdminUser();
  console.log('');
  
  await createTestUser();
  console.log('');
  
  await createSampleTopics();
  console.log('');
  
  await testTopicsEndpoint();
  console.log('');
  
  await testQuizEndpoint();
  console.log('');
  
  console.log('🎯 Test Credentials:');
  console.log('Admin Login: admin@test.com / admin123');
  console.log('User Login: user@test.com / user123');
  console.log('');
  console.log('📝 Note: Quiz questions will be empty until you add them to the database.');
  console.log('   You can add questions through the admin panel or directly in the database.');
}

main(); 