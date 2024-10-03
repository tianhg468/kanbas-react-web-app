import { useParams } from "react-router-dom";
import { LuCalendarDays } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { FaCalendarAlt } from "react-icons/fa";
import React, { useRef } from "react";

export default function AssignmentEditor() {
  const { aid } = useParams<{ aid: string }>();
  const dateInputRef1 = useRef<HTMLInputElement>(null);
  const handleIconClick1 = () => {
    if (dateInputRef1.current) {
      dateInputRef1.current.showPicker(); // Opens the date picker in supported browsers
    }
  };
  const dateInputRef2 = useRef<HTMLInputElement>(null);
  const handleIconClick2 = () => {
    if (dateInputRef2.current) {
      dateInputRef2.current.showPicker(); // Opens the date picker in supported browsers
    }
  };
  const dateInputRef3 = useRef<HTMLInputElement>(null);
  const handleIconClick3 = () => {
    if (dateInputRef3.current) {
      dateInputRef3.current.showPicker(); // Opens the date picker in supported browsers
    }
  };
  return (
    <div>
      <div id="wd-assignments-edior">
        <form>
          <div className="border border-start-0 border-top-0 border-end-0 mb-2">
            <label htmlFor="wd-name" className="form-label">
              Assignment Name
            </label>

            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                id="wd-name"
                defaultValue={aid}
              />
            </div>
            <div className="mb-4">
              <textarea
                id="wd-description"
                className="form-control"
                rows={10}
                defaultValue="The assignment is available online. Submit a link to the landing page of your Web application running
                on Netlify. The landing page should include the following: Your full name and section; Links to each of the lab
                assignments; Link to the Kanbas application; Links to all relevant source code repositories. The Kanbas
                application should include a link to navigate back to the landing page."
              ></textarea>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="wd-points"
                className="d-flex col-3 col-form-label justify-content-end "
              >
                Points
              </label>
              <div className="col-9">
                <input
                  type="text"
                  className="form-control"
                  id="wd-points"
                  defaultValue="100"
                />
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="wd-group"
                className="d-flex col-3 col-form-label justify-content-end "
              >
                Assignment Group
              </label>
              <div className="col-9">
                <select id="wd-group" className="form-select">
                  <option value="ASSIGNMENTS" selected>
                    ASSIGNMENTS
                  </option>
                  <option value="QUIZZES">QUIZZES</option>
                  <option value="EXAMS">EXAMS</option>
                  <option value="PROJECT">PROJECT</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="wd-display-grade-as"
                className="d-flex col-3 col-form-label justify-content-end "
              >
                Display Grade as
              </label>
              <div className="col-9">
                <select id="wd-display-grade-as" className="form-select">
                  <option value="PERCENTAGE" selected>
                    Percentage
                  </option>
                  <option value="LETTER">Letter</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="wd-submission-type"
                className="d-flex col-3 col-form-label justify-content-end "
              >
                Submission Type
              </label>
              <div className="col-9 ">
                <div className="d-flex flex-column form-control">
                  <select
                    id="wd-submission-type"
                    className="form-select mt-2 mb-4"
                  >
                    <option value="ONLINE" selected>
                      Online
                    </option>
                    <option value="CLASS">In Class</option>
                  </select>
                  <div>
                    <label className="fw-bold mb-3">Online Entry Options</label>
                    <br />

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="wd-text-entry"
                        name="check-genre"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="wd-text-entry"
                      >
                        Text Entry
                      </label>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="wd-website-url"
                        name="check-genre"
                        checked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="wd-website-url"
                      >
                        Website URL
                      </label>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="wd-media-recordings"
                        name="check-genre"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="wd-media-recordings"
                      >
                        Media Recordings
                      </label>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="wd-student-annotation"
                        name="check-genre"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="wd-student-annotation"
                      >
                        Student Annotation
                      </label>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="wd-file-upload"
                        name="check-genre"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="wd-file-upload"
                      >
                        File Uploads
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-5">
              <label
                htmlFor="wd-assign-to"
                className="d-flex col-3 col-form-label justify-content-end "
              >
                Assign
              </label>
              <div className="col-9 ">
                <div className="d-flex flex-column form-control">
                  <label
                    htmlFor="wd-assign-to"
                    className="form-label mt-2 fw-bold"
                  >
                    Assign to
                  </label>
                  <div className="mb-3">
                    <div
                      className="form-control "
                      id="wd-assign-to"
                      style={{
                        height: "40px",
                      }}
                    >
                      <div className="input-group">
                        <div
                          className="border border-0 rounded-2 bg-secondary"
                          style={{
                            width: "150px",
                            height: "27px",
                          }}
                        >
                          <span className="ms-2">Everyone</span>
                          <span
                            id="wd-assignments-icon"
                            className="input-group-text bg-secondary border border-0 float-end"
                            style={{
                              left: "100px",
                              height: "27px",
                            }}
                          >
                            <RxCross2 className="fs-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <label
                    htmlFor="wd-due-date"
                    className="form-label mt-2 fw-bold"
                  >
                    Due
                  </label>
                  <div className="input-group rounded-2 mb-3">
                    <input
                      type="date"
                      id="wd-due-date"
                      className="form-control custom-date-input"
                      defaultValue="May 13, 2024, 11:59 PM"
                      ref={dateInputRef1}
                    />
                    <span className="input-group-text bg-secondary">
                      <LuCalendarDays
                        onClick={handleIconClick1}
                        className="fs-4"
                      />
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="me-2">
                      <label
                        htmlFor="wd-available-from"
                        className="form-label mt-2 fw-bold "
                      >
                        Available from
                      </label>
                      <div className="input-group rounded-2 mb-3">
                        <input
                          type="date"
                          id="wd-available-from"
                          className="form-control custom-date-input"
                          defaultValue="May 6, 2024, 12:00 AM"
                          ref={dateInputRef2}
                        />
                        <span className="input-group-text bg-secondary">
                          <LuCalendarDays
                            onClick={handleIconClick2}
                            className="fs-4"
                          />
                        </span>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="wd-available-until"
                        className="form-label mt-2 fw-bold"
                      >
                        Until
                      </label>
                      <div className="input-group rounded-2 mb-3">
                        <input
                          type="date"
                          id="wd-available-until"
                          className="form-control custom-date-input"
                          ref={dateInputRef3}
                        />
                        <span className="input-group-text bg-secondary">
                          <LuCalendarDays
                            onClick={handleIconClick3}
                            className="fs-4"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-danger float-end">
            Save
          </button>
          <button type="submit" className="btn btn-secondary float-end me-2">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
