import { createSlice } from "@reduxjs/toolkit";

interface Question {
  _id: string;
  quizId: string;
  title: string;
  points: number;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";
  question: string;
  correctAnswer: string | boolean | string[];
  choices?: string[];
  order: number;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  course: string;
  type: "GRADED_QUIZ" | "PRACTICE_QUIZ" | "GRADED_SURVEY" | "UNGRADED_SURVEY";
  points: number;
  assignmentGroup: "QUIZZES" | "EXAMS" | "ASSIGNMENTS" | "PROJECT";
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  maxAttempts: number;
  showCorrectAnswers: boolean;
  accessCode: string;
  oneQuestionAtTime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  published: boolean;
  questions: Question[];
}

interface QuizAttempt {
  _id: string;
  quizId: string;
  userId: string;
  startTime: string;
  endTime?: string;
  score: number;
  answers: {
    questionId: string;
    answer: string | boolean | string[];
    correct: boolean;
  }[];
  completed: boolean;
}

interface QuizzesState {
  quizzes: Quiz[];
  currentAttempt: QuizAttempt | null;
  attempts: QuizAttempt[];
  loading: boolean;
  error: string | null;
}

const initialState: QuizzesState = {
  quizzes: [],
  currentAttempt: null,
  attempts: [],
  loading: false,
  error: null
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, { payload: quizzes }: { payload: Quiz[] }) => {
      state.quizzes = quizzes;
      state.loading = false;
      state.error = null;
    },
    addQuiz: (state, { payload: quiz }: { payload: Quiz }) => {
      state.quizzes.push(quiz);
    },
    deleteQuiz: (state, { payload: quizId }: { payload: string }) => {
      state.quizzes = state.quizzes.filter(q => q._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }: { payload: Quiz }) => {
      state.quizzes = state.quizzes.map(q => 
        q._id === quiz._id ? quiz : q
      );
    },
    setCurrentAttempt: (state, { payload: attempt }: { payload: QuizAttempt | null }) => {
      state.currentAttempt = attempt;
    },
    setAttempts: (state, { payload: attempts }: { payload: QuizAttempt[] }) => {
      state.attempts = attempts;
    },
    setLoading: (state, { payload: loading }: { payload: boolean }) => {
      state.loading = loading;
    },
    setError: (state, { payload: error }: { payload: string | null }) => {
      state.error = error;
      state.loading = false;
    },
    addQuestion: (state, { payload: { quizId, question } }: { payload: { quizId: string; question: Question } }) => {
      const quiz = state.quizzes.find(q => q._id === quizId);
      if (quiz) {
        quiz.questions.push(question);
      }
    },
    updateQuestion: (state, { payload: { quizId, questionId, question } }: 
      { payload: { quizId: string; questionId: string; question: Question } }) => {
      const quiz = state.quizzes.find(q => q._id === quizId);
      if (quiz) {
        quiz.questions = quiz.questions.map(q =>
          q._id === questionId ? question : q
        );
      }
    },
    deleteQuestion: (state, { payload: { quizId, questionId } }: 
      { payload: { quizId: string; questionId: string } }) => {
      const quiz = state.quizzes.find(q => q._id === quizId);
      if (quiz) {
        quiz.questions = quiz.questions.filter(q => q._id !== questionId);
      }
    }
  },
});

export const {
  setQuizzes,
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setCurrentAttempt,
  setAttempts,
  setLoading,
  setError,
  addQuestion,
  updateQuestion,
  deleteQuestion
} = quizzesSlice.actions;

export type { Quiz, Question, QuizAttempt, QuizzesState };
export default quizzesSlice.reducer;