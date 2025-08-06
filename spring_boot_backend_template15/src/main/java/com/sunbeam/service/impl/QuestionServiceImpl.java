package com.sunbeam.service.impl;

import com.sunbeam.dao.QuestionDao;
import com.sunbeam.entities.Question;
import com.sunbeam.entities.Topic;
import com.sunbeam.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    private QuestionDao questionDao;

    @Override
    public List<Question> findByTopic(Topic topic) {
        return questionDao.findByTopic(topic);
    }

    @Override
    public List<Question> findByTopicAndDifficulty(Topic topic, Question.Difficulty difficulty) {
        return questionDao.findByTopicAndDifficulty(topic, difficulty);
    }

    @Override
    public List<Question> findRandomQuestionsByTopic(Topic topic, int limit) {
        return questionDao.findRandomQuestionsByTopic(topic, limit);
    }

    @Override
    public List<Question> findRandomQuestionsByTopicAndDifficulty(Topic topic, Question.Difficulty difficulty, int limit) {
        return questionDao.findRandomQuestionsByTopicAndDifficulty(topic, difficulty, limit);
    }

    @Override
    public List<Question> searchQuestions(String searchTerm) {
        return questionDao.searchQuestions(searchTerm);
    }

    @Override
    public long countByTopic(Topic topic) {
        return questionDao.countByTopic(topic);
    }

    @Override
    public Question save(Question question) {
        return questionDao.save(question);
    }

    @Override
    public Optional<Question> findById(Long id) {
        return questionDao.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        questionDao.deleteById(id);
    }
}