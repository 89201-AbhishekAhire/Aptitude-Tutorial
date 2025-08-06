package com.sunbeam.service;

import com.sunbeam.entities.TopicNote;
import com.sunbeam.entities.Topic;
import java.util.List;
import java.util.Optional;

public interface TopicNoteService {
    List<TopicNote> findByTopicOrderByDisplayOrderAsc(Topic topic);
    TopicNote save(TopicNote note);
    Optional<TopicNote> findById(Long id);
    void deleteById(Long id);
}