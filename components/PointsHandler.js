import React, { createContext, useState } from "react";

// Context create karna
export const PointsContext = createContext();

// Context Provider Component
export const PointsProvider = ({ children }) => {
  const [totalPoints, setTotalPoints] = useState({
    total_leaderboard_points: 0,
    total_doctor_points: 0,
    total_hospital_points: 0,
    total_products_points: 0,
  });

  // Function to update points
  const updatePoints = (points) => {
    setTotalPoints(points);
  };

  return (
    <PointsContext.Provider value={{ totalPoints, updatePoints }}>
      {children}
    </PointsContext.Provider>
  );
};
