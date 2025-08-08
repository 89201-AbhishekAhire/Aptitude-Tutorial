package com.sunbeam.dto;

import com.sunbeam.entities.Question;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class QuizDto {
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuizQuestionResponse {
        private Long questionId;
        private String questionText;
        private Question.Difficulty difficulty;
        private List<QuizOptionResponse> options;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuizOptionResponse {
        private Long optionId;
        private String optionLabel;
        private String optionText;
        // Note: isCorrect is not included in quiz questions to prevent cheating
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuizSubmissionRequest {
        private Long sessionId;
        private List<QuestionAnswer> answers;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionAnswer {
        private Long questionId;
        private Long selectedOptionId;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuizResultResponse {
        private Long sessionId;
        private Integer totalQuestions;
        private Integer correctAnswers;
        private Integer incorrectAnswers;
        private Double percentage;
        private List<QuestionResult> questionResults;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionResult {
        private Long questionId;
        private String questionText;
        private Long selectedOptionId;
        private Long correctOptionId;
        private Boolean isCorrect;
        private String explanation; // Optional explanation for the answer
    }
} 