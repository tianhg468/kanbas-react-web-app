import { Link } from "react-router-dom";
import { useLocation } from "react-router";

export default function AccountNavigation() {
  const { pathname } = useLocation();
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Link
        className={`list-group-item border border-0 text-danger ${
          pathname.includes("Signin") ? "active" : ""
        }`}
        to={`/Kanbas/Account/Signin`}
      >
        Signin
      </Link>
      <Link
        className={`list-group-item border border-0 text-danger ${
          pathname.includes("Signup") ? "active" : ""
        }`}
        to={`/Kanbas/Account/Signup`}
      >
        Signup
      </Link>
      <Link
        className={`list-group-item border border-0 text-danger ${
          pathname.includes("Profile") ? "active" : ""
        }`}
        to={`/Kanbas/Account/Profile`}
      >
        Profile
      </Link>
    </div>
  );
}
