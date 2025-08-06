package com.sunbeam.service.impl;

import com.sunbeam.dao.QuestionOptionDao;
import com.sunbeam.entities.QuestionOption;
import com.sunbeam.entities.Question;
import com.sunbeam.service.QuestionOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionOptionServiceImpl implements QuestionOptionService {
    @Autowired
    private QuestionOptionDao questionOptionDao;

    @Override
    public List<QuestionOption> findByQuestion(Question question) {
        return questionOptionDao.findByQuestion(question);
    }

    @Override
    public List<QuestionOption> findByQuestionOrderByOptionLabelAsc(Question question) {
        return questionOptionDao.findByQuestionOrderByOptionLabelAsc(question);
    }

    @Override
    public QuestionOption save(QuestionOption option) {
        return questionOptionDao.save(option);
    }

    @Override
    public Optional<QuestionOption> findById(Long id) {
        return questionOptionDao.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        questionOptionDao.deleteById(id);
    }
}