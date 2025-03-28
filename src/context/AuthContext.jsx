import React, { createContext, useState, useEffect } from "react";
import { auth, provider, signInWithPopup, signOut } from "../firebase";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const loginWithGoogle = async (navigate) => {
    try {
      const result = await signInWithPopup(auth, provider);

      const idToken = await result.user.getIdToken(); // Firebase ID token
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log("cred", credential);
      if (!credential) {
        throw new Error("Google credential is missing");
      }

      const userAccessToken = credential.accessToken;
      console.log("result", result);
      console.log("token", idToken);
      console.log("userAccessToken", userAccessToken);

      // Send token to backend
      const response = await axios.post(
        "http://localhost:5000/login",
        { userAccessToken },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      // Store tokens in localStorage
      localStorage.setItem("token", idToken);
      localStorage.setItem("userAccessToken", userAccessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Update state
      setToken(idToken);
      setUser(response.data.user);

      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const logout = async (navigate) => {
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("userAccessToken");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
