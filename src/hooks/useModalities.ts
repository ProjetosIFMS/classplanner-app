import { AuthContext } from "@/app/_components/auth/AuthContext";
import { useContext } from "react";

export const useModalities = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useModalities must be used within an AuthProvider");
  return context.commonData.modalities;
};
