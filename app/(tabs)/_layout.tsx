import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      {/* Only Home tab is visible */}
      <Tabs.Screen
        name="index"
        options={{
          title: "होम",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      {/* Hide all other tabs */}
      <Tabs.Screen
        name="explore"
        options={{ tabBarButton: () => null, headerShown: false }}
      />
      <Tabs.Screen
        name="home_style"
        options={{ tabBarButton: () => null, headerShown: false }}
      />
      <Tabs.Screen
        name="person/viewperson"
        options={{ tabBarButton: () => null, headerShown: false }}
      />
      <Tabs.Screen
        name="person/monthdetails"
        options={{ tabBarButton: () => null, headerShown: false }}
      />
      <Tabs.Screen
        name="person/yearSelection"
        options={{ tabBarButton: () => null, headerShown: false }}
      />
    </Tabs>
  );
}
