import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { theme } from "@/constants/Theme";
import { Star } from "lucide-react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

const providers = [
  {
    id: "1",
    name: "Mike",
    rating: 4.8,
    service: "Engine Repair",
    image:
      "https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "2",
    name: "Sophia",
    rating: 4.9,
    service: "Mechanic",
    image:
      "https://images.pexels.com/photos/8961251/pexels-photo-8961251.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "3",
    name: "Carlos",
    rating: 4.6,
    service: "Electrician",
    image:
      "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "4",
    name: "Dave",
    rating: 4.7,
    service: "Car Wash",
    image:
      "https://images.pexels.com/photos/4506108/pexels-photo-4506108.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function PopularProviders() {
  const renderProviderItem = ({
    item,
    index,
  }: {
    item: (typeof providers)[0];
    index: number;
  }) => (
    <Animated.View
      entering={FadeInUp.delay(index * 100)}
      style={styles.providerContainer}
    >
      <TouchableOpacity style={styles.providerCard}>
        <Image source={{ uri: item.image }} style={styles.providerImage} />
        <View style={styles.providerInfo}>
          <Text style={styles.providerName}>{item.name}</Text>
          <Text style={styles.providerService}>{item.service}</Text>
          <View style={styles.ratingContainer}>
            <Star
              size={14}
              color={theme.colors.warning}
              fill={theme.colors.warning}
            />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Popular Service Provider</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllButton}>See all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={providers}
        renderItem={renderProviderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.providersList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: theme.colors.gray[900],
  },
  seeAllButton: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: theme.colors.primary,
  },
  providersList: {
    paddingLeft: 20,
    paddingRight: 8,
  },
  providerContainer: {
    marginRight: 12,
    width: 96,
  },
  providerCard: {
    alignItems: "center",
  },
  providerImage: {
    width: 96,
    height: 96,
    borderRadius: theme.borderRadius.full,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: theme.colors.white,
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", // Updated shadow style
  },
  providerInfo: {
    alignItems: "center",
  },
  providerName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: theme.colors.gray[900],
  },
  providerService: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: theme.colors.gray[600],
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: theme.colors.gray[800],
    marginLeft: 4,
  },
});
