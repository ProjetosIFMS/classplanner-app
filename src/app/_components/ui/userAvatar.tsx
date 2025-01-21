import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { User } from "@/types/user";

export const UserAvatar = ({ email, firstName, lastName, picture }: User) => {
  return (
    <div className="flex flex-row items-center p-1 rounded-full">
      <button>
        <Avatar className="on-hover:bg-black">
          <AvatarImage
            src={picture ? picture : "/default_avatar.png"}
            alt="Default avatar"
          />
          <AvatarFallback>avatar</AvatarFallback>
        </Avatar>
      </button>
      <div className="flex flex-col ml-2 items-start">
        <p className="text-sm">
          {firstName ? firstName + " " + lastName : "Usuário"}
        </p>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
    </div>
  );
};
