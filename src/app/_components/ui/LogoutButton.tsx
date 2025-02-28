"use client";
import { User } from "../../../types/user";
import { UserAvatar } from "./userAvatar";

interface LogoutButtonProps {
  data: User;
  logout: () => void;
}

export const LogoutButton = ({ data, logout }: LogoutButtonProps) => {
  return (
    <button onClick={logout}>
      <UserAvatar {...data} />
    </button>
  );
};

export default LogoutButton;
