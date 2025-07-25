//import { config } from '../config';
import axios from "axios";
export const fetchQuizData = async () => {
  try {
  
  const response = await axios.get('/Quiz.json');
   return response.data
    
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    throw error;
  }
};
