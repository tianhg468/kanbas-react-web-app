import { useParams, Navigate, Route, Routes } from "react-router-dom";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";

export default function Courses() {
  const { cid } = useParams<{ cid: string }>();
  if (!cid) {
    return <div>No Course ID found!</div>;
  }
  return (
    <div id="wd-courses">
      <h2>Course {cid}</h2>
      <hr />
      <table>
        <tr>
          <td valign="top">
            <CoursesNavigation cid={cid} />
          </td>
          <td valign="top">
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
              <Route path="People" element={<h2>People</h2>} />
            </Routes>
          </td>
        </tr>
      </table>
    </div>
  );
}
