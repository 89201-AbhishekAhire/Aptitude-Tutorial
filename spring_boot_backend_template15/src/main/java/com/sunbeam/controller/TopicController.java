package com.sunbeam.controller;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.TopicDto;
import com.sunbeam.entities.Topic;
import com.sunbeam.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/topics")
@CrossOrigin(origins = "*")
public class TopicController {
    
    @Autowired
    private TopicService topicService;
    
    // Get all active topics (for frontend topic selection)
    @GetMapping
    public ResponseEntity<ApiResponse<List<TopicDto.TopicResponse>>> getAllActiveTopics() {
        try {
            List<Topic> topics = topicService.findByIsActive(true);
            
            List<TopicDto.TopicResponse> responses = topics.stream()
                .map(topic -> new TopicDto.TopicResponse(
                    topic.getTopicId(),
                    topic.getTopicName(),
                    topic.getTopicSlug(),
                    topic.getDescription(),
                    topic.getIsActive()
                ))
                .toList();
            
            return ResponseEntity.ok(ApiResponse.success(responses));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to get topics: " + e.getMessage(), "FETCH_ERROR"));
        }
    }
    
    // Get topic by slug (for frontend topic detail pages)
    @GetMapping("/slug/{slug}")
    public ResponseEntity<ApiResponse<TopicDto.TopicResponse>> getTopicBySlug(@PathVariable String slug) {
        try {
            Optional<Topic> topicOpt = topicService.findByTopicSlugAndIsActive(slug, true);
            
            if (topicOpt.isPresent()) {
                Topic topic = topicOpt.get();
                TopicDto.TopicResponse response = new TopicDto.TopicResponse(
                    topic.getTopicId(),
                    topic.getTopicName(),
                    topic.getTopicSlug(),
                    topic.getDescription(),
                    topic.getIsActive()
                );
                
                return ResponseEntity.ok(ApiResponse.success(response));
                
            } else {
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to get topic: " + e.getMessage(), "TOPIC_NOT_FOUND"));
        }
    }
    
    // Get topic by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TopicDto.TopicResponse>> getTopicById(@PathVariable Long id) {
        try {
            Optional<Topic> topicOpt = topicService.findById(id);
            
            if (topicOpt.isPresent()) {
                Topic topic = topicOpt.get();
                TopicDto.TopicResponse response = new TopicDto.TopicResponse(
                    topic.getTopicId(),
                    topic.getTopicName(),
                    topic.getTopicSlug(),
                    topic.getDescription(),
                    topic.getIsActive()
                );
                
                return ResponseEntity.ok(ApiResponse.success(response));
                
            } else {
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to get topic: " + e.getMessage(), "TOPIC_NOT_FOUND"));
        }
    }
    
    // Admin: Create new topic
    @PostMapping
    public ResponseEntity<ApiResponse<TopicDto.TopicResponse>> createTopic(@RequestBody TopicDto.CreateTopicRequest request) {
        try {
            // Check if topic slug already exists
            if (topicService.existsByTopicSlug(request.getTopicSlug())) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Topic with this slug already exists", "SLUG_EXISTS"));
            }
            
            Topic topic = new Topic();
            topic.setTopicName(request.getTopicName());
            topic.setTopicSlug(request.getTopicSlug());
            topic.setDescription(request.getDescription());
            topic.setIsActive(request.getIsActive());
            
            Topic savedTopic = topicService.save(topic);
            
            TopicDto.TopicResponse response = new TopicDto.TopicResponse(
                savedTopic.getTopicId(),
                savedTopic.getTopicName(),
                savedTopic.getTopicSlug(),
                savedTopic.getDescription(),
                savedTopic.getIsActive()
            );
            
            return ResponseEntity.ok(ApiResponse.success("Topic created successfully", response));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to create topic: " + e.getMessage(), "CREATION_ERROR"));
        }
    }
    
    // Admin: Update topic
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TopicDto.TopicResponse>> updateTopic(
            @PathVariable Long id, 
            @RequestBody TopicDto.UpdateTopicRequest request) {
        try {
            Optional<Topic> topicOpt = topicService.findById(id);
            
            if (topicOpt.isPresent()) {
                Topic topic = topicOpt.get();
                
                if (request.getTopicName() != null) {
                    topic.setTopicName(request.getTopicName());
                }
                if (request.getTopicSlug() != null) {
                    topic.setTopicSlug(request.getTopicSlug());
                }
                if (request.getDescription() != null) {
                    topic.setDescription(request.getDescription());
                }
                if (request.getIsActive() != null) {
                    topic.setIsActive(request.getIsActive());
                }
                
                Topic updatedTopic = topicService.save(topic);
                
                TopicDto.TopicResponse response = new TopicDto.TopicResponse(
                    updatedTopic.getTopicId(),
                    updatedTopic.getTopicName(),
                    updatedTopic.getTopicSlug(),
                    updatedTopic.getDescription(),
                    updatedTopic.getIsActive()
                );
                
                return ResponseEntity.ok(ApiResponse.success("Topic updated successfully", response));
                
            } else {
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to update topic: " + e.getMessage(), "UPDATE_ERROR"));
        }
    }
    
    // Admin: Search topics
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<TopicDto.TopicResponse>>> searchTopics(@RequestParam String searchTerm) {
        try {
            List<Topic> topics = topicService.searchTopics(searchTerm);
            
            List<TopicDto.TopicResponse> responses = topics.stream()
                .map(topic -> new TopicDto.TopicResponse(
                    topic.getTopicId(),
                    topic.getTopicName(),
                    topic.getTopicSlug(),
                    topic.getDescription(),
                    topic.getIsActive()
                ))
                .toList();
            
            return ResponseEntity.ok(ApiResponse.success(responses));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to search topics: " + e.getMessage(), "SEARCH_ERROR"));
        }
    }
    
    // Admin: Delete topic
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteTopic(@PathVariable Long id) {
        try {
            Optional<Topic> topicOpt = topicService.findById(id);
            
            if (topicOpt.isPresent()) {
                topicService.deleteById(id);
                return ResponseEntity.ok(ApiResponse.success("Topic deleted successfully", "Topic deleted"));
                
            } else {
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to delete topic: " + e.getMessage(), "DELETE_ERROR"));
        }
    }
} 