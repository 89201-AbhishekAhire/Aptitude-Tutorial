package com.sunbeam.dao;

import com.sunbeam.entities.TopicNote;
import com.sunbeam.entities.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicNoteDao extends JpaRepository<TopicNote, Long> {
    List<TopicNote> findByTopicOrderByDisplayOrderAsc(Topic topic);
} 