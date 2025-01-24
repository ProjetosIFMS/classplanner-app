import React from "react";
import Image from "next/image";
import { Card } from "./ui/card";
import { ToggleStyle } from "./ui/toggleStyle";
import { UserAvatar } from "./ui/userAvatar";
import { getUserData } from "../_actions/getUserData";
import { deleteUserToken } from "../_actions/deleteUserToken";

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
          <button onClick={deleteUserToken} >
            <UserAvatar {...data} />
          </button>
        </div>
      </Card>
    </header>
  );
};
