import { createContext, useContext } from "react";
import type { SubmitHandler } from "react-hook-form";
import { type Login } from "@/components/Subscribe";
import { type NavigateFunction } from "react-router";
type UserAuthProps =
  | { id: string; name: string; role: string }
  | null
  | undefined;

export type AuthContextType = {
  token: string | null | undefined;
  setToken: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  user?: UserAuthProps;
  setUser?: React.Dispatch<React.SetStateAction<UserAuthProps>>;
  handleLogin: SubmitHandler<Login>;
  handleLogout: (navigate: NavigateFunction) => Promise<void>;
  message?: string | undefined;
  setMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const AuthContext: React.Context<AuthContextType> =
  createContext<AuthContextType>({
    token: undefined,
    setToken: () => {},
    user: null,
    setUser: () => {},
    handleLogin: async () => {},
    handleLogout: async () => {},
    message: undefined,
    setMessage: () => {},
  });

export const useAuth: () => AuthContextType = () => {
  return useContext(AuthContext);
};
