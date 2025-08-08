# Aptitude Application - Entities and DTOs Documentation

This document describes the JPA entities and DTOs created for the Aptitude Application backend based on the `aptitude_schema.sql` database schema.

## Project Structure

```
src/main/java/com/sunbeam/
├── entities/          # JPA Entities
├── dto/              # Data Transfer Objects
└── Application.java  # Main Spring Boot Application
```

## Entities

### 1. User Entity
- **Table**: `users`
- **Purpose**: Stores user information for authentication and authorization
- **Key Fields**: userId, name, email, password, role, createdAt, isActive
- **Relationships**: One-to-Many with QuizSession and Feedback

### 2. Topic Entity
- **Table**: `topics`
- **Purpose**: Stores aptitude topics/categories
- **Key Fields**: topicId, topicName, topicSlug, description, isActive
- **Relationships**: One-to-Many with TopicVideo, TopicNote, TopicExample, Question, QuizSession

### 3. TopicVideo Entity
- **Table**: `topic_videos`
- **Purpose**: Stores video content for topics
- **Key Fields**: videoId, topicId, videoUrl, displayOrder
- **Relationships**: Many-to-One with Topic

### 4. TopicNote Entity
- **Table**: `topic_notes`
- **Purpose**: Stores study notes for topics
- **Key Fields**: noteId, topicId, noteContent, displayOrder
- **Relationships**: Many-to-One with Topic

### 5. TopicExample Entity
- **Table**: `topic_examples`
- **Purpose**: Stores examples for topics
- **Key Fields**: exampleId, topicId, exampleText, displayOrder
- **Relationships**: Many-to-One with Topic

### 6. Question Entity
- **Table**: `questions`
- **Purpose**: Stores quiz questions
- **Key Fields**: questionId, topicId, questionText, difficulty
- **Relationships**: Many-to-One with Topic, One-to-Many with QuestionOption

### 7. QuestionOption Entity
- **Table**: `question_options`
- **Purpose**: Stores answer options for questions
- **Key Fields**: optionId, questionId, optionLabel, optionText, isCorrect
- **Relationships**: Many-to-One with Question

### 8. QuizSession Entity
- **Table**: `quiz_sessions`
- **Purpose**: Tracks quiz attempts and results
- **Key Fields**: sessionId, userId, topicId, mode, startTime, endTime, totalQuestions, correctAnswers, score, timeTakenSeconds
- **Relationships**: Many-to-One with User and Topic

### 9. Feedback Entity
- **Table**: `feedback`
- **Purpose**: Stores user feedback
- **Key Fields**: feedbackId, userId, message, status, createdAt
- **Relationships**: Many-to-One with User

## DTOs (Data Transfer Objects)

### User DTOs
- `CreateUserRequest`: For user registration
- `UpdateUserRequest`: For updating user information
- `UserResponse`: For returning user data
- `LoginRequest`: For user login
- `LoginResponse`: For login response with token

### Topic DTOs
- `CreateTopicRequest`: For creating new topics
- `UpdateTopicRequest`: For updating topics
- `TopicResponse`: For basic topic information
- `TopicDetailResponse`: For detailed topic information with related content

### Content DTOs (Video, Note, Example)
- `Create*Request`: For creating content
- `Update*Request`: For updating content
- `*Response`: For returning content data

### Question DTOs
- `CreateQuestionRequest`: For creating questions with options
- `UpdateQuestionRequest`: For updating questions
- `QuestionResponse`: For returning question data with options
- `CreateQuestionOptionRequest`: For creating question options

### Quiz DTOs
- `QuizQuestionResponse`: For quiz questions (without correct answers)
- `QuizOptionResponse`: For quiz options (without isCorrect flag)
- `QuizSubmissionRequest`: For submitting quiz answers
- `QuizResultResponse`: For quiz results with detailed feedback

### QuizSession DTOs
- `CreateQuizSessionRequest`: For starting a quiz session
- `UpdateQuizSessionRequest`: For updating session results
- `QuizSessionResponse`: For session details
- `QuizSessionSummaryResponse`: For session summary with topic name

### Feedback DTOs
- `CreateFeedbackRequest`: For creating feedback
- `UpdateFeedbackRequest`: For updating feedback status
- `FeedbackResponse`: For detailed feedback with user info
- `FeedbackSummaryResponse`: For feedback summary

### Common DTOs
- `ApiResponse<T>`: Generic API response wrapper
- `PageResponse<T>`: Pagination wrapper for list responses

## Key Features

1. **Lombok Integration**: All entities and DTOs use Lombok annotations for reducing boilerplate code
2. **JPA Annotations**: Proper JPA annotations for database mapping
3. **Validation Ready**: DTOs are structured to support validation annotations
4. **Security Conscious**: Quiz DTOs exclude correct answers to prevent cheating
5. **Flexible Design**: Separate request/response DTOs for different operations
6. **Pagination Support**: Built-in pagination support for list operations

## Usage Examples

### Creating a User
```java
UserDto.CreateUserRequest request = new UserDto.CreateUserRequest();
request.setName("John Doe");
request.setEmail("john@example.com");
request.setPassword("password123");
request.setRole(User.UserRole.STUDENT);
```

### API Response
```java
ApiResponse<UserDto.UserResponse> response = ApiResponse.success(userResponse);
```

### Paginated Response
```java
PageResponse<TopicDto.TopicResponse> pageResponse = PageResponse.of(topics, 0, 10, totalElements);
```

## Next Steps

1. Create repositories for each entity
2. Implement service layer with business logic
3. Create REST controllers
4. Add validation annotations to DTOs
5. Implement authentication and authorization
6. Add exception handling
7. Configure database connection in `application.properties` 