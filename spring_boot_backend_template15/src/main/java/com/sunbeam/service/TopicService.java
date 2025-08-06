package com.sunbeam.service;

import com.sunbeam.entities.Topic;
import java.util.List;
import java.util.Optional;

public interface TopicService {
    List<Topic> findByIsActive(Boolean isActive);
    Optional<Topic> findByTopicSlug(String topicSlug);
    Optional<Topic> findByTopicSlugAndIsActive(String topicSlug, Boolean isActive);
    List<Topic> searchTopics(String searchTerm);
    boolean existsByTopicSlug(String topicSlug);
    Topic save(Topic topic);
    Optional<Topic> findById(Long id);
    void deleteById(Long id);
}