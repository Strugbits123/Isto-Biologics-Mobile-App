import React, { createContext, useState } from "react";

// Context create karna
export const CurrentMemberContext = createContext();

// Context Provider Component
export const CurrentMemberProvider = ({ children }) => {
  const [currentMemberData, setCurrentMemberData] = useState({});

  // Function to update currentMember
  const updateCurrentMemberData = (member) => {
    setCurrentMemberData(member);
  };

  return (
    <CurrentMemberContext.Provider
      value={{ currentMemberData, updateCurrentMemberData }}
    >
      {children}
    </CurrentMemberContext.Provider>
  );
};
