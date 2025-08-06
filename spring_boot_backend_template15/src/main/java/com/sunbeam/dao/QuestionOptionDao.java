package com.sunbeam.dao;

import com.sunbeam.entities.QuestionOption;
import com.sunbeam.entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionOptionDao extends JpaRepository<QuestionOption, Long> {
    List<QuestionOption> findByQuestion(Question question);
    
    List<QuestionOption> findByQuestionOrderByOptionLabelAsc(Question question);
} 