import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useUser } from "../../hooks/useUser";

const Settings = () => {
  const { user } = useUser();
  const userName = user?.name || user?.nickname || user?.email || "User";

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Hello, {userName}!</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});
