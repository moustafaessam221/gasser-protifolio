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
        className={`${buttonTailwindStyles}`}
        disabled={activeComponent === "Messages"}
      >
        Messages
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
