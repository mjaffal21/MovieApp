import React, { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { profileEditRequest } from "../config/msalConfig";

export const EditProfileButton = ({ setUser }) => {
  const { instance, accounts } = useMsal();
  const user = accounts.length > 0 ? accounts[0] : null;
  useEffect(() => {
    setUser(user);
  }, [user]);

  const handleEditProfile = () => {
    instance
      .loginPopup(profileEditRequest)
      .catch((error) => console.error("Profile edit failed", error));
  };

  return <button onClick={handleEditProfile}>Edit Profile</button>;
};
