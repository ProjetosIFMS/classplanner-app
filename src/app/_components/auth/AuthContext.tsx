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

  useEffect(() => {
    const getData = async (session: string) => {
      try {
        const data = await getUserData(session);
        setUser(data);
        if (!data) {
          throw new Error("Access token not found");
        }
        if (!data.area_id && data.role == "PROFESSOR") {
          router.push("/professor/select-area");
        }
        const fetchCourses = async (session: string) => {
          const res = await getCourses(session);
          setData((prev) => ({
            ...prev,
            courses: res,
          }));
        };

        const fetchAreas = async (session: string) => {
          const res = await getAreas(session);
          setData((prev) => ({
            ...prev,
            areas: res,
          }));
        };

        const fetchPedagogicalProjects = async (session: string) => {
          const res = await getPpc(session);
          setData((prev) => ({
            ...prev,
            pedagogicalProjects: res,
          }));
        };

        const fetchModalities = async (session: string) => {
          const res = await getModalities(session);
          setData((prev) => ({
            ...prev,
            modalities: res,
          }));
        };

        if (!session) {
          return;
        }
        fetchCourses(session);

        fetchAreas(session);

        fetchPedagogicalProjects(session);

        fetchModalities(session);
      } catch (error) {
        throw error;
      }
    };

    if (session) getData(session);
  }, [session, router]);

  const logout = () => {
    deleteUserToken();
  };

  return (
    <AuthContext.Provider value={{ session, user, logout, commonData: data }}>
      {children}
    </AuthContext.Provider>
  );
};
