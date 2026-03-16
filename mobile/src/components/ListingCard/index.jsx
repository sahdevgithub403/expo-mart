import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS, TYPOGRAPHY } from '../../theme';

export default function ListingCard({ 
  image, 
  title, 
  rating, 
  distance, 
  badge,
  onPress,
  onBookmark,
  isBookmarked = false,
  style,
  horizontal = true,
}) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };

  const cardWidth = horizontal ? 260 : '100%';
  const imageHeight = horizontal ? 200 : 180;

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, horizontal && { width: cardWidth }]}>
      <TouchableOpacity
        style={[styles.card, style]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {/* Image */}
        <View style={[styles.imageWrapper, { height: imageHeight }]}>
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
          
          {/* Bookmark Button */}
          <TouchableOpacity
            style={styles.bookmarkBtn}
            onPress={onBookmark}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={COLORS.white}
            />
          </TouchableOpacity>

          {/* Badge */}
          {badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            {rating && (
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color={COLORS.primary} />
                <Text style={styles.ratingText}>{rating}</Text>
              </View>
            )}
          </View>
          {distance && <Text style={styles.distance}>{distance}</Text>}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
  },
  imageWrapper: {
    width: '100%',
    position: 'relative',
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bookmarkBtn: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    bottom: SPACING.sm,
    left: SPACING.sm,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.xs,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  content: {
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xs,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginRight: SPACING.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: 3,
  },
  distance: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
