import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

interface Profile {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  role: "USER" | "ADMIN" | "FACULTY" | "STUDENT";
}

export default function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchProfile = async () => {
    try {
      if (!currentUser) {
        navigate("/Kanbas/Account/Signin");
        return;
      }
      const user = await client.profile();
      setProfile(user);
      dispatch(setCurrentUser(user));
    } catch (err) {
      // Only navigate to signin if there's no current user
      if (!currentUser) {
        navigate("/Kanbas/Account/Signin");
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      setProfile(currentUser);
    } else {
      fetchProfile();
    }
  }, [currentUser]);

  const validateProfile = (profileData: Profile) => {
    if (!profileData.username?.trim()) {
      throw new Error("Username is required");
    }
    if (!profileData.email?.trim()) {
      throw new Error("Email is required");
    }
    if (!profileData.firstName?.trim()) {
      throw new Error("First name is required");
    }
    if (!profileData.lastName?.trim()) {
      throw new Error("Last name is required");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      throw new Error("Please enter a valid email address");
    }
  };

  const updateProfile = async () => {
    try {
      setIsLoading(true);
      setError("");
      setSuccess("");

      if (!profile || !currentUser?._id) {
        throw new Error("No profile data available");
      }

      validateProfile(profile);

      const profileToUpdate = {
        ...profile,
        _id: currentUser._id, // Make sure we're using the currentUser's ID
        password: profile.password?.trim() ? profile.password : undefined,
      };
      console.log("Updating profile with:", profileToUpdate); //

      const updatedProfile = await client.updateUser(profileToUpdate);
      setProfile(updatedProfile);
      dispatch(setCurrentUser(updatedProfile));
      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      console.error("Profile update error:", err); // Debug log

      // Don't redirect on 401, just show the error
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to update profile";

      setError(errorMessage);

      // If we get a 401 but have a currentUser, don't redirect
      if (err.response?.status === 401 && !currentUser) {
        navigate("/Kanbas/Account/Signin");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signout = async () => {
    try {
      setIsLoading(true);
      await client.signout();
      setProfile(null);
      dispatch(setCurrentUser(null));
      navigate("/Kanbas/Account/Signin");
    } catch (err) {
      setError("Failed to sign out");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof Profile, value: string) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
    setError("");
    setSuccess("");
  };

  if (!profile && !error) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Profile</h1>

      {error && (
        <div className="alert alert-danger mb-3" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success mb-3" role="alert">
          {success}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          value={profile?.username || ""}
          id="wd-username"
          className="form-control"
          onChange={(e) => handleInputChange("username", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          value={profile?.password || ""}
          id="wd-password"
          className="form-control"
          onChange={(e) => handleInputChange("password", e.target.value)}
          placeholder="Leave blank to keep current password"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">First Name</label>
        <input
          value={profile?.firstName || ""}
          id="wd-firstname"
          className="form-control"
          onChange={(e) => handleInputChange("firstName", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Last Name</label>
        <input
          value={profile?.lastName || ""}
          id="wd-lastname"
          className="form-control"
          onChange={(e) => handleInputChange("lastName", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Date of Birth</label>
        <input
          value={profile?.dob || ""}
          id="wd-dob"
          className="form-control"
          onChange={(e) => handleInputChange("dob", e.target.value)}
          type="date"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          value={profile?.email || ""}
          id="wd-email"
          className="form-control"
          onChange={(e) => handleInputChange("email", e.target.value)}
          type="email"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Role</label>
        <select
          value={profile?.role || "USER"}
          onChange={(e) =>
            handleInputChange("role", e.target.value as Profile["role"])
          }
          id="wd-role"
          className="form-select"
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </select>
      </div>

      <button
        onClick={updateProfile}
        className="btn btn-primary w-100 mb-2"
        disabled={isLoading}
        id="wd-update-btn"
      >
        {isLoading ? "Updating..." : "Update Profile"}
      </button>

      <button
        onClick={signout}
        className="btn btn-danger w-100"
        disabled={isLoading}
        id="wd-signout-btn"
      >
        {isLoading ? "Signing out..." : "Sign out"}
      </button>
    </div>
  );
}

// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { setCurrentUser } from "./reducer";
// import * as client from "./client";

// export default function Profile() {
//   const [profile, setProfile] = useState<any>({});
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { currentUser } = useSelector((state: any) => state.accountReducer);

//   const fetchProfile = () => {
//     if (!currentUser) return navigate("/Kanbas/Account/Signin");
//     setProfile(currentUser);
//   };
//   const updateProfile = async () => {
//     const updatedProfile = await client.updateUser(profile);
//     dispatch(setCurrentUser(updatedProfile));
//   };
//   const signout = async () => {
//     await client.signout();
//     dispatch(setCurrentUser(null));
//     navigate("/Kanbas/Account/Signin");
//   };
//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   return (
//     <div id="wd-profile-screen">
//       <h1>Profile</h1>
//       {profile && (
//         <div>
//           <input
//             defaultValue={profile.username}
//             id="wd-username"
//             className="form-control mb-2"
//             onChange={(e) =>
//               setProfile({ ...profile, username: e.target.value })
//             }
//           />

//           <input
//             defaultValue={profile.password}
//             id="wd-password"
//             className="form-control mb-2"
//             onChange={(e) =>
//               setProfile({ ...profile, password: e.target.value })
//             }
//           />

//           <input
//             defaultValue={profile.firstName}
//             id="wd-firstname"
//             className="form-control mb-2"
//             onChange={(e) =>
//               setProfile({ ...profile, firstName: e.target.value })
//             }
//           />

//           <input
//             defaultValue={profile.lastName}
//             id="wd-lastname"
//             className="form-control mb-2"
//             onChange={(e) =>
//               setProfile({ ...profile, lastName: e.target.value })
//             }
//           />

//           <input
//             defaultValue={profile.dob}
//             id="wd-dob"
//             className="form-control mb-2"
//             onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
//             type="date"
//           />

//           <input
//             defaultValue={profile.email}
//             id="wd-email"
//             className="form-control mb-2"
//             onChange={(e) => setProfile({ ...profile, email: e.target.value })}
//           />

//           <select
//             value={profile.role || "USER"}
//             onChange={(e) => setProfile({ ...profile, role: e.target.value })}
//             id="wd-role"
//             className="form-select mb-2"
//           >
//             <option value="USER">User</option>
//             <option value="ADMIN">Admin</option>
//             <option value="FACULTY">Faculty</option>
//             <option value="STUDENT">Student</option>
//           </select>
//           <button
//             onClick={updateProfile}
//             className="btn btn-primary w-100 mb-2"
//           >
//             Update
//           </button>
//           <button
//             onClick={signout}
//             className="btn btn-danger w-100 mb-2"
//             id="wd-signout-btn"
//           >
//             Sign out
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
