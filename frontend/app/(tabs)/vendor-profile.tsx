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
              uri: "https://images.pexels.com/photos/3760088/pexels-photo-3760088.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
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
