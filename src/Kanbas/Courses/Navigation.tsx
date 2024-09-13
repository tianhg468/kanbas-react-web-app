import { Link } from "react-router-dom";

export default function CoursesNavigation({ cid }: { cid: string }) {
  return (
    <div id="wd-courses-navigation">
      <Link id="wd-course-home-link" to={`/Kanbas/Courses/${cid}/Home`}>
        Home
      </Link>
      <br />
      <Link id="wd-course-modules-link" to={`/Kanbas/Courses/${cid}/Modules`}>
        Modules
      </Link>
      <br />
      <Link id="wd-course-piazza-link" to={`/Kanbas/Courses/${cid}/Piazza`}>
        Piazza
      </Link>
      <br />
      <Link id="wd-course-zoom-link" to={`/Kanbas/Courses/${cid}/Zoom`}>
        Zoom
      </Link>
      <br />
      <Link
        id="wd-course-quizzes-link"
        to={`/Kanbas/Courses/${cid}/Assignments`}
      >
        Assignments
      </Link>
      <br />
      <Link
        id="wd-course-assignments-link"
        to={`/Kanbas/Courses/${cid}/Quizzes`}
      >
        Quizzes
      </Link>
      <br />
      <Link id="wd-course-grades-link" to={`/Kanbas/Courses/${cid}/Grades`}>
        Grades
      </Link>
      <br />
      <Link id="wd-course-people-link" to={`/Kanbas/Courses/${cid}/People`}>
        People
      </Link>
      <br />
    </div>
  );
}
