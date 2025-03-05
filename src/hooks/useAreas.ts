import { AuthContext } from "@/app/_components/auth/AuthContext";
import { useContext } from "react";

export const useAreas = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAreas must be used within an AuthProvider");
  return context.commonData.areas;
};
