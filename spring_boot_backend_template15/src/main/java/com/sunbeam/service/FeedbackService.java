package com.sunbeam.service;

import com.sunbeam.entities.Feedback;
import com.sunbeam.entities.User;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface FeedbackService {
    List<Feedback> findByUser(User user);
    List<Feedback> findByStatus(Feedback.FeedbackStatus status);
    List<Feedback> findByDateRange(LocalDateTime startDate, LocalDateTime endDate);
    List<Feedback> findPendingFeedback(Feedback.FeedbackStatus status);
    long countByStatus(Feedback.FeedbackStatus status);
    Feedback save(Feedback feedback);
    Optional<Feedback> findById(Long id);
    Optional<Feedback> findByIdWithUser(Long id);
    void deleteById(Long id);
}