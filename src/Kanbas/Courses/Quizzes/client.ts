import axios from "axios";
import { Question } from './QuestionsEditor';
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;


export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const findQuizById = async (courseId: string, quizId: string) => {
  const response = await axios.get(
    `${COURSES_API}/${courseId}/quizzes/${quizId}`
  );
  return response.data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};

export const updateQuiz = async (courseId: string, quizId: string, quiz: any) => {
  const response = await axios.put(
    `${COURSES_API}/${courseId}/quizzes/${quizId}`,
    quiz
  );
  return response.data;
};

export const deleteQuiz = async (courseId: string, quizId: string) => {
  const response = await axios.delete(
    `${COURSES_API}/${courseId}/quizzes/${quizId}`
  );
  return response.data;
};

export const startQuizAttempt = async (courseId: string, quizId: string, userId: string) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/attempts`,
    { userId }
  );
  return response.data;
};

export const submitQuizAttempt = async (
  courseId: string, 
  quizId: string, 
  attemptId: string,
  answers: any[]
) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/attempts/${attemptId}/submit`,
    { answers }
  );
  return response.data;
};

export const getQuizAttempts = async (courseId: string, quizId: string, userId: string) => {
  const response = await axios.get(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/attempts`,
    { params: { userId } }
  );
  return response.data;
};

export async function saveQuestion(cid: string, qid: string, question: Question): Promise<void> {
  try {
    const response = await fetch(`/api/courses/${cid}/quizzes/${qid}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
  } catch (error) {
    console.error("Error saving question:", error);
    throw error;
  }
}
export async function deleteQuestion(cid: string, qid: string, questionId: number): Promise<void> {
  try {
    const response = await fetch(
      `/api/courses/${cid}/quizzes/${qid}/questions/${questionId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
}

export async function createQuestion(cid: string, qid: string, question: Question): Promise<void> {
  try {
    const response = await fetch(`/api/courses/${cid}/quizzes/${qid}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
}