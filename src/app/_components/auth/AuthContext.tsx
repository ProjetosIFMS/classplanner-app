"use client";

import { deleteUserToken } from "@/app/_actions/deleteUserToken";
import { CommonData } from "@/types/common-data";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext } from "react";
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

  const user = useGetUserData(session).data;
  const courses = useGetAllCourses(session);
  const areas = useGetAllAreas(session);
  const pedagogicalProjects = useGetAllPPC(session);
  const modalities = useGetAllModalities(session);
  const router = useRouter();

  const logout = () => {
    deleteUserToken();
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        logout,
        commonData: {
          areas: areas.data,
          courses: courses.data,
          modalities: modalities.data,
          pedagogicalProjects: pedagogicalProjects.data,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
