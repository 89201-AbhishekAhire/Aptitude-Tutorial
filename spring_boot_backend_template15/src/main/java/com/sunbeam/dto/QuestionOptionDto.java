package com.sunbeam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class QuestionOptionDto {
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateQuestionOptionRequest {
        private Long questionId;
        private String optionLabel;
        private String optionText;
        private Boolean isCorrect = false;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateQuestionOptionRequest {
        private String optionLabel;
        private String optionText;
        private Boolean isCorrect;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionOptionResponse {
        private Long optionId;
        private Long questionId;
        private String optionLabel;
        private String optionText;
        private Boolean isCorrect;
    }
} 