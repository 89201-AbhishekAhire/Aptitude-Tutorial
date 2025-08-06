package com.sunbeam.dto;

import com.sunbeam.entities.Question;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class QuestionDto {
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateQuestionRequest {
        private Long topicId;
        private String questionText;
        private Question.Difficulty difficulty = Question.Difficulty.MEDIUM;
        private List<CreateQuestionOptionRequest> options;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateQuestionRequest {
        private String questionText;
        private Question.Difficulty difficulty;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionResponse {
        private Long questionId;
        private Long topicId;
        private String questionText;
        private Question.Difficulty difficulty;
        private List<QuestionOptionDto.QuestionOptionResponse> options;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateQuestionOptionRequest {
        private String optionLabel;
        private String optionText;
        private Boolean isCorrect = false;
    }
} 