import { Pressable } from "react-native";
import React, { useContext } from "react";
import { BottomSheetContext } from "../context/BottomSheetProvider";
import ComingSoonModal from "./ComingSoonModal";

const AuthorButton = ({ authorId, children }) => {
  const { setSheetContent, openBottomSheet } = useContext(BottomSheetContext);

  const handleNavigationAuthor = () => {
    setSheetContent(
      <ComingSoonModal
        key={"author-coming-soon"}
        title={
          "La navegación a la sección del autor estará disponible pronto 😅."
        }
      />
    );
    openBottomSheet();
  };

  return <Pressable onPress={handleNavigationAuthor}>{children}</Pressable>;
};

export default AuthorButton;
