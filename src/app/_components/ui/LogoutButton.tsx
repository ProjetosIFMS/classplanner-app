'use client';
import { User } from '../../../types/user';
import { deleteUserToken } from '../../_actions/deleteUserToken';
import { UserAvatar } from './userAvatar';

interface LogoutButtonProps {
  data: User;
}

export const LogoutButton = ({ data }: LogoutButtonProps) => {
  const handleLogout = () => {
    deleteUserToken();
  };

  return (
    <button onClick={handleLogout}>
      <UserAvatar {...data} />
    </button>
  );
};

export default LogoutButton;
