import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <input
        id="wd-username"
        defaultValue="alice"
        placeholder="username"
        className="form-control mb-2"
        style={{ width: "300px" }}
      />

      <input
        id="wd-password"
        defaultValue="123"
        placeholder="password"
        type="password"
        className="form-control mb-2"
        style={{ width: "300px" }}
      />

      <input
        id="wd-firstname"
        defaultValue="Alice"
        placeholder="First Name"
        className="form-control mb-2"
        style={{ width: "300px" }}
      />

      <input
        id="wd-lastname"
        defaultValue="Wonderland"
        placeholder="Last Name"
        className="form-control mb-2"
        style={{ width: "300px" }}
      />

      <input
        id="wd-dob"
        // value="2000-01-01"
        defaultValue="mm/dd/yyyy"
        type="date"
        className="form-control mb-2"
        style={{ width: "300px" }}
      />

      <input
        id="wd-email"
        defaultValue="alice@wonderland.com"
        type="email"
        className="form-control mb-2"
        style={{ width: "300px" }}
      />

      <select
        id="wd-role"
        className="form-select mb-2"
        style={{ width: "300px" }}
      >
        <option value="USER" selected>
          User
        </option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>

      <Link
        to="/Kanbas/Account/Signin"
        className="btn btn-danger"
        style={{ width: "300px" }}
      >
        Sign out
      </Link>
    </div>
  );
}
