import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme';

const SAVED_ITEMS = [
  {
    id: '1',
    title: 'The Grand Meridian',
    rating: '4.8',
    location: 'Manhattan, New York',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80',
    isSaved: true,
  },
  {
    id: '2',
    title: 'Azure Beachfront Villa',
    rating: '4.9',
    location: 'Malibu, California',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80',
    isSaved: true,
  },
  {
    id: '3',
    title: 'Mountain Retreat Lodge',
    rating: '4.7',
    location: 'Aspen, Colorado',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=500&q=80',
    isSaved: true,
  },
];

export default function SavedScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState(SAVED_ITEMS);

  const toggleSave = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 10) }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved</Text>
        <Text style={styles.headerSubtitle}>{items.length} places saved</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        {items.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={64} color={COLORS.border} />
            <Text style={styles.emptyTitle}>No saved places yet</Text>
            <Text style={styles.emptySubtitle}>Start exploring and save your favorite spots!</Text>
          </View>
        ) : (
          items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => navigation.navigate('Details')}
              activeOpacity={0.85}
            >
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color={COLORS.primary} />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
                <Text style={styles.cardLocation}>{item.location}</Text>
              </View>
              <TouchableOpacity style={styles.heartBtn} onPress={() => toggleSave(item.id)}>
                <Ionicons name="heart" size={22} color={COLORS.primary} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
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
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.card,
    padding: SPACING.sm,
    alignItems: 'center',
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.md,
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  cardLocation: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  heartBtn: {
    padding: SPACING.sm,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 120,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
