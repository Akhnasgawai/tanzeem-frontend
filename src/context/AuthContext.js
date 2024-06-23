import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = Cookies.get("accessToken");
    const role = Cookies.get("role");
    return token && role ? { role } : null;
  });

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      const userRole = Cookies.get("role");
      setUser({ role: userRole });
    }
  }, []);

  const login = (role, token, refreshToken) => {
    Cookies.set("accessToken", token);
    Cookies.set("role", role);
    Cookies.set("refreshToken", refreshToken);
    setUser({ role });
  };

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("username");
    Cookies.remove("role");
    Cookies.remove("email");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
