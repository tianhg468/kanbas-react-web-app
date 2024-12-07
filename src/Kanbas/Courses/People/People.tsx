import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PeopleTable from "./Table";
import * as coursesClient from "../client";
import PeopleDetails from "./Details";

const People = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { cid } = useParams();

  const fetchEnrolledUsers = async () => {
    try {
      setLoading(true);
      const enrolledUsers = await coursesClient.findUsersForCourse(
        cid as string
      );
      setUsers(enrolledUsers);
    } catch (error) {
      console.error("Error loading enrolled users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cid) {
      fetchEnrolledUsers();
    }
  }, [cid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PeopleDetails />
      <PeopleTable users={users} />
    </div>
  );
};

export default People;
