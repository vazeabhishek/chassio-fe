import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [user, setUser] = useState(() => {
    // Retrieve user data from localStorage
    const savedUser = localStorage.getItem("username");
    return savedUser ? { name: savedUser, role: localStorage.getItem("userRole") } : null;
  });

  const login = async (email, password) => {
    const response = await axios.post("/public/users/login", { email, password });
    const { token, myCarsList, user: loggedInUser } = response.data.data;

    // Set cookies and local storage
    Cookies.set("authToken", token, { expires: 7, path: "/" });
    localStorage.setItem("userRole", loggedInUser.role);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", loggedInUser.name);

    setIsLoggedIn(true);
    setUser(loggedInUser);

    return myCarsList; // Return any data you need
  };

  const logout = () => {
    // Clear cookies
    Cookies.remove("authToken");
    // Clear local storage
    localStorage.removeItem("userRole");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");

    setIsLoggedIn(false);
    setUser(null);
  };

  // Optional: Sync state with local storage when isLoggedIn changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
