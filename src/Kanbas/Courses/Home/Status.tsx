import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { FaHome } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
import { FaBullhorn } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { FaBell } from "react-icons/fa";
import FacultyRoute from "../../Account/FacultyRoute";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "300px" }} className="ms-4">
      <h2>Course Status</h2>
      <FacultyRoute>
        <div className="d-flex">
          <div className="w-50 pe-1">
            <button className="btn btn-lg btn-secondary w-100 text-nowrap">
              <MdDoNotDisturbAlt className="me-2 fs-5" />
              Unpublish
            </button>
          </div>
          <div className="w-50">
            <button className="btn btn-lg btn-success w-100">
              <FaCheckCircle className="me-2 fs-5" />
              Publish
            </button>
          </div>
        </div>
        <br />
        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <BiImport className="me-2 fs-5" />
          Import Existing Content
        </button>

        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <LiaFileImportSolid className="me-2 fs-5" />
          Import from Commons
        </button>

        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <FaHome className="me-2 fs-5" />
          Choose Home Page
        </button>
      </FacultyRoute>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FaChartSimple className="me-2 fs-5" />
        View Course Stream
      </button>

      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FaBullhorn className="me-2 fs-5" />
        New Announcement
      </button>

      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <SiGoogleanalytics className="me-2 fs-5" />
        New Analytics
      </button>

      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FaBell className="me-2 fs-5" />
        View Course Notifications
      </button>
    </div>
  );
}
