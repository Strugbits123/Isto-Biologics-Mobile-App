// import React, { createContext, useContext, useState } from "react";
// import Toast from "./Toast/Toast";

// export const ToastContext = createContext();

// export const ToastProvider = ({ children }) => {
//   const [toast, setToast] = useState({
//     visible: false,
//     message: "Hello world",
//     iconType: "error",
//   });

//   const showToast = (message = "", iconType = "", visible) => {
//     setToast({ visible, message, iconType });
//   };

//   const hideToast = (visible) => {
//     setToast({ visible });
//   };

//   return (
//     <ToastContext.Provider value={{ showToast, toast, hideToast }}>
//       {children}
//     </ToastContext.Provider>
//   );
// };
