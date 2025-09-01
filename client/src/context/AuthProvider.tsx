/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useLayoutEffect } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";
import axios from "axios";

const PORT = import.meta.env.VITE_PORT as string;
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<AuthContextType["token"]>(undefined);

  useLayoutEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get(`${PORT}/users`, {
          withCredentials: true,
        });

        setToken(response.data.token);
      } catch (error: any) {
        console.error("Token not found:", error);
        setToken(null);
      }
    };

    fetchToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
