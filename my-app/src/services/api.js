import axios from 'axios';

// Base configuration
const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API Service Classes
export class AuthService {
  // User Authentication
  static async login(email, password) {
    const response = await apiClient.post('/users/login', { email, password });
    return response.data;
  }

  static async register(userData) {
    const response = await apiClient.post('/users/register', userData);
    return response.data;
  }

  static async adminLogin(email, password) {
    // For admin login, we'll use the same endpoint but check for admin role
    const response = await apiClient.post('/users/login', { email, password });
    
    // Check if the logged-in user is an admin
    if (response.data.success && response.data.data.role === 'ADMIN') {
      // Return the response with admin data
      return response.data;
    } else {
      throw new Error('Invalid admin credentials');
    }
  }
}

export class UserService {
  // Get all users (Admin only)
  static async getAllUsers() {
    const response = await apiClient.get('/users');
    return response.data;
  }

  // Get user by ID
  static async getUserById(userId) {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  }

  // Create user (Admin only)
  static async createUser(userData) {
    const response = await apiClient.post('/users', userData);
    return response.data;
  }

  // Update user (Admin only)
  static async updateUser(userId, userData) {
    const response = await apiClient.put(`/users/${userId}`, userData);
    return response.data;
  }

  // Delete user (Admin only)
  static async deleteUser(userId) {
    const response = await apiClient.delete(`/users/${userId}`);
    return response.data;
  }

  // Toggle user status (Admin only)
  static async toggleUserStatus(userId) {
    const response = await apiClient.put(`/admin/users/${userId}/toggle-status`);
    return response.data;
  }
}

export class TopicService {
  // Get all active topics
  static async getAllTopics() {
    const response = await apiClient.get('/topics');
    return response.data;
  }

  // Get topic by ID
  static async getTopicById(topicId) {
    const response = await apiClient.get(`/topics/${topicId}`);
    return response.data;
  }

  // Get topic by slug
  static async getTopicBySlug(slug) {
    const response = await apiClient.get(`/topics/slug/${slug}`);
    return response.data;
  }

  // Create topic (Admin only)
  static async createTopic(topicData) {
    const response = await apiClient.post('/topics', topicData);
    return response.data;
  }

  // Update topic (Admin only)
  static async updateTopic(topicId, topicData) {
    const response = await apiClient.put(`/topics/${topicId}`, topicData);
    return response.data;
  }

  // Delete topic (Admin only)
  static async deleteTopic(topicId) {
    const response = await apiClient.delete(`/topics/${topicId}`);
    return response.data;
  }

  // Search topics
  static async searchTopics(searchTerm) {
    const response = await apiClient.get(`/topics/search?searchTerm=${encodeURIComponent(searchTerm)}`);
    return response.data;
  }

  // Toggle topic status (Admin only)
  static async toggleTopicStatus(topicId) {
    const response = await apiClient.put(`/admin/topics/${topicId}/toggle-status`);
    return response.data;
  }

  // Get topics with stats (Admin only)
  static async getTopicsWithStats() {
    const response = await apiClient.get('/admin/topics/with-stats');
    return response.data;
  }
}

export class QuizService {
  // Get quiz questions for a topic
  static async getQuizQuestions(topicSlug, limit = 10, difficulty = null) {
    let url = `/quiz/questions/${topicSlug}?limit=${limit}`;
    if (difficulty) {
      url += `&difficulty=${difficulty}`;
    }
    const response = await apiClient.get(url);
    return response.data;
  }

  // Start quiz session
  static async startQuizSession(sessionData) {
    const response = await apiClient.post('/quiz/session/start', sessionData);
    return response.data;
  }

  // Submit quiz answers
  static async submitQuiz(sessionId, answers) {
    const response = await apiClient.post(`/quiz/session/${sessionId}/submit`, { answers });
    return response.data;
  }

  // Get user quiz history
  static async getUserQuizHistory(userId) {
    const response = await apiClient.get(`/quiz/history/${userId}`);
    return response.data;
  }

  // Get quiz session by ID
  static async getQuizSession(sessionId) {
    const response = await apiClient.get(`/quiz/session/${sessionId}`);
    return response.data;
  }
}

export class FeedbackService {
  // Submit feedback
  static async submitFeedback(feedbackData) {
    const response = await apiClient.post('/feedback/submit', feedbackData);
    return response.data;
  }

  // Get user's feedback history
  static async getUserFeedback(userId) {
    const response = await apiClient.get(`/feedback/user/${userId}`);
    return response.data;
  }

  // Get feedback by status
  static async getFeedbackByStatus(status) {
    const response = await apiClient.get(`/feedback/status/${status}`);
    return response.data;
  }

  // Get pending feedback
  static async getPendingFeedback() {
    const response = await apiClient.get('/feedback/pending');
    return response.data;
  }

  // Update feedback status (Admin only)
  static async updateFeedbackStatus(feedbackId, status) {
    const response = await apiClient.put(`/feedback/${feedbackId}/status`, { status });
    return response.data;
  }

  // Get feedback statistics
  static async getFeedbackStats() {
    const response = await apiClient.get('/feedback/stats');
    return response.data;
  }

  // Get feedback by ID
  static async getFeedbackById(feedbackId) {
    const response = await apiClient.get(`/feedback/${feedbackId}`);
    return response.data;
  }
}

export class AdminService {
  // Get dashboard statistics
  static async getDashboardStats() {
    const response = await apiClient.get('/admin/dashboard/stats');
    return response.data;
  }

  // Get all students
  static async getAllStudents() {
    const response = await apiClient.get('/admin/students');
    return response.data;
  }

  // Get recent quiz sessions
  static async getRecentQuizSessions(days = 7) {
    const response = await apiClient.get(`/admin/quiz-sessions/recent?days=${days}`);
    return response.data;
  }

  // Get average scores by topic
  static async getAverageScoresByTopic() {
    const response = await apiClient.get('/admin/analytics/average-scores');
    return response.data;
  }
}

// Export the apiClient for direct use if needed
export { apiClient };

// Export default API object with all services
export default {
  auth: AuthService,
  users: UserService,
  topics: TopicService,
  quiz: QuizService,
  feedback: FeedbackService,
  admin: AdminService,
}; 