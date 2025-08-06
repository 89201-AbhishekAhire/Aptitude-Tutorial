package com.sunbeam.dto;

import com.sunbeam.entities.QuizSession;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class QuizSessionDto {
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateQuizSessionRequest {
        private Long userId;
        private Long topicId;
        private QuizSession.QuizMode mode;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateQuizSessionRequest {
        private LocalDateTime endTime;
        private Integer totalQuestions;
        private Integer correctAnswers;
        private BigDecimal score;
        private Integer timeTakenSeconds;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuizSessionResponse {
        private Long sessionId;
        private Long userId;
        private Long topicId;
        private QuizSession.QuizMode mode;
        private LocalDateTime startTime;
        private LocalDateTime endTime;
        private Integer totalQuestions;
        private Integer correctAnswers;
        private BigDecimal score;
        private Integer timeTakenSeconds;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuizSessionSummaryResponse {
        private Long sessionId;
        private String topicName;
        private QuizSession.QuizMode mode;
        private LocalDateTime startTime;
        private LocalDateTime endTime;
        private Integer totalQuestions;
        private Integer correctAnswers;
        private BigDecimal score;
        private Integer timeTakenSeconds;
    }
} 