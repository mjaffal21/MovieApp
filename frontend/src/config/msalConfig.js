import { PublicClientApplication } from "@azure/msal-browser";

const redirectUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_REDIRECT_URI_DEV
    : process.env.REACT_APP_REDIRECT_URI_PROD;

const b2cPolicies = {
  signUpSignIn: {
    authority:
      "https://jaffalcompany.b2clogin.com/jaffalcompany.onmicrosoft.com/B2C_1_SignIn_Up",
  },
  editProfile: {
    authority:
      "https://jaffalcompany.b2clogin.com/jaffalcompany.onmicrosoft.com/B2C_1_Profile_Editing",
  },
};

export const msalConfig = {
  auth: {
    clientId: "fd69f357-3a95-4e4b-a496-e980b35f9ac9",
    authority: b2cPolicies.signUpSignIn.authority,
    knownAuthorities: ["jaffalcompany.b2clogin.com"],
    redirectUri: redirectUrl,
  },
};

export const profileEditRequest = {
  scopes: ["openid", "profile"],
  authority: b2cPolicies.editProfile.authority,
};

export const loginRequest = {
  scopes: ["openid", "profile"],
  authority: b2cPolicies.signUpSignIn.authority,
};

export const msalInstance = new PublicClientApplication(msalConfig);
