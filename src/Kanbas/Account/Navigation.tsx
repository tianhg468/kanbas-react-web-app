import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser
    ? [{ name: "Profile", path: "/Kanbas/Account/Profile" }]
    : [
        { name: "Signin", path: "/Kanbas/Account/Signin" },
        { name: "Signup", path: "/Kanbas/Account/Signup" },
      ];

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link.name}
          className={`list-group-item border border-0 text-danger ${
            pathname.includes(link.name) ? "active" : ""
          }`}
          to={link.path}
        >
          {link.name}
        </Link>
      ))}
      {currentUser && currentUser.role === "ADMIN" && (
        <Link
          to={`/Kanbas/Account/Users`}
          className={`list-group-item border border-0 text-danger ${
            pathname.includes("Users") ? "active" : ""
          }`}
        >
          Users
        </Link>
      )}
    </div>
  );
}
