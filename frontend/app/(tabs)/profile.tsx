import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  User,
  Car,
  CreditCard,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react-native";

import { theme } from "@/constants/Theme";
import ProfileMenuItem from "@/components/profile/ProfileMenuItem";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfileScreen() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    // After logout, redirect to intro screen
    router.replace("/intro");
  };

  return (
    <SafeAreaView style={styles.container} edges={["right", "left"]}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryDark]}
        style={styles.header}
      >
        <Text style={styles.title}>Profile</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800",
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>John Smith</Text>
            <Text style={styles.email}>john.smith@example.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <ProfileMenuItem
            icon={User}
            title="Personal Information"
            onPress={() => {}}
          />
          <ProfileMenuItem icon={Car} title="My Vehicles" onPress={() => {}} />
          <ProfileMenuItem
            icon={CreditCard}
            title="Payment Methods"
            onPress={() => {}}
          />
          <ProfileMenuItem
            icon={Bell}
            title="Notifications"
            onPress={() => {}}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Other</Text>
          <ProfileMenuItem
            icon={Settings}
            title="Settings"
            onPress={() => {}}
          />
          <ProfileMenuItem
            icon={HelpCircle}
            title="Help & Support"
            onPress={() => {}}
          />
          <ProfileMenuItem
            icon={LogOut}
            title="Log Out"
            onPress={handleLogout}
            textColor={theme.colors.error}
          />
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FC",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: theme.colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    marginTop: 20,
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Updated shadow style
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: theme.colors.gray[900],
  },
  email: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: theme.colors.gray[600],
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.primaryLight,
    borderRadius: 20,
  },
  editButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: theme.colors.primary,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: theme.colors.gray[900],
    marginBottom: 12,
  },
  versionContainer: {
    marginTop: 32,
    marginBottom: 16,
    alignItems: "center",
  },
  versionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: theme.colors.gray[500],
  },
});