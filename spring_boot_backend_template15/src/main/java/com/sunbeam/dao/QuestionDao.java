package com.sunbeam.dao;

import com.sunbeam.entities.Question;
import com.sunbeam.entities.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionDao extends JpaRepository<Question, Long> {
    
    // Frontend quiz operations
    List<Question> findByTopic(Topic topic);
    
    List<Question> findByTopicAndDifficulty(Topic topic, Question.Difficulty difficulty);
    
    @Query("SELECT q FROM Question q WHERE q.topic = :topic ORDER BY RAND() LIMIT :limit")
    List<Question> findRandomQuestionsByTopic(@Param("topic") Topic topic, @Param("limit") int limit);
    
    @Query("SELECT q FROM Question q WHERE q.topic = :topic AND q.difficulty = :difficulty ORDER BY RAND() LIMIT :limit")
    List<Question> findRandomQuestionsByTopicAndDifficulty(
        @Param("topic") Topic topic, 
        @Param("difficulty") Question.Difficulty difficulty, 
        @Param("limit") int limit
    );
    
    // Admin operations for question management
    @Query("SELECT q FROM Question q WHERE q.questionText LIKE %:searchTerm%")
    List<Question> searchQuestions(@Param("searchTerm") String searchTerm);
    
    long countByTopic(Topic topic);
} 