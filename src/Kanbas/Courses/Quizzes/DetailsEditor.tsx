import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as client from "./client";

export default function QuizDetailsEditor() {
  const navigate = useNavigate();
  const { cid, qid, status } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  const [isNewQuiz, setIsNewQuiz] = useState(false);

  const [quiz, setQuiz] = useState({
    title: "Unnamed Quiz",
    description: "",
    quizType: "Graded Quiz",
    type: "GRADED_QUIZ",
    points: 0,
    assignmentGroup: "QUIZZES",
    shuffleAnswers: true,
    timeLimit: 20,
    allowMultipleAttempts: false,
    multipleAttempts: false,
    showCorrectAnswers: true,
    accessCode: "",
    oneQuestionAtTime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value, type } = e.target;

    if (e.target instanceof HTMLInputElement && type === "checkbox") {
      const checked = e.target.checked;
      if (id === "allowMultipleAttempts") {
        setQuiz({
          ...quiz,
          allowMultipleAttempts: checked,
          multipleAttempts: checked,
        });
      } else {
        setQuiz({ ...quiz, [id]: checked });
      }
    } else {
      if (id === "quizType") {
        const typeMap: { [key: string]: string } = {
          "Graded Quiz": "GRADED_QUIZ",
          "Practice Quiz": "PRACTICE_QUIZ",
          "Graded Survey": "GRADED_SURVEY",
          "Ungraded Survey": "UNGRADED_SURVEY",
        };
        setQuiz({
          ...quiz,
          quizType: value,
          type: typeMap[value],
        });
      } else {
        setQuiz({ ...quiz, [id]: value });
      }
    }
  };

  const handleSave = async () => {
    try {
      if (!cid || !qid) {
        console.error("Missing cid or qid");
        return;
      }

      const updatedQuiz = {
        ...quiz,
        multipleAttempts: quiz.allowMultipleAttempts,
        type: quiz.type,
        lastUpdated: new Date().toISOString(),
      };
      if (isNewQuiz) {
        console.log("Creating new quiz:", updatedQuiz);
        const newQuiz = await client.createQuiz(cid, updatedQuiz);
        console.log("Quiz created successfully with ID:", newQuiz._id);
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuiz._id}/details`);
      } else {
        console.log("Updating existing quiz:", updatedQuiz);
        await client.updateQuiz(cid, qid!, updatedQuiz);
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/details`);
      }
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const handleSaveAndPublish = async () => {
    try {
      if (!cid || !qid) {
        console.error("Missing cid or qid");
        return;
      }

      const updatedQuiz = {
        ...quiz,
        published: true,
        lastUpdated: new Date().toISOString(),
      };

      await client.publishQuiz(cid, qid, updatedQuiz);
      console.log("Quiz published successfully");
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/details`);
    } catch (error) {
      console.error("Error publishing quiz:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/details`);
  };
  const handleTabClick = (tab: string, path: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  useEffect(() => {
    const loadQuiz = async () => {
      if (!cid) return;

      try {
        if (status !== "new") {
          const quizData = await client.fetchQuiz(cid, qid!);
          const typeMapReverse: { [key: string]: string } = {
            GRADED_QUIZ: "Graded Quiz",
            PRACTICE_QUIZ: "Practice Quiz",
            GRADED_SURVEY: "Graded Survey",
            UNGRADED_SURVEY: "Ungraded Survey",
          };
          setQuiz({
            ...quizData,
            quizType: typeMapReverse[quizData.type] || "Graded Quiz",
          });
        } else {
          setQuiz({
            title: "Unnamed Quiz",
            description: "",
            quizType: "Graded Quiz",
            type: "GRADED_QUIZ",
            points: 0,
            assignmentGroup: "QUIZZES",
            shuffleAnswers: true,
            timeLimit: 20,
            allowMultipleAttempts: false,
            multipleAttempts: false,
            showCorrectAnswers: true,
            accessCode: "",
            oneQuestionAtTime: true,
            webcamRequired: false,
            lockQuestionsAfterAnswering: false,
            dueDate: "",
            availableFrom: "",
            availableUntil: "",
          });
          setIsNewQuiz(status === "new");
        }
      } catch (error) {
        console.error("Error loading quiz:", error);
      }
    };

    loadQuiz();
  }, [cid, qid, status]);

  return (
    <div className="p-4">
      {/* Tabs for Details and Questions */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            style={{ textDecoration: "none" }}
            className={`btn btn-link ${
              activeTab === "details"
                ? "fw-bold text-black"
                : "text-danger hover:text-black"
            }`}
            onClick={() =>
              handleTabClick(
                "details",
                `/Kanbas/Courses/${cid}/Quizzes/${qid}/details/edit`
              )
            }
          >
            Details
          </button>
        </li>
        <li className="nav-item">
          <button
            style={{ textDecoration: "none" }}
            className={`btn btn-link ${
              activeTab === "questions"
                ? "fw-bold text-black"
                : "text-danger hover:text-black"
            }`}
            onClick={() =>
              handleTabClick(
                "questions",
                `/Kanbas/Courses/${cid}/Quizzes/${qid}/details/questions`
              )
            }
          >
            Questions
          </button>
        </li>
      </ul>

      {/* Title */}
      <div className="mb-3">
        <label htmlFor="title" className="form-label fw-bold">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={quiz.title}
          onChange={handleInputChange}
        />
      </div>

      {/* Description (WYSIWYG Placeholder) */}
      <div className="mb-3">
        <label htmlFor="description" className="form-label fw-bold">
          Description
        </label>
        <div className="border p-2" style={{ minHeight: "120px" }}>
          {/* Placeholder for WYSIWYG Editor */}
          <textarea
            id="description"
            className="form-control"
            rows={5}
            value={quiz.description}
            onChange={handleInputChange}
            placeholder="Write quiz instructions here..."
          />
        </div>
      </div>

      {/* Quiz Type and Assignment Group */}
      <div className="d-flex gap-3 mb-3">
        <div className="flex-fill">
          <label htmlFor="quizType" className="form-label fw-bold">
            Quiz Type
          </label>
          <select
            className="form-select"
            id="quizType"
            value={quiz.quizType}
            onChange={handleInputChange}
          >
            <option value="Graded Quiz">Graded Quiz</option>
            <option value="Practice Quiz">Practice Quiz</option>
            <option value="Graded Survey">Graded Survey</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
          </select>
        </div>
        <div className="flex-fill">
          <label htmlFor="assignmentGroup" className="form-label fw-bold">
            Assignment Group
          </label>
          <select
            className="form-select"
            id="assignmentGroup"
            value={quiz.assignmentGroup}
            onChange={handleInputChange}
          >
            <option value="QUIZZES">Quizzes</option>
            <option value="EXAMS">Exams</option>
            <option value="ASSIGNMENTS">Assignments</option>
            <option value="PROJECT">Project</option>
          </select>
        </div>
      </div>

      {/* Options */}
      <div className="mb-3">
        <label className="form-label fw-bold">Options</label>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="shuffleAnswers"
            checked={quiz.shuffleAnswers}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="shuffleAnswers">
            Shuffle Answers
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="allowMultipleAttempts"
            checked={quiz.multipleAttempts}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="allowMultipleAttempts">
            Allow Multiple Attempts
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="oneQuestionAtTime"
            checked={quiz.oneQuestionAtTime}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="oneQuestionAtTime">
            One Question at a Time
          </label>
        </div>
      </div>

      {/* Dates */}
      <div className="mb-3">
        <label className="form-label fw-bold">Dates</label>
        <div className="d-flex gap-3">
          <div className="flex-fill">
            <label htmlFor="dueDate" className="form-label">
              Due Date
            </label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              value={quiz.dueDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex-fill">
            <label htmlFor="availableFrom" className="form-label">
              Available From
            </label>
            <input
              type="date"
              className="form-control"
              id="availableFrom"
              value={quiz.availableFrom}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex-fill">
            <label htmlFor="availableUntil" className="form-label">
              Until
            </label>
            <input
              type="date"
              className="form-control"
              id="availableUntil"
              value={quiz.availableUntil}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-success" onClick={handleSaveAndPublish}>
          Save and Publish
        </button>
      </div>
    </div>
  );
}
