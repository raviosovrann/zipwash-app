import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Bell } from 'lucide-react-native';
import { theme } from '@/constants/Theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header() {
  const insets = useSafeAreaInsets();
  
  return (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.primaryDark]}
      style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <View style={styles.locationContainer}>
          <MapPin size={20} color="white" />
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationLabel}>Location</Text>
            <Text style={styles.locationValue}>New York, USA</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="white" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationTextContainer: {
    marginLeft: 8,
  },
  locationLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: theme.colors.white,
    opacity: 0.8,
  },
  locationValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: theme.colors.white,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.secondary,
    borderWidth: 1.5,
    borderColor: theme.colors.primaryDark,
  },
});