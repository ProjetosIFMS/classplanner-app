import { AuthContext } from "@/app/_components/auth/AuthContext";
import { useContext } from "react";

export const useCourses = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useCourses must be used within an AuthProvider");
  return context.commonData.courses;
};
