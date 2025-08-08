# REST Controllers - Frontend-Specific API Endpoints

This document describes the REST controllers created for your aptitude application backend. All endpoints are designed specifically for your React frontend needs.

## API Base URL
```
http://localhost:8080/api
```

## Controllers Overview

### 1. UserController (`/api/users`)
**Purpose**: User authentication and management

#### Endpoints:

**User Registration**
```
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "STUDENT"
}
```

**User Login**
```
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Get User by ID**
```
GET /api/users/{id}
```

**Update User**
```
PUT /api/users/{id}
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "isActive": true
}
```

**Admin: Get Users by Role**
```
GET /api/users/role/{role}  // STUDENT, ADMIN
```

**Admin: Get Users by Status**
```
GET /api/users/active/{isActive}  // true, false
```

---

### 2. TopicController (`/api/topics`)
**Purpose**: Topic management and navigation

#### Endpoints:

**Get All Active Topics** (for frontend topic selection)
```
GET /api/topics
```

**Get Topic by Slug** (for frontend topic detail pages)
```
GET /api/topics/slug/{slug}
```

**Get Topic by ID**
```
GET /api/topics/{id}
```

**Admin: Create Topic**
```
POST /api/topics
Content-Type: application/json

{
  "topicName": "New Topic",
  "topicSlug": "new-topic",
  "description": "Topic description",
  "isActive": true
}
```

**Admin: Update Topic**
```
PUT /api/topics/{id}
Content-Type: application/json

{
  "topicName": "Updated Topic",
  "description": "Updated description"
}
```

**Admin: Search Topics**
```
GET /api/topics/search?searchTerm=percentage
```

**Admin: Delete Topic**
```
DELETE /api/topics/{id}
```

---

### 3. QuizController (`/api/quiz`)
**Purpose**: Quiz operations and session management

#### Endpoints:

**Get Quiz Questions** (for frontend quiz)
```
GET /api/quiz/questions/{topicSlug}?limit=10&difficulty=MEDIUM
```

**Start Quiz Session**
```
POST /api/quiz/session/start
Content-Type: application/json

{
  "userId": 1,
  "topicId": 1,
  "mode": "STUDY"  // STUDY, TRAINING, CHALLENGE
}
```

**Submit Quiz Answers**
```
POST /api/quiz/session/{sessionId}/submit
Content-Type: application/json

{
  "sessionId": 1,
  "answers": [
    {
      "questionId": 1,
      "selectedOptionId": 2
    },
    {
      "questionId": 2,
      "selectedOptionId": 4
    }
  ]
}
```

**Get User Quiz History**
```
GET /api/quiz/history/{userId}
```

**Get Quiz Session**
```
GET /api/quiz/session/{sessionId}
```

---

### 4. FeedbackController (`/api/feedback`)
**Purpose**: User feedback system

#### Endpoints:

**Submit Feedback** (for frontend users)
```
POST /api/feedback/submit
Content-Type: application/json

{
  "userId": 1,
  "message": "Great platform! Very helpful for aptitude preparation."
}
```

**Get User Feedback History**
```
GET /api/feedback/user/{userId}
```

**Admin: Get Feedback by Status**
```
GET /api/feedback/status/{status}  // PENDING, REVIEWED
```

**Admin: Get Pending Feedback**
```
GET /api/feedback/pending
```

**Admin: Update Feedback Status**
```
PUT /api/feedback/{feedbackId}/status
Content-Type: application/json

{
  "status": "REVIEWED"
}
```

**Admin: Get Feedback Statistics**
```
GET /api/feedback/stats
```

**Get Feedback by ID**
```
GET /api/feedback/{feedbackId}
```

---

### 5. AdminController (`/api/admin`)
**Purpose**: Admin-specific operations and analytics

#### Endpoints:

**Get Dashboard Statistics**
```
GET /api/admin/dashboard/stats
```

**Get All Students**
```
GET /api/admin/students
```

**Get Topics with Statistics**
```
GET /api/admin/topics/with-stats
```

**Get Recent Quiz Sessions**
```
GET /api/admin/quiz-sessions/recent?days=7
```

**Get Average Scores by Topic**
```
GET /api/admin/analytics/average-scores
```

**Toggle User Status**
```
PUT /api/admin/users/{userId}/toggle-status
```

**Toggle Topic Status**
```
PUT /api/admin/topics/{topicId}/toggle-status
```

---

## Response Format

All endpoints return a standardized response format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "timestamp": "2024-01-15T10:30:00",
  "errorCode": null
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "data": null,
  "timestamp": "2024-01-15T10:30:00",
  "errorCode": "ERROR_CODE"
}
```

---

## Frontend Integration Examples

### 1. User Authentication Flow
```javascript
// Login
const loginResponse = await fetch('/api/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const loginData = await loginResponse.json();
if (loginData.success) {
  // Store user data and token
  localStorage.setItem('user', JSON.stringify(loginData.data));
}
```

### 2. Topic Navigation
```javascript
// Get all topics
const topicsResponse = await fetch('/api/topics');
const topicsData = await topicsResponse.json();

if (topicsData.success) {
  setTopics(topicsData.data);
}
```

### 3. Quiz Operations
```javascript
// Get quiz questions
const questionsResponse = await fetch(`/api/quiz/questions/${topicSlug}?limit=10`);
const questionsData = await questionsResponse.json();

if (questionsData.success) {
  setQuestions(questionsData.data);
}
```

### 4. Feedback Submission
```javascript
// Submit feedback
const feedbackResponse = await fetch('/api/feedback/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId, message })
});

const feedbackData = await feedbackResponse.json();
if (feedbackData.success) {
  // Show success message
}
```

---

## Key Features

### 1. **Frontend-First Design**
- All endpoints match your React frontend requirements
- No unnecessary endpoints that frontend doesn't use

### 2. **Standardized Responses**
- Consistent API response format
- Proper error handling and messages
- HTTP status codes for different scenarios

### 3. **CORS Enabled**
- All controllers have `@CrossOrigin(origins = "*")`
- Ready for frontend integration

### 4. **Admin vs User Operations**
- Clear separation between admin and user endpoints
- Admin endpoints for management and analytics
- User endpoints for regular operations

### 5. **Security Ready**
- Input validation in place
- Error handling for all operations
- Ready for JWT authentication integration

---

## Next Steps

1. **Add Authentication**: Implement JWT token validation
2. **Add Validation**: Add `@Valid` annotations to request DTOs
3. **Add Security**: Implement role-based access control
4. **Add Logging**: Add proper logging for debugging
5. **Add Caching**: Implement caching for frequently accessed data
6. **Add Rate Limiting**: Protect against abuse
7. **Add Documentation**: Integrate with Swagger/OpenAPI

---

## Testing the API

You can test these endpoints using:
- **Postman**: Import the endpoints and test with sample data
- **cURL**: Use command line for quick testing
- **Frontend**: Integrate directly with your React application

All endpoints are ready for immediate use with your frontend application! 