import { Link } from "react-router-dom";
import KanbasNavigation from "./Navigation";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} />
          <div>
            <Link
              className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home"
            >
              CS1234 React JS
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/webdev.png" width={200} height={180} />
          <div>
            <Link
              className="wd-dashboard-course-link"
              to="/Kanbas/Courses/5610/Home"
            >
              CS5610 Web Development
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/5610/Home"> Go </Link>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/dbms.png" width={200} height={180} />
          <div>
            <Link
              className="wd-dashboard-course-link"
              to="/Kanbas/Courses/5200/Home"
            >
              CS5200 Database Management
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/5200/Home"> Go </Link>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/oop.png" width={200} height={180} />
          <div>
            <Link
              className="wd-dashboard-course-link"
              to="/Kanbas/Courses/5004/Home"
            >
              CS5004 Object-Oriented Programming
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/5004/Home"> Go </Link>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/datastructurealg.png" width={200} height={180} />
          <div>
            <Link
              className="wd-dashboard-course-link"
              to="/Kanbas/Courses/5008/Home"
            >
              CS5008 Data Structures and Algorithm
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/5008/Home"> Go </Link>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/foundationsofcs.png" width={200} height={180} />
          <div>
            <Link
              className="wd-dashboard-course-link"
              to="/Kanbas/Courses/5001/Home"
            >
              CS5001 Intensive Foundations of CS
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/5001/Home"> Go </Link>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/discretestructures.png" width={200} height={180} />
          <div>
            <Link
              className="wd-dashboard-course-link"
              to="/Kanbas/Courses/5002/Home"
            >
              CS5002 Discrete Structures
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/5002/Home"> Go </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
