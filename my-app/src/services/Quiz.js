import { QuizService } from './api.js';

export const fetchQuizData = async (topicSlug = 'java-programming', limit = 10, difficulty = null) => {
  try {
    const response = await QuizService.getQuizQuestions(topicSlug, limit, difficulty);
    return response;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    throw error;
  }
};
