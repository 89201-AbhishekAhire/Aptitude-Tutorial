package com.sunbeam.service;

import com.sunbeam.entities.TopicExample;
import com.sunbeam.entities.Topic;
import java.util.List;
import java.util.Optional;

public interface TopicExampleService {
    List<TopicExample> findByTopicOrderByDisplayOrderAsc(Topic topic);
    TopicExample save(TopicExample example);
    Optional<TopicExample> findById(Long id);
    void deleteById(Long id);
}