package com.sunbeam.service.impl;

import com.sunbeam.dao.TopicDao;
import com.sunbeam.entities.Topic;
import com.sunbeam.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TopicServiceImpl implements TopicService {
    @Autowired
    private TopicDao topicDao;

    @Override
    public List<Topic> findByIsActive(Boolean isActive) {
        return topicDao.findByIsActive(isActive);
    }

    @Override
    public Optional<Topic> findByTopicSlug(String topicSlug) {
        return topicDao.findByTopicSlug(topicSlug);
    }

    @Override
    public Optional<Topic> findByTopicSlugAndIsActive(String topicSlug, Boolean isActive) {
        return topicDao.findByTopicSlugAndIsActive(topicSlug, isActive);
    }

    @Override
    public List<Topic> searchTopics(String searchTerm) {
        return topicDao.searchTopics(searchTerm);
    }

    @Override
    public boolean existsByTopicSlug(String topicSlug) {
        return topicDao.existsByTopicSlug(topicSlug);
    }

    @Override
    public Topic save(Topic topic) {
        return topicDao.save(topic);
    }

    @Override
    public Optional<Topic> findById(Long id) {
        return topicDao.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        topicDao.deleteById(id);
    }
}