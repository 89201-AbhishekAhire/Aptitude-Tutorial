package com.sunbeam.controller;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.QuizDto;
import com.sunbeam.dto.QuizSessionDto;
import com.sunbeam.entities.Question;
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

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "*")
public class QuizController {
    
    @Autowired
    private QuestionService questionService;
    
    @Autowired
    private QuizSessionService quizSessionService;
    
    @Autowired
    private TopicService topicService;
    
    @Autowired
    private UserService userService;
    
    // Get quiz questions for a topic (for frontend quiz)
    @GetMapping("/questions/{topicSlug}")
    public ResponseEntity<ApiResponse<List<QuizDto.QuizQuestionResponse>>> getQuizQuestions(
            @PathVariable String topicSlug,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) String difficulty) {
        try {
            Optional<Topic> topicOpt = topicService.findByTopicSlugAndIsActive(topicSlug, true);
            
            if (topicOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Topic topic = topicOpt.get();
            List<Question> questions;
            
            if (difficulty != null && !difficulty.isEmpty()) {
                Question.Difficulty questionDifficulty = Question.Difficulty.valueOf(difficulty.toUpperCase());
                questions = questionService.findRandomQuestionsByTopicAndDifficulty(topic, questionDifficulty, limit);
            } else {
                questions = questionService.findRandomQuestionsByTopic(topic, limit);
            }
            
            List<QuizDto.QuizQuestionResponse> quizQuestions = questions.stream()
                .map(question -> {
                    List<QuizDto.QuizOptionResponse> options = question.getQuestionOptions().stream()
                        .map(option -> new QuizDto.QuizOptionResponse(
                            option.getOptionId(),
                            option.getOptionLabel(),
                            option.getOptionText()
                        ))
                        .collect(Collectors.toList());
                    
                    return new QuizDto.QuizQuestionResponse(
                        question.getQuestionId(),
                        question.getQuestionText(),
                        question.getDifficulty(),
                        options
                    );
                })
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(ApiResponse.success(quizQuestions));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to get quiz questions: " + e.getMessage(), "FETCH_ERROR"));
        }
    }
    
    // Start a quiz session
    @PostMapping("/session/start")
    public ResponseEntity<ApiResponse<QuizSessionDto.QuizSessionResponse>> startQuizSession(
            @RequestBody QuizSessionDto.CreateQuizSessionRequest request) {
        try {
            Optional<User> userOpt = userService.findById(request.getUserId());
            Optional<Topic> topicOpt = topicService.findById(request.getTopicId());
            
            if (userOpt.isEmpty() || topicOpt.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Invalid user or topic", "INVALID_REQUEST"));
            }
            
            QuizSession session = new QuizSession();
            session.setUser(userOpt.get());
            session.setTopic(topicOpt.get());
            session.setMode(request.getMode());
            session.setStartTime(LocalDateTime.now());
            
            QuizSession savedSession = quizSessionService.save(session);
            
            QuizSessionDto.QuizSessionResponse response = new QuizSessionDto.QuizSessionResponse(
                savedSession.getSessionId(),
                savedSession.getUser().getUserId(),
                savedSession.getTopic().getTopicId(),
                savedSession.getMode(),
                savedSession.getStartTime(),
                savedSession.getEndTime(),
                savedSession.getTotalQuestions(),
                savedSession.getCorrectAnswers(),
                savedSession.getScore(),
                savedSession.getTimeTakenSeconds()
            );
            
            return ResponseEntity.ok(ApiResponse.success("Quiz session started", response));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to start quiz session: " + e.getMessage(), "SESSION_ERROR"));
        }
    }
    
    // Submit quiz answers and get results
    @PostMapping("/session/{sessionId}/submit")
    public ResponseEntity<ApiResponse<QuizDto.QuizResultResponse>> submitQuiz(
            @PathVariable Long sessionId,
            @RequestBody QuizDto.QuizSubmissionRequest request) {
        try {
            Optional<QuizSession> sessionOpt = quizSessionService.findById(sessionId);
            
            if (sessionOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            QuizSession session = sessionOpt.get();
            
            // Calculate results
            int totalQuestions = request.getAnswers().size();
            List<QuizDto.QuestionResult> questionResults = request.getAnswers().stream()
                .map(answer -> {
                    Optional<Question> questionOpt = questionService.findById(answer.getQuestionId());
                    if (questionOpt.isPresent()) {
                        Question question = questionOpt.get();
                        boolean isCorrect = question.getQuestionOptions().stream()
                            .anyMatch(option -> option.getOptionId().equals(answer.getSelectedOptionId()) 
                                && option.getIsCorrect());
                        
                        Long correctOptionId = question.getQuestionOptions().stream()
                            .filter(option -> option.getIsCorrect())
                            .findFirst()
                            .map(option -> option.getOptionId())
                            .orElse(null);
                        
                        return new QuizDto.QuestionResult(
                            question.getQuestionId(),
                            question.getQuestionText(),
                            answer.getSelectedOptionId(),
                            correctOptionId,
                            isCorrect,
                            null // Add explanation if needed
                        );
                    }
                    return null;
                })
                .filter(result -> result != null)
                .collect(Collectors.toList());
            
            // Calculate correct answers count
            int correctAnswers = (int) questionResults.stream()
                .filter(result -> result.isCorrect())
                .count();
            
            // Update session
            session.setEndTime(LocalDateTime.now());
            session.setTotalQuestions(totalQuestions);
            session.setCorrectAnswers(correctAnswers);
            session.setScore(BigDecimal.valueOf((double) correctAnswers / totalQuestions * 100));
            
            // Calculate time taken
            if (session.getStartTime() != null) {
                long timeTaken = java.time.Duration.between(session.getStartTime(), session.getEndTime()).getSeconds();
                session.setTimeTakenSeconds((int) timeTaken);
            }
            
            quizSessionService.save(session);
            
            // Create result response
            QuizDto.QuizResultResponse result = new QuizDto.QuizResultResponse(
                sessionId,
                totalQuestions,
                correctAnswers,
                totalQuestions - correctAnswers,
                (double) correctAnswers / totalQuestions * 100,
                questionResults
            );
            
            return ResponseEntity.ok(ApiResponse.success("Quiz submitted successfully", result));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to submit quiz: " + e.getMessage(), "SUBMISSION_ERROR"));
        }
    }
    
    // Get user's quiz history
    @GetMapping("/history/{userId}")
    public ResponseEntity<ApiResponse<List<QuizSessionDto.QuizSessionSummaryResponse>>> getUserQuizHistory(
            @PathVariable Long userId) {
        try {
            Optional<User> userOpt = userService.findById(userId);
            
            if (userOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            List<QuizSession> sessions = quizSessionService.findByUser(userOpt.get());
            
            List<QuizSessionDto.QuizSessionSummaryResponse> history = sessions.stream()
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
            
            return ResponseEntity.ok(ApiResponse.success(history));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to get quiz history: " + e.getMessage(), "HISTORY_ERROR"));
        }
    }
    
    // Get quiz session by ID
    @GetMapping("/session/{sessionId}")
    public ResponseEntity<ApiResponse<QuizSessionDto.QuizSessionResponse>> getQuizSession(@PathVariable Long sessionId) {
        try {
            Optional<QuizSession> sessionOpt = quizSessionService.findById(sessionId);
            
            if (sessionOpt.isPresent()) {
                QuizSession session = sessionOpt.get();
                QuizSessionDto.QuizSessionResponse response = new QuizSessionDto.QuizSessionResponse(
                    session.getSessionId(),
                    session.getUser().getUserId(),
                    session.getTopic().getTopicId(),
                    session.getMode(),
                    session.getStartTime(),
                    session.getEndTime(),
                    session.getTotalQuestions(),
                    session.getCorrectAnswers(),
                    session.getScore(),
                    session.getTimeTakenSeconds()
                );
                
                return ResponseEntity.ok(ApiResponse.success(response));
                
            } else {
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to get quiz session: " + e.getMessage(), "SESSION_NOT_FOUND"));
        }
    }
} 