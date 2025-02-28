"use client";

import { deleteUserToken } from "@/app/_actions/deleteUserToken";
import { getUserData } from "@/app/_actions/getUserData";
import { User } from "@/types/user";
import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";

interface AuthContextType {
  user: User | null;
  session: string | undefined;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  referentialAccessToken,
}: {
  children: ReactNode;
  referentialAccessToken: string | undefined;
}) => {
  const session = referentialAccessToken;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getData = async (session: string) => {
      try {
        const data = await getUserData(session);
        setUser(data);
      } catch (error) {
        throw new Error(String(error));
      }
    };

    if (session) getData(session);
  }, [session]);

  const logout = () => {
    deleteUserToken();
  };

  return (
    <AuthContext.Provider value={{ session, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
