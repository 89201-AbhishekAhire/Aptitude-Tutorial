package com.sunbeam.dao;

import com.sunbeam.entities.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TopicDao extends JpaRepository<Topic, Long> {
    
    // Frontend topic listing and details
    List<Topic> findByIsActive(Boolean isActive);
    
    Optional<Topic> findByTopicSlug(String topicSlug);
    
    Optional<Topic> findByTopicSlugAndIsActive(String topicSlug, Boolean isActive);
    
    // Admin operations for topic management
    @Query("SELECT t FROM Topic t WHERE t.topicName LIKE %:searchTerm% OR t.description LIKE %:searchTerm%")
    List<Topic> searchTopics(@Param("searchTerm") String searchTerm);
    
    boolean existsByTopicSlug(String topicSlug);
} 