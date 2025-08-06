package com.sunbeam.service;

import com.sunbeam.entities.Question;
import com.sunbeam.entities.Topic;
import java.util.List;
import java.util.Optional;

public interface QuestionService {
    List<Question> findByTopic(Topic topic);
    List<Question> findByTopicAndDifficulty(Topic topic, Question.Difficulty difficulty);
    List<Question> findRandomQuestionsByTopic(Topic topic, int limit);
    List<Question> findRandomQuestionsByTopicAndDifficulty(Topic topic, Question.Difficulty difficulty, int limit);
    List<Question> searchQuestions(String searchTerm);
    long countByTopic(Topic topic);
    Question save(Question question);
    Optional<Question> findById(Long id);
    void deleteById(Long id);
}