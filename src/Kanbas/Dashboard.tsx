import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FacultyRoute from "./Account/FacultyRoute";
import { addEnrollment, removeEnrollment } from "./enrollmentReducer";
import {
  addNewCourse,
  updateCourse,
  deleteCourse,
} from "./Courses/courseReducer";
import * as enrollmentClient from "./enrollmentClient";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image: string;
  description: string;
}

interface State {
  accountReducer: {
    currentUser: {
      _id: string;
      role: string;
    };
  };
}

export default function Dashboard() {
  const { currentUser } = useSelector((state: State) => state.accountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const isStudent = currentUser.role === "STUDENT";
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  // New course state
  const [newCourse, setNewCourse] = useState<Course>({
    _id: new Date().getTime().toString(),
    name: "New Name",
    number: "New Number",
    startDate: "yyyy-mm-dd",
    endDate: "yyyy-mm-dd",
    image: "/images/reactjs.jpg",
    description: "New Course Description",
  });

  const fetchCourses = async () => {
    try {
      setLoading(true);
      if (isStudent) {
        const enrolledCourses = await userClient.findMyCourses();
        setCourses(enrolledCourses);
      } else {
        const allAvailableCourses = await userClient.findAllCourses();
        setCourses(allAvailableCourses);
        setAllCourses(allAvailableCourses);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCourses = async () => {
    try {
      setLoading(true);
      const allAvailableCourses = await userClient.findAllCourses();
      setAllCourses(allAvailableCourses);
    } catch (error) {
      console.error("Error fetching all courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async () => {
    try {
      setLoading(true);
      // Create course through API
      const createdCourse = await userClient.createCourse(newCourse);
      // Update Redux store
      dispatch(addNewCourse(createdCourse));
      // Refresh courses list
      await fetchAllCourses();
      // Reset new course form
      setNewCourse({
        _id: new Date().getTime().toString(),
        name: "New Name",
        number: "New Number",
        startDate: "yyyy-mm-dd",
        endDate: "yyyy-mm-dd",
        image: "/images/reactjs.jpg",
        description: "New Course Description",
      });
      setSuccess("New course created successfully!");
      // Refresh the page
      navigate(0);
    } catch (error) {
      console.error("Error creating course:", error);
      setError("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      setLoading(true);
      // Update course through API using the correct client method structure
      const updatedCourse = await courseClient.updateCourse(newCourse);
      // Update Redux store
      dispatch(updateCourse(updatedCourse));
      // Refresh courses list
      await fetchCourses();
      // Reset form or show success message
      setSuccess("Course updated successfully!");
    } catch (error) {
      console.error("Error updating course:", error);
      setError("Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      setLoading(true);
      // Delete course through API
      await courseClient.deleteCourse(courseId);
      // Update Redux store
      dispatch(deleteCourse(courseId));
      // Refresh courses list
      await fetchCourses();
      setSuccess("Course deleted successfully!");
    } catch (error) {
      console.error("Error deleting course:", error);
      setError("Failed to delete course");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchAllCourses();
  }, [currentUser.role]);

  const isEnrolled = (courseId: string): boolean =>
    courses.some((course) => course._id === courseId);

  const handleEnroll = async (courseId: string) => {
    try {
      setLoading(true);
      await enrollmentClient.enrollUserInCourse(currentUser._id, courseId);
      dispatch(
        addEnrollment({
          _id: new Date().getTime().toString(),
          user: currentUser._id,
          course: courseId,
        })
      );
      await fetchCourses();
    } catch (error) {
      console.error("Error enrolling in course:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    try {
      setLoading(true);
      await enrollmentClient.unenrollUserFromCourse(currentUser._id, courseId);
      dispatch(
        removeEnrollment({
          user: currentUser._id,
          course: courseId,
        })
      );
      await fetchCourses();
    } catch (error) {
      console.error("Error unenrolling from course:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCoursesToDisplay = () => (showAllCourses ? allCourses : courses);

  const renderEnrollmentButton = (courseId: string) => {
    if (!isStudent) return null;

    const enrolled = isEnrolled(courseId);
    return (
      <button
        className={`btn float-end ${enrolled ? "btn-danger" : "btn-success"}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          enrolled ? handleUnenroll(courseId) : handleEnroll(courseId);
        }}
        disabled={loading}
      >
        {loading ? "Loading..." : enrolled ? "Unenroll" : "Enroll"}
      </button>
    );
  };

  const renderCourseCard = (course: Course) => (
    <div
      key={course._id}
      className="wd-dashboard-course col"
      style={{ width: "300px" }}
    >
      <div className="card rounded-3 overflow-hidden">
        <Link
          to={
            isEnrolled(course._id) ? `/Kanbas/Courses/${course._id}/Home` : "#"
          }
          className="text-decoration-none text-dark"
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
            className="card-img-top"
            alt={course.name}
            style={{ height: "160px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{course.name}</h5>
            <p
              className="card-text overflow-y-hidden"
              style={{ maxHeight: 100 }}
            >
              {course.description}
            </p>

            {isEnrolled(course._id) && (
              <button className="btn btn-primary">Go</button>
            )}

            {renderEnrollmentButton(course._id)}

            <FacultyRoute>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteCourse(course._id);
                }}
                className="btn btn-danger float-end"
              >
                Delete
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
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
  );

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Dashboard</h1>
        {isStudent && (
          <button
            className="btn btn-primary"
            onClick={() => setShowAllCourses(!showAllCourses)}
            disabled={loading}
          >
            {showAllCourses ? "Show My Courses" : "Show All Courses"}
          </button>
        )}
      </div>

      {loading && <div className="alert alert-info">Processing...</div>}

      {/* Faculty-only section for creating new courses */}
      <FacultyRoute>
        <div className="mb-4">
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              onClick={handleAddCourse}
              disabled={loading}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={handleUpdateCourse}
              disabled={loading}
            >
              Update
            </button>
          </h5>
          <input
            value={newCourse.name}
            className="form-control mb-2"
            onChange={(e) =>
              setNewCourse({ ...newCourse, name: e.target.value })
            }
            placeholder="Course Name"
          />
          <textarea
            value={newCourse.description}
            className="form-control"
            onChange={(e) =>
              setNewCourse({ ...newCourse, description: e.target.value })
            }
            placeholder="Course Description"
          ></textarea>
          <hr />
        </div>
      </FacultyRoute>

      <h2 className="mt-4">
        {showAllCourses ? "All Available Courses" : "My Courses"} (
        {getCoursesToDisplay().length})
      </h2>

      <div className="row row-cols-1 row-cols-md-5 g-4">
        {getCoursesToDisplay().map(renderCourseCard)}
      </div>

      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

// import { Link } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import FacultyRoute from "./Account/FacultyRoute";
// import { addEnrollment, removeEnrollment } from "./enrollmentReducer";
// import {
//   addNewCourse,
//   updateCourse,
//   deleteCourse,
// } from "./Courses/courseReducer";
// import * as enrollmentClient from "./enrollmentClient";
// import * as userClient from "./Account/client";
// import * as courseClient from "./Courses/client";

// interface Course {
//   _id: string;
//   name: string;
//   number: string;
//   startDate: string;
//   endDate: string;
//   image: string;
//   description: string;
// }

// interface State {
//   accountReducer: {
//     currentUser: {
//       _id: string;
//       role: string;
//     };
//   };
// }

// export default function Dashboard() {
//   const { currentUser } = useSelector((state: State) => state.accountReducer);
//   const dispatch = useDispatch();
//   const [showAllCourses, setShowAllCourses] = useState(false);
//   const isStudent = currentUser.role === "STUDENT";
//   const [loading, setLoading] = useState(false);
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [allCourses, setAllCourses] = useState<Course[]>([]);
//   const [success, setSuccess] = useState<string>("");
//   const [error, setError] = useState<string>("");

//   const [newCourse, setNewCourse] = useState<Course>({
//     _id: new Date().getTime().toString(),
//     name: "New Name",
//     number: "New Number",
//     startDate: "yyyy-mm-dd",
//     endDate: "yyyy-mm-dd",
//     image: "/images/reactjs.jpg",
//     description: "New Course Description",
//   });

//   const fetchCourses = async () => {
//     try {
//       setLoading(true);
//       const enrolledCourses = await userClient.findMyCourses();
//       setCourses(enrolledCourses);
//     } catch (error) {
//       console.error("Error fetching enrolled courses:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAllCourses = async () => {
//     try {
//       setLoading(true);
//       const allAvailableCourses = await userClient.findAllCourses();
//       setAllCourses(allAvailableCourses);
//     } catch (error) {
//       console.error("Error fetching all courses:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleAddCourse = async () => {
//     try {
//       setLoading(true);
//       // Create course through API
//       const createdCourse = await userClient.createCourse(newCourse);
//       // Update Redux store
//       dispatch(addNewCourse(createdCourse));
//       // Refresh courses list
//       await fetchAllCourses();
//       // Reset new course form
//       setNewCourse({
//         _id: new Date().getTime().toString(),
//         name: "New Name",
//         number: "New Number",
//         startDate: "yyyy-mm-dd",
//         endDate: "yyyy-mm-dd",
//         image: "/images/reactjs.jpg",
//         description: "New Course Description",
//       });
//     } catch (error) {
//       console.error("Error creating course:", error);
//       alert("Failed to create course");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateCourse = async () => {
//     try {
//       setLoading(true);
//       // Update course through API using the correct client method structure
//       const updatedCourse = await courseClient.updateCourse(newCourse);
//       // Update Redux store
//       dispatch(updateCourse(updatedCourse));
//       // Refresh courses list
//       const allCourses = await userClient.findAllCourses();
//       const myCourses = await userClient.findMyCourses();
//       setAllCourses(allCourses);
//       setCourses(myCourses);
//       // Reset form or show success message
//       setSuccess("Course updated successfully!");
//     } catch (error) {
//       console.error("Error updating course:", error);
//       setError("Failed to update course");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//     fetchAllCourses();
//   }, []);

//   const isEnrolled = (courseId: string): boolean =>
//     courses.some((course) => course._id === courseId);

//   const handleEnroll = async (courseId: string) => {
//     try {
//       setLoading(true);
//       await enrollmentClient.enrollUserInCourse(currentUser._id, courseId);
//       dispatch(
//         addEnrollment({
//           _id: new Date().getTime().toString(),
//           user: currentUser._id,
//           course: courseId,
//         })
//       );
//       await fetchCourses();
//     } catch (error) {
//       console.error("Error enrolling in course:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUnenroll = async (courseId: string) => {
//     try {
//       setLoading(true);
//       await enrollmentClient.unenrollUserFromCourse(currentUser._id, courseId);
//       dispatch(
//         removeEnrollment({
//           user: currentUser._id,
//           course: courseId,
//         })
//       );
//       await fetchCourses();
//     } catch (error) {
//       console.error("Error unenrolling from course:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getCoursesToDisplay = () => (showAllCourses ? allCourses : courses);

//   const renderEnrollmentButton = (courseId: string) => {
//     if (!isStudent) return null;

//     const enrolled = isEnrolled(courseId);
//     return (
//       <button
//         className={`btn float-end ${enrolled ? "btn-danger" : "btn-success"}`}
//         onClick={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//           enrolled ? handleUnenroll(courseId) : handleEnroll(courseId);
//         }}
//         disabled={loading}
//       >
//         {loading ? "Loading..." : enrolled ? "Unenroll" : "Enroll"}
//       </button>
//     );
//   };

//   const renderCourseCard = (course: Course) => (
//     <div
//       key={course._id}
//       className="wd-dashboard-course col"
//       style={{ width: "300px" }}
//     >
//       <div className="card rounded-3 overflow-hidden">
//         <Link
//           to={
//             isEnrolled(course._id) ? `/Kanbas/Courses/${course._id}/Home` : "#"
//           }
//           className="text-decoration-none text-dark"
//           onClick={(e) => {
//             if (!isEnrolled(course._id)) {
//               e.preventDefault();
//             }
//           }}
//         >
//           <img
//             src={
//               course.number === "New Number"
//                 ? course.image
//                 : `/images/${course._id}.jpg`
//             }
//             className="card-img-top"
//             alt={course.name}
//             style={{ height: "160px", objectFit: "cover" }}
//           />
//           <div className="card-body">
//             <h5 className="card-title">{course.name}</h5>
//             <p
//               className="card-text overflow-y-hidden"
//               style={{ maxHeight: 100 }}
//             >
//               {course.description}
//             </p>

//             {isEnrolled(course._id) && (
//               <button className="btn btn-primary">Go</button>
//             )}

//             {renderEnrollmentButton(course._id)}

//             <FacultyRoute>
//               <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   dispatch(deleteCourse(course._id));
//                 }}
//                 className="btn btn-danger float-end"
//               >
//                 Delete
//               </button>
//               <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setNewCourse(course);
//                 }}
//                 className="btn btn-warning me-2 float-end"
//               >
//                 Edit
//               </button>
//             </FacultyRoute>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h1>Dashboard</h1>
//         {isStudent && (
//           <button
//             className="btn btn-primary"
//             onClick={() => setShowAllCourses(!showAllCourses)}
//             disabled={loading}
//           >
//             {showAllCourses ? "Show My Courses" : "Show All Courses"}
//           </button>
//         )}
//       </div>

//       {loading && <div className="alert alert-info">Processing...</div>}

//       <FacultyRoute>
//         <div className="mb-4">
//           <h5>
//             New Course
//             <button
//               className="btn btn-primary float-end"
//               onClick={handleAddCourse}
//               disabled={loading}
//             >
//               Add
//             </button>
//             <button
//               className="btn btn-warning float-end me-2"
//               onClick={handleUpdateCourse}
//               disabled={loading}
//             >
//               Update
//             </button>
//           </h5>
//           <input
//             value={newCourse.name}
//             className="form-control mb-2"
//             onChange={(e) =>
//               setNewCourse({ ...newCourse, name: e.target.value })
//             }
//             placeholder="Course Name"
//           />
//           <textarea
//             value={newCourse.description}
//             className="form-control"
//             onChange={(e) =>
//               setNewCourse({ ...newCourse, description: e.target.value })
//             }
//             placeholder="Course Description"
//           />
//           <hr />
//         </div>
//       </FacultyRoute>

//       <h2 className="mt-4">
//         {showAllCourses ? "All Available Courses" : "My Courses"} (
//         {getCoursesToDisplay().length})
//       </h2>

//       <div className="row row-cols-1 row-cols-md-5 g-4">
//         {getCoursesToDisplay().map(renderCourseCard)}
//       </div>
//     </div>
//   );
// }
