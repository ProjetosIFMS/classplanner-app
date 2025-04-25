"use client";

import { deleteUserToken } from "@/app/_actions/deleteUserToken";
import { CommonData } from "@/types/common-data";
import { User } from "@/types/user";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { useGetAllPPC } from "@/hooks/react-query/ppc";
import { useGetAllAreas } from "@/hooks/react-query/areas";
import { useGetAllCourses } from "@/hooks/react-query/courses";
import { useGetUserData } from "@/hooks/react-query/user";
import { useGetAllModalities } from "@/hooks/react-query/modalities";

interface AuthContextType {
  user: User | null | undefined;
  session: string | undefined;
  commonData: CommonData;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({
  children,
  referentialAccessToken,
}: {
  children: ReactNode;
  referentialAccessToken: string | undefined;
}) => {
  const session = referentialAccessToken;

  const { data: userData } = useGetUserData(session);

  const { data: coursesData } = useGetAllCourses(session);

  const { data: areasData } = useGetAllAreas(session);

  const { data: ppcData } = useGetAllPPC(session);

  const { data: modalitiesData } = useGetAllModalities(session);

  const logout = () => {
    deleteUserToken();
  };

  const commonData = useMemo(
    () => ({
      areas: areasData || [],
      courses: coursesData || [],
      modalities: modalitiesData || [],
      pedagogicalProjects: ppcData || [],
    }),
    [areasData, coursesData, modalitiesData, ppcData],
  );

  return (
    <AuthContext.Provider
      value={{
        session,
        user: userData || null,
        logout,
        commonData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
