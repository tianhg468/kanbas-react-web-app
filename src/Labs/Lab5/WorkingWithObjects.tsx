import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;

  const [module, setModule] = useState({
    id: 1,
    name: "Module 1",
    description: "Introduction to Express",
    course: "Web Development",
  });
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <input
        className="form-control w-75"
        id="wd-assignment-title"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <div className="mb-3 mt-3">
        <a
          className="btn btn-primary mt-2 float-end"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        >
          Update Score
        </a>
        <input
          type="number"
          className="form-control w-75"
          value={assignment.score}
          onChange={(e) =>
            setAssignment({ ...assignment, score: parseInt(e.target.value) })
          }
        />
      </div>
      <hr />

      <div className="mb-3">
        <label>Completed:</label>
        <input
          type="checkbox"
          className="form-check-input ms-2"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <a
          className="btn btn-primary ms-2 float-end"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        >
          Update Completed Status
        </a>
      </div>
      <hr />
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}`}
      >
        Get Assignment
      </a>
      <hr />
      <h4> Retrieving Properties </h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}/title`}
      >
        Get Title
      </a>
      <hr />

      <h4>Module Operations</h4>
      <div className="mb-3">
        <a
          id="wd-retrieve-module"
          className="btn btn-primary me-2"
          href={MODULE_API_URL}
        >
          Get Module
        </a>
        <hr />
        <a
          id="wd-retrieve-module-name"
          className="btn btn-primary"
          href={`${MODULE_API_URL}/name`}
        >
          Get Module Name
        </a>
      </div>
      <hr />
      <div className="mb-3">
        <a
          className="btn btn-primary mt-2 float-end"
          href={`${MODULE_API_URL}/name/${module.name}`}
        >
          Update Module Name
        </a>
        <input
          className="form-control w-50"
          value={module.name}
          onChange={(e) => setModule({ ...module, name: e.target.value })}
        />
      </div>
      <hr />
      <div className="mb-3">
        <a
          className="btn btn-primary mt-2 float-end"
          href={`${MODULE_API_URL}/description/${module.description}`}
        >
          Update Module Description
        </a>
        <input
          className="form-control w-50"
          value={module.description}
          onChange={(e) =>
            setModule({ ...module, description: e.target.value })
          }
        />
      </div>
    </div>
  );
}
