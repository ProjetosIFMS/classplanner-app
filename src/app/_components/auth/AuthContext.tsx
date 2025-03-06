"use client";

import { deleteUserToken } from "@/app/_actions/deleteUserToken";
import { getCourses } from "@/app/_actions/getCourses";
import { getModalities } from "@/app/_actions/getModalities";
import { getUserData } from "@/app/_actions/getUserData";
import { getPpc } from "@/app/ppc/actions";
import { getAreas } from "@/app/professor/select-area/actions";
import { CommonData } from "@/types/common-data";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
} from "react";

interface AuthContextType {
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<CommonData>({
    courses: null,
    pedagogicalProjects: null,
    areas: null,
    modalities: null,
  });
  const router = useRouter();

  const fetchUserData = useCallback(
    async (session: string) => {
      const userData = await getUserData(session);
      setUser(userData);

      if (!userData) {
        throw new Error("Access token not found");
      }
      if (!userData.area_id && userData.role == "PROFESSOR") {
        router.push("/professor/select-area");
      }
    },
    [router],
  );

  const fetchCommonData = useCallback(async (session: string) => {
    try {
      const [courses, areas, pedagogicalProjects, modalities] =
        await Promise.all([
          getCourses(session),
          getAreas(session),
          getPpc(session),
          getModalities(session),
        ]);
      setData({ courses, areas, pedagogicalProjects, modalities });
    } catch (err) {
      throw err;
    }
  }, []);

  useEffect(() => {
    if (!session) return;
    fetchUserData(session);
    fetchCommonData(session);
  }, [session, fetchUserData, fetchCommonData]);

  const logout = () => {
    deleteUserToken();
  };

  return (
    <AuthContext.Provider value={{ session, user, logout, commonData: data }}>
      {children}
    </AuthContext.Provider>
  );
};
