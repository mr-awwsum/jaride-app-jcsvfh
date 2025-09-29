
import { Redirect, router, Stack } from "expo-router";
import { WidgetProvider } from "@/contexts/WidgetContext";
import { Alert } from "react-native";
import { Button } from "@/components/button";
import React, { useState, useEffect } from "react";
import { useNetworkState } from "expo-network";

export default function AppIndexLayout() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const networkState = useNetworkState();

  useEffect(() => {
    // In a real app, you'd check AsyncStorage or similar for first launch
    // For demo purposes, we'll show welcome screen first
    console.log('App launched, showing welcome screen');
  }, []);

  // Show welcome screen on first launch
  if (isFirstLaunch) {
    return <Redirect href="/welcome" />;
  }

  return (
    <WidgetProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </WidgetProvider>
  );
}
