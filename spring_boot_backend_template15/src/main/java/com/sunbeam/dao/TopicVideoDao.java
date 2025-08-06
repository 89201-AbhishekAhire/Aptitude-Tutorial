package com.sunbeam.dao;

import com.sunbeam.entities.TopicVideo;
import com.sunbeam.entities.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicVideoDao extends JpaRepository<TopicVideo, Long> {
    List<TopicVideo> findByTopicOrderByDisplayOrderAsc(Topic topic);
} 