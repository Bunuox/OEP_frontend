import { createContext, useState, useContext, useEffect } from "react";
import React from "react";

export const Context = createContext();
export const InstructorContext = createContext();

export const StudentAuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const localData = localStorage.getItem("user");
    return localData ? JSON.parse(localData) : false;
  });

  const [instructor, setInstructor] = useState(() => {
    const localData = localStorage.getItem("instructor");
    return localData ? JSON.parse(localData) : false;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("instructor", JSON.stringify(instructor));
  }, [instructor]);

  return (
  <InstructorContext.Provider value = {{instructor, setInstructor}}>
    <Context.Provider value={{user, setUser}}>
      {children}
    </Context.Provider>
  </InstructorContext.Provider>
  );
};
