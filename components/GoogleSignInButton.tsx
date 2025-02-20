// components/GoogleSignInButton.tsx
"use client";
import { RootState } from "@/store";
import { setUser } from "@/store/slices/authSlice";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../lib/firebase";

const GoogleSignInButton: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      dispatch(
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );

      console.log("User Info:", user);
      console.log("Access Token:", token);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
        </div>
      ) : (
        <button
          onClick={handleGoogleSignIn}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Sign in with Google
        </button>
      )}
    </>
  );
};

export default GoogleSignInButton;
