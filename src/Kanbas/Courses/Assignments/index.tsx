import { IoMdSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineAssignment } from "react-icons/md";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { Link } from "react-router-dom";

export default function Assignments() {
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

        <div>
          <button
            id="wd-add-assignment"
            className="float-end btn btn-md btn-danger mb-5 mt-3"
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
      </div>
      <div className="wd-float-done"></div>

      <ul className="list-group rounded-0">
        <li className="list-group-item p-0 mb-5 fs-5 border-gray">
          <div id="wd-assignments-title" className="p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS
            <AssignmentControlButtons />
            <div className="float-end border border-dark border-1 rounded-4 me-2">
              40% of total
            </div>
          </div>
          <ul id="wd-assignment-list" className="list-group rounded-0">
            <li className="wd-assignment-list-item list-group-item p-3 ps-1">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <MdOutlineAssignment className="me-4 text-success fs-3" />
                  <div>
                    <Link
                      className="wd-assignment-link text-decoration-none text-dark "
                      to={"/Kanbas/Courses/1234/Assignments/A1"}
                    >
                      A1
                    </Link>
                    <br />
                    <span className="text-danger">Multiple Modules</span> |
                    <strong> Not available until </strong>May 6 at 12:00am |
                    <br />
                    <strong>Due </strong>May 13 at 11:59pm | 100 pts
                  </div>
                </div>
                <LessonControlButtons />
              </div>
            </li>
            <li className="wd-assignment-list-item list-group-item p-3 ps-1">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <MdOutlineAssignment className="me-4 text-success fs-3" />
                  <div>
                    <Link
                      className="wd-assignment-link text-decoration-none text-dark"
                      to={"/Kanbas/Courses/1234/Assignments/A2"}
                    >
                      A2
                    </Link>
                    <br />
                    <span className="text-danger">Multiple Modules</span> |
                    <strong> Not available until </strong>May 13 at 12:00am |
                    <br />
                    <strong>Due </strong>May 20 at 11:59pm | 100 pts
                  </div>
                </div>
                <LessonControlButtons />
              </div>
            </li>
            <li className="wd-assignment-list-item list-group-item p-3 ps-1">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <MdOutlineAssignment className="me-4 text-success fs-3" />
                  <div>
                    <Link
                      className="wd-assignment-link text-decoration-none text-dark"
                      to={"/Kanbas/Courses/1234/Assignments/A3"}
                    >
                      A3
                    </Link>
                    <br />
                    <span className="text-danger">Multiple Modules</span> |
                    <strong> Not available until </strong>May 20 at 12:00am |
                    <br />
                    <strong>Due </strong>May 27 at 11:59pm | 100 pts
                  </div>
                </div>
                <LessonControlButtons />
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
