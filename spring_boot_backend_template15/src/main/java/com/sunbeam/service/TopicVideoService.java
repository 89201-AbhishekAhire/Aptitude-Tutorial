package com.sunbeam.service;

import com.sunbeam.entities.TopicVideo;
import com.sunbeam.entities.Topic;
import java.util.List;
import java.util.Optional;

public interface TopicVideoService {
    List<TopicVideo> findByTopicOrderByDisplayOrderAsc(Topic topic);
    TopicVideo save(TopicVideo video);
    Optional<TopicVideo> findById(Long id);
    void deleteById(Long id);
}