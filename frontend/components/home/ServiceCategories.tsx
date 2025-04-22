import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { theme } from '@/constants/Theme';
import { 
  Wrench, 
  Brush, 
  Battery, 
  Droplet, 
  Car, 
  Tractor, 
  Gauge, 
  SprayCan
} from 'lucide-react-native';

const categories = [
  { id: '1', name: 'Mechanic', icon: Wrench, color: '#6040B0' },
  { id: '2', name: 'Vacuum', icon: Brush, color: '#FF6B6B' },
  { id: '3', name: 'Engine', icon: Gauge, color: '#FFC107' },
  { id: '4', name: 'Battery', icon: Battery, color: '#4CAF50' },
  { id: '5', name: 'Oil Change', icon: Droplet, color: '#2196F3' },
  { id: '6', name: 'Car Wash', icon: SprayCan, color: '#9C27B0' },
  { id: '7', name: 'Interior', icon: Car, color: '#E91E63' },
  { id: '8', name: 'Towing', icon: Tractor, color: '#FF9800' },
];

export default function ServiceCategories() {
  const renderCategoryItem = ({ item, index }: { item: typeof categories[0], index: number }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <View style={[styles.iconContainer, { backgroundColor: `${item.color}10`, borderColor: item.color }]}>
        <item.icon size={24} color={item.color} />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Services</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllButton}>See all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        numColumns={4}
        contentContainerStyle={styles.categoriesList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: theme.colors.gray[900],
  },
  seeAllButton: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: theme.colors.primary,
  },
  categoriesList: {
    paddingHorizontal: 12,
  },
  categoryItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
  },
  categoryName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: theme.colors.gray[800],
    textAlign: 'center',
  },
});