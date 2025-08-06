package com.sunbeam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class TopicDto {
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateTopicRequest {
        private String topicName;
        private String topicSlug;
        private String description;
        private Boolean isActive = true;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateTopicRequest {
        private String topicName;
        private String topicSlug;
        private String description;
        private Boolean isActive;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TopicResponse {
        private Long topicId;
        private String topicName;
        private String topicSlug;
        private String description;
        private Boolean isActive;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TopicDetailResponse {
        private Long topicId;
        private String topicName;
        private String topicSlug;
        private String description;
        private Boolean isActive;
        private List<TopicVideoDto.TopicVideoResponse> videos;
        private List<TopicNoteDto.TopicNoteResponse> notes;
        private List<TopicExampleDto.TopicExampleResponse> examples;
    }
} 