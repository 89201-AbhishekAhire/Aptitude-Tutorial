package com.sunbeam.service.impl;

import com.sunbeam.dao.FeedbackDao;
import com.sunbeam.entities.Feedback;
import com.sunbeam.entities.User;
import com.sunbeam.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FeedbackServiceImpl implements FeedbackService {
    @Autowired
    private FeedbackDao feedbackDao;

    @Override
    public List<Feedback> findByUser(User user) {
        return feedbackDao.findByUser(user);
    }

    @Override
    public List<Feedback> findByStatus(Feedback.FeedbackStatus status) {
        return feedbackDao.findByStatus(status);
    }

    @Override
    public List<Feedback> findByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return feedbackDao.findByDateRange(startDate, endDate);
    }

    @Override
    public List<Feedback> findPendingFeedback(Feedback.FeedbackStatus status) {
        return feedbackDao.findPendingFeedback(status);
    }

    @Override
    public long countByStatus(Feedback.FeedbackStatus status) {
        return feedbackDao.countByStatus(status);
    }

    @Override
    public Feedback save(Feedback feedback) {
        return feedbackDao.save(feedback);
    }

    @Override
    public Optional<Feedback> findById(Long id) {
        return feedbackDao.findById(id);
    }

    @Override
    public Optional<Feedback> findByIdWithUser(Long id) {
        return feedbackDao.findByIdWithUser(id);
    }

    @Override
    public void deleteById(Long id) {
        feedbackDao.deleteById(id);
    }
}