package com.sunbeam.controller;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.QuizSessionDto;
import com.sunbeam.entities.QuizSession;
import com.sunbeam.entities.Topic;
import com.sunbeam.entities.User;
import com.sunbeam.service.QuestionService;
import com.sunbeam.service.QuizSessionService;
import com.sunbeam.service.TopicService;
import com.sunbeam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private TopicService topicService;
    
    @Autowired
    private QuizSessionService quizSessionService;
    
    @Autowired
    private QuestionService questionService;
    
    // Admin: Get dashboard statistics
    @GetMapping("/dashboard/stats")
    public ResponseEntity<ApiResponse<Object>> getDashboardStats() {
        try {
            // Get user statistics
            List<User> students = userService.findByRoleAndIsActive(User.UserRole.STUDENT, true);
            List<User> admins = userService.findByRoleAndIsActive(User.UserRole.ADMIN, true);
            
            // Get topic statistics
            List<Topic> activeTopicsList = topicService.findByIsActive(true);
            List<Topic> inactiveTopicsList = topicService.findByIsActive(false);
            
            // Get recent quiz sessions (last 7 days)
            LocalDateTime weekAgo = LocalDateTime.now().minusDays(7);
            List<QuizSession> recentSessions = quizSessionService.findByDateRange(weekAgo, LocalDateTime.now());
            
            var stats = new Object() {
                public final int totalStudents = students.size();
                public final int totalAdmins = admins.size();
                public final int activeTopics = activeTopicsList.size();
                public final int inactiveTopics = inactiveTopicsList.size();
                public final int recentQuizSessions = recentSessions.size();
            };
            
            return ResponseEntity.ok(ApiResponse.success(stats));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to get dashboard stats: " + e.getMessage(), "STATS_ERROR"));
        }
    }
    
    // Admin: Get all students
    @GetMapping("/students")
    public ResponseEntity<ApiResponse<List<Object>>> getAllStudents() {
        try {
            List<User> students = userService.findByRoleAndIsActive(User.UserRole.STUDENT, true);
            
            List<Object> studentList = students.stream()
                .map(student -> new Object() {
                    public final Long userId = student.getUserId();
                    public final String name = student.getName();
                    public final String email = student.getEmail();
                    public final String role = student.getRole().toString();
                    public final LocalDateTime createdAt = student.getCreatedAt();
                    public final Boolean isActive = student.getIsActive();
                })
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(ApiResponse.success(studentList));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to get students: " + e.getMessage(), "FETCH_ERROR"));
        }
    }
    
    // Admin: Get all topics with question counts
    @GetMapping("/topics/with-stats")
    public ResponseEntity<ApiResponse<List<Object>>> getTopicsWithStats() {
        try {
            List<Topic> topics = topicService.findByIsActive(true);
            
            List<Object> topicList = topics.stream()
                .map(topic -> new Object() {
                    public final Long topicId = topic.getTopicId();
                    public final String topicName = topic.getTopicName();
                    public final String topicSlug = topic.getTopicSlug();
                    public final String description = topic.getDescription();
                    public final Boolean isActive = topic.getIsActive();
                    public final long questionCount = questionService.countByTopic(topic);
                })
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(ApiResponse.success(topicList));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to get topics: " + e.getMessage(), "FETCH_ERROR"));
        }
    }
    
    // Admin: Get recent quiz sessions
    @GetMapping("/quiz-sessions/recent")
    public ResponseEntity<ApiResponse<List<QuizSessionDto.QuizSessionSummaryResponse>>> getRecentQuizSessions(
            @RequestParam(defaultValue = "7") int days) {
        try {
            LocalDateTime startDate = LocalDateTime.now().minusDays(days);
            List<QuizSession> sessions = quizSessionService.findByDateRange(startDate, LocalDateTime.now());
            
            List<QuizSessionDto.QuizSessionSummaryResponse> sessionList = sessions.stream()
                .map(session -> new QuizSessionDto.QuizSessionSummaryResponse(
                    session.getSessionId(),
                    session.getTopic().getTopicName(),
                    session.getMode(),
                    session.getStartTime(),
                    session.getEndTime(),
                    session.getTotalQuestions(),
                    session.getCorrectAnswers(),
                    session.getScore(),
                    session.getTimeTakenSeconds()
                ))
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(ApiResponse.success(sessionList));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to get recent quiz sessions: " + e.getMessage(), "FETCH_ERROR"));
        }
    }
    
    // Admin: Get average scores by topic
    @GetMapping("/analytics/average-scores")
    public ResponseEntity<ApiResponse<List<Object>>> getAverageScoresByTopic() {
        try {
            List<Topic> topics = topicService.findByIsActive(true);
            
            List<Object> analytics = topics.stream()
                .map(topic -> {
                    Double avgScore = quizSessionService.getAverageScoreByTopic(topic);
                    return new Object() {
                        public final String topicName = topic.getTopicName();
                        public final String topicSlug = topic.getTopicSlug();
                        public final Double averageScore = avgScore != null ? avgScore : 0.0;
                    };
                })
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(ApiResponse.success(analytics));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to get analytics: " + e.getMessage(), "ANALYTICS_ERROR"));
        }
    }
    
    // Admin: Deactivate/Activate user
    @PutMapping("/users/{userId}/toggle-status")
    public ResponseEntity<ApiResponse<String>> toggleUserStatus(@PathVariable Long userId) {
        try {
            var userOpt = userService.findById(userId);
            
            if (userOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            User user = userOpt.get();
            user.setIsActive(!user.getIsActive());
            userService.save(user);
            
            String message = user.getIsActive() ? "User activated successfully" : "User deactivated successfully";
            return ResponseEntity.ok(ApiResponse.success(message, "Status updated"));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to toggle user status: " + e.getMessage(), "UPDATE_ERROR"));
        }
    }
    
    // Admin: Deactivate/Activate topic
    @PutMapping("/topics/{topicId}/toggle-status")
    public ResponseEntity<ApiResponse<String>> toggleTopicStatus(@PathVariable Long topicId) {
        try {
            var topicOpt = topicService.findById(topicId);
            
            if (topicOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Topic topic = topicOpt.get();
            topic.setIsActive(!topic.getIsActive());
            topicService.save(topic);
            
            String message = topic.getIsActive() ? "Topic activated successfully" : "Topic deactivated successfully";
            return ResponseEntity.ok(ApiResponse.success(message, "Status updated"));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to toggle topic status: " + e.getMessage(), "UPDATE_ERROR"));
        }
    }
} 