import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <input
        id="wd-username"
        placeholder="username"
        className="form-control mb-2"
        style={{ width: "300px" }}
      />

      <input
        id="wd-password"
        placeholder="password"
        type="password"
        className="form-control mb-2"
        style={{ width: "300px" }}
      />
      <Link
        id="wd-signin-btn"
        to="/Kanbas/Account/Profile"
        className="btn btn-primary mb-2"
        style={{ width: "300px" }}
      >
        Sign in
      </Link>
      <br />
      <Link id="wd-signup-link" to="/Kanbas/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}
