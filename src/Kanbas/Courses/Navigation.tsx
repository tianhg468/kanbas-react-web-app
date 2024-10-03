import { Link } from "react-router-dom";
import { useLocation } from "react-router";

export default function CoursesNavigation({ cid }: { cid: string }) {
  const { pathname } = useLocation();
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <Link
        id="wd-course-home-link"
        to={`/Kanbas/Courses/${cid}/Home`}
        className={`list-group-item border border-0 text-danger ${
          pathname.includes("Home") ? "active" : ""
        }`}
      >
        Home
      </Link>

      <Link
        id="wd-course-modules-link"
        to={`/Kanbas/Courses/${cid}/Modules`}
        className={`list-group-item border border-0 text-danger ${
          pathname.includes("Modules") ? "active" : ""
        }`}
      >
        Modules
      </Link>

      <Link
        id="wd-course-piazza-link"
        to={`/Kanbas/Courses/${cid}/Piazza`}
        className={`list-group-item border border-0 text-danger ${
          pathname.includes("Piazza") ? "active" : ""
        }`}
      >
        Piazza
      </Link>

      <Link
        id="wd-course-zoom-link"
        to={`/Kanbas/Courses/${cid}/Zoom`}
        className={`list-group-item border border-0 text-danger ${
          pathname.includes("Zoom") ? "active" : ""
        }`}
      >
        Zoom
      </Link>

      <Link
        id="wd-course-quizzes-link"
        to={`/Kanbas/Courses/${cid}/Assignments`}
        className={`list-group-item border border-0 text-danger ${
          pathname.includes("Assignments") ? "active" : ""
        }`}
      >
        Assignments
      </Link>

      <Link
        id="wd-course-assignments-link"
        to={`/Kanbas/Courses/${cid}/Quizzes`}
        className={`list-group-item border border-0 text-danger ${
          pathname.includes("Quizzes") ? "active" : ""
        }`}
      >
        Quizzes
      </Link>

      <Link
        id="wd-course-grades-link"
        to={`/Kanbas/Courses/${cid}/Grades`}
        className={`list-group-item border border-0 text-danger ${
          pathname.includes("Grades") ? "active" : ""
        }`}
      >
        Grades
      </Link>

      <Link
        id="wd-course-people-link"
        to={`/Kanbas/Courses/${cid}/People`}
        className={`list-group-item border border-0 text-danger ${
          pathname.includes("People") ? "active" : ""
        }`}
      >
        People
      </Link>
    </div>
  );
}
