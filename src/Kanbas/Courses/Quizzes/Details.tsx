import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaPencil } from "react-icons/fa6";
import * as client from "./client";
import FacultyRoute from "../../Account/FacultyRoute";
import StudentRoute from "../../Account/StudentRoute";

type QuizAttempt = {
  _id: string;
  score: number;
  points: number;
  startTime: string;
  endTime: string;
  answers: { questionId: string; answer: string | null; correct: boolean }[];
};

export default function QuizDetails() {
  const { qid, cid } = useParams<{ qid: string; cid: string }>();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [quiz, setQuiz] = useState<any>({
    title: "New Quiz",
    type: "GRADED_QUIZ",
    points: 0,
    assignmentGroup: "QUIZZES",
    shuffleAnswers: false,
    timeLimit: 0,
    multipleAttempts: false,
    maxAttempts: 1,
    showCorrectAnswers: false,
    oneQuestionAtTime: false,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "N/A",
    availableFrom: "N/A",
    availableUntil: "N/A",
  });

  useEffect(() => {
    const loadQuizAndAttempts = async () => {
      if (cid && qid) {
        try {
          const quizData = await client.fetchQuiz(cid, qid);
          const userAttempts = await client.getQuizAttempts(
            cid,
            qid,
            currentUser._id
          );
          setQuiz(quizData);
          setAttempts(userAttempts);
        } catch (error) {
          console.error("Error loading quiz and attempts:", error);
        }
      }
    };

    loadQuizAndAttempts();
  }, [cid, qid, currentUser._id]);

  const startQuiz = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview`);
  };

  return (
    <div className="p-4">
      <FacultyRoute>
        <div className="d-flex justify-content-center mb-3">
          <button
            className="btn btn-secondary me-2"
            onClick={() =>
              navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview`)
            }
          >
            Preview
          </button>
          <button
            className="btn btn-secondary"
            onClick={() =>
              navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/details/edit`)
            }
          >
            <FaPencil className="me-1" /> Edit
          </button>
        </div>
        <hr />
      </FacultyRoute>
      <h2 className="mb-4">{quiz.title}</h2>
      <div className="d-flex w-50 mb-3">
        <FacultyRoute>
          <div className="w-50 text-end pe-3">
            <strong>Quiz Type:</strong>
          </div>
          <div className="w-50 text-start">
            {quiz.type === "GRADED_QUIZ" ? "Graded Quiz" : quiz.type}
          </div>
        </FacultyRoute>
      </div>
      <div className="d-flex w-50 mb-3">
        <div className="w-50 text-end pe-3">
          <strong>Points:</strong>
        </div>
        <div className="w-50 text-start">{quiz.points}</div>
      </div>
      <FacultyRoute>
        <div className="d-flex w-50 mb-3">
          <div className="w-50 text-end pe-3">
            <strong>Assignment Group:</strong>
          </div>
          <div className="w-50 text-start">{quiz.assignmentGroup}</div>
        </div>
      </FacultyRoute>
      <FacultyRoute>
        <div className="d-flex w-50 mb-3">
          <div className="w-50 text-end pe-3">
            <strong>Shuffle Answers:</strong>
          </div>
          <div className="w-50 text-start">
            {quiz.shuffleAnswers ? "Yes" : "No"}
          </div>
        </div>
      </FacultyRoute>
      <div className="d-flex w-50 mb-3">
        <div className="w-50 text-end pe-3">
          <strong>Time Limit:</strong>
        </div>
        <div className="w-50 text-start">{quiz.timeLimit} Minutes </div>
      </div>
      <div className="d-flex w-50 mb-3">
        <div className="w-50 text-end pe-3">
          <strong>Multiple Attempts:</strong>
        </div>
        <div className="w-50 text-start">
          {quiz.multipleAttempts ? "Yes" : "No"}
        </div>
      </div>
      <FacultyRoute>
        <div className="d-flex w-50 mb-3">
          <div className="w-50 text-end pe-3">
            <strong>View Responses:</strong>
          </div>
          <div className="w-50 text-start">Always</div>
        </div>
      </FacultyRoute>
      <FacultyRoute>
        <div className="d-flex w-50 mb-3">
          <div className="w-50 text-end pe-3">
            <strong>Show Correct Answers:</strong>
          </div>
          <div className="w-50 text-start">
            {quiz.showCorrectAnswers ? "Immediately" : "No"}
          </div>
        </div>
      </FacultyRoute>
      <FacultyRoute>
        <div className="d-flex w-50 mb-3">
          <div className="w-50 text-end pe-3">
            <strong>One Question at a Time:</strong>
          </div>
          <div className="w-50 text-start">
            {quiz.oneQuestionAtTime ? "Yes" : "No"}
          </div>
        </div>
      </FacultyRoute>
      <FacultyRoute>
        <div className="d-flex w-50 mb-3">
          <div className="w-50 text-end pe-3">
            <strong>Require Respondus LockDown Browser:</strong>
          </div>
          <div className="w-50 text-start">No </div>
        </div>
      </FacultyRoute>
      <FacultyRoute>
        <div className="d-flex w-50 mb-3">
          <div className="w-50 text-end pe-3">
            <strong>Required to View Quiz Results:</strong>
          </div>
          <div className="w-50 text-start"> No </div>
        </div>
      </FacultyRoute>
      <FacultyRoute>
        <div className="d-flex w-50 mb-3">
          <div className="w-50 text-end pe-3">
            <strong>Webcam Required:</strong>
          </div>
          <div className="w-50 text-start">
            {quiz.webcamRequired ? "Yes" : "No"}
          </div>
        </div>
      </FacultyRoute>
      <FacultyRoute>
        <div className="d-flex w-50 mb-3">
          <div className="w-50 text-end pe-3">
            <strong>Lock Questions After Answering:</strong>
          </div>
          <div className="w-50 text-start">
            {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
          </div>
        </div>
      </FacultyRoute>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>Due</th>
            <FacultyRoute>
              <th>For</th>
            </FacultyRoute>
            <th>Available from</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{quiz.dueDate}</td>
            <FacultyRoute>
              <td>Everyone</td>
            </FacultyRoute>
            <td>{quiz.availableFrom}</td>
            <td>{quiz.availableUntil}</td>
          </tr>
        </tbody>
      </table>

      {/* Start Quiz Button for Students */}
      <StudentRoute>
        <div className="d-flex justify-content-end mt-4">
          <button className="btn btn-danger" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      </StudentRoute>

      {/* Attempts */}
      <div className="border-top pt-3">
        <h5>Your Quiz Attempts</h5>
        {attempts.length > 0 ? (
          <ul className="list-group">
            {attempts.map((attempt, index) => (
              <li key={attempt._id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <FacultyRoute>
                    <div>
                      <strong>Attempt {index + 1}</strong>
                    </div>
                  </FacultyRoute>
                  <StudentRoute>
                    <div>
                      <strong>
                        Attempt {index + 1}/{quiz.maxAttempts}
                      </strong>
                    </div>
                  </StudentRoute>
                  <div>
                    <strong>Score:</strong> {attempt.score} / {quiz.points}
                  </div>
                  <div>
                    <strong>Completed:</strong>
                    {new Date(attempt.endTime).toLocaleString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No quiz attempts found.</p>
        )}
      </div>
    </div>
  );
}
