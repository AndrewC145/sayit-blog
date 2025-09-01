import { createContext } from "react";

type AuthContextType = {
  token: string | null | undefined;
  setToken: React.Dispatch<React.SetStateAction<string | null | undefined>>;
};

const AuthContext = createContext<AuthContextType>({
  token: undefined,
  setToken: () => {},
});

export { AuthContext, type AuthContextType };
