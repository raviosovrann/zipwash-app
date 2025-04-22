import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { theme } from '@/constants/Theme';

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={theme.colors.gray[500]} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search services, providers..."
          placeholderTextColor={theme.colors.gray[500]}
        />
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <SlidersHorizontal size={20} color={theme.colors.gray[700]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: 16,
    height: 48,
    ...theme.shadows.small,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.gray[900],
  },
  filterButton: {
    marginLeft: 12,
    backgroundColor: theme.colors.white,
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.small,
  },
});