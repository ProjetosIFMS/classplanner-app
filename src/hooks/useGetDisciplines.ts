"use client";

import React from "react";

import { getDisciplines } from "@/app/_actions/discipline/getDisciplines";
import { AuthContext } from "@/app/_components/auth/AuthContext";

export function useGetDisciplines() {
  const context = React.useContext(AuthContext);
  if (!context)
    throw new Error("useCourses must be used within an AuthProvider");
  return getDisciplines(context.session);
}
