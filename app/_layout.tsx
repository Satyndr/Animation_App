import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import SplashScreen from "./Components/SplashScreen";

function MainLayout() {
  return (
    <Stack
      screenOptions={{ headerShown: false, statusBarBackgroundColor: "#222" }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // Adjust timer if needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SplashScreen />;

  return <MainLayout />;
}
