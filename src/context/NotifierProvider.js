import React, { createContext, useMemo, useState } from "react";
import NotifierController from "../controllers/NotifierController";
import PropTypes from "prop-types";

export const NotifierContext = createContext();

const NotifierProvider = ({ children }) => {
  const [notifierVisibility, setNotifierVisibility] = useState(false);
  const [notifierMessage, setNotifierMessage] = useState(<></>);

  const goNotification = (message) =>
    NotifierController.goNotification(
      message,
      setNotifierVisibility,
      setNotifierMessage
    );

  const value = useMemo(
    () => ({ notifierVisibility, notifierMessage, goNotification}),
    [notifierVisibility, notifierMessage]
  );

  return (
    <NotifierContext.Provider value={value}>
      {children}
    </NotifierContext.Provider>
  );
};

NotifierProvider.propTypes = {
  children: PropTypes.node,
};

export default NotifierProvider;