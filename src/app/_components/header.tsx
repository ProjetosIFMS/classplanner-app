import React from "react";
import Image from "next/image";
import { Card } from "./ui/card";
import { ToggleStyle } from "./ui/toggleStyle";
import { getUserData } from "../_actions/getUserData";
import LogoutButton from "./ui/LogoutButton";

export const Header = async () => {
  const data = await getUserData();

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
          <LogoutButton data={data} />
        </div>
      </Card>
    </header>
  );
};
