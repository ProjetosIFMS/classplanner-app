import React from "react";
import Image from "next/image";
import { Card } from "./ui/card";
import { ToggleStyle } from "./ui/toggleStyle";
import { UserAvatar } from "./ui/userAvatar";
import { cookies } from "next/headers";
import api from "@/utils/axios-instance";
import { User } from "@/types/user";

export const Header = async () => {
  const fetchData = async (): Promise<User> => {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token");
    if (!access_token) {
      throw new Error("Access token not found!");
    }
    try {
      const response = await api.get("/google/me", {
        headers: {
          Authorization: `Bearer ${access_token?.value}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const data = await fetchData();

  return (
    <header className="w-full bg-white">
      <Card className="flex justify-between items-center px-3 py-3">
        <Image
          aria-hidden
          src="/logo.png"
          alt="Class Planner icon"
          rel="icon"
          className="object-contain"
          width={60}
          height={60}
        />
        <div className="flex items-center">
          <ToggleStyle />
          <UserAvatar {...data} />
        </div>
      </Card>
    </header>
  );
};
