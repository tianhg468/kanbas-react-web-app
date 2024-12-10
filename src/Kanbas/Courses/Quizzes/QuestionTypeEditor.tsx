import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useEffect } from "react";

export type BaseQuestion = {
  _id: string;
  type: "True/False" | "Multiple Choice" | "Fill in the Blank";
  text: string;
  points: number;
  options?: string[];
  correctAnswer?: string;
};
type Question = {
  _id: string;
  type: "True/False" | "Multiple Choice" | "Fill in the Blank";
  text: string;
  points: number;
  options?: string[];
  correctAnswer?: string;
};

export type NewQuestion = BaseQuestion;
type ExistingQuestion = BaseQuestion & { _id: string };

export default function QuestionTypeEditor() {
  const { cid, qid, status, questionId } = useParams<{
    cid: string;
    qid: string;
    status: string;
    questionId?: string;
  }>();
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
  const [isNewQuestion, setIsNewQuestion] = useState(false);

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
    console.log(fillInAnswers);
  };

  // Function to change fill-in-the-blank answer
  const handleFillInAnswerChange = (index: number, text: string) => {
    const newAnswers = [...fillInAnswers];
    newAnswers[index] = text;
    setFillInAnswers(newAnswers);
  };
  const generateMongoLikeId = () => {
    const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    return (
      timestamp +
      "xxxxxxxxxxxxxxxx".replace(/[x]/g, () =>
        ((Math.random() * 16) | 0).toString(16)
      )
    );
  };

  // Handle Save button click
  const handleSaveClick = async () => {
    if (!cid || !qid) {
      console.error("cid or qid is undefined");
      return;
    }
    let correctAnswer: string | undefined = undefined;

    if (questionType === "True/False") {
      correctAnswer = trueFalseAnswer;
    } else if (questionType === "Multiple Choice") {
      const correctChoice = choices.find((c) => c.correct);
      correctAnswer = correctChoice ? correctChoice.text : undefined;
    } else if (questionType === "Fill in the Blank") {
      const validAnswers = fillInAnswers.filter((answer) => answer.trim());
      if (validAnswers.length > 0) {
        correctAnswer = validAnswers.join("|");
      }
    }

    const questionData: NewQuestion = {
      _id: questionId || generateMongoLikeId(),
      type: questionType,
      text: questionText,
      points,
      options:
        questionType === "Multiple Choice"
          ? choices.map((c) => c.text)
          : undefined,
      correctAnswer,
    };

    try {
      // Check if we're creating a new question
      if (!isNewQuestion && questionId) {
        console.log("Updating existing question:", questionData);
        await client.updateQuestion(cid, qid, questionId, questionData);
      } else {
        console.log("Creating new question:", questionData);
        const { _id, ...newQuestionData } = questionData;
        await client.createQuestion(cid, qid, questionData);
      }

      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/details/questions`);
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };
  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/details/questions`);
  };

  useEffect(() => {
    const loadQuestion = async () => {
      if (!cid || !qid) return;

      try {
        const data = await client.fetchQuestionsForQuiz(cid, qid);
        const question = data.find((q: Question) => q._id === questionId);

        if (question) {
          setQuestionType(question.type);
          setQuestionTitle(question.text);
          setPoints(question.points);
          setQuestionText(question.text);

          if (question.type === "Multiple Choice" && question.options) {
            const choicesWithCorrect = question.options.map(
              (option: string) => ({
                text: option,
                correct: option === question.correctAnswer,
              })
            );
            setChoices(choicesWithCorrect);
          }
          if (question.type === "True/False") {
            setTrueFalseAnswer(question.correctAnswer || "True");
          }

          if (question.type === "Fill in the Blank") {
            const answers = question.correctAnswer?.split("|") || [""];
            setFillInAnswers(answers);
          }
        }
      } catch (error) {
        console.error("Error loading question:", error);
      }
    };

    loadQuestion();
    if (status === "new" && questionType === "Fill in the Blank") {
      setFillInAnswers([""]);
    }
    setIsNewQuestion(status === "new");
  }, [cid, qid, questionId, status]);

  return (
    <div className="p-4">
      {/* Question Header */}
      <div className="d-flex gap-2 mb-3">
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

      {questionType === "Fill in the Blank" && (
        <div className="mb-3">
          <label className="form-label fw-bold">Correct Answers:</label>
          {fillInAnswers.map((answer, index) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <input
                type="text"
                className="form-control me-2"
                placeholder={`Answer ${index + 1}`}
                value={answer}
                onChange={(e) =>
                  handleFillInAnswerChange(index, e.target.value)
                }
              />
              <button
                className="btn btn-danger"
                onClick={() => {
                  const newAnswers = fillInAnswers.filter(
                    (_, i) => i !== index
                  );
                  setFillInAnswers(newAnswers);
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <button className="btn btn-secondary" onClick={handleAddFillInAnswer}>
            + Add Answer
          </button>
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
