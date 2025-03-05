import { AuthContext } from "@/app/_components/auth/AuthContext";
import { useContext } from "react";

export const usePedagogicalProjects = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error(
      "usePedagogicalProjects must be used within an AuthProvider",
    );
  return context.commonData.pedagogicalProjects;
};
