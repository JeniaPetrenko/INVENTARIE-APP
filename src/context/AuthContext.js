//context/AuthContext.js - authentication management

"use client";

import { createContext, useContext, useEffect, useState } from "react";

const defaultState = {
  user: null,
  token: null,
  setToken: () => {},
  logout: () => {},
};

const AuthContext = createContext(defaultState);

// get the current state (contents of the context)
function AuthProvider({ children }) {
  const [token, setToken] = useState(defaultState.token); //save the token

  useEffect(() => {
    const _token = localStorage.getItem("@token");
    if (_token) {
      setToken(_token);
    }
  }, []);

  function logout() {
    localStorage.removeItem("@token");
    setToken(null);
  }
  return (
    <AuthContext.Provider
      value={{
        token,
        user: null,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
