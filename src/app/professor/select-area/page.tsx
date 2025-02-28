"use client";

import { useEffect, useState } from "react";
import { getAreas } from "./actions";
import { AreaForm } from "./area-form";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { deleteUserToken } from "@/app/_actions/deleteUserToken";

const SelectArea = () => {
  const { session } = useAuth();
  const [areas, setAreas] = useState();

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await getAreas(session);
        setAreas(response);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
    if (!session) {
      deleteUserToken();
    }
    fetchAreas();
  }, [session]);

  return (
    <section className="flex flex-col h-screen">
      <AreaForm data={areas} />
    </section>
  );
};

export default SelectArea;
