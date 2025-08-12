import { useUser } from "../../hooks/useUser";
import { useRouter } from "expo-router";
import { useEffect } from "react";

import Loader from "../Loader";

const GuestOnly = ({ children }) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log("GuestOnly useEffect called", { authChecked, user });
    if (authChecked && user !== null) {
      console.log("User is authenticated, redirecting to /profile");
      router.replace("/profile");
    }
  }, [user, authChecked]);

  if (!authChecked || user) {
    console.log("Showing Loader", { authChecked, user });
    return <Loader />;
  }

  console.log("Rendering children for guest only");
  return children;
};

export default GuestOnly;
