import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import { theme } from '@/constants/Theme';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

const promotions = [
  {
    id: '1',
    title: 'Get Special Offer',
    discount: '20%',
    description: 'All Servicing Services Available',
    validUntil: '31 August',
    backgroundColor: '#000000',
  },
  {
    id: '2',
    title: 'Summer Deal',
    discount: '15%',
    description: 'AC Repair & Maintenance',
    validUntil: '15 July',
    backgroundColor: '#4C2E9B',
  },
  {
    id: '3',
    title: 'Weekend Special',
    discount: '25%',
    description: 'Tire & Wheel Services',
    validUntil: '30 June',
    backgroundColor: '#2E4C9B',
  },
];

export default function Promotions() {
  const renderPromotionItem = ({ item }: { item: typeof promotions[0] }) => (
    <Animated.View 
      entering={FadeInRight} 
      exiting={FadeOutLeft}
      style={styles.promotionCardContainer}
    >
      <TouchableOpacity 
        style={[
          styles.promotionCard, 
          { backgroundColor: item.backgroundColor }
        ]}
      >
        <View style={styles.promotionContent}>
          <View>
            <Text style={styles.promotionLabel}>Limited Time Offer</Text>
            <Text style={styles.promotionTitle}>{item.title}</Text>
            <Text style={styles.promotionDiscount}>FLAT {item.discount} OFF</Text>
            <Text style={styles.promotionDescription}>{item.description}</Text>
            <Text style={styles.promotionValidity}>Valid until {item.validUntil}</Text>
          </View>
          <TouchableOpacity style={styles.claimButton}>
            <Text style={styles.claimButtonText}>Claim</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>#SpecialForYou</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllButton}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={promotions}
        renderItem={renderPromotionItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.promotionsList}
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
    marginBottom: 12,
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
  promotionsList: {
    paddingLeft: 20,
    paddingRight: 8,
  },
  promotionCardContainer: {
    width: 300,
    marginRight: 12,
  },
  promotionCard: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.medium,
  },
  promotionContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  promotionLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: theme.colors.white,
    opacity: 0.9,
    marginBottom: 4,
  },
  promotionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: theme.colors.white,
    marginBottom: 8,
  },
  promotionDiscount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: theme.colors.white,
    marginBottom: 8,
  },
  promotionDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: theme.colors.white,
    opacity: 0.9,
    marginBottom: 8,
  },
  promotionValidity: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: theme.colors.white,
    opacity: 0.7,
  },
  claimButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
  },
  claimButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: theme.colors.white,
  },
});