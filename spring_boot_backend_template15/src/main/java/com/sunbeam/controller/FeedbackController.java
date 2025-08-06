package com.sunbeam.controller;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.FeedbackDto;
import com.sunbeam.entities.Feedback;
import com.sunbeam.entities.User;
import com.sunbeam.service.FeedbackService;
import com.sunbeam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "*")
public class FeedbackController {
    
    @Autowired
    private FeedbackService feedbackService;
    
    @Autowired
    private UserService userService;
    
    // Submit feedback (for frontend users)
    @PostMapping("/submit")
    public ResponseEntity<ApiResponse<FeedbackDto.FeedbackResponse>> submitFeedback(
            @RequestBody FeedbackDto.CreateFeedbackRequest request) {
        try {
            Optional<User> userOpt = userService.findById(request.getUserId());
            
            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Invalid user", "INVALID_USER"));
            }
            
            Feedback feedback = new Feedback();
            feedback.setUser(userOpt.get());
            feedback.setMessage(request.getMessage());
            feedback.setStatus(Feedback.FeedbackStatus.PENDING);
            
            Feedback savedFeedback = feedbackService.save(feedback);
            
            FeedbackDto.FeedbackResponse response = new FeedbackDto.FeedbackResponse(
                savedFeedback.getFeedbackId(),
                savedFeedback.getUser().getUserId(),
                savedFeedback.getUser().getName(),
                savedFeedback.getMessage(),
                savedFeedback.getStatus(),
                savedFeedback.getCreatedAt()
            );
            
            return ResponseEntity.ok(ApiResponse.success("Feedback submitted successfully", response));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to submit feedback: " + e.getMessage(), "SUBMISSION_ERROR"));
        }
    }
    
    // Get user's feedback history
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<FeedbackDto.FeedbackResponse>>> getUserFeedback(@PathVariable Long userId) {
        try {
            Optional<User> userOpt = userService.findById(userId);
            
            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("User not found", "USER_NOT_FOUND"));
            }
            
            List<Feedback> feedbacks = feedbackService.findByUser(userOpt.get());
            
            List<FeedbackDto.FeedbackResponse> responses = feedbacks.stream()
                .map(feedback -> new FeedbackDto.FeedbackResponse(
                    feedback.getFeedbackId(),
                    feedback.getUser().getUserId(),
                    feedback.getUser().getName(),
                    feedback.getMessage(),
                    feedback.getStatus(),
                    feedback.getCreatedAt()
                ))
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(ApiResponse.success(responses));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to get user feedback: " + e.getMessage(), "FETCH_ERROR"));
        }
    }
    
    // Admin: Get all feedback by status
    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<List<FeedbackDto.FeedbackResponse>>> getFeedbackByStatus(
            @PathVariable String status) {
        try {
            Feedback.FeedbackStatus feedbackStatus;
            try {
                feedbackStatus = Feedback.FeedbackStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Invalid status. Valid values are: PENDING, REVIEWED", "INVALID_STATUS"));
            }
            
            List<Feedback> feedbacks = feedbackService.findByStatus(feedbackStatus);
            
            List<FeedbackDto.FeedbackResponse> responses = feedbacks.stream()
                .map(feedback -> {
                    // Handle potential lazy loading issues
                    String userName = feedback.getUser() != null ? feedback.getUser().getName() : "Unknown User";
                    Long userId = feedback.getUser() != null ? feedback.getUser().getUserId() : null;
                    
                    return new FeedbackDto.FeedbackResponse(
                        feedback.getFeedbackId(),
                        userId,
                        userName,
                        feedback.getMessage(),
                        feedback.getStatus(),
                        feedback.getCreatedAt()
                    );
                })
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(ApiResponse.success(responses));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to get feedback: " + e.getMessage(), "FETCH_ERROR"));
        }
    }
    
    // Admin: Get pending feedback
    @GetMapping("/pending")
    public ResponseEntity<ApiResponse<List<FeedbackDto.FeedbackResponse>>> getPendingFeedback() {
        try {
            List<Feedback> feedbacks = feedbackService.findByStatus(Feedback.FeedbackStatus.PENDING);
            
            List<FeedbackDto.FeedbackResponse> responses = feedbacks.stream()
                .map(feedback -> {
                    // Handle potential lazy loading issues
                    String userName = feedback.getUser() != null ? feedback.getUser().getName() : "Unknown User";
                    Long userId = feedback.getUser() != null ? feedback.getUser().getUserId() : null;
                    
                    return new FeedbackDto.FeedbackResponse(
                        feedback.getFeedbackId(),
                        userId,
                        userName,
                        feedback.getMessage(),
                        feedback.getStatus(),
                        feedback.getCreatedAt()
                    );
                })
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(ApiResponse.success(responses));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to get pending feedback: " + e.getMessage(), "FETCH_ERROR"));
        }
    }
    
    // Admin: Update feedback status
    @PutMapping("/{feedbackId}/status")
    public ResponseEntity<ApiResponse<FeedbackDto.FeedbackResponse>> updateFeedbackStatus(
            @PathVariable Long feedbackId,
            @RequestBody FeedbackDto.UpdateFeedbackRequest request) {
        try {
            if (request.getStatus() == null) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Status is required. Valid values are: PENDING, REVIEWED", "MISSING_STATUS"));
            }
            
            Optional<Feedback> feedbackOpt = feedbackService.findByIdWithUser(feedbackId);
            
            if (feedbackOpt.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Feedback not found", "FEEDBACK_NOT_FOUND"));
            }
            
            Feedback feedback = feedbackOpt.get();
            feedback.setStatus(request.getStatus());
            
            Feedback updatedFeedback = feedbackService.save(feedback);
            
            // Handle potential lazy loading issues
            String userName = updatedFeedback.getUser() != null ? updatedFeedback.getUser().getName() : "Unknown User";
            Long userId = updatedFeedback.getUser() != null ? updatedFeedback.getUser().getUserId() : null;
            
            FeedbackDto.FeedbackResponse response = new FeedbackDto.FeedbackResponse(
                updatedFeedback.getFeedbackId(),
                userId,
                userName,
                updatedFeedback.getMessage(),
                updatedFeedback.getStatus(),
                updatedFeedback.getCreatedAt()
            );
            
            return ResponseEntity.ok(ApiResponse.success("Feedback status updated successfully", response));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to update feedback status: " + e.getMessage(), "UPDATE_ERROR"));
        }
    }
    
    // Admin: Get feedback statistics
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Object>> getFeedbackStats() {
        try {
            long pendingCount = feedbackService.countByStatus(Feedback.FeedbackStatus.PENDING);
            long reviewedCount = feedbackService.countByStatus(Feedback.FeedbackStatus.REVIEWED);
            
            var stats = new Object() {
                public final long pending = pendingCount;
                public final long reviewed = reviewedCount;
                public final long total = pendingCount + reviewedCount;
            };
            
            return ResponseEntity.ok(ApiResponse.success(stats));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to get feedback stats: " + e.getMessage(), "STATS_ERROR"));
        }
    }
    
    // Get feedback by ID
    @GetMapping("/{feedbackId}")
    public ResponseEntity<ApiResponse<FeedbackDto.FeedbackResponse>> getFeedbackById(@PathVariable Long feedbackId) {
        try {
            Optional<Feedback> feedbackOpt = feedbackService.findByIdWithUser(feedbackId);
            
            if (feedbackOpt.isPresent()) {
                Feedback feedback = feedbackOpt.get();
                
                // Handle potential lazy loading issues
                String userName = feedback.getUser() != null ? feedback.getUser().getName() : "Unknown User";
                Long userId = feedback.getUser() != null ? feedback.getUser().getUserId() : null;
                
                FeedbackDto.FeedbackResponse response = new FeedbackDto.FeedbackResponse(
                    feedback.getFeedbackId(),
                    userId,
                    userName,
                    feedback.getMessage(),
                    feedback.getStatus(),
                    feedback.getCreatedAt()
                );
                
                return ResponseEntity.ok(ApiResponse.success(response));
                
            } else {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Feedback not found", "FEEDBACK_NOT_FOUND"));
            }
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to get feedback: " + e.getMessage(), "FETCH_ERROR"));
        }
    }
} 