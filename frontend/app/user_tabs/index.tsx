import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/home/Header";
import SearchBar from "@/components/home/SearchBar";
import Promotions from "@/components/home/Promotions";
import ServiceCategories from "@/components/home/ServiceCategories";
import PopularProviders from "@/components/home/PopularProviders";

export default function HomeScreen() {
  // Create a dummy data array with one item to render our content
  const dummyData = [{ id: "main-content" }];

  return (
    <SafeAreaView style={styles.container} edges={["right", "left"]}>
      <StatusBar style="light" />
      <Header />
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={() => (
          <View>
            <ServiceCategories />
            <PopularProviders />
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View style={styles.searchContainer}>
              <SearchBar />
            </View>
            <Promotions />
          </>
        )}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FC",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
  },
});
