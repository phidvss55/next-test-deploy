import React from "react";

type ThemeContextType = {
  showMngColumn: boolean;
  setShowMngColumn: (show: boolean) => void;
};

export const ManageColumnContext = React.createContext<ThemeContextType>({
  showMngColumn: false,
  setShowMngColumn: () => { }
});

