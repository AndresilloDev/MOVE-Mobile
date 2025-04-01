import React, { createContext, useContext, useState } from "react";
import { Notification } from "../components/Notification";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");

  const getError = (msg) => {
    setMessage(msg);
    setSeverity("error");
    setOpen(true);
  };

  const getSuccess = (msg) => {
    setMessage(msg);
    setSeverity("success");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const value = {
    getError,
    getSuccess,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Notification
        open={open}
        severity={severity}
        message={message}
        handleClose={handleClose}
      />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
