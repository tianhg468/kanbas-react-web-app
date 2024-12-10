import { useNavigate, useParams } from "react-router-dom";
import * as client from "./client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FacultyRoute from "../../Account/FacultyRoute";
import StudentRoute from "../../Account/StudentRoute";

type Question = {
  _id: string;
  type: "True/False" | "Multiple Choice" | "Fill in the Blank";
  text: string;
  points: number;
  options?: string[];
  correctAnswer?: string;
  selectedAnswer?: string;
};

type Quiz = {
  _id: string;
  title: string;
  description: string;
  points: number;
};

export default function QuizPreview() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [attemptId, setAttemptId] = useState<string | null>(null);

  useEffect(() => {
    const loadQuizAndQuestions = async () => {
      if (!cid || !qid) {
        console.error("Course ID or Quiz ID is missing");
        return;
      }

      try {
        const quizData = await client.fetchQuiz(cid, qid);
        const questionsData = await client.fetchQuestionsForQuiz(cid, qid);
        setQuiz(quizData);
        setQuestions(questionsData);
      } catch (error) {
        console.error("Error fetching quiz and questions:", error);
      }
    };

    loadQuizAndQuestions();
  }, [cid, qid, currentUser._id]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setQuestions(
      questions.map((q) =>
        q._id === questionId ? { ...q, selectedAnswer: answer } : q
      )
    );
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const generateMongoLikeId = () => {
    return (
      ((Date.now() / 1000) | 0).toString(16) +
      "xxxxxxxxxxxxxxxx".replace(/[x]/g, () =>
        ((Math.random() * 16) | 0).toString(16)
      )
    );
  };

  const handleSubmit = async () => {
    let score = 0;
    const attemptId = generateMongoLikeId();
    const answersToSubmit = questions.map((q) => {
      const possibleCorrectAnswers = q.correctAnswer
        ? q.correctAnswer.split("|").map((answer) => answer.trim())
        : [];

      const isCorrect = possibleCorrectAnswers.includes(
        q.selectedAnswer?.trim() || ""
      );

      return {
        _id: generateMongoLikeId(),
        selectedAnswer: q.selectedAnswer || null,
        points: q.points,
        correct: isCorrect,
      };
    });
    if (!cid || !qid) {
      console.error("Course ID or Quiz ID is missing");
      return;
    }

    try {
      console.log("Submit answers: ", answersToSubmit);
      console.log("cid, qid, userId ", cid, qid, currentUser._id);
      await client.saveQuizAttempt(cid, qid, currentUser._id, answersToSubmit);
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/details`);
    } catch (error: any) {
      console.error("Error saving quiz attempt:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        const idError = error.response.data.errors.find(
          (e: { path: string }) => e.path === "_id"
        );
        if (idError) {
          console.error("Error with _id field:", idError);
          const answersWithCorrectIds = answersToSubmit.map((answer) => ({
            ...answer,
            _id: answer._id.toString(),
          }));
          await client.saveQuizAttempt(
            cid,
            qid,
            attemptId,
            answersWithCorrectIds
          );
        }
      } else {
        throw error;
      }
    }
  };

  const handleEditQuiz = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/details/edit`);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-4">
      {quiz && (
        <>
          <h2 className="mb-3">{quiz.title}</h2>
          <FacultyRoute>
            <div className="alert alert-warning" role="alert">
              This is a preview of the published version of the quiz.
            </div>
          </FacultyRoute>
          <p>
            <strong>Started:</strong> {new Date().toLocaleString()}
          </p>
          <h4 className="fw-bold">Quiz Instructions</h4>

          {currentQuestion && (
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between">
                <span>Question {currentQuestionIndex + 1}</span>
                <span>{currentQuestion.points} pts</span>
              </div>
              <div className="card-body">
                <p>{currentQuestion.text}</p>
                {currentQuestion.type === "True/False" ? (
                  <>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={currentQuestion._id}
                        value="True"
                        checked={currentQuestion.selectedAnswer === "True"}
                        onChange={() =>
                          handleAnswerChange(currentQuestion._id, "True")
                        }
                      />
                      <label className="form-check-label">True</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={currentQuestion._id}
                        value="False"
                        checked={currentQuestion.selectedAnswer === "False"}
                        onChange={() =>
                          handleAnswerChange(currentQuestion._id, "False")
                        }
                      />
                      <label className="form-check-label">False</label>
                    </div>
                  </>
                ) : currentQuestion.type === "Multiple Choice" ? (
                  currentQuestion.options?.map((option, index) => (
                    <div key={index} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={currentQuestion._id}
                        value={option}
                        checked={currentQuestion.selectedAnswer === option}
                        onChange={() =>
                          handleAnswerChange(currentQuestion._id, option)
                        }
                      />
                      <label className="form-check-label">{option}</label>
                    </div>
                  ))
                ) : currentQuestion.type === "Fill in the Blank" ? (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your answer here"
                    value={currentQuestion.selectedAnswer || ""}
                    onChange={(e) =>
                      handleAnswerChange(currentQuestion._id, e.target.value)
                    }
                  />
                ) : null}
              </div>
            </div>
          )}

          <div className="d-flex justify-content-between mb-4">
            <button
              className="btn btn-outline-secondary"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              &larr; Previous
            </button>
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                className="btn btn-outline-secondary"
                onClick={handleNext}
              >
                Next &rarr;
              </button>
            ) : (
              <button className="btn btn-danger" onClick={handleSubmit}>
                Submit Quiz
              </button>
            )}
          </div>

          <div className="d-flex justify-content-between mb-4">
            <FacultyRoute>
              <button className="btn btn-secondary" onClick={handleEditQuiz}>
                &#9998; Keep Editing This Quiz
              </button>
            </FacultyRoute>
          </div>

          <div className="border-top pt-3">
            <h5>Questions</h5>
            <ul className="list-unstyled">
              {questions.map((q, index) => (
                <li key={q._id}>
                  <button
                    className={`btn btn-link ${
                      currentQuestionIndex === index ? "fw-bold" : ""
                    }`}
                    onClick={() => setCurrentQuestionIndex(index)}
                  >
                    Question {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
