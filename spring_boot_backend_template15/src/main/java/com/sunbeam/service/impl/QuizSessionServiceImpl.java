package com.sunbeam.service.impl;

import com.sunbeam.dao.QuizSessionDao;
import com.sunbeam.entities.QuizSession;
import com.sunbeam.entities.User;
import com.sunbeam.entities.Topic;
import com.sunbeam.service.QuizSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class QuizSessionServiceImpl implements QuizSessionService {
    @Autowired
    private QuizSessionDao quizSessionDao;

    @Override
    public List<QuizSession> findByUser(User user) {
        return quizSessionDao.findByUser(user);
    }

    @Override
    public List<QuizSession> findByUserAndTopic(User user, Topic topic) {
        return quizSessionDao.findByUserAndTopic(user, topic);
    }

    @Override
    public List<QuizSession> findByUserAndMode(User user, QuizSession.QuizMode mode) {
        return quizSessionDao.findByUserAndMode(user, mode);
    }

    @Override
    public List<QuizSession> findByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return quizSessionDao.findByDateRange(startDate, endDate);
    }

    @Override
    public Double getAverageScoreByTopic(Topic topic) {
        return quizSessionDao.getAverageScoreByTopic(topic);
    }

    @Override
    public long countByUserAndTopic(User user, Topic topic) {
        return quizSessionDao.countByUserAndTopic(user, topic);
    }

    @Override
    public QuizSession save(QuizSession session) {
        return quizSessionDao.save(session);
    }

    @Override
    public Optional<QuizSession> findById(Long id) {
        return quizSessionDao.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        quizSessionDao.deleteById(id);
    }
}