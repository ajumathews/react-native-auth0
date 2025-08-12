import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useUser } from "../../hooks/useUser";

const LoginScreen = () => {
  const { login, error, loading } = useUser();

  return (
    <View style={styles.container}>
      <Button title={loading ? "Logging in..." : "Login with Auth0"} onPress={login} disabled={loading} />
      {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});
