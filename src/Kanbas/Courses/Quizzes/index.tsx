import { IoMdSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import * as client from "./client";
import {
  setQuizzes,
  addQuiz,
  deleteQuiz,
  setLoading,
  setError,
} from "./reducer";
import { Quiz } from "./reducer";
import FacultyRoute from "../../Account/FacultyRoute";
import StudentRoute from "../../Account/StudentRoute";
import mongoose from "mongoose";

interface QuizAttempt {
  _id: string;
  score: number;
  completed: boolean;
}

interface ExtendedQuiz extends Quiz {
  attempts?: QuizAttempt[];
  lastAttemptScore?: number;
}

export default function Quizzes() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid } = useParams();
  const { quizzes, loading, error } = useSelector(
    (state: any) => state.quizzesReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<ExtendedQuiz | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const fetchQuizzes = async () => {
    try {
      dispatch(setLoading(true));
      const fetchedQuizzes = await client.findQuizzesForCourse(cid as string);
      dispatch(setQuizzes(fetchedQuizzes));
    } catch (err: any) {
      dispatch(setError(err.message));
    }
  };
  const generateRandomId = () => {
    const randomNumbers = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `Q${randomNumbers}`;
  };
  const createQuiz = () => {
    const qid = generateRandomId();
    if (!cid) return;
    navigate(`/Kanbas/Courses/${cid}/Quizzes/new/${qid}/details`);
  };

  const handlePublishToggle = async (quiz: ExtendedQuiz) => {
    try {
      await client.updateQuiz(cid as string, quiz._id, {
        ...quiz,
        published: !quiz.published,
      });
      await fetchQuizzes();
    } catch (err: any) {
      dispatch(setError(err.message));
    }
  };

  const removeQuiz = async (quizId: string) => {
    if (!cid) return;
    try {
      dispatch(setLoading(true));
      await client.deleteQuiz(cid, quizId);
      dispatch(deleteQuiz(quizId));
      setShowDialog(false);
      setQuizToDelete(null);
      await fetchQuizzes();
    } catch (err: any) {
      dispatch(setError(err.message));
    }
  };

  const viewQuiz = (quiz: ExtendedQuiz) => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/preview`);
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (openMenuId && !target?.closest(".position-relative")) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openMenuId]);

  const confirmDelete = (quizId: string) => {
    const quizToDelete = quizzes.find((q: ExtendedQuiz) => q._id === quizId);
    if (quizToDelete) {
      setQuizToDelete(quizToDelete);
      setShowDialog(true);
    }
  };

  const getAvailabilityStatus = (quiz: ExtendedQuiz) => {
    const now = new Date();
    const availableDate = new Date(quiz.availableFrom);
    const untilDate = new Date(quiz.availableUntil);

    if (now > untilDate) return "Closed";
    if (now >= availableDate && now <= untilDate) return "Available";
    return `Not available until ${availableDate.toLocaleDateString()}`;
  };

  const filteredQuizzes = quizzes.filter(
    (quiz: ExtendedQuiz) =>
      quiz.course === cid &&
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="input-group w-50">
          <span className="input-group-text bg-white">
            <IoMdSearch className="fs-4" />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search for Quiz"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <FacultyRoute>
          <button className="btn btn-danger" onClick={createQuiz}>
            <FaPlus className="me-2" />
            Quiz
          </button>
        </FacultyRoute>
      </div>

      <ul className="list-group">
        <li className="list-group-item p-0 mb-4">
          <div className="p-3 bg-light border-bottom">
            <BsGripVertical className="me-2" />
            <span className="fw-bold">QUIZZES</span>
            <span className="float-end badge bg-secondary">25% of Total</span>
          </div>

          {filteredQuizzes.length === 0 ? (
            <div className="p-4 text-center text-muted">
              No quizzes found.{" "}
              {currentUser?.role === "FACULTY" &&
                'Click the "+ Quiz" button to create one.'}
            </div>
          ) : (
            <ul className="list-group list-group-flush">
              {filteredQuizzes.map((quiz: ExtendedQuiz) => (
                <li key={quiz._id} className="list-group-item p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <BsGripVertical className="me-2 text-secondary" />
                      <MdQuiz className="me-3 text-success fs-4" />
                      <div>
                        <Link
                          to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/details`}
                          className="text-decoration-none text-dark fw-bold"
                        >
                          {quiz.title}
                        </Link>

                        <div className="text-muted">
                          <span
                            className={`badge ${
                              quiz.published ? "bg-success" : "bg-secondary"
                            } me-2`}
                          >
                            {quiz.published ? "Published" : "Not Published"}
                          </span>
                          <span className="me-2">
                            {getAvailabilityStatus(quiz)}
                          </span>
                          <span className="me-2">|</span>
                          <span className="me-2">
                            Due {new Date(quiz.dueDate).toLocaleDateString()}
                          </span>
                          <span className="me-2">|</span>
                          <span>{quiz.points} pts</span>
                          <span className="me-2">|</span>
                          <span>{quiz.questions.length} Questions</span>
                          {currentUser?.role === "STUDENT" &&
                            quiz.lastAttemptScore !== undefined && (
                              <>
                                <span className="me-2">|</span>
                                <span>Score: {quiz.lastAttemptScore}</span>
                              </>
                            )}
                        </div>
                      </div>
                    </div>

                    {currentUser?.role === "FACULTY" && (
                      <div className="d-flex align-items-center gap-2">
                        <FaCheckCircle
                          className={`fs-5 ${
                            quiz.published
                              ? "text-success"
                              : "text-success opacity-25"
                          }`}
                          role="button"
                          onClick={() => handlePublishToggle(quiz)}
                        />
                        <FaTrash
                          role="button"
                          className="text-danger"
                          onClick={() => confirmDelete(quiz._id)}
                        />
                        <div className="position-relative">
                          <BsThreeDotsVertical
                            role="button"
                            className="text-muted fs-5"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(
                                openMenuId === quiz._id ? null : quiz._id
                              );
                            }}
                          />
                          {openMenuId === quiz._id && (
                            <div
                              className="position-absolute end-0 bg-white rounded shadow-sm"
                              style={{
                                zIndex: 1000,
                                minWidth: "150px",
                                top: "100%",
                              }}
                            >
                              <ul className="list-unstyled m-0 p-0">
                                <li>
                                  <button
                                    className="btn btn-link text-start text-decoration-none text-dark w-100 px-3 py-2"
                                    onClick={() => {
                                      navigate(
                                        `/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/details`
                                      );
                                      setOpenMenuId(null);
                                    }}
                                  >
                                    Edit
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="btn btn-link text-start text-decoration-none text-dark w-100 px-3 py-2"
                                    onClick={() => {
                                      confirmDelete(quiz._id);
                                      setOpenMenuId(null);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="btn btn-link text-start text-decoration-none text-dark w-100 px-3 py-2"
                                    onClick={() => {
                                      handlePublishToggle(quiz);
                                      setOpenMenuId(null);
                                    }}
                                  >
                                    {quiz.published ? "Unpublish" : "Publish"}
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="btn btn-link text-start text-decoration-none text-dark w-100 px-3 py-2"
                                    onClick={() => {
                                      // Copy functionality to be implemented
                                      setOpenMenuId(null);
                                    }}
                                  >
                                    Copy
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="btn btn-link text-start text-decoration-none text-dark w-100 px-3 py-2"
                                    onClick={() => {
                                      // Sort functionality to be implemented
                                      setOpenMenuId(null);
                                    }}
                                  >
                                    Sort
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>

      {/* Delete Confirmation Modal */}
      {showDialog && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex={-1}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Quiz</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDialog(false)}
                />
              </div>
              <div className="modal-body">
                Are you sure you want to delete "{quizToDelete?.title}"? This
                action cannot be undone.
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDialog(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => quizToDelete && removeQuiz(quizToDelete._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
