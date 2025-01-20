import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

export const UserAvatar = () => {
  return (
    <div className="flex flex-row items-center p-1 rounded-full">
      <button>
        <Avatar className="on-hover:bg-black">
          <AvatarImage src="/default_avatar.png" alt="Default avatar" />
          <AvatarFallback>avatar</AvatarFallback>
        </Avatar>
      </button>
      <div className="flex flex-col ml-2 items-start">
        <p className="text-sm">Nome do usuário</p>
        <p className="text-sm text-muted-foreground">email@usuario.com</p>
      </div>
    </div>
  );
};
