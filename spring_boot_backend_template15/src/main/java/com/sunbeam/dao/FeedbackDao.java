package com.sunbeam.dao;

import com.sunbeam.entities.Feedback;
import com.sunbeam.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface FeedbackDao extends JpaRepository<Feedback, Long> {
    
    // Frontend feedback operations with JOIN FETCH to avoid lazy loading issues
    @Query("SELECT f FROM Feedback f JOIN FETCH f.user WHERE f.user = :user ORDER BY f.createdAt DESC")
    List<Feedback> findByUser(@Param("user") User user);
    
    @Query("SELECT f FROM Feedback f JOIN FETCH f.user WHERE f.status = :status ORDER BY f.createdAt DESC")
    List<Feedback> findByStatus(@Param("status") Feedback.FeedbackStatus status);
    
    // Admin operations for feedback management
    @Query("SELECT f FROM Feedback f JOIN FETCH f.user WHERE f.createdAt BETWEEN :startDate AND :endDate ORDER BY f.createdAt DESC")
    List<Feedback> findByDateRange(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT f FROM Feedback f JOIN FETCH f.user WHERE f.status = :status ORDER BY f.createdAt DESC")
    List<Feedback> findPendingFeedback(@Param("status") Feedback.FeedbackStatus status);
    
    long countByStatus(Feedback.FeedbackStatus status);
    
    // Override findById to include JOIN FETCH
    @Query("SELECT f FROM Feedback f JOIN FETCH f.user WHERE f.feedbackId = :id")
    Optional<Feedback> findByIdWithUser(@Param("id") Long id);
} 