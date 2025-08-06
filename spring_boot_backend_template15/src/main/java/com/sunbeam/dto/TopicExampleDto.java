package com.sunbeam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class TopicExampleDto {
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateTopicExampleRequest {
        private Long topicId;
        private String exampleText;
        private Integer displayOrder = 0;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateTopicExampleRequest {
        private String exampleText;
        private Integer displayOrder;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TopicExampleResponse {
        private Long exampleId;
        private Long topicId;
        private String exampleText;
        private Integer displayOrder;
    }
} 