package com.sunbeam.dao;

import com.sunbeam.entities.TopicExample;
import com.sunbeam.entities.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicExampleDao extends JpaRepository<TopicExample, Long> {
    List<TopicExample> findByTopicOrderByDisplayOrderAsc(Topic topic);
} 