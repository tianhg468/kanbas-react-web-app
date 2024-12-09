import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaPencil } from "react-icons/fa6";

export default function QuizDetails() {
  const { qid, cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const navigate = useNavigate();

  const defaultQuiz = {
    title: "New Quiz",
    type: "GRADED_QUIZ",
    points: 0,
    assignmentGroup: "QUIZZES",
    shuffleAnswers: false,
    timeLimit: 0,
    multipleAttempts: false,
    showCorrectAnswers: false,
    oneQuestionAtTime: false,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "N/A",
    availableFrom: "N/A",
    availableUntil: "N/A",
  };
  const [quiz, setQuiz] = useState<any>(defaultQuiz);

  useEffect(() => {
    if (qid) {
      const existingQuiz = quizzes.find((q: any) => q._id === qid);
      if (existingQuiz) {
        setQuiz(existingQuiz);
      }
    }
  }, [qid, quizzes]);

  return (
    <div className="p-4">
      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-secondary me-2">Preview</button>
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
      <h2 className="mb-4">{quiz.title}</h2>
      <div className="d-flex w-50 mb-3">
        <div className="w-50 text-end pe-3">
          <strong>Quiz Type:</strong>
        </div>
        <div className="w-50 text-start">
          {quiz.type === "GRADED_QUIZ" ? "Graded Quiz" : quiz.type}
        </div>
      </div>
      <div className="d-flex w-50 mb-3">
        <div className="w-50 text-end pe-3">
          <strong>Points:</strong>
        </div>
        <div className="w-50 text-start">{quiz.points}</div>
      </div>
      <div className="d-flex w-50 mb-3">
        <div className="w-50 text-end pe-3">
          <strong>Assignment Group:</strong>
        </div>
        <div className="w-50 text-start">{quiz.assignmentGroup}</div>
      </div>
      <div className="d-flex w-50 mb-3">
        <div className="w-50 text-end pe-3">
          <strong>Shuffle Answers:</strong>
        </div>
        <div className="w-50 text-start">
          {quiz.shuffleAnswers ? "Yes" : "No"}
        </div>
      </div>
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
      <div className="d-flex w-50 mb-3">
        <div className="w-50 text-end pe-3">
          <strong>View Responses:</strong>
        </div>
        <div className="w-50 text-start">Always</div>
      </div>
      <div className="d-flex w-50 mb-3">
        <div className="w-50 text-end pe-3">
          <strong>Show Correct Answers:</strong>
        </div>
        <div className="w-50 text-start">
          {quiz.showCorrectAnswers ? "Immediately" : "No"}
        </div>
      </div>
      <div className="d-flex w-50 mb-3">
        <div className="w-50 text-end pe-3">
          <strong>One Question at a Time:</strong>
        </div>
        <div className="w-50 text-start">
          {quiz.oneQuestionAtTime ? "Yes" : "No"}
        </div>
      </div>
      <div className="d-flex w-50 mb-3">
        <div className="w-50 text-end pe-3">
          <strong>Require Respondus LockDown Browser:</strong>
        </div>
        <div className="w-50 text-start">No </div>
      </div>
      <div className="d-flex w-50 mb-3">
        <div className="w-50 text-end pe-3">
          <strong>Required to View Quiz Results:</strong>
        </div>
        <div className="w-50 text-start"> No </div>
      </div>
      <div className="d-flex w-50 mb-3">
        <div className="w-50 text-end pe-3">
          <strong>Webcam Required:</strong>
        </div>
        <div className="w-50 text-start">
          {quiz.webcamRequired ? "Yes" : "No"}
        </div>
      </div>
      <div className="d-flex w-50 mb-3">
        <div className="w-50 text-end pe-3">
          <strong>Lock Questions After Answering:</strong>
        </div>
        <div className="w-50 text-start">
          {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
        </div>
      </div>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>Due</th>
            <th>For</th>
            <th>Available from</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{quiz.dueDate}</td>
            <td>Everyone</td>
            <td>{quiz.availableFrom}</td>
            <td>{quiz.availableUntil}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// import { useParams, useNavigate } from "react-router-dom";
// import { RxCross2 } from "react-icons/rx";
// import React, { useRef, useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import * as client from "./client";
// import { addQuiz, updateQuiz } from "./reducer";

// export default function QuizDetails() {
//   const { qid, cid } = useParams();
//   const dispatch = useDispatch();
//   const [quiz, setQuiz] = useState({
//     title: "New Quiz",
//     description: "New Quiz Description",
//     course: cid,
//     type: "GRADED_QUIZ",
//     points: 29,
//     assignmentGroup: "QUIZZES",
//     shuffleAnswers: false,
//     timeLimit: 30,
//     multipleAttempts: false,
//     maxAttempts: 1,
//     showCorrectAnswers: true,
//     oneQuestionAtTime: true,
//     webcamRequired: false,
//     lockQuestionsAfterAnswering: false,
//     dueDate: new Date().toISOString().split("T")[0],
//     availableFrom: new Date().toISOString().split("T")[0],
//     availableUntil: new Date().toISOString().split("T")[0],
//     published: false,
//     questions: [],
//   });

//   const dateInputRef = useRef<HTMLInputElement>(null);
//   const { quizzes } = useSelector((state: any) => state.quizzesReducer);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       if (qid && qid !== "new") {
//         const existingQuiz = quizzes.find((q: any) => q._id === qid);
//         if (existingQuiz) {
//           setQuiz(existingQuiz);
//         }
//       }
//     };
//     fetchQuiz();
//   }, [qid, quizzes]);

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!cid) {
//       console.error("No course ID provided");
//       return;
//     }

//     try {
//       let savedQuiz;
//       if (!qid) {
//         console.error("No quiz ID provided");
//         return;
//       }
//       if (qid === "new") {
//         savedQuiz = await client.createQuiz(cid, {
//           ...quiz,
//           course: cid,
//         });
//         dispatch(addQuiz(savedQuiz));
//       } else {
//         savedQuiz = await client.updateQuiz(cid, qid, quiz);
//         dispatch(updateQuiz(savedQuiz));
//       }

//       navigate(`/Kanbas/Courses/${cid}/Quizzes`);
//     } catch (error) {
//       console.error("Error saving quiz:", error);
//     }
//   };

//   const handleCancel = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     navigate(`/Kanbas/Courses/${cid}/Quizzes`);
//   };

//   return (
//     <div>
//       <div id="wd-quizzes-editor">
//         <form>
//           <div className="border border-start-0 border-top-0 border-end-0 mb-2">
//             <label htmlFor="title" className="form-label">
//               Quiz Name
//             </label>
//             <div className="mb-4">
//               <input
//                 type="text"
//                 className="form-control"
//                 id="title"
//                 value={quiz.title}
//                 onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
//               />
//             </div>

//             <div className="mb-4">
//               <textarea
//                 id="description"
//                 className="form-control"
//                 rows={10}
//                 value={quiz.description}
//                 onChange={(e) =>
//                   setQuiz({ ...quiz, description: e.target.value })
//                 }
//               />
//             </div>

//             <div className="row mb-3">
//               <label
//                 htmlFor="type"
//                 className="d-flex col-3 col-form-label justify-content-end"
//               >
//                 Quiz Type
//               </label>
//               <div className="col-9">
//                 <select
//                   id="type"
//                   className="form-select"
//                   value={quiz.type}
//                   onChange={(e) => setQuiz({ ...quiz, type: e.target.value })}
//                 >
//                   <option value="GRADED_QUIZ">Graded Quiz</option>
//                   <option value="PRACTICE_QUIZ">Practice Quiz</option>
//                   <option value="GRADED_SURVEY">Graded Survey</option>
//                   <option value="UNGRADED_SURVEY">Ungraded Survey</option>
//                 </select>
//               </div>
//             </div>

//             <div className="row mb-3">
//               <label
//                 htmlFor="points"
//                 className="d-flex col-3 col-form-label justify-content-end"
//               >
//                 Points
//               </label>
//               <div className="col-9">
//                 <input
//                   type="number"
//                   className="form-control"
//                   id="points"
//                   min="0"
//                   value={quiz.points}
//                   onChange={(e) => {
//                     const value = parseInt(e.target.value);
//                     if (!isNaN(value) && value >= 0) {
//                       setQuiz({ ...quiz, points: value });
//                     }
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="row mb-3">
//               <label
//                 htmlFor="assignmentGroup"
//                 className="d-flex col-3 col-form-label justify-content-end"
//               >
//                 Assignment Group
//               </label>
//               <div className="col-9">
//                 <select
//                   id="assignmentGroup"
//                   className="form-select"
//                   value={quiz.assignmentGroup}
//                   onChange={(e) =>
//                     setQuiz({ ...quiz, assignmentGroup: e.target.value })
//                   }
//                 >
//                   <option value="QUIZZES">Quizzes</option>
//                   <option value="EXAMS">Exams</option>
//                   <option value="ASSIGNMENTS">Assignments</option>
//                   <option value="PROJECT">Project</option>
//                 </select>
//               </div>
//             </div>

//             <div className="row mb-3">
//               <label className="d-flex col-3 col-form-label justify-content-end">
//                 Quiz Options
//               </label>
//               <div className="col-9">
//                 <div className="form-check mb-2">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     id="shuffleAnswers"
//                     checked={quiz.shuffleAnswers}
//                     onChange={(e) =>
//                       setQuiz({ ...quiz, shuffleAnswers: e.target.checked })
//                     }
//                   />
//                   <label className="form-check-label" htmlFor="shuffleAnswers">
//                     Shuffle Answers
//                   </label>
//                 </div>
//                 <div className="form-check mb-2">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     id="multipleAttempts"
//                     checked={quiz.multipleAttempts}
//                     onChange={(e) =>
//                       setQuiz({ ...quiz, multipleAttempts: e.target.checked })
//                     }
//                   />
//                   <label
//                     className="form-check-label"
//                     htmlFor="multipleAttempts"
//                   >
//                     Multiple Attempts
//                   </label>
//                 </div>
//                 {quiz.multipleAttempts && (
//                   <div className="mb-2">
//                     <label htmlFor="maxAttempts">Maximum Attempts:</label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       id="maxAttempts"
//                       min="1"
//                       value={quiz.maxAttempts}
//                       onChange={(e) => {
//                         const value = parseInt(e.target.value);
//                         if (!isNaN(value) && value >= 1) {
//                           setQuiz({ ...quiz, maxAttempts: value });
//                         }
//                       }}
//                     />
//                   </div>
//                 )}
//                 <div className="form-check mb-2">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     id="showCorrectAnswers"
//                     checked={quiz.showCorrectAnswers}
//                     onChange={(e) =>
//                       setQuiz({ ...quiz, showCorrectAnswers: e.target.checked })
//                     }
//                   />
//                   <label
//                     className="form-check-label"
//                     htmlFor="showCorrectAnswers"
//                   >
//                     Show Correct Answers
//                   </label>
//                 </div>
//                 <div className="form-check mb-2">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     id="oneQuestionAtTime"
//                     checked={quiz.oneQuestionAtTime}
//                     onChange={(e) =>
//                       setQuiz({ ...quiz, oneQuestionAtTime: e.target.checked })
//                     }
//                   />
//                   <label
//                     className="form-check-label"
//                     htmlFor="oneQuestionAtTime"
//                   >
//                     One Question at a Time
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <div className="row mb-5">
//               <label
//                 htmlFor="assign-to"
//                 className="d-flex col-3 col-form-label justify-content-end"
//               >
//                 Assign
//               </label>
//               <div className="col-9">
//                 <div className="d-flex flex-column form-control">
//                   <label
//                     htmlFor="assign-to"
//                     className="form-label mt-2 fw-bold"
//                   >
//                     Assign to
//                   </label>
//                   <div className="mb-3">
//                     <div className="form-control" style={{ height: "40px" }}>
//                       <div className="input-group">
//                         <div
//                           className="border border-0 rounded-2 bg-secondary"
//                           style={{ width: "150px", height: "27px" }}
//                         >
//                           <span className="ms-2">Everyone</span>
//                           <span
//                             className="input-group-text bg-secondary border border-0 float-end"
//                             style={{ left: "100px", height: "27px" }}
//                           >
//                             <RxCross2 className="fs-4" />
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <label htmlFor="due-date" className="form-label mt-2 fw-bold">
//                     Due
//                   </label>
//                   <div className="input-group rounded-2 mb-3">
//                     <input
//                       type="date"
//                       id="due-date"
//                       className="form-control"
//                       value={quiz.dueDate?.substring(0, 10) || ""}
//                       onChange={(e) =>
//                         setQuiz({
//                           ...quiz,
//                           dueDate: e.target.value,
//                         })
//                       }
//                       ref={dateInputRef}
//                     />
//                   </div>

//                   <div className="d-flex justify-content-between">
//                     <div className="me-2">
//                       <label
//                         htmlFor="available-from"
//                         className="form-label mt-2 fw-bold"
//                       >
//                         Available from
//                       </label>
//                       <div className="input-group rounded-2 mb-3">
//                         <input
//                           type="date"
//                           id="available-from"
//                           className="form-control"
//                           value={quiz.availableFrom?.substring(0, 10) || ""}
//                           onChange={(e) =>
//                             setQuiz({
//                               ...quiz,
//                               availableFrom: e.target.value,
//                             })
//                           }
//                           ref={dateInputRef}
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="available-until"
//                         className="form-label mt-2 fw-bold"
//                       >
//                         Until
//                       </label>
//                       <div className="input-group rounded-2 mb-3">
//                         <input
//                           type="date"
//                           id="available-until"
//                           className="form-control"
//                           value={quiz.availableUntil?.substring(0, 10) || ""}
//                           onChange={(e) =>
//                             setQuiz({
//                               ...quiz,
//                               availableUntil: e.target.value,
//                             })
//                           }
//                           ref={dateInputRef}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="btn btn-danger float-end"
//             onClick={handleSave}
//           >
//             Save
//           </button>
//           <button
//             type="button"
//             className="btn btn-secondary float-end me-2"
//             onClick={handleCancel}
//           >
//             Cancel
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
