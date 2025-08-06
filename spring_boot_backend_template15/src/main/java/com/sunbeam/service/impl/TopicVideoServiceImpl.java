package com.sunbeam.service.impl;

import com.sunbeam.dao.TopicVideoDao;
import com.sunbeam.entities.TopicVideo;
import com.sunbeam.entities.Topic;
import com.sunbeam.service.TopicVideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TopicVideoServiceImpl implements TopicVideoService {
    @Autowired
    private TopicVideoDao topicVideoDao;

    @Override
    public List<TopicVideo> findByTopicOrderByDisplayOrderAsc(Topic topic) {
        return topicVideoDao.findByTopicOrderByDisplayOrderAsc(topic);
    }

    @Override
    public TopicVideo save(TopicVideo video) {
        return topicVideoDao.save(video);
    }

    @Override
    public Optional<TopicVideo> findById(Long id) {
        return topicVideoDao.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        topicVideoDao.deleteById(id);
    }
}