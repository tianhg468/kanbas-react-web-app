import { IoMdSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineAssignment } from "react-icons/md";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { Link, useParams, useNavigate } from "react-router-dom";
import FacultyRoute from "../../Account/FacultyRoute";
import {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignments,
} from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import EachAssignmentControlButtons from "./EachAssignmentControlButtons";
import * as client from "./client";

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

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };

  const createAssignment = async () => {
    if (!cid) return;
    const newAssignment = {
      title: "New Assignment",
      description: "New Assignment Description",
      course: cid,
      points: 100,
      dueDate: "2024-12-31",
      availableFrom: "2024-01-01",
      availableUntil: "2024-12-31",
    };
    const assignment = await client.createAssignment(cid, newAssignment);
    dispatch(addAssignment(assignment));
    navigate(`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`);
  };

  const removeAssignment = async (assignmentId: string) => {
    if (!cid) return;
    await client.deleteAssignment(cid, assignmentId);
    dispatch(deleteAssignment(assignmentId));
    setShowDialog(false);
    setAssignmentToDelete(null);
  };

  const saveAssignment = async (assignment: any) => {
    if (!cid) return;
    await client.updateAssignment(cid, assignment._id, assignment);
    dispatch(updateAssignment(assignment));
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const confirmDelete = (assignmentID: string) => {
    const assignToDelete = assignments.find((a: any) => a._id === assignmentID);
    if (assignToDelete) {
      setAssignmentToDelete(assignToDelete);
      setShowDialog(true);
    }
  };

  return (
    <div>
      <div>
        <div className="input-group float-start rounded-2 w-50 mb-5 mt-3">
          <span className="input-group-text bg-white">
            <IoMdSearch className="fs-4" />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search..."
          />
        </div>
        <FacultyRoute>
          <div>
            <button
              className="float-end btn btn-md btn-danger mb-5 mt-3"
              onClick={createAssignment}
            >
              <FaPlus className="fs-6 mb-1" /> Assignment
            </button>
          </div>

          <div>
            <button className="float-end btn btn-md btn-secondary me-2 mb-5 mt-3">
              <FaPlus className="fs-6 mb-1" /> Group
            </button>
          </div>
        </FacultyRoute>
      </div>

      <div className="wd-float-done"></div>

      <ul className="list-group rounded-0">
        <li className="list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS
            <FacultyRoute>
              <AssignmentControlButtons />
            </FacultyRoute>
            <div className="float-end border border-dark border-1 rounded-4 me-2">
              40% of total
            </div>
          </div>
          <ul className="list-group rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <li key={assignment._id} className="list-group-item p-3 ps-1">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <BsGripVertical className="me-2 fs-3" />
                      <MdOutlineAssignment className="me-4 text-success fs-3" />
                      <div>
                        {currentUser.role === "FACULTY" ? (
                          <Link
                            className="text-decoration-none text-dark"
                            to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                          >
                            {assignment.title}
                          </Link>
                        ) : (
                          <span className="text-dark">{assignment.title}</span>
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
                  onClick={() =>
                    removeAssignment(assignmentToDelete?._id as string)
                  }
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
