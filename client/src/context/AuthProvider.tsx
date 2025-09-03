/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useLayoutEffect } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";
import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

interface InternalAxiosRequestConfigWithRetry
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const PORT = import.meta.env.VITE_PORT as string;
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<AuthContextType["token"]>(undefined);

  // Gurantees that the token is set before any request is made
  useLayoutEffect(() => {
    const authInterceptor = axios.interceptors.request.use(
      (config: InternalAxiosRequestConfigWithRetry) => {
        config.headers.Authorization =
          token && !config._retry
            ? `Bearer ${token}`
            : config.headers.Authorization; // Adds token to Authorization header if it exists and request is not a failed request being retried

        return config;
      },
    );

    return () => {
      axios.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  // Establishes new token if expires or is invalid
  useLayoutEffect(() => {
    const authResponseInterceptor = axios.interceptors.response.use(
      function onFulfilled(response) {
        return response;
      },
      async function onRejected(error) {
        const originalRequest: InternalAxiosRequestConfigWithRetry =
          error.config;
        if (
          error.response?.status === 403 &&
          error.response?.data?.message === "Unauthorized"
        ) {
          try {
            const response = await axios.get(`${PORT}/api/refresh`, {
              withCredentials: true,
            });

            if (response.status === 200) {
              setToken(response.data.accessToken);
              originalRequest._retry = true;
              return axios(originalRequest); // Re-sends original request after token refresh
            }
          } catch (error: any) {
            console.error("Token refresh failed:", error);
            setToken(null);
          }
        }

        return Promise.reject(error); // Returns reason why request failed
      },
    );

    return () => {
      axios.interceptors.response.eject(authResponseInterceptor);
    };
  });

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
