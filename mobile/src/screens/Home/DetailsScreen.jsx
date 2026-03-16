import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme';

const { width } = Dimensions.get('window');

const AMENITIES = [
  { id: '1', label: 'Free WiFi', icon: 'wifi', color: COLORS.primary },
  { id: '2', label: 'AC', icon: 'snow', color: '#06B6D4' },
  { id: '3', label: 'Laundry', icon: 'shirt', color: '#8B5CF6' },
  { id: '4', label: 'Meals Incl.', icon: 'restaurant', color: '#F59E0B' },
];

export default function DetailsScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const [favorite, setFavorite] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Cover Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1080&q=80' }}
            style={styles.coverImage}
          />

          <LinearGradient
            colors={['rgba(0,0,0,0.35)', 'transparent']}
            style={[styles.headerGradient, { height: Math.max(insets.top, 20) + 60 }]}
          >
            <View style={[styles.headerNav, { paddingTop: Math.max(insets.top, 10) }]}>
              <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={22} color={COLORS.white} />
              </TouchableOpacity>

              <View style={styles.headerRight}>
                <TouchableOpacity style={styles.headerBtn}>
                  <Ionicons name="share-outline" size={18} color={COLORS.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerBtn} onPress={() => setFavorite(!favorite)}>
                  <Ionicons name={favorite ? 'heart' : 'heart-outline'} size={18} color={favorite ? COLORS.primary : COLORS.white} />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          {/* Dots */}
          <View style={styles.pagination}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>The Grand Meridian</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={14} color={COLORS.primary} />
              <Text style={styles.ratingText}>4.8</Text>
              <Text style={styles.reviewText}>(120+)</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={16} color={COLORS.textSecondary} />
            <Text style={styles.locationText}>Manhattan, New York</Text>
            <TouchableOpacity>
              <Text style={styles.mapLink}>View on Map</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tagsContainer}>
            <View style={[styles.tag, { backgroundColor: COLORS.successLight }]}>
              <Ionicons name="checkmark-circle" size={14} color={COLORS.success} />
              <Text style={[styles.tagText, { color: COLORS.success }]}>Verified</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: COLORS.primarySoft }]}>
              <Ionicons name="trophy" size={14} color={COLORS.primary} />
              <Text style={[styles.tagText, { color: COLORS.primary }]}>Top Rated</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <View>
              <Text style={styles.priceText}>₹12,500<Text style={styles.priceUnit}>/mo</Text></Text>
              <View style={styles.brokerageTag}>
                <Ionicons name="gift-outline" size={12} color={COLORS.success} />
                <Text style={styles.brokerageText}>No Brokerage</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {AMENITIES.map(amn => (
              <View key={amn.id} style={styles.amenityItem}>
                <View style={[styles.amenityIcon, { backgroundColor: amn.color + '15' }]}>
                  <Ionicons name={amn.icon} size={22} color={amn.color} />
                </View>
                <Text style={styles.amenityLabel}>{amn.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            Premium accommodation with all modern amenities. Walking distance to landmarks. Includes daily meals, room cleaning, and high-speed Wi-Fi.
          </Text>
          <TouchableOpacity>
            <Text style={styles.readMoreText}>Read Full Description</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 15) }]}>
        <View>
          <Text style={styles.footerPrice}>₹12,500<Text style={styles.footerUnit}>/mo</Text></Text>
          <Text style={styles.footerSubText}>Total Price</Text>
        </View>
        <TouchableOpacity style={styles.bookBtn} activeOpacity={0.85}>
          <Text style={styles.bookBtnText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  imageContainer: {
    width: '100%',
    height: 320,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.sm,
  },
  headerRight: {
    flexDirection: 'row',
  },
  pagination: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotActive: {
    width: 20,
    backgroundColor: COLORS.white,
  },
  content: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    marginTop: -24,
    padding: SPACING.lg,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.md,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginLeft: 4,
  },
  reviewText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginLeft: 3,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  locationText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 4,
    marginRight: SPACING.sm,
  },
  mapLink: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    gap: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.lg,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.primary,
  },
  priceUnit: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  brokerageTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  brokerageText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.success,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  amenityItem: {
    width: (width - 48 - 48) / 4,
    alignItems: 'center',
  },
  amenityIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  amenityLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    ...SHADOWS.md,
  },
  footerPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  footerUnit: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  footerSubText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  bookBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: RADIUS.lg,
    ...SHADOWS.button,
  },
  bookBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
