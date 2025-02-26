"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import Sidebar from "@/components/Admin/Sidebar";
import MainContent from "@/components/Admin/MainContent";

const AdminPage: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [activeComponent, setActiveComponent] = useState<string>("AddProject");
  const userInfo = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (userInfo) {
        try {
          const response = await fetch("/api/checkAdmin", {
            method: "POST",
            body: JSON.stringify({ email: userInfo.email }),
          });
          const data = await response.json();
          setIsAdmin(data.isAdmin);
        } catch (error) {
          console.error("Failed to check admin status:", error);
        }
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
    <div className="responsive-padding flex">
      <Sidebar
        setActiveComponent={setActiveComponent}
        activeComponent={activeComponent}
      />
      <MainContent activeComponent={activeComponent} isAdmin={isAdmin} />
    </div>
  );
};

export default AdminPage;
