import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { useUser } from "../../hooks/useUser";
import GuestOnly from "../../components/auth/GuestOnly";

export default function AuthLayout() {
  const { user } = useUser();
  console.log(user);

  return (
    <GuestOnly>
      <Stack screenOptions={{ headerShown: false }} />
    </GuestOnly>
  );
}
