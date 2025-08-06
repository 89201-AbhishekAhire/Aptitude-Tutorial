package com.sunbeam.service;

import com.sunbeam.entities.QuizSession;
import com.sunbeam.entities.User;
import com.sunbeam.entities.Topic;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface QuizSessionService {
    List<QuizSession> findByUser(User user);
    List<QuizSession> findByUserAndTopic(User user, Topic topic);
    List<QuizSession> findByUserAndMode(User user, QuizSession.QuizMode mode);
    List<QuizSession> findByDateRange(LocalDateTime startDate, LocalDateTime endDate);
    Double getAverageScoreByTopic(Topic topic);
    long countByUserAndTopic(User user, Topic topic);
    QuizSession save(QuizSession session);
    Optional<QuizSession> findById(Long id);
    void deleteById(Long id);
}