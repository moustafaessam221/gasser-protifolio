"use client";

import { useEffect, useState } from "react";
import AddProject from "@/components/Admin/AddProject";
import ProjectsControl from "@/components/Admin/ProjectsControl";
import GoogleSignInButton from "@/components/GoogleSignInButton";

import { RootState } from "@/store";
import { useSelector } from "react-redux";
import SignoutButton from "@/components/Admin/SignoutButton";

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const userInfo = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (userInfo) {
        const response = await fetch("/api/checkAdmin", {
          method: "POST",
          body: JSON.stringify({ email: userInfo.email }),
        });
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      }
    };

    checkAdminStatus();
  }, [userInfo]);

  if (userInfo === null) {
    return (
      <div>
        <GoogleSignInButton />
      </div>
    );
  }

  return (
    <div className="responsive-padding">
      {isAdmin ? (
        <div className="flex flex-col gap-4 my-4">
          <h1 className="text-2xl font-semibold">
            Hello {userInfo.displayName}
          </h1>
          <AddProject />
          <ProjectsControl />
          <SignoutButton />
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-semibold">
            Hello {userInfo.displayName}
          </h1>
          <p>Sorry, you don&apos;t have access to this page</p>
          <SignoutButton />
        </div>
      )}
    </div>
  );
};

export default AdminPage;
