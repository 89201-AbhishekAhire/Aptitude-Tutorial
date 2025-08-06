package com.sunbeam.service.impl;

import com.sunbeam.dao.TopicExampleDao;
import com.sunbeam.entities.TopicExample;
import com.sunbeam.entities.Topic;
import com.sunbeam.service.TopicExampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TopicExampleServiceImpl implements TopicExampleService {
    @Autowired
    private TopicExampleDao topicExampleDao;

    @Override
    public List<TopicExample> findByTopicOrderByDisplayOrderAsc(Topic topic) {
        return topicExampleDao.findByTopicOrderByDisplayOrderAsc(topic);
    }

    @Override
    public TopicExample save(TopicExample example) {
        return topicExampleDao.save(example);
    }

    @Override
    public Optional<TopicExample> findById(Long id) {
        return topicExampleDao.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        topicExampleDao.deleteById(id);
    }
}