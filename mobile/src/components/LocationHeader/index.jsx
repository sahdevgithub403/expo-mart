import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '../../theme';

export default function LocationHeader({ location = 'Manhattan, New York', onNotificationPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.locationRow}>
        <Ionicons name="location" size={18} color={COLORS.primary} />
        <View style={styles.textBlock}>
          <Text style={styles.label}>CURRENT LOCATION</Text>
          <View style={styles.cityRow}>
            <Text style={styles.cityText} numberOfLines={1}>{location}</Text>
            <Ionicons name="chevron-down" size={14} color={COLORS.textPrimary} />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.notifBtn} onPress={onNotificationPress} activeOpacity={0.7}>
        <Ionicons name="notifications-outline" size={22} color={COLORS.textPrimary} />
        <View style={styles.badge} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textBlock: {
    marginLeft: SPACING.sm,
    flex: 1,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 1,
    marginBottom: 2,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginRight: 4,
  },
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
});
