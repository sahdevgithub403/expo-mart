import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, Image, Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme';

const { width } = Dimensions.get('window');

const EXPLORE_CATEGORIES = ['All', 'Hotels', 'Restaurants', 'Cafes', 'Stays', 'Nightlife'];

const EXPLORE_ITEMS = [
  {
    id: '1',
    title: 'Azure Beachfront Villa',
    rating: '4.9',
    location: 'Malibu, California',
    price: '$320 / night',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80',
  },
  {
    id: '2',
    title: 'Mountain Retreat Lodge',
    rating: '4.7',
    location: 'Aspen, Colorado',
    price: '$180 / night',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=500&q=80',
  },
  {
    id: '3',
    title: 'Downtown Luxury Loft',
    rating: '4.8',
    location: 'Manhattan, New York',
    price: '$250 / night',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&q=80',
  },
  {
    id: '4',
    title: 'Tuscan Wine Estate',
    rating: '5.0',
    location: 'Florence, Italy',
    price: '$410 / night',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80',
  },
];

export default function ExploreScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 10) }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={COLORS.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search destinations..."
            placeholderTextColor={COLORS.textTertiary}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Category chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
      >
        {EXPLORE_CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.chip, activeCategory === cat && styles.chipActive]}
            onPress={() => setActiveCategory(cat)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipText, activeCategory === cat && styles.chipTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Grid */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.gridContent}>
        {EXPLORE_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.gridCard}
            onPress={() => navigation.navigate('Details')}
            activeOpacity={0.85}
          >
            <Image source={{ uri: item.image }} style={styles.gridImage} />
            <TouchableOpacity style={styles.heartBtn}>
              <Ionicons name="heart-outline" size={18} color={COLORS.white} />
            </TouchableOpacity>
            <View style={styles.gridInfo}>
              <View style={styles.gridTitleRow}>
                <Text style={styles.gridTitle} numberOfLines={1}>{item.title}</Text>
                <View style={styles.ratingPill}>
                  <Ionicons name="star" size={12} color={COLORS.primary} />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>
              <Text style={styles.gridLocation}>{item.location}</Text>
              <Text style={styles.gridPrice}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: RADIUS.xl,
    height: 44,
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipRow: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.backgroundSecondary,
  },
  chipActive: {
    backgroundColor: COLORS.textPrimary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  chipTextActive: {
    color: COLORS.white,
  },
  gridContent: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  gridCard: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    ...SHADOWS.card,
  },
  gridImage: {
    width: '100%',
    height: 180,
  },
  heartBtn: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridInfo: {
    padding: SPACING.md,
  },
  gridTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  gridTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginRight: SPACING.sm,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  gridLocation: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  gridPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
