"use client";

import { fetchUnreadMessages } from "@/utils/firebaseFunctions";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface SidebarProps {
  setActiveComponent: (component: string) => void;
  activeComponent: string;
}

const buttonTailwindStyles = `block w-full mb-2 bg-green-300 text-black font-semibold h-10 rounded-md hover:bg-green-400 ${"disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"}`;

const Sidebar: React.FC<SidebarProps> = ({
  setActiveComponent,
  activeComponent,
}) => {
  const { data, isPending } = useQuery({
    queryKey: ["unreadMessages"],
    queryFn: () => fetchUnreadMessages(),
  });

  return (
    <div className="w-1/4 p-4 border-r border-gray-300 flex flex-col gap-4 items-center justify-start min-h-screen">
      <button
        onClick={() => setActiveComponent("AddProject")}
        className={`${buttonTailwindStyles}`}
        disabled={activeComponent === "AddProject"}
      >
        Add Project
      </button>

      <button
        onClick={() => setActiveComponent("ProjectsControl")}
        className={`${buttonTailwindStyles}`}
        disabled={activeComponent === "ProjectsControl"}
      >
        Projects Control
      </button>

      <button
        onClick={() => setActiveComponent("Messages")}
        className={`${buttonTailwindStyles} relative`}
        disabled={activeComponent === "Messages"}
      >
        Messages
        <div className="absolute top-1/2 -translate-y-1/2 right-1/10 w-5 h-5 bg-red-500 rounded-full text-white flex items-center justify-center">
          {isPending ? "..." : data?.length}
        </div>
      </button>

      <button
        onClick={() => setActiveComponent("EditBio")}
        className={`${buttonTailwindStyles}`}
        disabled={activeComponent === "EditBio"}
      >
        Edit Profile
      </button>

      <button
        onClick={() => setActiveComponent("EditMainImg")}
        className={`${buttonTailwindStyles}`}
        disabled={activeComponent === "EditMainImg"}
      >
        Edit Main Image
      </button>
      <button
        onClick={() => setActiveComponent("SignoutButton")}
        className={`${buttonTailwindStyles} mt-auto bg-red-500 hover:bg-red-600`}
        disabled={activeComponent === "SignoutButton"}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Sidebar;
