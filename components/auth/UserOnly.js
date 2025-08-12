import { useUser } from "../../hooks/useUser";
import { useRouter } from "expo-router";
import { useEffect } from "react";

import Loader from "../Loader";

const UserOnly = ({ children }) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log("UserOnly useEffect called", { authChecked, user });
    if (authChecked && user === null) {
      console.log("User not authenticated, redirecting to /login");
      router.replace("/login");
    }
  }, [user, authChecked]);

  if (!authChecked || !user) {
    console.log("Showing Loader", { authChecked, user });
    return <Loader />;
  }

  console.log("Rendering children for user only");
  return children;
};

export default UserOnly;
