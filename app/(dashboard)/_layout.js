import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import UserOnly from "../../components/auth/UserOnly";

const DashboardLayout = () => {
  return (
    <UserOnly>
      <Tabs
        screenOptions={{
          headerShown: false
        }}
      >
        <Tabs.Screen name="feed" options={{ title: "Feed" }} />
        <Tabs.Screen name="settings" options={{ title: "Settings" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    </UserOnly>
  );
};

export default DashboardLayout;

const styles = StyleSheet.create({});
