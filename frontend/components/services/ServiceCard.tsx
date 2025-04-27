import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { theme } from "@/constants/Theme";
import { Star } from "lucide-react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    provider: string;
    price: number;
    rating: number;
    image: string; // Ensure this is a string and will be passed to the Image source
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Animated.View entering={FadeInUp.duration(400)} style={styles.container}>
      <TouchableOpacity style={styles.card}>
        {/* Ensure service.image is correctly passed */}
        <Image
          source={{ uri: service.image }} // This expects a string, which is your image URL.
          style={styles.image}
        />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name} numberOfLines={2}>
              {service.name}
            </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${service.price.toFixed(2)}</Text>
            </View>
          </View>
          <Text style={styles.provider}>{service.provider}</Text>
          <View style={styles.ratingContainer}>
            <Star
              size={16}
              color={theme.colors.warning}
              fill={theme.colors.warning}
            />
            <Text style={styles.rating}>{service.rating.toFixed(1)}</Text>
          </View>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    overflow: "hidden",
    flexDirection: "row",
    // Replace shadow properties with boxShadow
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Use a standard shadow format
  },
  image: {
    width: 100,
    height: 160,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  name: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: theme.colors.gray[900],
    flex: 1,
    marginRight: 8,
  },
  priceContainer: {
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    justifyContent: "center",
  },
  price: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: theme.colors.primary,
  },
  provider: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: theme.colors.gray[600],
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  rating: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: theme.colors.gray[800],
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    paddingVertical: 8,
    alignItems: "center",
  },
  bookButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: theme.colors.white,
  },
});
