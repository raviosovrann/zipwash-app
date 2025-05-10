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
import {
  User,
  Settings,
  HelpCircle,
  LogOut,
  Briefcase,
  Star,
  Clock,
  DollarSign,
} from "lucide-react-native";

import { theme } from "@/constants/Theme";
import ProfileMenuItem from "@/components/profile/ProfileMenuItem";

export default function VendorProfileScreen() {
  const stats = [
    { label: "Services", value: "24", icon: Briefcase },
    { label: "Rating", value: "4.8", icon: Star },
    { label: "Active Bookings", value: "5", icon: Clock },
    { label: "Earnings", value: "$2,450", icon: DollarSign },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["right", "left"]}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryDark]}
        style={styles.header}
      >
        <Text style={styles.title}>Vendor Profile</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <Image
            source={{
              uri: "data:image/jpeg;base64,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",
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>AutoTech Pros</Text>
            <Text style={styles.email}>contact@autotechpros.com</Text>
            <Text style={styles.businessType}>Auto Repair Center</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <View key={index} style={styles.statItem}>
                <Icon size={20} color={theme.colors.primary} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <ProfileMenuItem
            icon={User}
            title="Business Information"
            onPress={() => {}}
          />
          <ProfileMenuItem
            icon={Briefcase}
            title="Service Management"
            onPress={() => {}}
          />
          <ProfileMenuItem
            icon={Settings}
            title="Business Settings"
            onPress={() => {}}
          />
        </View>

        <View style={styles.section}>
          <ProfileMenuItem
            icon={HelpCircle}
            title="Help & Support"
            onPress={() => {}}
          />
          <ProfileMenuItem
            icon={LogOut}
            title="Log Out"
            onPress={() => {}}
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
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    elevation: 3,
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
    marginTop: 2,
  },
  businessType: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: theme.colors.primary,
    marginTop: 4,
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
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 16,
  },
  statItem: {
    width: "48%",
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 8,
    backgroundColor: theme.colors.primaryLight,
    borderRadius: 12,
  },
  statValue: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: theme.colors.primary,
    marginTop: 4,
  },
  statLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: theme.colors.gray[700],
    marginTop: 2,
  },
  section: {
    marginTop: 24,
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    elevation: 3,
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
