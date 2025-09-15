/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useLayoutEffect } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";
import axios, { type AxiosResponse } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { type NavigateFunction } from "react-router";

interface InternalAxiosRequestConfigWithRetry
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const PORT = import.meta.env.VITE_PORT as string;
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<AuthContextType["token"]>(undefined);
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [message, setMessage] = useState<AuthContextType["message"]>(undefined);

  async function handleLogin(data: {
    username: string;
    password: string;
  }): Promise<void> {
    try {
      const response: AxiosResponse = await axios.post(
        `${PORT}/users/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        setToken(response.data.accessToken);
        const { id, username, role } = response.data.user;
        setUser({ id, username, role });
        setMessage(response.data.message);
      }
    } catch (error: any) {
      setMessage(error.response?.data.message);
    }
  }

  async function handleLogout(navigate: NavigateFunction): Promise<void> {
    try {
      const response: AxiosResponse = await axios.post(
        `${PORT}/users/logout`,
        {},
        { withCredentials: true },
      );

      if (response.status === 200) {
        setToken(null);
        setUser(null);
        navigate("/subscribe");
      }
    } catch (error: any) {
      console.error("Logout failed:", error);
    }
  }

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await axios.get(`${PORT}/api/refresh`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setToken(response.data.accessToken);
          const { id, username, role } = response.data.user;
          setUser({ id, username, role });
        } else {
          setToken(null);
          setUser(null);
        }
      } catch (error: any) {
        console.error("Initial token refresh failed:", error);
        setToken(null);
        setUser(null);
      }
    };

    refreshToken();
  }, []);

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
            const response: AxiosResponse = await axios.get(
              `${PORT}/api/refresh`,
              {
                withCredentials: true,
              },
            );

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
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        handleLogin,
        handleLogout,
        message,
        setMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
