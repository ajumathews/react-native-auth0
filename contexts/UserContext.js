import { createContext, useState, useEffect } from "react";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const auth0ClientId = "123";
  const auth0Domain = "dev-123.us.auth0.com";

  const discovery = {
    authorizationEndpoint: `https://${auth0Domain}/authorize`,
    tokenEndpoint: `https://${auth0Domain}/oauth/token`,
    revocationEndpoint: `https://${auth0Domain}/v2/logout`
  };

  async function getInitialUserValue() {
    try {
      console.log("getInitialUserValue called");
      console.log("token:", token);
      if (token) {
        console.log("Fetching user info with token");
        const userInfoResponse = await fetch(`https://${auth0Domain}/userinfo`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const userProfile = await userInfoResponse.json();
        console.log("Fetched user profile:", userProfile);
        setUser(userProfile);
      } else {
        console.log("No token found, setting user and token to null");
        setUser(null);
        setToken(null);
      }
    } catch (error) {
      console.log("Error in getInitialUserValue:", error);
      setUser(null);
      throw Error(error.message);
    } finally {
      setAuthChecked(true);
      console.log("Auth checked set to true", authChecked);
    }
  }

  useEffect(() => {
    getInitialUserValue();
  }, []);

  async function login() {
    setError(null);
    setLoading(true);
    console.log("login called");
    try {
      const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
      console.log("Redirect URI:", redirectUri);
      const request = new AuthSession.AuthRequest({
        clientId: auth0ClientId,
        redirectUri,
        scopes: ["openid", "profile", "email"],
        responseType: AuthSession.ResponseType.Token
      });
      await request.makeAuthUrlAsync(discovery);
      const result = await request.promptAsync(discovery, { useProxy: true });
      console.log("AuthSession result:", result);
      if (result.type === "success" && result.authentication?.accessToken) {
        const accessToken = result.authentication.accessToken;
        console.log("Login success, accessToken:", accessToken);
        const userInfoResponse = await fetch(`https://${auth0Domain}/userinfo`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const userProfile = await userInfoResponse.json();
        console.log("Fetched user profile:", userProfile);
        setUser(userProfile);
        setToken(accessToken);
      } else if (result.type === "error") {
        console.log("Login error:", result.error);
        setError(result.error || "Authentication error");
      } else if (result.type === "dismiss") {
        console.log("Login dismissed");
        setError("Login dismissed.");
      } else {
        console.log("Unknown response from AuthSession:", result);
        setError("Unknown response from AuthSession.");
      }
    } catch (e) {
      console.log("Error in login:", e);
      setError(e.message || "Unexpected error");
    } finally {
      setLoading(false);
      console.log("Loading set to false");
    }
  }

  async function logout() {
    console.log("logout called");
    setUser(null);
    setToken(null);
    setError(null);
    try {
      const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
      const logoutUrl = `https://${auth0Domain}/v2/logout?client_id=${auth0ClientId}&returnTo=${encodeURIComponent(redirectUri)}`;
      console.log("Logout URL:", logoutUrl);
      await WebBrowser.openAuthSessionAsync(logoutUrl);
      console.log("Logout completed");
    } catch (e) {
      console.log("Error in logout:", e);
      setError(e.message || "Logout error");
    }
  }

  return <UserContext.Provider value={{ user, token, login, logout, authChecked, error, loading }}>{children}</UserContext.Provider>;
}
