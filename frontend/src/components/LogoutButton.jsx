import React, { useEffect } from "react";
import { useMsal } from "@azure/msal-react";

export const LogoutButton = ({ setUser }) => {
  const { instance, accounts } = useMsal();
  const user = accounts.length > 0 ? accounts[0] : null;
  useEffect(() => {
    setUser(user);
  }, [user]);

  const handleLogout = () => {
    instance
      .logoutPopup()
      .catch((error) => console.error("Logout failed", error));
  };

  return <button onClick={handleLogout}>Logout</button>;
};
