import { useParams, Navigate, Route, Routes } from "react-router-dom";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { useLocation } from "react-router";
import { IoIosArrowForward } from "react-icons/io";

export default function Courses() {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);
  var lastWord = "";

  if (parts[parts.length - 2] == "Assignments") {
    lastWord = parts[parts.length - 2] + " > " + parts[parts.length - 1];
  } else {
    lastWord = parts[parts.length - 1];
  }

  const { cid } = useParams<{ cid: string }>();
  if (!cid) {
    return <div>No Course ID found!</div>;
  }
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        Course {cid}
        <span className="text-dark">
          <IoIosArrowForward />
          {lastWord}
        </span>
      </h2>

      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block me-5">
          <CoursesNavigation cid={cid} />
        </div>
        <div className="flex-fill me-3">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h2>Piazza</h2>} />
            <Route path="Zoom" element={<h2>Zoom</h2>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Quizzes" element={<h2>Quizzes</h2>} />
            <Route path="Grades" element={<h2>Grades</h2>} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
