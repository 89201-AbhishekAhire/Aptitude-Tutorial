# DAO Layer - Frontend-Specific Design

This DAO layer is designed specifically for your frontend requirements. It's simple, focused, and contains only the operations your React frontend actually needs.

## Design Philosophy

✅ **Frontend-First**: Only operations your frontend uses  
✅ **Simple & Clean**: No unnecessary complexity  
✅ **Easy to Understand**: Clear method names and purposes  
✅ **Performance Optimized**: Efficient queries for frontend needs  

## DAO Interfaces

### 1. UserDao
**Purpose**: User authentication and admin user management

**Frontend Operations**:
- `findByEmail(String email)` - Login validation
- `findByEmailAndPassword(String email, String password)` - Authentication
- `existsByEmail(String email)` - Registration validation

**Admin Operations**:
- `findByRole(UserRole role)` - List users by role
- `findByIsActive(Boolean isActive)` - Filter active/inactive users
- `findByRoleAndIsActive(UserRole role, Boolean isActive)` - Combined filtering

### 2. TopicDao
**Purpose**: Topic listing and management

**Frontend Operations**:
- `findByIsActive(Boolean isActive)` - Get active topics for frontend
- `findByTopicSlug(String topicSlug)` - Get topic by slug (URL-friendly)
- `findByTopicSlugAndIsActive(String topicSlug, Boolean isActive)` - Get active topic by slug

**Admin Operations**:
- `searchTopics(String searchTerm)` - Search topics for admin panel
- `existsByTopicSlug(String topicSlug)` - Validate unique slugs

### 3. QuestionDao
**Purpose**: Quiz question management

**Frontend Operations**:
- `findByTopic(Topic topic)` - Get all questions for a topic
- `findByTopicAndDifficulty(Topic topic, Difficulty difficulty)` - Filter by difficulty
- `findRandomQuestionsByTopic(Topic topic, int limit)` - Get random questions for quiz
- `findRandomQuestionsByTopicAndDifficulty(Topic topic, Difficulty difficulty, int limit)` - Random questions by difficulty

**Admin Operations**:
- `searchQuestions(String searchTerm)` - Search questions for admin
- `countByTopic(Topic topic)` - Count questions per topic

### 4. QuizSessionDao
**Purpose**: Track quiz attempts and results

**Frontend Operations**:
- `findByUser(User user)` - Get user's quiz history
- `findByUserAndTopic(User user, Topic topic)` - Get user's attempts for specific topic
- `findByUserAndMode(User user, QuizMode mode)` - Get attempts by quiz mode

**Admin Operations**:
- `findByDateRange(LocalDateTime startDate, LocalDateTime endDate)` - Analytics
- `getAverageScoreByTopic(Topic topic)` - Performance analytics
- `countByUserAndTopic(User user, Topic topic)` - User progress tracking

### 5. FeedbackDao
**Purpose**: User feedback system

**Frontend Operations**:
- `findByUser(User user)` - Get user's feedback history
- `findByStatus(FeedbackStatus status)` - Get feedback by status

**Admin Operations**:
- `findByDateRange(LocalDateTime startDate, LocalDateTime endDate)` - Feedback analytics
- `findPendingFeedback(FeedbackStatus status)` - Get pending feedback for review
- `countByStatus(FeedbackStatus status)` - Count feedback by status

### 6. TopicContentDao (Video, Note, Example)
**Purpose**: Topic content management

**Frontend Operations**:
- `findByTopicOrderByDisplayOrderAsc(Topic topic)` - Get ordered content for topic pages

### 7. QuestionOptionDao
**Purpose**: Question answer options

**Frontend Operations**:
- `findByQuestion(Question question)` - Get options for a question
- `findByQuestionOrderByOptionLabelAsc(Question question)` - Get ordered options

## Frontend Use Cases Covered

### 1. Authentication Flow
```java
// Login
User user = userDao.findByEmailAndPassword(email, password);

// Registration validation
boolean exists = userDao.existsByEmail(email);
```

### 2. Topic Navigation
```java
// Get all active topics for topic selection page
List<Topic> topics = topicDao.findByIsActive(true);

// Get specific topic by slug for topic detail page
Topic topic = topicDao.findByTopicSlugAndIsActive("percentage", true);
```

### 3. Quiz Operations
```java
// Get random questions for quiz
List<Question> questions = questionDao.findRandomQuestionsByTopic(topic, 10);

// Get user's quiz history
List<QuizSession> history = quizSessionDao.findByUser(user);
```

### 4. Admin Operations
```java
// Get all students for admin panel
List<User> students = userDao.findByRoleAndIsActive(UserRole.STUDENT, true);

// Get pending feedback for review
List<Feedback> pending = feedbackDao.findPendingFeedback(FeedbackStatus.PENDING);
```

## Key Features

### 1. **Frontend-Specific Methods**
- Methods match exactly what your React components need
- No unnecessary operations that frontend doesn't use

### 2. **Performance Optimized**
- `findByTopicSlug()` for fast topic lookups
- `findRandomQuestionsByTopic()` for efficient quiz generation
- Ordered queries for consistent content display

### 3. **Security Conscious**
- Separate methods for admin vs user operations
- No direct access to sensitive data through generic methods

### 4. **Easy to Extend**
- Clear separation of concerns
- Simple to add new methods as frontend needs grow

## Usage Examples

### Service Layer Integration
```java
@Service
public class TopicService {
    @Autowired
    private TopicDao topicDao;
    
    public List<Topic> getActiveTopics() {
        return topicDao.findByIsActive(true);
    }
    
    public Topic getTopicBySlug(String slug) {
        return topicDao.findByTopicSlugAndIsActive(slug, true)
            .orElseThrow(() -> new TopicNotFoundException("Topic not found"));
    }
}
```

### Controller Integration
```java
@RestController
@RequestMapping("/api/topics")
public class TopicController {
    @Autowired
    private TopicService topicService;
    
    @GetMapping
    public ApiResponse<List<TopicDto.TopicResponse>> getAllTopics() {
        List<Topic> topics = topicService.getActiveTopics();
        return ApiResponse.success(topicMapper.toResponseList(topics));
    }
}
```

## Next Steps

1. **Create Service Layer**: Implement business logic using these DAOs
2. **Add Controllers**: Create REST endpoints for frontend consumption
3. **Add Validation**: Implement input validation for all operations
4. **Add Security**: Implement authentication and authorization
5. **Add Caching**: Optimize frequently accessed data

This DAO layer is designed to be the foundation for your backend services, providing exactly what your frontend needs without any unnecessary complexity. 