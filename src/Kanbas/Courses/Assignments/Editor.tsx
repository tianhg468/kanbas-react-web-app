import { useParams, useNavigate } from "react-router-dom";
import { LuCalendarDays } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import React, { useRef, useState, useEffect } from "react";
import { addAssignment, updateAssignment } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";

export default function AssignmentEditor() {
  const { aid, cid } = useParams();
  const dispatch = useDispatch();
  const [assignment, setAssignment] = useState({
    title: "New Assignment",
    description: "New Assignment Description",
    course: cid,
    points: 100,
    dueDate: new Date().toISOString().split("T")[0],
    availableFrom: new Date().toISOString().split("T")[0],
    availableUntil: new Date().toISOString().split("T")[0],
  });

  const dateInputRef = useRef<HTMLInputElement>(null);
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignment = async () => {
      if (aid && aid !== "new") {
        const existingAssignment = assignments.find((a: any) => a._id === aid);
        if (existingAssignment) {
          setAssignment(existingAssignment);
        }
      }
    };
    fetchAssignment();
  }, [aid, assignments]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!cid) {
      console.error("No course ID provided");
      return;
    }

    try {
      let savedAssignment;
      if (!aid) {
        console.error("No assignment ID provided");
        return;
      }
      if (aid === "new") {
        // Create new assignment
        savedAssignment = await client.createAssignment(cid, {
          ...assignment,
          course: cid,
        });
        dispatch(addAssignment(savedAssignment));
      } else {
        // Update existing assignment
        savedAssignment = await client.updateAssignment(cid, aid, assignment);
        dispatch(updateAssignment(savedAssignment));
      }

      // Navigate after successful save
      navigate(`/Kanbas/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div>
      <div id="wd-assignments-editor">
        <form>
          <div className="border border-start-0 border-top-0 border-end-0 mb-2">
            {/* Assignment Name */}
            <label htmlFor="title" className="form-label">
              Assignment Name
            </label>
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                id="title"
                value={assignment.title}
                onChange={(e) =>
                  setAssignment({ ...assignment, title: e.target.value })
                }
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <textarea
                id="description"
                className="form-control"
                rows={10}
                value={assignment.description}
                onChange={(e) =>
                  setAssignment({ ...assignment, description: e.target.value })
                }
              />
            </div>

            {/* Points */}
            <div className="row mb-3">
              <label
                htmlFor="points"
                className="d-flex col-3 col-form-label justify-content-end"
              >
                Points
              </label>
              <div className="col-9">
                <input
                  type="number"
                  className="form-control"
                  id="points"
                  min="0"
                  value={assignment.points || ""} // Use empty string when 0
                  onChange={(e) => {
                    const inputValue = e.target.value;

                    // If empty string, set points to 0
                    if (inputValue === "") {
                      setAssignment({
                        ...assignment,
                        points: 0,
                      });
                      return;
                    }

                    // Convert to number only if it's a valid number
                    const value = parseInt(inputValue);
                    if (!isNaN(value) && value >= 0) {
                      setAssignment({
                        ...assignment,
                        points: value,
                      });
                    }
                  }}
                  onBlur={(e) => {
                    // On blur, ensure we have a valid number
                    const value = parseInt(e.target.value);
                    setAssignment({
                      ...assignment,
                      points: isNaN(value) || value < 0 ? 0 : value,
                    });
                  }}
                />
              </div>
            </div>

            {/* Assignment Group */}
            <div className="row mb-3">
              <label
                htmlFor="group"
                className="d-flex col-3 col-form-label justify-content-end"
              >
                Assignment Group
              </label>
              <div className="col-9">
                <select id="group" className="form-select">
                  <option value="ASSIGNMENTS" selected>
                    ASSIGNMENTS
                  </option>
                  <option value="QUIZZES">QUIZZES</option>
                  <option value="EXAMS">EXAMS</option>
                  <option value="PROJECT">PROJECT</option>
                </select>
              </div>
            </div>

            {/* Display Grade as */}
            <div className="row mb-3">
              <label
                htmlFor="display-grade-as"
                className="d-flex col-3 col-form-label justify-content-end"
              >
                Display Grade as
              </label>
              <div className="col-9">
                <select id="display-grade-as" className="form-select">
                  <option value="PERCENTAGE" selected>
                    Percentage
                  </option>
                  <option value="LETTER">Letter</option>
                </select>
              </div>
            </div>

            {/* Submission Type */}
            <div className="row mb-3">
              <label
                htmlFor="submission-type"
                className="d-flex col-3 col-form-label justify-content-end"
              >
                Submission Type
              </label>
              <div className="col-9">
                <div className="d-flex flex-column form-control">
                  <select
                    id="submission-type"
                    className="form-select mt-2 mb-4"
                  >
                    <option value="ONLINE" selected>
                      Online
                    </option>
                    <option value="CLASS">In Class</option>
                  </select>

                  <div>
                    <label className="fw-bold mb-3">Online Entry Options</label>
                    <br />
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="text-entry"
                        name="check-genre"
                      />
                      <label className="form-check-label" htmlFor="text-entry">
                        Text Entry
                      </label>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="website-url"
                        name="check-genre"
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="website-url">
                        Website URL
                      </label>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="media-recordings"
                        name="check-genre"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="media-recordings"
                      >
                        Media Recordings
                      </label>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="student-annotation"
                        name="check-genre"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="student-annotation"
                      >
                        Student Annotation
                      </label>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="file-upload"
                        name="check-genre"
                      />
                      <label className="form-check-label" htmlFor="file-upload">
                        File Uploads
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Assign Section */}
            <div className="row mb-5">
              <label
                htmlFor="assign-to"
                className="d-flex col-3 col-form-label justify-content-end"
              >
                Assign
              </label>
              <div className="col-9">
                <div className="d-flex flex-column form-control">
                  <label
                    htmlFor="assign-to"
                    className="form-label mt-2 fw-bold"
                  >
                    Assign to
                  </label>
                  <div className="mb-3">
                    <div className="form-control" style={{ height: "40px" }}>
                      <div className="input-group">
                        <div
                          className="border border-0 rounded-2 bg-secondary"
                          style={{ width: "150px", height: "27px" }}
                        >
                          <span className="ms-2">Everyone</span>
                          <span
                            className="input-group-text bg-secondary border border-0 float-end"
                            style={{ left: "100px", height: "27px" }}
                          >
                            <RxCross2 className="fs-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Due Date */}
                  <label htmlFor="due-date" className="form-label mt-2 fw-bold">
                    Due
                  </label>
                  <div className="input-group rounded-2 mb-3">
                    <input
                      type="date"
                      id="due-date"
                      className="form-control"
                      value={assignment.dueDate?.substring(0, 10) || ""}
                      onChange={(e) =>
                        setAssignment({
                          ...assignment,
                          dueDate: e.target.value,
                        })
                      }
                      ref={dateInputRef}
                    />
                  </div>

                  {/* Available From/Until */}
                  <div className="d-flex justify-content-between">
                    <div className="me-2">
                      <label
                        htmlFor="available-from"
                        className="form-label mt-2 fw-bold"
                      >
                        Available from
                      </label>
                      <div className="input-group rounded-2 mb-3">
                        <input
                          type="date"
                          id="available-from"
                          className="form-control"
                          value={
                            assignment.availableFrom?.substring(0, 10) || ""
                          }
                          onChange={(e) =>
                            setAssignment({
                              ...assignment,
                              availableFrom: e.target.value,
                            })
                          }
                          ref={dateInputRef}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="available-until"
                        className="form-label mt-2 fw-bold"
                      >
                        Until
                      </label>
                      <div className="input-group rounded-2 mb-3">
                        <input
                          type="date"
                          id="available-until"
                          className="form-control"
                          value={
                            assignment.availableUntil?.substring(0, 10) || ""
                          }
                          onChange={(e) =>
                            setAssignment({
                              ...assignment,
                              availableUntil: e.target.value,
                            })
                          }
                          ref={dateInputRef}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Buttons */}
          <button
            type="submit"
            className="btn btn-danger float-end"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary float-end me-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

// import { useParams, useNavigate } from "react-router-dom";
// import { LuCalendarDays } from "react-icons/lu";
// import { RxCross2 } from "react-icons/rx";
// import { FaCalendarAlt } from "react-icons/fa";
// import React, { useRef } from "react";
// import { useState, useEffect } from "react";

// import { addAssignment, deleteAssignment, updateAssignment } from "./reducer";
// import { useSelector, useDispatch } from "react-redux";

// export default function AssignmentEditor() {
//   const { aid, cid } = useParams();
//   const dispatch = useDispatch();
//   const [assignment, setAssignment] = useState({
//     _id: aid,
//     title: "New Assignment",
//     description: "New Assignment Description",
//     course: cid,
//     points: 100,
//     dueDate: "yyyy-mm-dd",
//     availableFrom: "yyyy-mm-dd",
//     availableUntil: "yyyy-mm-dd",
//   });

//   const dateInputRef1 = useRef<HTMLInputElement>(null);
//   const handleIconClick1 = () => {
//     if (dateInputRef1.current) {
//       dateInputRef1.current.showPicker();
//     }
//   };
//   const dateInputRef2 = useRef<HTMLInputElement>(null);
//   const handleIconClick2 = () => {
//     if (dateInputRef2.current) {
//       dateInputRef2.current.showPicker();
//     }
//   };
//   const dateInputRef3 = useRef<HTMLInputElement>(null);
//   const handleIconClick3 = () => {
//     if (dateInputRef3.current) {
//       dateInputRef3.current.showPicker();
//     }
//   };
//   const { assignments } = useSelector((state: any) => state.assignmentsReducer);
//   const navigate = useNavigate();
//   const [isNewAssignment, setIsNewAssignment] = useState(true);

//   useEffect(() => {
//     if (aid) {
//       const existingAssignment = assignments.find((a: any) => a._id === aid);
//       if (existingAssignment) {
//         setAssignment(existingAssignment);
//         setIsNewAssignment(false);
//       }
//     }
//   }, [aid, assignments]);

//   const handleSave = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isNewAssignment) {
//       dispatch(addAssignment(assignment));
//     } else {
//       dispatch(updateAssignment(assignment));
//     }
//     navigate(`/Kanbas/Courses/${cid}/Assignments`);
//   };

//   const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     navigate(`/Kanbas/Courses/${cid}/Assignments`);
//   };

//   return (
//     <div>
//       <div id="wd-assignments-edior">
//         <form>
//           <div className="border border-start-0 border-top-0 border-end-0 mb-2">
//             <label htmlFor="wd-name" className="form-label">
//               Assignment Name
//             </label>

//             <div className="mb-4">
//               <input
//                 type="text"
//                 className="form-control"
//                 id="wd-name"
//                 value={assignment.title}
//                 onChange={(e) =>
//                   setAssignment({ ...assignment, title: e.target.value })
//                 }
//               />
//             </div>
//             <div className="mb-4">
//               <textarea
//                 id="wd-description"
//                 className="form-control"
//                 rows={10}
//                 value={assignment.description}
//                 onChange={(e) =>
//                   setAssignment({ ...assignment, description: e.target.value })
//                 }
//               ></textarea>
//             </div>

//             <div className="row mb-3">
//               <label
//                 htmlFor="wd-points"
//                 className="d-flex col-3 col-form-label justify-content-end "
//               >
//                 Points
//               </label>
//               <div className="col-9">
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="wd-points"
//                   value={
//                     assignment.points !== undefined
//                       ? assignment.points.toString()
//                       : "100"
//                   }
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     const numberValue = Number(value);
//                     if (!isNaN(numberValue) && numberValue >= 0) {
//                       setAssignment({
//                         ...assignment,
//                         points: numberValue,
//                       });
//                     } else {
//                       setAssignment({ ...assignment, points: 0 });
//                     }
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="row mb-3">
//               <label
//                 htmlFor="wd-group"
//                 className="d-flex col-3 col-form-label justify-content-end "
//               >
//                 Assignment Group
//               </label>
//               <div className="col-9">
//                 <select id="wd-group" className="form-select">
//                   <option value="ASSIGNMENTS" selected>
//                     ASSIGNMENTS
//                   </option>
//                   <option value="QUIZZES">QUIZZES</option>
//                   <option value="EXAMS">EXAMS</option>
//                   <option value="PROJECT">PROJECT</option>
//                 </select>
//               </div>
//             </div>

//             <div className="row mb-3">
//               <label
//                 htmlFor="wd-display-grade-as"
//                 className="d-flex col-3 col-form-label justify-content-end "
//               >
//                 Display Grade as
//               </label>
//               <div className="col-9">
//                 <select id="wd-display-grade-as" className="form-select">
//                   <option value="PERCENTAGE" selected>
//                     Percentage
//                   </option>
//                   <option value="LETTER">Letter</option>
//                 </select>
//               </div>
//             </div>

//             <div className="row mb-3">
//               <label
//                 htmlFor="wd-submission-type"
//                 className="d-flex col-3 col-form-label justify-content-end "
//               >
//                 Submission Type
//               </label>
//               <div className="col-9 ">
//                 <div className="d-flex flex-column form-control">
//                   <select
//                     id="wd-submission-type"
//                     className="form-select mt-2 mb-4"
//                   >
//                     <option value="ONLINE" selected>
//                       Online
//                     </option>
//                     <option value="CLASS">In Class</option>
//                   </select>
//                   <div>
//                     <label className="fw-bold mb-3">Online Entry Options</label>
//                     <br />

//                     <div className="form-check mb-3">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         id="wd-text-entry"
//                         name="check-genre"
//                       />
//                       <label
//                         className="form-check-label"
//                         htmlFor="wd-text-entry"
//                       >
//                         Text Entry
//                       </label>
//                     </div>
//                     <div className="form-check mb-3">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         id="wd-website-url"
//                         name="check-genre"
//                         checked
//                       />
//                       <label
//                         className="form-check-label"
//                         htmlFor="wd-website-url"
//                       >
//                         Website URL
//                       </label>
//                     </div>
//                     <div className="form-check mb-3">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         id="wd-media-recordings"
//                         name="check-genre"
//                       />
//                       <label
//                         className="form-check-label"
//                         htmlFor="wd-media-recordings"
//                       >
//                         Media Recordings
//                       </label>
//                     </div>
//                     <div className="form-check mb-3">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         id="wd-student-annotation"
//                         name="check-genre"
//                       />
//                       <label
//                         className="form-check-label"
//                         htmlFor="wd-student-annotation"
//                       >
//                         Student Annotation
//                       </label>
//                     </div>
//                     <div className="form-check mb-3">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         id="wd-file-upload"
//                         name="check-genre"
//                       />
//                       <label
//                         className="form-check-label"
//                         htmlFor="wd-file-upload"
//                       >
//                         File Uploads
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="row mb-5">
//               <label
//                 htmlFor="wd-assign-to"
//                 className="d-flex col-3 col-form-label justify-content-end "
//               >
//                 Assign
//               </label>
//               <div className="col-9 ">
//                 <div className="d-flex flex-column form-control">
//                   <label
//                     htmlFor="wd-assign-to"
//                     className="form-label mt-2 fw-bold"
//                   >
//                     Assign to
//                   </label>
//                   <div className="mb-3">
//                     <div
//                       className="form-control "
//                       id="wd-assign-to"
//                       style={{
//                         height: "40px",
//                       }}
//                     >
//                       <div className="input-group">
//                         <div
//                           className="border border-0 rounded-2 bg-secondary"
//                           style={{
//                             width: "150px",
//                             height: "27px",
//                           }}
//                         >
//                           <span className="ms-2">Everyone</span>
//                           <span
//                             id="wd-assignments-icon"
//                             className="input-group-text bg-secondary border border-0 float-end"
//                             style={{
//                               left: "100px",
//                               height: "27px",
//                             }}
//                           >
//                             <RxCross2 className="fs-4" />
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <label
//                     htmlFor="wd-due-date"
//                     className="form-label mt-2 fw-bold"
//                   >
//                     Due
//                   </label>
//                   <div className="input-group rounded-2 mb-3">
//                     <input
//                       type="date"
//                       id="wd-due-date"
//                       className="form-control custom-date-input"
//                       value={
//                         assignment.dueDate !== undefined
//                           ? assignment.dueDate.substring(0, 10)
//                           : ""
//                       }
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         if (value) {
//                           setAssignment({
//                             ...assignment,
//                             dueDate: value,
//                           });
//                         } else {
//                           setAssignment({
//                             ...assignment,
//                             dueDate: "",
//                           });
//                         }
//                       }}
//                       ref={dateInputRef1}
//                     />

//                     <span className="input-group-text bg-secondary">
//                       <LuCalendarDays
//                         onClick={handleIconClick1}
//                         className="fs-4"
//                       />
//                     </span>
//                   </div>
//                   <div className="d-flex justify-content-between">
//                     <div className="me-2">
//                       <label
//                         htmlFor="wd-available-from"
//                         className="form-label mt-2 fw-bold "
//                       >
//                         Available from
//                       </label>
//                       <div className="input-group rounded-2 mb-3">
//                         <input
//                           type="date"
//                           id="wd-available-from"
//                           className="form-control custom-date-input"
//                           value={
//                             assignment.availableFrom !== undefined
//                               ? assignment.availableFrom.substring(0, 10)
//                               : ""
//                           }
//                           onChange={(e) => {
//                             const value = e.target.value;
//                             if (value) {
//                               setAssignment({
//                                 ...assignment,
//                                 availableFrom: value,
//                               });
//                             } else {
//                               setAssignment({
//                                 ...assignment,
//                                 availableFrom: "",
//                               });
//                             }
//                           }}
//                           ref={dateInputRef2}
//                         />
//                         <span className="input-group-text bg-secondary">
//                           <LuCalendarDays
//                             onClick={handleIconClick2}
//                             className="fs-4"
//                           />
//                         </span>
//                       </div>
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="wd-available-until"
//                         className="form-label mt-2 fw-bold"
//                       >
//                         Until
//                       </label>
//                       <div className="input-group rounded-2 mb-3">
//                         <input
//                           type="date"
//                           id="wd-available-until"
//                           className="form-control custom-date-input"
//                           value={
//                             assignment.availableUntil !== undefined
//                               ? assignment.availableUntil.substring(0, 10)
//                               : ""
//                           }
//                           onChange={(e) => {
//                             const value = e.target.value;
//                             if (value) {
//                               setAssignment({
//                                 ...assignment,
//                                 availableUntil: value,
//                               });
//                             } else {
//                               setAssignment({
//                                 ...assignment,
//                                 availableUntil: "",
//                               });
//                             }
//                           }}
//                           ref={dateInputRef3}
//                         />
//                         <span className="input-group-text bg-secondary">
//                           <LuCalendarDays
//                             onClick={handleIconClick3}
//                             className="fs-4"
//                           />
//                         </span>
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
//             type="submit"
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
