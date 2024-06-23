import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";

const useRefreshToken = () => {
  const { login, logout } = useAuth();

  const refresh = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await axios.post(
        "/api/token/refresh/",
        { refresh: refreshToken },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const newAccessToken = response.data.access;
      console.log("newAccessTOken", newAccessToken);
      const role = Cookies.get("role");

      // Store the new access token in cookies
      Cookies.set("accessToken", newAccessToken);

      // Update context with new tokens
      // login(newAccessToken, role, refreshToken);
      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      // Only log out if the refresh token is invalid or expired
      if (error.response?.status === 401) {
        logout();
      }
      throw error;
    }
  };

  return refresh;
};

export default useRefreshToken;
