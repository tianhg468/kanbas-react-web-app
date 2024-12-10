import { useNavigate, useParams } from "react-router-dom";
import * as client from "./client";
import { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

export type Question = {
  _id: string;
  type: "True/False" | "Multiple Choice" | "Fill in the Blank";
  text: string;
  points: number;
  options?: string[];
  correctAnswer?: string;
  editing?: boolean;
};

export type Quiz = {
  _id: string;
  title: string;
  description: string;
  points: number;
};

export default function QuizQuestionsEditor() {
  const navigate = useNavigate();
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const generateMongoLikeId = () => {
    const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    return (
      timestamp +
      "xxxxxxxxxxxxxxxx".replace(/[x]/g, () =>
        ((Math.random() * 16) | 0).toString(16)
      )
    );
  };

  // Function to add a new question
  const handleNewQuestion = () => {
    const newQuestionId = generateMongoLikeId();
    setQuestions([
      ...questions,
      {
        _id: newQuestionId,
        type: "Multiple Choice",
        text: "New Question",
        points: 1,
        options: ["Option 1", "Option 2"],
        correctAnswer: "Option 1",
      },
    ]);
    navigate(
      `/Kanbas/Courses/${cid}/Quizzes/${qid}/question/new/${newQuestionId}`
    );
  };

  // Function to handle changes in question fields
  const handleQuestionChange = (id: string, field: string, value: any) => {
    setQuestions(
      questions.map((q) => (q._id === id ? { ...q, [field]: value } : q))
    );
  };

  // Function to toggle edit mode
  const handleEditQuestion = (id: string) => {
    setQuestions(
      questions.map((q) => (q._id === id ? { ...q, editing: !q.editing } : q))
    );
  };

  // Function to save edits
  const handleSave = () => {
    console.log("Questions saved:", questions);
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/details`);
  };

  // Function to cancel edits
  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/details`);
  };

  const handleSaveQuestion = async (question: Question) => {
    if (!cid || !qid) {
      console.error("cid or qid is undefined");
      return;
    }

    try {
      await client.saveQuestion(cid, qid, question);
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!cid || !qid) {
      console.error("cid or qid is undefined");
      return;
    }

    try {
      await client.deleteQuestion(cid, qid, questionId);
      setQuestions(questions.filter((q) => q._id !== questionId));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  useEffect(() => {
    const loadQuestions = async () => {
      if (!cid || !qid) {
        console.error("Course ID or Quiz ID is missing");
        return;
      }
      try {
        const data = await client.fetchQuestionsForQuiz(cid, qid);
        console.log("questions:", data);
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    loadQuestions();
  }, [cid, qid]);

  // Calculate total points
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <div className="p-4">
      {/* Tabs Navigation */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className="nav-link"
            onClick={() =>
              navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/details/edit`)
            }
          >
            Details
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link active">Questions</button>
        </li>
      </ul>

      {/* New Question Button */}
      <button
        className="btn btn-outline-secondary mb-3"
        onClick={handleNewQuestion}
      >
        + New Question
      </button>

      {/* Questions List */}
      <div className="p-4">
        <h3>Questions</h3>
        {questions.length === 0 ? (
          <p>No questions available.</p>
        ) : (
          <ul className="list-group">
            {questions.map((question) => (
              <li key={question._id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{question.type}:</strong> {question.text} (
                    {question.points} points)
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() =>
                        navigate(
                          `/Kanbas/Courses/${cid}/Quizzes/${qid}/question/${question._id}`
                        )
                      }
                    >
                      <FaPencil />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteQuestion(question._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Total Points */}
      <div className="mb-3 fw-bold">Total Points: {totalPoints}</div>

      {/* Buttons */}
      <div className="d-flex justify-content-center gap-3">
        <button className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}
