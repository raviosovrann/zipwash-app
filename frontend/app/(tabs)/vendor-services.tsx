import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Plus, Edit, Trash2 } from "lucide-react-native";

import { theme } from "@/constants/Theme";
import SearchBar from "@/components/home/SearchBar";

const mockServices = [
  {
    id: "1",
    name: "Complete Engine Diagnostics",
    price: 89.99,
    duration: "60 min",
    active: true,
    image:
      "https://images.pexels.com/photos/4489794/pexels-photo-4489794.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "2",
    name: "Premium Oil Change",
    price: 49.99,
    duration: "30 min",
    active: true,
    image:
      "https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "3",
    name: "Battery Replacement",
    price: 129.99,
    duration: "45 min",
    active: false,
    image:
      "https://images.pexels.com/photos/13009437/pexels-photo-13009437.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function VendorServicesScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={styles.container} edges={["right", "left"]}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryDark]}
        style={styles.header}
      >
        <Text style={styles.title}>My Services</Text>
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search services..."
          />
        </View>
      </LinearGradient>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={18} color={theme.colors.white} />
          <Text style={styles.addButtonText}>Add New Service</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockServices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.serviceCard}>
            <Image source={{ uri: item.image }} style={styles.serviceImage} />
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <View style={styles.serviceDetails}>
                <Text style={styles.servicePrice}>${item.price}</Text>
                <Text style={styles.serviceDuration}>{item.duration}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  item.active ? styles.statusActive : styles.statusInactive,
                ]}
              >
                <Text style={styles.statusText}>
                  {item.active ? "Active" : "Inactive"}
                </Text>
              </View>
            </View>
            <View style={styles.serviceActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Edit size={18} color={theme.colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Trash2 size={18} color={theme.colors.error} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.servicesContainer}
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
    paddingBottom: 24,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: theme.colors.white,
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 8,
  },
  actions: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
  },
  addButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: theme.colors.white,
    marginLeft: 8,
  },
  servicesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  serviceCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  serviceImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  serviceInfo: {
    flex: 1,
    marginLeft: 12,
  },
  serviceName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: theme.colors.gray[900],
  },
  serviceDetails: {
    flexDirection: "row",
    marginTop: 8,
  },
  servicePrice: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: theme.colors.primary,
    marginRight: 16,
  },
  serviceDuration: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: theme.colors.gray[600],
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginTop: 8,
  },
  statusActive: {
    backgroundColor: theme.colors.success,
  },
  statusInactive: {
    backgroundColor: theme.colors.gray[200],
  },
  statusText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
  },
  serviceActions: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  actionButton: {
    padding: 6,
  },
});
