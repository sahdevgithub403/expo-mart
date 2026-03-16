import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../theme';

export default function CategoryIcon({ icon, label, bgColor, onPress, isActive = false }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.circle, { backgroundColor: bgColor || COLORS.primarySoft }]}>
        <Ionicons name={icon} size={22} color={COLORS.primary} />
      </View>
      <Text style={[styles.label, isActive && styles.activeLabel]} numberOfLines={1}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 72,
  },
  circle: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  activeLabel: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});
