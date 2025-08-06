package com.sunbeam.service;

import com.sunbeam.entities.QuestionOption;
import com.sunbeam.entities.Question;
import java.util.List;
import java.util.Optional;

public interface QuestionOptionService {
    List<QuestionOption> findByQuestion(Question question);
    List<QuestionOption> findByQuestionOrderByOptionLabelAsc(Question question);
    QuestionOption save(QuestionOption option);
    Optional<QuestionOption> findById(Long id);
    void deleteById(Long id);
}