package com.sunbeam.dto;

import com.sunbeam.entities.Feedback;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class FeedbackDto {
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateFeedbackRequest {
        private Long userId;
        private String message;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateFeedbackRequest {
        private Feedback.FeedbackStatus status;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FeedbackResponse {
        private Long feedbackId;
        private Long userId;
        private String userName;
        private String message;
        private Feedback.FeedbackStatus status;
        private LocalDateTime createdAt;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FeedbackSummaryResponse {
        private Long feedbackId;
        private String userName;
        private String message;
        private Feedback.FeedbackStatus status;
        private LocalDateTime createdAt;
    }
} 