package com.sunbeam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class TopicNoteDto {
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateTopicNoteRequest {
        private Long topicId;
        private String noteContent;
        private Integer displayOrder = 0;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateTopicNoteRequest {
        private String noteContent;
        private Integer displayOrder;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TopicNoteResponse {
        private Long noteId;
        private Long topicId;
        private String noteContent;
        private Integer displayOrder;
    }
} 