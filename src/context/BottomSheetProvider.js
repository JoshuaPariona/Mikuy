import React, { createContext, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";

export const BottomSheetContext = createContext();

const BottomSheetProvider = ({ children }) => {
  const bottomSheetRef = useRef(null); // make sure that an bottom sheet comp is initialized with this ref
  const [sheetContent, setSheetContent] = useState(<></>);

  const openBottomSheet = () => {
    bottomSheetRef.current?.open();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const value = useMemo(
    () => ({
      bottomSheetRef,
      sheetContent,
      setSheetContent,
      openBottomSheet,
      closeBottomSheet,
    }),
    [sheetContent]
  );

  return (
    <BottomSheetContext.Provider value={value}>
      {children}
    </BottomSheetContext.Provider>
  );
};

BottomSheetProvider.propTypes = {
  children: PropTypes.node,
};

export default BottomSheetProvider;
