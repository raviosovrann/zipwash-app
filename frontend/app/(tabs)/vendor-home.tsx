import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Clock, CheckCircle, AlertTriangle } from "lucide-react-native";

import { theme } from "@/constants/Theme";
import BookingCard from "@/components/bookings/BookingCard";

const mockBookings = [
  {
    id: "1",
    serviceName: "Oil Change",
    customerName: "John Smith",
    date: "2025-06-15",
    time: "10:30 AM",
    status: "upcoming",
    price: 49.99,
    vehicle: "Toyota Camry 2019",
    image:
      "https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "2",
    serviceName: "Tire Rotation",
    customerName: "Sarah Johnson",
    date: "2025-06-21",
    time: "2:00 PM",
    status: "upcoming",
    price: 39.99,
    vehicle: "Honda Accord 2021",
    image:
      "https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "3",
    serviceName: "Battery Replacement",
    customerName: "Michael Brown",
    date: "2025-05-28",
    time: "11:15 AM",
    status: "completed",
    price: 129.99,
    vehicle: "Ford F-150 2020",
    image:
      "https://images.pexels.com/photos/13009437/pexels-photo-13009437.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "4",
    serviceName: "Engine Diagnostics",
    customerName: "Emily Davis",
    date: "2025-05-20",
    time: "9:45 AM",
    status: "cancelled",
    price: 89.99,
    vehicle: "Chevrolet Malibu 2018",
    image:
      "https://images.pexels.com/photos/4489794/pexels-photo-4489794.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function VendorBookingsScreen() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const filteredBookings = mockBookings.filter((booking) => {
    if (activeTab === "upcoming") return booking.status === "upcoming";
    if (activeTab === "completed") return booking.status === "completed";
    if (activeTab === "cancelled") return booking.status === "cancelled";
    return false;
  });

  return (
    <SafeAreaView style={styles.container} edges={["right", "left"]}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryDark]}
        style={styles.header}
      >
        <Text style={styles.title}>Bookings</Text>
      </LinearGradient>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
          onPress={() => setActiveTab("upcoming")}
        >
          <Clock
            size={18}
            color={
              activeTab === "upcoming"
                ? theme.colors.primary
                : theme.colors.gray[500]
            }
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "upcoming" && styles.activeTabText,
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "completed" && styles.activeTab]}
          onPress={() => setActiveTab("completed")}
        >
          <CheckCircle
            size={18}
            color={
              activeTab === "completed"
                ? theme.colors.primary
                : theme.colors.gray[500]
            }
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "completed" && styles.activeTabText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "cancelled" && styles.activeTab]}
          onPress={() => setActiveTab("cancelled")}
        >
          <AlertTriangle
            size={18}
            color={
              activeTab === "cancelled"
                ? theme.colors.primary
                : theme.colors.gray[500]
            }
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "cancelled" && styles.activeTabText,
            ]}
          >
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookingCard
            booking={{
              ...item,
              providerName: item.customerName,
              status: item.status as "upcoming" | "completed" | "cancelled",
              additionalInfo: item.vehicle,
            }}
            variant="vendor"
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No {activeTab} bookings</Text>
          </View>
        }
        style={styles.bookingsContainer}
        contentContainerStyle={[
          styles.bookingsContent,
          filteredBookings.length === 0 && styles.emptyStateContainer,
        ]}
        showsVerticalScrollIndicator={false}
      />
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
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 16,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  activeTab: {
    backgroundColor: theme.colors.primaryLight,
    borderColor: theme.colors.primary,
  },
  tabText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: theme.colors.gray[700],
    marginLeft: 8,
  },
  activeTabText: {
    color: theme.colors.primary,
  },
  bookingsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 12,
  },
  bookingsContent: {
    paddingBottom: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  emptyStateText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: theme.colors.gray[500],
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
