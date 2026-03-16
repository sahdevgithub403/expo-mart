import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme';

const POPULAR_CITIES = [
  'Bhubaneswar',
  'Jamshedpur',
  'Ranchi',
  'Delhi NCR',
  'Mumbai',
  'Bangalore',
];

export default function LocationPermissionScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectLocation = (city) => {
    navigation.replace('MainTabs');
  };

  const filteredCities = searchQuery
    ? POPULAR_CITIES.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
    : POPULAR_CITIES;

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 20) }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Location</Text>
        <Text style={styles.subtitle}>Choose your city to explore nearby listings and top places.</Text>
      </View>

      {/* Search */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color={COLORS.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search city..."
          placeholderTextColor={COLORS.textTertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Current location */}
      <TouchableOpacity style={styles.currentLocBtn} onPress={() => handleSelectLocation('Current Location')} activeOpacity={0.7}>
        <View style={styles.currentLocIcon}>
          <Ionicons name="navigate" size={18} color={COLORS.primary} />
        </View>
        <Text style={styles.currentLocText}>Use Current Location</Text>
        <Ionicons name="chevron-forward" size={18} color={COLORS.textTertiary} />
      </TouchableOpacity>

      <View style={styles.divider} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Popular Cities</Text>

        <View style={styles.citiesGrid}>
          {filteredCities.map((city, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cityBubble}
              onPress={() => handleSelectLocation(city)}
              activeOpacity={0.7}
            >
              <Ionicons name="location-outline" size={16} color={COLORS.textSecondary} style={styles.cityIcon} />
              <Text style={styles.cityText}>{city}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
  },
  header: {
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: RADIUS.xl,
    height: 50,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    marginBottom: SPACING.lg,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  currentLocBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primarySoft,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  currentLocIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    ...SHADOWS.sm,
  },
  currentLocText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  citiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  cityBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
  },
  cityIcon: {
    marginRight: 6,
  },
  cityText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
});
