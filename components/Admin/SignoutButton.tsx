import { auth } from "@/lib/firebase";
import { clearUser } from "@/store/slices/authSlice";
import React from "react";
import { useDispatch } from "react-redux";

const SignoutButton = () => {
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      dispatch(clearUser());
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };
  return (
    <div>
      <button
        onClick={handleSignOut}
        className="text-gray-500 border-2 border-gray-500 px-4 py-2 rounded-lg hover:bg-gray-500 hover:text-white"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignoutButton;
