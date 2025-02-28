"use client";
import React from "react";
import Image from "next/image";
import { Card } from "./ui/card";
import { ToggleStyle } from "./ui/toggleStyle";
import LogoutButton from "./ui/LogoutButton";
import { useAuth } from "./auth/AuthContext";

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="w-full bg-white">
      <Card className="flex justify-between items-center px-3 py-1">
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
          {user && <LogoutButton data={user} logout={logout} />}
        </div>
      </Card>
    </header>
  );
};
