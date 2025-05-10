import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { Home, ClipboardList, User } from "lucide-react-native";
import { theme } from "@/constants/Theme";
import { Redirect } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

export default function VendorTabLayout() {
  const { isAuthenticated } = useAuth();

  // if (!isAuthenticated) {
  //   return <Redirect href="/login" />;
  // }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray[400],
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="vendor-home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="vendor-services"
        options={{
          title: "Services",
          tabBarIcon: ({ color, size }) => (
            <ClipboardList size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="vendor-profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: 0,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },
  tabBarLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
});
