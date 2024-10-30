import { Link, useNavigate } from "react-router-dom";
import * as db from "./Database";
import KanbasNavigation from "./Navigation";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FacultyRoute from "./Account/FacultyRoute";
import { enroll, unenroll } from "./enrollmentReducer";
import {
  addNewCourse,
  updateCourse,
  deleteCourse,
} from "./Courses/courseReducer";

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.courseReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const [newCourse, setNewCourse] = useState<any>({
    _id: new Date().getTime().toString(),
    name: "New Name",
    number: "New Number",
    startDate: "yyyy-mm-dd",
    endDate: "yyyy-mm-dd",
    image: "/images/reactjs.jpg",
    description: "New Course Description",
  });

  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const isStudent = currentUser.role === "STUDENT";

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );

  const handleEnrollToggle = (courseId: string) => {
    if (isEnrolled(courseId)) {
      dispatch(unenroll({ courseId, userId: currentUser._id }));
    } else {
      dispatch(enroll({ courseId, userId: currentUser._id }));
    }
  };

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {/* Enrollments Button for Students */}
      {isStudent && (
        <button
          className="btn btn-primary float-end mb-2"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
        </button>
      )}
      <FacultyRoute>
        <h5>
          New Course
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={() => dispatch(addNewCourse(newCourse))}
          >
            Add
          </button>
          <button
            className="btn btn-warning float-end me-2"
            onClick={() => dispatch(updateCourse(newCourse))}
            id="wd-update-course-click"
          >
            Update
          </button>
        </h5>

        <br />
        <input
          value={newCourse.name}
          className="form-control mb-2"
          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
        />
        <textarea
          value={newCourse.description}
          className="form-control"
          onChange={(e) =>
            setNewCourse({ ...newCourse, description: e.target.value })
          }
        />

        <hr />
      </FacultyRoute>
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses
            .filter((course: any) => showAllCourses || isEnrolled(course._id))
            .map((course: any) => (
              <div
                key={course._id}
                className="wd-dashboard-course col"
                style={{ width: "300px" }}
              >
                <div className="card rounded-3 overflow-hidden">
                  <Link
                    to={
                      isEnrolled(course._id)
                        ? `/Kanbas/Courses/${course._id}/Home`
                        : "#"
                    }
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    onClick={(e) => {
                      if (!isEnrolled(course._id)) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <img
                      src={
                        course.number === "New Number"
                          ? course.image
                          : `/images/${course._id}.jpg`
                      }
                      width=" 100% "
                      height={160}
                    />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden "
                        style={{ maxHeight: 100 }}
                      >
                        {course.description}
                      </p>
                      <button className="btn btn-primary"> Go </button>

                      {/* Enroll/Unenroll Button */}
                      {isStudent && (
                        <button
                          className={`btn float-end ${
                            isEnrolled(course._id)
                              ? "btn-danger"
                              : "btn-success"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleEnrollToggle(course._id);
                          }}
                        >
                          {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                        </button>
                      )}

                      <FacultyRoute>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(deleteCourse(course._id));
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setNewCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </FacultyRoute>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
