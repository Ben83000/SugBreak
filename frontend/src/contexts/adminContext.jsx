import { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [adminMode, setAdminMode] = useState(false);

  const toggleAdminMode = () => {
    setAdminMode(!adminMode);
  };

  return (
    <AdminContext.Provider value={{ adminMode, toggleAdminMode }}>
      {children}
    </AdminContext.Provider>
  );
};
