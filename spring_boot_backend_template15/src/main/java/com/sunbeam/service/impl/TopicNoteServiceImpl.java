package com.sunbeam.service.impl;

import com.sunbeam.dao.TopicNoteDao;
import com.sunbeam.entities.TopicNote;
import com.sunbeam.entities.Topic;
import com.sunbeam.service.TopicNoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TopicNoteServiceImpl implements TopicNoteService {
    @Autowired
    private TopicNoteDao topicNoteDao;

    @Override
    public List<TopicNote> findByTopicOrderByDisplayOrderAsc(Topic topic) {
        return topicNoteDao.findByTopicOrderByDisplayOrderAsc(topic);
    }

    @Override
    public TopicNote save(TopicNote note) {
        return topicNoteDao.save(note);
    }

    @Override
    public Optional<TopicNote> findById(Long id) {
        return topicNoteDao.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        topicNoteDao.deleteById(id);
    }
}