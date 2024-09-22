import React, { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../config/msalConfig";

export const LoginButton = ({ setUser }) => {
  const { instance, accounts } = useMsal();
  const user = accounts.length > 0 ? accounts[0] : null;
  useEffect(() => {
    setUser(user);
  }, [user]);

  const handleLogin = () => {
    instance
      .loginPopup(loginRequest)
      .catch((error) => console.error("Login failed", error));
  };

  return <button onClick={handleLogin}>Login</button>;
};
