import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useUser } from "../../hooks/useUser";

const Profile = () => {
  const router = useRouter();
  const { user, logout } = useUser();
  const userName = user?.name || user?.nickname || user?.email || "User";

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Hello, {userName}!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});
