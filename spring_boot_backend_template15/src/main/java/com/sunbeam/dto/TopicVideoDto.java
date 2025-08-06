package com.sunbeam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class TopicVideoDto {
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateTopicVideoRequest {
        private Long topicId;
        private String videoUrl;
        private Integer displayOrder = 0;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateTopicVideoRequest {
        private String videoUrl;
        private Integer displayOrder;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TopicVideoResponse {
        private Long videoId;
        private Long topicId;
        private String videoUrl;
        private Integer displayOrder;
    }
} 