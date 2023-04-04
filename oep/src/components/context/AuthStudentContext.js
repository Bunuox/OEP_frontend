import { createContext, useState, useContext, useEffect } from "react";
import React from "react";

const Context = createContext();
export const StudentAuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const localData = localStorage.getItem("user");
    return localData ? JSON.parse(localData) : false;
  });

  const data = {
    user,
    setUser,
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useStudentAuth = () => useContext(Context);
