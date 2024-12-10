import {
  useParams,
  Navigate,
  Route,
  Routes,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { useLocation } from "react-router";
import { IoIosArrowForward } from "react-icons/io";
import People from "./People/People";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/Details";
import QuizDetailsEditor from "./Quizzes/DetailsEditor";
import QuizQuestionsEditor from "./Quizzes/QuestionsEditor";
import QuestionTypeEditor from "./Quizzes/QuestionTypeEditor";
import DetailsEditor from "./Quizzes/DetailsEditor";
import QuizPreview from "./Quizzes/QuizPreview";

export default function Courses({ courses }: { courses: any[] }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { cid, qid } = useParams();

  const filteredCourses = courses.filter((course) => course !== null);
  const course = Array.isArray(filteredCourses)
    ? filteredCourses.find((course) => course._id === cid)
    : null;

  if (!course && !cid) {
    return <div>Please select a course to view modules.</div>;
  }

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>

      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block me-5">
          <CoursesNavigation />
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
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:qid/details" element={<QuizDetails />} />
            <Route
              path="Quizzes/:qid/details/edit"
              element={<QuizDetailsEditor />}
            />
            <Route
              path="Quizzes/:qid/details/questions"
              element={<QuizQuestionsEditor />}
            />
            <Route
              path="Quizzes/:qid/details/questions"
              element={<QuizQuestionsEditor />}
            />
            <Route
              path="Quizzes/:qid/question/:questionId"
              element={<QuestionTypeEditor />}
            />
            <Route
              path="Quizzes/:qid/question/:status/:questionId"
              element={<QuestionTypeEditor />}
            />
            <Route
              path="Quizzes/:status/:qid/details"
              element={<QuizDetailsEditor />}
            />
            <Route path="Quizzes/:qid/preview" element={<QuizPreview />} />
            <Route path="Grades" element={<h2>Grades</h2>} />
            <Route path="People" element={<People />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
