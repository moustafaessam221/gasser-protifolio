import React from "react";
import AddProject from "@/components/Admin/AddProject";
import ProjectsControl from "@/components/Admin/ProjectsControl";
import SignoutButton from "@/components/Admin/SignoutButton";
import Messages from "./Messages";
import EditBio from "./EditBio";
import EditMainImg from "./EditMainImg";

interface MainContentProps {
  activeComponent: string;
  isAdmin: boolean;
}

const MainContent: React.FC<MainContentProps> = ({
  activeComponent,
  isAdmin,
}) => {
  const renderComponent = () => {
    switch (activeComponent) {
      case "AddProject":
        return <AddProject />;
      case "ProjectsControl":
        return <ProjectsControl />;
      case "SignoutButton":
        return <SignoutButton />;
      case "Messages":
        return <Messages />;
      case "EditBio":
        return <EditBio />;
      case "EditMainImg":
        return <EditMainImg />;
      default:
        return null;
    }
  };

  return (
    <div className="w-3/4 p-4">
      {isAdmin ? (
        renderComponent()
      ) : (
        <div>
          <p>Sorry, you don&apos;t have access to this page</p>
          <SignoutButton />
        </div>
      )}
    </div>
  );
};

export default MainContent;
