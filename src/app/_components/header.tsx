import React from "react";
import Image from "next/image";
import { Card } from "./ui/card";
import { ToggleStyle } from "./ui/toggleStyle";
import { UserAvatar } from "./ui/userAvatar";

export const Header = () => {
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
          <UserAvatar />
        </div>
      </Card>
    </header>
  );
};
