import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { theme } from "@/constants/Theme";
import { Calendar, Clock } from "lucide-react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

interface BookingCardProps {
  booking: {
    id: string;
    serviceName: string;
    providerName: string;
    date: string;
    time: string;
    status: "upcoming" | "completed" | "cancelled";
    price: number;
    image: string;
  };
}

export default function BookingCard({ booking }: BookingCardProps) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <Animated.View entering={FadeInUp.duration(400)} style={styles.container}>
      <TouchableOpacity style={styles.card}>
        <Image source={{ uri: booking.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.serviceName}>{booking.serviceName}</Text>
          <Text style={styles.providerName}>{booking.providerName}</Text>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Calendar size={16} color={theme.colors.gray[600]} />
              <Text style={styles.detailText}>{formatDate(booking.date)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Clock size={16} color={theme.colors.gray[600]} />
              <Text style={styles.detailText}>{booking.time}</Text>
            </View>
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.price}>${booking.price.toFixed(2)}</Text>
            {booking.status === "upcoming" ? (
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Reschedule</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.actionButton, styles.rateButton]}
              >
                <Text style={[styles.actionButtonText, styles.rateButtonText]}>
                  Rate
                </Text>
              </TouchableOpacity>
            )}
          </View>
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
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // <-- fixed shadow warning
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  content: {
    padding: 16,
  },
  serviceName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: theme.colors.gray[900],
    marginBottom: 4,
  },
  providerName: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: theme.colors.gray[600],
    marginBottom: 12,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: theme.colors.gray[700],
    marginLeft: 8,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: theme.colors.primary,
  },
  actionButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: theme.borderRadius.full,
  },
  actionButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: theme.colors.white,
  },
  rateButton: {
    backgroundColor: theme.colors.primaryLight,
  },
  rateButtonText: {
    color: theme.colors.primary,
  },
});
