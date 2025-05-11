import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Wrench, Droplet, Car, Battery, Settings } from "lucide-react-native";

import { theme } from "@/constants/Theme";
import SearchBar from "@/components/home/SearchBar";
import ServiceCard from "@/components/services/ServiceCard";

const categories = [
  { id: "all", name: "All", icon: Car },
  { id: "repair", name: "Repair", icon: Wrench },
  { id: "oil", name: "Oil Change", icon: Droplet },
  { id: "battery", name: "Battery", icon: Battery },
  { id: "tune", name: "Tune Up", icon: Settings },
];

const services = [
  {
    id: "1",
    name: "Complete Engine Diagnostics",
    provider: "AutoTech Pros",
    price: 89.99,
    rating: 4.8,
    category: "repair",
    image:
      "https://images.pexels.com/photos/4489794/pexels-photo-4489794.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "2",
    name: "Premium Oil Change Service",
    provider: "QuickLube Masters",
    price: 49.99,
    rating: 4.6,
    category: "oil",
    image:
      "https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "3",
    name: "Battery Replacement",
    provider: "Power Cell Center",
    price: 129.99,
    rating: 4.7,
    category: "battery",
    image:
      "https://images.pexels.com/photos/13009437/pexels-photo-13009437.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "4",
    name: "Complete Tune-Up Package",
    provider: "Performance Auto",
    price: 199.99,
    rating: 4.9,
    category: "tune",
    image:
      "https://images.pexels.com/photos/3807162/pexels-photo-3807162.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function ServicesScreen() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((service) => service.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container} edges={["right", "left"]}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryDark]}
        style={styles.header}
      >
        <Text style={styles.title}>Browse Services</Text>
        <View style={styles.searchContainer}>
          <SearchBar />
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.categoryContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category) => {
          const Icon = category.icon; // Dynamically assign icon
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Icon
                size={18}
                color={
                  selectedCategory === category.id
                    ? theme.colors.white
                    : theme.colors.gray[700]
                }
              />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView
        style={styles.servicesContainer}
        contentContainerStyle={styles.servicesContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
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
    paddingBottom: 24,
    paddingHorizontal: 20,
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
  categoryContainer: {
    flexDirection: "row",
    maxHeight: 100,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  categoryButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: theme.colors.gray[700],
    marginLeft: 8,
  },
  categoryTextActive: {
    color: theme.colors.white,
  },
  servicesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  servicesContent: {
    paddingBottom: 24,
  },
});
