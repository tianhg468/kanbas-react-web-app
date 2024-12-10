import axios from "axios";
import { BaseQuestion, NewQuestion } from './QuestionTypeEditor';
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

export const updateQuiz = async (cid: string, qid: string, quiz: any) => {
  try {
    const response = await axios.put(`${COURSES_API}/${cid}/quizzes/${qid}`, quiz);
    return response.data;
  } catch (error) {
    console.error("Error updating quiz:", error);
    throw error;
  }
};

export const publishQuiz = async (cid: string, qid: string, quiz: any) => {
  try {
    const response = await axios.put(`${COURSES_API}/${cid}/quizzes/${qid}`, {
      ...quiz,
      published: true
    });
    return response.data;
  } catch (error) {
    console.error("Error publishing quiz:", error);
    throw error;
  }
};

export const deleteQuiz = async (courseId: string, quizId: string) => {
  const response = await axios.delete(
    `${COURSES_API}/${courseId}/quizzes/${quizId}`
  );
  return response.data;
};

export const startQuizAttempt = async (courseId: string, quizId: string, userId: string) => {
  try {
    if (!courseId || !quizId || !userId) {
      throw new Error("Invalid courseId, quizId, or userId");
    }

    const response = await axios.post(`${COURSES_API}/${courseId}/quizzes/${quizId}/attempts`, { userId });
    return response.data.id;
  } catch (error: any) {
    console.error("Error starting quiz attempt:", error);
    if (error.message === "Invalid courseId, quizId, or userId") {
      throw new Error("Invalid courseId, quizId, or userId");
    } else {
      throw error;
    }
  }
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
  try {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes/${quizId}/attempts`, { params: { userId } });
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz attempts:", error);
    throw error;
  }
};

export async function saveQuestion(cid: string, qid: string, question: BaseQuestion): Promise<void> {
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

export const deleteQuestion = async (cid: string, qid: string, questionId: string): Promise<void> => {
  try {
    await axios.delete(`${COURSES_API}/${cid}/quizzes/${qid}/questions/${questionId}`);
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};

export const createQuestion = async (cid: string, qid: string, question: BaseQuestion): Promise<void> => {
  try {
    const response = await axios.post(`${COURSES_API}/${cid}/quizzes/${qid}/details/questions`, question);
    console.log("Question created successfully:", response.data);
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
};

export const fetchQuestionsForQuiz = async (courseId: string, quizId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/Quizzes/${quizId}/details/questions`);
  return response.data;
}

export const updateQuestion = async (
  cid: string, 
  qid: string, 
  questionId: string, 
  question: NewQuestion
): Promise<void> => {
  try {
    await axios.put(
      `${COURSES_API}/${cid}/quizzes/${qid}/details/questions/${questionId}`,
      question
    );
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

// export const fetchQuiz = async (cid: string, qid: string) => {
//   try {
//     const response = await axios.get(`${COURSES_API}/${cid}/quizzes/${qid}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching quiz:", error);
//     throw error;
//   }
// };
export const fetchQuiz = async (cid: string, qid: string) => {
  try {
    const response = await axios.get(`${COURSES_API}/${cid}/quizzes/${qid}`);
    const quiz = response.data;
    
    const questions = await fetchQuestionsForQuiz(cid, qid);
    
    const totalPoints = questions.reduce((sum: number, question: any) => {
      return sum + (question.points || 0);
    }, 0);
    
    return {
      ...quiz,
      points: totalPoints
    };
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw error;
  }
};

export const saveQuizAttempt = async (
  courseId: string,
  quizId: string,
  userId: string,
  answers: { selectedAnswer: string | null; points: number; correct: boolean }[]
) => {
  try {
    // First, create a new attempt on the server
    console.log("Creating attempt with params:", { courseId, quizId, userId });
    const response = await axios.post(
      `${COURSES_API}/${courseId}/quizzes/${quizId}/attempts`,
      {
        courseId, 
        quizId,   
        userId,
        startTime: new Date()
      }
    );
    console.log("Create attempt response:", response.data);
    const attemptId = response.data._id;

    // Then, save the answers for the new attempt
    await axios.post(
      `${COURSES_API}/${courseId}/quizzes/${quizId}/attempts/${attemptId}/submit`,
      { answers }
    );
   

    return { attemptId, data: response.data };
  } catch (error) {
    console.error("Error saving quiz attempt:", error);
    throw error;
  }
};






