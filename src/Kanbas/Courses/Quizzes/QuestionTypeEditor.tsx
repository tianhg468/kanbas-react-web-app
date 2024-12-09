import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Question = {
  id: number;
  type: "True/False" | "Multiple Choice" | "Fill in the Blank";
  text: string;
  points: number;
  options?: string[];
  correctAnswer?: string;
  editing: boolean;
};

export default function QuestionTypeEditor() {
  const { qid } = useParams<{ qid: string }>();
  const navigate = useNavigate();
  const [questionType, setQuestionType] = useState<
    "True/False" | "Multiple Choice" | "Fill in the Blank"
  >("Multiple Choice");
  const [questionTitle, setQuestionTitle] = useState("");
  const [points, setPoints] = useState(1);
  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState([{ text: "", correct: false }]);
  const [trueFalseAnswer, setTrueFalseAnswer] = useState("True");
  const [fillInAnswers, setFillInAnswers] = useState([""]);

  // Function to add a new choice
  const handleAddChoice = () => {
    setChoices([...choices, { text: "", correct: false }]);
  };

  // Function to remove a choice
  const handleRemoveChoice = (index: number) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  // Function to change choice text
  const handleChoiceChange = (index: number, text: string) => {
    const newChoices = [...choices];
    newChoices[index].text = text;
    setChoices(newChoices);
  };

  // Function to set the correct choice
  const handleCorrectChoice = (index: number) => {
    const newChoices = choices.map((choice, i) => ({
      ...choice,
      correct: i === index,
    }));
    setChoices(newChoices);
  };

  // Function to add a fill-in-the-blank answer
  const handleAddFillInAnswer = () => {
    setFillInAnswers([...fillInAnswers, ""]);
  };

  // Function to change fill-in-the-blank answer
  const handleFillInAnswerChange = (index: number, text: string) => {
    const newAnswers = [...fillInAnswers];
    newAnswers[index] = text;
    setFillInAnswers(newAnswers);
  };

  // Handle Save button click
  const handleSaveClick = async () => {
    let correctAnswer: string | undefined = undefined;

    if (questionType === "True/False") {
      correctAnswer = trueFalseAnswer;
    } else if (questionType === "Multiple Choice") {
      const correctChoice = choices.find((c) => c.correct);
      correctAnswer = correctChoice ? correctChoice.text : undefined;
    }

    const newQuestion: Question = {
      id: 0,
      type: questionType,
      text: questionText,
      points,
      options:
        questionType === "Multiple Choice"
          ? choices.map((c) => c.text)
          : undefined,
      correctAnswer,
      editing: false,
    };

    try {
      await client.createQuestion(qid, newQuestion);
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
  };
  return (
    <div className="p-4">
      {/* Question Header */}
      <div className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Question Title"
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)}
        />
        <select
          className="form-select"
          value={questionType}
          onChange={(e) =>
            setQuestionType(
              e.target.value as
                | "True/False"
                | "Multiple Choice"
                | "Fill in the Blank"
            )
          }
        >
          <option value="Multiple Choice">Multiple Choice</option>
          <option value="True/False">True/False</option>
          <option value="Fill in the Blank">Fill in the Blank</option>
        </select>
        <input
          type="number"
          className="form-control"
          placeholder="Points"
          value={points}
          onChange={(e) => setPoints(parseInt(e.target.value))}
        />
      </div>

      {/* Question Text */}
      <div className="mb-3">
        <label className="form-label fw-bold">Question:</label>
        <textarea
          className="form-control"
          rows={3}
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
      </div>

      {/* Render Different Question Types */}
      {questionType === "Multiple Choice" && (
        <div className="mb-3">
          <label className="form-label fw-bold">Choices:</label>
          {choices.map((choice, index) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <input
                type="text"
                className="form-control me-2"
                placeholder={`Option ${index + 1}`}
                value={choice.text}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
              />
              <input
                type="radio"
                name="correctChoice"
                checked={choice.correct}
                onChange={() => handleCorrectChoice(index)}
                className="me-2"
              />
              <button
                className="btn btn-danger"
                onClick={() => handleRemoveChoice(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button className="btn btn-secondary" onClick={handleAddChoice}>
            + Add Choice
          </button>
        </div>
      )}

      {questionType === "True/False" && (
        <div className="mb-3">
          <label className="form-label fw-bold">Answers:</label>
          <div className="form-check">
            <input
              type="radio"
              id="true"
              name="trueFalse"
              value="True"
              checked={trueFalseAnswer === "True"}
              onChange={() => setTrueFalseAnswer("True")}
              className="form-check-input"
            />
            <label
              htmlFor="true"
              className="form-check-label fw-bold text-success"
            >
              True
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="false"
              name="trueFalse"
              value="False"
              checked={trueFalseAnswer === "False"}
              onChange={() => setTrueFalseAnswer("False")}
              className="form-check-input"
            />
            <label htmlFor="false" className="form-check-label">
              False
            </label>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
}
