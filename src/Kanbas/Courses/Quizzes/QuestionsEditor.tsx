import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as client from "./client";

export type Question = {
  id: number;
  type: "True/False" | "Multiple Choice" | "Fill in the Blank";
  text: string;
  points: number;
  options?: string[];
  correctAnswer?: string;
  editing: boolean;
};

export default function QuizQuestionsEditor() {
  const navigate = useNavigate();
  const { cid, qid } = useParams<{ cid: string; qid: string }>();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIdCounter, setQuestionIdCounter] = useState(1);

  // Function to add a new question
  const handleNewQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questionIdCounter,
        type: "Multiple Choice",
        text: "New Question",
        points: 1,
        options: ["Option 1", "Option 2"],
        correctAnswer: "Option 1",
        editing: true,
      },
    ]);
    setQuestionIdCounter(questionIdCounter + 1);
    navigate(
      `/Kanbas/Courses/${cid}/Quizzes/${qid}/question/${questionIdCounter}`
    );
  };
  const handleCreateQuestion = async (question: Question) => {
    if (!cid || !qid) {
      console.error("cid or qid is undefined");
      return;
    }

    try {
      // Create a new question in the database
      await client.createQuestion(cid, qid, question);
      // Optionally, update the questions state here
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  // Function to handle changes in question fields
  const handleQuestionChange = (id: number, field: string, value: any) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  // Function to toggle edit mode
  const handleEditQuestion = (id: number) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, editing: !q.editing } : q))
    );
  };

  // Function to save edits
  const handleSave = () => {
    console.log("Questions saved:", questions);
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
  };

  // Function to cancel edits
  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
  };
  const handleSaveQuestion = async (question: Question) => {
    if (!cid || !qid) {
      console.error("cid or qid is undefined");
      return;
    }

    try {
      // Save the question to the database
      await client.saveQuestion(cid, qid, question);
      // Optionally, update the questions state here
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const handleDeleteQuestion = async (questionId: number) => {
    if (!cid || !qid) {
      console.error("cid or qid is undefined");
      return;
    }

    try {
      // Delete the question from the database
      await client.deleteQuestion(cid, qid, questionId);
      // Optionally, update the questions state here
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

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
      <ul className="list-group mb-3">
        {questions.map((question) => (
          <li key={question.id} className="list-group-item">
            {question.editing ? (
              <div>
                <div className="mb-2">
                  <label className="form-label fw-bold">Question Type</label>
                  <select
                    className="form-select"
                    value={question.type}
                    onChange={(e) =>
                      handleQuestionChange(question.id, "type", e.target.value)
                    }
                  >
                    <option value="True/False">True/False</option>
                    <option value="Multiple Choice">Multiple Choice</option>
                    <option value="Fill in the Blank">Fill in the Blank</option>
                  </select>
                </div>

                <div className="mb-2">
                  <label className="form-label fw-bold">Question Text</label>
                  <input
                    type="text"
                    className="form-control"
                    value={question.text}
                    onChange={(e) =>
                      handleQuestionChange(question.id, "text", e.target.value)
                    }
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label fw-bold">Points</label>
                  <input
                    type="number"
                    className="form-control"
                    value={question.points}
                    onChange={(e) =>
                      handleQuestionChange(
                        question.id,
                        "points",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>

                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => handleEditQuestion(question.id)}
                >
                  Save
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleEditQuestion(question.id)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="d-flex justify-content-between align-items-center">
                <span>
                  {question.type}: {question.text} ({question.points} points)
                </span>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleEditQuestion(question.id)}
                >
                  Edit
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

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
