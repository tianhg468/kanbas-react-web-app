import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <input
        placeholder="username"
        className="form-control mb-2"
        style={{ width: "300px" }}
      />

      <input
        placeholder="password"
        type="password"
        className="form-control mb-2"
        style={{ width: "300px" }}
      />

      {/* <input
        placeholder="verify password"
        type="password"
        className="form-control mb-2"
      /> */}

      <Link
        to="/Kanbas/Account/Profile"
        className="btn btn-primary mb-2"
        style={{ width: "300px" }}
      >
        Sign up
      </Link>
      <br />
      <Link to="/Kanbas/Account/Signin">Sign in</Link>
    </div>
  );
}
