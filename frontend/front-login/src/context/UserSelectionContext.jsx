import { createContext, useContext, useState } from 'react';

const UserSelectionContext = createContext();

export const UserSelectionProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <UserSelectionContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </UserSelectionContext.Provider>
  );
};

export const useUserSelection = () => {
  return useContext(UserSelectionContext);
};
