import { IoMdSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineAssignment } from "react-icons/md";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { Link, useParams, useNavigate } from "react-router-dom";
import FacultyRoute from "../../Account/FacultyRoute";
import { addAssignment, deleteAssignment, updateAssignment } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import EachAssignmentControlButtons from "./EachAssignmentControlButtons";

export default function Assignments() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  type Assignment = {
    _id: string;
    title: string;
    availableUntil: string;
    dueDate: string;
    points: number;
    course: string;
  };
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] =
    useState<Assignment | null>(null);

  const confirmDelete = (assignmentID: string) => {
    const assignToDelete = assignments.find((a: any) => a._id === assignmentID);
    if (assignToDelete) {
      setAssignmentToDelete(assignToDelete);
      setShowDialog(true);
    }
  };

  const handleDelete = () => {
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete._id));
    }
    setShowDialog(false);
    setAssignmentToDelete(null);
  };

  return (
    <div>
      <div>
        <div
          id="wd-assignments"
          className="input-group float-start rounded-2 w-50 mb-5 mt-3"
        >
          <span id="wd-assignments-icon" className="input-group-text bg-white">
            <IoMdSearch className="fs-4" />
          </span>
          <input
            type="text"
            id="wd-search-assignment"
            className="form-control border-start-0"
            placeholder="Search..."
          />
        </div>
        <FacultyRoute>
          <div>
            <button
              id="wd-add-assignment"
              className="float-end btn btn-md btn-danger mb-5 mt-3"
              onClick={() => {
                navigate(
                  `/Kanbas/Courses/${cid}/Assignments/${new Date()
                    .getTime()
                    .toString()}`
                );
              }}
            >
              <FaPlus className="fs-6 mb-1" /> Assignment
            </button>
          </div>

          <div>
            <button
              id="wd-add-assignment-group"
              className="float-end btn btn-md btn-secondary me-2 mb-5 mt-3"
            >
              <FaPlus className="fs-6 mb-1" /> Group
            </button>
          </div>
        </FacultyRoute>
      </div>

      <div className="wd-float-done"></div>

      <ul className="list-group rounded-0">
        <li className="list-group-item p-0 mb-5 fs-5 border-gray">
          <div id="wd-assignments-title" className="p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS
            <FacultyRoute>
              <AssignmentControlButtons />
            </FacultyRoute>
            <div className="float-end border border-dark border-1 rounded-4 me-2">
              40% of total
            </div>
          </div>
          <ul id="wd-assignment-list" className="list-group rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <li
                  key={assignment._id}
                  className="wd-assignment-list-item list-group-item p-3 ps-1"
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <BsGripVertical className="me-2 fs-3" />
                      <MdOutlineAssignment className="me-4 text-success fs-3" />
                      <div>
                        {currentUser.role === "FACULTY" ? (
                          <Link
                            className="wd-assignment-link text-decoration-none text-dark"
                            to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                          >
                            {assignment.title}
                          </Link>
                        ) : (
                          <span className="wd-assignment-title text-dark">
                            {assignment.title}
                          </span>
                        )}
                        <br />
                        <span className="text-danger">Multiple Modules</span> |
                        <strong> Not available until </strong>
                        {assignment.availableUntil} |
                        <br />
                        <strong>Due </strong>
                        {assignment.dueDate} | {assignment.points}pts
                      </div>
                    </div>
                    <FacultyRoute>
                      <EachAssignmentControlButtons
                        assignmentId={assignment._id}
                        confirmDelete={confirmDelete}
                      />
                    </FacultyRoute>
                  </div>
                </li>
              ))}
          </ul>
        </li>
      </ul>
      {/* Confirmation Dialog */}
      {showDialog && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDialog(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete the assignment{" "}
                  {assignmentToDelete?.title}?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowDialog(false);
                    handleDelete();
                  }}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setShowDialog(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
