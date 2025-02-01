import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const response = await axios.post("/public/users/login", { email, password });
    const { token, myCarsList, user: loggedInUser } = response.data.data;
    
    Cookies.set("authToken", token, { expires: 7, path: "/" });
    Cookies.set("userRole", loggedInUser.role);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", loggedInUser.name);

    setIsLoggedIn(true);
    setUser(loggedInUser);
    
    return myCarsList; // Return any data you need
  };

  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userRole");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
