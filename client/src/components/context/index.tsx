import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import {IMember} from "@/types/imember";


interface AuthContextType {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  member: IMember | null;
  setMember: Dispatch<SetStateAction<IMember | null>>;
}

const defaultValue: AuthContextType = {
  isAuth: false,
  setIsAuth: () => {},
  isLoading: false,
  setLoading: () => {},
  member: null,
  setMember: () => {},
};

export const AuthContext = createContext(defaultValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [member, setMember] = useState<IMember | null>(null);

  return (
      <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading, setLoading, member, setMember }}>
        {children}
      </AuthContext.Provider>
  );
};
