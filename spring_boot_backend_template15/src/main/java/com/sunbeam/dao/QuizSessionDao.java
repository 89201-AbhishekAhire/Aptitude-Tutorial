package com.sunbeam.dao;

import com.sunbeam.entities.QuizSession;
import com.sunbeam.entities.User;
import com.sunbeam.entities.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface QuizSessionDao extends JpaRepository<QuizSession, Long> {
    
    // Frontend quiz session tracking
    List<QuizSession> findByUser(User user);
    
    List<QuizSession> findByUserAndTopic(User user, Topic topic);
    
    List<QuizSession> findByUserAndMode(User user, QuizSession.QuizMode mode);
    
    // Admin operations for analytics
    @Query("SELECT qs FROM QuizSession qs WHERE qs.startTime BETWEEN :startDate AND :endDate")
    List<QuizSession> findByDateRange(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT AVG(qs.score) FROM QuizSession qs WHERE qs.topic = :topic")
    Double getAverageScoreByTopic(@Param("topic") Topic topic);
    
    @Query("SELECT COUNT(qs) FROM QuizSession qs WHERE qs.user = :user AND qs.topic = :topic")
    long countByUserAndTopic(@Param("user") User user, @Param("topic") Topic topic);
} 